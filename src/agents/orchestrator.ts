import { Transaction, IntentType, CoordinatorResult, GuardrailResult, ThinkingStep } from '../types';
import { KNOWLEDGE_BASE_SUMMARY } from '../data/knowledgeBase';
import { DISCLAIMER_TEXT } from '../data/constants';

const QWEN_MODEL = 'qwen-plus';
const QWEN_BASE_URL = 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function callQwen(apiKey: string, messages: ChatMessage[]): Promise<string> {
    console.log('Key check:', {
  exists: !!apiKey,
  length: apiKey?.length,
  startsWithSk: apiKey?.startsWith('sk-'),
  firstFour: apiKey?.slice(0, 4),
  lastFour: apiKey?.slice(-4),
});
  const response = await fetch(`${QWEN_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: QWEN_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Qwen API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

const COORDINATOR_PROMPT = `You are the Coordinator agent for Kaya, a Singapore personal finance education tool. Your job is to classify the user's message into one of these intents:

- budget_analysis: Questions about spending patterns, overspending, budget advice, category breakdowns
- savings_guidance: Questions about what to do with surplus cash, savings options, where to put money
- product_education: Questions about how Singapore financial products work (SSB, T-bills, CPF, savings accounts, ETFs, etc.)
- general: General greetings, off-topic questions, or anything that doesn't fit the above

Respond with ONLY a JSON object, no other text:
{ "intent": "budget_analysis" | "savings_guidance" | "product_education" | "general", "confidence": 0-1, "reasoning": "brief explanation" }`;

const BUDGET_ANALYZER_PROMPT = `You are the Budget Analyzer agent for Kaya, a Singapore personal finance education tool. You analyze the user's transaction data and provide warm, non-judgmental insights about their spending patterns.

Rules:
- Be warm and supportive, never judgmental
- Reference specific numbers from the transaction data
- Compare current month to historical averages when relevant
- Suggest specific but gentle adjustments
- Use Singapore context (SGD, local merchants, etc.)
- If you mention any financial products, you MUST end with: "${DISCLAIMER_TEXT}"
- Never recommend a specific product as "you should buy X" — frame as options to consider`;

const SAVINGS_OPTIMIZER_PROMPT = `You are the Savings Optimizer agent for Kaya, a Singapore personal finance education tool. You help users understand their options for surplus cash based on Singapore's financial landscape.

You have access to a knowledge base about Singapore financial products. Use it to provide educational information about savings options.

Rules:
- Frame everything as "options to consider" with their typical use cases
- Never recommend a specific product as "you should buy X"
- Describe product categories and their mechanics generally
- Mention that rates change and users should verify current rates
- Reference the knowledge base information
- You MUST end every response with: "${DISCLAIMER_TEXT}"

Singapore Financial Knowledge Base:
${KNOWLEDGE_BASE_SUMMARY}`;

const PRODUCT_EDUCATOR_PROMPT = `You are the Product Educator agent for Kaya, a Singapore personal finance education tool. You explain how Singapore financial products work in plain language.

You have access to a knowledge base about Singapore financial products. Use it to provide clear, educational explanations.

Rules:
- Explain products in plain, accessible language
- Cite that information is from MAS, MoneySense, or CPF Board public materials where applicable
- Note that rates are illustrative and users should verify via official sources
- Never recommend a specific product as "you should buy X"
- You MUST end every response with: "${DISCLAIMER_TEXT}"

Singapore Financial Knowledge Base:
${KNOWLEDGE_BASE_SUMMARY}`;

const GENERAL_PROMPT = `You are Kaya, a warm and friendly Singapore personal finance education assistant. You help users understand their spending and learn about financial products available in Singapore.

Rules:
- Be warm, conversational, and helpful
- If the user asks about finances, gently redirect to relevant topics
- You MUST end any response about financial products with: "${DISCLAIMER_TEXT}"
- Never recommend a specific financial product as "you should buy X"`;

const GUARDRAIL_PROMPT = `You are the Guardrail agent for Kaya. Your job is to review a response before it's shown to the user. Check for these issues:

1. Does the response recommend a specific product by name as "you should buy X" or "I recommend you get X"? (Mentioning products as examples or options is fine)
2. Does the response include a regulatory disclaimer when discussing financial products? (It should)
3. Does the response make any unverifiable claim about specific returns or rates being guaranteed?

Respond with ONLY a JSON object, no other text:
{ "approved": true/false, "issues": ["list of issues found"], "hasDisclaimer": true/false }`;

export async function runOrchestrator(
  apiKey: string,
  userMessage: string,
  transactions: Transaction[],
  onThinkingUpdate: (steps: ThinkingStep[]) => void
): Promise<string> {
  const steps: ThinkingStep[] = [
    { label: 'Analyzing intent', status: 'active' },
    { label: 'Consulting specialist', status: 'pending' },
    { label: 'Validating output', status: 'pending' },
  ];
  onThinkingUpdate([...steps]);

  // Step 1: Coordinator
  let coordinatorResult: CoordinatorResult;
  try {
    const coordText = await callQwen(apiKey, [
      { role: 'system', content: COORDINATOR_PROMPT },
      { role: 'user', content: userMessage },
    ]);
    const jsonMatch = coordText.match(/\{[\s\S]*\}/);
    coordinatorResult = jsonMatch ? JSON.parse(jsonMatch[0]) : { intent: 'general', confidence: 0.5, reasoning: 'Parse fallback' };
  } catch {
    coordinatorResult = { intent: 'general', confidence: 0.5, reasoning: 'Fallback due to API error' };
  }

  steps[0] = { label: 'Analyzing intent', status: 'complete', detail: coordinatorResult.intent.replace('_', ' ') };
  steps[1] = { label: 'Consulting specialist', status: 'active', detail: getSpecialistName(coordinatorResult.intent) };
  onThinkingUpdate([...steps]);

  // Step 2: Specialist
  const specialistPrompt = getSpecialistPrompt(coordinatorResult.intent);
  const transactionContext = JSON.stringify(
    transactions.map((t) => ({
      date: t.date,
      merchant: t.merchant,
      category: t.category,
      amount: t.amount,
    }))
  );

  let specialistResponse: string;
  try {
    specialistResponse = await callQwen(apiKey, [
      { role: 'system', content: specialistPrompt },
      { role: 'user', content: `Here is my transaction data:\n${transactionContext}\n\nMy question: ${userMessage}` },
    ]);
  } catch {
    specialistResponse = 'I apologize, but I encountered an error processing your request. Please check your API key and try again.';
  }

  steps[1] = { label: 'Consulting specialist', status: 'complete', detail: getSpecialistName(coordinatorResult.intent) };
  steps[2] = { label: 'Validating output', status: 'active' };
  onThinkingUpdate([...steps]);

  // Step 3: Guardrail
  let guardrailResult: GuardrailResult;
  try {
    const guardText = await callQwen(apiKey, [
      { role: 'system', content: GUARDRAIL_PROMPT },
      { role: 'user', content: `Review this response for compliance issues:\n\n${specialistResponse}` },
    ]);
    const jsonMatch = guardText.match(/\{[\s\S]*\}/);
    guardrailResult = jsonMatch ? JSON.parse(jsonMatch[0]) : { approved: true, issues: [], hasDisclaimer: true };
  } catch {
    guardrailResult = { approved: true, issues: [], hasDisclaimer: true };
  }

  let finalResponse = specialistResponse;

  if (!guardrailResult.approved) {
    if (!guardrailResult.hasDisclaimer) {
      finalResponse += `\n\n${DISCLAIMER_TEXT}`;
    }
    if (guardrailResult.issues.some((i) => i.toLowerCase().includes('recommend'))) {
      finalResponse =
        'Please note: Kaya provides educational information only and does not recommend specific products. Here is general information:\n\n' +
        finalResponse.replace(/I recommend|you should (buy|get|open)/gi, 'You may consider looking into') +
        `\n\n${DISCLAIMER_TEXT}`;
    }
  }

  steps[2] = { label: 'Validating output', status: 'complete', detail: guardrailResult.approved ? 'Passed' : 'Issues found & corrected' };
  onThinkingUpdate([...steps]);

  return finalResponse;
}

function getSpecialistPrompt(intent: IntentType): string {
  switch (intent) {
    case 'budget_analysis':
      return BUDGET_ANALYZER_PROMPT;
    case 'savings_guidance':
      return SAVINGS_OPTIMIZER_PROMPT;
    case 'product_education':
      return PRODUCT_EDUCATOR_PROMPT;
    case 'general':
      return GENERAL_PROMPT;
  }
}

function getSpecialistName(intent: IntentType): string {
  switch (intent) {
    case 'budget_analysis':
      return 'Budget Analyzer';
    case 'savings_guidance':
      return 'Savings Optimizer';
    case 'product_education':
      return 'Product Educator';
    case 'general':
      return 'Kaya';
  }
}
