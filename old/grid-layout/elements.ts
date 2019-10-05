import SetStyleRules from '../../utils/html/set-style-rules'
import { closeDrawerEvents } from './events'

export const setStyles = (el, host, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles || host.styles)
}

export const itemRowClass = `item-row`
export const itemRowSelector = `slot.${itemRowClass}`
export const activeElementClass = `active-grid-element`

const elements = {
    root: {
        selector: `.grid-layout-container`,
    },
    slot: {
        selector: `slot[master]`,
    },
    contentDrawer: {
        selector: `slot[name="content-drawer"]`
    },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: setStyles
    },
    itemsContainer: {
        selector: `.grid-layout-items`,
        onChange: (_el, host) => host.refresh()
    },
    closeButton: {
        selector: `.grid-layout-content-drawer-close`,
        onChange: closeDrawerEvents
    }
}

export const contentDrawerContainer = host => host.elements.root.querySelector(`.grid-layout-content-drawer`)

export const contentDrawerItems = host => Array
    .from(host.querySelectorAll(`[slot="content-drawer"]`))
    .map((el: any) => {
        el.classList.add(`content-drawer-item`)
        return el
    })

export default elements