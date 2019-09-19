import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import Observe from '../../utils/observe'
import { wcClassObject } from '../../utils/html/attr'
import { setStyleRules } from '../../utils/html/markup'
import { ICONELEMENT } from './theme'
import './style.scss'
import ObserveWorker from '../../utils/observeWorker'

const style = require('./style.scss').toString()

const elementSelectors = {
    root: `.icon-element-container`,
    svgContainer: `.svg-container`,
    injectedStyles: `style.injectedStyles`
}

const setStyles = (el, styles) => {
    if (!el) { return }
    setStyleRules(el, styles)
}

const elements = {}

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
            AvailableIcons[path] = Observe(``)
        }

        AvailableIcons[path].next(``)
        return Promise.resolve(AvailableIcons[path])
    }

    return new Promise((resolve) => {
        if (path.slice(0, 5) === `<svg`) {
            return resolve(Observe(path))
        }

        if (path.indexOf(`https://`) === -1 && path.indexOf(`http://`) === -1) {
            path = `${location.protocol}//${location.host}${path[0] === `/` ? path : `/${path}`}`
        }

        if (AvailableIcons[path]) {
            return resolve(AvailableIcons[path])
        }

        AvailableIcons[path] = Observe(``)
        resolve(AvailableIcons[path])

        const worker$ = ObserveWorker(
            function () {
                self.onmessage = function (e) {
                    var xhr = new XMLHttpRequest();
                    var data = JSON.parse(e.data);
                    xhr.open(data.method, data.path, false);
                    xhr.onload = () => postMessage({ status: xhr.status, svg: xhr.responseText });
                    xhr.send();
                }
            }
        )

        const workerSubscription = worker$.subscribe(
            e => {
                workerSubscription()
                AvailableIcons[path].next(e.svg)
            },
            (e: any) => {
                workerSubscription()
                AvailableIcons[path].error(e.status)
            }
        )

        worker$.post({
            path,
            method: `GET`
        })

        // const fnString = `
        // self.onmessage = function(e){
        //     var xhr = new XMLHttpRequest();
        //     xhr.open('GET', e.data, false);
        //     xhr.onload = () => postMessage({ status: xhr.status, svg: xhr.responseText });
        //     xhr.send();
        // }`
        // const blobURL = window.URL.createObjectURL(new Blob([fnString]))
        // const worker = new Worker(blobURL)

        // worker.onmessage = (e) => {
        //     if (e.data.status === 200) {
        //         AvailableIcons[path].next(e.data.svg)
        //     } else {
        //         AvailableIcons[path].error(e.data.status)
        //     }
        // }

        // worker.postMessage(path)
    })
}

const attributes = {
    type: {
        format: (val: any) => typeof val === `string` ? val : ICONELEMENT.type,
        onChange: (value, host) => {
            if (!value) { return }
            if (host.subscription) { host.subscription() }
            return getIcon(value)
                .then((subject: any) => {
                    host.subscription = subject.subscribe(icon => {
                        host.elements.svgContainer.innerHTML = icon
                    })
                })
        }
    },
    svg: {
        format: (val: any) => typeof val === `string` ? val : ICONELEMENT.svg,
        onChange: (value, host) => {
            if (!value) { return }
            if (host.subscription) { host.subscription() }
            host.elements.svgContainer.innerHTML = value
        }
    },
    color: {
        format: (val: any) => typeof val === `string` ? val : ICONELEMENT.color,
        onChange: (value, host) => host.elements.svgContainer.style.color = value
    },
    size: {
        format: (val: any) => typeof val === `string` ? val : ICONELEMENT.size,
        onChange: (value, host) => host.elements.svgContainer.style.height = host.elements.svgContainer.style.width = value
    },
    class: wcClassObject,
    styles: {
        format: val => typeof val === `string` ? val : ICONELEMENT.styles,
        onChange: (val, host) => setStyles(host.elements.injectedStyles, val)
    },
}

const properties = Object.assign({
    subscription: {
        format: val => val
    }
}, attributes)

const template = require('./index.html')
const componentName = `icon-element`
const componentRoot = `.icon-element-container`
const IconElement = /*#__PURE__*/ Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes: Object.keys(attributes),
    properties,
    elements,
})

Define(componentName, IconElement)

export default IconElement