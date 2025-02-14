import React from 'react';

interface ActionsProps {
  tab: chrome.tabs.Tab | null;
}

export const Actions: React.FC<ActionsProps> = ({ tab }) => {
  const handleCapture = async () => {
    if (!tab?.id) return;

    try {
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'captureScreenshot',
      });
      console.log('Screenshot captured:', response);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  const handleSave = async () => {
    if (!tab?.url) return;

    try {
      await chrome.storage.local.set({
        [`bookmark_${Date.now()}`]: {
          url: tab.url,
          title: tab.title,
          date: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-sm font-semibold mb-2 dark:text-white">Actions</h2>
      <div className="flex gap-2">
        <button
          onClick={handleCapture}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Capture
        </button>
        <button
          onClick={handleSave}
          className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
};
