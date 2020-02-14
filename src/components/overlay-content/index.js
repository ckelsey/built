import { ComponentConstructor } from '../../utils/component-constructor.js'
import { Components } from '../../services/components.js'
import { IfInvalid } from '../../utils/if-invalid.js'
import { Pipe } from '../../utils/pipe.js'
import { OnNextFrame } from '../../services/on-next-frame.js'
import { ToNumber } from '../../utils/to-number.js'
import { ToBool } from '../../utils/to-bool.js'
import { Get } from '../../utils/get.js'
import { IndexOf } from '../../utils/index-of.js'
import { Timer } from '../../services/timer.js'
import { EaseInOut } from '../../utils/ease-in-out.js'
import { DispatchEvent } from '../../utils/dispatch-event.js'
import { ObjectAssign } from '../../utils/object-assign.js'

const style = require('./style.scss').toString()
const positionPadding = 40
const widths = ['content', 'target']
const alignments = ['center', 'left', 'right', 'top', 'bottom', 'center center', 'center top', 'center bottom', 'left center', 'left top', 'left bottom', 'right center', 'right top', 'right bottom',]
const emptyBox = { top: 0, y: 0, bottom: 0, left: 0, x: 0, right: 0, width: 0, height: 0, }
const template = require('./index.html')
const componentName = 'overlay-content'
const componentRoot = ''.concat('.', componentName, '-container')
const elements = {
    root: { selector: componentRoot },
    contentContainer: { selector: ''.concat('.', componentName, '-content-container') },
    contentInner: { selector: ''.concat('.', componentName, '-content-inner') },
    inner: { selector: ''.concat('.', componentName, '-container-inner') },
}

const attributes = {
    target: {
        format: function (val) {
            return val instanceof HTMLElement || val instanceof HTMLUnknownElement ? val : null
        }
    },
    align: {
        format: function (val) {
            return Pipe(IndexOf(alignments), IfInvalid('center'))(val).value
        }
    },
    from: {
        format: function (val) {
            return Pipe(IndexOf(alignments), IfInvalid('center'))(val).value
        }
    },
    speed: {
        format: function (val) {
            return Pipe(ToNumber, IfInvalid(333))(val).value
        }
    },
    widthbasis: {
        format: function (val) {
            return Pipe(IndexOf(widths), IfInvalid('content'))(val).value
        }
    },
}

function setPositions(host) {
    Get(host, 'positionTimer.cancel()')

    const target = host.target

    if (!host.showing || !target) { return }

    host.getPositions().then(function (positions) {
        if (positions.outOfView) { return host.hide() }

        host.width = positions.containerWidth

        if (positions.rootBox.y !== 0) {
            positions.inner.style.top = ''.concat('-', positions.rootBox.y, 'px')
        }

        if (positions.rootBox.x !== 0) {
            positions.inner.style.left = ''.concat('-', positions.rootBox.x, 'px')
        }

        if (positions.rootBox.width !== positions.clientWidth) {
            positions.inner.style.width = ''.concat(positions.clientWidth, 'px')
        }

        if (positions.rootBox.height !== positions.clientHeight) {
            positions.inner.style.height = ''.concat(positions.clientHeight, 'px')
        }

        positions.container.style.width = positions.targetWidth
        positions.container.style.minWidth = positions.targetMinWidth
        positions.container.style.height = 'auto'
        positions.container.style.maxHeight = ''.concat(positions.hostHeight, 'px')
        positions.container.style.left = ''.concat(positions.containerLeft, 'px')
        positions.container.style.top = ''.concat(positions.isOnTop ? positions.targetBox.top - positions.containerHeight : positions.spaceAbove + positions.targetBox.height, 'px')
        positions.container.style.transformOrigin = ''.concat('center ', positions.isOnTop ? 'bottom' : 'top')

        if (positions.inner.classList.contains('bottom') && positions.isOnTop) {
            positions.inner.classList.remove('bottom')
        }

        if (!positions.inner.classList.contains('bottom') && !positions.isOnTop) {
            positions.inner.classList.add('bottom')
        }

        host.positionTimer = OnNextFrame(function () {
            return setPositions(host)
        })
    })
}

function animator(points, speed, stepFn) {
    return Timer(
        stepFn,
        EaseInOut(points, speed)
    )
}

const OverlayContent = ComponentConstructor({
    componentName: componentName,
    componentRoot: componentRoot,
    template: template,
    style: style,
    elements: elements,
    observedAttributes: Object.keys(attributes),
    properties: ObjectAssign({}, {
        showing: {
            format: function (val) {
                return ToBool(val).value
            }
        },
        width: {
            format: function (val) {
                return val
            },
            onChange: function (_val, host) {
                return DispatchEvent(host, 'widthchange', host)
            }
        },
    }, attributes),
    computed: {
        position: function (host) {
            return {
                get: function () {
                    return host.getPositions()
                }
            }
        },
    },
    methods: {
        getPositions: function (host) {
            return function () {
                return OnNextFrame(function () {
                    const container = host.elements.contentContainer
                    const targetBox = Get(host, 'target.getBoundingClientRect()', emptyBox)
                    const targetMinWidth = targetBox.width ? ''.concat(targetBox.width, 'px') : 'auto'
                    const spaceAbove = targetBox.top
                    const clientHeight = document.documentElement.clientHeight
                    const spaceBelow = clientHeight - (targetBox.top + targetBox.height)
                    const containerWidth = Get(container, 'offsetWidth', 0)
                    const containerHeight = Get(container, 'offsetHeight', 0)
                    const windowWidth = window.innerWidth
                    const inner = host.elements.inner
                    const innerBox = Get(inner, 'getBoundingClientRect()', emptyBox)
                    const isOnTop = spaceAbove > spaceBelow

                    return ObjectAssign(
                        {},
                        Get(container, 'getBoundingClientRect()', emptyBox),
                        {
                            hostHeight: (isOnTop ? spaceAbove : spaceBelow) - positionPadding,
                            // scrollTop: Get(container, 'scrollTop', 0),
                            // scrollLeft: Get(container, 'scrollLeft', 0),
                            targetWidth: !host.widthbasis || host.widthbasis === 'content' ? 'auto' : targetMinWidth,
                            targetMinWidth: targetMinWidth,
                            targetBox: targetBox,
                            rootBox: Get(host, 'elements.root.getBoundingClientRect()', emptyBox),
                            spaceAbove: spaceAbove,
                            spaceBelow: spaceBelow,
                            isOnTop: isOnTop,
                            clientWidth: document.documentElement.clientWidth,
                            clientHeight: clientHeight,
                            windowWidth: windowWidth,
                            containerWidth: containerWidth,
                            containerHeight: containerHeight,
                            containerTop: (isOnTop ? targetBox.top - containerHeight : spaceAbove + targetBox.height) - innerBox.y,
                            containerLeft: (targetBox.left + containerWidth >= (windowWidth - 10) ? targetBox.right - containerWidth : targetBox.left) - innerBox.left,
                            container: container,
                            inner: inner,
                            // innerBox: innerBox,
                            outOfView: targetBox.top - 10 > clientHeight || targetBox.bottom + 10 < 0
                        }
                    )
                }).promise
            }
        },
        scrollContent: function (host) {
            return function (x, y) {
                const container = host.elements.contentContainer

                if (!container) { return }

                container.scrollTop = y
                container.scrollLeft = x
            }
        },
        show: function (host) {
            return function () {
                if (host.showing) { return Promise.resolve() }

                host.showing = true

                const container = host.elements.contentContainer
                const inner = host.elements.inner

                if (!container || !inner) { return }

                container.style.pointerEvents = 'all'
                inner.style.display = 'block'

                setPositions(host)

                return animator(
                    [0, 1.02, 0.99, 1],
                    host.speed / 2,
                    function (scalePoint) {
                        container.style.transform = ''.concat('scale(1, ', scalePoint, ')')
                        container.style.opacity = scalePoint
                    })
                    .then(function () {
                        container.style.transform = 'scale(1, 1)'
                        container.style.opacity = 1
                        DispatchEvent(host, 'shown', host)
                    })
            }
        },

        hide: function (host) {
            return function () {
                if (!host.showing) { return Promise.resolve() }

                return new Promise(function (resolve) {
                    host.showing = false

                    const container = host.elements.contentContainer
                    const inner = host.elements.inner

                    if (!container || !inner) { return }

                    inner.style.display = container.style.pointerEvents = 'none'
                    container.style.transform = 'scale(1, 0)'
                    container.style.opacity = 0
                    resolve(DispatchEvent(host, 'hidden', host))
                })
            }
        }
    }
})

Components.addComponent(componentName, OverlayContent)

export { OverlayContent }