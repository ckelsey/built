import { Observer } from './observer.js'
import { ObserverReturnEmpty } from './observer-empty.js'
import { GetParent } from './get-parent.js'

export function ObserveExists(element) {
    if (!element) { return ObserverReturnEmpty() }

    if (element.exists$ && !element.exists$.isComplete) {
        return element.exists$
    }

    element.exists$ = Observer(!!GetParent(element))

    return element.exists$
}