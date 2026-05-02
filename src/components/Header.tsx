import { Settings, Leaf, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  onSettingsClick: () => void;
  isDemo: boolean;
  onExitDemo: () => void;
}

export function Header({ onSettingsClick, isDemo, onExitDemo }: HeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1F4D4A] flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-semibold text-[#1F4D4A] tracking-tight">Kaya</span>
          {isDemo && (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#C9A961]/15 text-[#C9A961] uppercase tracking-wider">
              Demo
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isDemo && (
            <button
              onClick={onExitDemo}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#1F4D4A] text-white rounded-xl text-xs sm:text-sm font-medium hover:bg-[#163836] active:bg-[#0f2e2c] transition-colors"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Exit Demo</span>
              <span className="sm:hidden">Sign Up</span>
            </button>
          )}

          {user && !isDemo && (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-gray-400 truncate max-w-[160px]">{user.email}</span>
              <button
                onClick={signOut}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          )}

          <button
            onClick={onSettingsClick}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
