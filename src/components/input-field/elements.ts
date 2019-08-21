import ObserveEvent from '../../utils/observeEvent'
import { isMobile } from '../../utils/platform'
import Set from '../../utils/set'
import { setInputID, setEffects } from './methods-elements'
import { clearInput } from './methods-value'
import { dispatch, onInput, onFocus, onBlur, onKeyDown, onLabelClick } from './methods-events';

export const elementSelectors = Object.freeze({
    bounceZ: `.input-field-input-container effect-bounce-z`,
    checkIcon: `.input-field-checkbox-icon`,
    clearButton: `.input-field-clear`,
    container: `.input-field-container-inner`,
    count: `.input-field-character-count`,
    error: `.input-field-message-error`,
    help: `.input-field-message-help`,
    icon: `.input-field-icon`,
    inputContainer: `.input-field-input-container-inner`,
    input: `.input-field-input`,
    label: `.input-field-container-inner label`,
    max: `.input-field-character-count-max`,
    options: `overlay-content`,
    ripple: `.input-field-input-container effect-ripple`,
    root: `.input-field-container`,
    rotary: `rotary-list`,
    underline: `.input-field-input-container effect-underline`,
    valueInput: `.input-field-value-input`,
})

const setInputEvents = (input, host) => {
    if (host.inputContainerClick$) {
        host.inputContainerClick$()
    }

    input.eventSubscriptions = {
        onFocus: ObserveEvent(input, `focus`).subscribe(() => onFocus(host)),
        onBlur: ObserveEvent(input, `blur`).subscribe(() => onBlur(host)),
        onKeyDown: ObserveEvent(input, `keydown`).subscribe(e => onKeyDown(host, e)),
        // onPaste: ObserveEvent(input, `paste`).subscribe(e => {
        //     host.pasted = (e.clipboardData || (window as any).clipboardData).getData('text')
        // })
    }

    if ([`checkbox`, `radio`].indexOf(host.type) === -1) {

        input.eventSubscriptions.onInput = ObserveEvent(input, `input`).subscribe(() => onInput(host))

    } else if (host.type === `select` && isMobile) {

        input.eventSubscriptions.onSelect = ObserveEvent(input, `input`).subscribe(() => dispatch(host, `input`, host.value))

    } else {

        host.inputContainerClick$ = ObserveEvent(host.elements.inputContainer, `click`, { stopPropagation: true, preventDefault: true }).subscribe(() => {
            host.value = !host.value
            dispatch(host, `input`, host.value)
        })
    }
}

const setElementColor = (element, property, color) =>
    !!element
        ? Set(element, property, color)
        : undefined

export const setColors = host => {
    const invalid = host.invalid
    const color = invalid ? host.warningcolor : host.accentcolor
    setElementColor(host.elements.ripple, `color`, color)
    setElementColor(host.elements.underline, `color`, color)

    if ([`checkbox`, `radio`].indexOf(host.type) > -1) {
        setElementColor(host.elements.inputContainer, `style.color`, color)
    }
}

const elementMethods = {
    input: (input, host) => {
        setInputEvents(input, host)
        setInputID(host, host.inputID)
        setEffects(host)
    },

    clearButton: (el, host) => {
        el.eventSubscriptions = {
            click: ObserveEvent(el, `click`).subscribe(() => clearInput(host))
        }
    },

    label: (el, host) => {
        el.eventSubscriptions = {
            click: ObserveEvent(el, `click`).subscribe(e => onLabelClick(host, e))
        }
    },

    options: (el, host) => {
        el.eventSubscriptions = {
            hidden: ObserveEvent(el, `hidden`).subscribe(() => onBlur(host))
        }
    },

    ripple: (_el, host) => setColors(host),

    underline: (_el, host) => setColors(host)
}

const elements = {}

Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: elementMethods[key] ? elementMethods[key] : () => { }
    }
})

export default elements