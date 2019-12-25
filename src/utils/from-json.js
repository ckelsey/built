import { TMonad, Type, FromURIComponent } from '..'

export function FromJSON(value) {
    const result = TMonad(value)

    if (result.stop) { return result }

    try {
        result.value = JSON.parse(FromURIComponent(result.value).value)
        result.valid = true
    } catch (error) {
        result.valid = false
    }

    result.type = Type(result.value)

    if ([`object`, `array`].indexOf(result.type) > -1) {
        result.valid = true
    }

    return result
}

export default FromJSON