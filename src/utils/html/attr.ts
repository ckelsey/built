import pipe from '../pipe'
import { IfInvalid } from '../convert/if'
import { ToString, Split } from '../convert/string'
import { Map, Filter } from '../convert/array'
import { CommasToArray } from '../convert/commas-to-array'

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

const addRemoveClassOld = (el, classArr, remove = false) => {
    const newClasses = (el.className || ``).split(` `).map(clss => clss.trim())

    classArr.forEach(clss => {
        const index = newClasses.indexOf(clss)

        if (remove && index > -1) {
            newClasses.splice(index, 1)
        } else if (!remove && index === -1) {
            newClasses.push(clss)
        }
    })

    el.className = newClasses.join(` `)
}

export const wcClass = /*#__PURE__*/ (el, newClasses, previousClasses) => {
    if (!el) { return }

    let oldClassList = false

    if (!(window as any).DOMTokenList.prototype.replace) {
        oldClassList = true
    }

    let newClass = pipe(CommasToArray, IfInvalid([]))(newClasses).value
    let previousClass = pipe(CommasToArray, IfInvalid([]))(previousClasses).value

    if (!!previousClass && previousClass.length) {
        if (oldClassList) {
            addRemoveClassOld(el, previousClass, true)
        } else {
            el.classList.remove(...previousClass)
        }
    }

    if (!!newClass && newClass.length) {
        if (oldClassList) {
            addRemoveClassOld(el, newClass)
        } else {
            el.classList.add(...newClass)
        }
    }
}

export const wcClassObject = /*#__PURE__*/ {
    format: val => pipe(ToString, IfInvalid(``), Split(` `), Map(v => v.trim()), Filter(v => !!v))(val).value,
    onChange: (val, host) => wcClass(host.elements.root, val, host.state.class.previous)
}