import { Type } from '../..'

export const CreateElement = (obj, options = {}) => {
    const { fragment = true } = options
    const el = document.createElement(obj.tagName || `div`)

    Object.keys(obj).forEach(key => {
        if (key === `tagName`) { return }

        if ([`textContent`, `innerHTML`].indexOf(key) > -1) {
            return el[key] = obj[key]
        }

        if ([`string`, `number`, `boolean`].indexOf(Type(obj[key])) > -1) {
            el.setAttribute(key, obj[key])
        } else {
            el[key] = obj[key]
        }
    })

    if (!fragment) {
        return el
    }

    const _fragment = document.createDocumentFragment()
    _fragment.appendChild(el)
    return _fragment
}