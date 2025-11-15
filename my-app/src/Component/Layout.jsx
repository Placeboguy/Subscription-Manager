import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

/**
 * The main Layout container
 * Wraps the Sidebar and the main content area.
 * Handles mobile sidebar state and renders the current page.
 */
const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Content is rendered by child routes via <Outlet />

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* 1. Desktop Sidebar (Permanent) */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* 2. Mobile Sidebar (Conditional) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex md:hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            ></motion.div>

            {/* Sidebar itself */}
            <div className="relative z-10">
              <Sidebar />
            </div>

            {/* Close button */}
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 z-20 p-2 text-white text-2xl font-bold"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
            SubManager
          </h1>
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-700 dark:text-gray-200 text-2xl font-bold"
          >
            ☰
          </button>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname} // Re-animate when route changes
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;
