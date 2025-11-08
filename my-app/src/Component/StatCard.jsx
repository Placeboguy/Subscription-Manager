import React from 'react';
import { motion } from 'framer-motion';

/**
 * Stat Card for Dashboard
 */
const StatCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4 ${color}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="p-3 rounded-full bg-opacity-20">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </h3>
      </div>
    </motion.div>
  );
};

export default StatCard;
