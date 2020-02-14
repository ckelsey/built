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
/******/ 	return __webpack_require__(__webpack_require__.s = 73);
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
/* 10 */,
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
/* 27 */,
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
/* 33 */,
/* 34 */,
/* 35 */,
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
/* 40 */,
/* 41 */,
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
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
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
/* 58 */,
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
/* 60 */,
/* 61 */,
/* 62 */,
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
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(59);


/***/ })
/******/ ]);
});