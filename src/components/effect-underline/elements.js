import { SetStyleRules } from '../..'

export const elementSelectors = {
    root: `.effect-underline-container`,
    underline: `.underline`,
    injectedStyles: `style.injectedStyles`
}

export const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const elements = {}

Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: key === `injectedStyles`
            ? (el, host) => setStyles(el, host.styles)
            : () => { }
    }
})

export default elements