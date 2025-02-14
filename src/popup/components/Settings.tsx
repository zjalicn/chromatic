import React from 'react';

interface SettingsProps {
  settings: {
    darkMode: boolean;
    notifications: boolean;
  };
  onUpdate: (settings: SettingsProps['settings']) => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onUpdate }) => {
  return (
    <div className="mb-4">
      <h2 className="text-sm font-semibold mb-2 dark:text-white">Settings</h2>
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={e => onUpdate({ ...settings, darkMode: e.target.checked })}
            className="form-checkbox"
          />
          <span className="text-sm dark:text-white">Dark Mode</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={e => onUpdate({ ...settings, notifications: e.target.checked })}
            className="form-checkbox"
          />
          <span className="text-sm dark:text-white">Notifications</span>
        </label>
      </div>
    </div>
  );
};
