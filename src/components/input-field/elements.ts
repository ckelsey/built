import ObserveEvent from '../../utils/observeEvent'
import Set from '../../utils/set'
import { setInputID, setEffects, inputAttributeList, setInputValue } from './methods-elements'
import { clearInput } from './methods-value'
import { dispatch, onInput, onFocus, onBlur, onKeyDown, onLabelClick, setDroppable } from './methods-events'
import { addRemoveAttr } from '../../utils/html/attr'
import { setStyleRules } from '../../utils/html/markup'

export const setStyles = (el, styles) => {
    if (!el) { return }
    setStyleRules(el, styles)
}

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
    inputContainerOuter: `.input-field-input-container`,
    input: `.input-field-input`,
    label: `.input-field-container-inner label`,
    max: `.input-field-character-count-max`,
    ripple: `.input-field-input-container effect-ripple`,
    root: `.input-field-container`,
    rotary: `rotary-list`,
    underline: `.input-field-input-container effect-underline`,
    valueInput: `.input-field-value-input`,
    injectedStyles: `style.injectedStyles`
})

const setInputEvents = (input, host) => {
    if (host.inputContainerClick$) {
        host.inputContainerClick$()
    }

    input.eventSubscriptions = {
        onFocus: ObserveEvent(input, `focus`).subscribe(() => onFocus(host)),
        onBlur: ObserveEvent(input, `blur`).subscribe(() => onBlur(host)),
        onKeyDown: ObserveEvent(input, `keydown`).subscribe(e => onKeyDown(e, host))
    }

    if ([`checkbox`, `radio`].indexOf(host.type) > -1) {
        host.inputContainerClick$ = ObserveEvent(host.elements.inputContainer, `click`, { stopPropagation: true, preventDefault: true }).subscribe(() => {
            host.value = !host.value
            dispatch(host, `input`, host.value)
        })

    } else if (host.type === `intlphone`) {
        input.eventSubscriptions.onInput = ObserveEvent(input, `inputchange`).subscribe((e) => {
            host.value = e.detail
        })
    } else {
        input.eventSubscriptions.onInput = ObserveEvent(input, `input`).subscribe(() => {
            onInput(host)
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

export const setOptions = (input, options) => {
    if (!input) { return }

    input.options = options
}

// export const setSelectProperties = host => {
//     const input = host.elements.input

//     if (!input) { return }

//     input.styles = host.styles
//     input.emptyoption = host.emptyoption
//     input.class = host.class
// }

const elementMethods = {
    input: (input, host) => {
        inputAttributeList(host)
            .forEach(attr => attr === `value` ? setInputValue(input, host) : addRemoveAttr(input, attr, host[attr]))
        setInputEvents(input, host)
        setInputID(host, host.inputID)
        setEffects(host)
        setDroppable(host)
        setOptions(input, host.options)
        // setSelectProperties(host)
    },

    clearButton: (el, host) => {
        el.eventSubscriptions = {
            click: ObserveEvent(el, `click`).subscribe(() => clearInput(host))
        }
    },

    label: (el, host) => {
        el.eventSubscriptions = {
            click: ObserveEvent(el, `click`).subscribe(e => onLabelClick(e, host))
        }
    },

    ripple: (_el, host) => setColors(host),

    underline: (_el, host) => setColors(host),

    injectedStyles: (el, host) => setStyles(el, host.styles),

    icon: (el, host) => {
        el.eventSubscriptions = {
            click: ObserveEvent(el, `click`).subscribe(() => {
                const input = host.elements.input
                if (input) {
                    input.focus()
                }

                host.dispatchEvent(new CustomEvent(`iconclick`, { detail: host }))
            })
        }
    }
}

const elements = {}

Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: elementMethods[key] ? elementMethods[key] : () => { }
    }
})

export default elements