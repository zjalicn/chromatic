import React from 'react';

interface TabInfoProps {
  tab: chrome.tabs.Tab | null;
}

export const TabInfo: React.FC<TabInfoProps> = ({ tab }) => {
  if (!tab) return null;

  return (
    <div className="mb-4 p-3 bg-gray-100 rounded-lg dark:bg-gray-700">
      <h2 className="text-sm font-semibold mb-2 dark:text-white">Current Tab</h2>
      <div className="text-sm dark:text-gray-300">
        <p className="truncate">{tab.title}</p>
        <p className="truncate text-gray-500 dark:text-gray-400">{tab.url}</p>
      </div>
    </div>
  );
};
