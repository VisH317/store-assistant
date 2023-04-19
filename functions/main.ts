import 'xhr_polyfill'
import { serve } from 'https://deno.land/std@0.180.0/http/server.ts'
import { Configuration, OpenAIApi } from 'openai'

serve(async (req) => {
    const { setupPrompt, question } = req.json()

    const config = new Configuration({
        apiKey: Deno.env.get("OPENAI_API_KEY")
    })

    const openai = new OpenAIApi(config)

    const messages: Message[] = [
        {
            role: "system",
            content: "You are a store assistant that will provide information for locations of items and suggestions of items based on a description or desire. For each query, you will receive a store description, which contains the aisle name/number, followed by a colon, a list of items in the aisle, followed by a semicolon, and relative directions from the entrance to the store",
        },
        {
            role: "user",
            content: `Store description:\n${setupPrompt}\n\n###\n\nQuestion: ${question}`
        }
    ]

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.15
    })

    const completionText: string = completion.data.choices[0].message.context
    const body = JSON.stringify({
        result: completionText
    })

    return new Response(body, {
        status: 200,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
})

type Message = {
    role: "user" | "assistant" | "system",
    content: string
}