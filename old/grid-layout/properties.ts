import { setStyles, activeElementClass, contentDrawerContainer, contentDrawerItems } from './elements'
import { GRIDLAYOUT } from './theme'
import pipe from '../../utils/pipe'
import { IsElement } from '../../utils/convert/dom'
import IfInvalid from '../../utils/convert/if_invalid'
import { triggerContentDrawer, removeContentDrawerItems } from './events'
import ToNumber from '../../utils/convert/to_number'
import ToBool from '../../utils/convert/bool'
import ComponentClassObject from '../../utils/html/component-class-object'

const attributes = {
    class: ComponentClassObject,

    targetheight: {
        format: val => typeof val !== `string` ? `200px` : val,
        onChange: (_val, host) => host.refresh()
    },

    styles: {
        format: val => typeof val === `string` ? val : GRIDLAYOUT.styles,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, host, val)
    },

    spacing: {
        format: val => pipe(ToNumber, IfInvalid(20))(val).value,
        onChange: (_val, host) => host.refresh()
    },

    draweroffset: {
        format: val => pipe(ToNumber, IfInvalid(0))(val).value,
    },

    fillrow: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => host.refresh()
    },

    filter: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (_val, host) => {
            removeContentDrawerItems(
                host,
                contentDrawerContainer(host),
                contentDrawerItems(host),
                true,
                true
            )
            host.refresh()
        }
    },

    hoverspacing: {
        format: val => pipe(ToNumber, IfInvalid(5))(val).value,
        onChange: (_val, host) => host.refresh()
    },
}

export const properties = Object.freeze(Object.assign({}, attributes, {
    activeElement: {
        format: val => pipe(IsElement, IfInvalid(null))(val).value,
        onChange: (val, host) => {
            if (!val || (val.classList && val.classList.contains(activeElementClass))) { return }

            triggerContentDrawer(host, val)
            host.itemElements.forEach(el => el.classList[el === val ? `add` : `remove`](activeElementClass))
        }
    }
}))

export const observedAttributes = Object.keys(attributes)