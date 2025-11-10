import React from 'react';

/**
 * Reusable NavLink component for the Sidebar
 */
const NavItem = ({
  to,
  children,
  currentPage,
  setCurrentPage,
}) => {
  const isActive = currentPage === to;
  const baseClasses =
    'px-4 py-2.5 rounded-lg transition-all duration-200 w-full text-left';
  const hoverClasses =
    'hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600';
  const activeClasses =
    'bg-primary-100 dark:bg-gray-700 text-primary-700 dark:text-primary-300 font-semibold shadow-inner';

  return (
    <button
      onClick={() => setCurrentPage(to)}
      className={`${baseClasses} ${
        isActive
          ? activeClasses
          : 'text-gray-600 dark:text-gray-300 ' + hoverClasses
      }`}
    >
      <span className="font-medium">{children}</span>
    </button>
  );
};

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
const Sidebar = ({ currentPage, setCurrentPage, onLogout }) => {
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
          <NavItem
            to="dashboard"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          >
            Dashboard
          </NavItem>
          <NavItem
            to="subscriptions"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          >
            All Subscriptions
          </NavItem>
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

