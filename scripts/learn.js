import { reviewCard, getDueCards } from './learn-helper.js';


// get due cards
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['deck'], result => {
        const deck = result.deck;
        const cards = Object.values(deck.cardList);
        console.log(cards);
        const dueCards = getDueCards(cards);
        document.getElementById('due-card-count').textContent = dueCards.length;
        console.log(dueCards);
        if (dueCards.length == 0) {
            handleNoDueCards();
        } else {
            let currentCardIndex = 0;
            // display first card
            displayCurrentCard(dueCards, currentCardIndex);
            Array.from(document.getElementsByClassName('rating-button')).forEach(button => {
                button.addEventListener('click', () => {
                    const rating = parseInt(button.dataset.rating);
                    const cardId = document.getElementById('card').dataset.cardId;
                    console.log(rating);
                    console.log(cardId);
                    reviewCard(deck.cardList[cardId], rating);
                    chrome.storage.local.set({ deck: deck });
                    // display next card
                    currentCardIndex++;
                    if (currentCardIndex < dueCards.length) {
                        displayCurrentCard(dueCards, currentCardIndex);
                    } else {
                        // reset current card index
                        alert('Learning complete!');
                        location.reload();
                    }
                });
            });
        }
    });

    // add flip function
    document.getElementById('flip-card').addEventListener('click', flipCard);
});



function handleNoDueCards() {
    alert("Well done! Currently you have no due cards.");
    window.close();
}

function displayCurrentCard(cards, index) {
    const currentCard = cards[index];
    const cardDiv = document.getElementById('card');
    const front = cardDiv.querySelector('#fcard-front');
    const back = cardDiv.querySelector('#fcard-back');
    // set card div data for later processing
    cardDiv.setAttribute('data-card-id', currentCard.word);
    if (currentCard.reading != "") {
        front.innerHTML = `
            <ruby>${currentCard.word}<rt>${currentCard.reading}</rt></ruby>`;
    } else {
        front.textContent = currentCard.word;
    }
    back.textContent = currentCard.translation;
}

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