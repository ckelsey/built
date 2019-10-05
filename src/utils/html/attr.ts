export const setAttribute = /*#__PURE__*/ (element, name, value, asProperty = false) => {
    if (!element || !name) { return element }

    const set = (n, v) => {
        if (!asProperty) {
            return !!v ? element.setAttribute(n, v) : element.removeAttribute(n)
        }

        return !!v ? element[n] = v : element[n] = undefined
    }

    if (Array.isArray(name)) {
        name.forEach((n, i) => set(n, value[i]))
    } else {
        set(name, value)
    }

    return element
}

export const addRemoveAttr = /*#__PURE__*/ (el, attr, value) => {
    if (!el) { return }

    if (attr === `accept`) {
        return setAttribute(el, `accept`, !!value ? value.join(`, `) : undefined)
    }

    const arias = [`disabled`, `required`]

    if (arias.indexOf(attr) > -1) {
        setAttribute(el, `aria-${attr}`, value)
    }

    setAttribute(el, attr, value)

    return el
}