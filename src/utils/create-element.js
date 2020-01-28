const fragment = document.createDocumentFragment()

export const CreateElement = obj => {
    const el = document.createElement(obj.tagName || `div`)
    fragment.appendChild(el)

    Object.keys(obj).forEach(key => {
        if (key === `tagName`) { return }

        if ([`textContent`, `innerHTML`].indexOf(key) > -1) {
            return el[key] = obj[key]
        }

        if (key === `children`) {
            if (Array.isArray(obj[key])) {
                return obj[key].forEach(child => el.appendChild(CreateElement(child)))
            } else {
                return el.appendChild(CreateElement(obj[key]))
            }
        }

        if ([`string`, `number`, `boolean`].indexOf(typeof obj[key]) > -1) {
            el.setAttribute(key, obj[key])
        } else {
            el[key] = obj[key]
        }
    })

    return el
}