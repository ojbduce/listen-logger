let recognition = null;

function updateDebugInfo(message) {
    const debugDiv = document.getElementById('debug-info');
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `${timestamp}: ${message}`;
    console.log(logMessage); // Log to Chrome's developer console
    debugDiv.innerHTML = logMessage + '<br>' + debugDiv.innerHTML; // Prepend new messages
}

async function checkMicrophonePermission() {
    try {
        // First check if we already have permission stored
        const stored = await chrome.storage.local.get('microphonePermissionGranted');
        if (!stored.microphonePermissionGranted) {
            updateDebugInfo('No stored microphone permission');
            return false;
        }

        // Verify permission is still valid
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        updateDebugInfo('Microphone permission verified');
        return true;
    } catch (error) {
        updateDebugInfo(`Microphone permission error: ${error.message}`);
        return false;
    }
}

function initializeSpeechRecognition() {
    updateDebugInfo('Initializing speech recognition...');
    if (!('webkitSpeechRecognition' in window)) {
        updateDebugInfo('ERROR: webkitSpeechRecognition not available');
        return false;
    }
    
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
        updateDebugInfo('Recognition started successfully');
        document.getElementById('status').textContent = 'Listening...';
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
    };

    recognition.onresult = (event) => {
        const timestamp = new Date().toLocaleTimeString();
        const text = event.results[event.results.length - 1][0].transcript;
        updateDebugInfo(`Speech detected: ${text}`);
        
        const logsDiv = document.getElementById('logs');
        const logItem = document.createElement('div');
        logItem.className = 'log-entry';
        logItem.textContent = `${timestamp}: ${text}`;
        logsDiv.insertBefore(logItem, logsDiv.firstChild);
    };

    recognition.onerror = (event) => {
        updateDebugInfo(`Recognition error: ${event.error}`);
        document.getElementById('status').textContent = `Error: ${event.error}`;
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
    };

    recognition.onend = () => {
        updateDebugInfo('Recognition ended');
        document.getElementById('status').textContent = 'Not listening';
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
    };

    return true;
}

// Initialize when the popup is loaded
document.addEventListener('DOMContentLoaded', async () => {
    updateDebugInfo('Extension popup loaded');
    
    if (!('webkitSpeechRecognition' in window)) {
        updateDebugInfo('Speech recognition not available');
        document.getElementById('status').textContent = 'Speech recognition not supported';
        return;
    }
    
    updateDebugInfo('Speech recognition is available');
    
    // Check permission
    const hasPermission = await checkMicrophonePermission();
    if (!hasPermission) {
        updateDebugInfo('Requesting microphone permission...');
        // Open welcome page in new tab
        chrome.tabs.create({
            url: chrome.runtime.getURL('welcome.html'),
            active: true
        });
        return;
    }
    
    // Initialize if we have permission
    initializeSpeechRecognition();
    document.getElementById('startBtn').disabled = false;
});

// Event Listeners
document.getElementById('startBtn').addEventListener('click', () => {
    updateDebugInfo('Start button clicked');
    if (!recognition) {
        updateDebugInfo('Initializing recognition for the first time');
        if (!initializeSpeechRecognition()) {
            updateDebugInfo('Failed to initialize speech recognition');
            return;
        }
    }
    
    try {
        updateDebugInfo('Starting recognition...');
        recognition.start();
    } catch (error) {
        updateDebugInfo(`Error starting recognition: ${error.message}`);
        document.getElementById('status').textContent = 'Failed to start recognition';
    }
});

document.getElementById('stopBtn').addEventListener('click', () => {
    updateDebugInfo('Stop button clicked');
    if (recognition) {
        recognition.stop();
        updateDebugInfo('Recognition stopped');
    }
});