import { ToRegex } from './to-regex.js'
import { ToReplacementPattern } from './to-replacement-pattern.js'

export function ToReplaceMeta(string, search, insert) {
    const replacements = ToReplacementPattern(insert)
    const result = { value: string.toString(), stringChanges: [] }
    let testString = result.value
    let match
    let index = 0

    function replacementsReducer(previous, current) {
        if (typeof current === 'string') { return ''.concat(previous, current) }
        return ''.concat(previous, match[current.index] || '')
    }

    function stringChangesReducer(previous, current, i) {
        const added = current.added || ''
        const post = i !== result.stringChanges.length - 1
            ? ''
            : current.post

        return ''.concat(previous, current.pre, added, post)
    }

    while ((match = ToRegex(search).value.exec(testString)) !== null) {
        const end = match.index + match[0].length
        const matched = {
            start: match.index,
            end: end,
            input: match.input,
            length: match[0].length,
            result: '',
            removed: match[0],
            pre: '',
            post: '',
            index: index
        }

        matched.pre = matched.start !== 0 ? testString.slice(0, matched.start) : ''
        matched.post = testString.slice(end)
        matched.result = ''.concat(matched.pre, matched.post)

        if (match.length > 1 && replacements.length) {
            matched.added = replacements.reduce(replacementsReducer, '')

            matched.length = matched.added.length
            matched.end = match.index + matched.length
            matched.result = ''.concat(matched.pre, matched.added || '', matched.post)
        }

        result.stringChanges.push(matched)
        testString = matched.post
        index = index + 1
    }

    if (result.stringChanges.length) {
        result.value = result.stringChanges.reduce(stringChangesReducer, '')
    }

    return result
}
