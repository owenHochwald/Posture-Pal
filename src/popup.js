// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const intervalInput = document.getElementById('interval');
    const saveButton = document.getElementById('save');
    const feedbackDiv = document.getElementById('feedback');
    const reminderCount = document.getElementById('reminder-count');

    // Load saved settings
    loadSettings();
    loadReminderCount();

    // Save settings when button is clicked
    saveButton.addEventListener('click', saveSettings);

    // Function to load saved settings
    function loadSettings() {
        chrome.storage.local.get(['interval'], (result) => {
            if (result.interval) {
                intervalInput.value = result.interval;
            }
        });
    }

    // Function to save settings
    function saveSettings() {
        const interval = parseInt(intervalInput.value);
        
        // Validate interval
        if (interval < 1 || interval > 120) {
            alert('Please enter an interval between 1 and 120 minutes.');
            return;
        }

        // Save to storage
        chrome.storage.local.set({
            interval: interval
        }, () => {
            // Show feedback
            showFeedback();
            
            // Update alarm
            chrome.runtime.sendMessage({
                type: 'updateInterval',
                interval: interval
            });
        });
    }

    // Function to show feedback
    function showFeedback() {
        feedbackDiv.style.display = 'block';
        feedbackDiv.textContent = 'Settings saved!';
        setTimeout(() => {
            feedbackDiv.style.display = 'none';
        }, 2000);
    }

    // Function to load reminder count
    function loadReminderCount() {
        chrome.storage.local.get(['reminderCount'], (result) => {
            reminderCount.textContent = result.reminderCount || 0;
        });
    }
});