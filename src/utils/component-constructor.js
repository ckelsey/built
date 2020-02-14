// import { OnNextFrame } from '../services/on-next-frame.js'
// import { ObserverUnsubscribe } from './observer-unsubscribe.js'
// import { ComponentClassObject } from './component-class-object.js'
// import { Observer } from './observer.js'
// import { AppendStyleElement } from './append-style-element.js'
// import { Pipe } from './pipe.js'
// import { ToBool } from './to-bool.js'
// import { IfInvalid } from './if-invalid.js'
// import { ID } from '../services/id.js'
// import { CreateElement } from './create-element.js'
// import { DispatchEvent } from './dispatch-event.js'
// import { ForEach } from './for-each.js'
// import { ArrayFrom } from './array-from.js'
// import { ComponentCreateElements } from './component-create-elements.js'
// import { ComponentStyles } from './component-styles.js'
// import { ComponentStateProperty } from './component-state-property.js'
// import { ComponentObserverConfig, getSlotName, GetMatchingSlot, ComponentChildMutation, ComponentAttributeMutation } from './component-mutations.js'
// import { ForIn } from './for-in.js'
// // import { ObjectAssign } from './object-assign.js'
// // import { Components } from '../services/components.js'
// // import { ComponentClassConstructor } from './component-class-constructor.js'

// const styleElementKeys = ['styles', 'theme']
// const componentContents = 'component-contents'
// const styleElementsString = '<span class="style-block-theme"></span><span class="style-block-styles"></span>'

// // if (!window.Reflect) { PolyfillReflect() }

// function emptyFn() { }
// function isUselessText(child) { return child.nodeName === '#text' && !(/\S/gm.test(child.textContent)) }

// function cleanStart(host) {
//     const actualChildren = []

//     function childrenEach(child) {
//         return !isUselessText(child) ?
//             actualChildren.push(child) :
//             host.removeChild(child)
//     }

//     ForEach(childrenEach, host.childNodes, true)

//     return actualChildren
// }

// export function ComponentConstructor(options) {

//     const componentName = options.componentName
//     const computed = options.computed || {}
//     const elements = options.elements || {}
//     const getters = options.getters || {}
//     const methods = options.methods || {}
//     const properties = options.properties || {}
//     const setters = options.setters || {}

//     if (!componentName) { return }

//     properties.class = ComponentClassObject

//     if (!properties.class) {
//         properties.class = ComponentClassObject
//     }

//     if (!properties.ready) {
//         properties.ready = {
//             format: function validationFn(val) { return Pipe(ToBool, IfInvalid(false))(val).value },
//             onChange: function onReadyChange(_val, host) {
//                 (options.onReady || emptyFn)(host)
//                 host.setAttribute('ready', 'true')
//                 DispatchEvent(host, 'ready', host)
//             }
//         }
//     }

//     styleElementKeys.forEach(function setStyleProps(styleKey) {
//         properties[styleKey] = ComponentStyles(styleKey, elements)
//         elements[styleKey] = { selector: 'style.' + styleKey }
//     })

//     function ConnectedFn(element) {
//         function computedEach(value, key) {
//             try { Object.defineProperty(element, key, value(element)) } catch (error) { }
//         }

//         function methodsEach(value, key) {
//             element[key] = value(element)
//         }

//         function setPropFn(value, key) {
//             return ComponentStateProperty(
//                 element,
//                 key,
//                 value.format,
//                 value.onChange,
//                 getters[key],
//                 setters[key]
//             )
//         }

//         function finishConnectedFn() {
//             (options.onConnected || emptyFn)(element)
//             OnNextFrame(function () {
//                 element.ready = true
//             })
//         }

//         ForIn(computedEach, computed)
//         ForIn(methodsEach, methods)

//         if (elements) {
//             element.elements = ComponentCreateElements(element, elements)
//         }

//         ForIn(setPropFn, properties)

//         OnNextFrame(finishConnectedFn)
//     }

//     const node = CreateElement({ tagName: componentContents, innerHTML: (options.template || '') + styleElementsString })
//     const observerConfig = ComponentObserverConfig(options.observedAttributes || Object.keys(properties))

//     function CreateComponent(host) {
//         if (host.constructed) { return }

//         if (!document.head.querySelector('style[name="' + componentName + '"]')) {
//             AppendStyleElement((options.style || '') + (options.outerStyle || ''), document.head, componentName)
//         }

//         // INIT
//         host.constructed = true
//         host.componentId = ID()
//         host.state = {}
//         host.elements = {}
//         host.componentContent = node.cloneNode(true)
//         host.componentContent.contentFor = host
//         host.componentContent.setAttribute('id', componentName + '-' + host.componentId)

//         // SLOTS
//         host.slots = ArrayFrom(host.componentContent.querySelectorAll('[slotname]'))
//         host.slotted$ = Observer([], true)
//         host.slotted$.subscribe(function (slotted) {
//             ForEach(function assign(child) {
//                 const slotName = getSlotName(child, 'slot')
//                 const slot = GetMatchingSlot(host, slotName)
//                 slot.appendChild(child)
//             }, slotted)
//         })

//         // DOM CONNECTION
//         host.onConnected = function OnConnected() { return ConnectedFn(host) }
//         host.onDisconnected = function OnDisconnected() {
//             ObserverUnsubscribe(host)
//             return (options.onDisconnected || emptyFn)(host)
//         }

//         // CHILDREN
//         const existingChildren = cleanStart(host)

//         if (existingChildren[0]) {
//             host.insertBefore(host.componentContent, existingChildren[0])
//         } else {
//             host.appendChild(host.componentContent)
//         }

//         host.children$ = Observer(existingChildren)

//         ComponentChildMutation({ target: host, addedNodes: existingChildren })

//         // OBSERVER
//         const nodeObserver = new MutationObserver(function MutationObserverCallback(mutations) {
//             ForEach(function nodeObserverCallbackInner(mutation) {
//                 if (mutation.type === 'attributes') { return ComponentAttributeMutation(mutation) }
//                 if (mutation.type === 'childList') { return ComponentChildMutation(mutation) }
//             }, mutations)
//         })

//         nodeObserver.observe(host, observerConfig)
//         host.nodeObserver = nodeObserver
//         host.eventSubscriptions = host.eventSubscriptions || {}

//         // FORM
//         if (options.formElement) {
//             try { host.internals_ = host.attachInternals() } catch (error) { }
//             Object.defineProperty(host, 'formAssociated', { get: function () { return true } })
//         }

//         return host

//     }

//     return CreateComponent
// }