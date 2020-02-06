import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { ToString } from '../../utils/to-string.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { ToNumber } from '../../utils/to-number.js'
import { ToBool } from '../../utils/to-bool.js'
import { CommasToArray } from '../../utils/commas-to-array.js'
import { ToMap } from '../../utils/to-map.js'
import { ValidateHtml } from '../../utils/validate-html.js'
import { IndexOf } from '../../utils/index-of.js'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = 'progress-bar'
const componentRoot = ''.concat('.', componentName, '-container')
const types = ['bar', 'circle']
const animations = ['indeterminate', 'linear', 'volley']

function setVisible(val, root) {
    return OnNextFrame(function () {
        return root ? root.classList[val ? 'add' : 'remove']('visible') : undefined
    })
}

function setOverlay(val, root) {
    return OnNextFrame(function () {
        return root ? root.classList[val ? 'add' : 'remove']('overlay') : undefined
    })
}
function setPercentage(val, root) {
    return OnNextFrame(function () {
        return root ? root.classList[val ? 'add' : 'remove']('percentage') : undefined
    })
}

function setScrimColor(val, root) {
    return OnNextFrame(function () {
        return root ? val ? root.style.backgroundColor = val : root.style.removeProperty('background-color') : undefined
    })
}

function setTrack(val, root) {
    return OnNextFrame(function () {
        return root ? root.classList[val ? 'add' : 'remove']('track') : undefined
    })
}

function setScrimBlur(val, root) {
    return OnNextFrame(function () {
        return root ? root.style.backdropFilter = ''.concat('blur(', val, 'px)') : undefined
    })
}

function setThickness(val, el) {
    return OnNextFrame(function () {
        return el ? el.style.height = val : undefined
    })
}

function setHeading(val, el) {
    return el ? el.innerHTML = ValidateHtml(val, [], ['script']).sanitized : undefined
}

function setText(val, el) {
    return el ? el.innerHTML = ValidateHtml(val, [], ['script']).sanitized : undefined
}

function setColor(val, el) {
    return OnNextFrame(function () {
        return el && val ? el.style.color = val : el ? el.style.removeProperty('color') : undefined
    })
}

function setAnimation(val, root) {
    return root ? root.setAttribute('animation', val) : undefined
}

function setScrim(val, root) {
    if (!root) { return }

    OnNextFrame(function () {
        if (!val) { root.style.removeProperty('background-color') }
        root.classList[val ? 'add' : 'remove']('scrim')
    })
}

function setButton(val, el) {
    OnNextFrame(function () {
        if (val && el) {
            el.classList.add('show')
            el.innerHTML = ValidateHtml(val, [], ['script']).sanitized
        } else if (el) {
            el.classList.remove('show')
        }
    })
}

function setValues(vals, host) {
    const top = host.elements.top
    const bottom = host.elements.bottom
    const percentage = host.elements.percentage
    const mainVal = ''.concat(Math.min(100, (vals[0] || 0)), '%')
    const secondaryVal = ''.concat(Math.min(100, (vals[1] || 0)), '%')

    if (!top || !bottom) { return }

    OnNextFrame(function () {
        top.style.width = mainVal
        bottom.style.width = secondaryVal
        percentage.textContent = mainVal
    })
}

const properties = {
    value: {
        format: function (val) {
            return Pipe(
                CommasToArray,
                IfInvalid([val]),
                ToMap(function (v) {
                    return isNaN(parseInt(v)) ? 0 : parseInt(v)
                })
            )(val).value
        },
        onChange: function (val, host) { setValues(val, host) }
    },
    color: {
        format: function (val) { return Pipe(ToString, IfInvalid(null))(val).value },
        onChange: function (val, host) { setColor(val, host.elements.trackInner) }
    },
    button: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(null))(val).value
        },
        onChange: function (val, host) { setButton(val, host.elements.button) }
    },
    text: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(''))(val).value
        },
        onChange: function (val, host) { setText(val, host.elements.text) }
    },
    header: {
        format: function (val) {
            return Pipe(ToString, IfInvalid(''))(val).value
        },
        onChange: function (val, host) { setHeading(val, host.elements.header) }
    },
    percentage: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(true))(val).value
        },
        onChange: function (val, host) { setPercentage(val, host.elements.root) }
    },
    thickness: {
        format: function (val) {
            return Pipe(ToString, IfInvalid('3px'))(val).value
        },
        onChange: function (val, host) { setThickness(val, host.elements.container) }
    },
    visible: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(false))(val).value
        },
        onChange: function (val, host) { setVisible(val, host.elements.root) }
    },
    overlay: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(true))(val).value
        },
        onChange: function (val, host) { setOverlay(val, host.elements.root) }
    },
    scrim: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(true))(val).value
        },
        onChange: function (val, host) { setScrim(val, host.elements.root) }
    },
    track: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(true))(val).value
        },
        onChange: function (val, host) { setTrack(val, host.elements.root) }
    },
    scrimcolor: {
        format: function (val) {
            return Pipe(ToString, IfInvalid('rgba(0,0,0,0.84)'))(val).value
        },
        onChange: function (val, host) { setScrimColor(val, host.elements.root) }
    },
    scrimblur: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(0))(val).value
        },
        onChange: function (val, host) { setScrimBlur(val, host.elements.root) }
    },

    animation: {
        format: function (val) {
            return Pipe(IndexOf(animations), IfInvalid(animations[0]))(val).value
        },
        onChange: function (val, host) {
            setAnimation(val, host.elements.root)
        }
    },

    /** TODO */
    type: {
        format: function (val) { return Pipe(IndexOf(types), IfInvalid(types[0]))(val).value }
    },
}

const observedAttributes = Object.keys(properties)

const elements = {
    root: {
        selector: componentRoot,
        onChange: function (el, host) {
            setOverlay(host.overlay, el)
            setScrim(host.scrim, el)
            setScrimColor(host.scrimcolor, el)
            setVisible(host.visible, el)
            setTrack(host.visible, el)
            setScrimBlur(host.scrimblur, el)
            setPercentage(host.percentage, el)
            setAnimation(host.animation, el)
        }
    },
    container: {
        selector: '.progress-bar-inner',
        onChange: function (el, host) {
            setThickness(host.thickness, el)
        }
    },
    trackInner: {
        selector: '.progress-bar-track-inner',
        onChange: function (el, host) { setColor(host.color, el) }
    },
    header: {
        selector: '.progress-bar-header',
        onChange: function (el, host) { setHeading(host.header, el) }
    },
    text: {
        selector: '.progress-bar-text',
        onChange: function (el, host) { setText(host.text, el) }
    },
    button: {
        selector: '.progress-bar-button',
        onChange: function (el, host) {
            el.eventSubscriptions = {
                click: ObserveEvent(el, 'click').subscribe(function () {
                    host.dispatchEvent(new CustomEvent('buttonclick', { detail: host }))
                })
            }
            setButton(host.button, el)
        }
    },
    percentage: { selector: '.progress-bar-percentage' },
    bottom: { selector: '.progress-bar-bottom' },
    top: { selector: '.progress-bar-top' }
}

export const ProgressBar = WCConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    observedAttributes: observedAttributes,
    properties: properties,
    elements: elements
})
WCDefine(componentName, ProgressBar)