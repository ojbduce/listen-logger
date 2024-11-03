# Project Repo Summary

## Core Extension Files

### manifest.json
- Defines Chrome extension configuration (Manifest V3)
- Specifies permissions (storage, tabs)
- Configures background service worker
- Defines web accessible resources
- Sets popup.html as default popup

### popup.html
- Main extension popup interface
- 300x400px popup window with material design
- Contains speech recognition controls
- Includes status display and debug information
- Uses Material Icons for UI elements

### popup.js
- Core speech recognition functionality
- Handles microphone permissions
- Manages WebkitSpeechRecognition API
- Implements start/stop controls
- Provides debug logging
- Updates UI based on recognition status

## Permission Management

### permission.html
- Simple HTML page for permission requests
- Loads requestPermission.js

### requestPermission.js
- Handles microphone permission requests
- Uses MediaDevices API
- Communicates results via postMessage

### welcome.html
- User onboarding interface
- Material design styling
- Microphone permission request UI
- Status feedback display

### welcome.js
- Handles permission request button clicks
- Manages microphone access through MediaDevices API
- Stores permission status in chrome.storage
- Provides user feedback

## Vite Configuration

### package.json
- Project configuration
- Development dependencies (Vite)
- NPM scripts for development and building

### package-lock.json
- Detailed dependency tree
- Version locking for all packages
- Build tool configurations

## Styling

### style.css
- Global styles for the application
- Dark/light theme support
- Responsive design utilities
- Button and layout styling

## Assets

### vite.svg
- Vite logo asset
- Used in development environment

## Development

### main.js
- Development entry point
- Imports necessary assets and styles
- Sets up counter functionality

This Chrome extension is built using Vite as the development tool and implements speech recognition functionality with proper permission handling and user feedback. It follows Material Design principles and includes comprehensive debug logging for development purposes. 