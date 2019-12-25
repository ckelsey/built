/* eslint-disable */
import { ObserverUnsubscribe } from './index'
import { ObserveEvent } from '../observe-event'

const addToBody = el => {
    document.body.appendChild(el)
    return el
}

const getEl = () => {
    const el = document.createElement(`div`)
    return addToBody(el)
}

describe(`ObserverUnsubscribe`, () => {
    test(`Unsubscribes from an element with 'eventSubscriptions' property`, () => {
        const el = getEl()
        let clicked = false

        el.eventSubscriptions = {
            click: ObserveEvent(el, `click`).subscribe(() => {
                clicked = !clicked
            })
        }

        el.click()

        expect(clicked).toBe(true)

        ObserverUnsubscribe(el)

        el.click()

        expect(clicked).toBe(true)
    })

    test(`Unsubscribes from an element with 'subscriptions' property`, () => {
        const el = getEl()
        let clicked = false

        el.subscriptions = {
            click: ObserveEvent(el, `click`).subscribe(() => clicked = !clicked)
        }

        el.click()

        expect(clicked).toBe(true)

        ObserverUnsubscribe(el)

        el.click()

        expect(clicked).toBe(true)
    })
})