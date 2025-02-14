interface Message {
  action: string;
  data?: any;
}

class ContentScript {
  private initialized: boolean = false;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    if (this.initialized) return;

    chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));

    const settings = await this.getSettings();
    this.applySettings(settings);

    this.initialized = true;
    console.log('Content script initialized');
  }

  private handleMessage(
    message: Message,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) {
    switch (message.action) {
      case 'captureScreenshot':
        this.handleScreenshot(sendResponse);
        return true; // Keep connection alive for async response

      case 'applySettings':
        this.applySettings(message.data);
        sendResponse({ success: true });
        break;

      default:
        console.warn('Unknown message action:', message.action);
    }
  }

  private async handleScreenshot(sendResponse: (response?: any) => void) {
    try {
      // happens before screenshot
      sendResponse({ success: true });
    } catch (error) {
      console.error('Screenshot error:', error);
      sendResponse({ success: false, error: (error as Error).message });
    }
  }

  private async getSettings() {
    return new Promise(resolve => {
      chrome.runtime.sendMessage({ action: 'getSettings' }, settings => {
        resolve(settings || {});
      });
    });
  }

  private applySettings(settings: any) {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }
}

new ContentScript();
