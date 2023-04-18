import supabase from "./supabase"

// change the schema to provide the country, state, city, and address to search based on instead
const search = async (query: string, country: string, state: string, city: string) => {
    const splitQuery = query.split(/[\s,]+/)
    splitQuery.push(country, state, city)

    for(let i = 0; i < splitQuery.length; i++) splitQuery[i] = `'${splitQuery[i]}'`
    const queryString = splitQuery.join(" | ")

    const rows = await supabase.from("Store").select().textSearch('title_description', queryString)
    return rows
}

export default search