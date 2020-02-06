import { Pipe } from './pipe.js'
import { CommasToArray } from './commas-to-array.js'
import { IfInvalid } from './if-invalid.js'
import { ToString } from './to-string.js'
import { ToSplit } from './to-split.js'
import { ToMap } from './to-map.js'
import { ToFilter } from './to-filter.js'

function trim(el) {
    return el.trim()
}

function is(el) {
    return !!el
}

function wcClass(el, newClasses, previousClasses) {
    if (!el) { return }

    if (Array.isArray(el)) {
        el = el[0]
    }

    let oldBrowser = !window.DOMTokenList.prototype.replace

    let newClassArray = Pipe(CommasToArray, IfInvalid([]))(newClasses).value
    let previousClassArray = Pipe(CommasToArray, IfInvalid([]))(previousClasses).value



    function previousClassArrayEach(c) {
        el.className = el
            .className
            .split(c)
            .map(trim)
            .join('')
    }

    function newClassArrayEach(c) {
        el.className = ''.concat(el.className ? el.className : '', ' ', c)
    }

    if (oldBrowser) {
        if (previousClassArray.length && !!el.className) {
            previousClassArray.forEach(previousClassArrayEach)
        }

        if (newClassArray.length) {
            newClassArray.forEach(newClassArrayEach)
        }

        return
    }

    if (previousClassArray.length) {
        el.classList.remove.apply(el.classList, previousClassArray)
    }

    if (newClassArray.length) {
        el.classList.add.apply(el.classList, newClassArray)
    }
}


export const ComponentClassObject = {
    format: function (val) {
        return Pipe(ToString, IfInvalid(''), ToSplit(' '), ToMap(trim), ToFilter(is))(val).value
    },
    onChange: function (val, host) {
        return wcClass(host.elements.root, val, host.state.class.previous)
    }
}