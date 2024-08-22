import translateWord from './translateWord.js';


chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "addWord",
        title: "Add word to flashcard deck",
        contexts: ["selection"]
    })
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == "addWord" && info.selectionText) {
        const newWord = info.selectionText.trim();
        translateWord(newWord)
        .then(translatedText => {
            console.log(`Word ${newWord}, Meaning ${translatedText}`);
            const newCard = {'word': newWord, 'translation': translatedText};
            chrome.storage.local.get(['deck'], result => {
                const deck = result.deck || [];
                deck.push(newCard);
                chrome.storage.local.set({deck: deck }, () => {
                    console.log(`Card ${JSON.stringify(newCard)} added to deck!`);
                });
            });
        })
        .catch(error => console.log(error));
    }
});