import { z } from "zod"

export const CreateStoreData = z.object({
    createdAt: z.string(),
    userid: z.string(),
    name: z.string().min(3).max(20),
    description: z.string(),
    location: z.string(), // add specific format here later once fully decided
    prompt: z.string().min(20).max(2000)
})

export const ChangeStorePromptData = z.object({
    prompt: z.string().min(20).max(2000),
    id: z.string()
})

export const CreateOnlineStoreData = z.object({
    createdAt: z.string(),
    userid: z.string(),
    name: z.string().min(3).max(20),
    description: z.string(),
    website: z.string(),
    prompt: z.string().min(20).max(5000)
})