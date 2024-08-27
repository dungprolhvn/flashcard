document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['sourceLang', 'targetLang'], function(result) {
        if (result.sourceLang) {
            document.getElementById('sourceLang').value = result.sourceLang;
        }
        if (result.targetLang) {
            document.getElementById('targetLang').value = result.targetLang;
        }
    });

    document.getElementById('preferencesForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const sourceLang = event.target.elements.sourceLang.value;
        const targetLang = event.target.elements.targetLang.value;
        chrome.storage.local.set({ sourceLang, targetLang }, function() {
            console.log('Preferences saved');
            alert('Preferences saved!');
        });
    });
});