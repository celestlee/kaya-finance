export type Category =
  | 'Income'
  | 'Housing'
  | 'Utilities'
  | 'Groceries'
  | 'Dining'
  | 'Transport'
  | 'Subscriptions'
  | 'Shopping'
  | 'Healthcare'
  | 'Other';

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  merchant: string;
  category: Category;
  amount: number; // positive for expenses, negative for income
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  thinkingSteps?: ThinkingStep[];
}

export interface ThinkingStep {
  label: string;
  status: 'pending' | 'active' | 'complete';
  detail?: string;
}

export type IntentType = 'budget_analysis' | 'savings_guidance' | 'product_education' | 'general';

export interface CoordinatorResult {
  intent: IntentType;
  confidence: number;
  reasoning: string;
}

export interface GuardrailResult {
  approved: boolean;
  issues: string[];
  hasDisclaimer: boolean;
}

export interface MonthlySummary {
  month: string; // YYYY-MM
  totalIncome: number;
  totalSpending: number;
  surplus: number;
  byCategory: Record<Category, number>;
}

export interface CategoryAlert {
  category: Category;
  currentMonth: number;
  threeMonthAvg: number;
  percentAbove: number;
}
