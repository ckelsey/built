import { wcClassObject } from '../../utils/html/attr'
import { setStyles } from './elements'
import { CONTENTTRANSITION } from './theme'

export const properties = {
    class: wcClassObject,

    styles: {
        format: val => typeof val === `string` ? val : CONTENTTRANSITION.styles,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, host, val)
    },

    speed: {
        format: val => isNaN(val) ? CONTENTTRANSITION.speed : val
    }
}

export const observedAttributes = Object.keys(properties)