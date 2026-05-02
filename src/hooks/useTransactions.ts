import { useMemo } from 'react';
import { Transaction, MonthlySummary, CategoryAlert, Category } from '../types';
import { EXPENSE_CATEGORIES } from '../data/constants';

export function useTransactionAnalysis(transactions: Transaction[]) {
  const monthlySummaries = useMemo(() => {
    const months: Record<string, Transaction[]> = {};
    transactions.forEach((t) => {
      const month = t.date.substring(0, 7);
      if (!months[month]) months[month] = [];
      months[month].push(t);
    });

    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, txns]) => {
        const byCategory: Record<string, number> = {};
        let totalIncome = 0;
        let totalSpending = 0;

        txns.forEach((t) => {
          if (!byCategory[t.category]) byCategory[t.category] = 0;
          if (t.category === 'Income') {
            totalIncome += Math.abs(t.amount);
          } else {
            totalSpending += t.amount;
            byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
          }
        });

        return {
          month,
          totalIncome,
          totalSpending,
          surplus: totalIncome - totalSpending,
          byCategory: byCategory as Record<Category, number>,
        } as MonthlySummary;
      });
  }, [transactions]);

  const currentMonth = useMemo(() => {
    if (monthlySummaries.length === 0) return null;
    return monthlySummaries[monthlySummaries.length - 1];
  }, [monthlySummaries]);

  const categoryAlerts = useMemo(() => {
    if (monthlySummaries.length < 2) return [];
    const alerts: CategoryAlert[] = [];
    const current = monthlySummaries[monthlySummaries.length - 1];
    const previousMonths = monthlySummaries.slice(0, -1);

    EXPENSE_CATEGORIES.forEach((cat) => {
      const currentAmount = current.byCategory[cat] || 0;
      const pastAmounts = previousMonths.map((m) => m.byCategory[cat] || 0);
      const avg = pastAmounts.reduce((a, b) => a + b, 0) / pastAmounts.length;

      if (avg > 0 && currentAmount > avg * 1.3) {
        alerts.push({
          category: cat,
          currentMonth: currentAmount,
          threeMonthAvg: avg,
          percentAbove: Math.round(((currentAmount - avg) / avg) * 100),
        });
      }
    });

    return alerts.sort((a, b) => b.percentAbove - a.percentAbove);
  }, [monthlySummaries]);

  const topCategories = useMemo(() => {
    if (!currentMonth) return [];
    return EXPENSE_CATEGORIES.map((cat) => {
      const current = currentMonth.byCategory[cat] || 0;
      const prevMonth = monthlySummaries.length >= 2
        ? (monthlySummaries[monthlySummaries.length - 2].byCategory[cat] || 0)
        : 0;
      const change = prevMonth > 0 ? ((current - prevMonth) / prevMonth) * 100 : 0;
      return { category: cat, amount: current, change: Math.round(change) };
    })
      .filter((c) => c.amount > 0)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [currentMonth, monthlySummaries]);

  const hasSurplus = currentMonth ? currentMonth.surplus > 0 : false;

  return {
    monthlySummaries,
    currentMonth,
    categoryAlerts,
    topCategories,
    hasSurplus,
  };
}
