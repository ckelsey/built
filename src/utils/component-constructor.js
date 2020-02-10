import { OnNextFrame } from '../services/on-next-frame.js'
import { ObserverUnsubscribe } from './observer-unsubscribe.js'
import { ComponentClassObject } from './component-class-object.js'
import { Observer } from './observer.js'
import { AppendStyleElement } from './append-style-element.js'
import { SetStyleRules } from './set-style-rules.js'
import { Get } from './get.js'
import { Equals } from './equals.js'
import { Pipe } from './pipe.js'
import { ToBool } from './to-bool.js'
import { IfInvalid } from './if-invalid.js'
import { ID } from '../services/id.js'
import { CreateElement } from './create-element.js'
import { DispatchEvent } from './dispatch-event.js'
import { ParseCss } from './parse-css.js'
import { ForEach } from './for-each.js'
import { Transduce } from './transduce.js'
import { Filter } from './filter.js'
import { ArrayFrom } from './array-from.js'
import { FindFirst } from './find-first.js'

const componentContents = 'component-contents'
const styleElementsString = '<span class="style-block-theme"></span><span class="style-block-styles"></span>'

function emptyFn() { }

function isUselessText(child) {
    return child.nodeName === '#text' && !(/\S/gm.test(child.textContent))
}

function cleanStart(host) {
    const actualChildren = []

    const children = host.childNodes
    let index = children.length

    while (index--) {
        if (!isUselessText(children[index])) {
            actualChildren.push(children[index])
        } else {
            host.removeChild(children[index])
        }
    }

    return actualChildren
}

function attributeMutation(mutation) {
    if (!mutation.target || !mutation.target.parentNode) { return }

    mutation.target[mutation.attributeName] = mutation.target.getAttribute(mutation.attributeName)
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

function assignSlot(host, child) {
    if (!host || !host.slots || !host.slots.length || !child) {
        return child
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

    return assigned ? false : child
}

function childMutation(mutation) {
    if (!mutation.target || !mutation.target.parentNode) { return }

    const added = Filter(function tryAssignSlot(child) {
        if (isUselessText(child)) {
            child.parentNode.removeChild(child)
            return false
        }

        if (assignSlot(mutation.target, child)) {
            return true
        }

        return false
    }, mutation.addedNodes, true)

    const removed = ArrayFrom(mutation.removedNodes)

    if (mutation.target.removedChildren$ && removed.length) {
        requestAnimationFrame(() => mutation.target.removedChildren$.next(removed))
    }

    if (mutation.target.addedChildren$ && added.length) {
        requestAnimationFrame(() => mutation.target.addedChildren$.next(added))
    }

    if (mutation.target.children$) {
        requestAnimationFrame(() => mutation.target.children$.next(getChildrenArray(mutation.target)))
    }
}

function nodeObserverConfig(attributes) {
    return {
        attributes: Array.isArray(attributes) && attributes.length ? true : false,
        attributeFilter: Array.isArray(attributes) ? attributes : [],
        childList: true
    }
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

function handleInnerStyleChange(host, key, styleString) {
    const styleElement = Get(host, 'elements.' + key)
    const componentId = '#' + host.componentContent.id

    function getString(cssObj) {
        return componentId + ' ' + cssObj.cssText
    }

    function combineRules(target, current) {
        return target + current
    }

    const parsedRules = Transduce(getString)(ParseCss(styleString), '', combineRules)

    if (styleElement && styleString === '') {
        styleElement.parentNode.removeChild(styleElement)
        return host.elements[key] = undefined
    }

    if (!styleElement && !!parsedRules) {
        return host.elements[key] = AppendStyleElement(parsedRules, host.querySelector('.style-block-' + key), ''.concat(host.tagName.toLowerCase(), '-' + key), key)
    }

    SetStyleRules(styleElement, parsedRules)
}

function createStyleStateObject(key) {
    return {
        format: function (val) {
            return typeof val === 'string' ? val : ''
        },
        onChange: function (val, host) {
            handleInnerStyleChange(host, key, val)
        }
    }
}

function createElements(host, elements) {
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

    for (const prop in elements) {
        if (elements[prop]) {
            elementsEach(prop)
        }
    }

    return {
        state: state,
        disconnect: function () {
            function elStatesEach(key) {
                const el = host.elements[key]
                elStates[key].complete()
                if (el) { ObserverUnsubscribe(el) }
            }

            for (const prop in elStates) {
                if (elStates[prop]) {
                    elStatesEach(prop)
                }
            }
            return
        }
    }
}

function getChildrenArray(host) {
    return Filter(function (element) {
        return element && !element.contentFor
    }, host.childNodes)
}

export function ComponentConstructor(options) {
    const componentName = options.componentName
    const computed = options.computed || {}
    const elements = options.elements || {}
    const getters = options.getters || {}
    const methods = options.methods || {}
    const onConnected = options.onConnected || emptyFn
    const onDisconnected = options.onDisconnected || emptyFn
    const onReady = options.onReady || emptyFn
    const properties = options.properties || {}
    const setters = options.setters || {}
    const style = options.style || ''
    const outerStyle = options.outerStyle
    const template = options.template || ''
    const formElement = options.formElement || false

    if (!componentName) { return }

    const propertyKeys = Object.keys(properties)
    options.observedAttributes = options.observedAttributes || propertyKeys

    properties['class'] = ComponentClassObject
    options.observedAttributes.push('class')

    const styleElementKeys = ['styles', 'theme']

    styleElementKeys.forEach(function setStyleProps(styleKey) {
        properties[styleKey] = createStyleStateObject(styleKey, elements)
        elements[styleKey] = { selector: 'style.' + styleKey }
        options.observedAttributes.push(styleKey)
    })

    const observedAttributes = options.observedAttributes

    function ConnectedFn(element) {
        function unsubscribeEvents() {
            return ObserverUnsubscribe(element)
        }

        function computedEach(key) {
            try { Object.defineProperty(element, key, computed[key](element)) } catch (error) { }
        }

        function methodsEach(key) {
            element[key] = methods[key](element)
        }

        function setPropFn(key) {
            return setStateProperty(
                element,
                key,
                properties[key].format,
                properties[key].onChange,
                getters[key],
                setters[key]
            )
        }

        function finishConnectedFn() {
            onConnected(element)
            element.ready = true
        }

        element.unsubscribeEvents = unsubscribeEvents

        for (const prop in computed) {
            if (computed[prop]) {
                computedEach(prop)
            }
        }

        for (const prop in methods) {
            if (methods[prop]) {
                methodsEach(prop)
            }
        }

        if (elements) {
            const ElementData = createElements(element, elements)
            element.elements = ElementData.state
            element.disconnectElements = ElementData.disconnect
        }

        if (!properties.ready) {
            setStateProperty(
                element,
                'ready',
                function validationFn(val) { return Pipe(ToBool, IfInvalid(false))(val).value },
                function onReadyChange() {
                    onReady(element)
                    DispatchEvent(element, 'ready', element)
                },
                getters.ready,
                setters.ready
            )
        }

        for (const prop in properties) {
            if (properties[prop]) {
                setPropFn(prop)
            }
        }

        OnNextFrame(finishConnectedFn)
    }

    const node = CreateElement({
        tagName: componentContents,
        innerHTML: template + styleElementsString
    })

    const _nodeObserverConfig = nodeObserverConfig(observedAttributes)

    function CreateComponent(host) {
        console.log(host, host.constructed)
        if (host.constructed) {
            return
        }

        const id = ID()
        const existingChildren = cleanStart(host)
        const styleElement = document.head.querySelector('style[name="' + componentName + '"]')

        if (!styleElement) {
            AppendStyleElement(style + outerStyle, document.head, componentName)
        }

        host.constructed = true
        host.wcID = id
        host.state = {}
        host.elements = {}

        host.componentContent = node.cloneNode(true)
        host.componentContent.contentFor = host
        host.componentContent.setAttribute('id', componentName + '-' + host.wcID)
        host.slots = ArrayFrom(host.componentContent.querySelectorAll('[slotname]'))
        host.slotted$ = Observer([], true)

        host.slotted$.subscribe(function (slotted) {
            ForEach(function assign(child) {
                const slotName = getSlotName(child, 'slot')
                const slot = getMatchingSlot(host, slotName)
                slot.appendChild(child)
            }, slotted)
        })

        host.disconnectElements = function () { }
        host.onConnected = function OnConnected() { return ConnectedFn(host) }
        host.onDisconnected = function OnDisconnected() {
            ObserverUnsubscribe(host)
            return onDisconnected(host)
        }

        if (existingChildren[0]) {
            host.insertBefore(host.componentContent, existingChildren[0])
        } else {
            host.appendChild(host.componentContent)
        }

        childMutation({ target: host, addedNodes: existingChildren })

        host.children$ = Observer(existingChildren)
        host.addedChildren$ = Observer(existingChildren)
        host.removedChildren$ = Observer([])

        const nodeObserver = new MutationObserver(function MutationObserverCallback(mutations) {
            ForEach(function nodeObserverCallbackInner(mutation) {
                if (mutation.type === 'attributes') { return attributeMutation(mutation) }
                if (mutation.type === 'childList') { return childMutation(mutation) }
            }, mutations)
        })
        nodeObserver.observe(host, _nodeObserverConfig)
        host.nodeObserver = nodeObserver

        if (formElement) {
            try { host.internals_ = host.attachInternals() } catch (error) { }
            Object.defineProperty(host, 'formAssociated', {
                get: function () { return true }
            })
        }

        return host

    }

    return CreateComponent
}






// function getComponentContentElement(host) {
//     return FindFirst(function (el) {
//         return !!el && typeof el.getAttribute === 'function' && el.getAttribute(componentContents)
//     }, host.childNodes)
// }

// const node = document.createElement('template')
// node.innerHTML = '<div ' + componentContents + '="' + componentName + '">' + template + styleElementsString + '</div>'


// host.appendChild(node.cloneNode(true))
// host.attachShadow({ mode: 'open' })
// host.shadowRoot.appendChild(document.importNode(node.content, true))
// host.componentContent = getComponentContentElement(host)
// host.slots = Mapper(function (el) { return el }, host.componentContent.querySelectorAll('slot'))