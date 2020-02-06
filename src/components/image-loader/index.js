import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { ToBool } from '../../utils/to-bool.js'
import { SetStyleRules } from '../../utils/set-style-rules.js'
import { ValidateHtml } from '../../utils/validate-html.js'

const style = require('./style.scss').toString()
const outerStyle = require('./outer.scss').toString()
const template = require('./index.html')
const componentName = 'image-loader'
const componentRoot = ''.concat('.', componentName, '-container')

function setStyles(el, styles) {
    if (!el) { return }
    SetStyleRules(el, styles)
}

function setInternalStyle(host) {
    const pos = host.position ? host.position : '50% 50%'
    const fit = host.fit ? host.fit : 'contain'
    const internalStyle = !host.fit ?
        '' :
        ''.concat('.image-loader-container>img.image-loader-image{ object-position:, ', pos, '; object-fit:', fit, '; }')

    setStyles(host.elements.internalStyles, internalStyle)
    waitForEl(host, 'root')
        .then(function (root) {
            if (host.fit) {
                root.classList.add('fill')
                root.setAttribute('fit', host.fit)
            } else {
                root.classList.remove('fill')
                root.removeAttribute('fit')
            }
        })
}

function timerForString(key) {
    return ''.concat('timerFor', key)
}

function waitForEl(host, key) {
    return new Promise(
        function (resolve) {
            let el = host.elements[key]

            function checkIfReady() {
                cancelAnimationFrame(host[timerForString(key)])

                el = host.elements[key]

                return !el ?
                    host[timerForString(key)] = requestAnimationFrame(checkIfReady) :
                    resolve(el)
            }

            checkIfReady()
        }
    )
}

function waitForEls(host, keys) {
    return Promise.all(keys.map(function (key) { return waitForEl(host, key) }))
}

function toggleLoad(host) {
    return waitForEls(host, ['root', 'spinner'])
        .then(function (elements) {
            clearTimeout(host.spinnerTimer)
            const root = elements[0]
            const spinner = elements[1]
            const loaded = !host.loading && !!host.src

            host.setAttribute('loaded', loaded)
            host.setAttribute('errored', host.error)

            root.setAttribute('loaded', loaded)
            root.classList[host.loading ? 'add' : 'remove']('loading')
            root.classList[host.error ? 'add' : 'remove']('errored')

            host.dispatchEvent(new CustomEvent(
                host.error ?
                    'imageerror' :
                    host.loading ?
                        'imageloading' :
                        'imageloaded',
                { detail: host }
            ))

            if (!host.loading) {
                host.complete = true
                host.dispatchEvent(new CustomEvent('imagecomplete', { detail: host }))
            }

            toggleText(host)

            if (!host.loading) {
                spinner.setAttribute('visible', false)
                return
            }

            host.spinnerTimer = setTimeout(function () {
                spinner.setAttribute('visible',
                    host.loading && host.spinner ? true : false
                )
            }, 333)
        })
}

function toggleText(host) {
    return waitForEl(host, 'root')
        .then(function (root) {
            const showingtext = (host.error && !host.loading) || !host.src
            root.classList[showingtext ? 'add' : 'remove']('show-text')
            host.setAttribute('showingtext', showingtext)
        })
}

const properties = {
    src: {
        format: function (val) { return Pipe(ToString, IfInvalid(null))(val).value },
        onChange: function (val, host) { return loadSrc(host, val) }
    },

    altsrc: {
        format: function (val) { return Pipe(ToString, IfInvalid(null))(val).value }
    },

    alttext: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(null))(val).value
        },
        onChange: function (val, host) {
            if (!val) { return }

            waitForEl(host, 'text').then(function (textEl) {
                textEl.innerHTML = ValidateHtml(val, [], ['script']).sanitized
                toggleText(host)
            })
        }
    },

    loading: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        },
        onChange: function (_val, host) { toggleLoad(host) }
    },
    error: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        },
    },
    complete: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        },
    },
    fit: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(null))(val).value
        },
        onChange: function (_val, host) { setInternalStyle(host) }
    },
    position: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(null))(val).value
        },
        onChange: function (_val, host) { setInternalStyle(host) }
    },

    spinner: { format: function (val) { return Pipe(ToBool, IfInvalid(false))(val).value } },
}

const observedAttributes = Object.keys(properties)
const elements = {
    root: {
        selector: componentRoot,
        onChange: function (el) {
            requestAnimationFrame(function () {
                el.classList.remove('notready')
                el.style.removeProperty('opacity')
            })
        }
    },
    spinner: {
        selector: ''.concat(componentRoot, ' spinner-element'),
        onChange: function (el) {
            function remove() { return el.style.removeProperty('opacity') }
            setTimeout(function () { requestAnimationFrame(remove) }, 66)
        }
    },
    img: {
        selector: 'img',
        onChange: function (el, host) {
            el.eventSubscriptions = {
                load: ObserveEvent(el, 'load')
                    .subscribe(function () {
                        host.error = false
                        host.loading = false
                    }),

                error: ObserveEvent(el, 'error')
                    .subscribe(function () {
                        host.error = true
                        host.loading = false
                    }),
            }
        }
    },
    text: { selector: '.image-loader-text' },
    internalStyles: {
        selector: 'style.internalStyles',
        onChange: function (_el, host) { return setInternalStyle(host) }
    }
}

function loadSrc(host, src) {
    return new Promise(function (resolve) {
        if (!src) { return resolve() }

        waitForEl(host, 'img').then(function (img) {
            if (img.src === src) { return resolve(img) }
            host.error = false
            host.loading = true
            img.src = src
        })
    })
}

const methods = {
    toCanvas: function (host) {
        return function () {
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
        }
    },

    toDataUrl: function (host) {
        return function (mime, quality) {
            mime = mime ? mime : 'image/jpeg'
            quality = quality === undefined ? 1 : quality
            return host.toCanvas()
                .then(function (canvas) {
                    return canvas.toDataURL(mime, quality)
                })
        }
    },

    toObjectUrl: function (host) {
        return function (mime, quality) {
            mime = mime ? mime : 'image/jpeg'
            quality = quality === undefined ? 1 : quality
            return host.toBlob(mime, quality)
                .then(function (blob) {
                    return URL.createObjectURL(blob)
                })
        }
    },

    toBlob: function (host) {
        return function (mime, quality) {
            mime = mime ? mime : 'image/jpeg'
            quality = quality === undefined ? 1 : quality
            return host.toCanvas()
                .then(function (canvas) {
                    return new Promise(function (resolve) {
                        return canvas.toBlob(resolve, mime, quality)
                    })
                })
        }
    },

    toData: function (host) {
        return function (x, y, w, h) {
            x = x ? x : 0
            y = y ? y : 0

            return host.toCanvas()
                .then(function (canvas) {
                    return canvas.getContext('2d').getImageData(
                        x, y,
                        w ? w : canvas.width,
                        h ? h : canvas.height
                    )
                })
        }
    },
}

export const ImageLoader = WCConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: observedAttributes,
    properties: properties,
    elements: elements,
    methods: methods,
    onConnected: function (host) {
        setInternalStyle(host)
    }
})

WCDefine(componentName, ImageLoader)