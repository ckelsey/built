import { TimeOutData, GenericObjects } from '../../../typings'
import Partial from '../partial';
import Curry from '../curry';
import Get from '../get';

let hidden
let visibilityChange

if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
} else if (typeof (document as any).msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
} else if (typeof (document as any).webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
}

let isHidden = false

document.addEventListener(visibilityChange, () => {
    isHidden = document[hidden]

    if (!isHidden && pausedQueue) {
        pausedQueue(`animationFrame`, undefined)
        pausedQueue = undefined
    }
}, false)

let animationFrame
let animationLoopFrame
let pausedQueue
const subscriptions: GenericObjects = {}

class Timers {
    public static runTimeout(fn: any, time: number): void {
        return this.cancelTimeout.bind(setTimeout(() => { fn() }, time))
    }

    public static cancelTimeout(): void {
        let timer = this as any
        clearTimeout(timer)
        timer = undefined
    }

    public static runFrame(): void {
        if (!animationFrame) {
            animationFrame = requestAnimationFrame(() => {
                this.triggerEvent(`requestAnimationFrame`, undefined)
            })
        }
    }

    public static runLoop(): void {
        if (!animationLoopFrame) {
            animationLoopFrame = requestAnimationFrame(() => {
                if (isHidden) {
                    pausedQueue = this.triggerEvent
                    return
                }

                this.triggerEvent(`animationLoop`, undefined)
            })
        }
    }

    public static cancelFrame(): void {
        cancelAnimationFrame(animationFrame)
        animationFrame = undefined
    }

    public static cancelLoop(): void {
        cancelAnimationFrame(animationLoopFrame)
        animationLoopFrame = undefined
    }

    public static initTimer(eventName: string, key?: string): any {
        let unsubscribe

        switch (eventName) {
            case `requestAnimationFrame`:
                if (subscriptions.requestAnimationFrame.length > 1) {
                    return
                }

                this.runFrame()

                unsubscribe = this.unsubscribe.bind(this)

                return Partial(Curry(unsubscribe))
                    .set([eventName, key])
                    .curry

            case `animationLoop`:
                if (subscriptions.animationLoop.length > 1) {
                    return
                }

                this.runLoop()

                unsubscribe = this.unsubscribe.bind(this)

                return Partial(Curry(unsubscribe))
                    .set([eventName, key])
                    .curry

            case `timeout`:
                const data = subscriptions[eventName][key]

                if (data) {
                    return this.runTimeout(data.fn, data.time)
                }

                return () => { }

        }
    }

    public static closeTimer(eventName: string): void {

        switch (eventName) {
            case `requestAnimationFrame`:
                this.cancelFrame()

                subscriptions[eventName] = {}
                return

            case `animationLoop`:
                this.cancelLoop()

                if (Object.keys(subscriptions[eventName]).length > 0) {
                    return this.runLoop()
                }
        }
    }

    public static unsubscribe(eventName: string, key: string): void {
        if (!Get(subscriptions, `${eventName}.${key}`)) {
            return
        }

        subscriptions[eventName][key] = undefined
        delete subscriptions[eventName][key]
    }

    public static subscribe(eventName: string, data: (x: any) => any | TimeOutData, keyPrefix?: string): any {
        if (!subscriptions[eventName]) {
            subscriptions[eventName] = {}
        }

        const key = `${keyPrefix}_${Object.keys(subscriptions[eventName]).length}_${new Date().getTime()}_${Math.round(Math.random() * 54321)}`

        subscriptions[eventName][key] = data

        return this.initTimer(eventName, key)
    }

    public static triggerEvent(eventName: string, data: any): void {
        const fns = Get(subscriptions, eventName, {})
        const functionKeys = Object.keys(fns)

        functionKeys.forEach((key: string) => subscriptions[eventName][key](data))

        this.closeTimer(eventName)
    }
}

export default Timers
