import { SetStyleRules } from '../..'
import { setStyleElement } from '.'

export const setStyles = (el, host, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles || host.styles)
}

export const setKeepChildren = host => {
    const root = host.elements.root

    if (!root) { return }

    root.classList[host.keepchildren ? `add` : `remove`](`keepchildren`)
}

export const elements = {
    root: {
        selector: `.content-transition-container`,
        onChange: (el, host) => {
            setStyleElement(host)
            el.setAttribute(`type`, host.type)
        }
    },
    current: {
        selector: `slot[name="current"]`,
    },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: setStyles
    },
    themeStyles: {
        selector: `style.themeStyles`,
        onChange: (el, host) => setStyles(el, host, host.theme)
    },
    next: {
        selector: `slot[name="next"]`,
    },
    nextContainer: {
        selector: `.next-slot`
    },
    hidden: {
        selector: `slot[name="hidden"]`,
    },
    hiddentContainer: {
        selector: `.hidden-slot`
    },
    currentContainer: {
        selector: `.current-slot`
    }
}