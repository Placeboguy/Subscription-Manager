import React from 'react';

/**
 * Reusable NavLink component for the Sidebar
 */
const NavItem = ({
  to,
  icon,
  children,
  currentPage,
  setCurrentPage,
}) => {
  const isActive = currentPage === to;
  const baseClasses =
    'flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 w-full text-left';
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
      {icon}
      <span className="font-medium">{children}</span>
    </button>
  );
};

export default NavItem;
