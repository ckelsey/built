import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { SetStyleRules } from '../../utils/set-style-rules.js'
import { AppendStyleElement } from '../../utils/append-style-element.js'
import { Pipe } from '../../utils/pipe.js'
import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { ValidateHtml } from '../../utils/validate-html.js'
import { ToBool } from '../../utils/to-bool.js'
import { ObserveEvent } from '../../utils/observe-event.js'

const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `image-loader`
const componentRoot = `.image-loader-container`

const setStyles = (el, styles) => {
    if (!el) { return }
    SetStyleRules(el, styles)
}

const setStyleElement = host => {
    let outerStyle = host.querySelector(`style[name="outer"]`)
    const componentStyle = host.shadowRoot.querySelector(`style[name=""]`)
    const styleString = [style, host.theme, host.styles].join(``)

    if (!outerStyle) {
        AppendStyleElement(styleString, host, `outer`)
        outerStyle = host.querySelector(`style[name="outer"]`)
    }

    setStyles(host.elements.themedStyles, styleString)
    setStyles(componentStyle, styleString)
    setStyles(outerStyle, styleString)
}

const setInternalStyle = host => {
    const internalStyle = !host.fit ?
        `` :
        `.image-loader-container>img.image-loader-image{
            object-position:${host.position ? host.position : `50% 50%`};
            object-fit:${host.fit ? host.fit : `contain`};
        }`

    setStyles(host.elements.internalStyles, internalStyle)
    waitForEl(host, `root`)
        .then(root => {

            if (host.fit) {
                root.classList.add(`fill`)
                root.setAttribute(`fit`, host.fit)
            } else {
                root.classList.remove(`fill`)
                root.removeAttribute(`fit`)
            }
        })
}

const waitForEl = (host, key) => new Promise(resolve => {
    let el = host.elements[key]

    const checkIfReady = () => {
        cancelAnimationFrame(host[`timerFor${key}`])

        el = host.elements[key]

        return !el ?
            host[`timerFor${key}`] = requestAnimationFrame(checkIfReady) :
            resolve(el)
    }

    checkIfReady()
})

const waitForEls = (host, keys) => Promise.all(keys.map(key => waitForEl(host, key)))

const toggleLoad = host => waitForEls(host, [`root`, `spinner`])
    .then(elements => {
        clearTimeout(host.spinnerTimer)
        const root = elements[0]
        const spinner = elements[1]
        const loaded = !host.loading && !!host.src

        host.setAttribute(`loaded`, loaded)
        host.setAttribute(`errored`, host.error)

        root.setAttribute(`loaded`, loaded)
        root.classList[host.loading ? `add` : `remove`](`loading`)
        root.classList[host.error ? `add` : `remove`](`errored`)

        host.dispatchEvent(new CustomEvent(
            host.error ?
                `imageerror` :
                host.loading ?
                    `imageloading` :
                    `imageloaded`,
            { detail: host }
        ))

        if (!host.loading) {
            host.complete = true
            host.dispatchEvent(new CustomEvent(`imagecomplete`, { detail: host }))
        }

        toggleText(host)

        if (!host.loading) {
            spinner.setAttribute(`visible`, false)
            return
        }

        host.spinnerTimer = setTimeout(() =>
            spinner.setAttribute(`visible`,
                host.loading && host.spinner ? true : false
            ), 333
        )
    })

const toggleText = host => waitForEl(host, `root`)
    .then(root => {
        const showingtext = (host.error && !host.loading) || !host.src
        root.classList[showingtext ? `add` : `remove`](`show-text`)
        host.setAttribute(`showingtext`, showingtext)
    })

const properties = {
    src: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange: (val, host) => loadSrc(host, val)
    },

    altsrc: { format: val => Pipe(ToString, IfInvalid(null))(val).value, },

    alttext: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange(val, host) {
            if (!val) { return }

            waitForEl(host, `text`).then(textEl => {
                textEl.innerHTML = ValidateHtml(val, [], [`script`]).sanitized
                toggleText(host)
            })
        }
    },

    loading: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
        onChange(_val, host) { toggleLoad(host) }
    },
    error: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
    },
    complete: {
        format: val => Pipe(ToBool, IfInvalid(false))(val).value,
    },
    theme: {
        format: val => typeof val === `string` ? val : ``,
        onChange: (_val, host) => setStyleElement(host)
    },
    fit: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange(_val, host) { setInternalStyle(host) }
    },
    position: {
        format: val => Pipe(ToString, IfInvalid(null))(val).value,
        onChange(_val, host) { setInternalStyle(host) }
    },

    spinner: { format: val => Pipe(ToBool, IfInvalid(false))(val).value },
}

const observedAttributes = Object.keys(properties)
const elements = {
    root: {
        selector: componentRoot,
        onChange(el) {
            requestAnimationFrame(() => {
                el.classList.remove(`notready`)
                el.style.removeProperty(`opacity`)
            })
        }
    },
    spinner: {
        selector: `${componentRoot} spinner-element`,
        onChange(el) {
            const remove = () => el.style.removeProperty(`opacity`)
            setTimeout(() => requestAnimationFrame(remove), 66)
        }
    },
    img: {
        selector: `img`,
        onChange(el, host) {
            el.eventSubscriptions = {
                load: ObserveEvent(el, `load`)
                    .subscribe(() => {
                        host.error = false
                        host.loading = false
                    }),

                error: ObserveEvent(el, `error`)
                    .subscribe(() => {
                        host.error = true
                        host.loading = false
                    }),
            }
        }
    },
    text: { selector: `.image-loader-text` },
    themedStyles: {
        selector: `style.themeStyles`,
        onChange: (_el, host) => setStyleElement(host)
    },
    internalStyles: {
        selector: `style.internalStyles`,
        onChange: (_el, host) => setInternalStyle(host)
    }
}

const loadSrc = (host, src) => new Promise(resolve => {
    if (!src) { return resolve() }

    waitForEl(host, `img`).then(img => {
        if (img.src === src) { return resolve(img) }
        host.error = false
        host.loading = true
        img.src = src
    })
})

const methods = {
    toCanvas: host => () => {
        try {
            const dpr = window.devicePixelRatio || 1
            const ctx = document.createElement(`canvas`).getContext(`2d`)
            ctx.canvas.width = host.image.width * dpr
            ctx.canvas.height = host.image.height * dpr
            ctx.scale(dpr, dpr)
            ctx.drawImage(host.image, 0, 0)
            return ctx.canvas
        } catch (error) {
            throw Error(error)
        }
    },

    toDataUrl: host => (mime = `image/jpeg`, quality = 1) => host.toCanvas()
        .then(canvas => canvas.toDataURL(mime, quality)),

    toObjectUrl: host => (mime = `image/jpeg`, quality = 1) => host.toBlob(mime, quality)
        .then(blob => URL.createObjectURL(blob)),

    toBlob: host => (mime = `image/jpeg`, quality = 1) => host.toCanvas()
        .then(canvas => new Promise(resolve => canvas.toBlob(resolve, mime, quality))),

    toData: host => (x = 0, y = 0, w, h) => host.toCanvas()
        .then(canvas => canvas.getContext(`2d`).getImageData(x, y, w ? w : canvas.width, h ? h : canvas.height)),
}

export const ImageLoader = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    methods,
    onConnected(host) {
        setStyleElement(host)
        setInternalStyle(host)
    }
})

WCDefine(componentName, ImageLoader)