import { WCConstructor, WCDefine, Observer, ObserveWorker, ComponentClassObject, SetStyleRules } from '../..'
import './style.scss'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()

const elementSelectors = {
    root: `.icon-element-container`,
    svgContainer: `.svg-container`,
    injectedStyles: `style.injectedStyles`
}

const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const elements = {}

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: key === `injectedStyles`
            ? (el, host) => setStyles(el, host.styles)
            : () => { }
    }
})

const AvailableIcons = {}

const getIcon = (path) => {
    if (!path) {
        if (!AvailableIcons[path]) {
            AvailableIcons[path] = Observer(``)
        }

        AvailableIcons[path].next(``)
        return Promise.resolve(AvailableIcons[path])
    }

    return new Promise((resolve) => {
        if (path.slice(0, 5) === `<svg`) {
            return resolve(Observer(path))
        }

        if (path.indexOf(`https://`) === -1 && path.indexOf(`http://`) === -1) {
            path = `${location.protocol}//${location.host}${path[0] === `/` ? path : `/${path}`}`
        }

        if (AvailableIcons[path]) {
            return resolve(AvailableIcons[path])
        }

        AvailableIcons[path] = Observer(``)
        resolve(AvailableIcons[path])

        const worker$ = ObserveWorker(
            function () {
                self.onmessage = function (e) {
                    var xhr = new XMLHttpRequest()
                    var data = JSON.parse(e.data)
                    xhr.open(data.method, data.path, false)
                    xhr.onload = () => postMessage({ status: xhr.status, svg: xhr.responseText })
                    xhr.send()
                }
            }
        )

        const workerSubscription = worker$.subscribe(
            e => {
                workerSubscription()
                AvailableIcons[path].next(e.svg)
            },
            e => {
                workerSubscription()
                AvailableIcons[path].error(e.status)
            }
        )

        worker$.post({
            path,
            method: `GET`
        })
    })
}

const trySet = (host, icon) => {
    if (!host.elements.svgContainer) {
        return requestAnimationFrame(() => trySet(host, icon))
    }

    host.elements.svgContainer.innerHTML = icon
    host.dispatchEvent(new CustomEvent(`iconloaded`, { detail: host }))
}

const attributes = {
    type: {
        format: val => typeof val === `string` ? val : null,
        onChange: (value, host) => {
            if (!value) { return }
            if (host.subscription) { host.subscription() }
            return getIcon(value)
                .then(subject => {
                    host.subscription = subject.subscribe(icon => {
                        trySet(host, icon)

                    })
                })
        }
    },
    svg: {
        format: val => typeof val === `string` ? val : null,
        onChange: (value, host) => {
            if (!value) { return }
            if (host.subscription) { host.subscription() }
            host.elements.svgContainer.innerHTML = value
            host.dispatchEvent(new CustomEvent(`iconloaded`, { detail: host }))
        }
    },
    color: {
        format: val => typeof val === `string` ? val : null,
        onChange: (value, host) => host.elements.svgContainer.style.color = value
    },
    size: {
        format: val => typeof val === `string` ? val : `1.5em`,
        onChange: (value, host) => host.elements.svgContainer.style.height = host.elements.svgContainer.style.width = value
    },
    class: ComponentClassObject,
    styles: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
}

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const properties = Object.assign({}, {
    subscription: {
        format: val => val
    }
}, attributes)

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `icon-element`
const componentRoot = `.icon-element-container`
export const IconElement = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes: Object.keys(attributes),
    properties,
    elements,
})

WCDefine(componentName, IconElement)