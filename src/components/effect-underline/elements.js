import { SetStyleRules } from '../..'

export const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const elements = {
    root: { selector: `.effect-underline-container` },
    underline: { selector: `.underline` },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: (el, host) => setStyles(el, host.styles)
    }
}

export default elements