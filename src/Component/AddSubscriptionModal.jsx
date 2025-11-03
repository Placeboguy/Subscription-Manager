import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSubscriptions } from '../Context/SubscriptionContext';
import { IconX, IconAlertCircle } from './icons';

/**
 * Add Subscription Modal
 */
const AddSubscriptionModal = ({ onClose }) => {
  const { addSubscription } = useSubscriptions();
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0]
  ); // YYYY-MM-DD
  const [status, setStatus] = useState('active');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !cost) {
      setError('Subscription Name and Cost are required.');
      return;
    }
    setError('');
    addSubscription({
      name,
      cost: parseFloat(cost),
      billingCycle,
      startDate,
      status,
    });
    onClose();
  };

  // Modal backdrop variant
  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Modal content variant
  const modal = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.1, type: 'spring', stiffness: 300, damping: 25 },
    },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg p-6 md:p-8"
        variants={modal}
        onClick={(e) => e.stopPropagation()} // Prevent click-through
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Add New Subscription
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <IconX size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 flex items-center space-x-2">
            <IconAlertCircle />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Subscription Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="cost"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Cost
              </label>
              <input
                type="number"
                id="cost"
                step="0.01"
                min="0"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label
                htmlFor="billingCycle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Billing Cycle
              </label>
              <select
                id="billingCycle"
                value={billingCycle}
                onChange={(e) => setBillingCycle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-md hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Save Subscription
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddSubscriptionModal;
