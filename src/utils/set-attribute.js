export function SetAttribute(element, name, value, asProperty = false) {
    if (!element || !name) { return element }

    const set = (n, v) => {
        if (n === `accept`) { return element.setAttribute(`accept`, v ? Array.isArray(v) ? v.join(`, `) : v : undefined) }

        const arias = [`disabled`, `required`]

        if (arias.indexOf(n) > -1) {
            set(`aria-${n}`, v)
        }

        if (!asProperty) {
            return v ? element.setAttribute(n, v) : element.removeAttribute(n)
        }

        return v ? element[n] = v : element[n] = undefined
    }

    if (Array.isArray(name)) {
        name.forEach((n, i) => set(n, value[i]))
    } else {
        set(name, value)
    }

    return element
}