import { WCConstructor, WCDefine, OnNextFrame, ObserverUnsubscribe, ObserveEvent, ID, ObserveSlots, Get, WCWhenPropertyReady, CreateElement, Pipe, ToString, IfInvalid, Try, ToBool, ToNumber, CommasToArray, ToMap } from '../..'

const defaultWidth = 240
const defaultGap = [16, 16]
const template = require(`./index.html`)
const componentName = `ajax-form`
const componentRoot = `.${componentName}-container`
const outerStyle = require(`./outer.scss`).toString()
const setAttribute = (host, val, name, elKey) => WCWhenPropertyReady(host, `elements.${elKey}`).then(el => el[val ? `setAttribute` : `removeAttribute`](name, val))
const submitForm = host => host.elements.form.dispatchEvent(new Event(`submit`))

const getFormData = host => {
    const newForm = CreateElement({
        tagName: `form`,
        action: host.action,
        method: host.method,
        name: host.name,
        style: `position:fixed;top:0;left:0;pointer-events:none;opacity:0;`
    })

    Array.from(host.querySelectorAll(`input`)).forEach(
        input => newForm.appendChild(
            CreateElement({
                tagName: `input`,
                autocomplete: input.autocomplete,
                value: input.value,
                type: input.type,
                name: input.name || input.autocomplete || input.type
            })
        )
    )

    document.body.appendChild(newForm)

    const data = {}
    const formData = new FormData(newForm)
    formData.forEach((value, key) => { data[key] = value })
    host.dispatchEvent(new CustomEvent(`submitdata`, { detail: data }))
    OnNextFrame(() => document.body.removeChild(newForm))

    // newForm.addEventListener(`submit`, e => {
    //     e.preventDefault()

    //     const data = {}
    //     const formData = new FormData(newForm)
    //     formData.forEach((value, key) => { data[key] = value })

    //     if (!host.request) {
    //         host.dispatchEvent(new CustomEvent(`submitdata`, { detail: data }))
    //         OnNextFrame(() => document.body.removeChild(newForm))
    //         return false
    //     }

    //     const xhr = new XMLHttpRequest()
    //     xhr.open(host.method, host.action)
    //     xhr.setRequestHeader(`Content-Type`, host.contenttype)
    //     xhr.addEventListener(`load`, () => {
    //         host.dispatchEvent(new CustomEvent(`response`, { detail: xhr }))
    //         return host.reload ? location.reload() : undefined
    //     })
    //     xhr.send(JSON.stringify(data))

    //     OnNextFrame(() => document.body.removeChild(newForm))

    //     return false
    // })

    // newForm.dispatchEvent(new Event(`submit`))
}

const elements = {
    root: { selector: componentRoot },
    grid: { selector: `.${componentName}-grid` },
    form: {
        selector: `.${componentName}-form`,
        onChange: (el, host) => {
            el.eventSubscriptions = {
                submit: ObserveEvent(el, `submit`, { preventDefault: true })
                    .subscribe(e => {
                        e.preventDefault()
                        getFormData(host)
                    })
            }
        }
    }
}

const properties = {
    action: {
        format: val => Pipe(ToString, IfInvalid(`/`))(val).value,
        onChange: (val, host) => setAttribute(host, val, `action`, `form`)
    },
    method: {
        format: val => Pipe(ToString, IfInvalid(`POST`))(val).value,
        onChange: (val, host) => setAttribute(host, val, `method`, `form`)
    },
    name: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => setAttribute(host, val, `name`, `form`)
    },
    request: { format: val => Pipe(ToBool, IfInvalid(false))(val).value },
    reload: { format: val => Pipe(ToBool, IfInvalid(false))(val).value },
    contenttype: { format: val => Pipe(ToString, IfInvalid(`application/json`))(val).value },
    scaletofit: {
        format: val => Pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (val, host) => setAttribute(host, val, `scaletofit`, `grid`)
    },
    columnwidth: {
        format: val => val === `100%` ? val : Pipe(ToNumber, IfInvalid(defaultWidth))(val).value,
        onChange: (val, host) => setAttribute(host, val, `columnwidth`, `grid`)
    },
    gap: {
        format: val => Pipe(CommasToArray, IfInvalid([val, val]), ToMap(v => {
            const tv = ToNumber(v).value
            if (isNaN(tv)) { return defaultGap[0] }
            return tv
        }))(val).value,
        onChange: (val, host) => setAttribute(host, val, `gap`, `grid`)
    }
}

export const AjaxForm = WCConstructor({
    componentName,
    componentRoot,
    template,
    outerStyle,
    properties,
    observedAttributes: Object.keys(properties),
    elements,
    onConnected(host) {
        const wrap = el => WCWhenPropertyReady(host, `elements.grid`)
            .then(appendTo => {
                const tagName = Get(el, `tagName.toLowerCase()`)
                const isInput = tagName === `input-field`
                const isBtn = tagName === `button-element`
                const isSubmit = isBtn && el.type === `submit`
                const id = ID()
                const wrapper = CreateElement({ tagName: `div`, class: `.${componentName}-slot-wrapper`, id })
                const slot = CreateElement({ tagName: `slot`, name: id })

                if (isSubmit) {
                    el.eventSubscriptions = { click: ObserveEvent(el, `click`).subscribe(() => submitForm(host)) }
                } else if (isInput) {
                    el.eventSubscriptions = { done: ObserveEvent(el, `done`).subscribe(() => submitForm(host)) }
                }

                el.slot = id
                el.container = wrapper

                wrapper.appendChild(slot)
                appendTo.appendChild(wrapper)
            })

        const removeEl = () => Try(el => { Get(el, `container.parentElement`).removeChild(el.container) })
        const unsubscribeEl = () => Try(el => { ObserverUnsubscribe(el) })
        const unwrap = el => {
            unsubscribeEl(el)
            removeEl(el)
        }

        host.eventSubscriptions = {
            slots: ObserveSlots(host, false).subscribe(elements => {
                elements.added.forEach(el => Get(el, `tagName.toLowerCase()`) === `style` ? undefined : wrap(el))
                elements.removed.forEach(unwrap)
            })
        }
    },
    onDisconnected(host) {
        ObserverUnsubscribe(host)
    }
})

WCDefine(componentName, AjaxForm)