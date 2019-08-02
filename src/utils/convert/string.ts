import { Tmonad, finishTMonad } from './t-monad'
import { TMonad } from '.'
import pipe from '../pipe'
import { DecodeUriComponent } from './uri'
import { FromEntities } from './entities'
import Get from '../get'
import { StopIfInvalid } from './if'

export const ToPlainText: (v: any) => TMonad = value => {
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

export const ToString: (v: any) => TMonad = value => {
    let stop = Get(value, `stop`, false)

    if (stop) {
        return Tmonad(value)
    }

    let result = Tmonad(value)

    try {
        result.value = result.value.toString()
    } catch (error) { }

    return finishTMonad(result, `string`, `ToString`)
}

export const Split: (d: string) => (v: any) => TMonad = delimeter => value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.type !== `string`) {
        result = ToString(result)
    }

    try {
        result.value = result.value.split(delimeter).map(v => v.trim()).filter(v => !!v)
    } catch (error) { }

    return finishTMonad(result, `array`, `Split`)
}

export const Replace: (d: {}, i?:boolean) => (v: any) => TMonad = (searchReplace, ignoreCase=true) => value => {
    const searchReplaceArray = Object.keys(searchReplace).map(k=>([k, searchReplace[k]]))

    let result = Tmonad(value)

    try {
        searchReplaceArray.reduce(
            (v, i) => v.replace(new RegExp(i[0], `g${ignoreCase?`i`:``}`), i[1]),
            result.value
        )
    } catch (error) {
        result.valid = false
    }

    return finishTMonad(result, `string`, `Replace`)
}