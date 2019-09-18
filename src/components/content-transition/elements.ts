import { setStyleRules } from '../../utils/html/markup'

export const setStyles = (el, host, styles) => {
    if (!el) { return }
    setStyleRules(el, styles || host.styles)
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
    currentContainer: {
        selector: `.current-slot`
    }
}

export default elements