export const elementSelectors = {
    root: `.effect-underline-container`,
    underline: `.underline`
}

const elements = {}

Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: () => { }
    }
})

export default elements