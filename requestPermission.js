async function requestMicrophonePermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop tracks after getting permission
      stream.getTracks().forEach(track => track.stop());
      window.parent.postMessage({ type: 'permissionGranted' }, '*');
    } catch (error) {
      window.parent.postMessage({ type: 'permissionDenied', error: error.message }, '*');
    }
  }
  
  // Request permission when page loads
  requestMicrophonePermission();