console.log('Welcome page loaded');

async function requestMicrophoneAccess() {
    const statusDiv = document.getElementById('status');
    try {
        console.log('Requesting microphone access...');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Stop the tracks immediately after getting permission
        stream.getTracks().forEach(track => track.stop());
        
        // Store permission status
        await chrome.storage.local.set({ microphonePermissionGranted: true });
        
        statusDiv.textContent = 'Microphone access granted! You can now close this tab.';
        statusDiv.className = 'success';
        
        // Close the tab after a short delay
        setTimeout(() => {
            chrome.tabs.getCurrent(tab => {
                chrome.tabs.remove(tab.id);
            });
        }, 2000);
        
    } catch (error) {
        console.error('Microphone access error:', error);
        statusDiv.textContent = `Error: ${error.message}. Please try again.`;
        statusDiv.className = 'error';
    }
}

// Request permission when button is clicked
document.getElementById('requestPermission').addEventListener('click', requestMicrophoneAccess);