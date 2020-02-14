import { nativeSupport } from './native-support.js'
import { Properties } from './properties.js'
import { ClassConstructor } from './class-constructor.js'
import { Elements } from './elements.js'
import { OnConnected } from './on-connected.js'
import { BuiltReadyEvent } from './built-ready-event.js'

function emptyFn() { }
function RegisterComponent(name, component) { return customElements.define(name, component) }
function OnDisconnected(host) { return host.parameters.onDisconnected(host) }

window.BuiltCreateComponent = function BuiltCreateComponent(componentOptions) {
    if (!componentOptions.componentName) { return }

    const properties = Object.freeze(Properties(componentOptions.properties))

    const Class = ClassConstructor({
        componentName: componentOptions.componentName,
        properties: properties,
        onConnected: OnConnected,
        onDisconnected: OnDisconnected,
        template: componentOptions.template || '',
        shadowStyle: componentOptions.shadowStyle,
        outerStyle: componentOptions.outerStyle
    })

    Class.prototype.onReady = componentOptions.onReady || emptyFn

    Class.prototype.parameters = {
        properties: properties,
        elements: Object.freeze(Elements(componentOptions.elements)),
        getters: Object.freeze(componentOptions.getters || {}),
        setters: Object.freeze(componentOptions.setters || {}),
        computed: Object.freeze(componentOptions.computed || {}),
        methods: Object.freeze(componentOptions.methods || {}),
        onConnected: componentOptions.onConnected || emptyFn,
        onDisconnected: OnDisconnected,
        observeChildren: componentOptions.observeChildren,
        observeSlots: componentOptions.observeSlots
    }

    RegisterComponent(componentOptions.componentName, Class)

    return Class
}

window.builtready = true
window.BuiltCreateComponent.nativeSupport = nativeSupport
window.document.dispatchEvent(BuiltReadyEvent())