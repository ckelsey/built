import ObserveEvent from '../../utils/observeEvent'

export const elementSelectors = {
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
}

const setInputEvents = (input, host) => {
    if (host.inputContainerClick$) {
        host.inputContainerClick$()
    }

    input.eventSubscriptions = {
        onFocus: ObserveEvent(input, `focus`).subscribe(e => host.onFocus(e)),
        onBlur: ObserveEvent(input, `blur`).subscribe(e => host.onBlur(e)),
        onKeyDown: ObserveEvent(input, `keydown`).subscribe(e => host.onKeyDown(e)),
        // onPaste: ObserveEvent(input, `paste`).subscribe(e => {
        //     host.pasted = (e.clipboardData || (window as any).clipboardData).getData('text')
        // })
    }

    if ([`checkbox`, `radio`].indexOf(host.type) === -1) {
        input.eventSubscriptions.onInput = ObserveEvent(input, `input`).subscribe(e => host.onInput(e))
    } else {
        host.inputContainerClick$ = ObserveEvent(host.elements.inputContainer, `click`, { useCapture: false, stopPropagation: true, preventDefault: true }).subscribe(() => {
            host.value = !host.value
            host.dispatch(`input`, host.value)
        })
    }
}

export const setColors = host => {
    if (host.elements.ripple) {
        host.elements.ripple.color = host.invalid ? host.warningcolor : host.accentcolor
    }

    if (host.elements.underline) {
        host.elements.underline.setAttribute(`color`, host.invalid ? host.warningcolor : host.accentcolor)
    }

    if (host.elements.inputContainer && [`checkbox`, `radio`].indexOf(host.type) > -1) {
        host.elements.inputContainer.style.color = host.invalid ? host.warningcolor : host.accentcolor
    }
}

const elementMethods = {
    input: (input, host) => {
        setInputEvents(input, host)
        host.setInputAttributes()
        host.setEffects()
    },

    clearButton: (el, host) => {
        el.eventSubscriptions = {
            click: ObserveEvent(el, `click`).subscribe(() => host.clearInput())
        }
    },

    label: (el, host) => {
        el.eventSubscriptions = {
            click: ObserveEvent(el, `click`).subscribe(() => host.onLabelClick())
        }
    },

    options: (el, host) => {
        el.eventSubscriptions = {
            hidden: ObserveEvent(el, `hidden`).subscribe(() => host.onBlur())
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