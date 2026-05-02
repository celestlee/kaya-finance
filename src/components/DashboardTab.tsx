import { TrendingUp, TrendingDown, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MonthlySummary, CategoryAlert, Category } from '../types';
import { CATEGORY_COLORS, EXPENSE_CATEGORIES } from '../data/constants';

interface DashboardTabProps {
  currentMonth: MonthlySummary | null;
  topCategories: { category: Category; amount: number; change: number }[];
  categoryAlerts: CategoryAlert[];
  hasSurplus: boolean;
  onAskKaya: (prompt: string) => void;
}

function formatSGD(amount: number): string {
  return `$${amount.toLocaleString('en-SG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function DashboardTab({ currentMonth, topCategories, categoryAlerts, hasSurplus, onAskKaya }: DashboardTabProps) {
  if (!currentMonth) {
    return (
      <div className="p-8 text-center text-gray-400">
        No transaction data available.
      </div>
    );
  }

  const chartData = EXPENSE_CATEGORIES.map((cat) => ({
    name: cat,
    value: currentMonth.byCategory[cat] || 0,
    color: CATEGORY_COLORS[cat],
  })).filter((d) => d.value > 0);

  const monthLabel = new Date(currentMonth.month + '-01').toLocaleDateString('en-SG', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Month Header */}
      <div>
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{monthLabel}</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <SummaryCard label="Total Income" value={formatSGD(currentMonth.totalIncome)} accent="text-[#1F4D4A]" />
        <SummaryCard label="Total Spending" value={formatSGD(currentMonth.totalSpending)} accent="text-[#C9A961]" />
        <SummaryCard
          label={currentMonth.surplus >= 0 ? 'Surplus' : 'Deficit'}
          value={formatSGD(Math.abs(currentMonth.surplus))}
          accent={currentMonth.surplus >= 0 ? 'text-[#1F4D4A]' : 'text-red-600'}
          icon={currentMonth.surplus >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        />
      </div>

      {/* Alerts */}
      {categoryAlerts.length > 0 && (
        <div className="space-y-3">
          {categoryAlerts.map((alert) => (
            <div
              key={alert.category}
              className="bg-[#C9A961]/10 border border-[#C9A961]/20 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-[#C9A961] mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-[#8B6F47]">
                  <strong>{alert.category}</strong> is <strong>{alert.percentAbove}%</strong> above your 3-month average
                  ({formatSGD(alert.currentMonth)} vs avg {formatSGD(alert.threeMonthAvg)})
                </p>
                <button
                  onClick={() => onAskKaya(`Why is my ${alert.category.toLowerCase()} spending so high this month?`)}
                  className="mt-2 text-xs font-medium text-[#1F4D4A] hover:underline flex items-center gap-1"
                >
                  Ask Kaya about it <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Excess Cash Banner */}
      {hasSurplus && (
        <div className="bg-[#1F4D4A]/5 border border-[#1F4D4A]/10 rounded-xl p-4 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#1F4D4A] mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-[#1F4D4A]">
              <strong>Excess cash detected</strong> — you have a surplus of {formatSGD(currentMonth.surplus)} this month.
            </p>
            <button
              onClick={() => onAskKaya('What should I do with my surplus cash?')}
              className="mt-2 text-xs font-medium text-[#1F4D4A] hover:underline flex items-center gap-1"
            >
              Ask Kaya about savings options <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Chart + Top Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Spending Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatSGD(value as number)}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    fontSize: '13px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 justify-center">
            {chartData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Categories */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Top 5 Spending Categories</h3>
          <div className="space-y-4">
            {topCategories.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[cat.category] }}
                    />
                    <span className="text-sm font-medium text-gray-700">{cat.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{formatSGD(cat.amount)}</span>
                    {cat.change !== 0 && (
                      <span
                        className={`text-xs font-medium flex items-center gap-0.5 ${
                          cat.change > 0 ? 'text-[#C9A961]' : 'text-[#1F4D4A]'
                        }`}
                      >
                        {cat.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {cat.change > 0 ? '+' : ''}{cat.change}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(cat.amount / (topCategories[0]?.amount || 1)) * 100}%`,
                      backgroundColor: CATEGORY_COLORS[cat.category],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  accent,
  icon,
}: {
  label: string;
  value: string;
  accent: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-5">
      <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5 sm:mb-1">{label}</p>
      <div className="flex items-center gap-1 sm:gap-2">
        <span className={`text-base sm:text-2xl font-semibold ${accent}`}>{value}</span>
        {icon && <span className={accent}>{icon}</span>}
      </div>
    </div>
  );
}
