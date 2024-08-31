// Use proxy url to bypass CORS
const proxyUrl = 'https://midi-knowledgeable-walkover.glitch.me/proxy'; // Replace with your proxy server URL
const apiEndpoint = 'https://api-free.deepl.com/v2/translate';

async function translateWord(word, sourceLang='JA', targetLang='EN-GB') {
    // actual body of the request sent to deepl api
    const body = {
        text: [word],
        source_lang: sourceLang.toUpperCase(),
        target_lang: targetLang.toUpperCase()
    };
    // payload for the request to proxy server
    const payload = {
        url: apiEndpoint,
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    };

    const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        console.log(`Error occurred during fetching for translation of ${word}`);
        return word;
    }

    const data = await response.json();
    return data.translations[0].text;
}

export default translateWord;