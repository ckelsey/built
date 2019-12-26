import { ToRegex } from '..'

export const Match = (toSearchFor, toSearchIn) => {
    const doSearch = search => search.match(ToRegex(toSearchFor).value)

    if (toSearchIn === undefined) {
        return toSearchIn => doSearch(toSearchIn)
    }

    return doSearch(toSearchIn)
}