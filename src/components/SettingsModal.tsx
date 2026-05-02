import { X, Key, RotateCcw, ExternalLink, Shield } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onResetData: () => void;
}

export function SettingsModal({ isOpen, onClose, apiKey, onApiKeyChange, onResetData }: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-[#1F4D4A]">Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* API Key */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Key className="w-4 h-4 text-[#C9A961]" />
              Qwen (DashScope) API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="sk-..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4D4A]/20 focus:border-[#1F4D4A] transition-all"
            />
            <p className="mt-1.5 text-xs text-gray-400">
              Stored locally in your browser. Sent only to Alibaba Cloud DashScope API.
            </p>
          </div>

          {/* Reset Data */}
          <div>
            <button
              onClick={onResetData}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1F4D4A] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset synthetic transaction data
            </button>
          </div>

          {/* GitHub */}
          <div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1F4D4A] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View source on GitHub
            </a>
          </div>

          {/* Data notice */}
          <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#C9A961]/20">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-[#C9A961] mt-0.5 shrink-0" />
              <p className="text-xs text-[#8B6F47] leading-relaxed">
                No real financial data is processed. All transactions are synthetic and generated for demonstration purposes only.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full bg-[#1F4D4A] text-white py-2.5 rounded-xl font-medium hover:bg-[#163836] transition-colors duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
