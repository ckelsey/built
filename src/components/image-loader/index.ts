import './style.scss'
import pipe from '../../utils/pipe'
import ToString from '../../utils/convert/to_string'
import IfInvalid from '../../utils/convert/if_invalid'
import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import ObserveEvent from '../../utils/observeEvent'
import { IsElement } from '../../utils/convert/dom'
import ToBool from '../../utils/convert/bool'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = `image-loader`
const componentRoot = `.image-loader-container`

const properties = {

    src: {
        format: val => pipe(ToString, IfInvalid(null))(val).value,
        onChange: (_val, host) => loadSrc(host)
    },

    element: {
        format: val => pipe(IsElement, IfInvalid(null))(val).value,
        onChange: (val, host) => loadImage(host, val)
    },

    image: { format: val => pipe(IsElement, IfInvalid(null))(val).value },

    loading: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value
    }
}

const observedAttributes = Object.keys(properties)
const elements = { root: { selector: componentRoot }, img: { selector: `img`, onChange: (_el, host) => loadSrc(host) } }

const loadSrc = host => new Promise(resolve => {
    const img = host.elements.img

    if (!img || !host.src) { return resolve() }

    if (img.src === host.src) { return resolve(img) }

    host.loading = true
    img.crossOrigin = `Anonymous`

    host.unsubscribeEvents(img)

    if (!img.eventSubscriptions) { img.eventSubscriptions = {} }

    const finish = (name, event) => {
        host.image = img
        host.loading = false
        host.dispatchEvent(new CustomEvent(name, { detail: { img, event } }))
        resolve(img)
    }

    img.eventSubscriptions.error = ObserveEvent(img, `error`).subscribe(event => finish(`imageerror`, event))
    img.eventSubscriptions.load = ObserveEvent(img, `load`).subscribe(event => finish(`imageloaded`, event))

    const getDimensions = () => {
        if (img.width && img.width > 0 && img.height && img.height > 0) {
            return host.dispatchEvent(new CustomEvent(`imagesize`, {
                detail: {
                    img,
                    size: {
                        width: img.width,
                        height: img.height
                    }
                }
            }))
        }

        requestAnimationFrame(getDimensions)
    }

    getDimensions()

    img.src = host.src
})

const loadImage = (host, img) => new Promise(resolve => {
    if (!img) { return resolve() }

    host.loading = true

    host.unsubscribeEvent(img, `error`)
    host.unsubscribeEvent(img, `load`)

    img.crossOrigin = `Anonymous`

    if (!img.eventSubscriptions) { img.eventSubscriptions = {} }

    const finish = (name, event) => {
        host.image = img
        host.loading = false
        host.dispatchEvent(new CustomEvent(name, { detail: { img, event } }))
        resolve(img)
    }

    img.eventSubscriptions.error = ObserveEvent(img, `error`).subscribe(event => finish(`imageerror`, event))
    img.eventSubscriptions.load = ObserveEvent(img, `load`).subscribe(event => finish(`imageloaded`, event))

    const getDimensions = () => {
        if (img.width && img.width > 0 && img.height && img.height > 0) {
            return host.dispatchEvent(new CustomEvent(`imagesize`, {
                detail: {
                    img,
                    size: {
                        width: img.width,
                        height: img.height
                    }
                }
            }))
        }

        requestAnimationFrame(getDimensions)
    }

    getDimensions()
})

const waitForLoad = host => new Promise(resolve => {
    let sub = () => { }

    const finish = () => {
        sub()
        return resolve()
    }

    const waitForLoading = () => {
        sub()
        if (!host.loading) { return finish() }
        sub = host.state.loading.subscribe(() => !host.loading ? finish() : undefined)
    }

    const waitForImg = () => {
        if (!!host.image) { return waitForLoading() }
        sub = host.state.image.subscribe(() => !!host.image ? waitForLoading() : undefined)
    }

    waitForImg()
})

const methods = {
    load: host => () => new Promise((resolve, reject) =>
        waitForLoad(host)
            .then(() => host.image)
            .then(resolve)
            .catch(reject)
    ),
    toCanvas: host => () => waitForLoad(host)
        .then(() => {
            try {
                const dpr = window.devicePixelRatio || 1
                const ctx = document.createElement('canvas').getContext('2d')
                ctx.canvas.width = host.image.width * dpr
                ctx.canvas.height = host.image.height * dpr
                ctx.scale(dpr, dpr)
                ctx.drawImage(host.image, 0, 0)
                return ctx.canvas

            } catch (error) {

                throw Error(error)
            }
        }),

    toDataUrl: host => (mime = `image/jpeg`, quality = 1) => host.toCanvas()
        .then(canvas => canvas.toDataURL(mime, quality)),

    toObjectUrl: host => (mime = `image/jpeg`, quality = 1) => host.toBlob(mime, quality)
        .then(blob => URL.createObjectURL(blob)),

    toBlob: host => (mime = `image/jpeg`, quality = 1) => host.toCanvas()
        .then(canvas => new Promise(resolve => canvas.toBlob(resolve, mime, quality))),

    toData: host => (x = 0, y = 0, w, h) => host.toCanvas()
        .then(canvas => canvas.getContext(`2d`).getImageData(x, y, w ? w : canvas.width, h ? h : canvas.height)),
}

const ImageLoader = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    methods
})

Define(componentName, ImageLoader)

export const imageLoader = val => new Promise((resolve, reject) => {
    let prop

    if (typeof val === `string`) {
        prop = `src`
    } else if (IsElement(val).valid) {
        prop = `element`
    } else {
        return resolve()
    }

    const loader = document.createElement(`image-loader`) as any
    document.body.appendChild(loader)
    loader[prop] = val

    return loader
        .load()
        .then(img => {
            document.body.removeChild(loader)
            return resolve(img)
        })
        .catch(reject)
})

export default ImageLoader