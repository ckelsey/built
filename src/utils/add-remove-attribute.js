import { SetAttribute } from './set-attribute.js'
export function AddRemoveAttribute(el, attr, value) {
    if (!el) { return }

    if (attr === `accept`) {
        return SetAttribute(el, `accept`, value ? value.join(`, `) : undefined)
    }

    const arias = [`disabled`, `required`]

    if (arias.indexOf(attr) > -1) {
        SetAttribute(el, `aria-${attr}`, value)
    }

    SetAttribute(el, attr, value)

    return el
}