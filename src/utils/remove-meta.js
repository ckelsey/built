import { ToRegex } from '..'

export function RemoveMeta(string, search) {
    let match
    const result = {
        value: string.toString(),
        stringChanges: []
    }

    while ((match = ToRegex(search).value.exec(result.value)) !== null) {
        const matched = {
            start: match.index,
            end: match.index + match[0].length,
            input: match.input,
            length: match[0].length,
            result: ``,
            removed: match[0]
        }

        const first = matched.start !== 0 ? result.value.slice(0, matched.start) : ``
        const second = result.value.slice(matched.end)

        matched.result = `${first}${second}`
        result.stringChanges.push(matched)
        result.value = matched.result
    }

    return result
}



