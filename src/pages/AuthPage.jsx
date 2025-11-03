import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- INLINE ICONS ---
// I've moved the icons directly into this file to fix the import error.

const IconMail = ({ size = 16, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const IconLock = ({ size = 16, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const IconUser = ({ size = 16, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const IconMoneyBillWave = ({ size = 32, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 640 512"
    fill="currentColor"
    className={className}
  >
    <path d="M624 64H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16V80c0-8.84-7.16-16-16-16zM320 288c-52.8 0-96-43.2-96-96s43.2-96 96-96 96 43.2 96 96-43.2 96-96 96zm288 64c-17.67 0-32-14.33-32-32 0-17.67 14.33-32 32-32s32 14.33 32 32c0 17.67-14.33 32-32 32zm-448-64c-17.67 0-32-14.33-32-32 0-17.67 14.33-32 32-32s32 14.33 32 32c0 17.67-14.33 32-32 32z" />
  </svg>
);

/**
 * Auth Page (Login / Sign Up)
 */
const AuthPage = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd verify credentials here
    // For this demo, we'll just log in successfully
    onLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <IconMoneyBillWave
              size={32}
              className="text-3xl text-primary-600 dark:text-primary-400"
            />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              SubManager
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLoginView ? 'login' : 'signup'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold text-center mb-4">
                  {isLoginView ? 'Log In' : 'Create Account'}
                </h2>

                {!isLoginView && (
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <IconUser />
                    </span>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                )}

                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <IconMail />
                  </span>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <IconLock />
                  </span>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-5 py-3 text-base font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLoginView ? 'Log In' : 'Sign Up'}
                </button>
              </form>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              {isLoginView
                ? 'Need an account? Sign Up'
                : 'Already have an account? Log In'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;

