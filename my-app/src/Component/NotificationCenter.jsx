import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSubscriptions } from '../Context/SubscriptionContext';

/**
 * Notification Center - Shows alerts for subscriptions expiring within 3 days
 */
const NotificationCenter = () => {
  const { subscriptions } = useSubscriptions();
  const [notifications, setNotifications] = useState([]);
  const [dismissedNotifications, setDismissedNotifications] = useState(new Set());

  // Check for subscriptions with upcoming or overdue billing dates
  useEffect(() => {
    const checkUpcomingBilling = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const newNotifications = [];

      if (!subscriptions || subscriptions.length === 0) {
        return;
      }

      subscriptions.forEach((sub) => {
        // Only check active subscriptions
        if (sub.status !== 'active') return;

        // Check if subscription has a next billing date
        if (sub.nextBillingDate) {
          const billingDate = new Date(sub.nextBillingDate);
          billingDate.setHours(0, 0, 0, 0);
          const daysUntilBilling = Math.floor((billingDate - today) / (1000 * 60 * 60 * 24));

          // Show blue notification if billing is exactly 1 day away
          if (daysUntilBilling === 1) {
            const notifId = `billing-${sub._id}`;
            if (!dismissedNotifications.has(notifId)) {
              newNotifications.push({
                id: notifId,
                type: 'billing',
                title: `${sub.name} Billing Tomorrow`,
                message: `Your ${sub.name} subscription will be charged ₹${sub.price.toFixed(2)} tomorrow.`,
                color: 'bg-blue-500',
                icon: '💳',
                daysLeft: 1,
              });
            }
          }

          // Show red notification if billing date has passed (overdue)
          if (daysUntilBilling < 0) {
            const notifId = `overdue-${sub._id}`;
            if (!dismissedNotifications.has(notifId)) {
              const daysOverdue = Math.abs(daysUntilBilling);
              newNotifications.push({
                id: notifId,
                type: 'overdue',
                title: `${sub.name} Billing Overdue!`,
                message: `${sub.name} billing was due ${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} ago. Amount: ₹${sub.price.toFixed(2)}`,
                color: 'bg-red-500',
                icon: '⚠️',
                daysLeft: daysUntilBilling,
              });
            }
          }
        }
      });

      setNotifications(newNotifications);
    };

    checkUpcomingBilling();
    // Check every 1 hour
    const interval = setInterval(checkUpcomingBilling, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [subscriptions, dismissedNotifications]);

  const dismissNotification = (notifId) => {
    setDismissedNotifications((prev) => new Set([...prev, notifId]));
    setNotifications((prev) => prev.filter((n) => n.id !== notifId));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 400, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 400, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`${notification.color} text-white rounded-lg shadow-2xl p-4 flex items-start space-x-4`}
          >
            <span className="text-2xl flex-shrink-0">{notification.icon}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm">{notification.title}</h3>
              <p className="text-xs opacity-90 mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => dismissNotification(notification.id)}
              className="flex-shrink-0 text-white opacity-75 hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
