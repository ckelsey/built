import { ComponentClassObject } from '../../utils/component-class-object.js'
import { setStyles, unsetItemEvents, setItemEvents, setChicklets, setPrevious, setNext } from './elements.js'
import { autoplay, setLoop } from './methods.js'
import { ToBool } from '../../utils/to-bool.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { ToNumber } from '../../utils/to-number.js'
import { ToArray } from '../../utils/to-array.js'
import { Get } from '../../utils/get.js'

export const attributes = {
    class: ComponentClassObject,

    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, host, val)
    },

    chicklets: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => setChicklets(host)
    },

    arrows: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => {
            setPrevious(host.elements.previous, host)
            setNext(host.elements.next, host)
        }
    },

    intervalplay: {
        format: val => Pipe(ToNumber, IfInvalid(0))(val).value,
        onChange: (_val, host) => autoplay(host)
    },

    currentindex: {
        format: (val, host) => {
            let num = Pipe(ToNumber, IfInvalid(0))(val).value

            if (Array.isArray(host.items) && num >= host.items.length) {
                num = host.items.length - 1
            }

            if (num < 0) { num = 0 }

            return num
        },
        onChange: (val, host) => host.scrollToIndex(val)
    },

    loop: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => {
            setLoop(host)
        }
    },

    center: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => {
            host.scrollToIndex(host.currentindex)
        }
    }
}

export const properties = Object.assign({}, attributes, {
    items: {
        format: (val, host) => Pipe(ToArray, IfInvalid(Get(host, `state.items.value`, [])))(val).value,
        onChange: (val, host) => {
            unsetItemEvents(host.state.items.previous)
            setItemEvents(val, host)
            host.scrollToIndex(host.currentindex)
            setChicklets(host)
            setLoop(host)
            autoplay(host)
            host.classList.add(`isready`)
        }
    }
})

export const observedAttributes = Object.keys(attributes)