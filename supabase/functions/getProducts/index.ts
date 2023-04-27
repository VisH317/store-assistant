import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Configuration, OpenAIApi } from 'openai'

const config = new Configuration({
    apiKey: Deno.env.get("OPENAI_API_KEY")
})

const openai = new OpenAIApi(config)

serve(async (req) => {
    const { prompt } = req.body
    const messages: Message[] = [
        {
            role: "system",
            content: "Analyze the following text, which contains a list of aisles or locations in a store, followed by the products on each aisle. For the whole text, provide only a comma-separated list of all the products found throughout the text prompt of the store. Return just the list without any extra text",
        },
        {
            role: "user",
            content: `Store description text: ${prompt}`
        }
    ]

    const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.1
    })

    const completionText: string = res.data.choices[0].message.context
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