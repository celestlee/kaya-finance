import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Category } from '../types';
import { ALL_CATEGORIES } from '../data/constants';
import { CATEGORY_COLORS } from '../data/constants';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: { date: string; merchant: string; category: Category; amount: number }) => void;
}

export function AddTransactionModal({ isOpen, onClose, onAdd }: AddTransactionModalProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState<Category>('Groceries');
  const [amount, setAmount] = useState('');
  const [isIncome, setIsIncome] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!merchant.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    onAdd({
      date,
      merchant: merchant.trim(),
      category: isIncome ? 'Income' : category,
      amount: isIncome ? -parsedAmount : parsedAmount,
    });

    setMerchant('');
    setAmount('');
    setCategory('Groceries');
    setIsIncome(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-xl p-5 sm:p-6 animate-fade-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Add Transaction</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Income toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setIsIncome(false)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                !isIncome ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setIsIncome(true)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                isIncome ? 'bg-white shadow-sm text-[#1F4D4A]' : 'text-gray-500'
              }`}
            >
              Income
            </button>
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4D4A]/20 focus:border-[#1F4D4A] transition-all"
            />
          </div>

          {/* Merchant */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">
              {isIncome ? 'Source' : 'Merchant'}
            </label>
            <input
              type="text"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              placeholder={isIncome ? 'e.g. Salary, Freelance' : 'e.g. FairPrice, Grab'}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4D4A]/20 focus:border-[#1F4D4A] transition-all"
            />
          </div>

          {/* Category (only for expenses) */}
          {!isIncome && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">Category</label>
              <div className="grid grid-cols-3 gap-2">
                {ALL_CATEGORIES.filter((c) => c !== 'Income').map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                      category === cat
                        ? 'border-transparent text-white shadow-sm'
                        : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300'
                    }`}
                    style={category === cat ? { backgroundColor: CATEGORY_COLORS[cat] } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Amount */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">Amount (SGD)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4D4A]/20 focus:border-[#1F4D4A] transition-all"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#1F4D4A] text-white rounded-xl font-medium text-sm hover:bg-[#163836] active:bg-[#0f2e2c] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}
