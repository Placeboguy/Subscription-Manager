import React from 'react';

/**
 * User Profile for Sidebar
 */
const UserProfile = () => {
  return (
    <div className="flex items-center space-x-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <img
        className="w-10 h-10 rounded-full object-cover"
        src="https://placehold.co/40x40/3b82f6/ffffff?text=JD"
        alt="User avatar"
      />
      <div>
        <h4 className="font-semibold text-sm text-gray-800 dark:text-white">
          John Doe
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          john.doe@example.com
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
