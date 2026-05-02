import { X, BarChart3, Plus, MessageCircle, LogIn, BookOpen } from 'lucide-react';

interface WelcomeBannerProps {
  isDemo: boolean;
  onDismiss: () => void;
  onAddTransaction: () => void;
  onGoToChat: () => void;
  onExitDemo: () => void;
}

export function WelcomeBanner({ isDemo, onDismiss, onAddTransaction, onGoToChat, onExitDemo }: WelcomeBannerProps) {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
      <div className="bg-white rounded-2xl border border-[#1F4D4A]/10 shadow-sm overflow-hidden animate-fade-in">
        {/* Top accent line */}
        <div className="h-1 bg-gradient-to-r from-[#1F4D4A] via-[#5B8C5A] to-[#C9A961]" />

        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1F4D4A]/10 flex items-center justify-center">
                <BookOpen className="w-4.5 h-4.5 text-[#1F4D4A]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#1F4D4A]">Welcome to Kaya</h3>
                <p className="text-xs text-gray-400">Singapore Personal Finance Education</p>
              </div>
            </div>
            <button
              onClick={onDismiss}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Kaya helps you understand your spending patterns and learn about Singapore financial products.
            {isDemo ? ' You\'re currently exploring with sample data — try the features below, then create an account to track your own finances.' : ' Here\'s how to get the most out of Kaya:'}
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-4">
            <button
              onClick={onAddTransaction}
              className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#C9A961]/10 hover:border-[#C9A961]/30 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#C9A961]/15 flex items-center justify-center shrink-0 mt-0.5">
                <Plus className="w-4 h-4 text-[#C9A961]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 group-hover:text-[#1F4D4A] transition-colors">Add Transactions</p>
                <p className="text-xs text-gray-400 mt-0.5">Record your income and expenses</p>
              </div>
            </button>

            <button
              onClick={onGoToChat}
              className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#1F4D4A]/10 hover:border-[#1F4D4A]/30 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1F4D4A]/10 flex items-center justify-center shrink-0 mt-0.5">
                <MessageCircle className="w-4 h-4 text-[#1F4D4A]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 group-hover:text-[#1F4D4A] transition-colors">Chat with Kaya</p>
                <p className="text-xs text-gray-400 mt-0.5">Ask about spending, savings, or SSBs</p>
              </div>
            </button>

            <button
              onClick={onAddTransaction}
              className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#5B8C5A]/10 hover:border-[#5B8C5A]/30 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#5B8C5A]/10 flex items-center justify-center shrink-0 mt-0.5">
                <BarChart3 className="w-4 h-4 text-[#5B8C5A]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 group-hover:text-[#5B8C5A] transition-colors">View Dashboard</p>
                <p className="text-xs text-gray-400 mt-0.5">See your spending breakdown</p>
              </div>
            </button>
          </div>

          {/* CTA for demo users */}
          {isDemo && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1F4D4A]/5 border border-[#1F4D4A]/10">
              <LogIn className="w-4 h-4 text-[#1F4D4A] shrink-0" />
              <p className="text-sm text-[#1F4D4A] flex-1">
                <strong>Ready to track your own finances?</strong> Create a free account to save your data securely.
              </p>
              <button
                onClick={onExitDemo}
                className="px-4 py-2 bg-[#1F4D4A] text-white rounded-lg text-xs font-medium hover:bg-[#163836] active:bg-[#0f2e2c] transition-colors shrink-0"
              >
                Sign Up Free
              </button>
            </div>
          )}

          {/* Educational note */}
          <p className="text-[11px] text-gray-300 mt-3 text-center">
            For educational purposes only. Not financial advice. Consult a MAS-licensed adviser for personalized guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
