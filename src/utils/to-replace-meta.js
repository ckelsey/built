import { ToRegex, ToReplacementPattern } from '..'

export function ToReplaceMeta(string, search, insert) {
    const replacements = ToReplacementPattern(insert)
    const result = { value: string.toString(), stringChanges: [] }
    let testString = result.value
    let match
    let index = 0

    while ((match = ToRegex(search).value.exec(testString)) !== null) {
        const end = match.index + match[0].length
        const matched = {
            start: match.index,
            end,
            input: match.input,
            length: match[0].length,
            result: ``,
            removed: match[0],
            pre: ``,
            post: ``,
            index
        }

        matched.pre = matched.start !== 0 ? testString.slice(0, matched.start) : ``
        matched.post = testString.slice(end)
        matched.result = `${matched.pre}${matched.post}`

        if (match.length > 1 && replacements.length) {
            matched.added = replacements.reduce((previous, current) => {
                if (typeof current === `string`) { return `${previous}${current}` }
                return `${previous}${match[current.index] || ``}`
            }, ``)

            matched.length = matched.added.length
            matched.end = match.index + matched.length
            matched.result = `${matched.pre}${matched.added || ``}${matched.post}`
        }

        result.stringChanges.push(matched)
        testString = matched.post
        index = index + 1
    }

    if (result.stringChanges.length) {
        result.value = result.stringChanges.reduce(
            (previous, current, i) => {
                const added = current.added || ``
                const post = i !== result.stringChanges.length - 1
                    ? ``
                    : current.post

                return `${previous}${current.pre}${added}${post}`
            }, ``
        )
    }

    return result
}
