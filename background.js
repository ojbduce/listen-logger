chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install' || details.reason === 'update') {
        // Clear any stored permission status on install/update
        chrome.storage.local.remove('microphonePermissionGranted', () => {
            // Open welcome page
            chrome.tabs.create({
                url: chrome.runtime.getURL('welcome.html'),
                active: true
            });
        });
    }
});