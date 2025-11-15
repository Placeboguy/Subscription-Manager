import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Reusable NavLink component for the Sidebar
 */
// Nav items use react-router NavLink for route-aware active styling

/**
 * User Profile for Sidebar
 */
const UserProfile = () => {
  return null; // No user profile in public mode
};

// --- ORIGINAL SIDEBAR COMPONENT ---
// Now this component can find NavItem, UserProfile, and the icons.

/**
 * The Sidebar
 */
const Sidebar = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 p-4 h-full flex flex-col justify-between shadow-lg border-r border-gray-200 dark:border-gray-700">
      {/* Top Section: Logo + Nav */}
      <div>
        {/* Logo */}
        <div className="px-4 mb-8">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            SubManager
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 w-full text-left ${
                isActive
                  ? 'bg-primary-100 dark:bg-gray-700 text-primary-700 dark:text-primary-300 font-semibold shadow-inner'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600'
              }`
            }
          >
            <span className="font-medium">Dashboard</span>
          </NavLink>
          <NavLink
            to="/subscriptions"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 w-full text-left ${
                isActive
                  ? 'bg-primary-100 dark:bg-gray-700 text-primary-700 dark:text-primary-300 font-semibold shadow-inner'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600'
              }`
            }
          >
            <span className="font-medium">All Subscriptions</span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom Section: User Profile + Logout */}
      <div className="space-y-4">
        {/* Logo kept simple - no user profile or logout in public mode */}
      </div>
    </aside>
  );
};

export default Sidebar;

