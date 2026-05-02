import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Plus, Trash2 } from 'lucide-react';
import { Transaction, Category } from '../types';
import { CATEGORY_COLORS, ALL_CATEGORIES } from '../data/constants.js';

interface TransactionsTabProps {
  transactions: Transaction[];
  onAddClick: () => void;
  onDelete: (id: string) => void;
}

function formatSGD(amount: number): string {
  const abs = Math.abs(amount);
  return (amount < 0 ? '-' : '') + `$${abs.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-SG', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function TransactionsTab({ transactions, onAddClick, onDelete }: TransactionsTabProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => {
        if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;
        if (search && !t.merchant.toLowerCase().includes(search.toLowerCase())) return false;
        if (startDate && t.date < startDate) return false;
        if (endDate && t.date > endDate) return false;
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  }, [transactions, search, categoryFilter, startDate, endDate]);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search merchants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4D4A]/20 focus:border-[#1F4D4A] transition-all bg-white"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
              showFilters ? 'bg-[#1F4D4A] text-white border-[#1F4D4A]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1F4D4A] text-white rounded-xl text-sm font-medium hover:bg-[#163836] active:bg-[#0f2e2c] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4 animate-fade-in">
          <div className="flex flex-wrap gap-2">
            {['All', ...ALL_CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat as Category | 'All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={categoryFilter === cat ? { backgroundColor: CATEGORY_COLORS[cat as Category] || '#1F4D4A' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">From</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4D4A]/20"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">To</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4D4A]/20"
              />
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-xs text-gray-400">{filtered.length} transactions</p>

      {/* Desktop table */}
      <div className="hidden sm:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-5 py-3">Date</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-5 py-3">Merchant</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-5 py-3">Category</th>
                <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-5 py-3">Amount</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-[#FAF7F2]/50 transition-colors group">
                  <td className="px-5 py-3 text-sm text-gray-500 whitespace-nowrap">{formatDate(t.date)}</td>
                  <td className="px-5 py-3 text-sm text-gray-900 font-medium">{t.merchant}</td>
                  <td className="px-5 py-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-white"
                      style={{ backgroundColor: CATEGORY_COLORS[t.category] }}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td className={`px-5 py-3 text-sm font-semibold text-right whitespace-nowrap ${
                    t.amount < 0 ? 'text-[#1F4D4A]' : 'text-gray-900'
                  }`}>
                    {formatSGD(t.amount)}
                  </td>
                  <td className="px-2 py-3">
                    <button
                      onClick={() => onDelete(t.id)}
                      className="p-1.5 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                      aria-label="Delete transaction"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-2">
        {filtered.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-between gap-3 group">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{t.merchant}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">{formatDate(t.date)}</span>
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium text-white"
                  style={{ backgroundColor: CATEGORY_COLORS[t.category] }}
                >
                  {t.category}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold whitespace-nowrap ${
                t.amount < 0 ? 'text-[#1F4D4A]' : 'text-gray-900'
              }`}>
                {formatSGD(t.amount)}
              </span>
              <button
                onClick={() => onDelete(t.id)}
                className="p-1.5 rounded-lg text-gray-300 active:text-red-400 active:bg-red-50 transition-all"
                aria-label="Delete transaction"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
