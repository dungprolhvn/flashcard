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
        chrome.storage.local.get(['deck'], result => {
            const deck = result.deck || [];
            if (!deck.includes(newWord)) {
                deck.push(newWord);
                chrome.storage.local.set({deck: deck }, () => {
                    console.log(`deck ${newWord} added to deck!`);
                });
            }
        });
    }
});