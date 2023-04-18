import { atom } from "jotai"
import type { Atom } from "jotai"

export type Location = {
    country?: string,
    state?: string,
    city?: string
}

const location: Atom<Location> = atom<Location>({})

export default location