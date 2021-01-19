const API = 'https://gentle-hamlet-64638.herokuapp.com/';

export interface TranslationData {
    fn: string;
}
export async function requestPythonToJs(code: string): Promise<TranslationData> {
    const rawResponse = await fetch(API, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({fn: code})
    });

    return await rawResponse.json();
}
