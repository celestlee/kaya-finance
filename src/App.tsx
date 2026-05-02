import { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { TabNav, TabId } from './components/TabNav';
import { Footer } from './components/Footer';
import { DisclaimerModal } from './components/DisclaimerModal';
import { SettingsModal } from './components/SettingsModal';
import { AuthPage } from './components/AuthPage';
import { AddTransactionModal } from './components/AddTransactionModal';
import { WelcomeBanner } from './components/WelcomeBanner';
import { DashboardTab } from './components/DashboardTab';
import { TransactionsTab } from './components/TransactionsTab';
import { ChatTab } from './components/ChatTab';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTransactionAnalysis } from './hooks/useTransactions';
import { useAuth, AuthProvider } from './hooks/useAuth';
import { supabase } from './lib/supabase';
import { generateTransactions } from './data/transactions';
import { ChatMessage, Transaction, Category } from './types';

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [showDisclaimer, setShowDisclaimer] = useState(true); 
  // to show disclaimer on initial load
  // useLocalStorage('kaya-disclaimer-accepted', true);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [apiKey, setApiKey] = useLocalStorage('kaya-api-key', '');

  const isDemo = !user;

  const [chatMessages, setChatMessages] = isDemo
    ? useState<ChatMessage[]>([])
    : useLocalStorage<ChatMessage[]>('kaya-chat-messages', []);
  const [showAuth, setShowAuth] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true); 
  // useLocalStorage('kaya-welcome-seen', false);
  const [transactions, setTransactions] = useState<Transaction[]>(() => generateTransactions());
  const [dataLoading, setDataLoading] = useState(false);

  // Fetch real transactions when user logs in
  useEffect(() => {
    if (!user) {
      setTransactions(generateTransactions());
      return;
    }
    setShowAuth(false);
    setDataLoading(true);
    supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          const mapped: Transaction[] = data.map((row) => ({
            id: row.id,
            date: row.date,
            merchant: row.merchant,
            category: row.category as Category,
            amount: Number(row.amount),
          }));
          setTransactions(mapped);
        }
        setDataLoading(false);
      });
  }, [user]);
  const { currentMonth, topCategories, categoryAlerts, hasSurplus } = useTransactionAnalysis(transactions);

  const handleAcceptDisclaimer = useCallback(() => {
    setShowDisclaimer(false);
  }, [setShowDisclaimer]);

  const handleApiKeyChange = useCallback(
    (key: string) => {
      setApiKey(key);
    },
    [setApiKey]
  );

  const handleResetData = useCallback(() => {
    if (isDemo) {
      setTransactions(generateTransactions());
    }
    setChatMessages([]);
  }, [isDemo, setChatMessages]);

  const handleSendMessage = useCallback(
    (message: ChatMessage) => {
      setChatMessages((prev) => [...prev, message]);
    },
    [setChatMessages]
  );

  const handleAskKaya = useCallback(
    (prompt: string) => {
      setActiveTab('chat');
      setTimeout(() => {
        const event = new CustomEvent('kaya-ask', { detail: prompt });
        window.dispatchEvent(event);
      }, 100);
    },
    []
  );

  const handleAddTransaction = useCallback(
    async (txn: { date: string; merchant: string; category: Category; amount: number }) => {
      if (user) {
        const { data, error } = await supabase
          .from('transactions')
          .insert({
            user_id: user.id,
            date: txn.date,
            merchant: txn.merchant,
            category: txn.category,
            amount: txn.amount,
          })
          .select()
          .single();

        if (!error && data) {
          setTransactions((prev) => [
            { id: data.id, date: data.date, merchant: data.merchant, category: data.category as Category, amount: Number(data.amount) },
            ...prev,
          ]);
        }
      } else {
        const newTxn: Transaction = {
          id: `demo-${Date.now()}`,
          ...txn,
        };
        setTransactions((prev) => [newTxn, ...prev]);
      }
    },
    [user]
  );

  const handleDeleteTransaction = useCallback(
    async (id: string) => {
      if (user) {
        await supabase.from('transactions').delete().eq('id', id);
      }
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    },
    [user]
  );

  // Show auth page when user clicks "Exit Demo"
  if (showAuth && !user) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <button
            onClick={() => setShowAuth(false)}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            &larr; Back to demo
          </button>
        </div>
        <AuthPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      {/* Disclaimer Modal */}
      {showDisclaimer && <DisclaimerModal onAccept={handleAcceptDisclaimer} />}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        apiKey={apiKey}
        onApiKeyChange={handleApiKeyChange}
        onResetData={handleResetData}
      />

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={showAddTransaction}
        onClose={() => setShowAddTransaction(false)}
        onAdd={handleAddTransaction}
      />

      {/* Header */}
      <Header
        onSettingsClick={() => setShowSettings(true)}
        isDemo={isDemo}
        onExitDemo={() => setShowAuth(true)}
      />

      {/* Tab Navigation */}
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Welcome Banner */}
      {showWelcome && (
        <WelcomeBanner
          isDemo={isDemo}
          onDismiss={() => setShowWelcome(false)}
          onAddTransaction={() => setShowAddTransaction(true)}
          onGoToChat={() => setActiveTab('chat')}
          onExitDemo={() => setShowAuth(true)}
        />
      )}

      {/* Content */}
      <main className="flex-1 pb-16 sm:pb-0">
        {dataLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#1F4D4A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardTab
                currentMonth={currentMonth}
                topCategories={topCategories}
                categoryAlerts={categoryAlerts}
                hasSurplus={hasSurplus}
                onAskKaya={handleAskKaya}
              />
            )}
            {activeTab === 'transactions' && (
              <TransactionsTab
                transactions={transactions}
                onAddClick={() => setShowAddTransaction(true)}
                onDelete={handleDeleteTransaction}
              />
            )}
            {activeTab === 'chat' && (
              <ChatTab
                messages={chatMessages}
                onSendMessage={handleSendMessage}
                apiKey={apiKey}
                transactions={transactions}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;