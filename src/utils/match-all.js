import { ToRegex } from './to-regex.js'

export function MatchAll(toSearchFor, toSearchIn) {
    function doSearch(search) {
        const matches = []

        search.replace(
            ToRegex(toSearchFor).value,

            function (match) {
                matches.push(([]).slice.call(arguments, 0))
                return match
            }
        )

        return matches
    }

    if (toSearchIn === undefined) {
        return function MatchAllInner(toSearchIn) {
            return doSearch(toSearchIn)
        }
    }

    return doSearch(toSearchIn)
}