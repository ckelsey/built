export const elementSelectors = {
    root: `.effect-scale-container`
}

const elements = {}

Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: () => { }
    }
})

export default elements