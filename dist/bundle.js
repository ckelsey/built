(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["builtjs"] = factory();
	else
		root["builtjs"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TMonad; });
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _is_t_monad_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);
/* harmony import */ var _object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




function TMonad(value) {
    if (Object(_is_t_monad_js__WEBPACK_IMPORTED_MODULE_1__[/* IsTMonad */ "a"])(value)) {
        return Object(_object_assign_js__WEBPACK_IMPORTED_MODULE_2__[/* ObjectAssign */ "a"])({}, value, { type: Object(_type_js__WEBPACK_IMPORTED_MODULE_0__[/* Type */ "a"])(value.value) })
    }


    const data = {
        valid: true,
        value: value,
        type: Object(_type_js__WEBPACK_IMPORTED_MODULE_0__[/* Type */ "a"])(value),
        stringChanges: [], // not required
        stop: false // not required
    }

    return data
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pipe; });
function Pipe() {
    const functions = arguments
    const count = functions.length

    return function PipeInnerFunction(value) {
        let loopIndex = count + 1

        while (loopIndex--) {
            value = typeof functions[count - loopIndex] !== 'function' ?
                value :
                functions[count - loopIndex](value)
        }

        return value
    }
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Get; });
function emptyModifyFn(v) {
    return v
}

function argsMapper(arg) {
    return !isNaN(arg) ? parseFloat(arg) : arg.trim()
}

function isNull(v) {
    return v === undefined || v === null
}

function Get(obj, path, emptyVal, modifyFn) {
    modifyFn = typeof modifyFn === 'function' ? modifyFn : emptyModifyFn

    /** If nothing to search, return */
    if (!obj) {
        return modifyFn(emptyVal)
    }

    /** The search array, initial search item being the source */
    const pathParts = path.split('.')
    let result = obj

    const count = pathParts.length
    let loopIndex = pathParts.length

    // for (let partIndex = 0; partIndex < pathParts.length; partIndex = partIndex + 1) {
    while (loopIndex) {
        if (isNull(result)) {
            result = emptyVal
            break
        }

        const partIndex = count - loopIndex
        const startParens = /\(/.exec(pathParts[partIndex])

        if (startParens) {
            const fn = result[pathParts[partIndex].slice(0, startParens.index)]

            if (typeof fn === 'function') {

                result = fn.apply(
                    result,
                    /\((.*?)\)/g.exec(pathParts[partIndex])[1]
                        .split(',')
                        .map(argsMapper)
                )

                loopIndex = loopIndex - 1
                continue
            }
        }

        result = result[pathParts[partIndex]]
        loopIndex = loopIndex - 1
    }

    /** If nothing was found return emptyVal */
    if (isNull(result)) { result = emptyVal }

    return modifyFn(result)
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Type; });
/* harmony import */ var _is_non_collection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var _is_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var _is_date_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38);
/* harmony import */ var _is_object_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);





function Type(value) {
    return value === null ?
        'null' :
        Object(_is_non_collection_js__WEBPACK_IMPORTED_MODULE_0__[/* IsNonCollection */ "a"])(value) ?
            typeof value :
            Object(_is_dom_js__WEBPACK_IMPORTED_MODULE_1__[/* IsDom */ "a"])(value) ?
                'dom' :
                Array.isArray(value) ?
                    'array' :
                    Object(_is_date_js__WEBPACK_IMPORTED_MODULE_2__[/* IsDate */ "a"])(value) ?
                        'date' :
                        Object(_is_object_js__WEBPACK_IMPORTED_MODULE_3__[/* IsObject */ "a"])(value) ?
                            'object' :
                            typeof thing

}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectAssign; });
/* harmony import */ var _for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _for_in_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);



function ObjectAssign() {
    let target

    Object(_for_each_js__WEBPACK_IMPORTED_MODULE_0__[/* ForEach */ "a"])(function (obj, index) {
        if (!index) { return target = obj }
        Object(_for_in_js__WEBPACK_IMPORTED_MODULE_1__[/* ForIn */ "a"])(function (value, prop) { target[prop] = value }, obj)
    }, arguments)

    return target
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForEach; });
function ForEach(fn, collection, reverseOrder) {
    if (!collection) { return }

    let index = collection.length

    function getIValue() {
        return reverseOrder ?
            function () { return index - 1 } :
            function () { return collection.length - index }
    }

    const iValue = getIValue()

    function apply(i) { fn(collection[i], i, collection) }

    while (index) {
        apply(iValue())
        index = index - 1
    }

    return collection
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToString; });
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);




function ToString(value) {
    let stop = Object(_get_js__WEBPACK_IMPORTED_MODULE_2__[/* Get */ "a"])(value, 'stop', false)

    if (stop) {
        return Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(value)
    }

    let result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(value)

    try {
        if (!!result.value || result.value === '') {
            result.value = result.value.toString()
            result.valid = typeof result.value === 'string'
        } else {
            result.value = ''
            result.valid = false
        }
    } catch (error) {
        result.valid = false
    }

    result.type = Object(_type_js__WEBPACK_IMPORTED_MODULE_1__[/* Type */ "a"])(result.value)
    return result
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OnNextFrame; });
/* harmony import */ var _services_id_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);


const OnNextFrameQueueObject = {}
const OnNextFrameQueue = []
let isRunning = false
let frameTimer
let timeout

function deleteEntry(id) {
    if (!OnNextFrameQueueObject[id]) { return }
    OnNextFrameQueueObject[id].hasRun = true
    OnNextFrameQueueObject[id].canceled = true
    OnNextFrameQueueObject[id] = null
    delete OnNextFrameQueueObject[id]
}

function hasTime(startTime) {
    return performance.now() - startTime < runTasks.max
}

function runTasks(startTime) {
    cancelAnimationFrame(frameTimer)
    clearTimeout(timeout)

    do {
        const id = OnNextFrameQueue.shift()

        if (OnNextFrameQueueObject[id] && !OnNextFrameQueueObject[id].canceled && !OnNextFrameQueueObject[id].hasRun) {
            OnNextFrameQueueObject[id].hasRun = true
            OnNextFrameQueueObject[id].resolve(OnNextFrameQueueObject[id].task())
            requestAnimationFrame(function () {
                deleteEntry(id)
            })
        }

    } while (hasTime(startTime) && OnNextFrameQueue.length)

    if (OnNextFrameQueue.length) {
        return frameTimer = requestAnimationFrame(function () {
            timeout = setTimeout(
                function () { runTasks(performance.now()) }
            )
        })
    } else {
        isRunning = false
    }
}

runTasks.max = 4.5

function RunOnNextFrame() {
    if (isRunning || !OnNextFrameQueue.length) { return }
    isRunning = true
    runTasks(performance.now())
}

function OnNextFrame(task) {
    var resolve
    var reject

    const promise = new Promise(function OnNextFramePromise(res, rej) {
        resolve = res
        reject = rej
    })

    const id = Object(_services_id_js__WEBPACK_IMPORTED_MODULE_0__[/* ID */ "a"])()
    OnNextFrameQueueObject[id] = {
        hasRun: false,
        canceled: false,
        task: task,
        promise: promise,
        resolve: resolve,
        reject: reject,
        id: id,
        cancel: function OnNextFrameCancel() {
            deleteEntry(id)
        }
    }

    OnNextFrameQueue.push(id)
    RunOnNextFrame()

    return OnNextFrameQueueObject[id]
}

OnNextFrame.max = function OnNextFrameMax(max) { runTasks.max = max }

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IfInvalid; });
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


/**
 * Returns a function that then takes a TMonad. If that value is invalid, it returns the replacement instead
 * @function TMonad
 * @param {any} replacement - The value to be returned if the resulting funtion is invalid
 * @return {any} Either the original value or the replacement
 * @example
 * 
 * const ifInvalid = IfInvalid('hey')
 * const value = ToNumber('hola')
 * const result = ifInvalid(value).value // 'hey'
 */

function IfInvalid(replacement) {

    /** Return a new function that takes a TMonad */
    return function IfInvalidInternal(value) {
        const result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(value)

        /** If the stop flag is true or the TMonad is valid, continue */
        if (result.stop || !!result.valid) { return result }

        /** If not valid, return replacement */
        return Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(replacement)
    }
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForIn; });
function ForIn(fn, collection, skipInherited) {
    if (!collection) { return }

    fn.breakloop = false

    for (let prop in collection) {
        if (fn.breakloop) { return collection }

        if (skipInherited) {
            if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                fn(collection[prop], prop, collection)
            }
        } else {
            fn(collection[prop], prop, collection)
        }

    }

    return collection
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observer; });
/* harmony import */ var _services_id_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _for_in_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);





const emptyFn = function () { }

function Observer(initialValue, noInit, onSubscribe) {
    noInit = noInit ? true : false
    onSubscribe = onSubscribe && typeof onSubscribe === 'function' ? onSubscribe : emptyFn

    let values = Object(_object_assign_js__WEBPACK_IMPORTED_MODULE_2__[/* ObjectAssign */ "a"])({}, {
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
        Object(_for_in_js__WEBPACK_IMPORTED_MODULE_1__[/* ForIn */ "a"])(valuesSubsEach, values.subscriptions)

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

        Object(_for_in_js__WEBPACK_IMPORTED_MODULE_1__[/* ForIn */ "a"])(function loopSubsEach(subscription, subscriptionId) {
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

        try { Object(_for_in_js__WEBPACK_IMPORTED_MODULE_1__[/* ForIn */ "a"])(getObjectKeyLoop, values.value) } catch (error) { }

        return result
    }

    const result = {
        get isComplete() { return values.isComplete },
        get value() { return values.value },
        get previous() { return values.previousValue },
        get subscriptions() { return values.subscriptions },

        next: function (v) {
            values = Object(_object_assign_js__WEBPACK_IMPORTED_MODULE_2__[/* ObjectAssign */ "a"])({}, values, {
                value: v,
                previousValue: values.value,
                updated: new Date().getTime(),
            })

            loop('next', values.value, values)
            return values
        },

        error: function (err) {
            values = Object(_object_assign_js__WEBPACK_IMPORTED_MODULE_2__[/* ObjectAssign */ "a"])({}, values, {
                errors: values.errors.concat([err]),
                updated: new Date().getTime(),
            })

            loop('error', err, values)
        },

        complete: function () { loop('complete', values) },

        subscribe: function (next, error, complete) {
            error = error ? error : emptyFn
            complete = complete ? complete : emptyFn

            const subscription = Object(_object_assign_js__WEBPACK_IMPORTED_MODULE_2__[/* ObjectAssign */ "a"])({}, {
                next: next,
                error: error,
                complete: complete,
                id: Object(_services_id_js__WEBPACK_IMPORTED_MODULE_0__[/* ID */ "a"])()
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

                Object(_for_in_js__WEBPACK_IMPORTED_MODULE_1__[/* ForIn */ "a"])(function (val, prop) { values.value[prop] = val }, elements)

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
                    Object(_for_each_js__WEBPACK_IMPORTED_MODULE_3__[/* ForEach */ "a"])(function (element) {
                        const index = values.value.indexOf(element)
                        if (index > -1) { values.value.splice(index, 1) }
                    }, elements)

                    return result.next(values.value)
                }

                Object(_for_in_js__WEBPACK_IMPORTED_MODULE_1__[/* ForIn */ "a"])(function (val, prop) {
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

            const id = Object(_services_id_js__WEBPACK_IMPORTED_MODULE_0__[/* ID */ "a"])()
            values.eventCallbacks[name][id] = callback

            return function () {
                values.eventCallbacks[name][id] = null
                delete values.eventCallbacks[name][id]
            }
        },

        trigger: function (name, data) {
            if (!values.eventCallbacks[name]) { return }

            Object(_for_in_js__WEBPACK_IMPORTED_MODULE_1__[/* ForIn */ "a"])(function (callback) { callback(data) }, values.eventCallbacks[name])
        }
    }

    return result
}




/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TMonadUpdate; });
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _object_assign_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



function TMonadUpdate(tmonad, expectedType) {
    return Object(_object_assign_js__WEBPACK_IMPORTED_MODULE_1__[/* ObjectAssign */ "a"])(tmonad, {
        type: Object(_type_js__WEBPACK_IMPORTED_MODULE_0__[/* Type */ "a"])(tmonad.value),
        valid: expectedType === '?' ? true : tmonad.type === expectedType, // '?' signifies any
    })
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ID; });
/**
 * Generates a runtime unique ID
 * @generator
 * @yields { string }
 */

let index = 0

function doId(indx) {
    return doHash() + indx
}

function doHash() {
    return (performance.now() + 'xxxxxxxxxxxxxxxx')
        .replace(
            /[x]|\./g,
            function () {
                return (Math.random() * 16 | 0).toString(16)
            }
        )
}

const ID = function IDInner() {
    index = index + 1
    return doId(index)
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToMap; });
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _t_monad_update_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _to_array_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _stop_if_invalid_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _pipe_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);







function ToMap(fn) {
    return function (value) {
        let result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(value)

        if (result.stop) { return result }

        function map(v) {
            if (Object(_type_js__WEBPACK_IMPORTED_MODULE_1__[/* Type */ "a"])(v.value) !== 'array') {
                v.valid = false
                return v
            }

            v.value = v.value.map(fn)
            return v
        }

        return Object(_t_monad_update_js__WEBPACK_IMPORTED_MODULE_2__[/* TMonadUpdate */ "a"])(Object(_pipe_js__WEBPACK_IMPORTED_MODULE_5__[/* Pipe */ "a"])(
            _to_array_js__WEBPACK_IMPORTED_MODULE_3__[/* ToArray */ "a"],
            _stop_if_invalid_js__WEBPACK_IMPORTED_MODULE_4__[/* StopIfInvalid */ "a"],
            map
        )(result), 'array', 'Map')
    }
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IsObject; });
/**
 * Determines if the value is an object
 * @function IsObject
 * @param {any} value 
 * @return {boolean} Whether or not the value is an object
 * @example
 * IsObject() // false
 * IsObject(()=>{}) // false
 * IsObject('') // false
 * IsObject(true) // false
 * IsObject(null) // false
 * IsObject(new Date()) // false
 * IsObject([]) // false
 * IsObject({}) // true
 */

function IsObject(value) {
    return (typeof value).indexOf('object') > -1 && value !== null && !Array.isArray(value) && !(value instanceof Date)
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FromEntities; });
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


function FromEntities(value) {
    const result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(value)

    if (result.stop) { return result }

    if (result.type === 'string' && !!result.value) {

        result.value = result.value
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
            .replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g, '\'')

        result.valid = true
    } else {
        result.valid = false
    }

    return result
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IsElement; });
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



function IsElement(value) {
    const result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(value)

    if (result.stop) {
        return result
    }

    result.valid = Object(_get_js__WEBPACK_IMPORTED_MODULE_1__[/* Get */ "a"])(result, 'value.nodeType') === 1
    return result
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WhenAvailable; });
/* harmony import */ var _services_on_next_frame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



function WhenAvailable(host, path, isMethod, max) {
    max = max === undefined ? 1000 : max

    return new Promise(function WhenAvailablePromise(resolve, reject) {
        if (!host || (!host.parentNode && !host.parentElement)) {
            return reject({
                host: host,
                path: path
            })
        }

        function test() {
            max = max - 1

            const val = Object(_get_js__WEBPACK_IMPORTED_MODULE_1__[/* Get */ "a"])(host, path)

            if (!max) {
                return reject({
                    host: host,
                    path: path
                })
            }

            if (val === undefined || (isMethod && typeof val !== 'function')) { return Object(_services_on_next_frame_js__WEBPACK_IMPORTED_MODULE_0__[/* OnNextFrame */ "a"])(test) }

            return resolve(val)
        }

        test()
    })
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StopIfInvalid; });
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


function StopIfInvalid(value) {
    const result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(value)

    if (!result.valid) {
        result.stop = true
    }

    return result
}

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToSplit; });
/* harmony import */ var _to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _to_split_meta_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(45);
/* harmony import */ var _t_monad_update_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);






function ToSplit(delimeter) {
    return function ToSplitInner(value) {
        let result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_1__[/* TMonad */ "a"])(value)

        if (result.stop) { return result }

        if (result.type !== 'string') {
            result = Object(_to_string_js__WEBPACK_IMPORTED_MODULE_0__[/* ToString */ "a"])(result)
        }

        const splat = Object(_to_split_meta_js__WEBPACK_IMPORTED_MODULE_2__[/* ToSplitMeta */ "a"])(result.value, delimeter)

        if (typeof splat.value === 'string') {
            result.valid = false
            return Object(_t_monad_update_js__WEBPACK_IMPORTED_MODULE_3__[/* TMonadUpdate */ "a"])(result, 'array', 'Split')
        }

        result.stringChanges = result.stringChanges.concat(splat.stringChanges)
        result.value = splat.value

        return Object(_t_monad_update_js__WEBPACK_IMPORTED_MODULE_3__[/* TMonadUpdate */ "a"])(result, 'array', 'Split')
    }
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateElement; });
/* harmony import */ var _services_on_next_frame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _get_parent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var _is_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);





const fragment = document.createDocumentFragment()

function CreateElement(obj) {
    const el = document.createElement(obj.tagName || 'div')
    fragment.appendChild(el)

    function objKeysEach(key) {
        if (key === 'tagName') { return }

        let max = 1000

        const events = Object(_get_js__WEBPACK_IMPORTED_MODULE_3__[/* Get */ "a"])(obj, 'eventSubscriptions')

        function tryParent() {
            max = max - 1

            const parent = Object(_get_parent_js__WEBPACK_IMPORTED_MODULE_1__[/* GetParent */ "a"])(el)

            if (!parent && max) {
                if (max) {
                    return Object(_services_on_next_frame_js__WEBPACK_IMPORTED_MODULE_0__[/* OnNextFrame */ "a"])(tryParent)
                }
            }

            if (!el.eventSubscriptions) {
                el.eventSubscriptions = {}
            }

            const eventKeys = Object.keys(events)
            let loopIndex = eventKeys.length

            while (loopIndex--) {
                if (typeof events[eventKeys[loopIndex]] === 'function') {
                    el.eventSubscriptions[eventKeys[loopIndex]] = events[eventKeys[loopIndex]]()
                }
            }
        }

        function childrenArrayEach(child) {
            return Object(_is_element_js__WEBPACK_IMPORTED_MODULE_2__[/* IsElement */ "a"])(child).valid ?
                el.appendChild(child) :
                el.appendChild(CreateElement(child))
        }

        if (key === 'eventSubscriptions') {
            return tryParent()
        }

        if (['textContent', 'innerHTML'].indexOf(key) > -1) {
            return el[key] = obj[key]
        }

        if (key === 'children') {
            if (Array.isArray(obj[key])) {
                let loopIndex = obj[key].length
                while (loopIndex--) { childrenArrayEach(obj[key][loopIndex]) }
                return
            } else {
                return Object(_is_element_js__WEBPACK_IMPORTED_MODULE_2__[/* IsElement */ "a"])(obj[key]).valid ?
                    el.appendChild(obj[key]) :
                    el.appendChild(CreateElement(obj[key]))
            }
        }

        if (['string', 'number', 'boolean'].indexOf(typeof obj[key]) > -1) {
            el.setAttribute(key, obj[key])
        } else {
            el[key] = obj[key]
        }
    }

    const objKeys = Object.keys(obj)
    let index = objKeys.length

    while (index--) { objKeysEach(objKeys[index]) }

    return el
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FromURIComponent; });
/* harmony import */ var _do_uri_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);


function FromURIComponent(value) { return Object(_do_uri_js__WEBPACK_IMPORTED_MODULE_0__[/* DoURI */ "a"])(value, false, true) }


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToRegex; });
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


function is(v) { return !!v }

function ToRegex(string) {
    let result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(string)

    if (!result.value) {
        result.value = new RegExp('')

    } else if (typeof result.value.split !== 'function' && typeof result.value === 'object') {
        // already regex, clone
        result.value = new RegExp(result.value)

    } else if (typeof result.value === 'string') {
        if (result.value.indexOf('/') === 0) {
            // regex that has been converted to string and needs to be prepared
            // split and make sure to remove empties(usually begining/end or if json escaped) for the join later
            const parts = result.value.split('/').filter(is)
            let options = parts.pop()

            if (options.match(/[^gmisuy]/)) {
                // if anything other than standard flag, send back to regex
                parts.push(options)
                options = undefined
            }

            result.value = new RegExp(parts.join('/'), options)

        } else {
            // proper first argument
            result.value = new RegExp(result.value)
        }
    }

    result.valid = true
    result.type = 'object'
    return result
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToArray; });
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _pipe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _to_plain_text_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31);
/* harmony import */ var _from_json_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);






function ToArray(value) {
    const temp = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(value)
    if (temp.stop) { return value }

    const result = Array.isArray(temp.value)
        ? temp
        : typeof temp.value === 'string'
            ? Object(_pipe_js__WEBPACK_IMPORTED_MODULE_1__[/* Pipe */ "a"])(_to_plain_text_js__WEBPACK_IMPORTED_MODULE_2__[/* ToPlainText */ "a"], _from_json_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])(temp)
            : temp

    result.type = Object(_type_js__WEBPACK_IMPORTED_MODULE_4__[/* Type */ "a"])(result.value)
    result.valid = result.type === 'array'
    return result
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToBool; });
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



const invalids = ['0', 0, 'off', 'false', false]
const valids = ['1', 1, 'on', 'true', true]

function ToBool(value) {
    const result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(value)

    if (result.stop) {
        return result
    }

    if (invalids.indexOf(result.value) > -1) {
        result.value = false
        result.valid = true
    } else if (valids.indexOf(result.value) > -1) {
        result.value = true
        result.valid = true
    } else {
        result.value = false
        result.valid = false
    }

    result.type = Object(_type_js__WEBPACK_IMPORTED_MODULE_1__[/* Type */ "a"])(result.value)
    return result
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IsDom; });
/**
 * Determines if a value is a valid DOM element
 * @function IsDom
 * @param {any} value - The value to test
 * @return {boolean} If the value is a DOM element
 * @example
 * const element = document.createElement('div')
 * IsDom(element) // true
 * IsDom('nope') // false
 */
function IsDom(value) {
    return (value instanceof Element) || (value instanceof Node)
} 

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IsEmpty; });
/**
 * Determines if the value is empty, whether it's an empty array, object, string or is falsey
 * @function IsEmpty
 * @param {any} value 
 * @return {boolean} Whether or not the value is empty
 * @example
 * IsEmpty() // true
 * IsEmpty('undefined') // true
 * IsEmpty('') // true
 * IsEmpty(false) // true
 * IsEmpty('false') // true
 * IsEmpty('null') // true
 * IsEmpty(null) // true
 * IsEmpty({}) // true
 * IsEmpty([]) // true
 * IsEmpty(['value']) // false
 */

function IsEmpty(value) {
    return value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0) ||
        ((typeof value).indexOf('object') > -1 && Object.keys(value).length === 0) ||
        value === false ||
        value === 'false' ||
        value === 'undefined' ||
        value === 'null'
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayFrom; });
/* harmony import */ var _mapper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);


function ArrayFrom(collection) {
    if (!collection || !collection.length) {
        return []
    }

    return Object(_mapper_js__WEBPACK_IMPORTED_MODULE_0__[/* Mapper */ "a"])(function (element) { return element }, collection)
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IsNonCollection; });
/**
 * Determines if a value is not a collection 
 * @function IsNonCollection
 * @param {any} value - The value to test
 * @return {boolean} Whether or not the value is a collection
 * @example
 * IsNonCollection({}) // false
 * IsNonCollection([]) // false
 * IsNonCollection('') // true
 * IsNonCollection(1) // true
 * IsNonCollection(null) // true
 * IsNonCollection(undefined) // true
 * IsNonCollection(()=>{}) // true
 * IsNonCollection(true) // true
 */

const nonCollections = ['string', 'number', 'null', 'undefined', 'function', 'boolean', 'date']

function IsNonCollection(value) { return nonCollections.indexOf(typeof value) > -1 || value === null || value instanceof Date }

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GetParent; });
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


function modifier(p) {
    return !!p && p.nodeName === '#document-fragment' ?
        Object(_get_js__WEBPACK_IMPORTED_MODULE_0__[/* Get */ "a"])(p, 'host', p) :
        !!p && p.assignedSlot ?
            Object(_get_js__WEBPACK_IMPORTED_MODULE_0__[/* Get */ "a"])(p, 'assignedSlot.parentNode', p) :
            p
}

function GetParent(element) {
    return Object(_get_js__WEBPACK_IMPORTED_MODULE_0__[/* Get */ "a"])(element, 'parentNode',
        Object(_get_js__WEBPACK_IMPORTED_MODULE_0__[/* Get */ "a"])(element, 'host',
            Object(_get_js__WEBPACK_IMPORTED_MODULE_0__[/* Get */ "a"])(element, '__shady_parent.host')
        ),
        modifier
    )
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommasToArray; });
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _pipe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _to_plain_text_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31);
/* harmony import */ var _to_split_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _to_map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _to_trim_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(46);







function trim(el) {
    return Object(_to_trim_js__WEBPACK_IMPORTED_MODULE_5__[/* ToTrim */ "a"])(el).value
}

function CommasToArray(value) {
    let result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(value)

    if (result.stop) { return result }

    if (result.type === 'array') {
        return result
    }

    if (result.type === 'undefined') {
        result.valid = false
        return result
    }

    const piped = Object(_pipe_js__WEBPACK_IMPORTED_MODULE_1__[/* Pipe */ "a"])(
        _to_plain_text_js__WEBPACK_IMPORTED_MODULE_2__[/* ToPlainText */ "a"],
        Object(_to_split_js__WEBPACK_IMPORTED_MODULE_3__[/* ToSplit */ "a"])(','),
        Object(_to_map_js__WEBPACK_IMPORTED_MODULE_4__[/* ToMap */ "a"])(trim)
    )(result)

    return piped
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToPlainText; });
/* harmony import */ var _t_monad_update_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _pipe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _stop_if_invalid_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _from_uri_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var _from_entities_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);








function ToPlainText(value) {
    let result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_1__[/* TMonad */ "a"])(value)

    if (result.stop) { return result }

    if (result.type !== 'string') {
        result = Object(_pipe_js__WEBPACK_IMPORTED_MODULE_2__[/* Pipe */ "a"])(
            _to_string_js__WEBPACK_IMPORTED_MODULE_3__[/* ToString */ "a"],
            _stop_if_invalid_js__WEBPACK_IMPORTED_MODULE_4__[/* StopIfInvalid */ "a"],
            _from_uri_component_js__WEBPACK_IMPORTED_MODULE_5__[/* FromURIComponent */ "a"],
            _from_entities_js__WEBPACK_IMPORTED_MODULE_6__[/* FromEntities */ "a"]
        )(result)
    } else {
        result = Object(_pipe_js__WEBPACK_IMPORTED_MODULE_2__[/* Pipe */ "a"])(
            _from_uri_component_js__WEBPACK_IMPORTED_MODULE_5__[/* FromURIComponent */ "a"],
            _from_entities_js__WEBPACK_IMPORTED_MODULE_6__[/* FromEntities */ "a"]
        )(result)
    }

    return Object(_t_monad_update_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonadUpdate */ "a"])(result, 'string', 'ToPlainText')
}

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetStyleRules; });
function SetStyleRules(styleElement, ruleString) {
    if (!styleElement || ruleString === undefined || ruleString === null || ruleString === 'undefined' || ruleString === 'null') { return }

    if (styleElement.styleSheet) {   // IE
        styleElement.styleSheet.cssText = ''.concat(styleElement.styleSheet.cssText ? styleElement.styleSheet.cssText : '', ruleString)
    } else {                // the world
        styleElement.innerHTML = ''
        var tt1 = document.createTextNode(ruleString)
        styleElement.appendChild(tt1)
    }
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DispatchEvent; });
function DispatchEvent(element, name, data) {
    let event

    if (typeof (Event) === 'function') {
        event = new CustomEvent(name, { detail: data })
    } else {
        event = document.createEvent('Event')
        event.initEvent(name, true, true)
    }

    element.dispatchEvent(event)
}

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToNumber; });
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _is_empty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);




function ToNumber(value) {
    const result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(value)

    if (result.stop) { return result }

    if (result.type === 'string' && !Object(_is_empty_js__WEBPACK_IMPORTED_MODULE_1__[/* IsEmpty */ "a"])(result.value)) {
        result.value = parseFloat(result.value)
    }

    result.type = Object(_type_js__WEBPACK_IMPORTED_MODULE_2__[/* Type */ "a"])(result.value)
    result.valid = !isNaN(result.value)

    return result
}

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObserverUnsubscribe; });
/* harmony import */ var _is_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var _is_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);



/**
 * Looks for subscriptions in an object, DOM element or a subscription itself and unsubscribes.
 * @function ObserverUnsubscribe
 * @param {Object|HTMLElement|function()} subscription - An element that has or is a observer subscription. If is a DOM element, must be under 'subscriptions' or 'eventSubscriptions' properties
 * @return {void}
 */

function ObserverUnsubscribe(subscription) {
    if (!subscription) { return }

    if (typeof subscription === 'function') {
        return subscription()
    }

    function subscriptionEach(current) {
        return typeof current === 'function' ? current() : undefined
    }

    function subscriptionKeysEach(key) {
        return function subscriptionKeysEachInner(current) {
            return typeof subscription[key][current] === 'function' ? subscription[key][current]() : undefined
        }
    }

    function subscriptionObjectKeysEach(current) {
        return typeof subscription[current] === 'function' ? subscription[current]() : undefined
    }

    if (Array.isArray(subscription)) {
        return subscription.forEach(subscriptionEach)
    }

    if (Object(_is_dom_js__WEBPACK_IMPORTED_MODULE_0__[/* IsDom */ "a"])(subscription)) {
        const key = subscription.eventSubscriptions ? 'eventSubscriptions' : 'subscriptions'

        if (!subscription[key]) { return }

        const _subscriptionKeysEach = subscriptionKeysEach(key)

        return Object.keys(subscription[key]).forEach(_subscriptionKeysEach)
    }

    if (Object(_is_object_js__WEBPACK_IMPORTED_MODULE_1__[/* IsObject */ "a"])(subscription)) {
        Object.keys(subscription).forEach(subscriptionObjectKeysEach)
    }
}

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FromJSON; });
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _from_uri_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);




function FromJSON(value) {
    const result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(value)

    if (result.stop) { return result }

    try {
        result.value = JSON.parse(Object(_from_uri_component_js__WEBPACK_IMPORTED_MODULE_1__[/* FromURIComponent */ "a"])(result.value).value)
        result.valid = true
    } catch (error) {
        result.valid = false
    }

    result.type = Object(_type_js__WEBPACK_IMPORTED_MODULE_2__[/* Type */ "a"])(result.value)

    if (['object', 'array'].indexOf(result.type) > -1) {
        result.valid = true
    }

    return result
}

/* harmony default export */ __webpack_exports__["b"] = (FromJSON);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DoURI; });
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



function DoURI(value, encode, component) {
    const result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(value)

    if (result.stop) { return result }

    try {
        if (encode) {
            if (component) {
                result.value = encodeURIComponent(result.value)
            } else {
                result.value = encodeURI(result.value)
            }
        } else {
            if (component) {
                result.value = decodeURIComponent(result.value)
            } else {
                result.value = decodeURI(result.value)
            }
        }
    } catch (error) {
        result.valid = false
    }

    result.type = Object(_type_js__WEBPACK_IMPORTED_MODULE_1__[/* Type */ "a"])(result.value)
    return result
}

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IsDate; });
/**
 * Determines if a value is or can be a valid date
 * @function IsDate
 * @param {any} value - The value to test
 * @return (boolean) If the value is a valid date
 * @example 
 * IsDate('Mon Nov 18 2019 07:41:48 GMT-0800').value // true
 * IsDate('Not a date').value // false
 */

function IsDate(value) {
    let tempValue = new Date(Date.parse(value))

    return (
        tempValue !== 'Invalid Date'
        && !isNaN(tempValue)
        && tempValue instanceof Date
    )
}

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IsTMonad; });
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _is_empty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _is_object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);




/**
 * Determines if a value is a TMonad
 * @function IsTMonad
 * @param {any} value - The value to test
 * @return {boolean} Whether or not the value is a TMonad
 * @example
 * IsTMonad({}) // false
 * IsTMonad([]) // false
 * IsTMonad('') // false
 * IsTMonad({
 *      value:'',
 *      valid: true,
 *      type: 'string'
 * }) // true
 */

function IsTMonad(value) {
    if (Object(_is_empty_js__WEBPACK_IMPORTED_MODULE_1__[/* IsEmpty */ "a"])(value) || !Object(_is_object_js__WEBPACK_IMPORTED_MODULE_2__[/* IsObject */ "a"])(value)) {
        return false
    }

    const keysItShouldHave = [{
        key: 'valid',
        type: 'boolean'
    }, {
        key: 'type',
        type: 'string'
    }, {
        key: 'value',
    }]

    let loopIndex = keysItShouldHave.length
    let count = 0

    while (loopIndex--) {
        if (Object.prototype.hasOwnProperty.call(value, keysItShouldHave[loopIndex].key) && (!keysItShouldHave[loopIndex].type || Object(_type_js__WEBPACK_IMPORTED_MODULE_0__[/* Type */ "a"])(value[keysItShouldHave[loopIndex].key]) === keysItShouldHave[loopIndex].type)) {
            count = count + 1
        }
    }

    return keysItShouldHave.length === count
}

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObserveExists; });
/* harmony import */ var _observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _observer_empty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var _get_parent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);




function ObserveExists(element) {
    if (!element) { return Object(_observer_empty_js__WEBPACK_IMPORTED_MODULE_1__[/* ObserverReturnEmpty */ "a"])() }

    if (element.exists$ && !element.exists$.isComplete) {
        return element.exists$
    }

    element.exists$ = Object(_observer_js__WEBPACK_IMPORTED_MODULE_0__[/* Observer */ "a"])(!!Object(_get_parent_js__WEBPACK_IMPORTED_MODULE_2__[/* GetParent */ "a"])(element))

    return element.exists$
}

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObserverReturnEmpty; });
/* harmony import */ var _observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _services_on_next_frame_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



function ObserverReturnEmpty() {
    const _observer = Object(_observer_js__WEBPACK_IMPORTED_MODULE_0__[/* Observer */ "a"])(false)

    Object(_services_on_next_frame_js__WEBPACK_IMPORTED_MODULE_1__[/* OnNextFrame */ "a"])(function returnEmptyNext() {
        _observer.next(false)
        _observer.complete()
    })

    return _observer
}

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadOnReady; });
function LoadOnReady(Class) {
    if (window.builtready) {
        window.BuiltCreateComponent(Class)
    } else {
        window.document.addEventListener('builtready', function () {
            window.BuiltCreateComponent(Class)
        })
    }
}

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Filter; });
/* harmony import */ var _for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


function Filter(conditionFunction, collection, reverseOrder) {
    const result = []

    Object(_for_each__WEBPACK_IMPORTED_MODULE_0__[/* ForEach */ "a"])(
        function FilterInner(item) {
            if (conditionFunction(item)) {
                result.push(item)
            }
        },
        collection,
        reverseOrder
    )

    return result
}

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObserveEvent; });
/* harmony import */ var _observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _observe_exists_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40);
/* harmony import */ var _object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




function ObserveEvent(element, eventName, options) {
    if (!element || !eventName) { return }

    options = options ? options : {}

    let isRunning = false
    let disposeTimer = setTimeout(function () { })

    options = Object(_object_assign_js__WEBPACK_IMPORTED_MODULE_2__[/* ObjectAssign */ "a"])({}, {
        preventDefault: false,
        stopPropagation: false,
        useCapture: true
    }, options)

    function isWindow() {
        return element &&
            element.document &&
            element.location &&
            element.alert &&
            element.setInterval
    }

    function startup() {
        if (isRunning) { return }
        isRunning = true
        try {
            element.addEventListener(eventName, eventHandler, options.useCapture)
        } catch (error) { }
    }

    const observer = Object(_observer_js__WEBPACK_IMPORTED_MODULE_0__[/* Observer */ "a"])(undefined, undefined, startup)

    function eventHandler(event) {
        if (!observer || !observer.subscriptions || Object.keys(observer.subscriptions).length === 0) { return shutDown() }
        if (options.preventDefault) { event.preventDefault() }
        if (options.stopPropagation) { event.stopPropagation() }

        observer.next(event)
    }

    function shutDown() {
        try { element.removeEventListener(eventName, eventHandler, options.useCapture) } catch (error) { }
        isRunning = false
    }

    function dispose() {
        shutDown()

        disposeTimer = setTimeout(function () {
            observer.complete()
            try { exists() } catch (error) { }
        }, 1000)
    }

    function subFn(exists) {
        clearTimeout(disposeTimer)

        if (!exists) {
            dispose()
        } else {
            startup()
        }
    }

    const exists = isWindow() ? function () { } : Object(_observe_exists_js__WEBPACK_IMPORTED_MODULE_1__[/* ObserveExists */ "a"])(element).subscribe(subFn)

    return observer
}

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToSplitMeta; });
/* harmony import */ var _to_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);


function is(v) { return !!v }

function ToSplitMeta(string, delimeter) {
    delimeter = delimeter ? delimeter : ''

    let match
    const arr = []
    const result = {
        value: string,
        stringChanges: []
    }

    try {
        if (!string || (!delimeter && delimeter !== '')) { return result }

        delimeter = Object(_to_regex_js__WEBPACK_IMPORTED_MODULE_0__[/* ToRegex */ "a"])(delimeter).value

        let str = result.value ? result.value.toString() : ''

        if (delimeter.toString() === '/(?:)/') {
            return {
                value: str.split(''),
                stringChanges: []
            }
        }

        while ((match = Object(_to_regex_js__WEBPACK_IMPORTED_MODULE_0__[/* ToRegex */ "a"])(delimeter).value.exec(str)) !== null) {
            const length = match.toString().length
            const matched = {
                start: match.index,
                end: match.index + length,
                input: match.input,
                length: length,
                result: [],
                removed: match[0]
            }

            const first = matched.start !== 0 ? str.slice(0, matched.start) : ''
            const second = str.slice(matched.end)

            matched.result = [first, second]
            result.stringChanges.push(matched)
            arr.push(first)
            str = second
        }

        arr.push(str)
        result.value = arr.filter(is)

    } catch (error) { }

    return result
}

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToTrim; });
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);



function ToTrim(value) {
    let stop = Object(_get_js__WEBPACK_IMPORTED_MODULE_0__[/* Get */ "a"])(value, 'stop', false)

    if (stop) {
        return Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_1__[/* TMonad */ "a"])(value)
    }

    let result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_1__[/* TMonad */ "a"])(value)

    try {
        result.value = result.value.trim()
    } catch (error) { }

    return result
}

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mapper; });
/* harmony import */ var _for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


/**
 * Performs a provided mapping operation to a provided collection. Intended to be used inconjunction with a transducer.
 * @function Map
 * @param {function() } mapFunction - The function to be called on every element, performs the mapping operation
 * @param {any[]} collection - The collection to iterate over
 * @return {any[]} Mapped collection
 * @example
 * Map(v=>v.toLowerCase(), ['A', 'B']) // ['a', 'b']
 * TODO - be able to take an object, Set, Weak map, etc
 */
function Mapper(mapFunction, collection) {
    const result = []

    Object(_for_each__WEBPACK_IMPORTED_MODULE_0__[/* ForEach */ "a"])(
        function MapInner(item) { result.push(mapFunction(item)) },
        collection
    )

    return result
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToFilter; });
/* harmony import */ var _t_monad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _stop_if_invalid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _to_array_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var _pipe_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var _t_monad_update_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);






function ToFilter(predicate) {
    return function (value) {
        let result = Object(_t_monad_js__WEBPACK_IMPORTED_MODULE_0__[/* TMonad */ "a"])(value)

        if (result.stop) { return result }

        function filter(v) {
            v.value = v.value.filter(predicate)
            return v
        }

        return Object(_t_monad_update_js__WEBPACK_IMPORTED_MODULE_4__[/* TMonadUpdate */ "a"])(Object(_pipe_js__WEBPACK_IMPORTED_MODULE_3__[/* Pipe */ "a"])(
            _to_array_js__WEBPACK_IMPORTED_MODULE_2__[/* ToArray */ "a"],
            _stop_if_invalid_js__WEBPACK_IMPORTED_MODULE_1__[/* StopIfInvalid */ "a"],
            filter
        )(result), 'array', 'Filter')
    }
}

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppendStyleElement; });
/* harmony import */ var _set_style_rules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _create_element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);



/**
 * Appends a style element with the provided rules to a provided element
 * @function AppendStyleElement
 * @param {string} rulesString - The rules to add to the style element
 * @param {HTMLElement} parent - The element to append to
 * @param {string} name - Optional. A name to give the style element
 * @example
 * AppendStyleElement('.selector { color: black;}', document.head, 'dark-text-n-stuff')
 */


function AppendStyleElement(rulesString, parent, name, classes) {
    if (!parent) { return }

    rulesString = rulesString ? rulesString : ''

    /** First create and add the style element */
    const style = Object(_create_element_js__WEBPACK_IMPORTED_MODULE_1__[/* CreateElement */ "a"])({
        tagName: 'style',
        type: 'text/css',
        style: 'display:none;',
        class: classes,
        name: name,
    }, true)

    parent.appendChild(style)

    /** Then set the rules */
    Object(_set_style_rules_js__WEBPACK_IMPORTED_MODULE_0__[/* SetStyleRules */ "a"])(style, rulesString)

    return style
}

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentClassProperty; });
/* harmony import */ var _utils_pipe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_commas_to_array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* harmony import */ var _utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _utils_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _utils_to_split_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var _utils_to_map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var _utils_to_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(49);








function trim(el) {
    return el.trim()
}

function is(el) {
    return !!el
}

function wcClass(el, newClasses, previousClasses) {
    if (!el) { return }

    if (Array.isArray(el)) {
        el = el[0]
    }

    let oldBrowser = !window.DOMTokenList.prototype.replace
    let newClassArray = Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_0__[/* Pipe */ "a"])(_utils_commas_to_array_js__WEBPACK_IMPORTED_MODULE_1__[/* CommasToArray */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_2__[/* IfInvalid */ "a"])([]))(newClasses).value
    let previousClassArray = Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_0__[/* Pipe */ "a"])(_utils_commas_to_array_js__WEBPACK_IMPORTED_MODULE_1__[/* CommasToArray */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_2__[/* IfInvalid */ "a"])([]))(previousClasses).value

    function previousClassArrayEach(c) {
        el.className = el
            .className
            .split(c)
            .map(trim)
            .join('')
    }

    function newClassArrayEach(c) {
        el.className = ''.concat(el.className ? el.className : '', ' ', c)
    }

    if (oldBrowser) {
        if (previousClassArray.length && !!el.className) {
            previousClassArray.forEach(previousClassArrayEach)
        }

        if (newClassArray.length) {
            newClassArray.forEach(newClassArrayEach)
        }

        return
    }

    if (previousClassArray.length) {
        el.classList.remove.apply(el.classList, previousClassArray)
    }

    if (newClassArray.length) {
        el.classList.add.apply(el.classList, newClassArray)
    }
}


const ComponentClassProperty = {
    format: function (val) {
        return Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_0__[/* Pipe */ "a"])(_utils_to_string_js__WEBPACK_IMPORTED_MODULE_3__[/* ToString */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_2__[/* IfInvalid */ "a"])(''), Object(_utils_to_split_js__WEBPACK_IMPORTED_MODULE_4__[/* ToSplit */ "a"])(' '), Object(_utils_to_map_js__WEBPACK_IMPORTED_MODULE_5__[/* ToMap */ "a"])(trim), Object(_utils_to_filter_js__WEBPACK_IMPORTED_MODULE_6__[/* ToFilter */ "a"])(is))(val).value
    },
    onChange: function (val, host) {
        return wcClass(host.elements.root, val, host.state.class.previous)
    }
}

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Equals; });
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _is_non_collection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);



function Equals(value1, value2) {
    const type = Object(_type_js__WEBPACK_IMPORTED_MODULE_0__[/* Type */ "a"])(value1)

    if (Object(_type_js__WEBPACK_IMPORTED_MODULE_0__[/* Type */ "a"])(value2) !== type) { return false }

    if (Object(_is_non_collection_js__WEBPACK_IMPORTED_MODULE_1__[/* IsNonCollection */ "a"])(value1)) {
        return value2 === value1
    }

    if (type === 'boolean' && value1 !== value2) {
        return false
    }

    if (type === 'array' && value1.length !== value2.length) {
        return false
    }

    if (type === 'object' && Object.keys(value1).length !== Object.keys(value2).length) {
        return false
    }

    if (type === 'object' && value1.constructor !== value2.constructor) {
        return false
    }

    if (type === 'date') {
        let d = value1 === value2

        try {
            d = new Date(value1).getTime() === new Date(value2).getTime()
        } catch (error) { }
        return d
    }

    if (type === 'dom') {
        return value1.isEqualNode(value2)
    }

    // Start walking

    if (type === 'array') {
        let len = value1.length

        while (len--) {
            if (!Equals(value1[len], value2[len])) {
                return false
            }
        }
    }

    if (type === 'object') {
        const keys = Object.keys(value1)
        let len = keys.length

        while (len--) {
            if (!Equals(value1[keys[len]], value2[keys[len]])) {
                return false
            }
        }
    }

    return true
}

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FindFirst; });
function FindFirst(conditionFn, collection, reverseOrder) {
    if (!collection) { return }

    let index = collection.length
    const count = index

    while (count && index) {
        const item = collection[reverseOrder ? count - (count - index) : count - index]
        if (conditionFn(item)) {
            return item
        }

        index = index - 1
    }
}

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObserveChildren; });
/* harmony import */ var _observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _observer_empty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var _array_from_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27);
/* harmony import */ var _for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43);






function notEmptyText(child) { return !(child.nodeName === '#text' && !(/\S/gm.test(child.textContent))) }

function ObserveChildren(element, ignoreEmptyText) {
    if (!element) { return Object(_observer_empty_js__WEBPACK_IMPORTED_MODULE_1__[/* ObserverReturnEmpty */ "a"])() }

    function removedNodes(nodes) {
        if (!nodes.length) { return }
        children$.removeElements(nodes)
        children$.trigger('removedNodes', nodes)
    }

    function addedNodes(nodes) {
        if (!nodes.length) { return }
        children$.insertAll(nodes)
        children$.trigger('addedNodes', nodes)
    }

    function childMutation(mutation) {
        if (ignoreEmptyText) {
            removedNodes(Object(_filter_js__WEBPACK_IMPORTED_MODULE_4__[/* Filter */ "a"])(notEmptyText, mutation.removedNodes))
            addedNodes(Object(_filter_js__WEBPACK_IMPORTED_MODULE_4__[/* Filter */ "a"])(notEmptyText, mutation.addedNodes))
            return
        }

        removedNodes(Object(_array_from_js__WEBPACK_IMPORTED_MODULE_2__[/* ArrayFrom */ "a"])(mutation.removedNodes))
        addedNodes(Object(_array_from_js__WEBPACK_IMPORTED_MODULE_2__[/* ArrayFrom */ "a"])(mutation.addedNodes))
    }

    function childMutations(mutations) {
        return Object(_for_each_js__WEBPACK_IMPORTED_MODULE_3__[/* ForEach */ "a"])(childMutation, mutations)
    }

    const childObserver = new MutationObserver(childMutations)
    const children$ = Object(_observer_js__WEBPACK_IMPORTED_MODULE_0__[/* Observer */ "a"])([])

    childMutation({ addedNodes: element.childNodes })

    childObserver.observe(element, { childList: true })

    children$.subscribe(
        function () { },
        function () { },
        function () { childObserver.disconnect() }
    )

    return children$
}

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return nativeSupport; });
const nativeSupport = 'content' in document.createElement('template') && // templates
    !!window.customElements && // custom elements
    'attachShadow' in Element.prototype && // shadow
    'getRootNode' in Element.prototype // shadow

/***/ }),
/* 56 */,
/* 57 */,
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AjaxForm", function() { return AjaxForm; });
/* harmony import */ var _utils_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _utils_pipe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _utils_to_bool_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);
/* harmony import */ var _utils_to_number_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(34);
/* harmony import */ var _utils_observe_event_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(44);
/* harmony import */ var _utils_when_available_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17);
/* harmony import */ var _utils_create_element_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(20);
/* harmony import */ var _services_on_next_frame_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7);
/* harmony import */ var _utils_observer_unsubscribe_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(35);
/* harmony import */ var _utils_dispatch_event_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(33);
/* harmony import */ var _utils_array_from_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(27);
/* harmony import */ var _component_build_load_on_ready_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(42);
/* harmony import */ var _utils_for_each_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5);















const defaultWidth = 400
const template = __webpack_require__(61)
const componentName = 'ajax-form'
const outerStyle = __webpack_require__(62).toString()

function setAttribute(host, val, name, elKey) {
    return Object(_utils_when_available_js__WEBPACK_IMPORTED_MODULE_6__[/* WhenAvailable */ "a"])(host, 'elements.' + elKey)
        .then(function ElReady(el) {
            return el[val ? 'setAttribute' : 'removeAttribute'](name, val)
        })
        .catch(function () { })
}

function submitForm(host) {
    return Object(_utils_dispatch_event_js__WEBPACK_IMPORTED_MODULE_10__[/* DispatchEvent */ "a"])(host.elements.form, 'submit')
}

function getFormData(host) {
    const newForm = Object(_utils_create_element_js__WEBPACK_IMPORTED_MODULE_7__[/* CreateElement */ "a"])({
        tagName: 'form',
        action: host.action,
        method: host.method,
        name: host.name,
        style: 'position:fixed;top:0;left:0;pointer-events:none;opacity:0;'
    })

    Object(_utils_array_from_js__WEBPACK_IMPORTED_MODULE_11__[/* ArrayFrom */ "a"])(host.querySelectorAll('input')).forEach(
        function inputForeach(input) {
            return newForm.appendChild(
                Object(_utils_create_element_js__WEBPACK_IMPORTED_MODULE_7__[/* CreateElement */ "a"])({
                    tagName: 'input',
                    autocomplete: input.autocomplete,
                    value: input.value,
                    type: input.type,
                    name: input.name || input.autocomplete || input.type
                })
            )
        })

    document.body.appendChild(newForm)

    const data = {}
    const formData = new FormData(newForm)

    formData.forEach(function formDataForEach(value, key) { data[key] = value })
    Object(_utils_dispatch_event_js__WEBPACK_IMPORTED_MODULE_10__[/* DispatchEvent */ "a"])(host, 'submitdata', data)
    Object(_services_on_next_frame_js__WEBPACK_IMPORTED_MODULE_8__[/* OnNextFrame */ "a"])(function getFormDataNext() { document.body.removeChild(newForm) })
}

const elements = {
    root: { selector: '.' + componentName + '-container' },
    grid: { selector: '.' + componentName + '-grid' },
    buttonGrid: { selector: '.' + componentName + '-grid-buttons' },
    form: {
        selector: '.' + componentName + '-form',
        onChange: function (el, host) {
            el.eventSubscriptions = {
                submit: Object(_utils_observe_event_js__WEBPACK_IMPORTED_MODULE_5__[/* ObserveEvent */ "a"])(el, 'submit', { preventDefault: true })
                    .subscribe(function submitSubscription(e) {
                        e.preventDefault()
                        getFormData(host)
                    })
            }
        }
    }
}

const properties = {
    action: {
        format: function (val) { return Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_2__[/* Pipe */ "a"])(_utils_to_string_js__WEBPACK_IMPORTED_MODULE_0__[/* ToString */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_1__[/* IfInvalid */ "a"])('/'))(val).value },
        onChange: function (val, host) { return setAttribute(host, val, 'action', 'form') }
    },
    method: {
        format: function (val) {
            return Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_2__[/* Pipe */ "a"])(_utils_to_string_js__WEBPACK_IMPORTED_MODULE_0__[/* ToString */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_1__[/* IfInvalid */ "a"])('POST'))(val).value
        },
        onChange: function (val, host) {
            return setAttribute(host, val, 'method', 'form')
        }
    },
    name: {
        format: function (val) {
            return Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_2__[/* Pipe */ "a"])(_utils_to_string_js__WEBPACK_IMPORTED_MODULE_0__[/* ToString */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_1__[/* IfInvalid */ "a"])(null))(val).value
        },
        onChange: function (val, host) {
            return setAttribute(host, val, 'name', 'form')
        }
    },
    request: {
        format: function (val) {
            return Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_2__[/* Pipe */ "a"])(_utils_to_bool_js__WEBPACK_IMPORTED_MODULE_3__[/* ToBool */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_1__[/* IfInvalid */ "a"])(false))(val).value
        }
    },

    reload: {
        format: function (val) { return Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_2__[/* Pipe */ "a"])(_utils_to_bool_js__WEBPACK_IMPORTED_MODULE_3__[/* ToBool */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_1__[/* IfInvalid */ "a"])(false))(val).value }
    },
    contenttype: {
        format: function (val) {
            return Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_2__[/* Pipe */ "a"])(_utils_to_string_js__WEBPACK_IMPORTED_MODULE_0__[/* ToString */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_1__[/* IfInvalid */ "a"])('application/json'))(val).value
        }
    },
    columnwidth: {
        format: function (val) { return val === '100%' ? val : Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_2__[/* Pipe */ "a"])(_utils_to_number_js__WEBPACK_IMPORTED_MODULE_4__[/* ToNumber */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_1__[/* IfInvalid */ "a"])(defaultWidth))(val).value },
        onChange: function (val, host) {
            return setAttribute(host, val, 'columnwidth', 'grid')
        }
    },
    mincolumnwidth: {
        format: function (val) { return Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_2__[/* Pipe */ "a"])(_utils_to_number_js__WEBPACK_IMPORTED_MODULE_4__[/* ToNumber */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_1__[/* IfInvalid */ "a"])(300))(val).value },
        onChange: function (val, host) {
            return setAttribute(host, val, 'minwidth', 'grid')
        }
    },
    buttonscolumnwidth: {
        format: function (val) { return val === '100%' ? val : Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_2__[/* Pipe */ "a"])(_utils_to_number_js__WEBPACK_IMPORTED_MODULE_4__[/* ToNumber */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_1__[/* IfInvalid */ "a"])(50))(val).value },
        onChange: function (val, host) {
            return setAttribute(host, val, 'columnwidth', 'buttonGrid')
        }
    },
    buttonsmincolumnwidth: {
        format: function (val) { return Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_2__[/* Pipe */ "a"])(_utils_to_number_js__WEBPACK_IMPORTED_MODULE_4__[/* ToNumber */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_1__[/* IfInvalid */ "a"])(50))(val).value },
        onChange: function (val, host) {
            return setAttribute(host, val, 'minwidth', 'buttonGrid')
        }
    },
    gap: {
        format: function (val) { return val },
        onChange: function (val, host) {
            return setAttribute(host, val, 'gap', 'grid')
        }
    },
    buttonsgap: {
        format: function (val) { return val },
        onChange: function (val, host) {
            return setAttribute(host, val, 'gap', 'buttonGrid')
        }
    }
}

function addItem(host) {
    return function addItemInner(node) {
        const isSubmit = node.type === 'submit'

        if (!node.eventSubscriptions) { node.eventSubscriptions = {} }

        if (isSubmit) {
            node.eventSubscriptions = {
                click: Object(_utils_observe_event_js__WEBPACK_IMPORTED_MODULE_5__[/* ObserveEvent */ "a"])(node, 'click').subscribe(function () {
                    return submitForm(host)
                })
            }
        } else {
            node.eventSubscriptions = { done: Object(_utils_observe_event_js__WEBPACK_IMPORTED_MODULE_5__[/* ObserveEvent */ "a"])(node, 'done').subscribe(function () { return submitForm(host) }) }
        }
    }
}

const AjaxForm = {
    componentName: componentName,
    template: template,
    outerStyle: outerStyle,
    properties: properties,
    elements: elements,
    observeChildren: true,
    methods: { addItem: addItem },
    onConnected: function (host) {
        host.eventSubscriptions.addedChildren = host.children$.on('addedNodes', function (addedNodes) {
            if (!addedNodes.length) { return }
            Object(_utils_for_each_js__WEBPACK_IMPORTED_MODULE_13__[/* ForEach */ "a"])(host.addItem, addedNodes)
        })

        host.eventSubscriptions.removedNodes = host.children$.on('removedNodes', function (removedNodes) {
            if (!removedNodes.length) { return }
            Object(_utils_for_each_js__WEBPACK_IMPORTED_MODULE_13__[/* ForEach */ "a"])(_utils_observer_unsubscribe_js__WEBPACK_IMPORTED_MODULE_9__[/* ObserverUnsubscribe */ "a"], removedNodes)
        })
    }
}

Object(_component_build_load_on_ready_js__WEBPACK_IMPORTED_MODULE_12__[/* LoadOnReady */ "a"])(AjaxForm)



/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonElement", function() { return ButtonElement; });
/* harmony import */ var _utils_to_bool_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _utils_pipe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _utils_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _utils_when_available_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var _utils_create_element_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony import */ var _component_build_load_on_ready_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(42);








const name = 'button-element'

const properties = {
    name: {
        format: function (val, host) { return Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_1__[/* Pipe */ "a"])(_utils_to_string_js__WEBPACK_IMPORTED_MODULE_2__[/* ToString */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_3__[/* IfInvalid */ "a"])(host.textContent.trim()))(val).value },
        onChange: function (val, host) {
            return Object(_utils_when_available_js__WEBPACK_IMPORTED_MODULE_4__[/* WhenAvailable */ "a"])(host, 'elements.button')
                .then(function btnReady(btn) {
                    btn.setAttribute('name', val)
                })
                .catch(function () { })
        }
    },
    disabled: {
        format: function (val) { return Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_1__[/* Pipe */ "a"])(_utils_to_bool_js__WEBPACK_IMPORTED_MODULE_0__[/* ToBool */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_3__[/* IfInvalid */ "a"])(false))(val).value },
        onChange: function (val, host) {
            return Object(_utils_when_available_js__WEBPACK_IMPORTED_MODULE_4__[/* WhenAvailable */ "a"])(host, 'elements.root')
                .then(function rootReady(root) {
                    root.classList[val ? 'add' : 'remove']('disabled')
                })
                .catch(function () { })
        }
    },
    type: {
        format: function (val) { return Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_1__[/* Pipe */ "a"])(_utils_to_string_js__WEBPACK_IMPORTED_MODULE_2__[/* ToString */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_3__[/* IfInvalid */ "a"])(null))(val).value },
        onChange: function (val, host) {
            return Object(_utils_when_available_js__WEBPACK_IMPORTED_MODULE_4__[/* WhenAvailable */ "a"])(host, 'elements.button')
                .then(function btnReady(btn) {
                    if (val) {
                        btn.setAttribute('type', 'submit')
                        btn.appendChild(Object(_utils_create_element_js__WEBPACK_IMPORTED_MODULE_5__[/* CreateElement */ "a"])({
                            tagName: 'input',
                            type: 'submit'
                        }))
                    } else {
                        btn.removeAttribute('type', 'submit')
                        try { btn.removeChild(btn.querySelector('input[type="submit"]')) } catch (error) { }
                    }
                })
                .catch(function () { })
        }
    }
}

const elements = {
    root: { selector: '.' + name + '-container', },
    button: { selector: '.' + name + '-container > button', }
}

const ButtonElement = {
    componentName: name,
    template: __webpack_require__(63),
    shadowStyle: __webpack_require__(64).toString(),
    outerStyle: __webpack_require__(65).toString(),
    observedAttributes: Object.keys(properties),
    properties: properties,
    elements: elements,
    onConnected: function (host) {
        host.setAttribute('ready', true)
    },
}

Object(_component_build_load_on_ready_js__WEBPACK_IMPORTED_MODULE_6__[/* LoadOnReady */ "a"])(ButtonElement)



/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

(function (global) {

    'use strict'

    var Promise, PENDING = {}, FULFILLED = {}, REJECTED = {}

    if (typeof global.Promise === 'function') {
        Promise = global.Promise
    } else {
        Promise = function (callback) {
            var fulfilledHandlers = [],
                rejectedHandlers = [],
                state = PENDING,

                result,
                dispatchHandlers,
                makeResolver,
                fulfil,
                reject,

                promise

            makeResolver = function (newState) {
                return function (value) {
                    if (state !== PENDING) {
                        return
                    }

                    result = value
                    state = newState

                    dispatchHandlers = makeDispatcher((state === FULFILLED ? fulfilledHandlers : rejectedHandlers), result)

                    // dispatch onFulfilled and onRejected handlers asynchronously
                    wait(dispatchHandlers)
                }
            }

            fulfil = makeResolver(FULFILLED)
            reject = makeResolver(REJECTED)

            callback(fulfil, reject)

            promise = {
                // `then()` returns a Promise - 2.2.7
                then: function (onFulfilled, onRejected) {
                    var promise2 = new Promise(function (fulfil, reject) {

                        var processResolutionHandler = function (handler, handlers, forward) {

                            // 2.2.1.1
                            if (typeof handler === 'function') {
                                handlers.push(function (p1result) {
                                    var x

                                    try {
                                        x = handler(p1result)
                                        resolve(promise2, x, fulfil, reject)
                                    } catch (err) {
                                        reject(err)
                                    }
                                })
                            } else {
                                // Forward the result of promise1 to promise2, if resolution handlers
                                // are not given
                                handlers.push(forward)
                            }
                        }

                        // 2.2
                        processResolutionHandler(onFulfilled, fulfilledHandlers, fulfil)
                        processResolutionHandler(onRejected, rejectedHandlers, reject)

                        if (state !== PENDING) {
                            // If the promise has resolved already, dispatch the appropriate handlers asynchronously
                            wait(dispatchHandlers)
                        }

                    })

                    return promise2
                }
            }

            promise['catch'] = function (onRejected) {
                return this.then(null, onRejected)
            }

            return promise
        }

        Promise.all = function (promises) {
            return new Promise(function (fulfil, reject) {
                var result = [], pending, i, processPromise

                if (!promises.length) {
                    fulfil(result)
                    return
                }

                processPromise = function (i) {
                    promises[i].then(function (value) {
                        result[i] = value

                        if (!--pending) {
                            fulfil(result)
                        }
                    }, reject)
                }

                pending = i = promises.length
                while (i--) {
                    processPromise(i)
                }
            })
        }

        Promise.race = function (promises) {
            return new Promise(function (fulfil, reject) {
                promises.forEach(function (promise) {
                    promise.then(fulfil, reject)
                })
            })
        }

        Promise.resolve = function (value) {
            return new Promise(function (fulfil) {
                fulfil(value)
            })
        }

        Promise.reject = function (reason) {
            return new Promise(function (fulfil, reject) {
                reject(reason)
            })
        }
    }

    // TODO use MutationObservers or something to simulate setImmediate
    function wait(callback) {
        setTimeout(callback, 0)
    }

    function makeDispatcher(handlers, result) {
        return function () {
            var handler = handlers.shift()

            while (handler) {
                handler(result)
                handler = handlers.shift()
            }
        }
    }

    function resolve(promise, x, fulfil, reject) {
        // Promise Resolution Procedure
        var then

        // 2.3.1
        if (x === promise) {
            throw new TypeError('A promise\'s fulfillment handler cannot return the same promise')
        }

        // 2.3.2
        if (x instanceof Promise) {
            x.then(fulfil, reject)
        }

        // 2.3.3
        else if (x && (typeof x === 'object' || typeof x === 'function')) {
            try {
                then = x.then // 2.3.3.1
            } catch (e) {
                reject(e) // 2.3.3.2
                return
            }

            // 2.3.3.3
            if (typeof then === 'function') {
                var called, resolvePromise, rejectPromise

                resolvePromise = function (y) {
                    if (called) {
                        return
                    }
                    called = true
                    resolve(promise, y, fulfil, reject)
                }

                rejectPromise = function (r) {
                    if (called) {
                        return
                    }
                    called = true
                    reject(r)
                }

                try {
                    then.call(x, resolvePromise, rejectPromise)
                } catch (e) {
                    if (!called) { // 2.3.3.3.4.1
                        reject(e) // 2.3.3.3.4.2
                        called = true
                        return
                    }
                }
            }

            else {
                fulfil(x)
            }
        }

        else {
            fulfil(x)
        }
    }



    // export as node module
    if ( true && module.exports) {
        module.exports = Promise
    }

    // or as AMD module
    else if ( true && window.define.amd) {
        window.define(function () { return Promise })
    }

    global.Promise = Promise

}(typeof window !== 'undefined' ? window : this))

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = "<div class=ajax-form-container> <form class=ajax-form-form> <grid-layout class=ajax-form-grid> <slot name=ajax-form-item slot=grid-layout-item></slot> </grid-layout> <grid-layout class=ajax-form-grid-buttons> <slot name=ajax-form-button slot=grid-layout-item></slot> </grid-layout> </form> </div> ";

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(48);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "ajax-form{font:inherit;line-height:inherit;display:block;position:relative;-webkit-transition:opacity 0.2s;transition:opacity 0.2s}ajax-form[ready=\"true\"]{opacity:1}ajax-form input-field,ajax-form input-bool,ajax-form input-select{width:100%}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = "<div class=button-element-container> <button> <slot></slot> </button> </div> ";

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(48);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".button-element-container{display:block;position:relative;margin:1.4em 0}.button-element-container.nomargin{margin:0}.button-element-container.slim button{padding:0.25em}.button-element-container.short button{padding:0.5em 1em}.button-element-container.nobackground button{background:transparent;background-color:transparent}.button-element-container.nobackground button:hover{background:transparent;background-color:transparent}.button-element-container.noshadow button{box-shadow:none}.button-element-container.noshadow button:hover{box-shadow:none}.button-element-container button{background:#fafafa;position:relative;border:none;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;margin:0px;width:auto;padding:1em 1.42em;font:inherit;color:inherit;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;box-sizing:border-box;text-overflow:ellipsis;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;box-shadow:inset 0px -2px 0px rgba(0,0,0,0.13),inset 0px 0px 0px 1px rgba(0,0,0,0.25);border-radius:2px;outline:0px !important;-webkit-transform:scale(1);transform:scale(1);white-space:nowrap;-webkit-transition:box-shadow 0.2s, color 0.4s, background-color 0.4s;transition:box-shadow 0.2s, color 0.4s, background-color 0.4s}.button-element-container button:hover{background-color:#fff;box-shadow:inset 0px -2px 0px rgba(0,0,0,0.13),inset 0px 0px 0px 1px rgba(0,0,0,0.25),0px 10px 9px -6px rgba(0,0,0,0.2)}.button-element-container button .btn-submit{position:absolute;width:100%;height:100%;background:none;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;opacity:0}.button-element-container button input{position:absolute;background:transparent;border:none;width:100%;height:100%;display:block;color:transparent;margin:0;padding:0;opacity:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.button-element-container.disabled{opacity:0.25;pointer-events:none}.button-element-container slot{pointer-events:none}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(48);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "button-element{opacity:0;font:inherit;line-height:inherit;display:inline-block;position:relative}button-element[ready=\"true\"]{opacity:1}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 66 */
/***/ (function(module, exports) {

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

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(68);


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/components/ajax-form/index.js
var ajax_form = __webpack_require__(58);

// EXTERNAL MODULE: ./src/components/button-element/index.js
var button_element = __webpack_require__(59);

// EXTERNAL MODULE: ./src/utils/pipe.js
var pipe = __webpack_require__(1);

// EXTERNAL MODULE: ./src/services/on-next-frame.js
var on_next_frame = __webpack_require__(7);

// EXTERNAL MODULE: ./src/utils/to-number.js
var to_number = __webpack_require__(34);

// EXTERNAL MODULE: ./src/utils/to-bool.js
var to_bool = __webpack_require__(24);

// EXTERNAL MODULE: ./src/utils/mapper.js
var utils_mapper = __webpack_require__(47);

// EXTERNAL MODULE: ./src/utils/for-each.js
var for_each = __webpack_require__(5);

// CONCATENATED MODULE: ./src/utils/transduce.js



function Transduce() {
    let results
    const piper = pipe["a" /* Pipe */].apply(null, arguments)

    return function (collection, initial, reducer) {
        results = initial || []

        Object(for_each["a" /* ForEach */])(function TransduceInner(item) {
            const result = piper(item, results)

            if (result === undefined) { return }

            if (typeof reducer === 'function') {
                results = reducer(results, result)
                return
            }

            results.push(result)

        }, collection)

        return results
    }
}

/*
function add(current){
    return 1 + current
}

function multiply(current){
    return 4 * current
}

function filter(current){
    return current > 10 ? current : undefined
}

function divide(current){
    if(current === undefined){return current}
    return current / 2
}

var t = Transduce(add, multiply, filter, divide)([1,2,3], 1, function(target, current){return target+current})

*/
// EXTERNAL MODULE: ./src/utils/set-style-rules.js
var set_style_rules = __webpack_require__(32);

// EXTERNAL MODULE: ./src/utils/if-invalid.js
var if_invalid = __webpack_require__(8);

// EXTERNAL MODULE: ./src/component-build/load-on-ready.js
var load_on_ready = __webpack_require__(42);

// EXTERNAL MODULE: ./src/utils/observer-unsubscribe.js
var observer_unsubscribe = __webpack_require__(35);

// EXTERNAL MODULE: ./src/utils/when-available.js
var when_available = __webpack_require__(17);

// EXTERNAL MODULE: ./src/component-build/native-support.js
var native_support = __webpack_require__(55);

// EXTERNAL MODULE: ./src/utils/filter.js
var utils_filter = __webpack_require__(43);

// EXTERNAL MODULE: ./src/utils/append-style-element.js
var append_style_element = __webpack_require__(50);

// CONCATENATED MODULE: ./src/components/grid-layout/index.js
















const style = '[name="grid-layout-item"] { display: flex; justify-items: center; grid-auto-flow: dense; width: 100%; flex-wrap: wrap; }'
const outerStyle = 'grid-layout { display: block; opacity: 0; transition: opacity 0.15s linear 0.15s; } grid-layout[viewable="true"] { opacity: 1; } [slot="grid-layout-item"]{box-sizing:border-box;}'
const template = __webpack_require__(70)
const componentName = 'grid-layout'
const defaultWidth = 240
const defaultGap = [16, 16]

function cancelTimer(host) { return host.timer ? host.timer.cancel() : undefined }

function getGap(host) {
    let gap = defaultGap

    function fromArray(val, isArray) {
        if (!isArray && !Array.isArray(val)) { val = [val, val] }

        gap = Object(utils_mapper["a" /* Mapper */])(function (val) { return parseFloat(val) }, val)

        if (gap.length === 1) { gap.push(gap[0]) }
    }

    if (typeof host.gap === 'string') {
        try {
            fromArray(JSON.parse(host.gap))
        } catch (error) {
            gap = Transduce(
                function (val) { return parseFloat(val.trim()) },
                function (val) { return val && !isNaN(val) ? val : undefined }
            )(host.gap.split(','))
        }

    } else if (Array.isArray(host.gap) && host.gap.length) {
        fromArray(host.gap, true)
    } else if (!isNaN(host.gap)) {
        gap = [host.gap, host.gap]
    }

    return gap
}

function setStyles(host, styleStrings) {
    // NON IE11
    if (native_support["a" /* nativeSupport */]) {
        Object(when_available["a" /* WhenAvailable */])(host, 'elements.theme').then(function (el) { Object(set_style_rules["a" /* SetStyleRules */])(el, styleStrings.both) })
        Object(set_style_rules["a" /* SetStyleRules */])(host.querySelector('style[name="grid-layout-outerStyle"]'), styleStrings.updatedOuterStyle)
        return
    }

    // IE11
    let styleEl = Object(utils_filter["a" /* Filter */])(function (child) {
        return child.nodeName.toLowerCase() === 'style' && child.getAttribute('class') === host.componentId + '-style'
    }, host.children)[0]

    if (!styleEl) {
        Object(append_style_element["a" /* AppendStyleElement */])(styleStrings.both, host, 'grid-layout-style-' + host.componentId, host.componentId + '-style')
    } else {
        Object(set_style_rules["a" /* SetStyleRules */])(styleEl, styleStrings.both)
    }
}

function getStyleStrings(host, gapMedian, columnGapPercent) {
    const updatedInnerStyle = style +
        ' [grid-id="' + host.componentId + '"] [name="grid-layout-item"]{' +
        'display:flex;' +
        'width:' + (100 + (gapMedian * 2)) + '%;' +
        'margin-left:-' + gapMedian + '%;' +
        '} ' + (host.theme || '')

    const slotStyles = 'min-width:' + columnGapPercent + '%;' +
        'padding:' + (gapMedian / 2) + '% ' + gapMedian + '%;' +
        'box-sizing:border-box;'

    const updatedOuterStyle = outerStyle +
        ' [grid-id="' + host.componentId + '"] [slot="grid-layout-item"],' +
        (native_support["a" /* nativeSupport */] ?
            ' [grid-id="' + host.componentId + '"] slot[slot="grid-layout-item"]::slotted(*)' :
            ' [grid-id="' + host.componentId + '"] [slotname="grid-layout-item"] > [slot="grid-layout-item"], [grid-id="' + host.componentId + '"] [slotname="grid-layout-item"] > [slot="grid-layout-item"] > [slot]'
        ) +
        '{' + slotStyles + '} ' +
        ' [grid-id="' + host.componentId + '"] slot[slot="grid-layout-item"],' +
        ' [grid-id="' + host.componentId + '"] [slotname="grid-layout-item"] > [slot="grid-layout-item"][slotname]{' +
        'width:100%;' +
        'padding:0;' +
        '} ' + (host.outertheme || '')

    return {
        updatedOuterStyle: updatedOuterStyle,
        both: updatedInnerStyle + updatedOuterStyle
    }
}

function setScale(host) {
    return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        const gap = getGap(host)
        let gapMedian = (gap[0] + gap[1]) / 2
        let columnwidth = Math.max(host.columnwidth || defaultWidth, host.minwidth)
        const contentWidth = host.elements.root.offsetWidth + gapMedian
        let columnGapPercent = 100 / Math.round(contentWidth / (gapMedian + columnwidth))
        const ratio = 1 - (gapMedian / columnwidth)

        if (columnwidth === '100%' || columnwidth >= contentWidth) {
            columnwidth = 100
            gapMedian = 0
        } else {
            if (columnGapPercent > 50) { columnGapPercent = 50 }
            columnwidth = columnGapPercent * ratio
            gapMedian = (columnGapPercent - columnwidth) / 2
        }

        setStyles(host, getStyleStrings(host, gapMedian, columnGapPercent))
    })
}

const grid_layout_elements = {
    root: {
        selector: '.' + componentName + '-container',
        onChange: function (el, host) { el.setAttribute('grid-id', host.componentId) }
    },
    itemsContainer: { selector: '[name="'.concat(componentName, '-items"]') },
}

function runScale(host) {
    cancelTimer(host)
    host.timer = setScale(host)
}

const properties = {
    columnwidth: {
        format: function (val) { return val === '100%' ? val : Object(pipe["a" /* Pipe */])(to_number["a" /* ToNumber */], Object(if_invalid["a" /* IfInvalid */])(defaultWidth))(val).value },
        onChange: function (_val, host) { runScale(host) }
    },
    minwidth: {
        format: function (val) { return Object(pipe["a" /* Pipe */])(to_number["a" /* ToNumber */], Object(if_invalid["a" /* IfInvalid */])(0))(val).value },
        onChange: function (_val, host) { runScale(host) }
    },
    gap: {
        format: function (val) { return val },
        onChange: function (_val, host) { runScale(host) }
    },
    watchhidden: { format: function (val) { return Object(pipe["a" /* Pipe */])(to_bool["a" /* ToBool */], Object(if_invalid["a" /* IfInvalid */])(true))(val).value } },
}

// function removeChild(host, el) {
//     if (el.container) {
//         const slot = el.slot
//         const item = Filter(function (element) {
//             return element.slot === slot
//         }, host.items$.value)[0]

//         host.items$.remove(item)
//         ObserverUnsubscribe(el)

//         if (el.container.parentElement) {
//             el.container.parentElement.removeChild(el.container)
//         }
//     }
// }

// function wrapChild(host, el) {
//     const id = ID()
//     const wrapper = CreateElement({ tagName: 'div', class: componentName + '-slot-wrapper grid-layout-item', id: id })

//     el.slot = id
//     el.container = wrapper
//     el.eventSubscriptions = el.eventSubscriptions ? el.eventSubscriptions : {}

//     if (el.fillrow === true || el.getAttribute('fillrow') === 'true') {
//         wrapper.style.width = '100%'
//     }

//     try { host.removeChild(el) } catch (error) { }

//     setTimeout(function () {
//         el.eventSubscriptions.gridLayoutExists = ObserveExists(el, true)
//             .subscribe(function elExistsCallback(exists) {
//                 if (!exists) { removeChild(host, el) }
//             })
//         el.eventSubscriptions.visible = ObserveVisibility(el).subscribe(function visibilityCallback(hidden) {
//             const currentlyHidden = el.container.classList.contains('hidden')
//             if (hidden !== currentlyHidden) {
//                 el.container.classList[hidden ? 'add' : 'remove']('hidden')
//             }
//         })
//     }, 0)

//     return el
// }

const GridLayout = {
    componentName: componentName,
    template: template,
    shadowStyle: style,
    outerStyle: outerStyle,
    observedAttributes: Object.keys(properties),
    properties: properties,
    elements: grid_layout_elements,
    observeChildren: true,
    computed: {
        items: function (host) {
            return {
                get: function () {
                    return host.items$.value
                }
            }
        }
    },
    methods: {
        clear: function clear(host) {
            return function clearInner() {
                console.log(host.children$)
                // ForEach(function (child) {
                //     removeChild(host, child)
                // }, host.items$.value, true)
            }
        }
    },
    onConnected: function (host) {
        host.setAttribute('grid-id', host.componentId)

        window.addEventListener('resize', function () { return runScale(host) })

        runScale(host)

        host.eventSubscriptions.addedChildren = host.children$.on('addedNodes', function (addedNodes) {
            if (!addedNodes.length) { return }
            Object(for_each["a" /* ForEach */])(host.addItem, addedNodes)
        })

        host.eventSubscriptions.removedNodes = host.children$.on('removedNodes', function (removedNodes) {
            if (!removedNodes.length) { return }
            Object(for_each["a" /* ForEach */])(observer_unsubscribe["a" /* ObserverUnsubscribe */], removedNodes)
        })

        Object(on_next_frame["a" /* OnNextFrame */])(function () { return host.setAttribute('viewable', true) })
    }
}

Object(load_on_ready["a" /* LoadOnReady */])(GridLayout)


// EXTERNAL MODULE: ./src/component-build/component-class-property.js
var component_class_property = __webpack_require__(51);

// CONCATENATED MODULE: ./src/services/benches.js
const programs = {}

const Benches = {
    add: function (key) {
        if (programs[key]) {
            return programs[key]
        }

        const now = performance.now()

        const programObject = {
            started: now,
            ended: now,
            time: 0,
            end: function () {
                programObject.ended = performance.now()
                programObject.time = programObject.ended - programObject.started
                return programObject
            }
        }

        if (programs[key]) {
            return programs[key]
        }

        programs[key] = programObject

        return programObject
    },
    end: function (key) {
        if (programs[key]) {
            programs[key].end()
            return programs[key]
        }
    },
    report: function () {
        Object.keys(programs).forEach(function (programKey) {
            console.log(programKey, 'Started: ' + programs[programKey].started, 'Duration: ' + programs[programKey].time + 'ms')
        })
    },
    average: function () {
        const keys = Object.keys(programs).filter(function (k) { return programs[k].time !== 0 })

        console.log('Average time:', keys.reduce(function (target, programKey) {
            return target + programs[programKey].time
        }, 0) / keys.length, 'Total:', keys.length)
    }
}

Object.defineProperty(Benches, 'programs', {
    get: function () { return programs }
})



// export function Benches(tests) {
//     // Warmup.
//     for (const test of tests) {
//         for (let i = 0; i < 10; ++i) {
//             test()
//         }
//     }

//     // Actual tests.
//     for (const test of tests) {
//         console.time(test.name)
//         test()
//         console.timeEnd(test.name)
//     }
// }


// EXTERNAL MODULE: ./src/utils/get.js
var get = __webpack_require__(2);

// CONCATENATED MODULE: ./src/utils/component-support.js
function ComponentSupport() {
    return 'content' in document.createElement('template') && // templates
        !!window.customElements && // custom elements
        'attachShadow' in Element.prototype && // shadow
        'getRootNode' in Element.prototype // shadow
}
// CONCATENATED MODULE: ./src/services/components.js





const nativeSupport = ComponentSupport()
const components = {}
let initialized = false

const Components = {
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
        function createEach() { Object(for_each["a" /* ForEach */])(asyncCreate, document.body.querySelectorAll(tag)) }
        setTimeout(createEach, 0)
    },

    init: function () {
        function handleAddedNode(node) {
            const tag = Object(get["a" /* Get */])(node, 'nodeName.toLowerCase()')

            if (tag && components[tag]) {
                Object(on_next_frame["a" /* OnNextFrame */])(function () {
                    components[tag].create(node)
                })
            }

            Object(for_each["a" /* ForEach */])(function handleAddedNodeChildren(child) {
                handleAddedNode(child)
            }, node.children)

            if (node.exists$) {
                node.exists$.next(true)
            }
        }

        function handleRemovedNode(node) {
            const tag = Object(get["a" /* Get */])(node, 'nodeName.toLowerCase()')

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

            Object(for_each["a" /* ForEach */])(function mutationsEach(mutation) {
                if (mutation.type === 'childList') {
                    Object(for_each["a" /* ForEach */])(handleRemovedNode, mutation.removedNodes)
                    Object(for_each["a" /* ForEach */])(handleAddedNode, mutation.addedNodes)
                }
            }, mutations)
        })

        componentsObserver.observe(document.body, componentsObserverConfig)
    }
}
// CONCATENATED MODULE: ./src/services/componentStore.js


function getTag(element) {
    return Object(get["a" /* Get */])(element, 'tagName', '').toLowerCase()
}

const ComponentStore = (function ComponentStoreIFEE() {
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
// EXTERNAL MODULE: ./src/utils/dispatch-event.js
var dispatch_event = __webpack_require__(33);

// CONCATENATED MODULE: ./src/services/dragDrop.js


function DragDropService(element) {
    let draggables = []
    const htmlElement = document.firstElementChild

    function filterElements(elements) {
        return elements.filter(function (el) { return !!el.parentNode })
    }

    function handleDataTransfer(dataTransfer) {
        return Object(dispatch_event["a" /* DispatchEvent */])(element, 'dropped', dataTransfer)
    }

    function setUserSelect(remove) {
        if (!remove) {
            htmlElement.style.userSelect = 'none'
        } else {
            htmlElement.style.removeProperty('user-select')
        }
    }

    function startDrag(e) {
        const target = e.target

        if (target && target.getAttribute('draggable') === 'false') { return }

        e.preventDefault()
        setUserSelect()
        Object(dispatch_event["a" /* DispatchEvent */])(element, 'dragstarted')
    }

    function drop(e) {
        e.preventDefault()
        element.classList.remove('dragging')
        element.classList.remove('dragover')
        setUserSelect(true)
        handleDataTransfer(e.dataTransfer || e.originalEvent.dataTransfer)
    }

    function dragover(e) {
        e.preventDefault()
        element.classList.add('dragover')
    }

    function dragleave(e) {
        e.preventDefault()
        element.classList.remove('dragover')
    }

    function dragend(e) {
        e.preventDefault()
        element.classList.remove('dragging')
        element.classList.remove('dragover')
        setUserSelect(true)
        Object(dispatch_event["a" /* DispatchEvent */])(element, 'dragended')
    }

    element.addEventListener('dragstart', startDrag)
    element.addEventListener('dragover', dragover)
    element.addEventListener('drop', drop)
    element.addEventListener('dragleave', dragleave)
    element.addEventListener('dragend', dragend)

    const methods = {
        destroy: function () {
            element.removeEventListener('dragstart', startDrag)
            element.removeEventListener('dragover', dragover)
            element.removeEventListener('drop', drop)
            element.removeEventListener('dragleave', dragleave)
            element.removeEventListener('dragend', dragleave)

            const isDragging = element.classList.contains('dragging')

            if (isDragging) {
                element.classList.remove('dragging')
                document.body.classList.remove('dragging-elements')
            }
        }
    }

    Object.defineProperties(methods, {
        draggables: {
            get: function () {
                return filterElements(draggables)
            },
            set: function (elements) {
                draggables = []

                filterElements(Array.from(elements)).forEach(function (d) {
                    draggables.push(d)
                })
            }
        },
        dropZone: {
            get: function () {
                return element
            }
        }
    })

    return methods
}
// EXTERNAL MODULE: ./src/services/id.js
var services_id = __webpack_require__(12);

// EXTERNAL MODULE: ./src/utils/to-string.js
var to_string = __webpack_require__(6);

// EXTERNAL MODULE: ./src/utils/type.js
var type = __webpack_require__(3);

// EXTERNAL MODULE: ./src/utils/from-json.js
var from_json = __webpack_require__(36);

// CONCATENATED MODULE: ./src/utils/to-json.js



function ToJSON(value) {
    const result = Object(from_json["b" /* default */])(value)

    if (result.stop) { return result }

    try {
        result.value = JSON.stringify(result.value)
        result.valid = true
    } catch (error) {
        result.valid = false
    }

    result.type = Object(type["a" /* Type */])(result.value)
    return result
}
// CONCATENATED MODULE: ./src/utils/observe-worker.js





function emptyFn() { }

function ObserveWorker(func) {
    let value
    let previous
    let worker
    let functionString = Object(to_string["a" /* ToString */])(func).value
    const subscriptions = {}
    const firstBracket = functionString.indexOf('{')
    const beginingSlice = functionString.slice(firstBracket)
    const pendingSubscriptions = []

    functionString = ''.concat('function webworker()', beginingSlice, 'webworker()')

    function loop(method, data, subs) {
        function loopInner(key) {
            return Object(get["a" /* Get */])(subs, ''.concat(key, '.', method), emptyFn())(data)
        }

        return Object.keys(subs).forEach(loopInner)
    }

    function shutDown() {
        if (worker) { worker.terminate() }
        worker = undefined
        return false
    }

    function startUp() {
        if (worker) { return }

        let blob

        try {
            blob = window.URL.createObjectURL(new Blob([functionString], { type: 'application/javascript' }))
        } catch (error) { }

        if (!blob) { return }

        worker = new Worker(blob)

        worker.onmessage = function onmessageFn(e) {
            previous = value
            value = e.data
            return loop('next', value, subscriptions)
        }

        worker.onerror = function onerrorFn(e) {
            return loop('error', e.message, subscriptions)
        }
        return worker
    }

    function noShutdown(subs) {
        return Object.keys(subs).length === 0 ? shutDown() : true
    }

    function unSubscribe(subscriberId) {
        return function unSubscribeInner() {
            subscriptions[subscriberId] = null
            delete subscriptions[subscriberId]
            noShutdown(subscriptions)
        }
    }

    function completeAll(subs) {
        function completeAllEach(key) {
            subs[key].complete()
            unSubscribe(key)
        }

        return Object.keys(subs).forEach(completeAllEach)
    }

    const methods = {
        dispose: function () { completeAll(subscriptions) },

        post: function (msg) {
            const index = pendingSubscriptions.length

            return new Promise(
                function postPromise(resolve, reject) {
                    function res(e) {
                        pendingSubscriptions[index]()
                        return resolve(e)
                    }

                    function rej(e) {
                        pendingSubscriptions[index]()
                        return reject(e)
                    }

                    pendingSubscriptions.push(methods.subscribe(res, rej, rej))
                    worker.postMessage(ToJSON(msg).value)
                }
            )
        },

        subscribe: function (next, error, complete) {
            error = error ? error : emptyFn
            complete = complete ? complete : emptyFn

            if (typeof next !== 'function') {
                return
            }

            const subscriber = {
                next: next,
                error: error,
                complete: complete,
                id: Object(services_id["a" /* ID */])()
            }

            subscriptions[subscriber.id] = subscriber

            if (typeof subscriptions[subscriber.id].error !== 'function') {
                subscriptions[subscriber.id].error = unSubscribe(subscriber.id)
            }

            if (typeof subscriptions[subscriber.id].complete !== 'function') {
                subscriptions[subscriber.id].complete = unSubscribe(subscriber.id)
            }

            startUp()

            return unSubscribe(subscriber.id)
        }
    }

    Object.defineProperties(methods, {
        value: {
            get: function () {
                return value
            }
        },
        previous: {
            get: function () {
                return previous
            }
        },
        functionString: {
            get: function () {
                return functionString
            }
        },
        subscriptions: {
            get: function () {
                return subscriptions
            }
        },
        pending: {
            get: function () {
                return pendingSubscriptions
            }
        }
    })

    return methods
}
// EXTERNAL MODULE: ./src/utils/object-assign.js
var object_assign = __webpack_require__(4);

// CONCATENATED MODULE: ./src/services/request.js



function Request(apiBase) {
    return function (reqData) {
        reqData = reqData ? reqData : {}

        const base = apiBase
        const path = ''.concat(base, ''.concat('/', reqData.path || '').split('//').join('/'))

        const REQ = Object(object_assign["a" /* ObjectAssign */])(
            {},
            {
                data: undefined,
                headers: {},
                method: 'POST'
            },
            reqData,
            { path: path }
        )

        const isFormData = REQ.data instanceof FormData

        if (!isFormData && REQ.data && typeof REQ.data !== 'string') {
            REQ.data = JSON.stringify(REQ.data)
        }

        if (isFormData) {
            REQ.toForm = true

            const jsonData = {}
            REQ.data.forEach(function (value, key) {
                jsonData[key] = value
            })

            REQ.data = JSON.stringify(REQ.data)
        }

        return new Promise(
            function RequestPromise(resolve, reject) {
                let workerSubscription

                const worker$ = ObserveWorker(
                    function () {
                        self.onmessage = function (e) {
                            var xhr = new XMLHttpRequest()
                            var data = JSON.parse(e.data)
                            var formData = data.data
                            var form = new FormData()

                            function formDataKeysEach(key) {
                                return form.append(key, formData[key])
                            }

                            function onloadFn() {
                                postMessage({ status: xhr.status, response: xhr.responseText || xhr.statusText })
                            }

                            function onerrorFn() {
                                postMessage({ status: xhr.status, response: xhr.statusText })
                            }

                            function headersEach(key) {
                                xhr.setRequestHeader(key, data.headers[key])
                            }

                            if (data.toForm) {
                                Object.keys(formData).forEach(formDataKeysEach)
                                formData = form
                            }

                            xhr.open(data.method, data.path, false)
                            Object.keys(data.headers).forEach(headersEach)
                            xhr.onload = onloadFn
                            xhr.onerror = onerrorFn
                            xhr.send(data.data)
                        }
                    }
                )

                function workerSub(e) {
                    workerSubscription()
                    let res = e.response
                    try { res = JSON.parse(res) } catch (error) { }

                    if (e.status === 200) {
                        return resolve(res)
                    } else {
                        return reject(e)
                    }
                }

                function workerError(e) {
                    workerSubscription()
                    reject(e)
                }

                workerSubscription = worker$.subscribe(workerSub, workerError)

                worker$.post(REQ)
            }
        )
    }
}
// EXTERNAL MODULE: ./src/utils/observer.js
var utils_observer = __webpack_require__(10);

// CONCATENATED MODULE: ./src/services/router/invalid-query.js
function invalidQuery(searchString) { return !searchString || typeof searchString.split !== 'function' || searchString === '' }
/* harmony default export */ var invalid_query = (invalidQuery);
// CONCATENATED MODULE: ./src/services/router/get-query.js


function getQuery(url) {
    const result = {}
    let searchString = !!url && typeof url === 'string' ? url.slice() : undefined

    if (!!url && typeof url.search === 'string') {
        searchString = url.search
    }

    if (invalid_query(searchString)) {
        return result
    }

    const queryString = searchString.split('?')[1]

    if (invalid_query(queryString)) { return result }

    function queryEach(v) {
        if (!v || typeof v.split !== 'function') { return }
        result[v.split('=')[0]] = v.split('=')[1]
    }

    queryString.split('&').forEach(queryEach)

    return result
}

/* harmony default export */ var get_query = (getQuery);
// EXTERNAL MODULE: ./src/utils/is-empty.js
var is_empty = __webpack_require__(26);

// CONCATENATED MODULE: ./src/services/router/query-object-to-string.js


function queryObjectToString(query) {
    query = query ? query : {}

    if (!Object.keys(query).length) { return '' }

    const queries = Object
        .keys(query)
        .map(function (q) { return Object(is_empty["a" /* IsEmpty */])(query[q]) ? false : ''.concat(q, '=', query[q]) })
        .filter(function (v) { return !!v })
        .join('&')

    if (queries) { return ''.concat('?', queries) }

    return ''
}

/* harmony default export */ var query_object_to_string = (queryObjectToString);
// EXTERNAL MODULE: ./src/utils/from-entities.js
var from_entities = __webpack_require__(15);

// CONCATENATED MODULE: ./src/utils/svg-tags.js
const svgTags = [
    'svg',
    'a',
    'altglyph',
    'altglyphdef',
    'altglyphitem',
    'animatecolor',
    'animatemotion',
    'animatetransform',
    'audio',
    'canvas',
    'circle',
    'clippath',
    'defs',
    'desc',
    'ellipse',
    'filter',
    'font',
    'g',
    'glyph',
    'glyphref',
    'hkern',
    'image',
    'line',
    'lineargradient',
    'marker',
    'mask',
    'metadata',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialgradient',
    'rect',
    'stop',
    'style',
    'switch',
    'symbol',
    'text',
    'textpath',
    'title',
    'tref',
    'tspan',
    'video',
    'view',
    'vkern'
]
// CONCATENATED MODULE: ./src/utils/html-tags.js
const htmlTags = [
    'a',
    'abbr',
    'acronym',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'bdi',
    'bdo',
    'big',
    'blink',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'center',
    'cite',
    'code',
    'col',
    'colgroup',
    'content',
    'data',
    'datalist',
    'dd',
    'decorator',
    'del',
    'details',
    'dfn',
    'dir',
    'div',
    'dl',
    'dt',
    'element',
    'em',
    'fieldset',
    'figcaption',
    'figure',
    'font',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'main',
    'map',
    'mark',
    'marquee',
    'menu',
    'menuitem',
    'meter',
    'nav',
    'nobr',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'section',
    'select',
    'shadow',
    'small',
    'source',
    'spacer',
    'span',
    'strike',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'template',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'tr',
    'track',
    'tt',
    'u',
    'ul',
    'var',
    'video',
    'wbr'
]
// CONCATENATED MODULE: ./src/utils/validate-html.js






function getElements(Doc, selector) {
    return Array.from(Doc.body.querySelectorAll(selector))
}

function ValidateHtml(str, allowedHtmlTags, disallowedHtmlTags) {
    const original = str
    const converted = Object(pipe["a" /* Pipe */])(to_string["a" /* ToString */], from_entities["a" /* FromEntities */])(str)
    let val = converted.value

    if (!str || !str.length || converted.type !== 'string') {
        return {
            original: original,
            valid: false,
            sanitized: val,
            reason: ['no value']
        }
    }

    let doc

    try {
        doc = new DOMParser().parseFromString(val, 'text/html')
    } catch (error) {
        return {
            original: original,
            valid: true,
            sanitized: val,
            reason: ['no html present'],
        }
    }

    const totalElements = getElements(doc, '*')
    let tagsToDestroy = []
    let elementsToDestroy = []

    function allowedHtmlTagsEach(tag) {
        const index = tagsToDestroy.indexOf(tag)

        if (index > -1) {
            tagsToDestroy.splice(index, 1)
        }
    }

    function tagsToDestroyEach(tag) {
        elementsToDestroy = [].concat(getElements(doc, tag), elementsToDestroy)
    }

    function elementsToDestroyEach(el) {
        if (el && el.parentNode) {

            const childrenLength = el.children.length
            let index = 0

            while (index < childrenLength) {
                try {
                    el.parentNode.insertBefore(el.children[index], el)
                } catch (error) { }
                index = index + 1
            }

            el.parentNode.removeChild(el)
        }
    }

    if (disallowedHtmlTags && disallowedHtmlTags.length) {
        tagsToDestroy = disallowedHtmlTags.slice(0)
    } else {
        tagsToDestroy = [].concat(svgTags, htmlTags)
    }

    if (allowedHtmlTags && allowedHtmlTags.length) {
        allowedHtmlTags.forEach(allowedHtmlTagsEach)
    }

    tagsToDestroy.forEach(tagsToDestroyEach)

    elementsToDestroy.forEach(elementsToDestroyEach)

    const leftOverElements = getElements(doc, '*')
    const diff = totalElements.length - leftOverElements.length
    const valid = diff === 0

    return {
        original: original,
        valid: valid,
        sanitized: valid ? val : !doc.body.innerHTML || !doc.body.innerHTML.length ? '' : doc.body.innerHTML,
        reason: valid ? [] : [''.concat(diff, ' element', diff > 1 ? 's were' : ' was', ' removed')]
    }
}
// CONCATENATED MODULE: ./src/services/router/parse-url.js


function parseUrl(url) {
    const validated = typeof url === 'string'
        ? ValidateHtml(url.split('?')[0]).sanitized // prevent XSS
        : url.pathname
            ? ValidateHtml(url.pathname).sanitized // prevent XSS
            : ''

    return validated.length > 1 && validated[validated.length - 1] === '/' ? validated.slice(0, validated.length - 1) : validated
}

/* harmony default export */ var parse_url = (parseUrl);
// CONCATENATED MODULE: ./src/services/router/get-route-by-path.js


function get_route_by_path_getRouteByPath(routes) {
    return function getRouteByPathInner(path) {
        path = parse_url(typeof path === 'string' ? path.toLowerCase() : path)

        let r
        let i = 0
        const keys = Object.keys(routes || {})
        const urlParts = typeof path === 'string' ? path.split('/') : []

        while (i < keys.length && !r) {
            if (routes[keys[i]].pathname === path) { return routes[keys[i]] }

            if (routes[keys[i]].pathname.indexOf('/*') > -1) {
                const pathParts = routes[keys[i]].pathname.split('/')

                if (pathParts.length > urlParts.length) {
                    if (pathParts[urlParts.length - 1] !== '**') {
                        i = i + 1
                        continue
                    }
                }

                if (pathParts.length < urlParts.length) {
                    if (pathParts[pathParts.length - 1] !== '**') {
                        i = i + 1
                        continue
                    }
                }

                let match = false

                let partsIndex = 0

                while (partsIndex < pathParts.length) {
                    if (urlParts[partsIndex] !== pathParts[partsIndex] && pathParts[partsIndex].indexOf('*') === -1) {
                        match = false
                        break
                    }

                    match = true
                    partsIndex = partsIndex + 1
                }

                if (match) {
                    return routes[keys[i]]
                }
            }

            i = i + 1
        }

        return {}
    }
}

/* harmony default export */ var get_route_by_path = (get_route_by_path_getRouteByPath);
// CONCATENATED MODULE: ./src/services/router/click-listener.js


function findParentLink(parent) {
    let link

    try {
        while (!link && parent && parent !== document.body) {
            if (Object(get["a" /* Get */])(parent, 'tagName').toLowerCase() === 'a') {
                link = parent
            }

            parent = parent.parentNode
        }
    } catch (error) { }

    return link
}

function clickListener(methods) {
    document.documentElement.addEventListener('click', function clickHandler(e) {
        const target = e.target
        const tag = target.tagName.toLowerCase()
        let link

        if (tag === 'a') { link = target }

        if (!link && Array.isArray(e.path)) {
            let pathIndex = 0

            while (!link && pathIndex < e.path.length) {

                if (Object(get["a" /* Get */])(e, ''.concat('path.', pathIndex, '.tagName'), '').toLowerCase() === 'a' && !!Object(get["a" /* Get */])(e, ''.concat('path.', pathIndex, '.href'))) {
                    link = Object(get["a" /* Get */])(e, ''.concat('path.', pathIndex))
                }

                pathIndex = pathIndex + 1
            }
        }

        // Safari
        if (!link && e.composedPath && typeof e.composedPath === 'function') {
            const ePath = e.composedPath()
            let pathIndex = 0

            while (!link && pathIndex < ePath.length) {
                if (Object(get["a" /* Get */])(ePath, ''.concat(pathIndex, '.tagName'), '').toLowerCase() === 'a' && !!Object(get["a" /* Get */])(ePath, ''.concat(pathIndex, '.href'))) {
                    link = ePath[pathIndex]
                }

                pathIndex = pathIndex + 1
            }
        }

        // FF and IE
        if (!link && e.originalTarget) {
            link = findParentLink(e.originalTarget)
        }

        if (!link && e.explicitOriginalTarget) {
            link = findParentLink(e.explicitOriginalTarget)
        }

        if (!link) {
            link = findParentLink(e.parentNode)
        }

        if (!link || link.getAttribute('target') === '_blank') { return }

        try {
            const url = new URL(link.href)
            if (url.host !== location.host) { return }
            if (methods.route(url)) { e.preventDefault() }
        } catch (error) { }
    }, true)
}

/* harmony default export */ var click_listener = (clickListener);
// CONCATENATED MODULE: ./src/services/router/pop-state-listener.js
function popStateListener(methods) {
    window.addEventListener('popstate', function popstateHandler() {
        methods.route(''.concat(location.pathname, location.search), true)
    }, false)
}

/* harmony default export */ var pop_state_listener = (popStateListener);
// CONCATENATED MODULE: ./src/services/router/get-route.js



function getRoute(routes, url) { return get_route_by_path(routes)(parse_url(url)) }

/* harmony default export */ var get_route = (getRoute);
// CONCATENATED MODULE: ./src/services/router/update-state.js


function addLeadingSlash(pathname) {
    return !pathname ?
        '' :
        pathname[0] === '/' ?
            pathname :
            ''.concat('/', pathname)
}

function joinUrl(pathname, query) {
    return ''.concat(location.protocol, '//', location.host, addLeadingSlash(pathname), query_object_to_string(query))
}

function UpdateState(methods, replace, force) {
    if (!methods.current) { return }

    const lastQuery = query_object_to_string(methods.lastState.query)
    const currentQuery = query_object_to_string(methods.current.query)
    const full = joinUrl(methods.current.pathname, methods.current.query)
    const state = {
        title: methods.current.title || document.title,
        pathname: methods.current.pathname,
        full: full,
        query: methods.current.query || {}
    }

    if (methods.current.pathname === methods.lastState.pathname && lastQuery === currentQuery && !force) { return }

    if ((replace || force) && history.replaceState) {
        history.replaceState(state, document.title, full)
    }

    if (!replace && !force && history.pushState) {
        history.pushState(state, document.title, full)
    }

    if (lastQuery !== currentQuery || force) {
        methods.query$.next(methods.current.query)
    }

    methods.lastState = state
}

/* harmony default export */ var update_state = (UpdateState);
// CONCATENATED MODULE: ./src/services/router/handle-route.js








function handleRoute(methods, url, replace, force) {
    replace = replace ? true : false
    force = force ? true : false

    const parsedUrl = parse_url(url).toLowerCase()
    const route = get_route(methods.routes, url)

    if (!route) { return replace ? false : methods.route('/') }

    if (route.title) { document.title = route.title }

    const currentPath = Object(get["a" /* Get */])(methods.current, 'pathname')
    const routePath = Object(get["a" /* Get */])(route, 'pathname')
    const currentQuery = query_object_to_string(Object(get["a" /* Get */])(methods.current, 'query', {}))
    let query = get_query(url)

    if (route.allowedQueries && Array.isArray(route.allowedQueries)) {
        if (route.allowedQueries.length === 0) { query = {} }

        const allowed = {}

        Object.keys(query).forEach(
            function queryForEach(queryKey) {
                return route.allowedQueries.indexOf(queryKey) > -1 ?
                    allowed[queryKey] = query[queryKey] :
                    undefined
            }
        )

        query = allowed
    }

    const routeQuery = query_object_to_string(query)

    if (routePath === currentPath && currentQuery === routeQuery && !force) { return true }

    methods.current = Object(object_assign["a" /* ObjectAssign */])({}, route, { query: query, pathname: parsedUrl })

    if (replace) {
        update_state(methods, true, force)
    } else {
        update_state(methods, false, force)
    }

    methods.route$.next(methods.current)

    return true
}

/* harmony default export */ var handle_route = (handleRoute);
// CONCATENATED MODULE: ./src/services/router/index.js











function getBaseUrl() {
    return ''.concat(location.protocol, '//', location.host, location.port ? ':' + location.port : '')
}

function Router(routes) {
    const _routes = Object(object_assign["a" /* ObjectAssign */])({}, routes)
    const getRouteByPath = get_route_by_path(_routes)

    // internal state
    let lastState = {}
    let current = Object(object_assign["a" /* ObjectAssign */])({}, {
        path: location.pathname,
        query: get_query(location.search),
        base: getBaseUrl()
    }, getRouteByPath(location.pathname))

    const initialPath = ''.concat(location.pathname, location.search)
    const initialRoute = Object(object_assign["a" /* ObjectAssign */])({}, get_route(_routes, initialPath), current)

    const methods = {
        getRouteByPath: getRouteByPath,
        getQuery: get_query,
        queryObjectToString: query_object_to_string,
        routes: _routes,
        has: function (url) { return !!get_route(_routes, url) },
        route: function (url, force) { return handle_route(methods, url, false, force) },
        replaceRoute: function (url, force) { return handle_route(methods, url, true, force) },
        route$: Object(utils_observer["a" /* Observer */])(initialRoute),
        query$: Object(utils_observer["a" /* Observer */])(initialRoute.query),

        updateQuery: function (query) {
            if (!methods.current) { return }
            methods.current = Object(object_assign["a" /* ObjectAssign */])({}, methods.current, { query: query })
            update_state(methods)
        },

        addQuery: function (query) {
            if (!methods.current) { return }
            methods.current = Object(object_assign["a" /* ObjectAssign */])({}, methods.current, { query: Object(object_assign["a" /* ObjectAssign */])({}, methods.current.query, query) })
            update_state(methods)
        },

        replaceQuery: function (query) {
            if (!methods.current) { return }
            methods.current = Object(object_assign["a" /* ObjectAssign */])({}, methods.current)
            methods.current.query = query
            update_state(methods, true)
        },

        removeQuery: function (query) {
            if (!methods.current) { return }

            if (!query || (Array.isArray(query) && !query.length)) {
                methods.current.query = {}
            } else {
                if (typeof query === 'string') {
                    methods.current.query[query] = undefined
                    delete methods.current.query[query]
                } else if (Array.isArray(query)) {
                    query.forEach(function queryEach(key) {
                        methods.current.query[key] = undefined
                        delete methods.current.query[key]
                    })
                }
            }

            update_state(methods, true, true)
        }
    }

    Object.defineProperties(methods, {
        current: {
            get: function () {
                return Object(object_assign["a" /* ObjectAssign */])(
                    {},
                    current || {},
                    {
                        path: location.pathname,
                        base: getBaseUrl()
                    })
            },
            set: function (cur) {
                current = cur
            }
        },
        lastState: {
            get: function () {
                return lastState
            },
            set: function (l) {
                lastState = l
            }
        }
    })

    click_listener(methods)
    pop_state_listener(methods)

    return methods
}
// CONCATENATED MODULE: ./src/services/timer.js



const timer_subscriptions = {}
let timer_isRunning = false

function removeSubscription(subscription) {
    if (!subscription || !subscription.id) { return }

    const id = subscription.id

    if (!timer_subscriptions[id] || timer_subscriptions[id].resolved) { return }

    timer_subscriptions[id].resolved = true
    timer_subscriptions[id].resolve()

    Object(on_next_frame["a" /* OnNextFrame */])(function removeSubscriptionNext() {
        timer_subscriptions[id] = null
        delete timer_subscriptions[id]
    })
}

function timer_loop() {
    timer_isRunning = true
    const subscriptionKeys = Object.keys(timer_subscriptions)

    if (!subscriptionKeys.length) {
        timer_isRunning = false
        return
    }

    function subscriptionKeysEach(key) {
        if (!timer_subscriptions[key] || timer_subscriptions[key].resolved) { return }
        const subscription = timer_subscriptions[key]
        const index = new Date().getTime() - subscription.started

        function subStep() {
            return subscription.stepFn(subscription.frameValues[subscription.frameValues.length - 1])
        }

        function subStepEnd() {
            return subscription.stepFn(subscription.frameValues[index])
        }

        function subRemove() {
            return removeSubscription(subscription)
        }

        if (index >= subscription.frameValues.length) {
            subscription.end = index
            Object(on_next_frame["a" /* OnNextFrame */])(subStep)
            Object(on_next_frame["a" /* OnNextFrame */])(subRemove)
        } else {
            Object(on_next_frame["a" /* OnNextFrame */])(subStepEnd)
        }
    }

    subscriptionKeys.forEach(subscriptionKeysEach)

    Object(on_next_frame["a" /* OnNextFrame */])(timer_loop)
}

const Timer = (function TimerIFEE() {
    return function TimerInner(stepFn, frameValues) {
        if (!Array.isArray(frameValues) || frameValues.length === 0) { return }
        if (typeof stepFn !== 'function') { return }

        const id = Object(services_id["a" /* ID */])()
        let resolve, reject
        const promise = new Promise(
            function onNextPromise(res, rej) {
                resolve = res
                reject = rej
            }
        )

        timer_subscriptions[id] = {
            id: id,
            stepFn: stepFn,
            frameValues: frameValues,
            resolved: false,
            started: new Date().getTime(),
            cancel: function () { return removeSubscription(timer_subscriptions[id]) },
            then: function (fn) { return promise.then(fn) },
            catch: function (fn) { return promise.catch(fn) },
            promise: promise,
            resolve: resolve,
            reject: reject
        }

        if (!timer_isRunning) { timer_loop() }

        return timer_subscriptions[id]
    }
})()
// EXTERNAL MODULE: ./src/utils/t-monad.js
var t_monad = __webpack_require__(0);

// EXTERNAL MODULE: ./src/utils/from-uri-component.js
var from_uri_component = __webpack_require__(21);

// CONCATENATED MODULE: ./src/utils/to-object.js







function ToObject(value) {
    let result = Object(t_monad["a" /* TMonad */])(value)

    if (result.stop) { return result }

    if (result.type === 'string') {
        result = Object(pipe["a" /* Pipe */])(
            from_uri_component["a" /* FromURIComponent */],
            from_entities["a" /* FromEntities */],
            from_json["b" /* default */]
        )(result)
    }

    result.valid = Object(type["a" /* Type */])(result.value) === 'object'
    return result
}
// CONCATENATED MODULE: ./src/utils/use-if.js

function UseIf(condition, ifNot, value) { return Object(t_monad["a" /* TMonad */])(condition(value) ? value : ifNot(value)) }
// CONCATENATED MODULE: ./src/services/uploader.js





// TODO pako is not so great, minimal size savings. Is there anything else?
// const pako = require('../lib/pako/dist/pako.min.js')
// var reader = new FileReader();
// reader.onload = function () {
//     var compressed_file = pako.deflate(this.result, { level: 5 });
//     var myBlob = new Blob([compressed_file], { type: 'application/x-gzip' })
//     // Pass it back to the main thread
// }
// reader.readAsArrayBuffer(fileObject)

// TODO API get urls
// TODO API save to disc
// TODO API stitch
// TODO check is there has been progress already, resume

// TODO pre upload chunk function?
// TODO pre upload function?

function uploader_emptyFn() { }

function UploadService(options, file) {

    if (!file) {
        return {
            upload: function () { },
            cancel: function () { }
        }
    }

    const Options = Object(object_assign["a" /* ObjectAssign */])({}, {
        progressCB: uploader_emptyFn,
        completeCB: uploader_emptyFn,
        errorCB: uploader_emptyFn,
        url: location.href,
        bytesPerChunk: 647212,
        withCredentials: false,
        uploadMethod: 'POST',
        headers: {},
        parallel: false
    }, options)

    function getFile() {
        return file[0] ? file[0] : file
    }

    function getTotal(file, bytesPerChunk) {
        return !!bytesPerChunk && bytesPerChunk > 0 ? Math.ceil(file.size / bytesPerChunk) : 1
    }

    const uploadMessages = []
    const completedChunks = []
    const fileObject = getFile()
    const size = fileObject.size
    const total = getTotal(fileObject, Options.bytesPerChunk)
    const uploadData = Object(object_assign["a" /* ObjectAssign */])({},
        Options,
        { size: size, total: total, fileObject: fileObject }
    )

    let stop = false
    let chunkIndex = 0

    const worker$ = ObserveWorker(function workerFunction() {
        self.onmessage = function (e) {
            const data = JSON.parse(e.data)
            const x = new XMLHttpRequest()

            x.open(data.method, data.url, true)
            x.withCredentials = data.withCredentials

            function headersEach(key) {
                return x.setRequestHeader(key, data.headers[key])
            }

            Object.keys(data.headers).forEach(headersEach)

            x.onloadend = function () {
                self.postMessage(JSON.stringify({
                    response: x.response,
                    statusText: x.statusText,
                    status: x.status
                }))
            }

            x.send(data.data)
        }
    })

    function setProgress() {

        return Options.progressCB(
            UseIf(
                function progValid(p) { return p <= 1 },
                function elseNot() { return 1 },
                uploadData.total === 1
                    ? 1
                    : !completedChunks.length
                        ? 0
                        : Math.ceil((completedChunks.length / uploadData.total) * 100) / 100
            ).value
        )
    }

    function getHeaders(index, chunkSize, fileSize) {
        return Object(object_assign["a" /* ObjectAssign */])({}, {
            'Content-Type': 'application/octet-stream',
            'X-Chunk-Id': index,
            'X-Chunk-Length': chunkSize,
            'X-File-Length': fileSize
        }, uploadData.headers)
    }

    function uploadUrl(index, url) {
        return !Array.isArray(url) ? url : url[index]
    }

    function getChunk(index) {
        return uploadData.total === 1 ?
            uploadData.fileObject :
            uploadData.fileObject.slice(index * uploadData.bytesPerChunk, (index + 1) * uploadData.bytesPerChunk)
    }

    function populateData(index) {
        const data = getChunk(index)
        return {
            data: data,
            url: uploadUrl(index, uploadData.url),
            method: uploadData.uploadMethod,
            withCredentials: uploadData.withCredentials,
            headers: getHeaders(index, data.size, uploadData.fileObject.size),
        }
    }

    function onChunkUploaded(e) {
        // If no event, reject
        if (!e) { return Promise.reject() }

        const data = ToObject(e).value

        if (data.status !== 200) { return Promise.reject(data.statusText) }

        completedChunks.push(chunkIndex)
        uploadMessages.push({ chunk: chunkIndex, data: data })

        // increment current chunk index
        chunkIndex = chunkIndex + 1

        // update progress
        setProgress()

        // if more chunks to upload
        if (chunkIndex < uploadData.total) {
            return uploadChunk(chunkIndex)
        } else {
            worker$.dispose()
            return Promise.resolve()
        }
    }

    function onChunkUploadedAsync(index, e) {
        if (!e) { return Promise.reject() }

        const data = ToObject(e).value

        if (data.status !== 200) { return Promise.reject(data.statusText) }

        completedChunks.push(index)
        uploadMessages.push({ chunk: index, data: data })

        // update progress
        setProgress()

        return Promise.resolve()
    }

    function uploadChunk(index) {
        return new Promise(
            function uploadChunkPromise(resolve, reject) {
                if (stop) { return reject('upload was canceled') }

                return worker$.post(populateData(index))
                    .then(onChunkUploaded)
                    .then(resolve)
                    .catch(reject)
            }
        )
    }

    function uploadChunkAsync(index) {
        return new Promise(
            function uploadChunkAsyncPromise(resolve, reject) {
                if (stop) { return reject('upload was canceled') }

                return worker$.post(populateData(index))
                    .then(function populateDataResult(res) {
                        return onChunkUploadedAsync(index, res)
                    })
                    .then(resolve)
                    .catch(reject)
            }
        )
    }

    const methods = {
        cancel: function () { stop = true },

        upload: function () {
            if (!uploadData.size || !uploadData.total) {
                worker$.dispose()
                return Options.errorCB('invalid file')
            }

            if (!uploadData.url) {
                worker$.dispose()
                return Options.errorCB('invalid upload url')
            }

            if (stop) {
                worker$.dispose()
                return Options.errorCB('upload stopped')
            }

            if (!uploadData.parallel) {
                return uploadChunk(chunkIndex)
                    .then(Options.completeCB)
                    .catch(Options.errorCB)
            }

            const chunkArray = []
            let index = 0

            while (index < uploadData.total) {
                chunkArray.push(index)
                index = index + 1
            }

            function chunkMapper(c) {
                return uploadChunkAsync(c)
            }

            function chunkMapAfter() {
                return Options.completeCB(uploadMessages)
            }

            return Promise.all(chunkArray.map(chunkMapper))
                .then(chunkMapAfter)
                .catch(Options.errorCB)

        }
    }

    Object.defineProperty(methods, 'currentChunk', {
        get: function () {
            return chunkIndex
        }
    })

    return methods
}

window.UploadService = UploadService
// CONCATENATED MODULE: ./src/services/unsupported.js


function WCSupportClass() {
    function setUnsupportedClass() {
        return document.body.className = 'wc-unsupported'
    }

    const wc = window.WebComponents
    const safariVersions = ['Version/9', 'Version/8', 'Version/7']
    function tryCustomElements() {
        function tryCustomElementsInner() {
            try {
                var t = typeof window.customElements.define
                if (t !== 'function') { setUnsupportedClass() }
            } catch (error) {
                setUnsupportedClass()
            }
        }
        Object(on_next_frame["a" /* OnNextFrame */])(tryCustomElementsInner)
    }

    function safariReducer(prev, cur) {
        return prev
            ? true
            : navigator.userAgent.indexOf(cur) > -1
    }

    if (navigator.userAgent.indexOf('Safari') > -1 && safariVersions.reduce(safariReducer, false)) {
        setUnsupportedClass()
    }

    if (wc && wc.ready) {
        tryCustomElements()
    } else {
        window.addEventListener('WebComponentsReady', tryCustomElements)
    }
}
// CONCATENATED MODULE: ./src/services/icons.js
const iconArrow = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>'
const iconCheck = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
const iconChevron = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>'
const iconClose = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
const iconDelete = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>'
const iconError = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>'
const iconFilter = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.96 10.29l-2.75 3.54-1.96-2.36L8.5 15h11l-3.54-4.71zM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"/></svg>'
const iconGear = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>'
const iconInfo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></svg>'
const iconHelp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>'
const iconPencil = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'
const iconPlay = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'
const iconTriangle = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>'
const iconWarning = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>'

const Icons = {
    arrow: iconArrow,
    check: iconCheck,
    chevron: iconChevron,
    close: iconClose,
    delete: iconDelete,
    error: iconError,
    filter: iconFilter,
    gear: iconGear,
    info: iconInfo,
    help: iconHelp,
    pencil: iconPencil,
    play: iconPlay,
    triangle: iconTriangle,
    warning: iconWarning
}
// EXTERNAL MODULE: ./src/utils/to-map.js
var to_map = __webpack_require__(13);

// EXTERNAL MODULE: ./src/utils/to-split.js
var to_split = __webpack_require__(19);

// CONCATENATED MODULE: ./src/utils/to-join-meta.js
function ToJoinMeta(array, delimeter) {
    const result = {
        value: array,
        stringChanges: []
    }

    if (!delimeter) {
        result.value = result.value.join(delimeter)
        return result
    }

    try {
        let index = 1
        let joinedValue = result.value[index] || ''

        while (index < result.value.length) {
            result.stringChanges.push({
                start: joinedValue.length,
                end: joinedValue.length + delimeter.length,
                input: result.value[index],
                length: delimeter.length,
                result: '',
                added: delimeter
            })
            joinedValue = ''.concat(joinedValue, delimeter, result.value[index])
            index = index + 1
        }

        result.value = joinedValue

    } catch (error) { }

    return result
}
// EXTERNAL MODULE: ./src/utils/t-monad-update.js
var t_monad_update = __webpack_require__(11);

// CONCATENATED MODULE: ./src/utils/to-join.js




function ToJoin(delimeter) {
    return function (value) {
        let result = Object(t_monad["a" /* TMonad */])(value)

        if (result.stop) { return result }

        const resultingMeta = ToJoinMeta(result.value, delimeter)
        result.value = resultingMeta.value
        result.stringChanges = result.stringChanges.concat(resultingMeta.stringChanges)
        result.valid = typeof result.value === 'string'
        return Object(t_monad_update["a" /* TMonadUpdate */])(result, 'string', 'Join')
    }
}
// CONCATENATED MODULE: ./src/utils/after-every-nth.js







function AfterEveryNth(nth, insert) {
    return function (value) {
        let result = Object(t_monad["a" /* TMonad */])(value)
        let pointer = 0
        const changes = []

        if (result.stop) { return result }

        if (result.type !== 'string') { result = Object(to_string["a" /* ToString */])(result) }

        function mapper(val, index) {
            let mapped = ''

            if ((index + 1) % nth === 0 && index !== 0) {
                mapped = ''.concat(val, insert)
                changes.push({
                    start: pointer,
                    end: pointer + (1 + insert.length),
                    input: val,
                    length: 1 + insert.length,
                    result: mapped,
                    added: insert
                })
                pointer = pointer + insert.length
            } else {
                mapped = val
                pointer = pointer + 1
            }

            return mapped
        }

        const r = Object(pipe["a" /* Pipe */])(
            Object(to_split["a" /* ToSplit */])(''),
            Object(to_map["a" /* ToMap */])(mapper),
            ToJoin('')
        )(result)

        r.stringChanges = r.stringChanges.concat(changes)
        r.valid = typeof r.value === 'string' && r.value.length === 14
        return r
    }
}
// CONCATENATED MODULE: ./src/utils/animator.js


function animator_emptyFn() { }

function Animator(options) {

    const duration = options.duration ? options.duration : 0
    const stepFn = options.stepFn ? options.stepFn : animator_emptyFn
    const frameValues = options.frameValues ? options.frameValues : []
    const completeFn = options.completeFn ? options.completeFn : animator_emptyFn

    if (!duration || isNaN(duration) || !Array.isArray(frameValues) || !frameValues.length) { return }

    const startTime = Date.now()

    function run() {
        const currentTime = Date.now()
        const currentFrame = frameValues[currentTime - startTime]

        if (currentTime - startTime > duration || currentFrame === undefined) {
            return completeFn()
        }

        Object(on_next_frame["a" /* OnNextFrame */])(function runNext() { return stepFn(currentFrame) })
        Object(on_next_frame["a" /* OnNextFrame */])(run)
    }

    run()
}
// CONCATENATED MODULE: ./src/utils/append-children.js
function AppendChildren(el, children) {
    const documentFragment = document.createDocumentFragment()
    const len = children.length
    let i = len

    while (i) {
        documentFragment.appendChild(children[len - i])
        i = i - 1
    }

    el.appendChild(documentFragment)

    return el
}
// EXTERNAL MODULE: ./src/utils/array-from.js
var array_from = __webpack_require__(27);

// CONCATENATED MODULE: ./src/utils/before-every-nth.js







function BeforeEveryNth(nth, insert) {
    return function (value) {
        let result = Object(t_monad["a" /* TMonad */])(value)
        let pointer = 0
        const changes = []

        if (result.stop) { return result }

        if (result.type !== 'string') { result = Object(to_string["a" /* ToString */])(result) }

        function mapper(val, index) {
            let mapped = ''

            if ((index + 1) % nth === 0 && index !== 0) {
                mapped = ''.concat(insert, val)
                changes.push({
                    start: pointer,
                    end: pointer + (1 + insert.length),
                    input: val,
                    length: 1 + insert.length,
                    result: mapped,
                    added: insert
                })
                pointer = pointer + insert.length
            } else {
                mapped = val
                pointer = pointer + 1
            }

            return mapped
        }

        const r = Object(pipe["a" /* Pipe */])(
            Object(to_split["a" /* ToSplit */])(''),
            Object(to_map["a" /* ToMap */])(mapper),
            ToJoin('')
        )(result)

        r.stringChanges = r.stringChanges.concat(changes)
        r.valid = typeof r.value === 'string' && r.value.length === 14
        return r
    }
}
// CONCATENATED MODULE: ./src/utils/between.js
function Between(start, end, value) {
    const regex = new RegExp(''.concat(start, '([^', end, ']+)', end), 'gm')

    function getAll() {
        let match
        const matches = []

        while ((match = regex.exec(value)) !== null) {
            matches.push(match[1])
        }

        return matches
    }

    return {
        all: function () {
            return getAll()
        },
        first: function () {
            return regex.exec(value)[1]
        },
        last: function () {
            const results = getAll()
            return results[results.length - 1]
        },
        at: function (index) {
            const results = getAll()
            return results[index]
        },
        get: function () {
            return regex.exec(value)
        }
    }
}

// CONCATENATED MODULE: ./src/utils/browser-is.js
let isChrome = navigator.userAgent.indexOf('Chrome') > -1
const isExplorer = navigator.userAgent.indexOf('MSIE') > -1
const isFirefox = navigator.userAgent.indexOf('Firefox') > -1
let isSafari = navigator.userAgent.indexOf('Safari') > -1
let isOpera = navigator.userAgent.toLowerCase().indexOf('op') > -1
if ((isChrome) && (isSafari)) { isSafari = false }
if ((isChrome) && (isOpera)) { isChrome = false }

const BrowserIs = {
    safari: isSafari,
    chrome: isChrome,
    ie: isExplorer,
    firefox: isFirefox,
    opera: isOpera,
    which: isSafari ? 'safari' : isChrome ? 'chrome' : isExplorer ? 'ie' : isFirefox ? 'firefox' : isOpera ? 'opera' : undefined,
}
// EXTERNAL MODULE: ./src/utils/commas-to-array.js
var commas_to_array = __webpack_require__(30);

// EXTERNAL MODULE: ./src/utils/component-constructor.js
var component_constructor = __webpack_require__(66);

// CONCATENATED MODULE: ./src/utils/clear-html.js
function ClearHTML(el) {
    if (el) {
        while (el.firstChild) { el.removeChild(el.firstChild) }
    }

    return el
}
// EXTERNAL MODULE: ./src/utils/create-element.js
var create_element = __webpack_require__(20);

// CONCATENATED MODULE: ./src/utils/to-date.js



function ToDate(value) {
    let result = Object(t_monad["a" /* TMonad */])(value)

    if (result.stop) { return result }

    try {
        result.value = new Date(Date.parse(result.value))
    } catch (error) { }

    const isDate = (
        result.value !== 'Invalid Date'
        && !isNaN(result.value)
        && result.value instanceof Date
    )

    result.type = isDate ? 'date' : Object(type["a" /* Type */])(result.value)
    result.valid = result.type === 'date'
    return result
}
// CONCATENATED MODULE: ./src/utils/date-to-object.js


function DateToObject(value) {
    let result = ToDate(value)

    if (result.stop || !result.valid) { return result }

    const hour = parseInt(result.value.toLocaleTimeString(navigator.language, { hour: 'numeric', hour12: true }))
    result.value = {
        year: result.value.getFullYear(),
        yearShort: result.value.toLocaleDateString(navigator.language, { year: '2-digit' }),
        monthIndex: result.value.getMonth(),
        month: result.value.getMonth() + 1,
        monthDouble: result.value.toLocaleDateString(navigator.language, { month: '2-digit' }),
        monthName: result.value.toLocaleString(navigator.language, { month: 'long' }),
        monthNameShort: result.value.toLocaleString(navigator.language, { month: 'short' }),
        day: result.value.getDate(),
        dayDouble: result.value.toLocaleDateString(navigator.language, { day: '2-digit' }),
        dayOfWeek: result.value.toLocaleString(navigator.language, { weekday: 'long' }),
        dayOfWeekShort: result.value.toLocaleString(navigator.language, { weekday: 'short' }),
        dayIndex: result.value.getDay(),
        hour24: parseInt(result.value.toLocaleTimeString(navigator.language, { hour: 'numeric', hour12: false })),
        hour: hour,
        hourDouble: result.value.toLocaleTimeString(navigator.language, { hour: '2-digit', hour12: true }).replace(/[^0-9.]+/g, ''),
        hourDouble24: result.value.toLocaleTimeString(navigator.language, { hour: '2-digit', hour12: false }).replace(/[^0-9.]+/g, ''),
        minutes: parseInt(result.value.toLocaleTimeString(navigator.language, { minute: 'numeric' })),
        minutesDouble: ''.concat('0', result.value.getMinutes()).slice(-2),
        seconds: parseInt(result.value.toLocaleTimeString(navigator.language, { second: 'numeric' })),
        secondsDouble: ''.concat('0', result.value.getSeconds()).slice(-2),
        milliseconds: result.value.getMilliseconds(),
        ampm: result.value.toLocaleTimeString(navigator.language, { hour12: true, hour: 'numeric' }).replace(/[:\d]/g, '').trim(),
        date: result.value
    }

    return result
}
// CONCATENATED MODULE: ./src/utils/get-ease.js
function distance(v) {
    return v[1] - v[0]
}

function GetEase(values, duration, pow, powerFn) {
    const results = []
    let index = 0

    while (index < duration - 1) {
        const current = Math.round((distance(values) * powerFn(index, duration, pow)) * 1000) / 1000
        results.push(values[0] + current)
        index = index + 1
    }

    results.push(values[1])

    return results
}

// CONCATENATED MODULE: ./src/utils/ease-power.js
function EasePower(stepDecimal, pow) {
    pow = pow === undefined ? 4 : pow
    return 1 - Math.pow(1 - stepDecimal, pow)
}

// CONCATENATED MODULE: ./src/utils/ease-bounce.js



function EaseBounce(values, duration, pow) {
    pow = pow === undefined ? 4 : pow

    function fn(index, frames, pow) {
        return EasePower(1 - (index / frames), pow)
    }

    return GetEase( values, duration, pow, fn )
}

// CONCATENATED MODULE: ./src/utils/ease-in.js


function EaseIn(values, duration, pow) {
    pow = pow === undefined ? 4 : pow

    function fn(index, frames) {
        const t = index / frames
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    return GetEase(values, duration, pow, fn)
}
// CONCATENATED MODULE: ./src/utils/ease-in-out.js



function EaseInOut(values, duration, pow) {
    pow = pow === undefined ? 4 : pow

    function fn(index, frames, pow) {
        return EasePower((index / frames) * (index / frames), pow)
    }

    return GetEase(values, duration, pow, fn)
}
// CONCATENATED MODULE: ./src/utils/ease-out.js



function EaseOut(values, duration, pow) {
    pow = pow === undefined ? 4 : pow

    function fn(index, frames, pow) {
        return EasePower(index / frames, pow)
    }

    return GetEase(values, duration, pow, fn)
}
// EXTERNAL MODULE: ./src/utils/equals.js
var equals = __webpack_require__(52);

// CONCATENATED MODULE: ./src/utils/event-name.js
const events = {
    transitionend: {
        transition: 'transitionend',
        OTransition: 'oTransitionEnd',
        MozTransition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd',
        msTransition: 'msTransitionEnd',
    },

    transitionstart: {
        transition: 'transitionstart',
        OTransition: 'oTransitionStart',
        MozTransition: 'transitionstart',
        WebkitTransition: 'webkitTransitionStart',
        msTransition: 'msTransitionStart',
    }
}

const event_name_el = document.createElement('fake-element')

function EventName(key) {
    if (!events[key]) { return '' }
    let e

    for (e in events[key]) {
        if (event_name_el.style[e] !== undefined) {
            return events[key][e]
        }
    }

    return ''
}
// CONCATENATED MODULE: ./src/utils/find-element-in.js
function FindElementIn(parent, selector, all) {
    return !parent
        ? undefined
        : parent[all ? 'querySelectorAll' : 'querySelector'](selector)
}
// EXTERNAL MODULE: ./src/utils/find-first.js
var find_first = __webpack_require__(53);

// CONCATENATED MODULE: ./src/utils/first-of-month.js



function FirstOfMonth(value) {
    let result = ToDate(value)

    if (result.stop || !result.valid) { return result }

    result.value = DateToObject(new Date(result.value.getFullYear(), result.value.getMonth(), 1)).value
    return result
}

// EXTERNAL MODULE: ./src/utils/for-in.js
var for_in = __webpack_require__(9);

// EXTERNAL MODULE: ./src/utils/do-uri.js
var do_uri = __webpack_require__(37);

// CONCATENATED MODULE: ./src/utils/from-uri.js


function FromURI(value) { return Object(do_uri["a" /* DoURI */])(value) }
// CONCATENATED MODULE: ./src/utils/function-to-partial.js


/**
 * Converts a function to a curried partial function. Arguments are added by calling the 
 * partial(no set arity) until all possible arguments are met, which then
 * calls the original function
 * 
 * @function FunctionToPartial
 * @param  {function()} function - The function to convert
 * @param  {?any} args - The arguments to prepopulate the curried version of the function
 * @return {function()} - A curried proxy of the passed in function
 * 
 * @example
 * const curried = FunctionToPartial( (a, b, c) => { log(a, b, c) })
 * curried('one') // proxy with argument 'a' populated with 'one'
 * curried('two') // proxy with argument 'b' populated with 'two'
 * curried('three') // 'one two three'
 */

function FunctionToPartial() {
    const argArray = Object(array_from["a" /* ArrayFrom */])(arguments)
    const fn = argArray.shift()

    /** If no function passed in, return */
    if (!fn) { return }

    /** If the passed in arguments equal the original functions arity, just call the function */
    if (argArray.length >= fn.length) {
        return fn.apply(fn, argArray)
    }

    /** return function that takes new arguments which then returns a new FunctionToPartial */
    return function () {
        return FunctionToPartial.apply(null, [fn].concat(argArray, Object(array_from["a" /* ArrayFrom */])(arguments)))
    }
}
// CONCATENATED MODULE: ./src/utils/get-curve.js
/** BORROWED HEAVILY FROM: https://stackoverflow.com/a/15528789 */

function GetCurve(points, tension, closedPath, frames) {
    tension = tension === undefined ? 0.5 : tension
    closedPath = closedPath ? true : false
    frames = frames === undefined ? 16 : frames

    const numOfSegments = Math.round(frames * .3295)
    const isPairs = Array.isArray(points[0])
    const res = []
    let pts = points.slice(0)
    let pts2 = pts.slice(0)
    let x
    let y
    let t1x
    let t2x
    let t1y
    let t2y
    let c1
    let c2
    let c3
    let c4
    let st
    let t
    let i

    function ptsMapper(p) {
        return [p, p]
    }

    if (isPairs) {
        pts = pts.concat.apply([], pts)
    } else {
        pts = pts.concat.apply([], pts.map(ptsMapper))
    }

    pts2 = pts.slice(0)

    if (closedPath) {
        pts.unshift(pts2[pts2.length - 1])
        pts.unshift(pts2[pts2.length - 2])
        pts.unshift(pts2[pts2.length - 1])
        pts.unshift(pts2[pts2.length - 2])
        pts.push(pts2[0])
        pts.push(pts2[1])
    } else {
        pts.unshift(pts2[1])
        pts.unshift(pts2[0])
        pts.push(pts[pts2.length - 2])
        pts.push(pts[pts2.length - 1])
    }

    for (i = 2; i < (pts.length - 4); i += 2) {
        for (t = 0; t <= numOfSegments; t++) {

            // calc tension vectors
            t1x = (pts[i + 2] - pts[i - 2]) * tension
            t2x = (pts[i + 4] - pts[i]) * tension

            t1y = (pts[i + 3] - pts[i - 1]) * tension
            t2y = (pts[i + 5] - pts[i + 1]) * tension

            // calc step
            st = t / numOfSegments

            // calc cardinals
            c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1
            c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2)
            c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st
            c4 = Math.pow(st, 3) - Math.pow(st, 2)

            // calc x and y cords with common control vectors
            x = c1 * pts[i] + c2 * pts[i + 2] + c3 * t1x + c4 * t2x
            y = c1 * pts[i + 1] + c2 * pts[i + 3] + c3 * t1y + c4 * t2y

            res.push([x, y])
        }
    }

    function resMapper(p) {
        return p[0]
    }

    return isPairs ? res : res.map(resMapper)
}
// CONCATENATED MODULE: ./src/utils/get-input-value.js
function GetInputValue(input) {
    if (!input) { return }

    const type = input.tagName.toLowerCase() === 'select' ? 'select' : input.type

    if (type === 'checkbox' || type === 'radio') {
        return input.checked
    }

    if (type === 'select') {
        return input.options[input.selectedIndex].value
    }

    if (type === 'file') {
        return Array.from(input.files)
    }

    return input.value
}
// EXTERNAL MODULE: ./src/utils/get-parent.js
var get_parent = __webpack_require__(29);

// CONCATENATED MODULE: ./src/utils/has-keys.js


function HasKeys(compare) {
    return function (value) {
        let result = ToObject(value)

        if (result.stop) { return result }

        if (!result.valid) { return result }

        const keys = Object.keys(result.value)

        function compareFilter(v) {
            return keys.indexOf(v) > -1
        }

        result.valid = !keys.length && !compare.length
            ? true
            : keys.length && !compare.length
                ? false
                : compare.filter(compareFilter).length === compare.length

        return result
    }
} 
// CONCATENATED MODULE: ./src/utils/has-method.js
function HasMethod(obj, method) {
    return !!obj && typeof obj[method] === 'function'
}
// CONCATENATED MODULE: ./src/utils/if-empty.js



function IfEmpty(newValue) {
    return function (value) {
        const result = Object(t_monad["a" /* TMonad */])(value)

        if (result.stop || Object(is_empty["a" /* IsEmpty */])(result.value)) { return result }

        return Object(t_monad["a" /* TMonad */])(newValue)
    }
}
// CONCATENATED MODULE: ./src/utils/if-is.js


function IfIs(compare, replace) {
    return function (value) {
        let result = Object(t_monad["a" /* TMonad */])(value)
        compare = Object(t_monad["a" /* TMonad */])(compare)

        result.valid = result.value === compare.value

        if (result.value === compare.value) {
            result.value = Object(t_monad["a" /* TMonad */])(replace).value
            result = Object(t_monad["a" /* TMonad */])(result.value)
        }

        return result
    }
}

// CONCATENATED MODULE: ./src/utils/if-not.js


function IfNot(compare, replace) {
    return function (value) {
        const result = Object(t_monad["a" /* TMonad */])(value)
        compare = Object(t_monad["a" /* TMonad */])(compare)

        result.valid = result.value === compare.value

        if (!result.valid) {
            const res = Object(t_monad["a" /* TMonad */])(replace)
            return res
        }

        return result
    }
}
// EXTERNAL MODULE: ./src/utils/to-array.js
var to_array = __webpack_require__(23);

// CONCATENATED MODULE: ./src/utils/index-of.js



function IndexOf(array) {
    return function (value) {
        let result = Object(t_monad["a" /* TMonad */])(value)

        if (result.stop) { return result }

        let arr = Object(to_array["a" /* ToArray */])(array)

        if (!arr.valid) {
            result.valid = false
            return result
        }

        result.valid = arr.value.indexOf(result.value) > -1
        return result
    }
}
// CONCATENATED MODULE: ./src/utils/is-autofilled.js
function IsAutoFilled(input) {
    const nativeMatches = (input.matches || input['msMatchesSelector'])

    try {
        return nativeMatches.call(input, ':-webkit-autofill')
    } catch (error) {
        try {
            return nativeMatches.call(input, ':-moz-autofill')
        } catch (error) {
            try {
                return nativeMatches.call(input, ':-ms-autofill')
            } catch (error) {
                try {
                    return nativeMatches.call(input, ':-o-autofill')
                } catch (error) {
                    try {
                        return nativeMatches.call(input, ':autofill')
                    } catch (error) {
                        return false
                    }
                }
            }
        }
    }
}
// EXTERNAL MODULE: ./src/utils/is-date.js
var is_date = __webpack_require__(38);

// EXTERNAL MODULE: ./src/utils/is-dom.js
var is_dom = __webpack_require__(25);

// EXTERNAL MODULE: ./src/utils/is-element.js
var is_element = __webpack_require__(16);

// CONCATENATED MODULE: ./src/utils/is-element-type.js



function IsElementType(tag) {
    return function (value) {
        const result = Object(t_monad["a" /* TMonad */])(value)

        if (result.stop) {
            return result
        }

        result.valid = Object(get["a" /* Get */])(result, 'value.tagName', '').toLowerCase() === tag.toLowerCase()
        return result
    }
}
// CONCATENATED MODULE: ./src/utils/is-mobile.js
function IsMobile() {
    return (typeof window.orientation !== 'undefined') || (window.navigator.userAgent.indexOf('IEMobile') !== -1)
}

// EXTERNAL MODULE: ./src/utils/is-non-collection.js
var is_non_collection = __webpack_require__(28);

// EXTERNAL MODULE: ./src/utils/is-object.js
var is_object = __webpack_require__(14);

// EXTERNAL MODULE: ./src/utils/is-t-monad.js
var is_t_monad = __webpack_require__(39);

// CONCATENATED MODULE: ./src/utils/last-of-month.js



function LastOfMonth(value) {
    let result = ToDate(value)

    if (result.stop || !result.valid) { return result }

    result.value = DateToObject(new Date(result.value.getFullYear(), result.value.getMonth() + 1, 0)).value
    return result
}

// EXTERNAL MODULE: ./src/utils/to-regex.js
var to_regex = __webpack_require__(22);

// CONCATENATED MODULE: ./src/utils/match.js


function Match(toSearchFor, toSearchIn) {
    function doSearch(search) {
        return search.match(Object(to_regex["a" /* ToRegex */])(toSearchFor).value)
    }

    if (toSearchIn === undefined) {
        return function MatchInner(toSearchIn) {
            return doSearch(toSearchIn)
        }
    }

    return doSearch(toSearchIn)
}
// CONCATENATED MODULE: ./src/utils/match-all.js


function MatchAll(toSearchFor, toSearchIn) {
    function doSearch(search) {
        const matches = []

        search.replace(
            Object(to_regex["a" /* ToRegex */])(toSearchFor).value,

            function (match) {
                matches.push(([]).slice.call(arguments, 0))
                return match
            }
        )

        return matches
    }

    if (toSearchIn === undefined) {
        return function MatchAllInner(toSearchIn) {
            return doSearch(toSearchIn)
        }
    }

    return doSearch(toSearchIn)
}
// CONCATENATED MODULE: ./src/utils/memoize.js
const cache = new WeakMap()

function Memoize(fn) {

    return function MemoizeInner() {
        const obj = { fn: fn, args: Array.from(arguments).value }
        const cached = cache.get(obj)

        if (cached) {
            return cached
        }

        const result = fn.apply(fn, obj.args)
        cache.set(obj, result)
        return result

    }
}
// CONCATENATED MODULE: ./src/utils/merge.js



function arrEach(result) {
    return function arrEachInner(value, index) {
        return result[index] = value
    }
}

function mergeArray(arr1, arr2) {
    const result = arr1.slice(0)
    const _arrEach = arrEach(result)

    arr2.forEach(_arrEach)

    return result
}

function merge(obj1, obj2) {
    if (!obj1) {
        return Object(object_assign["a" /* ObjectAssign */])({}, obj2)
    }

    if (!obj2) {
        return Object(object_assign["a" /* ObjectAssign */])({}, obj1)
    }

    const type1 = Object(type["a" /* Type */])(obj1)
    const type2 = Object(type["a" /* Type */])(obj2)

    if (type1 !== type2 || ['array', 'object'].indexOf(type1) === -1) {
        return obj2
    }

    if (type1 === 'array') {
        return mergeArray(obj1, obj2)
    }

    const result = Object(object_assign["a" /* ObjectAssign */])({}, obj1)

    Object.keys(obj2).forEach(function (key) {
        if (!obj2[key]) { return }

        result[key] = merge(obj1[key], obj2[key])
    })

    return result
}

function mutateMergeArray(arr1, arr2) {
    const _arrEach = arrEach(arr1)
    arr2.forEach(_arrEach)
    return arr1
}

function mutateMerge(obj1, obj2) {
    if (!obj1) {
        return obj2
    }

    if (!obj2) {
        return obj1
    }

    const type1 = Object(type["a" /* Type */])(obj1)
    const type2 = Object(type["a" /* Type */])(obj2)

    if (type1 !== type2 || ['array', 'object'].indexOf(type1) === -1) {
        return obj2
    }

    if (type1 === 'array') {
        return mutateMergeArray(obj1, obj2)
    }

    Object.keys(obj2).forEach(function (key) {
        if (!obj2[key]) { return }

        obj1[key] = mutateMerge(obj1[key], obj2[key])
    })

    return obj1
}

function Merge(obj1, obj2, mutate) {
    mutate = mutate ? true : false
    return !mutate ? merge(obj1, obj2) : mutateMerge(obj1, obj2)
}
// CONCATENATED MODULE: ./src/utils/merge-stylesheets.js




function merge_stylesheets_exists(thing) { return !!thing }
function getRules(sheet) { return Object(get["a" /* Get */])(sheet, 'sheet.rules', Object(get["a" /* Get */])(sheet, 'sheet.cssRules', [])) }
function validRule(rule) { return !!rule.selector && rule.cssText }
function getSelector(obj) { return obj.selector }
function getStyleElement(obj) { return Object(is_element["a" /* IsElement */])(obj).valid ? obj : Object(get["a" /* Get */])(obj, 'ownerNode', Object(get["a" /* Get */])(obj, '0.parentStyleSheet.ownerNode')) }

function mapRuleObject(rule) {
    return {
        selector: Object(get["a" /* Get */])(rule, 'selectorText'),
        cssText: Object(get["a" /* Get */])(rule, 'style.cssText')
    }
}

function mapSheets(sheet) {
    return Array.from(getRules(sheet))
        .map(mapRuleObject)
        .filter(validRule)
}

function MergeStyleSheets() {
    const styleElements = Array.from(arguments).map(getStyleElement).filter(merge_stylesheets_exists)
    const sheets = styleElements.map(mapSheets).filter(merge_stylesheets_exists)
    const styleObject = sheets.shift()
    const styleObjectIndice = styleObject.map(getSelector)
    const styleElement = styleElements.shift()

    if (!styleObject || !styleElement) { return }

    function sheetEach(ruleObject) {
        const styleObjectIndex = styleObjectIndice.indexOf(getSelector(ruleObject))

        if (styleObjectIndex > -1) {
            if (styleObject[styleObjectIndex].cssText !== ruleObject.cssText) {
                styleObject[styleObjectIndex].cssText = ''.concat(styleObject[styleObjectIndex].cssText, ruleObject.cssText)
            }

            return
        }

        styleObject.push(ruleObject)
        styleObjectIndice.push(getSelector(ruleObject))
    }

    function sheetsEach(sheet) {
        return sheet.forEach(sheetEach)
    }

    function styleObjectMap(ruleObject) {
        return ''.concat(ruleObject.selector, '{', ruleObject.cssText, '}')
    }

    sheets.forEach(sheetsEach)

    Object(set_style_rules["a" /* SetStyleRules */])(styleElement, styleObject.map(styleObjectMap).join(''))

    return styleElement
}
// CONCATENATED MODULE: ./src/utils/month-data.js





function MonthData(value) {
    let result = ToDate(value)

    if (result.stop || !result.valid) { return result }

    const first = FirstOfMonth(result.value).value
    const last = LastOfMonth(result.value).value

    let startIndex = first.dayIndex
    const bufferStart = []

    while (startIndex) {
        const d = DateToObject(
            new Date(
                first.year,
                first.monthIndex,
                1 - startIndex
            )
        ).value
        d.outOfRange = true
        bufferStart.push(d)
        startIndex = startIndex - 1
    }

    let endIndex = 6 - last.dayIndex
    const bufferEnd = []

    while (endIndex) {
        const d = DateToObject(
            new Date(
                last.year,
                last.monthIndex,
                last.day + (7 - (endIndex + last.dayIndex))
            )
        ).value
        d.outOfRange = true
        bufferEnd.push(d)
        endIndex = endIndex - 1
    }

    let daysArray = [].concat(bufferStart.slice())
    let dayIndex = 0

    while (dayIndex < last.day) {
        const d = DateToObject(
            new Date(
                first.year,
                first.monthIndex,
                first.day + dayIndex
            )
        ).value
        daysArray.push(d)
        dayIndex = dayIndex + 1
    }

    result.value = daysArray.concat(bufferEnd.slice())
    return result
}
// EXTERNAL MODULE: ./src/utils/observe-children.js
var observe_children = __webpack_require__(54);

// EXTERNAL MODULE: ./src/utils/observe-exists.js
var observe_exists = __webpack_require__(40);

// EXTERNAL MODULE: ./src/utils/observe-event.js
var observe_event = __webpack_require__(44);

// EXTERNAL MODULE: ./src/utils/observer-empty.js
var observer_empty = __webpack_require__(41);

// CONCATENATED MODULE: ./src/utils/observe-slots.js




function ObserveSlots(element, mustHaveSlotAttribute) {
    if (!mustHaveSlotAttribute) { mustHaveSlotAttribute = false }

    if (!element) { return Object(observer_empty["a" /* ObserverReturnEmpty */])() }

    const observer = Object(utils_observer["a" /* Observer */])()
    const exists = Object(observe_exists["a" /* ObserveExists */])(element)
        .subscribe(function ObserveExistsSub(exists) {
            return exists ? undefined : dispose()
        })

    function newSlots(added, removed) {
        added = added ? added : []
        removed = removed ? removed : []

        return added.length || removed.length ? observer.next({ added: added, removed: removed }) : undefined
    }

    const slotObserver = new MutationObserver(
        function slotObserverMutationObs(mutationsList) {
            const added = []
            const removed = []
            const list = Array.from(mutationsList)
            let len = list.length

            function addToArray(el, arrToAddTo) {
                if ((mustHaveSlotAttribute && el.getAttribute('slot')) || !mustHaveSlotAttribute) {
                    arrToAddTo.push(el)
                }
            }

            while (len--) {
                if (list[len].type === 'childList' && (list[len].addedNodes.length || list[len].removedNodes.length)) {
                    list[len].addedNodes.forEach(function addedEach(el) { addToArray(el, added) })
                    list[len].removedNodes.forEach(function removedEach(el) { addToArray(el, removed) })
                }
            }

            newSlots(added, removed)
        }
    )

    function dispose() {
        try { exists() } catch (error) { }
        observer.complete()
        slotObserver.disconnect()
    }

    slotObserver.observe(element, { childList: true })

    return observer
}
// CONCATENATED MODULE: ./src/utils/observe-visibility.js





function isVisible(e) {
    const instance = e[e.length - 1]
    const isNotDisplayed = instance.target ? window.getComputedStyle(instance.target).display === 'none' : instance.isNotDisplayed
    return (instance.boundingClientRect.width === 0 && instance.boundingClientRect.height === 0) || isNotDisplayed
}

/** TODO npm i intersection-observer */
function IObserver(callback) {
    if ('IntersectionObserver' in window) { return new IntersectionObserver(callback) }

    let timer
    let isRunning = false

    return {
        observe: function (element) {
            isRunning = true

            const history = {
                isNotDisplayed: false,
                boundingClientRect: {
                    width: 10000,
                    height: 10000
                }
            }

            function runIObserver() {
                if (!isRunning) { return }

                const isNotDisplayed = window.getComputedStyle(element).display === 'none'
                const rect = element.getBoundingClientRect()

                if (history.isNotDisplayed !== isNotDisplayed || history.boundingClientRect.width !== rect.width || history.boundingClientRect.height !== rect.height) {
                    history.isNotDisplayed = isNotDisplayed
                    history.boundingClientRect.width = rect.width
                    history.boundingClientRect.height = rect.height

                    if (isNotDisplayed || (rect.width === 0 || rect.height === 0)) {
                        callback([{
                            isNotDisplayed: isNotDisplayed,
                            boundingClientRect: { width: rect.width, height: rect.height }
                        }])
                    }
                }

                timer = Object(on_next_frame["a" /* OnNextFrame */])(runIObserver)
            }

            runIObserver()
        },
        disconnect: function () {
            isRunning = false
            if (timer) { timer.cancel() }
        }
    }
}

function ObserveVisibility(element) {
    if (!element) { return Object(observer_empty["a" /* ObserverReturnEmpty */])() }

    let isRunning = false
    let intersectionObserver

    function callback(e) {
        return !observer || !observer.subscriptions || Object.keys(observer.subscriptions).length === 0 ? shutDown() : observer.next(isVisible(e))
    }

    function startup() {
        if (isRunning || intersectionObserver) { return }
        isRunning = true
        intersectionObserver = new window.IntersectionObserver(callback)
        intersectionObserver.observe(element)
    }

    const observer = Object(utils_observer["a" /* Observer */])(undefined, undefined, startup)

    function shutDown() {

        try {
            intersectionObserver.disconnect()
        } catch (error) { }

        intersectionObserver = undefined
        isRunning = false
    }

    function dispose() {
        shutDown()
        observer.complete()
        try { exists() } catch (error) { }
    }

    function subFn(exists) {
        return exists ? undefined : dispose()
    }

    const exists = Object(observe_exists["a" /* ObserveExists */])(element).subscribe(subFn)

    startup()

    return observer
}
// CONCATENATED MODULE: ./src/utils/parse-css.js
/** From https://jsfiddle.net/developit/vzkckrw4/ */

function ParseCss(text) {
    text = text || ''
    let tokenizer = /([\s\S]+?)\{([\s\S]*?)\}/gi,
        rules = [],
        rule, token
    text = text.replace(/\/\*[\s\S]*?\*\//g, '')
    while ((token = tokenizer.exec(text))) {
        const style = parseRule(token[2].trim())
        style.cssText = stringifyRule(style)
        rule = {
            selectorText: token[1].trim().replace(/\s*,\s*/, ', '),
            style: style
        }
        rule.cssText = rule.selectorText + ' { ' + rule.style.cssText + ' }'
        rules.push(rule)
    }

    return rules
}


function parseRule(css) {
    let tokenizer = /\s*([a-z-]+)\s*:\s*((?:[^;]*url\(.*?\)[^;]*|[^;]*)*)\s*(?:;|$)/gi,
        obj = {},
        token
    while ((token = tokenizer.exec(css))) {
        obj[token[1].toLowerCase()] = token[2]
    }
    return obj
}

function stringifyRule(style) {
    let text = '',
        keys = Object.keys(style).sort()
    for (let i = 0; i < keys.length; i++) {
        text += ' ' + keys[i] + ': ' + style[keys[i]] + ';'
    }
    return text.substring(1)
}
// CONCATENATED MODULE: ./src/utils/properties-are.js



function PropertiesAre(compare) {
    return function (value) {
        let result = ToObject(value)

        if (result.stop) { return result }

        if (!result.valid) { return result }

        const keys = Object.keys(result.value)

        function filter(v) {
            return Object(type["a" /* Type */])(v) === compare
        }

        result.valid = keys.length === 0 ? true : keys.filter(filter).length > 0

        return result
    }
}
// CONCATENATED MODULE: ./src/utils/random-element.js
function RandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
// CONCATENATED MODULE: ./src/utils/reduce-filter.js
function ReduceFilter(predicateFunction) {
    return function ReduceFilterResult(result, current) {
        return predicateFunction(current) ? result.concat([current]) : result
    }
}
// CONCATENATED MODULE: ./src/utils/reduce-map.js
/**
 * Takes a mapping function and returns a reducer
 * @function ReduceMap
 * @param {function( item:any ) :any } mapFunction - The function to be called on every element, performs the mapping operation
 * @return {function( accumulator:[], current:any ):[] } ReduceMapResult - The reducer function
 * @example 
 * ['A', 'B'].reduce(ReduceMap(mapFunction), []) // ['a', 'b',]
 */

function ReduceMap(mapFunction) {
    return function ReduceMapResult(result, current) {
        return result.concat([mapFunction(current)])
    }
}
// CONCATENATED MODULE: ./src/utils/remove-meta.js


function RemoveMeta(string, search) {
    let match
    const result = {
        value: string.toString(),
        stringChanges: []
    }

    while ((match = Object(to_regex["a" /* ToRegex */])(search).value.exec(result.value)) !== null) {
        const matched = {
            start: match.index,
            end: match.index + match[0].length,
            input: match.input,
            length: match[0].length,
            result: '',
            removed: match[0]
        }

        const first = matched.start !== 0 ? result.value.slice(0, matched.start) : ''
        const second = result.value.slice(matched.end)

        matched.result = ''.concat(first, second)
        result.stringChanges.push(matched)
        result.value = matched.result
    }

    return result
}




// CONCATENATED MODULE: ./src/utils/replace-element-contents.js
function ReplaceElementContents(element, contents) {
    function respond() { return { element: element, contents: contents } }

    if (!element) { return respond() }

    element.innerHTML = ''

    if (typeof contents === 'string') {
        element.innerHTML = contents
        return respond()
    }

    if (!Array.isArray(contents)) { return respond() }

    function contentsEach(content) {
        element.appendChild(content)
    }

    contents.forEach(contentsEach)

    return respond()
}
// CONCATENATED MODULE: ./src/utils/scroll-to.js





function animator(from, to, speed, stepFn) {
    return new Promise(
        function animatorPromise(resolve) {
            return Timer(
                stepFn,
                EaseInOut([from, to], speed)
            ).then(resolve)
        }
    )
}

function ScrollTo(options) {
    if (!options) { return }

    if (options.element) {
        const box = options.element.getBoundingClientRect()
        options.x = box.left
        options.y = box.top
    }

    options = Object(object_assign["a" /* ObjectAssign */])(
        {},
        {
            speed: 300,
            x: 0,
            y: 0,
            target: window
        },
        options
    )

    const target = Object(get["a" /* Get */])(options, 'target')

    if (!target) { return }

    /** TODO - handle x */

    const fromY = target.scrollY || target.scrollTop
    const toY = Object(get["a" /* Get */])(options, 'y')
    const toX = Object(get["a" /* Get */])(options, 'x')
    const speed = Object(get["a" /* Get */])(options, 'speed')

    function scrollTargetY(y) {
        return target.scrollTo(toX, y)
    }

    animator(fromY || 0, toY || 0, speed, scrollTargetY)
}
// CONCATENATED MODULE: ./src/utils/selector-to-elements.js



function SelectorToElements(parent, value) {
    const result = Object(t_monad["a" /* TMonad */])(value)

    if (result.stop) {
        return result
    }

    if (!parent) {
        parent = document.firstElementChild || document.documentElement
    }

    const isEl = Object(is_element["a" /* IsElement */])(result)

    if (result.type === 'string') {
        result.value = Array.from(parent.querySelectorAll(result.value))
    } else if (isEl.valid) {
        result.value = [result.value]
    }

    function filterValue(e) {
        return Object(is_element["a" /* IsElement */])(e).valid
    }

    result.valid = result.value && result.value.length && result.value.filter(filterValue).length

    return result
}
// CONCATENATED MODULE: ./src/utils/selector-array-to-all-elements.js




function SelectorArrayToAllElements(parent, value) {
    const Value = Object(to_array["a" /* ToArray */])(value)

    if (Value.stop) {
        return Value
    }

    if (!Value.valid || Value.type !== 'array') {
        return Value
    }

    if (!parent) {
        parent = document.firstElementChild
    }

    function valid(v) {
        return v.valid
    }

    function valueObj() {
        return { value: null }
    }

    function valueMapper(el) {
        return UseIf(valid, valueObj, SelectorToElements(null, el)).value
    }

    function valueFilter(v) {
        return !!v
    }

    Value.value = Value.value.map(valueMapper).filter(valueFilter)
    Value.valid = Value.value.length
    return Value
}
// CONCATENATED MODULE: ./src/utils/selector-to-element.js



function SelectorToElement(parent, value) {
    const Value = Object(t_monad["a" /* TMonad */])(value)

    if (Value.stop) {
        return Value
    }

    if (!parent || typeof parent.querySelector !== 'function') {
        parent = document.firstElementChild || document.documentElement.body || document.documentElement.firstElementChild
    }

    if (Value.type === 'string') {
        Value.value = parent.querySelector(Value.value)
    }

    const result = Object(is_element["a" /* IsElement */])(Value)

    return result
}
// CONCATENATED MODULE: ./src/utils/selector-array-to-elements.js




function SelectorArrayToElements(parent, value) {
    const Value = Object(to_array["a" /* ToArray */])(value)

    if (Value.stop) {
        return Value
    }

    if (!Value.valid || Value.type !== 'array') {
        return Value
    }

    if (!parent) {
        parent = document.firstElementChild
    }

    function valid(v) {
        return v.valid
    }

    function valueObj() {
        return { value: null }
    }

    function valueMapper(el) {
        return UseIf(valid, valueObj, SelectorToElement(null, el)).value
    }

    function valueFilter(v) {
        return !!v
    }

    Value.value = Value.value.map(valueMapper).filter(valueFilter)

    Value.valid = Value.value.length
    return Value
}
// CONCATENATED MODULE: ./src/utils/set.js
function Set(source, path, value) {
    if (path) {
        path = [source].concat(path.split('.'))
    } else {
        path = [source]
    }

    path.reduce(function (accumulator, currentValue) {
        if (!accumulator) {
            accumulator = {}
        }

        if (!accumulator[currentValue]) {
            accumulator[currentValue] = {}
        }

        if (currentValue) {
            if (currentValue === path[path.length - 1]) {
                accumulator[currentValue] = value
            }

            return accumulator[currentValue]
        } else {
            accumulator[currentValue] = null
            return accumulator
        }
    })

    return source
}
// CONCATENATED MODULE: ./src/utils/set-attribute.js
function SetAttribute(element, name, value, asProperty) {
    asProperty = asProperty ? true : false
    if (!element || !name) { return element }

    function set(n, v) {
        if (n === 'accept') { return element.setAttribute('accept', v ? Array.isArray(v) ? v.join(', ') : v : undefined) }

        const arias = ['disabled', 'required']

        if (arias.indexOf(n) > -1) {
            set('aria-' + n, v)
        }

        if (!asProperty) {
            return v ? element.setAttribute(n, v) : element.removeAttribute(n)
        }

        return v ? element[n] = v : element[n] = undefined
    }

    function nameEach(n, i) {
        set(n, value[i])
    }

    if (Array.isArray(name)) {
        name.forEach(nameEach)
    } else {
        set(name, value)
    }

    return element
}
// CONCATENATED MODULE: ./src/utils/set-caret.js
function SetCaret(input, position, doc) {
    if (!input || !doc || doc.activeElement !== input) { return }

    if (input.createTextRange) {
        var range = input.createTextRange()
        range.move('character', position)
        range.select()
    } else if (input.selectionStart) {
        input.setSelectionRange(position, position)
    }

    return input
}
// EXTERNAL MODULE: ./src/utils/stop-if-invalid.js
var stop_if_invalid = __webpack_require__(18);

// CONCATENATED MODULE: ./src/utils/super-function.js



/**
 * Gives functions super powers. Allows functions to be curried, passing in 
 * arguments one at a time, as well as remove or completely replace arguments.
 * Also has Observers to subscribe to for when arguments, curried version are
 * updated as well as when the function is called
 * 
 * @function SuperFunction
 * 
 * @param {function()} fn - The function to wrap
 * 
 * @param {any[]} args - Arguments to set, for currying
 * 
 * @param {?string} name - Name of the function, curried functions inherit this. 
 * Defaults to passed in function's name
 * 
 * @param {?number} length - Arity of function, curried functions inherit this. 
 * Defaults to passed in function's length
 * 
 * @property {string[]} args - Returns or sets the stored arguments
 * @property {boolean} complete - Returns true if the stored arguments length is that of the original functions argument length
 * @property {function} curried - Returns a new super copy of the function
 * @property {function(args)} curry - Returns a copy of the current curried function, adding in any passed arguments
 * @property {function(arg)} pushArgument - Adds a new argument
 * @property {function()} popArgument - Removes the last argument
 * @property {function(property:string, next:function, error:function, complete:function)} subscribe - Subscribes to a state property observer, if it exists
 * 
 * @return {function()} A proxy version of the original function with the above properties/methods
 * 
 * @example
 * function wonderFunction = SuperFunction( (a, b, c) => '${a} | ${b} | ${c}' )
 * 
 * wonderFunction('one') // 'one undefined undefined'
 * 
 * const curried = wonderFunction.curried
 * curried('one') // proxy with argument 'a' populated with 'one'
 * curried('two') // proxy with argument 'b' populated with 'two'
 * curried('three') // 'one | two | three'
 * 
 * const curried2 = wonderFunction.curried
 * curried2.pushArgument('Aquaman') // ('Aquaman', b, c) => '${a} | ${b} | ${c}'
 * 
 * const curried3 = curried2.curried
 * curried3.pushArgument('Skateman') // ('Aquaman', 'Skateman', c) => '${a} | ${b} | ${c}'
 * curried3.length // 3
 * curried3.args // ['Aquaman', 'Skateman']
 * curried3.complete // false
 * curried3.versions // [curried, curried2]
 * 
 * curried3.popArgument()
 * curried3.args // ['Aquaman']
 * 
 * curried3.curry('Krypto the Superdog', 'Arm Rip Off Boy') // 'Aquaman | Krypto the Superdog | Arm Rip Off Boy'
 * 
 * curried3.subscribe('args', log)
 * curried3.pushArgument('Squirrel Girl') 
 * // subscription triggered -> ['Aquaman', 'Squirrel Girl']
 * 
 * curried3.subscribe('call', log)
 * curried3('Razorback')
 * // subscription triggered -> {
 * //   arguments:[
 * //       'Aquaman', 
 * //       'Squirrel Girl', 
 * //       'Razorback'
 * //   ], 
 * //   returned: 'Aquaman | Squirrel Girl | Razorback,
 * //   self:curried3 
 * // }
 */

function SuperFunction(fn, args, name, length) {
    args = args ? args : []
    name = name ? name : fn ? fn.name : ''
    length = length ? length : fn ? fn.length : 0

    if (!fn) { return }

    /** State object, holds observers to subscribe to */
    const state = {
        curried: Object(utils_observer["a" /* Observer */])([FunctionToPartial(fn)]),
        args: Object(utils_observer["a" /* Observer */])(Array.from(arguments)),
        call: Object(utils_observer["a" /* Observer */])({})
    }

    /** Gets last curried function */
    function currentCurry() { return state.curried.value[state.curried.value.length - 1] }


    /** Object to store a proxy of the passed in function. It's stored in an object so that properties like name and length can be set to the proxy */
    const result = {}

    /** Proxy, a function that wraps the original function, passing in the stored arguments and any arguments passed in */
    result[name] = function () {

        // concat the arguments, call the original function and store it's result
        const newArgs = state.args.value.concat(Array.from(arguments)).slice(0, length)

        /** TODO - this is duplicate code, needs to be DRY but not sure how yet */
        const newResult = {}
        newResult[name] = fn.apply(result[name], newArgs)

        if (typeof newResult[name] === 'function' && newResult[name].name === '') {
            newResult[name] = SuperFunction(newResult[name], [], name, length)
        }

        // Triggers 'call' observer subscriptions
        state.call.next({
            arguments: newArgs,
            returned: newResult[name],
            self: result[name]
        })

        return newResult[name]
    }


    /** Define new properties for the proxy function */
    Object.defineProperties(result[name], {

        /** @prototype Inherit original function name */
        name: { value: name, },

        /** @prototype Inherit original function arity */
        length: { get: function () { return length } },

        /** @prototype Stored arguments */
        args: {
            get: function () { return state.args.value },

            /** Replaces all stored arguments and resets the curried versions */
            set: function (arg) {
                state.args.next(!Array.isArray(arg) ? [arg] : arg)
                state.curried.next([FunctionToPartial(fn)])
            }
        },

        /** Returns a new super copy of the function */
        curried: {
            get: function () {
                return SuperFunction(currentCurry(), state.args.value, name, length)
            }
        },

        /** Returns true if the stored arguments length is that of the original functions argument length */
        complete: {
            get: function () { return state.args.value.length === length }
        },

        isSuperFunction: { value: true }
    })


    /**
     * @prototype Adds a new argument to the end of the stored arguments
     * @param {any} arg - the argument to add
     */

    result[name].pushArgument = function pushArgumentFn(arg) {
        /** Do not add more arguments than the function can take */
        if (length === state.args.value.length) { return }

        /** Add the argument to the curried state, creating a new version */
        const curried = state.curried.value.slice()
        curried.push(curried[curried.length - 1](arg))
        state.curried.next(curried)

        /** Add the argument */
        state.args.next(state.args.value.concat([arg]))
    }


    /** @prototype Removes the last argument from the stored arguments as well as the last curry */
    result[name].popArgument = function popArgumentFn() {
        if (state.args.value.length === 0) { return }

        state.args.next(state.args.value.slice(0, state.args.value.length - 1))
        state.curried.next(state.curried.value.slice(0, state.curried.value.length - 1))
    }


    /** @prototype Returns a copy of the current curried function, adding in any passed arguments */
    result[name].curry = function curryFn() {
        const proxy = result[name].curried
        Array.from(arguments).forEach(proxy.pushArgument)
        return proxy
    }


    /** 
     * @prototype Subscribes to a state property observer, if it exists
     * @param {string} property - the property in which to subscribe
     * @param {any} callbacks - Observer callbacks, next, error, complete
     */
    result[name].subscribe = function subFn() {
        const subscribeArguments = Array.from(arguments)

        return !state[subscribeArguments[0]] ?
            undefined :
            state[subscribeArguments[0]]
                .subscribe(
                    subscribeArguments[1],
                    subscribeArguments[2],
                    subscribeArguments[3]
                )
    }


    return result[name]
}


// CONCATENATED MODULE: ./src/utils/throttle.js



function Throttle(fn, wait) {
    wait = wait === undefined ? 33 : wait
    let timer = null
    let start = null

    return function () {
        Object(get["a" /* Get */])(timer, 'cancel()')
        start = new Date().getTime()
        const _this = this
        const args = Array.from(arguments)

        function test() {
            const now = new Date().getTime()

            if (now - start >= wait) {
                fn.apply(_this, args)
                Object(get["a" /* Get */])(timer, 'cancel()')
                start = null
                timer = null
                return
            }

            timer = Object(on_next_frame["a" /* OnNextFrame */])(test)
        }

        test()
    }
}
// CONCATENATED MODULE: ./src/utils/to-ascii.js


function ToAscii(string) {
    const result = Object(t_monad["a" /* TMonad */])(string)

    try {
        result.value = result.value.replace(new RegExp('[^\x00-\x7F]', 'gm'), '')
    } catch (error) {
        result.valid = false
    }

    return result
}
// CONCATENATED MODULE: ./src/utils/to-capitalize.js


function ToCapitalize(string) {
    const result = Object(t_monad["a" /* TMonad */])(string)

    try {
        result.value = ''.concat(result.value.slice(0, 1).toUpperCase(), result.value.slice(1) || '')
    } catch (error) {
        result.valid = false
    }

    return result
}
// CONCATENATED MODULE: ./src/utils/to-digits.js





function ToDigits(value) {
    let result = Object(t_monad["a" /* TMonad */])(value)

    if (result.stop) { return result }

    if (result.type !== 'string') { result = Object(to_string["a" /* ToString */])(result) }

    try {
        const cleaned = RemoveMeta(result.value, /[^\d]+/g)
        result.stringChanges = result.stringChanges.concat(cleaned.stringChanges)
        result.value = cleaned.value.toString()
        result.valid = !!result.value
    } catch (error) {
        result.valid = false
    }

    result.type = Object(type["a" /* Type */])(result.value)

    return result
}
// CONCATENATED MODULE: ./src/utils/to-entities.js


function ToEntities(value) {
    const result = Object(t_monad["a" /* TMonad */])(value)

    if (result.stop) { return result }

    if (result.type === 'string' && !!result.value) {
        result.value = result.value
            .replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/`/g, '&apos;')
        result.valid = true
    } else {
        result.valid = false
    }

    return result
}
// EXTERNAL MODULE: ./src/utils/to-filter.js
var to_filter = __webpack_require__(49);

// CONCATENATED MODULE: ./src/utils/to-function.js



function ToFunction(value) {
    const result = Object(t_monad["a" /* TMonad */])(value)
    if (result.stop) { return result }

    return Object(t_monad_update["a" /* TMonadUpdate */])(result, 'function', 'ToFunction')
}
// CONCATENATED MODULE: ./src/utils/to-phone.js







function ToPhone(value) {
    let result = Object(t_monad["a" /* TMonad */])(value)
    let pointer = 0
    const changes = []

    if (result.stop) { return result }

    function mapper(val, index) {
        const length = ''.concat(result.value || '').length
        let mapped = ''

        if (index === 0) {
            mapped = length ? ''.concat('(', val) : val
            changes.push({
                start: pointer,
                end: pointer + 1,
                input: val,
                length: 1,
                result: mapped,
                added: '('
            })
            pointer = pointer + 2
        }

        if (index === 3) {
            mapped = length > 4 ? ''.concat(') ', val) : val
            changes.push({
                start: pointer,
                end: pointer + 2,
                input: val,
                length: 2,
                result: mapped,
                added: ') '
            })
            pointer = pointer + 3
        }

        if (index === 6) {
            mapped = length > 9 ? ''.concat('-', val) : val
            changes.push({
                start: pointer,
                end: pointer + 1,
                input: val,
                length: 1,
                result: mapped,
                added: '-'
            })
            pointer = pointer + 2
        }

        if ([9, 8, 7, 5, 4, 2, 1].indexOf(index) > -1) {
            mapped = val
            pointer = pointer + 1
        }

        if (index > 9) {
            mapped = ''
            changes.push({
                start: pointer,
                end: pointer + 1,
                input: val,
                length: 1,
                result: mapped,
                removed: val
            })
            pointer = pointer + 1
        }

        return mapped
    }

    const r = Object(pipe["a" /* Pipe */])(
        ToDigits,
        Object(to_split["a" /* ToSplit */])(''),
        Object(to_map["a" /* ToMap */])(mapper),
        ToJoin('')
    )(result)

    r.stringChanges = r.stringChanges.concat(changes)
    r.valid = typeof r.value === 'string' && r.value.length === 14
    return r
}
// CONCATENATED MODULE: ./src/utils/to-intl-phone.js




function ToIntlPhone(value) {
    let result = Object(t_monad["a" /* TMonad */])(value)

    if (result.stop) { return result }

    const parts = result.value.split(' ')
    const countryCode = parts[0].indexOf('+') > -1 ? ''.concat(parts.shift(), ' ') : ''
    const countryCodeMonad = ToDigits(countryCode)
    const r = ToPhone(parts.join(' '))

    result.value = ''.concat('+', countryCodeMonad.value, ' ', r.value).trim()
    result.stringChanges = r.stringChanges
    return result
}
// CONCATENATED MODULE: ./src/utils/to-lower-case.js

function ToLowerCase(string) {
    const result = Object(t_monad["a" /* TMonad */])(string)

    try {
        result.value = result.value.toLowerCase()
    } catch (error) {
        result.valid = false
    }

    return result
}
// CONCATENATED MODULE: ./src/utils/to-match-meta.js



function ToMatchMeta(string, search, justOne) {
    const matches = []
    const changes = []
    const value = typeof string === 'string' ? string : Object(to_string["a" /* ToString */])(string).value
    let hasMatched = false

    function lastMatch() {
        return changes[changes.length - 1]
    }

    value.replace(Object(to_regex["a" /* ToRegex */])(search).value, function () {
        if (justOne && hasMatched) {
            return
        }

        hasMatched = true

        const arr = ([]).slice.call(arguments, 0)

        if (arr[0] === '') { return }

        const extras = arr.splice(-2)
        arr.index = extras[0]
        arr.input = extras[1]

        const last = lastMatch()
        const length = arr[0].length
        const match = {
            start: arr.index,
            end: arr.index + length,
            input: arr.input,
            length: length,
            result: arr[0],
            removed: undefined
        }

        if (match.start && last && last.end !== match.start) {
            match.removed = match.input.slice(last.end, match.start)
        } else {
            delete match.removed
        }

        matches.push(match.result)
        changes.push(match)
    })

    const last = lastMatch()

    if (last.end < value.length) {
        const removed = value.slice(last.end)
        changes.push({
            start: last.end,
            end: value.length,
            input: value,
            length: value.length - last.end,
            result: removed,
            removed: removed
        })
    }

    return {
        value: matches,
        stringChanges: changes
    }
}
// CONCATENATED MODULE: ./src/utils/to-match.js




function ToMatch(search) {
    return function (value) {
        let result = Object(t_monad["a" /* TMonad */])(value)

        if (result.stop) { return result }

        if (result.type !== 'string') { result = Object(to_string["a" /* ToString */])(result) }

        const matches = ToMatchMeta(result.value, search, true)

        result.value = matches.value
        result.valid = result.value.length === 1
        result.stringChanges = result.stringChanges.concat(matches.stringChanges)
        return result
    }
}
// CONCATENATED MODULE: ./src/utils/to-match-all.js




function ToMatchAll(search) {
    return function (value) {
        let result = Object(t_monad["a" /* TMonad */])(value)

        if (result.stop) { return result }

        if (result.type !== 'string') { result = Object(to_string["a" /* ToString */])(result) }

        const matches = ToMatchMeta(result.value, search)

        result.value = matches.value
        result.valid = result.value.length > 0
        result.stringChanges = result.stringChanges.concat(matches.stringChanges)
        return result
    }
}
// CONCATENATED MODULE: ./src/utils/to-options.js







function ToOptions(value) {
    let result = Object(t_monad["a" /* TMonad */])(value)

    if (result.stop) { return result }

    function mapper(value) {
        if (typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, 'value')) {
            if (!Object.prototype.hasOwnProperty.call(value, 'label')) {
                value.label = value.value
            }

            return value
        }

        return { value: value, label: value }
    }

    return Object(t_monad_update["a" /* TMonadUpdate */])(Object(pipe["a" /* Pipe */])(
        commas_to_array["a" /* CommasToArray */],
        Object(if_invalid["a" /* IfInvalid */])([]),
        Object(to_map["a" /* ToMap */])(mapper)
    )(result), 'array', 'Options')
}
// EXTERNAL MODULE: ./src/utils/to-plain-text.js
var to_plain_text = __webpack_require__(31);

// CONCATENATED MODULE: ./src/utils/to-replacement-pattern.js





function ToReplacementPattern(string) {
    if (!string) {
        return []
    }

    function matchesMap(match) {
        Object(pipe["a" /* Pipe */])(ToDigits, to_number["a" /* ToNumber */])(match).value
    }

    function extrasEach(extra, index) {
        if (extra === '') {
            if (index === 0 || index === extras.length - 1) {
                const replacement = parsedMatches.shift()
                return result.push({ index: replacement, original: ''.concat('$', replacement) })
            }

            return
        }

        result.push(extra)
    }

    const str = Object(to_string["a" /* ToString */])(string).value
    const matches = str.match(/(\$\d+)+/g) || []
    const extras = str.split(new RegExp('[' + matches.join(' |') + ']'))
    const parsedMatches = matches ? matches.map(matchesMap) : []
    const result = []

    extras.forEach(extrasEach)

    return result
}
// CONCATENATED MODULE: ./src/utils/to-replace-meta.js



function ToReplaceMeta(string, search, insert) {
    const replacements = ToReplacementPattern(insert)
    const result = { value: string.toString(), stringChanges: [] }
    let testString = result.value
    let match
    let index = 0

    function replacementsReducer(previous, current) {
        if (typeof current === 'string') { return ''.concat(previous, current) }
        return ''.concat(previous, match[current.index] || '')
    }

    function stringChangesReducer(previous, current, i) {
        const added = current.added || ''
        const post = i !== result.stringChanges.length - 1
            ? ''
            : current.post

        return ''.concat(previous, current.pre, added, post)
    }

    while ((match = Object(to_regex["a" /* ToRegex */])(search).value.exec(testString)) !== null) {
        const end = match.index + match[0].length
        const matched = {
            start: match.index,
            end: end,
            input: match.input,
            length: match[0].length,
            result: '',
            removed: match[0],
            pre: '',
            post: '',
            index: index
        }

        matched.pre = matched.start !== 0 ? testString.slice(0, matched.start) : ''
        matched.post = testString.slice(end)
        matched.result = ''.concat(matched.pre, matched.post)

        if (match.length > 1 && replacements.length) {
            matched.added = replacements.reduce(replacementsReducer, '')

            matched.length = matched.added.length
            matched.end = match.index + matched.length
            matched.result = ''.concat(matched.pre, matched.added || '', matched.post)
        }

        result.stringChanges.push(matched)
        testString = matched.post
        index = index + 1
    }

    if (result.stringChanges.length) {
        result.value = result.stringChanges.reduce(stringChangesReducer, '')
    }

    return result
}

// CONCATENATED MODULE: ./src/utils/to-replace.js





function ToReplace(search, replace) {
    return function (value) {
        let result = Object(t_monad["a" /* TMonad */])(value)

        if (result.stop) { return result }

        if (result.type !== 'string') { result = Object(to_string["a" /* ToString */])(result) }

        try {
            const replaced = ToReplaceMeta(result.value, search, replace)
            result.value = replaced.value
            result.valid = true
            result.stringChanges = result.stringChanges.concat(replaced.stringChanges)

        } catch (error) {
            result.valid = false
        }

        return Object(t_monad_update["a" /* TMonadUpdate */])(result, 'string', 'Replace')
    }
}
// CONCATENATED MODULE: ./src/utils/to-slice.js


function ToSlice(start, end) {
    return function (value) {
        let result = Object(t_monad["a" /* TMonad */])(value)

        if (result.stop) { return result }

        try {
            const v = result.value.slice()
            result.value = v.slice(start, end)

            if (typeof v === 'string') {
                if (start !== 0) {
                    result.stringChanges.push({
                        start: 0,
                        end: start,
                        input: v,
                        length: start,
                        result: v.slice(0, start),
                        removed: v.slice(0, start)
                    })
                }

                if (end < v.length) {
                    result.stringChanges.push({
                        start: end,
                        end: v.length,
                        input: v,
                        length: v.length - end,
                        result: v.slice(end),
                        removed: v.slice(end)
                    })
                }
            }
        } catch (error) {
            result.valid = false
        }

        return result
    }
}
// EXTERNAL MODULE: ./src/utils/to-split-meta.js
var to_split_meta = __webpack_require__(45);

// EXTERNAL MODULE: ./src/utils/to-trim.js
var to_trim = __webpack_require__(46);

// CONCATENATED MODULE: ./src/utils/to-upper-case.js


function ToUpperCase(string) {
    const result = Object(t_monad["a" /* TMonad */])(string)

    try {
        result.value = result.value.toUpperCase()
    } catch (error) {
        result.valid = false
    }

    return result
}
// CONCATENATED MODULE: ./src/utils/to-uri.js


function ToURI(value) { return Object(do_uri["a" /* DoURI */])(value, true) }

// CONCATENATED MODULE: ./src/utils/to-uri-component.js


function ToURIComponent(value) { return Object(do_uri["a" /* DoURI */])(value, true, true) }
// CONCATENATED MODULE: ./src/utils/to-us-zip.js







function ToUsZip(value) {
    let result = Object(t_monad["a" /* TMonad */])(value)

    if (result.stop) { return result }

    const mapper = Object(to_map["a" /* ToMap */])(function mapperInner(val, index) {
        if (index < 5 || (index > 5 && index < 9)) {
            return val
        }

        if (index === 5) {
            return ''.concat('-', val)
        }

        return ''
    })

    result = Object(pipe["a" /* Pipe */])(
        ToDigits,
        Object(to_split["a" /* ToSplit */])(''),
        mapper,
        ToJoin('')
    )(result)

    result.valid = typeof result.value === 'string' && (result.value.length === 5 || result.value.length === 10)
    return result
}
// CONCATENATED MODULE: ./src/utils/transduce-filter.js
function TransduceFilter(predicateFunction) {
    return function TransduceFilterInner(nextReducer) {
        return function TransduceFilterInnerInner(result, current) {
            return predicateFunction(current) ?
                nextReducer(result, current) :
                result
        }
    }
}
// CONCATENATED MODULE: ./src/utils/transduce-map.js
function TransduceMap(conversionFunction) {
    return function TransduceMapInner(reduceFunction) {
        return function TransduceMapInnerInner(result, current) {
            return reduceFunction(result, conversionFunction(current))
        }
    }
}
// CONCATENATED MODULE: ./src/utils/try.js
function Try(fn) {
    return function TryInner() {
        try {
            return fn.apply(null, arguments)
        } catch (error) { }
    }
}
// CONCATENATED MODULE: ./src/utils/validate-bool.js
function ValidateBool(val) {
    const original = val
    const reasons = []
    let result

    if (val === true || val === 'on' || val === 'true') {
        result = true
    }

    if (val === false || val === 'off' || val === 'false') {
        result = false
    }

    if (result === undefined) {
        result = false
        reasons.push('not valid')
    }

    return {
        original: original,
        valid: reasons.length === 0,
        sanitized: !!result,
        reason: reasons
    }
}

// CONCATENATED MODULE: ./src/utils/validate-email.js





function ValidateEmail(str) {
    const original = str
    const converted = Object(pipe["a" /* Pipe */])(to_string["a" /* ToString */], from_entities["a" /* FromEntities */])(str)
    let val = converted.value

    if (!val || !val.length || converted.type !== 'string') {
        return {
            original: original,
            valid: false,
            sanitized: val,
            reason: ['no value']
        }
    }

    const reasons = []
    const split = val.split('@')

    if (!split[0] || !split[0].length) {
        reasons.push('missing username')
    }

    if (split.length < 2) {
        reasons.push('missing @ symbol')
        reasons.push('missing domain, i.e. "mail.com"')
    }

    if (split.length > 1) {
        const domain = split[1].split('.')

        if (!domain[0] || !domain[0].length || !domain[1] || !domain[1].length) {
            reasons.push('missing domain, i.e. "mail.com"')
        }
    }

    if (reasons.length) {
        return {
            original: original,
            valid: false,
            sanitized: val,
            reason: reasons
        }
    }

    return ValidateHtml(val)
}
// CONCATENATED MODULE: ./src/utils/validate-intl-phone.js





function ValidateIntlPhone(val) {
    const original = val
    const reason = []
    const converted = Object(pipe["a" /* Pipe */])(to_string["a" /* ToString */], from_entities["a" /* FromEntities */], Object(if_invalid["a" /* IfInvalid */])(''))(val)
    const value = converted.value.replace(/[^\d]+/g, '').slice(0, 15)

    if (value.length < 11) {
        reason.push('needs at least 11 digits')
    }

    return {
        original: original,
        valid: reason.length === 0,
        sanitized: value,
        reason: reason
    }
}
// CONCATENATED MODULE: ./src/utils/validate-number.js


function ValidateNumber(num) {
    const original = num
    const reasons = []
    const formatted = Object(to_number["a" /* ToNumber */])(num)

    if (!formatted.valid) {
        reasons.push('not a number')
    }

    return {
        original: original,
        valid: reasons.length === 0,
        sanitized: formatted.value,
        reason: reasons
    }
}
// CONCATENATED MODULE: ./src/utils/validate-text.js





function ValidateText(str) {
    const original = str
    const reasons = []
    const converted = Object(pipe["a" /* Pipe */])(to_string["a" /* ToString */], from_entities["a" /* FromEntities */])(str)
    let val = converted.value

    if (!val || !val.length || converted.type !== 'string') {
        return {
            original: original,
            valid: false,
            sanitized: val,
            reason: reasons.concat(['no value'])
        }
    }

    const htmlResults = ValidateHtml(val)

    htmlResults.reason = htmlResults.reason.concat(reasons)

    return htmlResults
}
// CONCATENATED MODULE: ./src/utils/validate-url.js




function ValidateUrl(str) {
    const original = str
    const converted = Object(pipe["a" /* Pipe */])(to_string["a" /* ToString */], from_entities["a" /* FromEntities */])(str)
    const val = converted.value

    if (!str || str.length === 0 || converted.type !== 'string') {
        return {
            original: str,
            valid: false,
            sanitized: null,
            reason: ['no value']
        }
    }

    const reasons = []
    const link = document.createElement('a')
    link.href = val

    if (!link.protocol) {
        reasons.push('Missing url protocol')
    }

    if (!link.host) {
        reasons.push('Missing url host')
    }

    return {
        original: original,
        valid: reasons.length === 0,
        sanitized: val,
        reason: reasons
    }
}

/* harmony default export */ var validate_url = (ValidateUrl);
// CONCATENATED MODULE: ./src/utils/validate-us-phone.js





function ValidateUsPhone(val) {
    const original = val
    const reason = []
    const converted = Object(pipe["a" /* Pipe */])(to_string["a" /* ToString */], from_entities["a" /* FromEntities */], Object(if_invalid["a" /* IfInvalid */])(''))(val)
    const value = converted.value.replace(/[^\d]+/g, '').slice(0, 10)

    if (value.length < 10) {
        reason.push('needs at least 10 digits')
    }

    return {
        original: original,
        valid: reason.length === 0,
        sanitized: value,
        reason: reason
    }
}
// CONCATENATED MODULE: ./src/utils/validate-us-zip.js

function ValidateUsZip(val) {
    const original = val
    const reason = []

    const result = ToUsZip(val)

    if (!result.valid) {
        if (result.value.length < 5) {
            reason.push('minimum of 5 digits')
        }

        if (result.value.length > 5 && result.value.length < 10) {
            reason.push('needs to be 5 or 9 digits')
        }
    }

    return {
        original: original,
        valid: result.valid,
        sanitized: original,
        reason: reason
    }
}
// CONCATENATED MODULE: ./src/utils/was-clicked-on.js
function WasClickedOn(element, event) {
    if (!element) { return false }

    const isArray = Array.isArray(element)

    function isIt(el, par) {
        const isEqual = el === par
        const isContained = par instanceof Node && el.contains(par)
        if (isEqual || isContained) { return true }
        return false
    }

    const target = Array.isArray(event.path) ?
        event.path[0] :
        event.composedPath && typeof event.composedPath === 'function' && event.composedPath()[0] ?
            event.composedPath()[0] :
            event.originalTarget ?
                event.originalTarget :
                event.explicitOriginalTarget ?
                    event.explicitOriginalTarget :
                    event.target

    function cycleUp(parent) {
        while (parent && parent !== document.body) {
            if (isArray) {
                if (element.length == 1) {
                    if (isIt(element[0], parent)) {
                        return true
                    }
                } else {
                    let len = element.length
                    while (len) {
                        len = len - 1
                        if (isIt(element[len], parent)) {
                            return true
                        }
                    }
                }
            } else {
                if (isIt(element, parent)) {
                    return true
                }
            }

            parent = parent.parentNode || parent.host
        }

        return false
    }

    return cycleUp(target)
}
// EXTERNAL MODULE: ./src/polyfills/promise.js
var polyfills_promise = __webpack_require__(60);

// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport AjaxForm */__webpack_require__.d(__webpack_exports__, "AjaxForm", function() { return ajax_form["AjaxForm"]; });
/* concated harmony reexport ButtonElement */__webpack_require__.d(__webpack_exports__, "ButtonElement", function() { return button_element["ButtonElement"]; });
/* concated harmony reexport GridLayout */__webpack_require__.d(__webpack_exports__, "GridLayout", function() { return GridLayout; });
/* concated harmony reexport ComponentClassProperty */__webpack_require__.d(__webpack_exports__, "ComponentClassProperty", function() { return component_class_property["a" /* ComponentClassProperty */]; });
/* concated harmony reexport LoadOnReady */__webpack_require__.d(__webpack_exports__, "LoadOnReady", function() { return load_on_ready["a" /* LoadOnReady */]; });
/* concated harmony reexport Benches */__webpack_require__.d(__webpack_exports__, "Benches", function() { return Benches; });
/* concated harmony reexport Components */__webpack_require__.d(__webpack_exports__, "Components", function() { return Components; });
/* concated harmony reexport ComponentStore */__webpack_require__.d(__webpack_exports__, "ComponentStore", function() { return ComponentStore; });
/* concated harmony reexport DragDropService */__webpack_require__.d(__webpack_exports__, "DragDropService", function() { return DragDropService; });
/* concated harmony reexport ID */__webpack_require__.d(__webpack_exports__, "ID", function() { return services_id["a" /* ID */]; });
/* concated harmony reexport OnNextFrame */__webpack_require__.d(__webpack_exports__, "OnNextFrame", function() { return on_next_frame["a" /* OnNextFrame */]; });
/* concated harmony reexport Request */__webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* concated harmony reexport Router */__webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* concated harmony reexport Timer */__webpack_require__.d(__webpack_exports__, "Timer", function() { return Timer; });
/* concated harmony reexport UploadService */__webpack_require__.d(__webpack_exports__, "UploadService", function() { return UploadService; });
/* concated harmony reexport WCSupportClass */__webpack_require__.d(__webpack_exports__, "WCSupportClass", function() { return WCSupportClass; });
/* concated harmony reexport iconArrow */__webpack_require__.d(__webpack_exports__, "iconArrow", function() { return iconArrow; });
/* concated harmony reexport iconCheck */__webpack_require__.d(__webpack_exports__, "iconCheck", function() { return iconCheck; });
/* concated harmony reexport iconChevron */__webpack_require__.d(__webpack_exports__, "iconChevron", function() { return iconChevron; });
/* concated harmony reexport iconClose */__webpack_require__.d(__webpack_exports__, "iconClose", function() { return iconClose; });
/* concated harmony reexport iconDelete */__webpack_require__.d(__webpack_exports__, "iconDelete", function() { return iconDelete; });
/* concated harmony reexport iconError */__webpack_require__.d(__webpack_exports__, "iconError", function() { return iconError; });
/* concated harmony reexport iconFilter */__webpack_require__.d(__webpack_exports__, "iconFilter", function() { return iconFilter; });
/* concated harmony reexport iconGear */__webpack_require__.d(__webpack_exports__, "iconGear", function() { return iconGear; });
/* concated harmony reexport iconInfo */__webpack_require__.d(__webpack_exports__, "iconInfo", function() { return iconInfo; });
/* concated harmony reexport iconHelp */__webpack_require__.d(__webpack_exports__, "iconHelp", function() { return iconHelp; });
/* concated harmony reexport iconPencil */__webpack_require__.d(__webpack_exports__, "iconPencil", function() { return iconPencil; });
/* concated harmony reexport iconPlay */__webpack_require__.d(__webpack_exports__, "iconPlay", function() { return iconPlay; });
/* concated harmony reexport iconTriangle */__webpack_require__.d(__webpack_exports__, "iconTriangle", function() { return iconTriangle; });
/* concated harmony reexport iconWarning */__webpack_require__.d(__webpack_exports__, "iconWarning", function() { return iconWarning; });
/* concated harmony reexport Icons */__webpack_require__.d(__webpack_exports__, "Icons", function() { return Icons; });
/* concated harmony reexport AfterEveryNth */__webpack_require__.d(__webpack_exports__, "AfterEveryNth", function() { return AfterEveryNth; });
/* concated harmony reexport Animator */__webpack_require__.d(__webpack_exports__, "Animator", function() { return Animator; });
/* concated harmony reexport AppendChildren */__webpack_require__.d(__webpack_exports__, "AppendChildren", function() { return AppendChildren; });
/* concated harmony reexport AppendStyleElement */__webpack_require__.d(__webpack_exports__, "AppendStyleElement", function() { return append_style_element["a" /* AppendStyleElement */]; });
/* concated harmony reexport ArrayFrom */__webpack_require__.d(__webpack_exports__, "ArrayFrom", function() { return array_from["a" /* ArrayFrom */]; });
/* concated harmony reexport BeforeEveryNth */__webpack_require__.d(__webpack_exports__, "BeforeEveryNth", function() { return BeforeEveryNth; });
/* concated harmony reexport Between */__webpack_require__.d(__webpack_exports__, "Between", function() { return Between; });
/* concated harmony reexport BrowserIs */__webpack_require__.d(__webpack_exports__, "BrowserIs", function() { return BrowserIs; });
/* concated harmony reexport CommasToArray */__webpack_require__.d(__webpack_exports__, "CommasToArray", function() { return commas_to_array["a" /* CommasToArray */]; });
/* concated harmony reexport ComponentConstructor */__webpack_require__.d(__webpack_exports__, "ComponentConstructor", function() { return component_constructor["ComponentConstructor"]; });
/* concated harmony reexport ComponentSupport */__webpack_require__.d(__webpack_exports__, "ComponentSupport", function() { return ComponentSupport; });
/* concated harmony reexport ClearHTML */__webpack_require__.d(__webpack_exports__, "ClearHTML", function() { return ClearHTML; });
/* concated harmony reexport CreateElement */__webpack_require__.d(__webpack_exports__, "CreateElement", function() { return create_element["a" /* CreateElement */]; });
/* concated harmony reexport DateToObject */__webpack_require__.d(__webpack_exports__, "DateToObject", function() { return DateToObject; });
/* concated harmony reexport DispatchEvent */__webpack_require__.d(__webpack_exports__, "DispatchEvent", function() { return dispatch_event["a" /* DispatchEvent */]; });
/* concated harmony reexport EaseBounce */__webpack_require__.d(__webpack_exports__, "EaseBounce", function() { return EaseBounce; });
/* concated harmony reexport EaseIn */__webpack_require__.d(__webpack_exports__, "EaseIn", function() { return EaseIn; });
/* concated harmony reexport EaseInOut */__webpack_require__.d(__webpack_exports__, "EaseInOut", function() { return EaseInOut; });
/* concated harmony reexport EaseOut */__webpack_require__.d(__webpack_exports__, "EaseOut", function() { return EaseOut; });
/* concated harmony reexport EasePower */__webpack_require__.d(__webpack_exports__, "EasePower", function() { return EasePower; });
/* concated harmony reexport Equals */__webpack_require__.d(__webpack_exports__, "Equals", function() { return equals["a" /* Equals */]; });
/* concated harmony reexport EventName */__webpack_require__.d(__webpack_exports__, "EventName", function() { return EventName; });
/* concated harmony reexport Filter */__webpack_require__.d(__webpack_exports__, "Filter", function() { return utils_filter["a" /* Filter */]; });
/* concated harmony reexport FindElementIn */__webpack_require__.d(__webpack_exports__, "FindElementIn", function() { return FindElementIn; });
/* concated harmony reexport FindFirst */__webpack_require__.d(__webpack_exports__, "FindFirst", function() { return find_first["a" /* FindFirst */]; });
/* concated harmony reexport FirstOfMonth */__webpack_require__.d(__webpack_exports__, "FirstOfMonth", function() { return FirstOfMonth; });
/* concated harmony reexport ForEach */__webpack_require__.d(__webpack_exports__, "ForEach", function() { return for_each["a" /* ForEach */]; });
/* concated harmony reexport ForIn */__webpack_require__.d(__webpack_exports__, "ForIn", function() { return for_in["a" /* ForIn */]; });
/* concated harmony reexport FromJSON */__webpack_require__.d(__webpack_exports__, "FromJSON", function() { return from_json["a" /* FromJSON */]; });
/* concated harmony reexport FromEntities */__webpack_require__.d(__webpack_exports__, "FromEntities", function() { return from_entities["a" /* FromEntities */]; });
/* concated harmony reexport FromURI */__webpack_require__.d(__webpack_exports__, "FromURI", function() { return FromURI; });
/* concated harmony reexport FromURIComponent */__webpack_require__.d(__webpack_exports__, "FromURIComponent", function() { return from_uri_component["a" /* FromURIComponent */]; });
/* concated harmony reexport FunctionToPartial */__webpack_require__.d(__webpack_exports__, "FunctionToPartial", function() { return FunctionToPartial; });
/* concated harmony reexport Get */__webpack_require__.d(__webpack_exports__, "Get", function() { return get["a" /* Get */]; });
/* concated harmony reexport GetCurve */__webpack_require__.d(__webpack_exports__, "GetCurve", function() { return GetCurve; });
/* concated harmony reexport GetEase */__webpack_require__.d(__webpack_exports__, "GetEase", function() { return GetEase; });
/* concated harmony reexport GetInputValue */__webpack_require__.d(__webpack_exports__, "GetInputValue", function() { return GetInputValue; });
/* concated harmony reexport GetParent */__webpack_require__.d(__webpack_exports__, "GetParent", function() { return get_parent["a" /* GetParent */]; });
/* concated harmony reexport HasKeys */__webpack_require__.d(__webpack_exports__, "HasKeys", function() { return HasKeys; });
/* concated harmony reexport HasMethod */__webpack_require__.d(__webpack_exports__, "HasMethod", function() { return HasMethod; });
/* concated harmony reexport htmlTags */__webpack_require__.d(__webpack_exports__, "htmlTags", function() { return htmlTags; });
/* concated harmony reexport IfEmpty */__webpack_require__.d(__webpack_exports__, "IfEmpty", function() { return IfEmpty; });
/* concated harmony reexport IfInvalid */__webpack_require__.d(__webpack_exports__, "IfInvalid", function() { return if_invalid["a" /* IfInvalid */]; });
/* concated harmony reexport IfIs */__webpack_require__.d(__webpack_exports__, "IfIs", function() { return IfIs; });
/* concated harmony reexport IfNot */__webpack_require__.d(__webpack_exports__, "IfNot", function() { return IfNot; });
/* concated harmony reexport IndexOf */__webpack_require__.d(__webpack_exports__, "IndexOf", function() { return IndexOf; });
/* concated harmony reexport IsAutoFilled */__webpack_require__.d(__webpack_exports__, "IsAutoFilled", function() { return IsAutoFilled; });
/* concated harmony reexport IsDate */__webpack_require__.d(__webpack_exports__, "IsDate", function() { return is_date["a" /* IsDate */]; });
/* concated harmony reexport IsDom */__webpack_require__.d(__webpack_exports__, "IsDom", function() { return is_dom["a" /* IsDom */]; });
/* concated harmony reexport IsElement */__webpack_require__.d(__webpack_exports__, "IsElement", function() { return is_element["a" /* IsElement */]; });
/* concated harmony reexport IsElementType */__webpack_require__.d(__webpack_exports__, "IsElementType", function() { return IsElementType; });
/* concated harmony reexport IsEmpty */__webpack_require__.d(__webpack_exports__, "IsEmpty", function() { return is_empty["a" /* IsEmpty */]; });
/* concated harmony reexport IsMobile */__webpack_require__.d(__webpack_exports__, "IsMobile", function() { return IsMobile; });
/* concated harmony reexport IsNonCollection */__webpack_require__.d(__webpack_exports__, "IsNonCollection", function() { return is_non_collection["a" /* IsNonCollection */]; });
/* concated harmony reexport IsObject */__webpack_require__.d(__webpack_exports__, "IsObject", function() { return is_object["a" /* IsObject */]; });
/* concated harmony reexport IsTMonad */__webpack_require__.d(__webpack_exports__, "IsTMonad", function() { return is_t_monad["a" /* IsTMonad */]; });
/* concated harmony reexport LastOfMonth */__webpack_require__.d(__webpack_exports__, "LastOfMonth", function() { return LastOfMonth; });
/* concated harmony reexport Mapper */__webpack_require__.d(__webpack_exports__, "Mapper", function() { return utils_mapper["a" /* Mapper */]; });
/* concated harmony reexport Match */__webpack_require__.d(__webpack_exports__, "Match", function() { return Match; });
/* concated harmony reexport MatchAll */__webpack_require__.d(__webpack_exports__, "MatchAll", function() { return MatchAll; });
/* concated harmony reexport Memoize */__webpack_require__.d(__webpack_exports__, "Memoize", function() { return Memoize; });
/* concated harmony reexport Merge */__webpack_require__.d(__webpack_exports__, "Merge", function() { return Merge; });
/* concated harmony reexport MergeStyleSheets */__webpack_require__.d(__webpack_exports__, "MergeStyleSheets", function() { return MergeStyleSheets; });
/* concated harmony reexport MonthData */__webpack_require__.d(__webpack_exports__, "MonthData", function() { return MonthData; });
/* concated harmony reexport ObjectAssign */__webpack_require__.d(__webpack_exports__, "ObjectAssign", function() { return object_assign["a" /* ObjectAssign */]; });
/* concated harmony reexport ObserveChildren */__webpack_require__.d(__webpack_exports__, "ObserveChildren", function() { return observe_children["a" /* ObserveChildren */]; });
/* concated harmony reexport ObserveExists */__webpack_require__.d(__webpack_exports__, "ObserveExists", function() { return observe_exists["a" /* ObserveExists */]; });
/* concated harmony reexport ObserveEvent */__webpack_require__.d(__webpack_exports__, "ObserveEvent", function() { return observe_event["a" /* ObserveEvent */]; });
/* concated harmony reexport ObserveSlots */__webpack_require__.d(__webpack_exports__, "ObserveSlots", function() { return ObserveSlots; });
/* concated harmony reexport ObserveWorker */__webpack_require__.d(__webpack_exports__, "ObserveWorker", function() { return ObserveWorker; });
/* concated harmony reexport ObserveVisibility */__webpack_require__.d(__webpack_exports__, "ObserveVisibility", function() { return ObserveVisibility; });
/* concated harmony reexport Observer */__webpack_require__.d(__webpack_exports__, "Observer", function() { return utils_observer["a" /* Observer */]; });
/* concated harmony reexport ObserverUnsubscribe */__webpack_require__.d(__webpack_exports__, "ObserverUnsubscribe", function() { return observer_unsubscribe["a" /* ObserverUnsubscribe */]; });
/* concated harmony reexport ParseCss */__webpack_require__.d(__webpack_exports__, "ParseCss", function() { return ParseCss; });
/* concated harmony reexport Pipe */__webpack_require__.d(__webpack_exports__, "Pipe", function() { return pipe["a" /* Pipe */]; });
/* concated harmony reexport PropertiesAre */__webpack_require__.d(__webpack_exports__, "PropertiesAre", function() { return PropertiesAre; });
/* concated harmony reexport RandomElement */__webpack_require__.d(__webpack_exports__, "RandomElement", function() { return RandomElement; });
/* concated harmony reexport ReduceFilter */__webpack_require__.d(__webpack_exports__, "ReduceFilter", function() { return ReduceFilter; });
/* concated harmony reexport ReduceMap */__webpack_require__.d(__webpack_exports__, "ReduceMap", function() { return ReduceMap; });
/* concated harmony reexport RemoveMeta */__webpack_require__.d(__webpack_exports__, "RemoveMeta", function() { return RemoveMeta; });
/* concated harmony reexport ReplaceElementContents */__webpack_require__.d(__webpack_exports__, "ReplaceElementContents", function() { return ReplaceElementContents; });
/* concated harmony reexport ScrollTo */__webpack_require__.d(__webpack_exports__, "ScrollTo", function() { return ScrollTo; });
/* concated harmony reexport SelectorArrayToAllElements */__webpack_require__.d(__webpack_exports__, "SelectorArrayToAllElements", function() { return SelectorArrayToAllElements; });
/* concated harmony reexport SelectorArrayToElements */__webpack_require__.d(__webpack_exports__, "SelectorArrayToElements", function() { return SelectorArrayToElements; });
/* concated harmony reexport SelectorToElement */__webpack_require__.d(__webpack_exports__, "SelectorToElement", function() { return SelectorToElement; });
/* concated harmony reexport SelectorToElements */__webpack_require__.d(__webpack_exports__, "SelectorToElements", function() { return SelectorToElements; });
/* concated harmony reexport Set */__webpack_require__.d(__webpack_exports__, "Set", function() { return Set; });
/* concated harmony reexport SetAttribute */__webpack_require__.d(__webpack_exports__, "SetAttribute", function() { return SetAttribute; });
/* concated harmony reexport SetCaret */__webpack_require__.d(__webpack_exports__, "SetCaret", function() { return SetCaret; });
/* concated harmony reexport SetStyleRules */__webpack_require__.d(__webpack_exports__, "SetStyleRules", function() { return set_style_rules["a" /* SetStyleRules */]; });
/* concated harmony reexport StopIfInvalid */__webpack_require__.d(__webpack_exports__, "StopIfInvalid", function() { return stop_if_invalid["a" /* StopIfInvalid */]; });
/* concated harmony reexport svgTags */__webpack_require__.d(__webpack_exports__, "svgTags", function() { return svgTags; });
/* concated harmony reexport SuperFunction */__webpack_require__.d(__webpack_exports__, "SuperFunction", function() { return SuperFunction; });
/* concated harmony reexport Throttle */__webpack_require__.d(__webpack_exports__, "Throttle", function() { return Throttle; });
/* concated harmony reexport TMonad */__webpack_require__.d(__webpack_exports__, "TMonad", function() { return t_monad["a" /* TMonad */]; });
/* concated harmony reexport TMonadUpdate */__webpack_require__.d(__webpack_exports__, "TMonadUpdate", function() { return t_monad_update["a" /* TMonadUpdate */]; });
/* concated harmony reexport ToArray */__webpack_require__.d(__webpack_exports__, "ToArray", function() { return to_array["a" /* ToArray */]; });
/* concated harmony reexport ToAscii */__webpack_require__.d(__webpack_exports__, "ToAscii", function() { return ToAscii; });
/* concated harmony reexport ToBool */__webpack_require__.d(__webpack_exports__, "ToBool", function() { return to_bool["a" /* ToBool */]; });
/* concated harmony reexport ToCapitalize */__webpack_require__.d(__webpack_exports__, "ToCapitalize", function() { return ToCapitalize; });
/* concated harmony reexport ToDate */__webpack_require__.d(__webpack_exports__, "ToDate", function() { return ToDate; });
/* concated harmony reexport ToDigits */__webpack_require__.d(__webpack_exports__, "ToDigits", function() { return ToDigits; });
/* concated harmony reexport ToEntities */__webpack_require__.d(__webpack_exports__, "ToEntities", function() { return ToEntities; });
/* concated harmony reexport ToFilter */__webpack_require__.d(__webpack_exports__, "ToFilter", function() { return to_filter["a" /* ToFilter */]; });
/* concated harmony reexport ToFunction */__webpack_require__.d(__webpack_exports__, "ToFunction", function() { return ToFunction; });
/* concated harmony reexport ToIntlPhone */__webpack_require__.d(__webpack_exports__, "ToIntlPhone", function() { return ToIntlPhone; });
/* concated harmony reexport ToJoin */__webpack_require__.d(__webpack_exports__, "ToJoin", function() { return ToJoin; });
/* concated harmony reexport ToJoinMeta */__webpack_require__.d(__webpack_exports__, "ToJoinMeta", function() { return ToJoinMeta; });
/* concated harmony reexport ToJSON */__webpack_require__.d(__webpack_exports__, "ToJSON", function() { return ToJSON; });
/* concated harmony reexport ToLowerCase */__webpack_require__.d(__webpack_exports__, "ToLowerCase", function() { return ToLowerCase; });
/* concated harmony reexport ToMap */__webpack_require__.d(__webpack_exports__, "ToMap", function() { return to_map["a" /* ToMap */]; });
/* concated harmony reexport ToMatch */__webpack_require__.d(__webpack_exports__, "ToMatch", function() { return ToMatch; });
/* concated harmony reexport ToMatchAll */__webpack_require__.d(__webpack_exports__, "ToMatchAll", function() { return ToMatchAll; });
/* concated harmony reexport ToMatchMeta */__webpack_require__.d(__webpack_exports__, "ToMatchMeta", function() { return ToMatchMeta; });
/* concated harmony reexport ToNumber */__webpack_require__.d(__webpack_exports__, "ToNumber", function() { return to_number["a" /* ToNumber */]; });
/* concated harmony reexport ToObject */__webpack_require__.d(__webpack_exports__, "ToObject", function() { return ToObject; });
/* concated harmony reexport ToOptions */__webpack_require__.d(__webpack_exports__, "ToOptions", function() { return ToOptions; });
/* concated harmony reexport ToPhone */__webpack_require__.d(__webpack_exports__, "ToPhone", function() { return ToPhone; });
/* concated harmony reexport ToPlainText */__webpack_require__.d(__webpack_exports__, "ToPlainText", function() { return to_plain_text["a" /* ToPlainText */]; });
/* concated harmony reexport ToRegex */__webpack_require__.d(__webpack_exports__, "ToRegex", function() { return to_regex["a" /* ToRegex */]; });
/* concated harmony reexport ToReplace */__webpack_require__.d(__webpack_exports__, "ToReplace", function() { return ToReplace; });
/* concated harmony reexport ToReplacementPattern */__webpack_require__.d(__webpack_exports__, "ToReplacementPattern", function() { return ToReplacementPattern; });
/* concated harmony reexport ToReplaceMeta */__webpack_require__.d(__webpack_exports__, "ToReplaceMeta", function() { return ToReplaceMeta; });
/* concated harmony reexport ToSlice */__webpack_require__.d(__webpack_exports__, "ToSlice", function() { return ToSlice; });
/* concated harmony reexport ToSplit */__webpack_require__.d(__webpack_exports__, "ToSplit", function() { return to_split["a" /* ToSplit */]; });
/* concated harmony reexport ToSplitMeta */__webpack_require__.d(__webpack_exports__, "ToSplitMeta", function() { return to_split_meta["a" /* ToSplitMeta */]; });
/* concated harmony reexport ToString */__webpack_require__.d(__webpack_exports__, "ToString", function() { return to_string["a" /* ToString */]; });
/* concated harmony reexport ToTrim */__webpack_require__.d(__webpack_exports__, "ToTrim", function() { return to_trim["a" /* ToTrim */]; });
/* concated harmony reexport ToUpperCase */__webpack_require__.d(__webpack_exports__, "ToUpperCase", function() { return ToUpperCase; });
/* concated harmony reexport ToURI */__webpack_require__.d(__webpack_exports__, "ToURI", function() { return ToURI; });
/* concated harmony reexport ToURIComponent */__webpack_require__.d(__webpack_exports__, "ToURIComponent", function() { return ToURIComponent; });
/* concated harmony reexport ToUsZip */__webpack_require__.d(__webpack_exports__, "ToUsZip", function() { return ToUsZip; });
/* concated harmony reexport Transduce */__webpack_require__.d(__webpack_exports__, "Transduce", function() { return Transduce; });
/* concated harmony reexport TransduceFilter */__webpack_require__.d(__webpack_exports__, "TransduceFilter", function() { return TransduceFilter; });
/* concated harmony reexport TransduceMap */__webpack_require__.d(__webpack_exports__, "TransduceMap", function() { return TransduceMap; });
/* concated harmony reexport Try */__webpack_require__.d(__webpack_exports__, "Try", function() { return Try; });
/* concated harmony reexport Type */__webpack_require__.d(__webpack_exports__, "Type", function() { return type["a" /* Type */]; });
/* concated harmony reexport UseIf */__webpack_require__.d(__webpack_exports__, "UseIf", function() { return UseIf; });
/* concated harmony reexport ValidateBool */__webpack_require__.d(__webpack_exports__, "ValidateBool", function() { return ValidateBool; });
/* concated harmony reexport ValidateEmail */__webpack_require__.d(__webpack_exports__, "ValidateEmail", function() { return ValidateEmail; });
/* concated harmony reexport ValidateHtml */__webpack_require__.d(__webpack_exports__, "ValidateHtml", function() { return ValidateHtml; });
/* concated harmony reexport ValidateIntlPhone */__webpack_require__.d(__webpack_exports__, "ValidateIntlPhone", function() { return ValidateIntlPhone; });
/* concated harmony reexport ValidateNumber */__webpack_require__.d(__webpack_exports__, "ValidateNumber", function() { return ValidateNumber; });
/* concated harmony reexport ValidateText */__webpack_require__.d(__webpack_exports__, "ValidateText", function() { return ValidateText; });
/* concated harmony reexport ValidateUrl */__webpack_require__.d(__webpack_exports__, "ValidateUrl", function() { return ValidateUrl; });
/* concated harmony reexport ValidateUsPhone */__webpack_require__.d(__webpack_exports__, "ValidateUsPhone", function() { return ValidateUsPhone; });
/* concated harmony reexport ValidateUsZip */__webpack_require__.d(__webpack_exports__, "ValidateUsZip", function() { return ValidateUsZip; });
/* concated harmony reexport WasClickedOn */__webpack_require__.d(__webpack_exports__, "WasClickedOn", function() { return WasClickedOn; });
/* concated harmony reexport WhenAvailable */__webpack_require__.d(__webpack_exports__, "WhenAvailable", function() { return when_available["a" /* WhenAvailable */]; });
/* concated harmony reexport Promise */__webpack_require__.d(__webpack_exports__, "Promise", function() { return polyfills_promise["Promise"]; });
/** COMPONENTS */


// export { CollapseMenu } from './components/collapse-menu/index.js'
// export { ContentCollapse } from './components/content-collapse/index.js'
// // export { ContentDrawer } from './components/content-drawer/index.js'
// export { ContentTransition } from './components/content-transition/index.js'
// export { CookieMessage } from './components/cookie-message/index.js'
// export { DropDown } from './components/drop-down/index.js'
// export { EffectBounceZ } from './components/effect-bounce-z/index.js'
// // export { EffectFade } from './components/effect-fade/index.js'
// // export { EffectRipple } from './components/effect-ripple/index.js'
// // export { EffectScale } from './components/effect-scale/index.js'
// // export { EffectUnderline } from './components/effect-underline/index.js'

// // export { HorizontalSlider } from './components/horizontal-slider/index.js'
// export { IconElement } from './components/icon-element/index.js'
// // export { ImageLoader } from './components/image-loader/index.js'
// export { InputBool } from './components/input-bool/index.js'
// // export { InputFile } from './components/input-file/index.js'
// export { InputField } from './components/input-field/index.js'
// export { InputSelect } from './components/input-select/index.js'
// export { OverlayContent } from './components/overlay-content/index.js'
// // export { OverlayMessage } from './components/overlay-message/index.js'
// // export { ProgressBar } from './components/progress-bar/index.js'
// export { SpinnerElement } from './components/spinner-element/index.js'
// export { SnackBar } from './components/snack-bar/index.js'

/** COMPONENT BUILD */



/** SERVICES */













/** UTILS */






















































































































































/** POLYFILLS */


/***/ }),
/* 69 */,
/* 70 */
/***/ (function(module, exports) {

module.exports = "<div class=grid-layout-container> <slot name=grid-layout-item></slot> </div> ";

/***/ })
/******/ ]);
});