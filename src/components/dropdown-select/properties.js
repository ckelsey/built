import {
    ToOptions, IfIs, Pipe, IfInvalid, IfNot, ToString, ToBool, AddRemoveAttribute,
    ToNumber, IsMobile, FindElementIn, IndexOf, ToJSON, ToFunction, ComponentClassObject
} from '../..'
import { setSelectOptions } from './methods'
import { dispatch } from './methods'
import { setLabel, setStyles } from './elements'

const attributes = {
    arrow: {
        format: val => Pipe(ToString, IndexOf([`right`, `left`, `true`, `false`]), IfInvalid(`true`), IfIs(`true`, `right`))(val).value,
        onChange: (val, host) => host.elements.root.setAttribute(`arrow`, val)
    },

    class: ComponentClassObject,

    disabled: {
        format: val => Pipe(ToBool, IfNot(true, null))(val).value,
        onChange: (val, host) => {
            host.elements.root.classList[val ? `add` : `remove`](`disabled`)
            AddRemoveAttribute(host.elements.input, `disabled`, val)
        }
    },

    disablefilter: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => host.elements.root.classList[val ? `add` : `remove`](`disablefilter`)
    },

    statictext: {
        format: val => Pipe(ToString, IfInvalid(``))(val).value,
        onChange: (_val, host) => setLabel(host)
    },

    showempty: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => setLabel(host)
    },

    emptyoption: {
        format: val => val === false || val === `false` ? false : val === undefined ? `Select...` : val,
        onChange: (_val, host) => setSelectOptions(host)
    },

    hideonfilter: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (val, host) => host.elements.root.classList[val ? `add` : `remove`](`hidefilteredout`)
    },

    multiple: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => AddRemoveAttribute(host.elements.input, `multiple`, val)
    },

    name: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => AddRemoveAttribute(host.elements.input, `name`, val)
    },

    native: {
        format: val => Pipe(ToBool, IfInvalid(false || IsMobile))(val).value,
        onChange: (val, host) => host.elements.root.classList[val ? `add` : `remove`](`native-select`)
    },

    options: {
        format: val => Pipe(ToOptions, IfInvalid([]))(val).value,
        onChange: (_val, host) => setSelectOptions(host)
    },

    formatlabel: {
        format: val => Pipe(ToFunction, IfInvalid(function (v) { return v.label }))(val).value,
        onChange: (_val, host) => setSelectOptions(host)
    },

    formatvaluelabel: {
        format: val => typeof val === `function` ? val : function (v) { return v.label },
        onChange: (_val, host) => setSelectOptions(host)
    },

    formatvalue: {
        format: val => Pipe(ToFunction, IfInvalid(function (v) { return v.value }))(val).value,
        onChange: (_val, host) => setSelectOptions(host)
    },

    readonly: {
        format: val => Pipe(ToBool, IfNot(true, null))(val).value,
        onChange: (val, host) => {
            host.elements.root.classList[val ? `add` : `remove`](`readonly`)
            AddRemoveAttribute(host.elements.input, `readonly`, val)
        }
    },

    required: {
        format: val => Pipe(ToBool, IfNot(true, null))(val).value,
        onChange: (val, host) => AddRemoveAttribute(host.elements.input, `required`, val)
    },

    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (_val, host) => setStyles(host)
    },

    tabindex: {
        format: val => Pipe(ToNumber, IfInvalid(-1))(val).value,
        onChange: (val, host) => {
            AddRemoveAttribute(host.elements.input, `tabindex`, val)
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
        format: val => Pipe(ToString, IfInvalid(`inherit`))(val).value,
        onChange: (_val, host) => setStyles(host)
    },
    optionbackground: {
        format: val => Pipe(ToString, IfInvalid(`#fafafa`))(val).value,
        onChange: (_val, host) => setStyles(host)
    },
    optionselectedcolor: {
        format: val => Pipe(ToString, IfInvalid(`#fff`))(val).value,
        onChange: (_val, host) => setStyles(host)
    },
    optionselectedbackground: {
        format: val => Pipe(ToString, IfInvalid(`#59a2d8`))(val).value,
        onChange: (_val, host) => setStyles(host)
    },

    labelsize: {
        format: val => Pipe(ToString, IfInvalid(`inherit`))(val).value,
        onChange: (_val, host) => setStyles(host)
    },
    optionsize: {
        format: val => Pipe(ToString, IfInvalid(`inherit`))(val).value,
        onChange: (_val, host) => setStyles(host)
    },
}

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
export const properties = Object.assign({}, attributes)

export const observedAttributes = Object.keys(attributes)

export const selectedIndex = host => ({
    get() {
        if (!host.options || !host.options.length) { return undefined }

        const parsed = Pipe(ToJSON, ToString)(host.value)

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
            const val = Pipe(ToJSON, ToString)(formatted).value

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
        return Array.from(FindElementIn(overlay, `.select-option`, true))[host.selectedIndex + (host.emptyoption !== false ? 1 : 0)]
    }
})

export const optionElements = host => ({
    get() {
        const overlay = host.elements.overlay
        if (!overlay) { return [] }
        return Array.from(FindElementIn(overlay, `.select-option`, true))
    }
})
