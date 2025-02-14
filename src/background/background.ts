interface BookmarkData {
  url: string;
  title: string;
  date: string;
}

// Initialize
chrome.runtime.onInstalled.addListener(async () => {
  const defaultSettings = {
    darkMode: false,
    notifications: true,
  };

  await chrome.storage.local.set({ settings: defaultSettings });

  chrome.contextMenus.create({
    id: 'saveBookmark',
    title: 'Save as bookmark',
    contexts: ['page', 'link'],
  });
});

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'captureScreenshot':
      handleScreenshot(sender.tab?.id);
      break;
    case 'saveBookmark':
      handleBookmark(message.data);
      break;
    case 'getSettings':
      handleGetSettings(sendResponse);
      return true;
  }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'saveBookmark') {
    handleBookmark({
      url: info.linkUrl || info.pageUrl || tab?.url || '',
      title: tab?.title || 'Untitled',
      date: new Date().toISOString(),
    });
  }
});

// Helper functions
async function handleScreenshot(tabId?: number) {
  if (!tabId) return;

  try {
    const screenshot = await chrome.tabs.captureVisibleTab();
    await chrome.storage.local.set({
      [`screenshot_${Date.now()}`]: screenshot,
    });

    showNotification('Screenshot saved!');
  } catch (error) {
    console.error('Screenshot error:', error);
    showNotification('Failed to capture screenshot', 'error');
  }
}

async function handleBookmark(data: BookmarkData) {
  try {
    await chrome.storage.local.set({
      [`bookmark_${Date.now()}`]: data,
    });

    showNotification('Bookmark saved!');
  } catch (error) {
    console.error('Bookmark error:', error);
    showNotification('Failed to save bookmark', 'error');
  }
}

async function handleGetSettings(sendResponse: (response: any) => void) {
  try {
    const { settings } = await chrome.storage.local.get('settings');
    sendResponse(settings);
  } catch (error) {
    console.error('Settings error:', error);
    sendResponse(null);
  }
}

function showNotification(message: string, type: 'success' | 'error' = 'success') {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: '/icons/icon128.png',
    title: type === 'success' ? 'Success' : 'Error',
    message,
  });
}
