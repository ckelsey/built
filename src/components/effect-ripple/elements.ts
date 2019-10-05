import SetStyleRules from '../../utils/html/set-style-rules'

export const elementSelectors = {
    root: `.effect-ripple-container`,
    ripple: `.ripple`,
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