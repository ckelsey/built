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
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
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
/* 11 */,
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
/* 13 */,
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
/* 15 */,
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
/* 18 */,
/* 19 */,
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
/* 21 */,
/* 22 */,
/* 23 */,
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
/* 30 */,
/* 31 */,
/* 32 */,
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
/* 36 */,
/* 37 */,
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
/* 43 */,
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
/* 45 */,
/* 46 */,
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
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
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
/* 59 */,
/* 60 */,
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
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(58);


/***/ })
/******/ ]);
});