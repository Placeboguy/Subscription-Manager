import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Reusable NavLink component for the Sidebar
 */
const NavItem = ({ to, icon, children, exact }) => {
  return (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 w-full text-left ${
          isActive
            ? 'bg-primary-100 dark:bg-gray-700 text-primary-700 dark:text-primary-300 font-semibold shadow-inner'
            : 'text-gray-600 dark:text-gray-300 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600'
        }`
      }
    >
      {icon}
      <span className="font-medium">{children}</span>
    </NavLink>
  );
};

export default NavItem;
