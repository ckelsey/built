import { Pipe, ToString, IfInvalid, ToSplit, ToMap, ToFilter, CommasToArray } from '../..'

const wcClass = (el, newClasses, previousClasses) => {
    if (!el) { return }

    if (Array.isArray(el)) {
        el = el[0]
    }

    let oldBrowser = !window.DOMTokenList.prototype.replace

    let newClassArray = Pipe(CommasToArray, IfInvalid([]))(newClasses).value
    let previousClassArray = Pipe(CommasToArray, IfInvalid([]))(previousClasses).value

    if (oldBrowser) {
        if (previousClassArray.length && !!el.className) {
            previousClassArray.forEach(c => el.className = el.className.split(c).map(cl => cl.trim()).join(``))
        }

        if (newClassArray.length) {
            newClassArray.forEach(c => el.className = `${el.className ? el.className : ``} ${c}`)
        }

        return
    }

    if (previousClassArray.length) {
        el.classList.remove(...previousClassArray)
    }

    if (newClassArray.length) {
        el.classList.add(...newClassArray)
    }
}


export const ComponentClassObject = {
    format: val => Pipe(ToString, IfInvalid(``), ToSplit(` `), ToMap(v => v.trim()), ToFilter(v => !!v))(val).value,
    onChange: (val, host) => wcClass(host.elements.root, val, host.state.class.previous)
}