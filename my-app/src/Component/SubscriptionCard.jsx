import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSubscriptions } from '../Context/SubscriptionContext';
import EditSubscriptionModal from './EditSubscriptionModal';

/**
 * Subscription Card for AllSubscriptions Page
 */
const SubscriptionCard = ({ subscription }) => {
  const { deleteSubscription } = useSubscriptions();
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Helper function to format dates (simplified)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const statusColor =
    subscription.status === 'active'
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg flex flex-col justify-between"
      >
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {subscription.name}
            </h3>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}
            >
              {subscription.status}
            </span>
          </div>
          <div className="mb-4">
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
              ${subscription.price.toFixed(2)}
              <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                /{subscription.frequency}
              </span>
            </p>
          </div>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>Category:</strong> {subscription.category}
            </p>
            <p>
              <strong>Start Date:</strong> {formatDate(subscription.startDate)}
            </p>
            <p>
              <strong>Next Billing:</strong> {formatDate(subscription.nextBillingDate)}
            </p>
            {subscription.description && (
              <p>
                <strong>Note:</strong> {subscription.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-6">
          <button
            onClick={() => setIsEditOpen(true)}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow"
          >
            Edit
          </button>
          <button
            onClick={() => deleteSubscription(subscription._id)}
            className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 transition-colors"
          >
            Delete
          </button>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <EditSubscriptionModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        subscription={subscription}
      />
    </>
  );
};

export default SubscriptionCard;
