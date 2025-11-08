import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSubscriptions } from '../Context/SubscriptionContext';
import SubscriptionCard from '../Component/SubscriptionCard';
import AddSubscriptionModal from '../Component/AddSubscriptionModal';
import { IconSearch, IconPlus, IconFilter } from '../Component/icons';
import styles from './AllSubscriptionPage.module.css';

/**
 * All Subscriptions Page
 */
const AllSubscriptions = () => {
  const { subscriptions } = useSubscriptions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredSubscriptions = useMemo(() => {
    return subscriptions
      .filter((sub) => {
        if (filter === 'all') return true;
        return sub.status === filter;
      })
      .filter((sub) =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [subscriptions, searchTerm, filter]);

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          All Subscriptions ({filteredSubscriptions.length})
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.addButton}
        >
          <IconPlus />
          Add Subscription
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <IconSearch />
          </span>
          <input
            type="text"
            placeholder="Search for subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <IconFilter />
          </span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-auto appearance-none pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Subscriptions Grid */}
      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSubscriptions.length > 0 ? (
            filteredSubscriptions.map((sub) => (
              <SubscriptionCard key={sub._id} subscription={sub} />
            ))
          ) : (
            <motion.p
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 dark:text-gray-400 col-span-full text-center py-10"
            >
              No subscriptions found{searchTerm ? ' for your search' : ''}.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Add Subscription Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <AddSubscriptionModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllSubscriptions;
