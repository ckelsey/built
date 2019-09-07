import { elementSelectors } from '../elements'
import { findIn } from '../../../utils/html/query'
import Get from '../../../utils/get'
import { Observe } from '../../../utils/observe'
import ObserveEvent from '../../../utils/observeEvent'

const IntlPhoneMarkup = `<country-dropdown labelcountry="false" labelflag="false" code="false" arrow="right"></country-dropdown><input class="phone">`
const IntlPhoneValue = input => {
    const countryValue = Get(findIn(input, `country-dropdown`), `value.phone`, ``)
    const textValue = Get(findIn(input, `input.phone`), `value`, ``)
    return `+${countryValue} ${textValue}`.trim()
}

const connect = (input, country, text) => {
    const Value$ = Observe(input.value)

    input.eventSubscriptions = {
        input: ObserveEvent(input, `input`, { preventDefault: true, stopPropagation: true }).subscribe(() => {
            input.dispatchEvent(new CustomEvent(`inputchange`, { detail: IntlPhoneValue(input) }))
        }),
        selectclose: ObserveEvent(country, `selectclose`).subscribe(() => {
            country.focused = false
            text.focus()
            country.blur()
        }),
        countryFocus: ObserveEvent(country, `focus`).subscribe(() => {
            country.focused = true
            input.dispatchEvent(new Event(`focus`))
        }),
        countryBlur: ObserveEvent(country, `blur`).subscribe(() => {
            country.focused = false

            if (!text.focused) {
                input.dispatchEvent(new CustomEvent(`inputchange`, { detail: IntlPhoneValue(input) }))
                input.dispatchEvent(new Event(`blur`))
            }
        }),
        textFocus: ObserveEvent(text, `focus`).subscribe(() => {
            text.focused = true
            input.dispatchEvent(new Event(`focus`))
        }),
        textBlur: ObserveEvent(text, `blur`).subscribe(() => {
            text.focused = false

            if (!country.focused) {
                input.dispatchEvent(new CustomEvent(`inputchange`, { detail: IntlPhoneValue(input) }))
                input.dispatchEvent(new Event(`blur`))
            }
        }),
        valueSubscription: Value$.subscribe(e => {
            const parts = e.split(` `)
            const countryCode = parts.shift().split(`+`).join(``).trim()
            const phone = parts.join(` `)
            const filteredOption = country.options.filter(o => o.value.phone === countryCode)[0]

            text.value = phone

            if (!!filteredOption && filteredOption.value) {
                country.value = filteredOption.value
            }

            if (text.focused) {
                if (text.createTextRange) {
                    var range = text.createTextRange()
                    range.move('character', input.cursorPosition)
                    range.select()
                } else if (text.selectionStart) {
                    text.setSelectionRange(input.cursorPosition, input.cursorPosition)
                }
            }
        })
    }

    Object.defineProperty(input, `value`, {
        get() {
            return Value$.value
        },
        set(value) {
            Value$.next(value)
        }
    })

    Object.defineProperty(input, `selectionEnd`, {
        get() {

            if (country.focused) {
                return 0
            }

            if (text.focused) {
                return text.selectionEnd
            }

            return (text.value || ``).length
        }
    })
}

export const IntlPhone = () => {
    let countdown = 0
    const input = document.createElement(`div`) as any
    input.innerHTML = IntlPhoneMarkup
    input.className = `${elementSelectors.input.split(`.`).join(``)} intl-phone-input`

    const country = findIn(input, `country-dropdown`) as any
    const text = findIn(input, `input.phone`) as any

    country.focused = false
    text.focused = false

    const loop = () => {
        if (countdown > 3000) { return }

        if (input.parentNode) {
            return connect(input, country, text)
        }

        countdown = countdown + 1
        requestAnimationFrame(loop)
    }

    loop()

    return input
}

