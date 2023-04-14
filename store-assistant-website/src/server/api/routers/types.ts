import { z } from "zod"

export const CreateStoreData = z.object({
    createdAt: z.date(),
    userId: z.string(),
    name: z.string().min(3).max(20),
    desc: z.optional(z.string()),
    location: z.string(), // add specific format here later once fully decided
    prompt: z.string().min(20).max(2000)
})

export const ChangeStorePromptData = z.object({
    id: z.string().min(1).max(100),
    prompt: z.string().min(20).max(2000)
})