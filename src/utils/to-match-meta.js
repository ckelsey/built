import { ToString } from './to-string.js'
import { ToRegex } from './to-regex.js'

export function ToMatchMeta(string, search, justOne) {
    const matches = []
    const changes = []
    const value = typeof string === 'string' ? string : ToString(string).value
    let hasMatched = false

    function lastMatch() {
        return changes[changes.length - 1]
    }

    value.replace(ToRegex(search).value, function () {
        if (justOne && hasMatched) {
            return
        }

        hasMatched = true

        const arr = ([]).slice.call(arguments, 0)

        if (arr[0] === '') { return }

        const extras = arr.splice(-2)
        arr.index = extras[0]
        arr.input = extras[1]

        const last = lastMatch()
        const length = arr[0].length
        const match = {
            start: arr.index,
            end: arr.index + length,
            input: arr.input,
            length: length,
            result: arr[0],
            removed: undefined
        }

        if (match.start && last && last.end !== match.start) {
            match.removed = match.input.slice(last.end, match.start)
        } else {
            delete match.removed
        }

        matches.push(match.result)
        changes.push(match)
    })

    const last = lastMatch()

    if (last.end < value.length) {
        const removed = value.slice(last.end)
        changes.push({
            start: last.end,
            end: value.length,
            input: value,
            length: value.length - last.end,
            result: removed,
            removed: removed
        })
    }

    return {
        value: matches,
        stringChanges: changes
    }
}