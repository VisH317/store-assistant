// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Configuration, OpenAIApi } from 'openai'

console.log("Hello from Functions!")

const config = new Configuration({
    apiKey: Deno.env.get("OPENAI_API_KEY")
})

const openai = new OpenAIApi(config)

serve(async (req) => {
    const { setupPrompt, question } = req.json()
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

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
