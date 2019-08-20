export const elementSelectors = {
    root: `.effect-ripple-container`,
    ripple: `.ripple`,
    rippleInner: `.ripple-inner`
}

const elements = {}

Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: () => { }
    }
})

export default elements