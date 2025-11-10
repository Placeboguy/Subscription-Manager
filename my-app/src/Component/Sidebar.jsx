import React from 'react';

// --- INLINED ICONS ---
// I've moved the required icons into this file to fix the import errors.

const IconHome = ({ size = 20, className = '' }) => (
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
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const IconGrid = ({ size = 20, className = '' }) => (
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
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const IconLogOut = ({ size = 20, className = '' }) => (
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
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
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

// --- INLINED COMPONENTS ---
// I've also moved NavItem and UserProfile into this file.

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
        <div className="flex items-center space-x-2 px-4 mb-8">
          <IconMoneyBillWave
            size={32}
            className="text-3xl text-primary-600 dark:text-primary-400"
          />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            SubManager
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavItem
            to="dashboard"
            icon={<IconHome size={20} />}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          >
            Dashboard
          </NavItem>
          <NavItem
            to="subscriptions"
            icon={<IconGrid size={20} />}
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

