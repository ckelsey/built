/* eslint-disable */
import { ObserveEvent } from './index'
import Enzyme, { shallow } from 'enzyme'

const addToBody = el => {
    document.body.appendChild(el)
    return el
}

const getEl = () => {
    const el = document.createElement(`div`)
    el.id = new Date().getTime()
    return addToBody(el)
}

const getLink = () => {
    const el = document.createElement(`a`)
    el.setAttribute(`href`, `https://www.google.com`)
    return addToBody(el)
}

const removeEl = el => document.body.removeChild(el)

describe(`ObserveEvent`, () => {
    beforeEach(() => {
        window.history.pushState({}, 'Test Title', '/test.html?query=true')
    })
    test(`Returns undefined if the element arg is undefined`, () => expect(typeof ObserveEvent(undefined, `click`)).toBe(`undefined`))
    test(`Returns undefined if the element arg is defined but not attached to the DOM`, () => expect(typeof ObserveEvent(document.createElement(`div`), `click`)).toBe(`undefined`))
    test(`Returns undefined if the event name arg is undefined`, () => expect(typeof ObserveEvent(getEl())).toBe(`undefined`))
    test(`Returns an object if arguments are set`, () => expect(typeof ObserveEvent(getEl(), `click`)).toBe(`object`))

    test(`Can be subscribed to`, () => {
        let event
        const el = getEl()
        const sub = ObserveEvent(el, `click`).subscribe(e => event = e instanceof MouseEvent)
        el.click()
        expect(event).toBe(true)
    })

    test(`Receives complete`, () => {
        const el = getEl()
        const ob = ObserveEvent(el, `click`)
        let complete = false
        const sub = ob.subscribe(
            () => { },
            () => { },
            () => complete = true
        )

        ob.complete()
        expect(complete).toBe(true)
        sub()
    })

    test(`On complete, all subscriptions are canceled and new events do nothing`, () => {
        const el = getEl()
        const ob = ObserveEvent(el, `click`)
        let complete = false
        let complete2 = false
        const sub = ob.subscribe(
            () => complete = !complete,
            () => { },
            () => complete = !complete
        )

        const sub2 = ob.subscribe(
            () => complete2 = !complete2,
            () => { },
            () => complete2 = !complete2
        )

        ob.complete()
        expect(complete).toBe(true)
        el.click()
        expect(complete).toBe(true)
        expect(complete2).toBe(true)
        sub()
        sub2()
        expect(ob.value).toBe(undefined)
    })

    test(`On element removal, the observer is disposed`, async () => {
        const el = getEl()
        const ob = ObserveEvent(el, `click`)
        let click = false
        ob.subscribe(() => click = !click)
        el.click()
        expect(click).toBe(true)
        removeEl(el)

        await new Promise((resolve) =>
            requestAnimationFrame(() => {
                el.click()
                expect(click).toBe(true)
                expect(ob.value).toBe(undefined)
                resolve()
            })
        )
    })


    test(`Unsubscribe method returns function`, () => {
        const el = getEl()
        const sub = ObserveEvent(el, `click`).subscribe(
            () => complete = !complete,
            () => { },
            () => complete = !complete
        )

        expect(typeof sub).toBe(`function`)
        sub()
    })

    test(`If preventDefault is set to true, it prevents default action`, () => {
        // global.window = Object.create(window)
        // // global.window.location = Object.assign({}, global.window.location, { href: 'http://example.org/'})
        // Object.defineProperty(window, 'location', {
        //     value: {
        //         href: 'http://example.org/'
        //     }
        // })

        // const location = new URL('http://example.org/');
        // location.assign = jest.fn()
        // location.replace = jest.fn()
        // location.reload = jest.fn()

        // delete window.location
        // window.location = location

        // const location = {
        //     ...window.location,
        //     href: `https://local.com`,
        // };
        // Object.defineProperty(window, 'location', {
        //     writable: true,
        //     value: location,
        // });

        // const windowLocation = JSON.stringify(window.location);
        // delete window.location;
        // Object.defineProperty(window, 'location', {
        //     value: JSON.parse(windowLocation)
        // });

        // window.location.assign = jest.fn()
        const el = shallow(<a href="https://google.com">Click</a>)
        let clicked = false

        // ObserveEvent(el, `click`, { preventDefault: true }).subscribe(() => clicked = !clicked)
        ObserveEvent(el, `click`).subscribe(() => clicked = !clicked)

        el.simulate(`click`)
        expect(window.location.assign).toHaveBeenCalledWith('/auth/')

        // expect(clicked).toBe(true)
        // removeEl(el)
    })

    // test(`If stopPropagation is set to true, it stops propagation`, () => {
    //     const ob = ObserveEvent(`prev`, true)
    //     let N
    //     ob.subscribe(n => N = n)
    //     expect(N).toBe(undefined)
    // })
})