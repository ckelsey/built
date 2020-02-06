import { ToRegex } from './to-regex.js'

function is(v) { return !!v }

export function ToSplitMeta(string, delimeter) {
    delimeter = delimeter ? delimeter : ''

    let match
    const arr = []
    const result = {
        value: string,
        stringChanges: []
    }

    try {
        if (!string || (!delimeter && delimeter !== '')) { return result }

        delimeter = ToRegex(delimeter).value

        let str = result.value ? result.value.toString() : ''

        if (delimeter.toString() === '/(?:)/') {
            return {
                value: str.split(''),
                stringChanges: []
            }
        }

        while ((match = ToRegex(delimeter).value.exec(str)) !== null) {
            const length = match.toString().length
            const matched = {
                start: match.index,
                end: match.index + length,
                input: match.input,
                length: length,
                result: [],
                removed: match[0]
            }

            const first = matched.start !== 0 ? str.slice(0, matched.start) : ''
            const second = str.slice(matched.end)

            matched.result = [first, second]
            result.stringChanges.push(matched)
            arr.push(first)
            str = second
        }

        arr.push(str)
        result.value = arr.filter(is)

    } catch (error) { }

    return result
}