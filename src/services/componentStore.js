/* eslint-disable tree-shaking/no-side-effects-in-initialization */
import { Get } from '..'

const ComponentStoreKey = Symbol.for(`builtjs.ComponentStore`)
const globalSymbols = Object.getOwnPropertySymbols(global)
const hasComponentStore = (globalSymbols.indexOf(ComponentStoreKey) > -1)
const getTag = element => Get(element, `tagName`, ``).toLowerCase()

if (!hasComponentStore) {
    global[ComponentStoreKey] = {
        components: {},
        themes: {},
        theme: (theme, element) => Object.keys(theme).forEach(property => element[property] = theme[property]),
        addComponent: element => {
            const tag = getTag(element)

            if (tag === ``) { return }

            if (!global[ComponentStoreKey].components[tag]) { global[ComponentStoreKey].components[tag] = [] }

            global[ComponentStoreKey].components[tag].push(element)

            if (global[ComponentStoreKey].themes[tag]) {
                Object.keys(global[ComponentStoreKey].themes[tag]).forEach(property => element[property] = global[ComponentStoreKey].themes[tag][property])
            }
        },
        removeComponent: element => {
            const tag = getTag(element)

            if (tag === ``) { return }

            if (!global[ComponentStoreKey].components[tag]) { return }

            const index = global[ComponentStoreKey].components[tag].indexOf(element)

            if (index === -1) { return }

            global[ComponentStoreKey].components[tag].splice(index, 1)
        },

        addTheme: (tag, theme) => {
            global[ComponentStoreKey].themes[tag] = theme

            if (!global[ComponentStoreKey].components[tag]) { return }

            global[ComponentStoreKey].components[tag]
                .forEach(element => global[ComponentStoreKey].theme(global[ComponentStoreKey].themes[tag], element))
        }
    }
}

export const ComponentStore = Object.freeze(global[ComponentStoreKey])

// Object.defineProperty(ComponentStore, "instance", {
//     get: function () {
//         return global[ComponentStoreKey];
//     }
// })
