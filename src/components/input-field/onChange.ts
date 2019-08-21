import { createInput, replaceElementContents, setAttribute, findIn, setInputID, setInputAttribute, setLabel } from './methods-elements'
import { ValidateHtml } from '../../utils/validate'
import { setColors, elementSelectors } from './elements'
import { processValue } from './methods-value'
import { setOptions } from './methods-select'

const addRemoveContainerClass = (val, host, clss) => {
    host.elements.container.classList[!!val ? `add` : `remove`](clss)
}

export default {
    accentcolor: (_val, host) => setColors(host),

    autocomplete: (val, host) => setInputAttribute(host, `autocomplete`, val),

    class: (val, host) => {
        if (!!host.state.class.previous && host.state.class.previous.length) {
            host.elements.root.classList.remove(host.state.class.previous)
        }

        if (!!val && val.length) {
            host.elements.root.classList.add(val)
        }
    },

    clearbutton: (val, host) => {
        setAttribute(host.elements.clearButton, `type`, val)
        addRemoveContainerClass(!!val, host, `clearbutton`)
    },

    count: (val, host) => replaceElementContents(host.elements.count, val),

    warningcolor: (_val, host) => setColors(host),

    disabled: (val, host) => {
        setInputAttribute(host, `disabled`, val)
        addRemoveContainerClass(val, host, `disabled`)
    },

    disablefilter: (val, host) => host.type === `rotary` && host.elements.rotary
        ? host.elements.rotary.disablefilter = val
        : undefined,

    errortext: (val, host) => {
        replaceElementContents(host.elements.error, ValidateHtml(val, [], [`script`]).sanitized || ``)
    },

    focused: (val, host) => addRemoveContainerClass(val, host, `focused`),

    helptext: (val, host) => {
        replaceElementContents(host.elements.help, ValidateHtml(val, [], [`script`]).sanitized || ``)
    },

    hideonfilter: (val, host) => addRemoveContainerClass(val, host, `hidefilteredout`),

    icon: (val, host) => {
        setAttribute(host.elements.icon, `type`, val)
        addRemoveContainerClass(val, host, `icon`)
    },

    iconalign: (val, host) => setAttribute(host.elements.container, `icon-align`, val),

    inputID: (val, host) => setInputID(host, val),

    invalid: (val, host) => {
        setColors(host)
        setAttribute(host.elements.container, `valid`, val)
        addRemoveContainerClass(val, host, `invalid`)
    },

    label: (val, host) => setLabel(val, host.labelposition, host),

    labelposition: (val, host) => {
        setAttribute(host.elements.container, `label-position`, val)
        setLabel(host.label, val, host)
    },

    max: (val, host) => {
        replaceElementContents(host.elements.max, val || ``)
        addRemoveContainerClass(val, host, `max`)
    },

    maxlength: (val, host) => {
        replaceElementContents(host.elements.max, val || ``)
        addRemoveContainerClass(val, host, `maxlength`)
    },

    min: (val, host) => addRemoveContainerClass(val, host, `min`),

    name: (val, host) => setInputAttribute(host, `name`, val),

    notempty: (val, host) => addRemoveContainerClass(val, setAttribute(host, `has-value`, `${val}`), `notempty`),

    options: (val, host) => setOptions(val, host),

    processedErrorText: (val, host) => !!val ? replaceElementContents(host.elements.error, val) : undefined,

    ready: (val, host) => addRemoveContainerClass(val, host, `ready`),

    resize: (val, host) => setAttribute(host.elements.container, `resize`, val),

    required: (val, host) => setInputAttribute(host, `required`, val),

    showcount: (val, host) => addRemoveContainerClass(val, host, `showcount`),

    tabindex: (val, host) => setAttribute(host.elements.input, `tabIndex`, val),

    type: (val, host) => !host.elements.inputContainer
        ? undefined
        : host.elements.input = replaceElementContents(
            findIn(
                setAttribute(
                    host.elements.container,
                    `input-kind`,
                    val
                ),
                elementSelectors.inputContainer
            ),
            [createInput(val)]
        ).contents[0],

    value: (_val, host) => processValue(host)
}