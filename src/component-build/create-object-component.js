import { nativeSupport } from './native-support.js'
import { BuiltReadyEvent } from './built-ready-event.js'
import { Properties } from './properties.js'
import { CreateElement } from '../utils/create-element.js'
import { ForEach } from '../utils/for-each.js'
import { AppendStyleElement } from '../utils/append-style-element.js'
import { ID } from '../services/id.js'
import { ArrayFrom } from '../utils/array-from.js'
import { Observer } from '../utils/observer.js'
import { FindFirst } from '../utils/find-first.js'
import { ObserverUnsubscribe } from '../utils/observer-unsubscribe.js'
import { Filter } from '../utils/filter.js'
import { ComponentObjects } from './component-objects.js'
import { OnNextFrame } from '../services/on-next-frame.js'
import { Equals } from '../utils/equals.js'
import { ForIn } from '../utils/for-in.js'
import { Get } from '../utils/get.js'
import '../polyfills/promise.js'

const emptyFn = function () { }
const componentContents = 'component-contents'

function ComponentObserverConfig(attributes) {
    const isArray = Array.isArray(attributes)
    return {
        attributes: isArray && attributes.length ? true : false,
        attributeFilter: isArray ? attributes : [],
        childList: true
    }
}

function getSlotName(el, key) {
    try {
        const name = el.getAttribute(key)
        return name === undefined || name === null ? '' : name
    } catch (error) {
        return ''
    }
}

function getMatchingSlot(host, name) {
    return FindFirst(function (slot) {
        return getSlotName(slot, 'slotname') === name
    }, host.slots)
}

function isUselessText(child) {
    return child.nodeName === '#text' && !(/\S/gm.test(child.textContent))
}

function cleanStart(host) {
    const actualChildren = []

    function childrenEach(child) {
        return !isUselessText(child) ?
            actualChildren.push(child) :
            host.removeChild(child)
    }

    ForEach(childrenEach, host.childNodes, true)

    return actualChildren
}

function assignSlot(host, child) {
    if (!host || !host.slots || !host.slots.length || !child) {
        return false
    }


    const slotName = getSlotName(child, 'slot')
    let assigned = false

    ForEach(function assignSlotInner(slot) {
        if (getSlotName(slot, 'slotname') === slotName) {
            if (!child.slotObserver) {
                child.slotObserver = new MutationObserver(function slotObserver() {
                    host.slotted$.next(host.slotted$.value)
                })

                child.slotObserver.observe(child, {
                    attributes: true,
                    attributeFilter: ['slot'],
                })
            }
            host.slotted$.next(host.slotted$.value.concat(document.adoptNode(child)))
            assigned = true
        }
    }, host.slots)

    return assigned
}

function childMutation(mutation) {
    if (!mutation.target || !mutation.target.parentNode) { return }

    ForEach(function tryAssignSlot(child) { assignSlot(mutation.target, child) }, mutation.addedNodes, true)

    if (mutation.target.children$) {
        mutation.target.children$.next(Filter(function filterChildren(child) {
            return !child.contentFor
        }, mutation.target.childNodes))
    }
}

function attributeMutation(mutation) {
    if (!mutation.target || !mutation.target.parentNode) { return }

    mutation.target[mutation.attributeName] = mutation.target.getAttribute(mutation.attributeName)
}

function setProperty(host, key, formatter, getter, setter) {
    try {
        Object.defineProperty(host, key, {
            get: function () {
                if (typeof getter === 'function') { return getter(host) }
                return host.state[key].value
            },
            set: function (value) {
                if (!host.state[key]) { return }

                if (typeof setter === 'function') { return setter(host)(value) }

                const formattedValue = formatter(value, host)
                const previous = host.state[key].value

                if (typeof previous === 'function' && typeof formattedValue === 'function' && formattedValue.toString() !== previous.toString()) {
                    return host.state[key].next(formattedValue)
                }

                if (!Equals(host.state[key].value, formattedValue)) {
                    host.state[key].next(formattedValue)
                }
            }
        })
    } catch (error) { }
}

function setStateProperty(host, key, formatter, onChange, getter, setter) {
    OnNextFrame(function setStatePropertyNext() {
        if (typeof formatter !== 'function') { return }

        host.state[key] = Observer(formatter(host.getAttribute(key) || host[key], host))

        setProperty(host, key, formatter, getter, setter)

        if (typeof onChange !== 'function') { return }

        host.state[key].subscribe(function stateNext(val) { return onChange(val, host) })
    })
}

function ComponentCreateElements(host, elements) {
    const elStates = {}
    const state = {}

    function removeOld(el) {
        const parent = Get(el, 'parentNode', Get(el, 'host'))
        if (!parent) { return }
        parent.removeChild(el)
    }

    function getEl(key) {
        const els = ArrayFrom(host.querySelectorAll(elements[key].selector))
        state[key] = els.length > 1 ? els : els[0]
        return state[key]
    }

    function elementsEach(key) {
        elStates[key] = Observer(getEl(key))

        Object.defineProperty(state, key, {
            get: function () { return elStates[key].value },
            set: function (value) {
                if (value !== elStates[key].value) {
                    elStates[key].next(value)
                }
            }
        })

        function elStatesEach(newElement) {
            ObserverUnsubscribe(elStates[key].previous)
            removeOld(elStates[key].previous)

            if (typeof elements[key].onChange === 'function') {
                elements[key].onChange(newElement, host)
            }
        }

        elStates[key].subscribe(elStatesEach)
    }

    ForIn(function (_value, prop) {
        elementsEach(prop)
    }, elements)

    return state
}

window.BuiltCreateComponent = function BuiltCreateComponent(componentOptions) {
    if (!componentOptions.componentName) { return }

    const componentName = componentOptions.componentName
    const properties = Object.freeze(Properties(componentOptions.properties))
    const node = CreateElement({ tagName: componentContents, innerHTML: (componentOptions.template || '') })
    const observerConfig = ComponentObserverConfig(Object.keys(properties))
    const computed = componentOptions.computed || {}
    const elements = componentOptions.elements || {}
    const getters = componentOptions.getters || {}
    const methods = componentOptions.methods || {}
    const setters = componentOptions.setters || {}

    ForEach(function (slot) {
        const slotReplacementData = { tagName: 'span', slotname: slot.getAttribute('name') }

        ForEach(function (attr) { slotReplacementData[attr.name] = attr.value }, slot.attributes)

        const slotReplacement = CreateElement(slotReplacementData)
        slotReplacement.setAttribute('slotname', slot.getAttribute('name') || '')
        slot.parentNode.replaceChild(slotReplacement, slot)

    }, node.querySelectorAll('slot'), true)

    function ConnectedFn(element) {
        function computedEach(value, key) {
            try { Object.defineProperty(element, key, value(element)) } catch (error) { }
        }

        function methodsEach(value, key) {
            element[key] = value(element)
        }

        function setPropFn(value, key) {
            return setStateProperty(
                element,
                key,
                value.format,
                value.onChange,
                getters[key],
                setters[key]
            )
        }

        function finishConnectedFn() {
            (componentOptions.onConnected || emptyFn)(element)
            OnNextFrame(function () {
                element.ready = true
            })
        }

        ForIn(computedEach, computed)
        ForIn(methodsEach, methods)

        if (elements) {
            element.elements = ComponentCreateElements(element, elements)
        }

        ForIn(setPropFn, properties)

        OnNextFrame(finishConnectedFn)
    }

    function CreateComponent(host) {
        if (host.constructed) { return }

        if (!document.head.querySelector('style[name="' + componentName + '"]')) {
            AppendStyleElement((componentOptions.shadowStyle || '') + (componentOptions.outerStyle || ''), document.head, componentName)
        }

        // INIT
        host.constructed = true
        host.componentId = ID()
        host.state = {}
        host.elements = {}
        host.componentContent = node.cloneNode(true)
        host.componentContent.contentFor = host
        host.componentContent.setAttribute('id', componentName + '-' + host.componentId)

        // SLOTS
        host.slots = ArrayFrom(host.componentContent.querySelectorAll('[slotname]'))
        host.slotted$ = Observer([], true)
        host.slotted$.subscribe(function (slotted) {
            ForEach(function assign(child) {
                const slotName = getSlotName(child, 'slot')
                const slot = getMatchingSlot(host, slotName)
                slot.appendChild(child)
            }, slotted)
        })

        // DOM CONNECTION
        host.onReady = componentOptions.onReady || emptyFn
        host.onConnected = function OnConnected() { return ConnectedFn(host) }
        host.onDisconnected = function OnDisconnected() {
            ObserverUnsubscribe(host)
            return (componentOptions.onDisconnected || emptyFn)(host)
        }

        // CHILDREN
        const existingChildren = cleanStart(host)

        if (existingChildren[0]) {
            host.insertBefore(host.componentContent, existingChildren[0])
        } else {
            host.appendChild(host.componentContent)
        }

        host.children$ = Observer(existingChildren)

        childMutation({ target: host, addedNodes: existingChildren })

        // OBSERVER
        const nodeObserver = new MutationObserver(function MutationObserverCallback(mutations) {
            ForEach(function nodeObserverCallbackInner(mutation) {
                if (mutation.type === 'attributes') { return attributeMutation(mutation) }
                if (mutation.type === 'childList') { return childMutation(mutation) }
            }, mutations)
        })

        nodeObserver.observe(host, observerConfig)
        host.nodeObserver = nodeObserver
        host.eventSubscriptions = host.eventSubscriptions || {}

        // FORM
        if (componentOptions.formElement) {
            try { host.internals_ = host.attachInternals() } catch (error) { }
            Object.defineProperty(host, 'formAssociated', { get: function () { return true } })
        }

        return host

    }

    ComponentObjects.addComponent(componentName, CreateComponent)

    return CreateComponent
}

window.builtready = true
window.BuiltCreateComponent.nativeSupport = nativeSupport
window.document.dispatchEvent(BuiltReadyEvent())