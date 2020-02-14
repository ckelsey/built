import { Get } from '../utils/get.js'
import { OnNextFrame } from './on-next-frame.js'
import { ForEach } from '../utils/for-each.js'
import { ComponentSupport } from '../utils/component-support.js'

const nativeSupport = ComponentSupport()
const components = {}
let initialized = false

export const Components = {
    nativeSupport: nativeSupport,
    get: function (name) {
        if (name) {
            return components[name]
        }

        return components
    },

    addComponent: function (tag, componentFunction) {
        if (!initialized) {
            initialized = true
            Components.init()
        }
        components[tag] = {
            tag: tag,
            create: function create(node) {
                setTimeout(function () {
                    return componentFunction(node) ? node.onConnected(node) : undefined
                }, 0)
            }
        }

        function asyncCreate(node) { setTimeout(function () { components[tag].create(node) }, 0) }
        function createEach() { ForEach(asyncCreate, document.body.querySelectorAll(tag)) }
        setTimeout(createEach, 0)
    },

    init: function () {
        function handleAddedNode(node) {
            const tag = Get(node, 'nodeName.toLowerCase()')

            if (tag && components[tag]) {
                OnNextFrame(function () {
                    components[tag].create(node)
                })
            }

            ForEach(function handleAddedNodeChildren(child) {
                handleAddedNode(child)
            }, node.children)

            if (node.exists$) {
                node.exists$.next(true)
            }
        }

        function handleRemovedNode(node) {
            const tag = Get(node, 'nodeName.toLowerCase()')

            if (tag && components[tag] && typeof node.onDisconnected === 'function') {
                node.onDisconnected(node)
            }

            if (node.exists$) {
                node.exists$.next(false)
            }
        }

        const componentsObserverConfig = {
            childList: true,
            subtree: true
        }

        const componentsObserver = new MutationObserver(function componentsObserverCallback(mutations) {

            ForEach(function mutationsEach(mutation) {
                if (mutation.type === 'childList') {
                    ForEach(handleRemovedNode, mutation.removedNodes)
                    ForEach(handleAddedNode, mutation.addedNodes)
                }
            }, mutations)
        })

        componentsObserver.observe(document.body, componentsObserverConfig)
    }
}