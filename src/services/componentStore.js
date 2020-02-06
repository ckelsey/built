import { Get } from '../utils/get.js'

function getTag(element) {
    return Get(element, 'tagName', '').toLowerCase()
}

export const ComponentStore = (function ComponentStoreIFEE() {
    const componentStore = {
        components: {},
        themes: {},
        theme: function (theme, element) {
            return Object.keys(theme).forEach(
                function (property) {
                    element[property] = theme[property]
                }
            )
        },
        addComponent: function (element) {
            const tag = getTag(element)

            if (tag === '') { return }

            if (!componentStore.components[tag]) { componentStore.components[tag] = [] }

            componentStore.components[tag].push(element)
            componentStore.triggerTagSubscriptions(tag, element)

            if (componentStore.themes[tag]) {
                Object.keys(componentStore.themes[tag])
                    .forEach(function (property) {
                        element[property] = componentStore.themes[tag][property]
                    })
            }
        },
        removeComponent: function (element) {
            const tag = getTag(element)

            if (tag === '' || !componentStore.components[tag]) { return }

            const index = componentStore.components[tag].indexOf(element)

            if (index === -1) { return }

            componentStore.components[tag].splice(index, 1)
        },

        addTheme: function (tag, theme) {
            componentStore.themes[tag] = theme

            if (!componentStore.components[tag]) {
                return
            }

            componentStore.components[tag]
                .forEach(function (element) {
                    componentStore.theme(componentStore.themes[tag], element)
                })
        },

        tagSubscriptions: {},
        triggerTagSubscriptions: function (tag, data) {
            if (!componentStore.tagSubscriptions[tag]) { return }

            componentStore.tagSubscriptions[tag]
                .forEach(function (sub) {
                    sub(data)
                })
        },
        watchForTag: function (tag, cb) {
            if (!componentStore.tagSubscriptions[tag]) {
                componentStore.tagSubscriptions[tag] = []
            }

            componentStore.tagSubscriptions[tag].push(cb)

            return function () {
                if (!componentStore.tagSubscriptions[tag]) { return }

                let indexToRemove
                let i = componentStore.tagSubscriptions[tag].length

                while (indexToRemove === undefined && i) {
                    i = i - 1
                    if (componentStore.tagSubscriptions[tag][i] === cb) {
                        indexToRemove = i
                    }
                }

                componentStore.tagSubscriptions[tag].splice(indexToRemove, 1)
            }
        }
    }

    return componentStore
})()