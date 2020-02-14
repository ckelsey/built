import { OnNextFrame } from '../services/on-next-frame.js'
import { Observer } from './observer.js'
import { Equals } from './equals.js'

function setProperty(host, key, formatter, getter, setter) {
    try {
        Object.defineProperty(host, key, {
            get: function () {
                if (typeof getter === 'function') { return getter(host) }
                return host.state[key].value
            },
            set: function (value) {
                if (!host.state[key]) { return }

                if (typeof setter === 'function') { return setter(host)(value) }

                const formattedValue = formatter(value, host)
                const previous = host.state[key].value

                if (typeof previous === 'function' && typeof formattedValue === 'function' && formattedValue.toString() !== previous.toString()) {
                    return host.state[key].next(formattedValue)
                }

                if (!Equals(host.state[key].value, formattedValue)) {
                    host.state[key].next(formattedValue)
                }
            }
        })
    } catch (error) { }
}

export function ComponentStateProperty(host, key, formatter, onChange, getter, setter) {
    OnNextFrame(function setStatePropertyNext() {
        if (typeof formatter !== 'function') { return }

        host.state[key] = Observer(formatter(host.getAttribute(key) || host[key], host))

        setProperty(host, key, formatter, getter, setter)

        if (typeof onChange !== 'function') { return }

        host.state[key].subscribe(function stateNext(val) { return onChange(val, host) })
    })
}