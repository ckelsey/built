import pipe from '../pipe'
import ToString from '../convert/to_string'
import IfInvalid from '../convert/if_invalid'
import Split from '../convert/split'
import Map from '../convert/map'
import Filter from '../convert/filter'
import CommasToArray from '../convert/commas-to-array'

const wcClass = (el, newClasses, previousClasses) => {
    if (!el) { return }

    if (Array.isArray(el)) {
        el = el[0]
    }

    let oldBrowser = !(window as any).DOMTokenList.prototype.replace

    let newClassArray = pipe(CommasToArray, IfInvalid([]))(newClasses).value
    let previousClassArray = pipe(CommasToArray, IfInvalid([]))(previousClasses).value

    if (oldBrowser) {
        if (previousClassArray.length && !!el.className) {
            previousClassArray.forEach(c => el.className = el.className.split(c).map(cl => cl.trim()).join(``))
        }

        if (newClassArray.length) {
            newClassArray.forEach(c => el.className = `${!!el.className ? el.className : ``} ${c}`)
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

const ComponentClassObject = {
    format: val => pipe(ToString, IfInvalid(``), Split(` `), Map(v => v.trim()), Filter(v => !!v))(val).value,
    onChange: (val, host) => wcClass(host.elements.root, val, host.state.class.previous)
}

export default ComponentClassObject