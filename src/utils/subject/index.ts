import { Subscriptions, ObserverNext, ObserverError, ObserverComplete, SubjectObject } from '../../../typings'
import Subscription from '../subscriptions'

const loop = (subscriptions: Subscriptions, key: string, value: any) => {
    Object.keys(subscriptions).forEach((id: string) => {
        const obj: any = subscriptions[id]
        const fn: any = obj[key]
        fn(value)
    })
}

class Subject extends Subscription implements SubjectObject {
    public state: any
    public previousState: any
    public noInit: any

    constructor(state: any, noInit?: any) {
        super()
        this.state = state
        this.previousState = state
        this.noInit = noInit
    }

    get value() {
        return this.state
    }

    get previous() {
        return this.previousState
    }

    public next(value: any): void {
        if (typeof this.state === `function`) {
            return loop(this.subscriptions, `next`, this.state)
        }

        if (typeof value === `function`) {
            value = value(this.state)
        }

        this.previousState = this.state
        this.state = value

        loop(this.subscriptions, `next`, this.state)
    }

    public error(error: any): void {
        loop(this.subscriptions, `error`, error)
    }

    public complete(): void {
        loop(this.subscriptions, `complete`, undefined)
    }

    public subscribe(next: ObserverNext, error?: ObserverError, complete?: ObserverComplete): () => Subscriptions {
        if (!this.noInit && this.value !== undefined) {
            next(this.value)
        }

        return super._subscribe(next, error, complete)
    }
}

export default Subject
