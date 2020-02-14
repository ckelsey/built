import { ID } from '../services/id.js'
import { ForIn } from './for-in.js'
import { ObjectAssign } from './object-assign.js'
import { ForEach } from './for-each.js'

const emptyFn = function () { }

function Observer(initialValue, noInit, onSubscribe) {
    noInit = noInit ? true : false
    onSubscribe = onSubscribe && typeof onSubscribe === 'function' ? onSubscribe : emptyFn

    let values = ObjectAssign({}, {
        value: initialValue,
        errors: [],
        previousValue: undefined,
        updated: new Date().getTime(),
        subscriptions: {},
        isComplete: false,
        eventCallbacks: {}
    })

    function valuesSubsEach(subscription) {
        return subscription.unsubscribe()
    }

    function destroy() {
        ForIn(valuesSubsEach, values.subscriptions)

        Object.defineProperties(result, {
            value: { get: function () { return undefined } },
            previous: { get: function () { return undefined } },
            subscriptions: { get: function () { return undefined } },
            next: { value: emptyFn },
            error: { value: emptyFn },
            complete: { value: emptyFn },
            subscribe: { value: emptyFn },
            unsubscribe: { value: emptyFn },
            insert: { value: emptyFn },
            insertAll: { value: emptyFn },
            remove: { value: emptyFn },
            removeElements: { value: emptyFn },
            has: { value: emptyFn },
            indexOf: { value: emptyFn },
            reverse: { value: emptyFn },
            on: { value: emptyFn },
            trigger: { value: emptyFn },
        })

        values.eventCallbacks = null
        delete values.eventCallbacks

        values.isComplete = true
    }

    function loop(functionKey, val, valuesObj) {
        valuesObj ? valuesObj : {}

        ForIn(function loopSubsEach(subscription, subscriptionId) {
            return typeof subscription[functionKey] === 'function' ?
                subscription[functionKey](val, valuesObj, subscriptionId) :
                undefined
        }, values.subscriptions)

        if (functionKey === 'complete') {
            destroy()
        }
    }

    function unsubscribe(subscription) {
        return function unsubscribeInner() {
            values.subscriptions[subscription.id] = null
            delete values.subscriptions[subscription.id]
        }
    }

    function getArrayIndexOf(element, isArray) {
        if (!isArray) { return }
        const index = values.value.indexOf(element)
        return index > -1 ? index : undefined
    }

    function getObjectKey(value) {
        let result

        function getObjectKeyLoop(val, prop) {
            if (val === value) {
                result = prop
                getObjectKeyLoop.breakloop = true
            }
        }

        try { ForIn(getObjectKeyLoop, values.value) } catch (error) { }

        return result
    }

    const result = {
        get isComplete() { return values.isComplete },
        get value() { return values.value },
        get previous() { return values.previousValue },
        get subscriptions() { return values.subscriptions },

        next: function (v) {
            values = ObjectAssign({}, values, {
                value: v,
                previousValue: values.value,
                updated: new Date().getTime(),
            })

            loop('next', values.value, values)
            return values
        },

        error: function (err) {
            values = ObjectAssign({}, values, {
                errors: values.errors.concat([err]),
                updated: new Date().getTime(),
            })

            loop('error', err, values)
        },

        complete: function () { loop('complete', values) },

        subscribe: function (next, error, complete) {
            error = error ? error : emptyFn
            complete = complete ? complete : emptyFn

            const subscription = ObjectAssign({}, {
                next: next,
                error: error,
                complete: complete,
                id: ID()
            })

            subscription.unsubscribe = unsubscribe(subscription)
            values.subscriptions[subscription.id] = subscription

            if (!noInit && values.value !== undefined && typeof subscription.next === 'function') {
                subscription.next(values.value, values, subscription.id)
            }

            onSubscribe(subscription)

            return unsubscribe(subscription)
        },

        unsubscribe: function (subscription) {
            if (!subscription || !subscription.id || !values.subscriptions[subscription.id]) { return }

            return unsubscribe(subscription)
        },

        insert: function (element, index) {
            try {
                if (index === undefined) {
                    index = values.value.length
                }

                if (Array.isArray(values.value)) {
                    values.value.splice(index, 0, element)
                    return result.next(values.value)
                }

                if (typeof values.value === 'string') {
                    values.value.splice(index, 0, element)
                    return result.next(values.value.slice(0, index) + element + values.value.slice(index))
                }

                values.value[index] = element

            } catch (error) { }

            return result.next(values.value)
        },

        insertAll: function (elements, index) {
            try {
                if (index === undefined) {
                    index = values.value.length
                }

                if (Array.isArray(values.value)) {
                    values.value.splice.apply(values.value, [index, 0].concat(elements))
                    return result.next(values.value)
                }

                ForIn(function (val, prop) { values.value[prop] = val }, elements)

            } catch (error) { }

            return result.next(values.value)
        },

        remove: function (element, index, all) {
            try {
                const isArray = Array.isArray(values.value)
                const isString = typeof values.value === 'string'

                if (index === undefined) {
                    index = getArrayIndexOf(element, isArray)
                }

                if (index === undefined && isArray) {
                    return values.value
                }

                if (index === undefined && isString) {
                    return result.next(values.value.replace(new RegExp(element, all ? 'gm' : ''), ''))
                }

                if (index !== undefined) {
                    if (isArray) {
                        values.value.splice(index, 1)
                    } else if (isString) {
                        values.value = values.value.slice(0, index)
                    } else {
                        values.value[index] = undefined
                        delete values.value[index]
                    }

                    return result.next(values.value)
                }

                const objectKey = getObjectKey(element)

                if (objectKey !== undefined) {
                    values.value[objectKey] = null
                    delete values.value[objectKey]
                    return result.next(values.value)
                }

            } catch (error) { }

            return result.next(values.value)
        },

        removeElements: function (elements) {
            try {
                if (Array.isArray(values.value)) {
                    ForEach(function (element) {
                        const index = values.value.indexOf(element)
                        if (index > -1) { values.value.splice(index, 1) }
                    }, elements)

                    return result.next(values.value)
                }

                ForIn(function (val, prop) {
                    values.value[prop] = null
                    delete values.value[prop]
                }, elements)

            } catch (error) { }

            return result.next(values.value)
        },

        reverse: function () {
            const isArray = Array.isArray(values.value)
            const isString = typeof values.value === 'string'

            if (isArray) {
                return result.next(values.value.reverse())
            }

            if (isString) {
                return result.next(values.value.split('').reverse())
            }

            result.next(values.value)
        },

        has: function (value) {
            try {
                const isArray = Array.isArray(values.value)
                const isString = typeof values.value === 'string'

                if (isArray) {
                    return getArrayIndexOf(value, isArray) || false
                }

                if (isString) {
                    return values.value.indexOf(value) > -1
                }

                const objectKey = getObjectKey(value)

                if (objectKey !== undefined) {
                    return true
                }
            } catch (error) { }

            return false
        },

        indexOf: function (value) {
            try {
                const isArray = Array.isArray(values.value)
                const isString = typeof values.value === 'string'

                if (isArray) {
                    return getArrayIndexOf(value, isArray) || -1
                }

                if (isString) {
                    return values.value.indexOf(value)
                }

            } catch (error) { }

            return getObjectKey(value) || -1
        },

        on: function (name, callback) {
            if (!values.eventCallbacks[name]) {
                values.eventCallbacks[name] = {}
            }

            const id = ID()
            values.eventCallbacks[name][id] = callback

            return function () {
                values.eventCallbacks[name][id] = null
                delete values.eventCallbacks[name][id]
            }
        },

        trigger: function (name, data) {
            if (!values.eventCallbacks[name]) { return }

            ForIn(function (callback) { callback(data) }, values.eventCallbacks[name])
        }
    }

    return result
}

export { Observer }
