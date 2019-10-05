import ComponentClassObject from '../../utils/html/component-class-object'
import { setStyles, unsetItemEvents, setItemEvents, setChicklets, setPrevious, setNext } from './elements'
import { HORIZONTALSLIDER } from './theme'
import pipe from '../../utils/pipe'
import ToArray from '../../utils/convert/to_array'
import IfInvalid from '../../utils/convert/if_invalid'
import Get from '../../utils/get'
import { autoplay, setLoop } from './methods'
import ToBool from '../../utils/convert/bool'
import ToNumber from '../../utils/convert/to_number'

export const attributes = {
    class: ComponentClassObject,

    styles: {
        format: val => typeof val === `string` ? val : HORIZONTALSLIDER.styles,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, host, val)
    },

    chicklets: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => setChicklets(host)
    },

    arrows: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => {
            setPrevious(host.elements.previous, host)
            setNext(host.elements.next, host)
        }
    },

    intervalplay: {
        format: val => pipe(ToNumber, IfInvalid(0))(val).value,
        onChange: (_val, host) => autoplay(host)
    },

    currentindex: {
        format: (val, host) => {
            let num = pipe(ToNumber, IfInvalid(0))(val).value

            if (Array.isArray(host.items) && num >= host.items.length) {
                num = host.items.length - 1
            }

            if (num < 0) { num = 0 }

            return num
        },
        onChange: (val, host) => host.scrollToIndex(val)
    },

    loop: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => {
            setLoop(host)
        }
    },

    center: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (_val, host) => {
            host.scrollToIndex(host.currentindex)
        }
    }
}

export const properties = Object.assign({}, attributes, {
    items: {
        format: (val, host) => pipe(ToArray, IfInvalid(Get(host, `state.items.value`, [])))(val).value,
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