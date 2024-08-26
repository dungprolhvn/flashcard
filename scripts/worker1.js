import translateWord from './translateWord.js';

chrome.runtime.onInstalled.addListener(() => {
    // context menu when select word and right click
    chrome.contextMenus.create({
        id: "addWord",
        title: "Add word to flashcard deck",
        contexts: ["selection"]
    });
    // context menu for Options feature
    chrome.contextMenus.create({
        id: "preference",
        title: "Preferences",
        contexts: ["action"]
    });
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
                    notifyUser(newCard);
                });
            });
        })
        .catch(error => console.log(error));
    }
    else if (info.menuItemId == "preference") {
        chrome.tabs.create({
            url: '../html/preference.html'
        })
    }
});


function notifyUser(card) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '../images/hello_extensions.png',
        title: 'New card added',
        message: `Added card ${card.word}: ${card.translation} to your deck!`
    });
}