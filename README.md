# 🎨 chromatic

A Google Chrome Extension boilerplate built with React, Tailwind CSS, and TypeScript.

## Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Start development build with watch mode
npm run watch
```

## Loading the Extension

1. Open Google Chrome
2. Navigate to chrome://extensions/
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the dist directory from your project

The extension should now appear in your browser toolbar.

## Development Workflow

### Building the Extension

```bash
# Production build
npm run build

# Development build with watch mode
npm run watch
```

### Testing Changes

- Make your code changes
- If using watch mode, changes will rebuild automatically
- Go to chrome://extensions/
- Click the refresh icon on your extension card
- Test the updated extension

### Debugging

#### Popup Debugging

- Click on the extension icon
- Right-click on the popup
- Select "Inspect"
- Use Chrome DevTools for debugging

#### Background Script Debugging

- Go to chrome://extensions/
- Click "Details" on your extension
- Find "Inspect views: service worker"
- Use Chrome DevTools for debugging

#### Content Script Debugging

- Open DevTools on any webpage
- Go to "Sources" tab
- Look for your extension ID in the left sidebar
- Find your content scripts under the extension files

## Deployment

### Building for Production

```bash
# Clean install dependencies
npm ci

# Build for production
npm run build
```

### Creating a Package

1. Ensure your manifest.json has the correct version
2. Create a ZIP file of your dist directory
3. Remove any unnecessary files from the ZIP
4. Make sure the ZIP is under 10MB

### Chrome Web Store Submission

1. Go to [Chrome Developer Dashboard](https://developer.chrome.com/docs/webstore/set-up-account)
2. Create a new item
3. Fill in required information:

   - Description
   - Screenshots
   - Icon
   - Privacy policy

4. Upload your ZIP file
5. Submit for review

## Best Practices

### Performance

- Minimize extension size
- Use event-driven background scripts
- Avoid unnecessary content script injections
- Implement caching where appropriate

### Security

- Follow Content Security Policy guidelines
- Minimize required permissions
- Sanitize user input
- Use secure storage for sensitive data

### Code Quality

- Follow Chrome extension best practices
