document.addEventListener('DOMContentLoaded', () => {
    const cardListElement = document.getElementById('card-list');
    chrome.storage.local.get(['deck'], result => {
        const deck = result.deck;
        const cardList = deck.cardList;
        // create html item for each flash card
        Object.keys(cardList).forEach(key => {
            const card = cardList[key];
            const newListItem = document.createElement('tr');
            newListItem.classList.add('mt-3', 'fcard-edit');
            newListItem.id = key;

            // element for word
            const wordElement = document.createElement('p');
            wordElement.classList.add('word');
            wordElement.textContent = card.word;
            const wordTd = document.createElement('td');
            wordTd.appendChild(wordElement);
            newListItem.appendChild(wordTd);

            // element for reading (editable)
            const readingElement = document.createElement('input');
            readingElement.type = 'text';
            readingElement.value = card.reading;
            readingElement.className = 'reading';
            const readingTd = document.createElement('td');
            readingTd.appendChild(readingElement);
            newListItem.appendChild(readingTd);

            // element for translation (editable)
            const translationElement = document.createElement('input');
            translationElement.type = 'text';
            translationElement.value = card.translation;
            translationElement.className = 'translation';
            const translationTd = document.createElement('td');
            translationTd.appendChild(translationElement);
            newListItem.appendChild(translationTd);

            // delete button
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>`;
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', event => {
                const parentElement = event.target.closest('.fcard-edit');
                parentElement.style.animationPlayState = 'running';
                parentElement.addEventListener('animationend', () => {
                    parentElement.remove();
                    deck.size--;
                    delete deck.cardList[key];
                });
            });
            const deleteTd = document.createElement('td');
            deleteTd.appendChild(deleteButton);
            newListItem.appendChild(deleteTd);


            // Add card element to card list
            cardListElement.appendChild(newListItem);
        });
        // Event listerner for save button
        const saveChangesButton = document.getElementById('save-changes');
        saveChangesButton.addEventListener('click', () => {
            if (window.confirm('Do you really want to save your changes?\nIt can\'t be undone!')) {
                document.querySelectorAll('.fcard-edit').forEach(card => {
                    const key = card.id;
                    const translation = card.querySelector('.translation').value;
                    const reading = card.querySelector('.reading').value;
                    deck.cardList[key].reading = reading;
                    deck.cardList[key].translation = translation;
                    // Below is for dev purpose
                    // deck.cardList[key].interval = 1;
                    // deck.cardList[key].repetitions = 0;
                    // deck.cardList[key].ease = 2.5;
                    // deck.cardList[key].dueDate = new Date().toISOString();
                });
                chrome.storage.local.set({ deck: deck });
                alert('Changes saved!');
            }
        });
    });
});