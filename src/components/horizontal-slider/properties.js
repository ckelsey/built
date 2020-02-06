import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { ToNumber } from '../../utils/to-number.js'
import { ToBool } from '../../utils/to-bool.js'
import { Get } from '../../utils/get.js'
import { unsetItemEvents, setItemEvents, setChicklets, setPrevious, setNext } from './elements.js'
import { autoplay, setLoop } from './methods.js'
import { ToArray } from '../../utils/to-array.js'
import { AssignObject } from '../../utils/assign.js'

export const attributes = {
    chicklets: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(true))(val).value
        },
        onChange: function (val, host) { setChicklets(host) }
    },

    arrows: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(true))(val).value
        },
        onChange: function (val, host) {
            setPrevious(host.elements.previous, host)
            setNext(host.elements.next, host)
        }
    },

    intervalplay: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(0))(val).value
        },
        onChange: function (val, host) { autoplay(host) }
    },

    currentindex: {
        format: function (val, host) {
            let num = Pipe(ToNumber, IfInvalid(0))(val).value

            if (Array.isArray(host.items) && num >= host.items.length) {
                num = host.items.length - 1
            }

            if (num < 0) { num = 0 }

            return num
        },
        onChange: function (val, host) { host.scrollToIndex(val) }
    },

    loop: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(true))(val).value
        },
        onChange: function (val, host) {
            setLoop(host)
        }
    },

    center: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(true))(val).value
        },
        onChange: function (val, host) {
            host.scrollToIndex(host.currentindex)
        }
    }
}

export const properties = AssignObject({}, attributes, {
    items: {
        format: function (val, host) {
            return Pipe(ToArray, IfInvalid(Get(host, 'state.items.value', [])))(val).value
        },
        onChange: function (val, host) {
            unsetItemEvents(host.state.items.previous)
            setItemEvents(val, host)
            host.scrollToIndex(host.currentindex)
            setChicklets(host)
            setLoop(host)
            autoplay(host)
            host.classList.add('isready')
        }
    }
})

export const observedAttributes = Object.keys(attributes)