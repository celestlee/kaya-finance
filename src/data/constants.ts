import { Category } from '../types';

export const CATEGORY_COLORS: Record<Category, string> = {
  Income: '#1F4D4A',
  Housing: '#8B6F47',
  Utilities: '#A67C52',
  Groceries: '#5B8C5A',
  Dining: '#C9A961',
  Transport: '#6B8F9E',
  Subscriptions: '#9B7EBD',
  Shopping: '#D4836D',
  Healthcare: '#7BA7BC',
  Other: '#999999',
};

export const CATEGORY_BG: Record<Category, string> = {
  Income: 'bg-[#1F4D4A]',
  Housing: 'bg-[#8B6F47]',
  Utilities: 'bg-[#A67C52]',
  Groceries: 'bg-[#5B8C5A]',
  Dining: 'bg-[#C9A961]',
  Transport: 'bg-[#6B8F9E]',
  Subscriptions: 'bg-[#9B7EBD]',
  Shopping: 'bg-[#D4836D]',
  Healthcare: 'bg-[#7BA7BC]',
  Other: 'bg-[#999999]',
};

export const CATEGORY_TEXT: Record<Category, string> = {
  Income: 'text-[#1F4D4A]',
  Housing: 'text-[#8B6F47]',
  Utilities: 'text-[#A67C52]',
  Groceries: 'text-[#5B8C5A]',
  Dining: 'text-[#C9A961]',
  Transport: 'text-[#6B8F9E]',
  Subscriptions: 'text-[#9B7EBD]',
  Shopping: 'text-[#D4836D]',
  Healthcare: 'text-[#7BA7BC]',
  Other: 'text-[#999999]',
};

export const EXPENSE_CATEGORIES: Category[] = [
  'Housing',
  'Utilities',
  'Groceries',
  'Dining',
  'Transport',
  'Subscriptions',
  'Shopping',
  'Healthcare',
  'Other',
];

export const ALL_CATEGORIES: Category[] = [
  'Income',
  ...EXPENSE_CATEGORIES,
];

export const DISCLAIMER_TEXT =
  'This is educational information only, not financial advice. For personalized recommendations, please consult a MAS-licensed financial adviser.';

export const FOOTER_TEXT =
  'Kaya is an educational tool. Not financial advice. For personalized guidance, consult a MAS-licensed financial adviser.';

export const SUGGESTED_PROMPTS = [
  'Why am I overspending this month?',
  'What should I do with my surplus cash?',
  'Explain Singapore Savings Bonds',
];
