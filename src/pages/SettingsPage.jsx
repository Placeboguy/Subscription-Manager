import React from 'react';

/**
 * Settings Page
 */
const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Settings
      </h1>

      {/* Removed Appearance Section since theme is hardcoded to dark */}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Profile
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Update your personal information. (UI Only)
        </p>
        <button className="px-5 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-md hover:bg-primary-700 transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Settings;
