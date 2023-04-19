/**
 * Supabase edge function to call the openai chatcompletion request
 */

type StoreCompletion = {
    storePrompt: string,
    question: string
}

type StoreRes = {
    result: string
}

export default async function storeCompletion(storePrompt: string, question: string) {

    const body: StoreCompletion = { storePrompt, question }

    const res = await fetch("https://xtkqzukucrjotxyewlkk.functions.supabase.co/storeChat", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(body)
    })

    const data: StoreRes = await res.json()
    return data.result
}