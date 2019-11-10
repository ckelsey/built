import pipe from '../../utils/pipe'
import IfInvalid from '../../utils/convert/if_invalid'
import IfNot from '../../utils/convert/if_not'
import IfIs from '../../utils/convert/if_is'
import ToString from '../../utils/convert/to_string'
import { setSelectOptions } from './methods'
import ToBool from '../../utils/convert/bool'
import { addRemoveAttr } from '../../utils/html/attr'
import ToNumber from '../../utils/convert/to_number'
import { Options } from '../../utils/convert/options'
import { isMobile } from '../../utils/platform'
import { dispatch } from './methods'
import { setLabel, setStyles } from './elements'
import { findIn } from '../../utils/html/query'
import IndexOf from '../../utils/convert/indexof'
import { ToFunction } from '../../utils/convert/function'
import { ToJSON } from '../../utils'
import ComponentClassObject from '../../utils/html/component-class-object'

const attributes = {
    arrow: {
        format: val => pipe(ToString, IndexOf([`right`, `left`, `true`, `false`]), IfInvalid(`true`), IfIs(`true`, `right`))(val).value,
        onChange: (val, host) => host.elements.root.setAttribute(`arrow`, val)
    },

    class: ComponentClassObject,

    disabled: {
        format: val => pipe(ToBool, IfNot(true, null))(val).value,
        onChange: (val, host) => {
            host.elements.root.classList[val ? `add` : `remove`](`disabled`)
            addRemoveAttr(host.elements.input, `disabled`, val)
        }
    },

    disablefilter: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => host.elements.root.classList[val ? `add` : `remove`](`disablefilter`)
    },

    statictext: {
        format: val => pipe(ToString, IfInvalid(``))(val).value,
        onChange: (_val, host) => setLabel(host)
    },

    showempty: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => setLabel(host)
    },

    emptyoption: {
        format: val => val === false || val === `false`
            ? false
            : val === undefined
                ? `Select...`
                : val,
        onChange: (_val, host) => setSelectOptions(host)
    },

    hideonfilter: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (val, host) => host.elements.root.classList[val ? `add` : `remove`](`hidefilteredout`)
    },

    multiple: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => {
            addRemoveAttr(host.elements.input, `multiple`, val)
        }
    },

    name: {
        format: val => pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => {
            addRemoveAttr(host.elements.input, `name`, val)
        }
    },

    native: {
        format: val => pipe(ToBool, IfInvalid(false || isMobile))(val).value,
        onChange: (val, host) => {
            host.elements.root.classList[val ? `add` : `remove`](`native-select`)
        }
    },

    options: {
        format: val => pipe(Options, IfInvalid([]))(val).value,
        onChange: (_val, host) => setSelectOptions(host)
    },

    formatlabel: {
        format: val => pipe(ToFunction, IfInvalid(function (v) { return v.label }))(val).value,
        onChange: (_val, host) => setSelectOptions(host)
    },

    formatvaluelabel: {
        format: val => typeof val === `function` ? val : function (v) { return v.label },
        onChange: (_val, host) => setSelectOptions(host)
    },

    formatvalue: {
        format: val => pipe(ToFunction, IfInvalid(function (v) { return v.value }))(val).value,
        onChange: (_val, host) => setSelectOptions(host)
    },

    readonly: {
        format: val => pipe(ToBool, IfNot(true, null))(val).value,
        onChange: (val, host) => {
            host.elements.root.classList[val ? `add` : `remove`](`readonly`)
            addRemoveAttr(host.elements.input, `readonly`, val)
        }
    },

    required: {
        format: val => pipe(ToBool, IfNot(true, null))(val).value,
        onChange: (val, host) => {
            addRemoveAttr(host.elements.input, `required`, val)
        }
    },

    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (_val, host) => setStyles(host)
    },

    tabindex: {
        format: val => pipe(ToNumber, IfInvalid(-1))(val).value,
        onChange: (val, host) => {
            addRemoveAttr(host.elements.input, `tabindex`, val)
        }
    },

    value: {
        format: val => val,
        onChange: (_val, host) => {
            const overlay = host.elements.overlay
            if (overlay && typeof overlay.hide === `function`) { overlay.hide() }
            setLabel(host)
            dispatch(host, `input`)
        }
    },

    optioncolor: {
        format: val => pipe(ToString, IfInvalid(`inherit`))(val).value,
        onChange: (_val, host) => setStyles(host)
    },
    optionbackground: {
        format: val => pipe(ToString, IfInvalid(`#fafafa`))(val).value,
        onChange: (_val, host) => setStyles(host)
    },
    optionselectedcolor: {
        format: val => pipe(ToString, IfInvalid(`#fff`))(val).value,
        onChange: (_val, host) => setStyles(host)
    },
    optionselectedbackground: {
        format: val => pipe(ToString, IfInvalid(`#59a2d8`))(val).value,
        onChange: (_val, host) => setStyles(host)
    },

    labelsize: {
        format: val => pipe(ToString, IfInvalid(`inherit`))(val).value,
        onChange: (_val, host) => setStyles(host)
    },
    optionsize: {
        format: val => pipe(ToString, IfInvalid(`inherit`))(val).value,
        onChange: (_val, host) => setStyles(host)
    },
}

export const properties = Object.assign({}, attributes)

export const observedAttributes = Object.keys(attributes)

export const selectedIndex = host => ({
    get() {
        if (!host.options || !host.options.length) { return undefined }

        const parsed = pipe(ToJSON, ToString)(host.value)

        if (parsed.type === `undefined` || parsed.value === `` || parsed.value === `""`) {
            if (host.emptyoption === false) {
                host.value = host.formatvalue(host.options[0])
                return 0
            }

            return undefined
        }

        let i = 0

        while (i < host.options.length) {
            const formatted = host.formatvalue(host.options[i])
            const val = pipe(ToJSON, ToString)(formatted).value

            if (val === parsed.value) {
                return i
            }

            i = i + 1
        }

        return
    }
})

export const selectedOptionElement = host => ({
    get() {
        const overlay = host.elements.overlay
        if (!overlay) {
            return
        }
        return Array.from(findIn(overlay, `.select-option`, true))[host.selectedIndex + (host.emptyoption !== false ? 1 : 0)]
    }
})

export const optionElements = host => ({
    get() {
        const overlay = host.elements.overlay
        if (!overlay) { return [] }
        return Array.from(findIn(overlay, `.select-option`, true))
    }
})
