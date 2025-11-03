import React, { useState } from 'react';
import { SubscriptionProvider } from './Context/SubscriptionContext';
import Layout from './Component/Layout';
import AuthPage from './pages/AuthPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <SubscriptionProvider>
      {isLoggedIn ? (
        <Layout currentPage={currentPage} setCurrentPage={setCurrentPage} />
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </SubscriptionProvider>
  );
}

export default App;
