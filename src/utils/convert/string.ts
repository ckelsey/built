import { Tmonad, finishTMonad } from './t-monad'
import pipe from '../pipe'
import { DecodeUriComponent } from './uri'
import { FromEntities } from './entities'
import Get from '../get'
import { StopIfInvalid } from './if'
import { MatchMeta, SplitMeta, ReplaceMeta } from './meta'
import { Join, Map } from './array'

export const ToPlainText = value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type !== `string`) {
        result = pipe(
            ToString,
            StopIfInvalid,
            DecodeUriComponent,
            FromEntities
        )(result)
    } else {
        result = pipe(
            DecodeUriComponent,
            FromEntities
        )(result)
    }

    return finishTMonad(result, `string`, `ToPlainText`)
}

export const ToString = value => {
    let stop = Get(value, `stop`, false)

    if (stop) {
        return Tmonad(value)
    }

    let result = Tmonad(value)

    try {
        result.value = result.value.toString()
    } catch (error) { }

    result.valid = typeof result.value === `string`
    result.instanceof.push(`ToString`)
    return result
}

export const Split = delimeter => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type !== `string`) {
        result = ToString(result)
    }

    try {
        const splat = SplitMeta(result.value, delimeter)

        if (typeof splat.value === `string`) { throw new Error(`not array`) }

        result.stringChanges = result.stringChanges.concat(splat.stringChanges)
        result.value = splat.value
    } catch (error) {
        result.valid = false
    }

    return finishTMonad(result, `array`, `Split`)
}

export const Replace = (search, replace) => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type !== `string`) { result = ToString(result) }

    try {
        const replaced = ReplaceMeta(result.value, search, replace)
        result.value = replaced.value
        result.valid = true
        result.stringChanges = result.stringChanges.concat(replaced.stringChanges)

    } catch (error) {
        result.valid = false
    }

    return finishTMonad(result, `string`, `Replace`)
}

export const AfterEveryNth = (nth, insert) => value => {
    let result = Tmonad(value)
    let pointer = 0
    const changes = []

    if (result.stop) { return result }

    if (result.type !== `string`) { result = ToString(result) }

    const mapper = Map((val, index) => {
        let mapped = ``

        if ((index + 1) % nth === 0 && index !== 0) {
            mapped = `${val}${insert}`
            changes.push({
                start: pointer,
                end: pointer + (1 + insert.length),
                input: val,
                length: 1 + insert.length,
                result: mapped,
                added: insert
            })
            pointer = pointer + insert.length
        } else {
            mapped = val
            pointer = pointer + 1
        }

        return mapped
    })

    const r = pipe(
        Split(``),
        mapper,
        Join(``),
    )(result)

    r.stringChanges = r.stringChanges.concat(changes)
    r.valid = typeof r.value === `string` && r.value.length === 14
    r.instanceof.push(`AfterEveryNth`)
    return r
}

export const BeforeEveryNth = (nth, insert) => value => {
    let result = Tmonad(value)
    let pointer = 0
    const changes = []

    if (result.stop) { return result }

    if (result.type !== `string`) { result = ToString(result) }

    const mapper = Map((val, index) => {
        let mapped = ``

        if ((index + 1) % nth === 0 && index !== 0) {
            mapped = `${insert}${val}`
            changes.push({
                start: pointer,
                end: pointer + (1 + insert.length),
                input: val,
                length: 1 + insert.length,
                result: mapped,
                added: insert
            })
            pointer = pointer + insert.length
        } else {
            mapped = val
            pointer = pointer + 1
        }

        return mapped
    })

    const r = pipe(
        Split(``),
        mapper,
        Join(``),
    )(result)

    r.stringChanges = r.stringChanges.concat(changes)
    r.valid = typeof r.value === `string` && r.value.length === 14
    r.instanceof.push(`BeforeEveryNth`)
    return r
}

export const Match = search => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type !== `string`) { result = ToString(result) }

    const matches = MatchMeta(result.value, search, true)

    result.value = matches.value
    result.valid = result.value.length === 1
    result.stringChanges = result.stringChanges.concat(matches.stringChanges)
    result.instanceof.push(`Match`)
    return result
}

export const MatchAll = search => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type !== `string`) { result = ToString(result) }

    const matches = MatchMeta(result.value, search)

    result.value = matches.value
    result.valid = result.value.length > 0
    result.stringChanges = result.stringChanges.concat(matches.stringChanges)
    result.instanceof.push(`MatchAll`)
    return result
}

export const UpperCase = string => {
    const result = string

    try {
        result.value = result.value.toUpperCase()
    } catch (error) {
        result.valid = false
    }

    result.instanceof.push(`UpperCase`)
    return result
}

export const Capitalize = string => {
    const result = string

    try {
        result.value = `${result.value.slice(0, 1).toUpperCase()}${result.value.slice(1) || ``}`
    } catch (error) {
        result.valid = false
    }

    result.instanceof.push(`Capitalize`)
    return result
}

export const LowerCase = string => {
    const result = string

    try {
        result.value = result.value.toLowerCase()
    } catch (error) {
        result.valid = false
    }

    result.instanceof.push(`LowerCase`)
    return result
}