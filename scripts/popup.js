document.addEventListener('DOMContentLoaded', () => {
    const deck = [{'word': 'こんにちは', 'translation': 'Hello'}];
    const fcardFront = document.getElementById("fcard-front");
    const fcardBack = document.getElementById("fcard-back");
    const showWordButton = document.getElementById("show-word");
    const flipCardButton = document.getElementById("flip-card");
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
            fcardFront.textContent = `${randomWord.word}`;
            fcardBack.textContent = `${randomWord.translation}`;
        });
    });

    flipCardButton.addEventListener('click', flipCard);

});


function flipCard() {
    const front = document.getElementById('fcard-front');
    const back = document.getElementById('fcard-back');
    if (front.hasAttribute('hidden')) {
        front.removeAttribute('hidden');
        back.setAttribute('hidden', 'true');
    } else {
        front.setAttribute('hidden', 'true');
        back.removeAttribute('hidden');
    }
}

