document.addEventListener('DOMContentLoaded', () => {
    // dummy deck for saving if not exist any deck
    const deck = { size: 0, cardList: {} };
    const fcardFront = document.getElementById("fcard-front");
    const fcardBack = document.getElementById("fcard-back");
    const showWordButton = document.getElementById("show-word");
    const customLearnButton = document.getElementById('custom-learn');
    const editDeckButton = document.getElementById('edit-deck');
    const flipCardButton = document.getElementById("flip-card");

    // get deck from local storage, save if there's no deck in storage
    chrome.storage.local.get(['deck'], result => {
        if (!result.deck) {
            chrome.storage.lSocal.set({deck: deck});
        }
        document.getElementById('deck-size').textContent = result.deck.size;
    });

    // Add event listener to show random word
    showWordButton.addEventListener('click', () => {
        chrome.storage.local.get(['deck'], (result) => {
            const storeddeck = result.deck || { size: 0, cardList: {} };
            const cardList = storeddeck.cardList;
            const keys = Object.keys(cardList);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            fcardFront.textContent = `${cardList[randomKey].word}`;
            fcardBack.textContent = `${cardList[randomKey].translation}`;
        });
    });

    // Add event listener to flip card
    flipCardButton.addEventListener('click', flipCard);

    // Add event listener to edit deck button
    editDeckButton.addEventListener('click', event => {
        chrome.tabs.create({
            url: '../html/edit.html'
        });
    });

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

