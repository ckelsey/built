import { Observer } from './observer.js'
import { OnNextFrame } from '../services/on-next-frame.js'

export function ObserverReturnEmpty() {
    const _observer = Observer(false)

    OnNextFrame(function returnEmptyNext() {
        _observer.next(false)
        _observer.complete()
    })

    return _observer
}