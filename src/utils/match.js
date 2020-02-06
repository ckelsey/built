import { ToRegex } from './to-regex.js'

export function Match(toSearchFor, toSearchIn) {
    function doSearch(search) {
        return search.match(ToRegex(toSearchFor).value)
    }

    if (toSearchIn === undefined) {
        return function MatchInner(toSearchIn) {
            return doSearch(toSearchIn)
        }
    }

    return doSearch(toSearchIn)
}