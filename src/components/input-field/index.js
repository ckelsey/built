import { WCConstructor, WCDefine, ID, ObserveEvent, Set } from '../..'
import { observedAttributes, properties } from './properties'
import { processedValue, formattedValue, valid, validationMessage } from './computed'
import { setError, clearInput } from './methods-value'

const outerStyle = require(`./input-style.scss`)
const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `input-field`
const componentRoot = `.input-field-container`

export const setColors = (host, invalid) => {
    const color = invalid ? host.warningcolor : host.accentcolor

    if ([`checkbox`, `radio`].indexOf(host.type) > -1) {
        Set(host.elements.inputContainer, `style.color`, color)
    }
}

export const elements = {
    checkIcon: {
        selector: `.input-field-checkbox-icon`,
        onChange(el) {
            el.svg = `<svg xmlns="http://www.w3.org/2000/svg" style="stroke:currentColor;stroke-width:2px;" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
        }
    },
    clearButton: {
        selector: `.input-field-clear`,
        onChange: (el, host) => el.eventSubscriptions = {
            click: ObserveEvent(el, `click`).subscribe(() => clearInput(host))
        }
    },
    container: { selector: `.input-field-container-inner` },
    count: { selector: `.input-field-character-count` },
    error: { selector: `.input-field-message-error` },
    help: { selector: `.input-field-message-help` },
    icon: {
        selector: `.input-field-icon`,
        onChange: (el, host) => el.eventSubscriptions = {
            click: ObserveEvent(el, `click`).subscribe(() => {
                host.dispatchEvent(new CustomEvent(`iconclick`, { detail: host }))
            })
        }
    },
    inputContainer: { selector: `.input-field-input-container-inner` },
    max: { selector: `.input-field-character-count-max` },
    root: { selector: `.input-field-container` },
    filePathInput: {
        selector: `.input-field-file-path-overlay`,
        onChange: (el, host) => {
            if (host.type === `file` && host.pathvalue) {
                el.value = host.pathvalue
                return
            }

            el.value = ``

            if (host.type !== `file`) {
                el.style.display = `none`
            }
        }
    },
}

export const InputField = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
    observedAttributes,
    properties,
    elements,
    methods: { setError },
    computed: {
        processedValue,
        formattedValue,
        valid,
        validationMessage
    },
    getters: {
        value: host => host.formattedValue,
        invalid: host => !host.valid
    },
    setters: {
        value: host => value => host.state.value.next(value)
    },
    onConnected: host => host.inputID = ID(),
    formElement: true
})

WCDefine(componentName, InputField, `input`)