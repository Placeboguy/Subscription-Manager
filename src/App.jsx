import React, { useState, useEffect } from 'react';
import { SubscriptionProvider } from './Context/SubscriptionContext';
import Layout from './Component/Layout';
import AuthPage from './pages/AuthPage';
import ErrorBoundary from './Component/ErrorBoundary';
import NotificationCenter from './Component/NotificationCenter';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // Force dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userInfo = localStorage.getItem('userInfo');
    if (token && userInfo) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <SubscriptionProvider>
        {isLoggedIn ? (
          <>
            <Layout
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              onLogout={handleLogout}
            />
            <NotificationCenter />
          </>
        ) : (
          <AuthPage onLogin={handleLogin} />
        )}
      </SubscriptionProvider>
    </ErrorBoundary>
  );
}

export default App;
