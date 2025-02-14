import React, { useState, useEffect } from 'react';
import { TabInfo } from './components/TabInfo';
import { Settings } from './components/Settings';
import { Actions } from './components/Actions';

const Popup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab | null>(null);
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
  });

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      setActiveTab(tabs[0]);
    });

    chrome.storage.local.get(['settings'], result => {
      if (result.settings) {
        setSettings(result.settings);
      }
    });
  }, []);

  const updateSettings = (newSettings: typeof settings) => {
    setSettings(newSettings);
    chrome.storage.local.set({ settings: newSettings });
  };

  return (
    <div className={`popup-container ${settings.darkMode ? 'dark' : ''}`}>
      <div className="p-4 min-w-[300px] min-h-[400px] dark:bg-gray-800">
        <header className="mb-4">
          <h1 className="text-xl font-bold dark:text-white">Chrome Extension</h1>
        </header>

        <main>
          <TabInfo tab={activeTab} />
          <Actions tab={activeTab} />
          <Settings settings={settings} onUpdate={updateSettings} />
        </main>

        <footer className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <p>v1.0.0</p>
        </footer>
      </div>
    </div>
  );
};

export default Popup;
