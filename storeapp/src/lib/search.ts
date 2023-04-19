import { PostgrestSingleResponse } from "@supabase/supabase-js"
import supabase from "./supabase"

type StoreOutput = PostgrestSingleResponse<{
    createdAt: string;
    description: string | null;
    id: string;
    location: string;
    name: string;
    prompt: string;
    userid: string;
}>

export type StoreData = {
    createdAt: string;
    description: string | null;
    id: string;
    location: string;
    name: string;
    prompt: string;
    userid: string;
}

const sorter = (row: StoreData , splitQuery: string[]) => {
    const total: string = row.name + " " + row.location + " " + row.description
    let ret: number = 0
    splitQuery.map(q => {
        if(total.includes(q)) ret++
    })
    return ret
}


// change the schema to provide the country, state, city, and address to search based on instead
const search = async (query: string, country: string, state: string, city: string): Promise<StoreData[]> => {
    const splitQuery = query.split(/[\s,]+/)
    splitQuery.push(country, state, city)
    console.log("split query: ", splitQuery)

    for(let i = 0; i < splitQuery.length; i++) splitQuery[i] = `'${splitQuery[i]}'`
    const queryString = splitQuery.join(" | ")

    const rows = await supabase.from("Store").select().textSearch('title_description', queryString)
    const data = rows.data
    data?.sort((a: StoreData, b: StoreData): number => {
        const aIdx: number = sorter(a, splitQuery)
        const bIdx: number = sorter(b, splitQuery)
        return aIdx > bIdx ? 1 : aIdx===bIdx ? 0 : -1
    })

    return data!
}

export default search