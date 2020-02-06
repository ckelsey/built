import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { Try } from '../../utils/try.js'
import { ObserveVisibility } from '../../utils/observe-visibility.js'
import { Pipe } from '../../utils/pipe.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { ToNumber } from '../../utils/to-number.js'
import { ToBool } from '../../utils/to-bool.js'
import { CommasToArray } from '../../utils/commas-to-array.js'
import { ToMap } from '../../utils/to-map.js'
import { ObserverUnsubscribe } from '../../utils/observer-unsubscribe.js'
import { Get } from '../../utils/get.js'
import { ObserveSlots } from '../../utils/observe-slots.js'
import { ID } from '../../services/id.js'
import { SetStyleRules } from '../../utils/set-style-rules.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { AppendStyleElement } from '../../utils/append-style-element.js'
import { ArrayFrom } from '../../utils/array-from.js'

const style = require('./style.scss').toString()
const outerStyle = require('./external.scss').toString()
const template = require('./index.html')
const componentName = 'grid-layout'
const componentRoot = ''.concat('.', componentName, '-container')
const defaultWidth = 240
const defaultGap = [16, 16]

function unsupportedCSS(host, gap, columnwidth) {
    return typeof host.style.grid === 'string'
        ? '' :
        '.grid-layout-items{margin-left:-'.concat(gap, 'px;margin-right:-', gap, 'px;}.grid-layout-items .grid-layout-item{max-width:', columnwidth, 'px;margin:', gap, 'px;}')
}

function cancelTimer(host) {
    return host.timer ? host.timer.cancel() : undefined
}

function setScale(host) {
    return OnNextFrame(function () {
        if (!host.scaletofit) { return }

        const gap = host.gap || defaultGap
        let gapMedian = gap.reduce(function (t, c) { t = t + c; return t }, 0) / 2
        let columnwidth = host.columnwidth || defaultWidth
        const contentWidth = host.elements.root.offsetWidth + gapMedian
        let columnGapPercent = 100 / Math.round(contentWidth / (gapMedian + columnwidth))
        const ratio = 1 - (gapMedian / columnwidth)

        if (columnwidth === '100%') {
            columnwidth = 100
            gapMedian = 0
        } else {
            if (columnGapPercent > 50) {
                columnGapPercent = 50
            }

            columnwidth = columnGapPercent * ratio

            gapMedian = (columnGapPercent - columnwidth) / 2
        }

        const thisStyle = '.grid-layout-items{display:flex; width:'.concat(100 + (gapMedian * 2), '%;margin-left:-', gapMedian, '%;}.grid-layout-item{width:', columnGapPercent, '%;padding:', gapMedian / 2, '% ', gapMedian, '%;}')

        SetStyleRules(host.elements.innerStyles, thisStyle)
    })
}

function setDimensions(host) {
    return OnNextFrame(function () {
        const gap = host.gap || defaultGap
        const gapValues = Array.isArray(gap) ? [gap[0], gap[1]] : [gap, gap]
        const gapMedian = gapValues.reduce(function (t, c) { t = t + c; return t }, 0) / 2
        const columnwidth = host.columnwidth || defaultWidth
        const thisStyle = '.grid-layout-items{grid-row-gap:'.concat(gapValues[0], 'px; grid-column-gap:', gapValues[1], 'px; grid-template-columns:repeat(auto-fit, minmax(', columnwidth, 'px, 0fr));}', unsupportedCSS(host, gapMedian, columnwidth))

        SetStyleRules(host.elements.innerStyles, thisStyle)
    })
}
const elements = {
    root: { selector: componentRoot },
    itemsContainer: { selector: '.'.concat(componentName, '-items') },
    innerStyles: { selector: 'style.innerStyles' }
}

function runDimensions(host) {
    cancelTimer(host)
    host.timer = setDimensions(host)
}

function runScale(host) {
    cancelTimer(host)
    host.timer = setScale(host)
}

const properties = {
    columnwidth: {
        format: function (val) { return val === '100%' ? val : Pipe(ToNumber, IfInvalid(defaultWidth))(val).value },
        onChange: function (_val, host) { host.scaletofit ? runScale(host) : runDimensions(host) }
    },
    gap: {
        format: function (val) {
            return Pipe(CommasToArray, IfInvalid([val, val]), ToMap(function (v) {
                const tv = ToNumber(v).value
                if (isNaN(tv)) { return defaultGap[0] }
                return tv
            }))(val).value
        },
        onChange: function (_val, host) { host.scaletofit ? runScale(host) : runDimensions(host) }
    },
    scaletofit: { format: function (val) { return Pipe(ToBool, IfInvalid(false))(val).value } },
    watchhidden: {
        format: function (val) {
            return Pipe(ToBool, IfInvalid(true))(val).value
        },
        onChange: function (_val, host) { host.wrap() }
    },
}

function getComponentStyles(host) {
    return function () {
        return ''.concat(require('./style.scss').toString(), (host.theme || ''), host.styles)
    }
}

function notSlottable(el) {
    return Get(el, 'nongrid') || Get(el, 'tagName.toLowerCase()') === 'style'
}

function clear(host) {
    return function () {
        return ArrayFrom(host.children)
            .forEach(function (el) {
                return !notSlottable(el) ?
                    Try(function (el) { return host.removeChild(el) })(el) :
                    undefined
            })
    }
}

function wrap(host) {
    return function () {
        return ArrayFrom(host.children)
            .forEach(function (el) {
                if (notSlottable(el)) { return }

                if (host.watchhidden) { watchItemVisibility(el) }

                if (el.getAttribute('wrapped')) { return }

                wrapItem(host.elements.itemsContainer, el)
            })
    }
}

function watchItemVisibility(el) {
    if (!el.eventSubscriptions) { el.eventSubscriptions = {} }
    if (el.eventSubscriptions.visibility) { return }

    el.eventSubscriptions.visibility = ObserveVisibility(el)
        .subscribe(function (hidden) {
            const container = el.container
            if (!container) { return }

            const currentlyHidden = container.classList.contains('hidden')

            if (hidden !== currentlyHidden) {
                container.classList[hidden ? 'add' : 'remove']('hidden')
            }
        })
}

function wrapItem(itemsContainer, el) {
    const id = ID()
    const slotWrapper = document.createElement('div')
    slotWrapper.className = 'grid-layout-item'
    slotWrapper.id = id
    itemsContainer.appendChild(slotWrapper)

    const slot = document.createElement('slot')
    slot.name = id
    slotWrapper.appendChild(slot)
    el.slot = id
    el.container = slotWrapper
    el.setAttribute('wrapped', id)

    return el
}

export const GridLayout = WCConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    outerStyle: outerStyle,
    observedAttributes: Object.keys(properties),
    properties: properties,
    elements: elements,
    computed: {
        items: function (host) {
            return {
                get: function () {
                    return ArrayFrom(host.children)
                        .filter(function (el) {
                            return el.tagName.toLowerCase() !== 'style'
                        })
                }
            }
        }
    },
    methods: {
        getComponentStyles: getComponentStyles,
        clear: clear,
        wrap: wrap
    },
    onConnected: function (host) {
        host.elements.innerStyles = AppendStyleElement(' ', host.shadowRoot, 'innerStyles', 'innerStyles')

        function disconnectEl(el) {
            const containerParent = Get(el, 'container.parentElement')
            ObserverUnsubscribe(el)
            if (containerParent) { containerParent.removeChild(el.container) }
        }

        host.eventSubscriptions = {
            slot: ObserveSlots(host).subscribe(function (results) {
                results.removed.forEach(disconnectEl)
                host.wrap()
            })
        }

        window.addEventListener('resize', function () { return host.scaletofit ? runScale(host) : undefined })

        host.wrap()

        OnNextFrame(function () { return host.setAttribute('viewable', true) })
    },
    onDisconnected: function (host) { ObserverUnsubscribe(host) }
})

WCDefine(componentName, GridLayout)