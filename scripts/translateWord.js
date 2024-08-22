// Use proxy url to bypass CORS
const proxyUrl = 'https://midi-knowledgeable-walkover.glitch.me/proxy'; // Replace with your proxy server URL
const apiEndpoint = 'https://api-free.deepl.com/v2/translate';
const apiKey = 'e7cf8b3e-c697-49f6-a8e3-a3eae76afbc6:fx'; // Free API key for dev purpose

async function translateWord(word, source_lang='JA', targetLang='EN-US') {
    const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: apiEndpoint,
            options: {
                method: 'POST',
                headers: {
                    'Authorization': `DeepL-Auth-Key ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: [word],
                    source_lang: source_lang.toUpperCase(),
                    target_lang: targetLang.toUpperCase()
                })
            }
        })
    });

    if (!response.ok) {
        console.log(`Error occurred during fetching for translation of ${word}`);
        return word;
    }

    const data = await response.json();
    return data.translations[0].text;
}

export default translateWord;