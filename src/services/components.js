import { Get } from '../utils/get.js'
import { OnNextFrame } from './on-next-frame.js'
import { ForEach } from '../utils/for-each.js'

const components = {}
let initialized = false

export const Components = {
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
                componentFunction(node)
                node.onConnected(node)
            }
        }

        const tagElements = document.body.querySelectorAll(tag)
        let tagElementsIndex = tagElements.length

        while (tagElementsIndex--) {
            components[tag].create(tagElements[tagElementsIndex])
        }
    },

    init: function () {
        function handleAddedNode(node) {
            const tag = Get(node, 'nodeName.toLowerCase()')

            if (tag && components[tag]) {
                OnNextFrame(function () {
                    components[tag].create(node)
                })
            }

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

        const componentsObserverConfig = { childList: true, subtree: true }
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