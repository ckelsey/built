import pipe from '../../utils/pipe'
import { IfInvalid, IfNot, IfIs } from '../../utils/convert/if'
import { ToString } from '../../utils/convert/string'
import { setSelectOptions } from './methods'
import { ToBool } from '../../utils/convert/bool'
import { addRemoveAttr, wcClassObject } from '../../utils/html/attr'
import { ToNumber } from '../../utils/convert/number'
import { Options } from '../../utils/convert/options'
import { isMobile } from '../../utils/platform'
import { dispatch } from './methods'
import { ToJSON } from '../../utils/convert/json'
import { setLabel, setStyles } from './elements'
import { findIn } from '../../utils/html/query'
import { IndexOf } from '../../utils/convert/array'
import { DROPDOWNSELECT } from './theme'
import { ToFunction } from '../../utils/convert/function'

const attributes = {
    arrow: {
        format: val => pipe(ToString, IndexOf([`right`, `left`, `true`, `false`]), IfInvalid(`true`), IfIs(`true`, DROPDOWNSELECT.arrow))(val).value,
        onChange: (val, host) => host.elements.root.setAttribute(`arrow`, val)
    },

    class: wcClassObject,

    disabled: {
        format: val => pipe(ToBool, IfNot(true, DROPDOWNSELECT.disabled))(val).value,
        onChange: (val, host) => {
            host.elements.root.classList[val ? `add` : `remove`](`disabled`)
            addRemoveAttr(host.elements.input, `disabled`, val)
        }
    },

    disablefilter: {
        format: val => pipe(ToBool, IfInvalid(DROPDOWNSELECT.disablefilter))(val).value,
        onChange: (val, host) => host.elements.root.classList[val ? `add` : `remove`](`disablefilter`)
    },

    showempty: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => setLabel(host)
    },

    emptyoption: {
        format: val => val === false || val === `false`
            ? false
            : val === undefined
                ? DROPDOWNSELECT.emptyoption
                : val,
        onChange: (_val, host) => setSelectOptions(host)
    },

    hideonfilter: {
        format: val => pipe(ToBool, IfInvalid(DROPDOWNSELECT.hideonfilter))(val).value,
        onChange: (val, host) => host.elements.root.classList[val ? `add` : `remove`](`hidefilteredout`)
    },

    multiple: {
        format: val => pipe(ToBool, IfInvalid(DROPDOWNSELECT.multiple))(val).value,
        onChange: (val, host) => {
            addRemoveAttr(host.elements.input, `multiple`, val)
        }
    },

    name: {
        format: val => pipe(ToString, IfInvalid(DROPDOWNSELECT.name))(val).value,
        onChange: (val, host) => {
            addRemoveAttr(host.elements.input, `name`, val)
        }
    },

    native: {
        format: val => pipe(ToBool, IfInvalid(DROPDOWNSELECT.native || isMobile))(val).value,
        onChange: (val, host) => {
            host.elements.root.classList[val ? `add` : `remove`](`native-select`)
        }
    },

    options: {
        format: val => pipe(Options, IfInvalid(DROPDOWNSELECT.options))(val).value,
        onChange: (_val, host) => setSelectOptions(host)
    },

    formatlabel: {
        format: val => pipe(ToFunction, IfInvalid(DROPDOWNSELECT.formatlabel))(val).value,
        onChange: (_val, host) => setSelectOptions(host)
    },

    formatvaluelabel: {
        format: val => typeof val === `function` ? val : DROPDOWNSELECT.formatvaluelabel,
        onChange: (_val, host) => setSelectOptions(host)
    },

    formatvalue: {
        format: val => pipe(ToFunction, IfInvalid(DROPDOWNSELECT.formatvalue))(val).value,
        onChange: (_val, host) => setSelectOptions(host)
    },

    readonly: {
        format: val => pipe(ToBool, IfNot(true, DROPDOWNSELECT.readonly))(val).value,
        onChange: (val, host) => {
            host.elements.root.classList[val ? `add` : `remove`](`readonly`)
            addRemoveAttr(host.elements.input, `readonly`, val)
        }
    },

    required: {
        format: val => pipe(ToBool, IfNot(true, DROPDOWNSELECT.required))(val).value,
        onChange: (val, host) => {
            addRemoveAttr(host.elements.input, `required`, val)
        }
    },

    styles: {
        format: val => typeof val === `string` ? val : DROPDOWNSELECT.styles,
        // onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
        onChange: (_val, host) => setStyles(host)
    },

    tabindex: {
        format: val => pipe(ToNumber, IfInvalid(DROPDOWNSELECT.tabindex))(val).value,
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
