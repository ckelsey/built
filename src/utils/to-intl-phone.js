import { TMonad } from './t-monad.js'
import { ToDigits } from './to-digits.js'
import { ToPhone } from './to-phone.js'

export function ToIntlPhone(value) {
    let result = TMonad(value)

    if (result.stop) { return result }

    const parts = result.value.split(' ')
    const countryCode = parts[0].indexOf('+') > -1 ? ''.concat(parts.shift(), ' ') : ''
    const countryCodeMonad = ToDigits(countryCode)
    const r = ToPhone(parts.join(' '))

    result.value = ''.concat('+', countryCodeMonad.value, ' ', r.value).trim()
    result.stringChanges = r.stringChanges
    return result
}