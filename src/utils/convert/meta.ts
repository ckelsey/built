import { ToRegex, ReplacementPattern } from './regex'
import { ToString } from './string'

export const MatchMeta = (string, search, justOne = false) => {
    const matches = []
    const changes = []
    const value = typeof string === `string` ? string : ToString(string).value
    const lastMatch = () => changes[changes.length - 1]
    let hasMatched = false

    value.replace(ToRegex(search).value, function () {
        if (justOne && hasMatched) {
            return
        }

        hasMatched = true

        const arr = ([]).slice.call(arguments, 0)

        if (arr[0] === ``) { return }

        const extras = arr.splice(-2)
        arr.index = extras[0]
        arr.input = extras[1]

        const last = lastMatch()
        const length = arr[0].length
        const match = {
            start: arr.index,
            end: arr.index + length,
            input: arr.input,
            length,
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

export const ReplaceMeta = (string, search, insert) => {
    const replacements = ReplacementPattern(insert)
    const result = { value: string.toString(), stringChanges: [] }
    let testString = result.value
    let match
    let index = 0

    while ((match = ToRegex(search).value.exec(testString)) !== null) {
        const end = match.index + match[0].length
        const matched: any = {
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

export const RemoveMeta = (string, search) => {
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

export const SplitMeta = (string, delimeter = ``) => {
    let match
    const arr = []
    const result = {
        value: string,
        stringChanges: []
    }

    try {
        if (!string || (!delimeter && delimeter !== ``)) { return result }

        delimeter = ToRegex(delimeter).value

        let str = result.value.toString()

        if (delimeter.toString() === `/(?:)/`) {
            return {
                value: str.split(``),
                stringChanges: []
            }
        }

        while ((match = ToRegex(delimeter).value.exec(str)) !== null) {
            const length = match.toString().length
            const matched = {
                start: match.index,
                end: match.index + length,
                input: match.input,
                length,
                result: [],
                removed: match[0]
            }

            const first = matched.start !== 0 ? str.slice(0, matched.start) : ``
            const second = str.slice(matched.end)

            matched.result = [first, second]
            result.stringChanges.push(matched)
            arr.push(first)
            str = second
        }

        arr.push(str)
        result.value = arr.filter(v => !!v)

    } catch (error) { }

    return result
}

export const JoinMeta = (array, delimeter) => {
    const result = {
        value: array,
        stringChanges: []
    }

    if (!delimeter) {
        result.value = result.value.join(delimeter)
        return result
    }

    try {
        let index = 1
        let joinedValue = result.value[index] || ``

        while (index < result.value.length) {
            result.stringChanges.push({
                start: joinedValue.length,
                end: joinedValue.length + delimeter.length,
                input: result.value[index],
                length: delimeter.length,
                result: ``,
                added: delimeter
            })
            joinedValue = `${joinedValue}${delimeter}${result.value[index]}`
            index = index + 1
        }

        result.value = joinedValue

    } catch (error) { }

    return result
}