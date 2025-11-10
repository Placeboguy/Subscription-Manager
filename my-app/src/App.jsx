import React, { useState, useEffect } from 'react';
import { SubscriptionProvider } from './Context/SubscriptionContext';
import Layout from './Component/Layout';
import ErrorBoundary from './Component/ErrorBoundary';
import NotificationCenter from './Component/NotificationCenter';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  // Force dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  const handleLogout = () => {
    setCurrentPage('dashboard');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Always show dashboard - no login required
  return (
    <ErrorBoundary>
      <SubscriptionProvider>
        <>
          <Layout
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onLogout={handleLogout}
          />
          <NotificationCenter />
        </>
      </SubscriptionProvider>
    </ErrorBoundary>
  );
}

export default App;
