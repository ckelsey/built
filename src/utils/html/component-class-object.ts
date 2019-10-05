import pipe from '../pipe'
import ToString from '../convert/to_string'
import IfInvalid from '../convert/if_invalid'
import Split from '../convert/split'
import Map from '../convert/map'
import Filter from '../convert/filter'
import CommasToArray from '../convert/commas-to-array'

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

const wcClass = /*#__PURE__*/ (el, newClasses, previousClasses) => {
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

const ComponentClassObject = {
    format: val => pipe(ToString, IfInvalid(``), Split(` `), Map(v => v.trim()), Filter(v => !!v))(val).value,
    onChange: (val, host) => wcClass(host.elements.root, val, host.state.class.previous)
}

export default ComponentClassObject