export function SetAttribute(element, name, value, asProperty) {
    asProperty = asProperty ? true : false
    if (!element || !name) { return element }

    function set(n, v) {
        if (n === 'accept') { return element.setAttribute('accept', v ? Array.isArray(v) ? v.join(', ') : v : undefined) }

        const arias = ['disabled', 'required']

        if (arias.indexOf(n) > -1) {
            set('aria-' + n, v)
        }

        if (!asProperty) {
            return v ? element.setAttribute(n, v) : element.removeAttribute(n)
        }

        return v ? element[n] = v : element[n] = undefined
    }

    function nameEach(n, i) {
        set(n, value[i])
    }

    if (Array.isArray(name)) {
        name.forEach(nameEach)
    } else {
        set(name, value)
    }

    return element
}