import ComponentClassObject from '../../utils/html/component-class-object'
import { setStyles, setKeepChildren } from './elements'
import pipe from '../../utils/pipe'
import { ToBool } from '../../utils'
import IfInvalid from '../../utils/convert/if_invalid'

export const properties = {
    class: ComponentClassObject,

    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, host, val)
    },

    theme: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.themeStyles, host, val)
    },

    speed: {
        format: val => isNaN(val) ? 300 : val
    },

    type: {
        format: val => [`fade`, `slide`].indexOf(val) > -1 ? val : `fade`,
        onChange: (val, host) => {
            const root = host.elements.root
            if (!root) { return }
            root.setAttribute(`type`, val)
        }
    },

    keepchildren: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (_val, host) => setKeepChildren(host)
    },

    current: {
        format: val => val
    },

    start: {
        format: val => val
    },

    end: {
        format: val => val
    }
}

export const observedAttributes = Object.keys(properties)