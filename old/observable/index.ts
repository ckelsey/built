import Subscription from '../subscriptions'
import { ObservableObject, ObserverNext, ObserverError, ObserverComplete, ObserverObject } from '../../../typings'

class Observable extends Subscription implements ObservableObject {
    public static fromEvent(element: HTMLElement, eventName: string, preventDefault = false, stopPropagation = false): Observable {
        return new Observable((observer) => {

            const handler = (event) => {

                if (preventDefault) {
                    event.preventDefault()
                }

                if (stopPropagation) {
                    event.stopPropagation()
                }

                observer.next(event)
            }

            element.addEventListener(eventName, handler, false)

            return () => {
                element.removeEventListener(eventName, handler, false)
            }
        })
    }

    public isSharing = false
    public fn

    constructor(fn?: (obj: ObserverObject) => any) {
        super()
        this.fn = fn
    }

    public subscribe(next: ObserverNext, error?: ObserverError, complete?: ObserverComplete) {
        const subscriptionCount = Object.keys(this.subscriptions).length
        const shouldRunFunction = typeof this.fn === `function` && (!this.isSharing || (this.isSharing && !subscriptionCount))

        const loop = (key: string, value?) => {
            return Object.keys(this.subscriptions).forEach((subscriptionKey: string) => this.subscriptions[subscriptionKey][key](value))
        }

        const unsubscribe = super._subscribe(next, error, complete)

        if (shouldRunFunction) {
            this.fn({
                next: (value) => loop(`next`, value),
                error: (e) => loop(`error`, e),
                complete: () => loop(`complete`)
            })
        }

        return unsubscribe
    }

    public share(): ObservableObject {
        this.isSharing = true
        return this
    }

    public fromEvent(element: HTMLElement, eventName: string, preventDefault = false, stopPropagation = false): Observable {
        return this.fromEvent(element, eventName, preventDefault, stopPropagation)
    }
}

export default Observable
