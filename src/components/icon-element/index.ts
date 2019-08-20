import { Constructor, Define } from '../../utils/webcomponent/constructor'
import ID from '../../utils/id'
import pipe from '../../utils/pipe'
import { ToString, Split } from '../../utils/convert/string'
import { IfInvalid } from '../../utils/convert/if'
import { Map, Filter } from '../../utils/convert/array'
import { Observe } from '../../utils/observe'

const elementSelectors = {
    root: `.icon-element-container`,
    svgContainer: `.svg-container`
}

const elements = {}

Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: () => { }
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

        const fnString = `
        self.onmessage = function(e){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', e.data, false);
            xhr.onload = () => postMessage({ status: xhr.status, svg: xhr.responseText });
            xhr.send();
        }`
        const blobURL = window.URL.createObjectURL(new Blob([fnString]))
        const worker = new Worker(blobURL)

        worker.onmessage = (e) => {
            if (e.data.status === 200) {
                AvailableIcons[path].next(e.data.svg)
            } else {
                AvailableIcons[path].error(e.data.status)
            }
        }

        worker.postMessage(path)
    })
}

const stringOrNull = (val: any) => typeof val === `string` ? val : null

const attributes = {
    type: {
        format: stringOrNull,
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
        format: stringOrNull,
        onChange: (value, host) => {
            if (!value) { return }
            if (host.subscription) { host.subscription() }
            host.elements.svgContainer.innerHTML = value
        }
    },
    color: {
        format: stringOrNull,
        onChange: (value, host) => host.elements.svgContainer.style.color = value
    },
    size: {
        format: stringOrNull,
        onChange: (value, host) => host.elements.svgContainer.style.height = host.elements.svgContainer.style.width = value
    },
    class: {
        format: val => pipe(ToString, IfInvalid(``), Split(` `), Map(v => v.trim()), Filter(v => !!v))(val).value,
        onChange: (val, host) => {
            if (!host.elements.root) { return }

            if (!!host.state.class.previous && host.state.class.previous.length) {
                host.elements.root.classList.remove(host.state.class.previous)
            }

            if (!!val && val.length) {
                host.elements.root.classList.add(val)
            }
        }
    }
}

const properties = Object.assign({
    subscription: {
        format: val => val
    }
}, attributes)

const template = require('./index.html')
const style = require('./style.html')
const componentName = `icon-element`
const componentRoot = `.icon-element-container`
const IconElement = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes: Object.keys(attributes),
    properties,
    elements,
    onConnected: host => host.inputID = ID(componentName)
})

Define(componentName, IconElement)

export default IconElement