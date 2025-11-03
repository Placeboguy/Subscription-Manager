import React, { createContext, useState, useContext } from 'react';

// --- MOCK DATA ---
const initialSubscriptions = [
  {
    id: '1',
    name: 'Netflix',
    cost: 15.99,
    billingCycle: 'monthly',
    startDate: '2025-01-10',
    status: 'active',
  },
  {
    id: '2',
    name: 'Spotify Premium',
    cost: 10.99,
    billingCycle: 'monthly',
    startDate: '2025-02-15',
    status: 'active',
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    cost: 59.99,
    billingCycle: 'monthly',
    startDate: '2025-01-20',
    status: 'active',
  },
  {
    id: '4',
    name: 'Amazon Prime',
    cost: 139.0,
    billingCycle: 'yearly',
    startDate: '2025-03-01',
    status: 'active',
  },
  {
    id: '5',
    name: 'Old Gym Membership',
    cost: 25.0,
    billingCycle: 'monthly',
    startDate: '2024-11-01',
    status: 'expired',
  },
];

const SubscriptionContext = createContext();

export const useSubscriptions = () => useContext(SubscriptionContext);

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);

  const addSubscription = (sub) => {
    const newSub = { ...sub, id: (Date.now() + Math.random()).toString() };
    setSubscriptions([newSub, ...subscriptions]);
  };

  const deleteSubscription = (id) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  };

  const getStats = () => {
    const activeSubs = subscriptions.filter((s) => s.status === 'active');

    const monthlyCost = activeSubs.reduce((acc, sub) => {
      if (sub.billingCycle === 'monthly') {
        return acc + sub.cost;
      }
      if (sub.billingCycle === 'yearly') {
        return acc + sub.cost / 12;
      }
      return acc;
    }, 0);

    const yearlyCost = activeSubs.reduce((acc, sub) => {
      if (sub.billingCycle === 'monthly') {
        return acc + sub.cost * 12;
      }
      if (sub.billingCycle === 'yearly') {
        return acc + sub.cost;
      }
      return acc;
    }, 0);

    return {
      totalActive: activeSubs.length,
      monthlyCost: monthlyCost.toFixed(2),
      yearlyCost: yearlyCost.toFixed(2),
    };
  };

  return (
    <SubscriptionContext.Provider
      value={{ subscriptions, addSubscription, deleteSubscription, getStats }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
