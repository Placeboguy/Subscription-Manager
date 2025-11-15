import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SubscriptionProvider } from './Context/SubscriptionContext';
import Layout from './Component/Layout';
import ErrorBoundary from './Component/ErrorBoundary';
import NotificationCenter from './Component/NotificationCenter';
import DashboardPage from './pages/DashboardPage';
import AllSubscriptionPage from './pages/AllSubscriptionPage';

function App() {
  // Force dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  return (
    <ErrorBoundary>
      <SubscriptionProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="subscriptions" element={<AllSubscriptionPage />} />
          </Route>
        </Routes>

        <NotificationCenter />
      </SubscriptionProvider>
    </ErrorBoundary>
  );
}

export default App;
