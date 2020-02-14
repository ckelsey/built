import { ObjectAssign } from '../utils/object-assign.js'


export function Elements(_elements) {
    const elements = ObjectAssign({}, Object.freeze(_elements || {}))

    if (!elements.outertheme) {
        elements.outertheme = { selector: 'style.outertheme' }
    }

    if (!elements.theme) {
        elements.theme = { selector: 'style.theme' }
    }

    return elements
}