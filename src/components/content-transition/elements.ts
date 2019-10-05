import SetStyleRules from '../../utils/html/set-style-rules'

export const setStyles = (el, host, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles || host.styles)
}

export const setKeepChildren = host => {
    const root = host.elements.root

    if (!root) { return }

    root.classList[host.keepchildren ? `add` : `remove`](`keepchildren`)
}

const elements = {
    root: {
        selector: `.content-transition-container`,
    },
    slot: {
        selector: `slot[current]`,
    },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: setStyles
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

export default elements