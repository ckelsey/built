import { createInput } from './methods-elements'
import { ValidateHtml } from '../../utils/validate'
import { setColors } from './elements';

const addRemoveContainerClass = (val, host, clss) => {
    host.elements.container.classList[!!val ? `add` : `remove`](clss)
}

export default {
    accentcolor: (_val, host) => setColors(host),

    autocomplete: (_val, host) => host.setInputAttributes(),

    class: (val, host) => {
        if (!!host.state.class.previous && host.state.class.previous.length) {
            host.elements.root.classList.remove(host.state.class.previous)
        }

        if (!!val && val.length) {
            host.elements.root.classList.add(val)
        }
    },

    clearbutton: (val, host) => {
        host.setClearButton()
        addRemoveContainerClass(!!val, host, `clearbutton`)
    },

    count: (val, host) => host.setCount(val),

    warningcolor: (_val, host) => setColors(host),

    disabled: (val, host) => {
        if (!host.elements.input) { return }

        host.setInputAttributes()
        addRemoveContainerClass(val, host, `disabled`)
    },

    disablefilter: (val, host) => host.type === `rotary` && host.elements.rotary
        ? host.elements.rotary.disablefilter = val
        : undefined,

    errortext: (val, host) => {
        if (!host.elements.error) { return }
        host.elements.error.innerHTML = ValidateHtml(val, [], [`script`]).sanitized || ``
    },

    focused: (val, host) => addRemoveContainerClass(val, host, `focused`),

    helptext: (val, host) => {
        if (!host.elements.help) { return }
        host.elements.help.innerHTML = ValidateHtml(val, [], [`script`]).sanitized || ``
    },

    hideonfilter: (val, host) => addRemoveContainerClass(val, host, `hidefilteredout`),

    icon: (val, host) => {
        host.setIcon()
        addRemoveContainerClass(val, host, `icon`)
    },

    iconalign: (val, host) => host.elements.container.setAttribute(`icon-align`, val),

    invalid: (val, host) => {
        setColors(host)

        if (!val) {
            host.setAttribute(`valid`, `true`)
            return addRemoveContainerClass(val, host, `invalid`)
        }

        if (!!host.processedErrorText) {
            host.elements.error.innerHTML = host.processedErrorText
        }

        host.removeAttribute(`valid`)

        addRemoveContainerClass(val, host, `invalid`)
    },

    label: (_val, host) => host.setLabel(),

    labelposition: (val, host) => {
        if (!host.elements.container) { return }

        host.setLabel()
        host.elements.container.setAttribute(`label-position`, val)
    },

    max: (val, host) => {
        host.setMax(val)
        addRemoveContainerClass(val, host, `max`)
    },

    maxlength: (val, host) => {
        host.setMax(val)
        addRemoveContainerClass(val, host, `maxlength`)
    },

    name: (_val, host) => host.setInputAttributes(),

    notempty: (val, host) => {
        host.setAttribute(`has-value`, `${val}`)
        addRemoveContainerClass(val, host, `notempty`)
    },

    options: (val, host) => host.setOptions(val),

    ready: (val, host) => addRemoveContainerClass(val, host, `ready`),

    resize: (val, host) => {
        if (!host.elements.container) { return }
        host.elements.container.setAttribute(`resize`, val)
    },

    required: (_val, host) => {
        if (!host.elements.input) { return }
        host.setInputAttributes()
    },

    showcount: (val, host) => addRemoveContainerClass(val, host, `showcount`),

    tabindex: (val, host) => {
        if (!host.elements.input) { return }
        host.elements.input.setAttribute(`tabIndex`, val)
    },

    type: (val, host) => {
        host.elements.input = createInput(
            val,
            host.elements.inputContainer
        )

        host.elements.container.setAttribute(`input-kind`, host.type)
    },

    value: (_val, host) => host.processValue()
}