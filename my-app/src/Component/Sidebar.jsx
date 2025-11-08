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

const IconSettings = ({ size = 20, className = '' }) => (
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
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
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
  // Get user info from localStorage
  const userInfo = localStorage.getItem('userInfo');
  let user = { name: 'User', email: 'user@example.com' };
  
  if (userInfo) {
    try {
      user = JSON.parse(userInfo);
    } catch (err) {
      console.error('Error parsing user info:', err);
    }
  }

  // Generate initials for avatar
  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  // Generate a consistent color based on user name
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
  const colorIndex = user.name ? user.name.charCodeAt(0) % colors.length : 0;
  const bgColor = colors[colorIndex];

  return (
    <div className="flex items-center space-x-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
        style={{ backgroundColor: bgColor }}
        title={user.name}
      >
        {initials}
      </div>
      <div>
        <h4 className="font-semibold text-sm text-gray-800 dark:text-white">
          {user.name}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {user.email}
        </p>
      </div>
    </div>
  );
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
          <NavItem
            to="settings"
            icon={<IconSettings size={20} />}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          >
            Settings
          </NavItem>
        </nav>
      </div>

      {/* Bottom Section: User Profile + Logout */}
      <div className="space-y-4">
        <UserProfile />
        <button 
          onClick={onLogout}
          className="flex w-full items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-800 hover:text-red-600 dark:hover:text-red-300 transition-all duration-200">
          <IconLogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

