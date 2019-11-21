import Utils from '../../utils'

const tag = `button-element`
const newButton = (properties = {}) => {
    const el = document.createElement(tag)
    Object.keys(properties).forEach(key => el[key] = properties[key])
    return el
}

const root = Utils.root

const startUp = () => {
    const btn = newButton()
    root.appendChild(btn)

    return {
        btn,
        results: []
    }
}

const tearDown = data => {
    root.removeChild(data.btn)
    return data.results
}

function contentGetsSet() {
    const data = startUp()

    data.results.push({ 'Should have no text': data.btn.textContent === `` })
    data.results.push({ 'Should have no html': data.btn.innerHTML === `` })

    const text = `Am I here?`
    const markup = `<span>${text}</span>`
    const textEl = document.createRange().createContextualFragment(markup)
    data.btn.appendChild(textEl)

    data.results.push({ 'Should have text': data.btn.textContent === text })
    data.results.push({ 'Should have HTML': data.btn.innerHTML === markup })

    return tearDown(data)
}

async function shadowInheritsClass() {
    const data = startUp()
    const key = `Should have inherit class from host`
    const res = {}

    try {
        data.btn.classList.add(`test`)
        const shadow = await Utils.getShadow(data.btn)
        res[key] = shadow.firstChild.classList.contains(`test`)
    } catch (error) {
        res[key] = false
    }

    data.results.push(res)
    return tearDown(data)
}

async function shadowInheritsClassRemoved() {
    const data = startUp()
    const key = `Should not have class from host when removed`
    const res = {}

    try {
        data.btn.classList.add(`test`)
        const shadow = await Utils.getShadow(data.btn)
        const test = () => shadow.firstChild.classList.contains(`test`)

        if (!test()) { throw new Error(`invalid class`) }

        data.btn.classList.remove(`test`)
        res[key] = !test()

    } catch (error) {
        res[key] = false
    }

    data.results.push(res)
    return tearDown(data)
}

async function hasDefaultAccentColor() {
    const data = startUp()
    const key = `Should have default accentcolor property`
    const res = {}

    try {
        await Utils.getShadow(data.btn)
        res[key] = data.btn.accentcolor === `#59a2d8`
    } catch (error) {
        res[key] = false
    }

    data.results.push(res)
    return tearDown(data)
}

async function accentColorAcceptsStrings() {
    const data = startUp()
    const key = `Should have accentcolor property that only accpets strings`
    const res = {}

    try {
        await Utils.getShadow(data.btn)

        const isAccentBlack = () => data.btn.accentcolor === `#000`

        data.btn.accentcolor = `#000`
        const isBlack = isAccentBlack()

        data.btn.accentcolor = 2
        const isNotNumber = !isAccentBlack()

        data.btn.accentcolor = {}
        const isNotObj = !isAccentBlack()

        data.btn.accentcolor = () => { alert(`button-element`) }
        const isNotFunction = !isAccentBlack()

        data.btn.accentcolor = new Date()
        const isNotDate = !isAccentBlack()

        data.btn.accentcolor = `test`
        const isString = data.btn.accentcolor === `test`

        res[key] = isBlack && isNotNumber && isNotObj && isNotFunction && isNotDate && isString
    } catch (error) {
        res[key] = false
    }

    data.results.push(res)
    return tearDown(data)
}

export default async function ButtonElement() {
    return await [
        contentGetsSet(),
        await shadowInheritsClass(),
        await shadowInheritsClassRemoved(),
        await hasDefaultAccentColor(),
        await accentColorAcceptsStrings()

        // ready accepts bool
        // ready as true updates bounce and ripple, false does not
        // ripple accepts bool
        // ripple change updates ripple
        // ripple does/not ripple
        // hasRipple
        // canRipple
        // bounce accepts bool
        // bounce change updates bounce
        // bounce does/not bounce
        // hasBounce
        // canBounce
        // styles accepts string
        // styles update
        // theme accepts string
        // theme update
        // click event is triggered
        // mousedown event is triggered
        // mouseup event is triggered
        // doubleclick event is triggered
        // touchstart event is triggered
        // touchend event is triggered
    ]
}
