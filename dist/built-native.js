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
/******/ 	return __webpack_require__(__webpack_require__.s = 71);
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
/* 34 */,
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
/* 42 */,
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
/* 48 */,
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
/* 53 */,
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
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Properties; });
/* harmony import */ var _component_class_property_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51);
/* harmony import */ var _utils_pipe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _utils_to_bool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _utils_dispatch_event_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33);
/* harmony import */ var _utils_when_available_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
/* harmony import */ var _utils_set_style_rules_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(32);
/* harmony import */ var _utils_object_assign_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4);









const emptyFn = function () { }

function Properties(_properties) {
    const properties = Object(_utils_object_assign_js__WEBPACK_IMPORTED_MODULE_7__[/* ObjectAssign */ "a"])({}, Object.freeze(_properties || {}))

    if (!properties.class) {
        properties.class = _component_class_property_js__WEBPACK_IMPORTED_MODULE_0__[/* ComponentClassProperty */ "a"]
    }

    if (!properties.ready) {
        properties.ready = {
            format: function validationFn(val) { return Object(_utils_pipe_js__WEBPACK_IMPORTED_MODULE_1__[/* Pipe */ "a"])(_utils_to_bool_js__WEBPACK_IMPORTED_MODULE_2__[/* ToBool */ "a"], Object(_utils_if_invalid_js__WEBPACK_IMPORTED_MODULE_3__[/* IfInvalid */ "a"])(false))(val).value },
            onChange: function onReadyChange(_val, host) {
                host.setAttribute('ready', 'true')
                host.onReady(host)
                Object(_utils_dispatch_event_js__WEBPACK_IMPORTED_MODULE_4__[/* DispatchEvent */ "a"])(host, 'ready', host)
            }
        }
    }

    if (!properties.theme) {
        properties.theme = {
            format: function (val, host) { return typeof val === 'string' ? val : host.theme },
            onChange: function (val, host) {
                return Object(_utils_when_available_js__WEBPACK_IMPORTED_MODULE_5__[/* WhenAvailable */ "a"])(host, 'elements.theme')
                    .then(function (themeElement) { return Object(_utils_set_style_rules_js__WEBPACK_IMPORTED_MODULE_6__[/* SetStyleRules */ "a"])(themeElement, val) })
                    .catch(emptyFn)
            }
        }
    }

    if (!properties.outertheme) {
        properties.outertheme = {
            format: function (val, host) { return typeof val === 'string' ? val : host.theme },
            onChange: function (val, host) {
                return Object(_utils_when_available_js__WEBPACK_IMPORTED_MODULE_5__[/* WhenAvailable */ "a"])(host, 'elements.outertheme')
                    .then(function (themeElement) { return Object(_utils_set_style_rules_js__WEBPACK_IMPORTED_MODULE_6__[/* SetStyleRules */ "a"])(themeElement, val) })
                    .catch(emptyFn)
            }
        }
    }

    return properties
}

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuiltReadyEvent; });
function BuiltReadyEvent() {
    if (typeof (Event) === 'function') {
        return new CustomEvent('builtready')
    }

    const event = document.createEvent('Event')
    event.initEvent('builtready', true, true)
    return event
}

/***/ }),
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(76);


/***/ }),
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/component-build/native-support.js
var native_support = __webpack_require__(55);

// EXTERNAL MODULE: ./src/component-build/properties.js
var component_build_properties = __webpack_require__(56);

// EXTERNAL MODULE: ./src/utils/for-in.js
var for_in = __webpack_require__(9);

// EXTERNAL MODULE: ./src/utils/observer-unsubscribe.js
var observer_unsubscribe = __webpack_require__(35);

// EXTERNAL MODULE: ./src/utils/append-style-element.js
var append_style_element = __webpack_require__(50);

// CONCATENATED MODULE: ./src/component-build/set-shadow-root.js


function SetShadowRoot(host, name, template, shadowStyle, outerStyle) {
    const Template = document.createElement('template')
    Template.innerHTML = template

    const clone = document.importNode(Template.content, true)
    host.attachShadow({ mode: 'open' }).appendChild(clone)
    Object(append_style_element["a" /* AppendStyleElement */])(shadowStyle, host.shadowRoot, name + '-theme', 'theme')
    Object(append_style_element["a" /* AppendStyleElement */])(outerStyle, host, name + '-outerStyle', 'outertheme')
}
// CONCATENATED MODULE: ./src/component-build/class-constructor.js




function ClassConstructor(componentOptions) {
    const observedAttributes = Object.keys(componentOptions.properties)

    class Component extends HTMLElement {
        static get observedAttributes() { return observedAttributes }

        constructor() {
            const self = super()
            self.componentName = componentOptions.componentName
            self.componentId = ''
            self.state = {}
            self.elements = {}
            self.disconnectElements = function () { }
            SetShadowRoot(this, componentOptions.componentName, componentOptions.template, componentOptions.shadowStyle, componentOptions.outerStyle)
            return self
        }

        attributeChangedCallback(attrName, oldValue, newValue) { if (newValue !== oldValue) { this[attrName] = newValue } }

        connectedCallback() {
            componentOptions.onConnected(this)
        }

        disconnectedCallback() {
            Object(for_in["a" /* ForIn */])(function stateLoop(state) { state.complete() }, this.state, true)

            this.disconnectElements()
            Object(observer_unsubscribe["a" /* ObserverUnsubscribe */])(this)
            componentOptions.onDisconnected(this)
        }
    }

    if (componentOptions.formElement) {
        class FormElementComponent extends Component {
            static get formAssociated() { return true }

            constructor() {
                const self = super()
                try { self.internals_ = self.attachInternals() } catch (error) { }
            }

            get form() { return this.internals_.form }
        }

        return FormElementComponent
    }

    return Component
}
// EXTERNAL MODULE: ./src/utils/object-assign.js
var object_assign = __webpack_require__(4);

// CONCATENATED MODULE: ./src/component-build/elements.js



function Elements(_elements) {
    const elements = Object(object_assign["a" /* ObjectAssign */])({}, Object.freeze(_elements || {}))

    if (!elements.outertheme) {
        elements.outertheme = { selector: 'style.outertheme' }
    }

    if (!elements.theme) {
        elements.theme = { selector: 'style.theme' }
    }

    return elements
}
// EXTERNAL MODULE: ./src/services/on-next-frame.js
var on_next_frame = __webpack_require__(7);

// EXTERNAL MODULE: ./src/utils/observer.js
var observer = __webpack_require__(10);

// EXTERNAL MODULE: ./src/utils/equals.js
var equals = __webpack_require__(52);

// CONCATENATED MODULE: ./src/component-build/states.js




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

                if (!Object(equals["a" /* Equals */])(host.state[key].value, formattedValue)) {
                    host.state[key].next(formattedValue)
                }
            }
        })
    } catch (error) { }
}

function States(host, key, formatter, onChange, getter, setter) {
    Object(on_next_frame["a" /* OnNextFrame */])(function setStatePropertyNext() {
        if (typeof formatter !== 'function') { return }

        host.state[key] = Object(observer["a" /* Observer */])(formatter(host.getAttribute(key) || host[key], host))

        setProperty(host, key, formatter, getter, setter)

        if (typeof onChange !== 'function') { return }

        host.state[key].subscribe(function stateNext(val) { return onChange(val, host) })
    })
}
// EXTERNAL MODULE: ./src/utils/get.js
var get = __webpack_require__(2);

// EXTERNAL MODULE: ./src/utils/array-from.js
var array_from = __webpack_require__(27);

// EXTERNAL MODULE: ./src/utils/filter.js
var filter = __webpack_require__(43);

// CONCATENATED MODULE: ./src/component-build/create-elements.js







function CreateElements(host, elements) {
    const state = {}
    const results = {}

    function removeOld(el) {
        Object(observer_unsubscribe["a" /* ObserverUnsubscribe */])(el)

        const parent = Object(get["a" /* Get */])(el, 'parentNode', Object(get["a" /* Get */])(el, 'host'))
        if (!parent) { return }
        parent.removeChild(el)
    }

    function getEl(elementData, key) {
        let els

        if (key == 'outertheme') {
            els = Object(filter["a" /* Filter */])(function (child) { return child.className == 'outertheme' }, host.children)
        } else {
            els = Object(array_from["a" /* ArrayFrom */])(host.shadowRoot.querySelectorAll(elementData.selector))
        }

        return els.length > 1 ? els : els[0]
    }

    function elementsEach(elementData, key) {
        state[key] = Object(observer["a" /* Observer */])(getEl(elementData))

        Object.defineProperty(results, key, {
            get: function () {
                const el = getEl(elementData, key)

                if (el != state[key].value) {
                    state[key].next(el)
                }
                return el
            },
            set: function (value) {
                if (value !== state[key].value) {
                    state[key].next(value)
                }
            }
        })

        function newElState(newElement) {
            removeOld(state[key].previous)

            if (typeof elementData.onChange == 'function') {
                elementData.onChange(newElement, host)
            }
        }

        state[key].subscribe(newElState)
    }

    Object(for_in["a" /* ForIn */])(elementsEach, elements)

    return results
}
// EXTERNAL MODULE: ./src/utils/observe-event.js
var observe_event = __webpack_require__(44);

// EXTERNAL MODULE: ./src/utils/for-each.js
var for_each = __webpack_require__(5);

// EXTERNAL MODULE: ./src/services/id.js
var id = __webpack_require__(12);

// EXTERNAL MODULE: ./src/utils/observe-children.js
var observe_children = __webpack_require__(54);

// CONCATENATED MODULE: ./src/component-build/on-connected.js










function OnConnected(host) {
    let updateSlotsTimer

    function computedEach(value, key) {
        try { Object.defineProperty(host, key, value(host)) } catch (error) { }
    }

    function methodsEach(value, key) {
        host[key] = value(host)
    }

    function setPropFn(value, key) {
        return States(
            host,
            key,
            value.format,
            value.onChange,
            host.parameters.getters[key],
            host.parameters.setters[key]
        )
    }

    function finishConnectedFn() {
        host.parameters.onConnected(host)
        Object(on_next_frame["a" /* OnNextFrame */])(function () {
            host.ready = true
        })
    }

    function updateSlotted() {
        clearTimeout(updateSlotsTimer)

        const slotted = []

        function pushSlotted(child) { slotted.push(child) }
        function getAssigned(slot) { Object(for_each["a" /* ForEach */])(pushSlotted, slot.assignedNodes()) }

        Object(for_each["a" /* ForEach */])(getAssigned, host.shadowRoot.querySelectorAll('slot'))

        host.slotted$.next(slotted)
    }

    function slotChange(slot, index) {
        host.eventSubscriptions['slot-' + index] = Object(observe_event["a" /* ObserveEvent */])(slot, 'slotchange')
            .subscribe(function () {
                updateSlotsTimer = setTimeout(updateSlotted, 0)
            })
    }

    host.componentId = Object(id["a" /* ID */])()
    host.eventSubscriptions = {}

    if (host.parameters.observeSlots) {
        host.slotted$ = Object(observer["a" /* Observer */])([])
        Object(for_each["a" /* ForEach */])(slotChange, host.shadowRoot.querySelectorAll('slot'))
        updateSlotsTimer = setTimeout(updateSlotted, 0)
    }

    if (host.parameters.observeChildren) {
        host.children$ = Object(observe_children["a" /* ObserveChildren */])(host, true)
    }

    Object(for_in["a" /* ForIn */])(computedEach, host.parameters.computed)
    Object(for_in["a" /* ForIn */])(methodsEach, host.parameters.methods)


    Object(for_in["a" /* ForIn */])(setPropFn, host.parameters.properties)

    if (host.parameters.elements) {
        host.elements = CreateElements(host, host.parameters.elements)
    }

    Object(on_next_frame["a" /* OnNextFrame */])(finishConnectedFn)
}
// EXTERNAL MODULE: ./src/component-build/built-ready-event.js
var built_ready_event = __webpack_require__(57);

// CONCATENATED MODULE: ./src/component-build/create-native-component.js







function emptyFn() { }
function RegisterComponent(name, component) { return customElements.define(name, component) }
function OnDisconnected(host) { return host.parameters.onDisconnected(host) }

window.BuiltCreateComponent = function BuiltCreateComponent(componentOptions) {
    if (!componentOptions.componentName) { return }

    const properties = Object.freeze(Object(component_build_properties["a" /* Properties */])(componentOptions.properties))

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
window.BuiltCreateComponent.nativeSupport = native_support["a" /* nativeSupport */]
window.document.dispatchEvent(Object(built_ready_event["a" /* BuiltReadyEvent */])())

/***/ })
/******/ ]);
});