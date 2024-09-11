# Flashcard for Learning Language

## Video Demo
[Watch the demo](https://youtu.be/Us-U0VhxZUI)

## Description
Learning new languages is my favorite extracurricular activity. When reading foreign language newspapers, I sometimes encounter words that I don't know. Manually creating new cards in the Anki flashcard deck is a tedious and time-consuming task. So, I decided to write an extension with a spaced repetition learning feature like Anki to help me store and memorize these words.

Flashcard for Learning Language is a Chrome extension designed to help users learn new languages using flashcards. It supports adding words to a deck through right-click, auto-translation via an API, and a spaced repetition learning algorithm (SM2).

## Features
- **Add Word to Deck**: Add new words to the flashcard decks with automatic machine translation (the translation may not always be accurate).
- **Spaced Repetition Learning**: This is the main feature of this extension. Users can review cards in the deck in a similar way to Anki Flashcards.
- **Edit Deck**: Users can edit the cards in the flashcard deck, change translations (since automatic machine translation might not always be accurate), add readings (for languages like Japanese, reading is important), and delete cards (when you master the word completely).
- **Export Deck**: Decks can be exported as CSV files for integration with other flashcard applications.
- **Choose the Language**: Users can choose the source language of the words and the target language for automatic machine translation.

## Usage
1. **Add Word to Deck**:
    - Select text on any webpage.
    - Right-click and choose "Add word to flashcard deck".
2. **Learn Deck**:
    - Open the extension popup.
    - Click on "Learn" to start the spaced repetition learning session.
3. **Edit Deck**:
    - Open the extension popup.
    - Click on "Edit Deck" to modify your flashcards.
4. **Export Deck**:
    - Open the extension popup.
    - Click on "Edit Deck" to go to the edit page.
    - Click on "Export deck as CSV" to download the deck as a CSV file.
5. **Choose the Language**:
    - Right-click on the extension icon on the toolbar and choose "Options".

## File Structure
- **manifest.json**: A must-have file for any Chrome extension. It contains metadata about the extension.
- **images**: Contains icons for the extension.
- **styles**: Contains stylesheets for each of the HTML pages.
    - **popup.css**: Contains styles for the main popup page.
    - **edit.css**: Contains styles for the edit page.
    - **learn.css**: Contains styles for the learn page.
- **popup/main_popup.html**: The default page that is opened when clicking the extension's icon. It can act as a navigation page for other features.
- **html**: Contains HTML files for the project.
    - **edit.html**: HTML file for editing the deck and exporting the deck to a CSV file.
    - **learn.html**: HTML file for the learn feature.
    - **preference.html**: A file for the user to edit the extension's preferences.
- **scripts**: Contains script files to enable the extension's functionalities.
    - **background.js**: The script that runs in the background of the extension. It enables the extension to save the word when selecting that word, right-clicking, and selecting "Add word to flashcard deck".
    - **translateWord.js**: Defines a function that receives a word and returns its translation for the background.js script to use. It uses an API for automatic translation. Since extensions cannot call the API directly because of CORS restrictions, the script sends the request to a backend proxy server that adds an API Key to the request and redirects it to the API provider.
    - **popup.js**: The script that enables popup page functionalities.
    - **preference.js**: The script that enables setting page functionalities.
    - **edit.js**: The script that enables edit page functionalities.
    - **learn.js**: The script that enables learn page functionalities.
    - **learn-helper.js**: Contains functions that define the spaced repetition learning logic for learn.js to use.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.