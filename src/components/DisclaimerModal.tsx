import { Shield } from 'lucide-react';

interface DisclaimerModalProps {
  onAccept: () => void;
}

export function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#1F4D4A]/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#1F4D4A]" />
          </div>
          <h2 className="text-xl font-semibold text-[#1F4D4A]">Before you begin</h2>
        </div>

        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            <strong className="text-gray-900">Kaya is an educational tool</strong>, not a financial advisory service.
            It does not provide personalized financial advice, and should not be relied upon for making financial decisions.
          </p>
          <p>
            All transaction data shown is <strong className="text-gray-900">synthetic and fictional</strong>. No real
            financial data is processed or stored.
          </p>
          <p>
            For personalized financial guidance, please consult a <strong className="text-gray-900">MAS-licensed financial adviser</strong>.
          </p>
          <div className="bg-[#FAF7F2] rounded-lg p-4 border border-[#C9A961]/20">
            <p className="text-xs text-[#8B6F47]">
              This tool uses AI to analyze spending patterns and provide educational information about Singapore
              financial products. All rates and product details mentioned are illustrative — always verify current
              information via official sources such as MAS, MoneySense, or CPF Board.
            </p>
          </div>
        </div>

        <button
          onClick={onAccept}
          className="mt-6 w-full bg-[#1F4D4A] text-white py-3 rounded-xl font-medium hover:bg-[#163836] transition-colors duration-200"
        >
          I understand
        </button>
      </div>
    </div>
  );
}
