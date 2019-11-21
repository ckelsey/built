export const elementSelectors = {
    root: `.effect-scale-container`
}

const elements = {}

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: () => { }
    }
})

export default elements