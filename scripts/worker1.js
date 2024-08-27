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

    // save default settings in local storage
    chrome.storage.local.get(['sourceLang', 'targetLang'], result => {
        if (!result.sourceLang) {
            chrome.storage.local.set({ sourceLang: 'JA' });
        }
        if (!result.targetLang) {
            chrome.storage.local.set({ targetLang: 'EN-GB' });
        }
    });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == "addWord" && info.selectionText) {
        chrome.storage.local.get(['sourceLang', 'targetLang'], result => {
            const sourceLang = result.sourceLang;
            const targetLang = result.targetLang;
            const newWord = info.selectionText.trim();

            translateWord(newWord, sourceLang, targetLang)
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
        });

    }
    // open preferences tab
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