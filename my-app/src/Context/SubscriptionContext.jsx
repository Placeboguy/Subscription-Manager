import React, { createContext, useState, useContext, useEffect } from 'react';
import { subscriptionAPI } from '../services/api';

const SubscriptionContext = createContext();

export const useSubscriptions = () => useContext(SubscriptionContext);

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [stats, setStats] = useState({
    totalActive: 0,
    monthlySpending: 0,
    yearlySpending: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch subscriptions from backend
  const fetchSubscriptions = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await subscriptionAPI.getAll();
      if (result.success) {
        setSubscriptions(result.data || []);
      } else {
        setError(result.message);
        setSubscriptions([]);
      }
    } catch (err) {
      setError(err.message);
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats from backend
  const fetchStats = async () => {
    try {
      const result = await subscriptionAPI.getStats();
      if (result.success) {
        setStats(result.data || {});
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Add subscription
  const addSubscription = async (sub) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Adding subscription:', sub);
      const result = await subscriptionAPI.add(sub);
      console.log('API response:', result);
      
      if (result.success && result.data) {
        // Add the new subscription to the list
        const newSubscriptions = [result.data, ...subscriptions];
        console.log('Updated subscriptions:', newSubscriptions);
        setSubscriptions(newSubscriptions);
        await fetchStats();
        return { success: true, data: result.data };
      } else {
        const errorMsg = result.message || 'Failed to add subscription';
        setError(errorMsg);
        return { success: false, message: errorMsg };
      }
    } catch (err) {
      console.error('Error in addSubscription:', err);
      const errorMsg = err.message || 'An error occurred';
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Delete subscription
  const deleteSubscription = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await subscriptionAPI.delete(id);
      if (result.success) {
        setSubscriptions(subscriptions.filter((sub) => sub._id !== id));
        await fetchStats();
        return { success: true };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update subscription
  const updateSubscription = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const result = await subscriptionAPI.update(id, updates);
      if (result.success) {
        setSubscriptions(
          subscriptions.map((sub) => (sub._id === id ? result.data : sub))
        );
        await fetchStats();
        return { success: true, data: result.data };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get stats
  const getStats = () => stats;

  // Initialize - fetch subscriptions when provider mounts and token exists
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchSubscriptions();
      fetchStats();
    }
  }, []);

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        addSubscription,
        deleteSubscription,
        updateSubscription,
        getStats,
        fetchSubscriptions,
        fetchStats,
        loading,
        error,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
