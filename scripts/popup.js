document.addEventListener('DOMContentLoaded', () => {
    const deck = [{'word': 'こんにちは', 'translation': 'Hello'}];
    const wordDiv = document.getElementById("word");
    const showWordButton = document.getElementById("show-word");

    // get deck from local storage, save if there's no deck in storage
    chrome.storage.local.get(['deck'], result => {
        if (!result.deck) {
            chrome.storage.local.set({deck: deck});
        }
    });

    // Add event listener to show random word
    showWordButton.addEventListener('click', () => {
        chrome.storage.local.get(['deck'], (result) => {
            const storeddeck = result.deck || [];
            const randomWord = storeddeck[Math.floor(Math.random() * storeddeck.length)];
            wordDiv.textContent = `${randomWord.word}\n${randomWord.translation}`;
        });
    });
});