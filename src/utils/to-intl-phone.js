import { TMonad, ToDigits, ToPhone } from '..'

export function ToIntlPhone(value) {
    let result = TMonad(value)

    if (result.stop) { return result }

    const parts = result.value.split(` `)
    const countryCode = parts[0].indexOf(`+`) > -1 ? `${parts.shift()} ` : ``
    const countryCodeMonad = ToDigits(countryCode)
    const r = ToPhone(parts.join(` `))

    result.value = `+${countryCodeMonad.value} ${r.value}`.trim()
    result.stringChanges = r.stringChanges
    return result
}