import { wcClassObject } from '../../utils/html/attr'
import { setStyles, activeElementClass, contentDrawerContainer, contentDrawerItems } from './elements'
import { GRIDLAYOUT } from './theme'
import pipe from '../../utils/pipe'
import { IsElement } from '../../utils/convert/dom'
import { IfInvalid } from '../../utils/convert/if'
import { triggerContentDrawer, removeContentDrawerItems } from './events'
import { ToNumber } from '../../utils/convert/number'

const attributes = {
    class: wcClassObject,

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

    filter: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (_val, host) => {
            removeContentDrawerItems(
                host,
                contentDrawerContainer(host),
                contentDrawerItems(host),
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
            if (!val || val.classList.contains(activeElementClass)) { return }

            triggerContentDrawer(host, val)
            host.itemElements.forEach(el => el.classList[el === val ? `add` : `remove`](activeElementClass))
        }
    }
}))

export const observedAttributes = Object.keys(attributes)