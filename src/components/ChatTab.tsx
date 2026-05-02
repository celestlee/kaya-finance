import { useState, useRef, useEffect } from 'react';
import { Send, Leaf, User, Loader2, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, ThinkingStep, Transaction } from '../types';
import { SUGGESTED_PROMPTS } from '../data/constants';
import { runOrchestrator } from '../agents/orchestrator';

interface ChatTabProps {
  messages: ChatMessage[];
  onSendMessage: (message: ChatMessage) => void;
  apiKey: string;
  transactions: Transaction[];
}

export function ChatTab({ messages, onSendMessage, apiKey, transactions }: ChatTabProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState<ThinkingStep[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinkingSteps]);

  useEffect(() => {
    const handler = (e: Event) => {
      const prompt = (e as CustomEvent).detail;
      if (prompt) handleSend(prompt);
    };
    window.addEventListener('kaya-ask', handler);
    return () => window.removeEventListener('kaya-ask', handler);
  });

  const handleSend = async (text?: string) => {
    const message = text || input.trim();
    if (!message || isLoading) return;
    if (!apiKey) {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: 'Please add your Qwen (DashScope) API key in Settings to start chatting with Kaya.',
        timestamp: Date.now(),
      };
      onSendMessage(errorMsg);
      return;
    }

    setInput('');
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: Date.now(),
    };
    onSendMessage(userMsg);
    setIsLoading(true);

    try {
      const response = await runOrchestrator(apiKey, message, transactions, (steps) => {
        setThinkingSteps([...steps]);
      });

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
        thinkingSteps: [...thinkingSteps],
      };
      onSendMessage(assistantMsg);
    } catch {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: 'Something went wrong. Please check your API key and try again.',
        timestamp: Date.now(),
      };
      onSendMessage(errorMsg);
    } finally {
      setIsLoading(false);
      setThinkingSteps([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] sm:h-[calc(100vh-10rem)]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 -webkit-overflow-scrolling-touch">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {/* Empty State */}
          {messages.length === 0 && !isLoading && (
            <div className="text-center py-10 sm:py-16">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1F4D4A]/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-[#1F4D4A]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Chat with Kaya</h3>
              <p className="text-sm text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto px-4">
                Ask about your spending patterns, savings options, or Singapore financial products.
              </p>
              <div className="flex flex-col gap-2.5 sm:gap-3 justify-center max-w-sm sm:max-w-lg mx-auto px-4">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="flex items-center justify-between gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-[#1F4D4A] hover:text-[#1F4D4A] active:bg-gray-50 transition-all group"
                  >
                    {prompt}
                    <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 sm:gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1F4D4A] flex items-center justify-center shrink-0 mt-1">
                  <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 ${
                  msg.role === 'user'
                    ? 'bg-[#1F4D4A] text-white'
                    : 'bg-white border border-gray-100 shadow-sm text-gray-700'
                }`}
              >
                {/* Thinking Steps */}
                {msg.thinkingSteps && msg.thinkingSteps.length > 0 && (
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-gray-100">
                    {msg.thinkingSteps.map((step, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium ${
                          step.status === 'complete'
                            ? 'bg-[#1F4D4A]/10 text-[#1F4D4A]'
                            : step.status === 'active'
                            ? 'bg-[#C9A961]/10 text-[#C9A961]'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {step.status === 'active' && <Loader2 className="w-3 h-3 animate-spin" />}
                        {step.status === 'complete' && <span className="w-1.5 h-1.5 rounded-full bg-[#1F4D4A]" />}
                        {step.label}
                        {step.detail && step.status === 'complete' && (
                          <span className="opacity-60 hidden sm:inline">: {step.detail}</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-200 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                </div>
              )}
            </div>
          ))}

          {/* Live Thinking Steps */}
          {isLoading && thinkingSteps.length > 0 && (
            <div className="flex gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1F4D4A] flex items-center justify-center shrink-0 mt-1">
                <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 max-w-[85%] sm:max-w-[80%]">
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {thinkingSteps.map((step, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium ${
                        step.status === 'complete'
                          ? 'bg-[#1F4D4A]/10 text-[#1F4D4A]'
                          : step.status === 'active'
                          ? 'bg-[#C9A961]/10 text-[#C9A961]'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {step.status === 'active' && <Loader2 className="w-3 h-3 animate-spin" />}
                      {step.status === 'complete' && <span className="w-1.5 h-1.5 rounded-full bg-[#1F4D4A]" />}
                      {step.label}
                      {step.detail && step.status === 'complete' && (
                        <span className="opacity-60 hidden sm:inline">: {step.detail}</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-100 bg-white px-3 sm:px-6 py-3 sm:py-4 pb-[4.5rem] sm:pb-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 sm:gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Kaya about your finances..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4D4A]/20 focus:border-[#1F4D4A] transition-all disabled:opacity-50 bg-[#FAF7F2]"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="px-4 py-3 bg-[#1F4D4A] text-white rounded-xl hover:bg-[#163836] active:bg-[#0f2e2c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[48px] flex items-center justify-center"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          {!apiKey && (
            <p className="text-xs text-[#C9A961] mt-2">
              Add your Qwen (DashScope) API key in Settings to chat with Kaya.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}