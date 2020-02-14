import { Pipe } from '../../utils/pipe.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { ToNumber } from '../../utils/to-number.js'
import { ToBool } from '../../utils/to-bool.js'
import { Mapper } from '../../utils/mapper.js'
import { Transduce } from '../../utils/transduce.js'
import { SetStyleRules } from '../../utils/set-style-rules.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { ForEach } from '../../utils/for-each.js'
import { LoadOnReady } from '../../component-build/load-on-ready.js'
import { ObserverUnsubscribe } from '../../utils/observer-unsubscribe.js'
import { WhenAvailable } from '../../utils/when-available.js'
import { nativeSupport } from '../../component-build/native-support.js'
import { Filter } from '../../utils/filter.js'
import { AppendStyleElement } from '../../utils/append-style-element.js'

const style = '[name="grid-layout-item"] { display: flex; justify-items: center; grid-auto-flow: dense; width: 100%; flex-wrap: wrap; }'
const outerStyle = 'grid-layout { display: block; opacity: 0; transition: opacity 0.15s linear 0.15s; } grid-layout[viewable="true"] { opacity: 1; } [slot="grid-layout-item"]{box-sizing:border-box;}'
const template = require('./index.html')
const componentName = 'grid-layout'
const defaultWidth = 240
const defaultGap = [16, 16]

function cancelTimer(host) { return host.timer ? host.timer.cancel() : undefined }

function getGap(host) {
    let gap = defaultGap

    function fromArray(val, isArray) {
        if (!isArray && !Array.isArray(val)) { val = [val, val] }

        gap = Mapper(function (val) { return parseFloat(val) }, val)

        if (gap.length === 1) { gap.push(gap[0]) }
    }

    if (typeof host.gap === 'string') {
        try {
            fromArray(JSON.parse(host.gap))
        } catch (error) {
            gap = Transduce(
                function (val) { return parseFloat(val.trim()) },
                function (val) { return val && !isNaN(val) ? val : undefined }
            )(host.gap.split(','))
        }

    } else if (Array.isArray(host.gap) && host.gap.length) {
        fromArray(host.gap, true)
    } else if (!isNaN(host.gap)) {
        gap = [host.gap, host.gap]
    }

    return gap
}

function setStyles(host, styleStrings) {
    // NON IE11
    if (nativeSupport) {
        WhenAvailable(host, 'elements.theme').then(function (el) { SetStyleRules(el, styleStrings.both) })
        SetStyleRules(host.querySelector('style[name="grid-layout-outerStyle"]'), styleStrings.updatedOuterStyle)
        return
    }

    // IE11
    let styleEl = Filter(function (child) {
        return child.nodeName.toLowerCase() === 'style' && child.getAttribute('class') === host.componentId + '-style'
    }, host.children)[0]

    if (!styleEl) {
        AppendStyleElement(styleStrings.both, host, 'grid-layout-style-' + host.componentId, host.componentId + '-style')
    } else {
        SetStyleRules(styleEl, styleStrings.both)
    }
}

function getStyleStrings(host, gapMedian, columnGapPercent) {
    const updatedInnerStyle = style +
        ' [grid-id="' + host.componentId + '"] [name="grid-layout-item"]{' +
        'display:flex;' +
        'width:' + (100 + (gapMedian * 2)) + '%;' +
        'margin-left:-' + gapMedian + '%;' +
        '} ' + (host.theme || '')

    const slotStyles = 'min-width:' + columnGapPercent + '%;' +
        'padding:' + (gapMedian / 2) + '% ' + gapMedian + '%;' +
        'box-sizing:border-box;'

    const updatedOuterStyle = outerStyle +
        ' [grid-id="' + host.componentId + '"] [slot="grid-layout-item"],' +
        (nativeSupport ?
            ' [grid-id="' + host.componentId + '"] slot[slot="grid-layout-item"]::slotted(*)' :
            ' [grid-id="' + host.componentId + '"] [slotname="grid-layout-item"] > [slot="grid-layout-item"], [grid-id="' + host.componentId + '"] [slotname="grid-layout-item"] > [slot="grid-layout-item"] > [slot]'
        ) +
        '{' + slotStyles + '} ' +
        ' [grid-id="' + host.componentId + '"] slot[slot="grid-layout-item"],' +
        ' [grid-id="' + host.componentId + '"] [slotname="grid-layout-item"] > [slot="grid-layout-item"][slotname]{' +
        'width:100%;' +
        'padding:0;' +
        '} ' + (host.outertheme || '')

    return {
        updatedOuterStyle: updatedOuterStyle,
        both: updatedInnerStyle + updatedOuterStyle
    }
}

function setScale(host) {
    return OnNextFrame(function () {
        const gap = getGap(host)
        let gapMedian = (gap[0] + gap[1]) / 2
        let columnwidth = Math.max(host.columnwidth || defaultWidth, host.minwidth)
        const contentWidth = host.elements.root.offsetWidth + gapMedian
        let columnGapPercent = 100 / Math.round(contentWidth / (gapMedian + columnwidth))
        const ratio = 1 - (gapMedian / columnwidth)

        if (columnwidth === '100%' || columnwidth >= contentWidth) {
            columnwidth = 100
            gapMedian = 0
        } else {
            if (columnGapPercent > 50) { columnGapPercent = 50 }
            columnwidth = columnGapPercent * ratio
            gapMedian = (columnGapPercent - columnwidth) / 2
        }

        setStyles(host, getStyleStrings(host, gapMedian, columnGapPercent))
    })
}

const elements = {
    root: {
        selector: '.' + componentName + '-container',
        onChange: function (el, host) { el.setAttribute('grid-id', host.componentId) }
    },
    itemsContainer: { selector: '[name="'.concat(componentName, '-items"]') },
}

function runScale(host) {
    cancelTimer(host)
    host.timer = setScale(host)
}

const properties = {
    columnwidth: {
        format: function (val) { return val === '100%' ? val : Pipe(ToNumber, IfInvalid(defaultWidth))(val).value },
        onChange: function (_val, host) { runScale(host) }
    },
    minwidth: {
        format: function (val) { return Pipe(ToNumber, IfInvalid(0))(val).value },
        onChange: function (_val, host) { runScale(host) }
    },
    gap: {
        format: function (val) { return val },
        onChange: function (_val, host) { runScale(host) }
    },
    watchhidden: { format: function (val) { return Pipe(ToBool, IfInvalid(true))(val).value } },
}

// function removeChild(host, el) {
//     if (el.container) {
//         const slot = el.slot
//         const item = Filter(function (element) {
//             return element.slot === slot
//         }, host.items$.value)[0]

//         host.items$.remove(item)
//         ObserverUnsubscribe(el)

//         if (el.container.parentElement) {
//             el.container.parentElement.removeChild(el.container)
//         }
//     }
// }

// function wrapChild(host, el) {
//     const id = ID()
//     const wrapper = CreateElement({ tagName: 'div', class: componentName + '-slot-wrapper grid-layout-item', id: id })

//     el.slot = id
//     el.container = wrapper
//     el.eventSubscriptions = el.eventSubscriptions ? el.eventSubscriptions : {}

//     if (el.fillrow === true || el.getAttribute('fillrow') === 'true') {
//         wrapper.style.width = '100%'
//     }

//     try { host.removeChild(el) } catch (error) { }

//     setTimeout(function () {
//         el.eventSubscriptions.gridLayoutExists = ObserveExists(el, true)
//             .subscribe(function elExistsCallback(exists) {
//                 if (!exists) { removeChild(host, el) }
//             })
//         el.eventSubscriptions.visible = ObserveVisibility(el).subscribe(function visibilityCallback(hidden) {
//             const currentlyHidden = el.container.classList.contains('hidden')
//             if (hidden !== currentlyHidden) {
//                 el.container.classList[hidden ? 'add' : 'remove']('hidden')
//             }
//         })
//     }, 0)

//     return el
// }

const GridLayout = {
    componentName: componentName,
    template: template,
    shadowStyle: style,
    outerStyle: outerStyle,
    observedAttributes: Object.keys(properties),
    properties: properties,
    elements: elements,
    observeChildren: true,
    computed: {
        items: function (host) {
            return {
                get: function () {
                    return host.items$.value
                }
            }
        }
    },
    methods: {
        clear: function clear(host) {
            return function clearInner() {
                console.log(host.children$)
                // ForEach(function (child) {
                //     removeChild(host, child)
                // }, host.items$.value, true)
            }
        }
    },
    onConnected: function (host) {
        host.setAttribute('grid-id', host.componentId)

        window.addEventListener('resize', function () { return runScale(host) })

        runScale(host)

        host.eventSubscriptions.addedChildren = host.children$.on('addedNodes', function (addedNodes) {
            if (!addedNodes.length) { return }
            ForEach(host.addItem, addedNodes)
        })

        host.eventSubscriptions.removedNodes = host.children$.on('removedNodes', function (removedNodes) {
            if (!removedNodes.length) { return }
            ForEach(ObserverUnsubscribe, removedNodes)
        })

        OnNextFrame(function () { return host.setAttribute('viewable', true) })
    }
}

LoadOnReady(GridLayout)

export { GridLayout }