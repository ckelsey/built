import { wcClassObject } from '../../utils/html/attr'
import { setStyles, setKeepChildren } from './elements'
import { CONTENTTRANSITION } from './theme'
import pipe from '../../utils/pipe'
import { ToBool } from '../../utils'
import IfInvalid from '../../utils/convert/if_invalid'

export const properties = {
    class: wcClassObject,

    styles: {
        format: val => typeof val === `string` ? val : CONTENTTRANSITION.styles,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, host, val)
    },

    speed: {
        format: val => isNaN(val) ? CONTENTTRANSITION.speed : val
    },

    type: {
        format: val => [`fade`, `slide`].indexOf(val) > -1 ? val : `fade`
    },

    keepchildren: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (_val, host) => setKeepChildren(host)
    }
}

export const observedAttributes = Object.keys(properties)