import { atom } from "jotai"
import type { Getter, Setter } from 'jotai'
import type { Atom } from "jotai"

export type Location = {
    country?: string,
    state?: string,
    city?: string
}

const location: Atom<Location> = atom<Location>({
    country: "",
    state: "",
    city: ""
})

// const locationDerived: Atom<Location> = atom<Location>(
//     (get: Getter) => get(locationCore),
//     (get: Getter, set: Setter, value: Location) => set(locationCore, value)
// )

export default location