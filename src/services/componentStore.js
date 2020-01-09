import { Get } from '../utils/get.js'
import { Singleton } from './singleton.js'

const ComponentStoreKey = Symbol.for(`builtjs.ComponentStore`)
const getTag = element => Get(element, `tagName`, ``).toLowerCase()

export const ComponentStore = Singleton(`ComponentStore`, {
    components: {},
    themes: {},
    theme: (theme, element) => Object.keys(theme).forEach(property => element[property] = theme[property]),
    addComponent: element => {
        const tag = getTag(element)

        if (tag === ``) { return }

        if (!window.global[ComponentStoreKey].components[tag]) { window.global[ComponentStoreKey].components[tag] = [] }

        window.global[ComponentStoreKey].components[tag].push(element)
        window.global[ComponentStoreKey].triggerTagSubscriptions(tag, element)

        if (window.global[ComponentStoreKey].themes[tag]) {
            Object.keys(window.global[ComponentStoreKey].themes[tag])
                .forEach(property =>
                    element[property] = window.global[ComponentStoreKey].themes[tag][property]
                )
        }
    },
    removeComponent: element => {
        const tag = getTag(element)

        if (tag === `` || !window.global[ComponentStoreKey].components[tag]) { return }

        const index = window.global[ComponentStoreKey].components[tag].indexOf(element)

        if (index === -1) { return }

        window.global[ComponentStoreKey].components[tag].splice(index, 1)
    },

    addTheme: (tag, theme) => {
        window.global[ComponentStoreKey].themes[tag] = theme

        if (!window.global[ComponentStoreKey].components[tag]) { return }

        window.global[ComponentStoreKey].components[tag]
            .forEach(element => window.global[ComponentStoreKey].theme(window.global[ComponentStoreKey].themes[tag], element))
    },

    tagSubscriptions: {},
    triggerTagSubscriptions: (tag, data) => {
        if (!window.global[ComponentStoreKey].tagSubscriptions[tag]) { return }
        window.global[ComponentStoreKey].tagSubscriptions[tag].forEach(sub => sub(data))
    },
    watchForTag: (tag, cb) => {
        if (!window.global[ComponentStoreKey].tagSubscriptions[tag]) {
            window.global[ComponentStoreKey].tagSubscriptions[tag] = []
        }

        window.global[ComponentStoreKey].tagSubscriptions[tag].push(cb)

        return function () {
            if (!window.global[ComponentStoreKey].tagSubscriptions[tag]) { return }

            let indexToRemove
            let i = window.global[ComponentStoreKey].tagSubscriptions[tag].length

            while (indexToRemove === undefined && i) {
                i = i - 1
                if (window.global[ComponentStoreKey].tagSubscriptions[tag][i] === cb) {
                    indexToRemove = i
                }
            }

            window.global[ComponentStoreKey].tagSubscriptions[tag].splice(indexToRemove, 1)
        }
    }
})
