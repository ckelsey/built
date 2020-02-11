import { Pipe } from '../../utils/pipe.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { ToNumber } from '../../utils/to-number.js'
import { ToBool } from '../../utils/to-bool.js'
import { CommasToArray } from '../../utils/commas-to-array.js'
import { ToMap } from '../../utils/to-map.js'
import { ID } from '../../services/id.js'
import { SetStyleRules } from '../../utils/set-style-rules.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Components } from '../../services/components.js'
import { ComponentConstructor } from '../../utils/component-constructor.js'
import { Observer } from '../../utils/observer.js'
import { CreateElement } from '../../utils/create-element.js'
import { ObserveExists } from '../../utils/observe-exists.js'
import { Filter } from '../../utils/filter.js'
import { ObserverUnsubscribe } from '../../utils/observer-unsubscribe.js'
import { ForEach } from '../../utils/for-each.js'
import { ObserveVisibility } from '../../utils/observe-visibility.js'

const style = require('./style.scss').toString()
const outerStyle = require('./external.scss').toString()
const template = require('./index.html')
const componentName = 'grid-layout'
const componentRoot = ''.concat('.', componentName, '-container')
const defaultWidth = 240
const defaultGap = [16, 16]

function cssSelectorId(host) {
    return '#' + host.componentContent.id
}

function unsupportedCSS(host, gap, columnwidth) {
    return typeof host.style.grid === 'string'
        ? '' :
        cssSelectorId(host) + ' .grid-layout-items{' +
        'margin-left:-' + gap, 'px;' +
        'margin-right:-', gap, 'px;' +
        '}' +
        cssSelectorId(host) + ' .grid-layout-items .grid-layout-item{' +
        'max-width:' + columnwidth + 'px;' +
        'margin:' + gap + 'px;' +
        '}'
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

        const thisStyle = '' +
            cssSelectorId(host) + ' .grid-layout-items{' +
            'display:flex;' +
            'width:' + (100 + (gapMedian * 2)) + '%;' +
            'margin-left:-' + gapMedian + '%;' +
            '}' +
            cssSelectorId(host) + ' .grid-layout-item{' +
            'width:' + columnGapPercent + '%;' +
            'padding:' + (gapMedian / 2) + '% ' + gapMedian + '%;' +
            '}'

        SetStyleRules(host.elements.innerStyles, thisStyle)
    })
}

function setDimensions(host) {
    return OnNextFrame(function () {
        const gap = host.gap || defaultGap
        const gapValues = Array.isArray(gap) ? [gap[0], gap[1]] : [gap, gap]
        const gapMedian = gapValues.reduce(function (t, c) { t = t + c; return t }, 0) / 2
        const columnwidth = host.columnwidth || defaultWidth
        const thisStyle = '' +
            cssSelectorId(host) + ' .grid-layout-items{' +
            'grid-row-gap:' + gapValues[0] + 'px;' +
            'grid-column-gap:' + gapValues[1] + 'px;' +
            'grid-template-columns:repeat(auto-fit, minmax(' + columnwidth + 'px, 0fr));' +
            '}' +
            unsupportedCSS(host, gapMedian, columnwidth)

        SetStyleRules(host.elements.innerStyles, thisStyle)
    })
}
const elements = {
    root: { selector: componentRoot },
    itemsContainer: { selector: '.'.concat(componentName, '-items') },
    innerStyles: { selector: 'style.grid-innerStyles' }
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
        }
    },
}

function removeChild(host, el) {
    if (el.container) {
        const slot = el.slot
        const item = Filter(function (element) {
            return element.slot === slot
        }, host.items$.value)[0]

        host.items$.remove(item)
        ObserverUnsubscribe(el)

        if (el.container.parentElement) {
            el.container.parentElement.removeChild(el.container)
        }
    }
}

function wrapChild(host, el) {
    const id = ID()
    const wrapper = CreateElement({ tagName: 'div', class: componentName + '-slot-wrapper grid-layout-item', id: id })

    el.slot = id
    el.container = wrapper
    el.eventSubscriptions = el.eventSubscriptions ? el.eventSubscriptions : {}

    try {
        host.removeChild(el)
    } catch (error) { }

    setTimeout(function () {
        el.eventSubscriptions.gridLayoutExists = ObserveExists(el, true)
            .subscribe(function elExistsCallback(exists) {
                if (!exists) { removeChild(host, el) }
            })
        el.eventSubscriptions.visible = ObserveVisibility(el).subscribe(function visibilityCallback(hidden) {
            const currentlyHidden = el.container.classList.contains('hidden')
            if (hidden !== currentlyHidden) {
                el.container.classList[hidden ? 'add' : 'remove']('hidden')
            }
        })
    }, 0)

    return el
}

const GridLayout = ComponentConstructor({
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
                    return host.items$.value
                }
            }
        }
    },
    methods: {
        clear: function clear(host) {
            return function clearInner() {
                ForEach(function (child) {
                    removeChild(host, child)
                }, host.items$.value, true)
            }
        },
        addItem: function addItem(host) {
            return function addItemInner(item) {
                if (!host.items$.has(item)) {
                    const newElement = document.adoptNode(wrapChild(host, item))
                    host.elements.itemsContainer.appendChild(newElement.container)
                    newElement.container.appendChild(newElement)
                    host.items$.insert(newElement)
                }
            }
        }
    },
    onConnected: function (host) {
        host.items$ = Observer([], true)
        host.eventSubscriptions = host.eventSubscriptions ? host.eventSubscriptions : {}
        host.eventSubscriptions['children' + ID()] = host.children$
            .subscribe(function childrenUpdate(children) {
                ForEach(function addedChildWrap(child) {
                    host.addItem(child)
                }, children)
            })

        window.addEventListener('resize', function () { return host.scaletofit ? runScale(host) : undefined })

        if (host.scaletofit) {
            runScale(host)
        } else {
            runDimensions(host)
        }

        OnNextFrame(function () { return host.setAttribute('viewable', true) })
    }
})

Components.addComponent(componentName, GridLayout)

export { GridLayout }