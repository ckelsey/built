(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["builtjs"] = factory();
	else
		root["builtjs"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Get; });
function Get(obj, path, emptyVal) {
  var modifyFn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (v) {
    return v;
  };

  /** If nothing to search, return */
  if (!obj) {
    return emptyVal;
  }
  /** The search array, initial search item being the source */


  var Path = [obj];
  /** Populate the search array */

  if (path && path.toString().split) {
    Path = [obj].concat(path.toString().split("."));
  }

  var result = Path.reduce(function (accumulator, currentValue) {
    /** If through reduce, accumulator comes out empty, stop */
    if (accumulator === undefined || accumulator === null) {
      return emptyVal;
    }
    /** If a function, call it */


    if (currentValue.indexOf(".") === -1 && currentValue.indexOf("(") > -1) {
      var reg = /\((.*?)\)/g.exec(currentValue);
      var argsString = reg[1];
      var args = argsString.split(",").map(function (arg) {
        return !isNaN(arg) ? parseFloat(arg) : arg.trim();
      } // if has quotes -> string, no? -> number, obj, whatever
      );
      var functionName = currentValue.split("(")[0];

      if (typeof accumulator[functionName] === "function") {
        return accumulator[functionName].apply(accumulator, args);
      }
    }

    return accumulator[currentValue];
  });
  /** If nothing was found return emptyVal */

  if (result === undefined || result === null) {
    return emptyVal;
  }

  return modifyFn(result);
}

/***/ }),
/* 1 */
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
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
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
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OnNextFrame; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);

var OnNextFrameKey = Symbol["for"]("builtjs.OnNextFrameKey");
var globalSymbols = Object.getOwnPropertySymbols(global);
var hasOnNextFrame = globalSymbols.indexOf(OnNextFrameKey) > -1;
var OnNextFrameQueueObject = {};
var OnNextFrameQueue = [];
var isRunning = false;
var frameTimer;
var timeout;

function RunOnNextFrame() {
  if (isRunning) {
    return;
  }

  isRunning = true;

  var runTasks = function runTasks(startTime) {
    cancelAnimationFrame(frameTimer);
    clearTimeout(timeout);

    var _loop = function _loop() {
      var id = OnNextFrameQueue.shift();

      if (OnNextFrameQueueObject[id]) {
        OnNextFrameQueueObject[id].resolve(OnNextFrameQueueObject[id].task());
        requestAnimationFrame(function () {
          return OnNextFrameQueueObject[id];
        });
      }
    };

    do {
      _loop();
    } while (performance.now() - startTime < 5 && OnNextFrameQueue.length);

    if (OnNextFrameQueue.length) {
      return frameTimer = requestAnimationFrame(function () {
        return timeout = setTimeout(function () {
          return runTasks(performance.now());
        });
      });
    } else {
      isRunning = false;
    }
  };

  runTasks(performance.now());
}

if (!hasOnNextFrame) {
  global[OnNextFrameKey] = function (task) {
    var resolve, reject;
    var promise = new Promise(function (res, rej) {
      resolve = res;
      reject = rej;
    });
    var id = Object(___WEBPACK_IMPORTED_MODULE_0__[/* ID */ "a"])();
    OnNextFrameQueueObject[id] = {
      task: task,
      promise: promise,
      resolve: resolve,
      reject: reject,
      id: id,
      cancel: function cancel() {
        OnNextFrameQueueObject[id] = null;
        delete OnNextFrameQueueObject[id];
      }
    };
    OnNextFrameQueue.push(id);
    RunOnNextFrame();
    return OnNextFrameQueueObject[id];
  };
}

var OnNextFrame = Object.freeze(global[OnNextFrameKey]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ID; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


var _marked =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(idGenerator);

/**
 * Generates a runtime unique ID
 * @generator
 * @yields { string }
 */
function idGenerator() {
  var index, objectIds, doHash, doId, objectId;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function idGenerator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = 0;
          objectIds = [];

          doHash = function doHash() {
            return "".concat((new Date().getTime() / 1000 | 0).toString(16), " xxxxxxxxxxxxxxxx").replace(/[x]/g, function () {
              return (Math.random() * 16 | 0).toString(16);
            });
          };

          doId = function doId(indx) {
            return "".concat(indx, " ").concat(doHash().toLowerCase()).split(" ").join("");
          };

        case 4:
          if (false) {}

          index = index + 1;
          objectId = doId(index);
          objectIds.push(objectId);
          _context.next = 10;
          return objectId;

        case 10:
          _context.next = 4;
          break;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var idIterator;
/**
 * Returns a runtime unique ID
 * @function ID
 * @return { string }
 */

function ID() {
  if (!idIterator) {
    idIterator = idGenerator();
  }

  return idIterator.next().value;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(25);

var iterableToArray = __webpack_require__(26);

var nonIterableSpread = __webpack_require__(27);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentStore; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* eslint-disable tree-shaking/no-side-effects-in-initialization */

var ComponentStoreKey = Symbol["for"]("builtjs.ComponentStore");
var globalSymbols = Object.getOwnPropertySymbols(global);
var hasComponentStore = globalSymbols.indexOf(ComponentStoreKey) > -1;

var getTag = function getTag(element) {
  return Object(___WEBPACK_IMPORTED_MODULE_0__[/* Get */ "a"])(element, "tagName", "").toLowerCase();
};

if (!hasComponentStore) {
  global[ComponentStoreKey] = {
    components: {},
    themes: {},
    theme: function theme(_theme, element) {
      return Object.keys(_theme).forEach(function (property) {
        return element[property] = _theme[property];
      });
    },
    addComponent: function addComponent(element) {
      var tag = getTag(element);

      if (tag === "") {
        return;
      }

      if (!global[ComponentStoreKey].components[tag]) {
        global[ComponentStoreKey].components[tag] = [];
      }

      global[ComponentStoreKey].components[tag].push(element);
      global[ComponentStoreKey].triggerTagSubscriptions(tag, element);

      if (global[ComponentStoreKey].themes[tag]) {
        Object.keys(global[ComponentStoreKey].themes[tag]).forEach(function (property) {
          return element[property] = global[ComponentStoreKey].themes[tag][property];
        });
      }
    },
    removeComponent: function removeComponent(element) {
      var tag = getTag(element);

      if (tag === "" || !global[ComponentStoreKey].components[tag]) {
        return;
      }

      var index = global[ComponentStoreKey].components[tag].indexOf(element);

      if (index === -1) {
        return;
      }

      global[ComponentStoreKey].components[tag].splice(index, 1);
    },
    addTheme: function addTheme(tag, theme) {
      global[ComponentStoreKey].themes[tag] = theme;

      if (!global[ComponentStoreKey].components[tag]) {
        return;
      }

      global[ComponentStoreKey].components[tag].forEach(function (element) {
        return global[ComponentStoreKey].theme(global[ComponentStoreKey].themes[tag], element);
      });
    },
    tagSubscriptions: {},
    triggerTagSubscriptions: function triggerTagSubscriptions(tag, data) {
      if (!global[ComponentStoreKey].tagSubscriptions[tag]) {
        return;
      }

      global[ComponentStoreKey].tagSubscriptions[tag].forEach(function (sub) {
        return sub(data);
      });
    },
    watchForTag: function watchForTag(tag, cb) {
      if (!global[ComponentStoreKey].tagSubscriptions[tag]) {
        global[ComponentStoreKey].tagSubscriptions[tag] = [];
      }

      global[ComponentStoreKey].tagSubscriptions[tag].push(cb);
      return function () {
        if (!global[ComponentStoreKey].tagSubscriptions[tag]) {
          return;
        }

        var indexToRemove;
        var i = global[ComponentStoreKey].tagSubscriptions[tag].length;

        while (indexToRemove === undefined && i) {
          i = i - 1;

          if (global[ComponentStoreKey].tagSubscriptions[tag][i] === cb) {
            indexToRemove = i;
          }
        }

        global[ComponentStoreKey].tagSubscriptions[tag].splice(indexToRemove, 1);
      };
    }
  };
}

var ComponentStore = Object.freeze(global[ComponentStoreKey]); // Object.defineProperty(ComponentStore, "instance", {
//     get: function () {
//         return global[ComponentStoreKey];
//     }
// })
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/utils/get.js
var utils_get = __webpack_require__(0);

// EXTERNAL MODULE: ./src/services/on-next-frame.js
var on_next_frame = __webpack_require__(2);

// CONCATENATED MODULE: ./src/utils/wc-when-property-ready.js


function WCwhenPropertyReady(host, path, isMethod) {
  var max = 1000;
  return new Promise(function (resolve, reject) {
    if (!host || !host.parentNode && !host.parentElement) {
      return reject({
        host: host,
        path: path
      });
    }

    var test = function test() {
      max = max - 1;
      var val = Object(utils_get["a" /* Get */])(host, path);

      if (!max) {
        return reject({
          host: host,
          path: path
        });
      }

      if (val === undefined || isMethod && typeof val !== "function") {
        return Object(on_next_frame["a" /* OnNextFrame */])(test);
      }

      return resolve(val);
    };

    test();
  });
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(3);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./src/utils/get-parent.js

function GetParent(element) {
  return Object(utils_get["a" /* Get */])(element, "parentNode", Object(utils_get["a" /* Get */])(element, "host", Object(utils_get["a" /* Get */])(element, "__shady_parent.host")), function (p) {
    return !!p & p.nodeName === "#document-fragment" ? Object(utils_get["a" /* Get */])(p, "host") : p;
  });
}
// CONCATENATED MODULE: ./src/utils/create-element.js



var fragment = document.createDocumentFragment();
var create_element_CreateElement = function CreateElement(obj) {
  var el = document.createElement(obj.tagName || "div");
  fragment.appendChild(el);
  Object.keys(obj).forEach(function (key) {
    if (key === "tagName") {
      return;
    }

    if (key === "eventSubscriptions") {
      var max = 1000;
      var events = obj.eventSubscriptions;

      var tryParent = function tryParent() {
        max = max - 1;
        var parent = GetParent(el);

        if (!parent && max) {
          if (max) {
            return Object(on_next_frame["a" /* OnNextFrame */])(tryParent);
          }
        }

        if (!el.eventSubscriptions) {
          el.eventSubscriptions = {};
        }

        Object.keys(events).forEach(function (eventKey) {
          if (typeof events[eventKey] === "function") {
            el.eventSubscriptions[eventKey] = events[eventKey]();
          }
        });
      };

      return tryParent();
    }

    if (["textContent", "innerHTML"].indexOf(key) > -1) {
      return el[key] = obj[key];
    }

    if (key === "children") {
      if (Array.isArray(obj[key])) {
        return obj[key].forEach(function (child) {
          return el.appendChild(CreateElement(child));
        });
      } else {
        return el.appendChild(CreateElement(obj[key]));
      }
    }

    if (["string", "number", "boolean"].indexOf(typeof_default()(obj[key])) > -1) {
      el.setAttribute(key, obj[key]);
    } else {
      el[key] = obj[key];
    }
  });
  return el;
};
// EXTERNAL MODULE: ./src/utils/id.js
var utils_id = __webpack_require__(4);

// CONCATENATED MODULE: ./src/utils/observer.js


function Observer(initialValue) {
  var noInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var onSubscribe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var values = Object.assign({}, {
    value: initialValue,
    errors: [],
    previousValue: undefined,
    updated: new Date().getTime(),
    subscriptions: {},
    isComplete: false
  });

  var destroy = function destroy() {
    Object.keys(values.subscriptions).forEach(function (subscriptionId) {
      return values.subscriptions[subscriptionId].unsubscribe();
    });
    Object.defineProperties(result, {
      value: {
        get: function get() {
          return undefined;
        }
      },
      previous: {
        get: function get() {
          return undefined;
        }
      },
      subscriptions: {
        get: function get() {
          return undefined;
        }
      },
      next: {
        value: function value() {}
      },
      error: {
        value: function value() {}
      },
      complete: {
        value: function value() {}
      },
      subscribe: {
        value: function value() {}
      },
      unsubscribe: {
        value: function value() {}
      }
    });
    values.isComplete = true;
  };

  var loop = function loop(key, val) {
    var valuesObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    Object.keys(values.subscriptions).forEach(function (subscriptionId) {
      var subscriptionFn = values.subscriptions[subscriptionId][key];

      if (typeof subscriptionFn !== "function") {
        return;
      }

      subscriptionFn(val, valuesObj, subscriptionId);
    });

    if (key === "complete") {
      destroy();
    }
  };

  var _unsubscribe = function unsubscribe(subscription) {
    return function () {
      values.subscriptions[subscription.id] = null;
      delete values.subscriptions[subscription.id];
    };
  };

  var result = {
    get isComplete() {
      return values.isComplete;
    },

    get value() {
      return values.value;
    },

    get previous() {
      return values.previousValue;
    },

    get subscriptions() {
      return values.subscriptions;
    },

    next: function next(v) {
      values = Object.assign({}, values, {
        value: v,
        previousValue: values.value,
        updated: new Date().getTime()
      });
      loop("next", values.value, values);
    },
    error: function error(err) {
      values = Object.assign({}, values, {
        errors: values.errors.concat([err]),
        updated: new Date().getTime()
      });
      loop("error", err, values);
    },
    complete: function complete() {
      loop("complete", values);
    },
    subscribe: function subscribe(next) {
      var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var complete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      var trace = function trace() {
        return new Error().stack;
      };

      var subscription = Object.assign({}, {
        next: next,
        error: error,
        complete: complete,
        id: Object(utils_id["a" /* ID */])(),
        trace: trace()
      });
      subscription.unsubscribe = _unsubscribe(subscription);
      values.subscriptions[subscription.id] = subscription;

      if (!noInit && values.value !== undefined && typeof subscription.next === "function") {
        subscription.next(values.value, values, subscription.id);
      }

      onSubscribe(subscription);
      return _unsubscribe(subscription);
    },
    unsubscribe: function unsubscribe(subscription) {
      if (!subscription || !subscription.id || !values.subscriptions[subscription.id]) {
        return;
      }

      return _unsubscribe(subscription);
    }
  };
  return result;
}


// CONCATENATED MODULE: ./src/utils/observe-exists.js

function ObserveExists(element) {
  var returnEmpty = function returnEmpty() {
    var _observer = Observer(false);

    Object(on_next_frame["a" /* OnNextFrame */])(function () {
      _observer.next(false);

      _observer.complete();
    });
    return _observer;
  };

  var initialParent = GetParent(element);

  if (!initialParent) {
    return returnEmpty();
  }

  var isRunning = false;
  var mObserver = new MutationObserver(function (e) {
    var elementIsRemoved = false;
    var ii = e.length;

    while (!elementIsRemoved && ii) {
      ii = ii - 1;
      var i = e[ii].removedNodes.length;

      while (!elementIsRemoved && i) {
        i = i - 1;
        elementIsRemoved = e[ii].removedNodes[i] === element;
      }
    }

    if (elementIsRemoved) {
      dispose();
    }
  });

  var startup = function startup() {
    if (!GetParent(element) || isRunning) {
      return;
    }

    isRunning = true;
    mObserver.observe(initialParent, {
      childList: true
    });
  };

  var observer = Observer(!!initialParent, undefined, startup);

  var shutDown = function shutDown() {
    return isRunning = false;
  };

  var dispose = function dispose() {
    shutDown();
    observer.next(false);
    observer.complete();
    mObserver.disconnect();
  };

  return observer;
}
// CONCATENATED MODULE: ./src/utils/observe-event.js

function ObserveEvent(element, eventName) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!element || !eventName) {
    return;
  }

  var isRunning = false;
  options = Object.assign({}, {
    preventDefault: false,
    stopPropagation: false,
    useCapture: true
  }, options);

  var isWindow = function isWindow() {
    return element && element.document && element.location && element.alert && element.setInterval;
  };

  var startup = function startup() {
    if (isRunning) {
      return;
    }

    isRunning = true;

    try {
      element.addEventListener(eventName, eventHandler, options.useCapture);
    } catch (error) {}
  };

  var observer = Observer(undefined, undefined, startup);

  var eventHandler = function eventHandler(event) {
    if (!observer || !observer.subscriptions || Object.keys(observer.subscriptions).length === 0) {
      return shutDown();
    }

    if (options.preventDefault) {
      event.preventDefault();
    }

    if (options.stopPropagation) {
      event.stopPropagation();
    }

    observer.next(event);
  };

  var shutDown = function shutDown() {
    try {
      element.removeEventListener(eventName, eventHandler, options.useCapture);
    } catch (error) {}

    isRunning = false;
  };

  var dispose = function dispose() {
    shutDown();
    observer.complete();

    try {
      exists();
    } catch (error) {}
  };

  var exists = isWindow() ? function () {} : ObserveExists(element).subscribe(function (exists) {
    return exists ? undefined : dispose();
  });
  startup();
  return observer;
}
// CONCATENATED MODULE: ./src/utils/pipe.js
/*
TODO - def has room for improvement. takes a little over 2.5x as long to run
*/
function PipeInnerFunctionReducer(result, currentFunction) {
  return typeof currentFunction !== "function" ? result : currentFunction(result);
}

function Pipe() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function PipeInnerFunction(value) {
    return functions.reduce(PipeInnerFunctionReducer, value);
  };
} // export function Pipe(...functions) {
//     return function PipeInnerFunction(value) {
//         return functions.reduce(
//             function PipeInnerFunctionReducer(result, currentFunction) {
//                 return typeof currentFunction !== `function` ?
//                     result :
//                     currentFunction(result)
//             },
//             value
//         )
//     }
// }
// CONCATENATED MODULE: ./src/utils/is-empty.js


/**
 * Determines if the value is empty, whether it's an empty array, object, string or is falsey
 * @function IsEmpty
 * @param {any} value 
 * @return {boolean} Whether or not the value is empty
 * @example
 * IsEmpty() // true
 * IsEmpty(`undefined`) // true
 * IsEmpty(``) // true
 * IsEmpty(false) // true
 * IsEmpty(`false`) // true
 * IsEmpty(`null`) // true
 * IsEmpty(null) // true
 * IsEmpty({}) // true
 * IsEmpty([]) // true
 * IsEmpty([`value`]) // false
 */
function IsEmpty(value) {
  return value === undefined || value === null || value === "" || Array.isArray(value) && value.length === 0 || typeof_default()(value).indexOf("object") > -1 && Object.keys(value).length === 0 || value === false || value === "false" || value === "undefined" || value === "null";
}
// CONCATENATED MODULE: ./src/utils/is-object.js


/**
 * Determines if the value is an object
 * @function IsObject
 * @param {any} value 
 * @return {boolean} Whether or not the value is an object
 * @example
 * IsObject() // false
 * IsObject(()=>{}) // false
 * IsObject(``) // false
 * IsObject(true) // false
 * IsObject(null) // false
 * IsObject(new Date()) // false
 * IsObject([]) // false
 * IsObject({}) // true
 */
function IsObject(value) {
  return typeof_default()(value).indexOf("object") > -1 && value !== null && !Array.isArray(value) && !(value instanceof Date);
}
// CONCATENATED MODULE: ./src/utils/reduce-filter.js
function ReduceFilter(predicateFunction) {
  return function ReduceFilterResult(result, current) {
    return predicateFunction(current) ? result.concat([current]) : result;
  };
}
// CONCATENATED MODULE: ./src/utils/is-non-collection.js


/**
 * Determines if a value is not a collection 
 * @function IsNonCollection
 * @param {any} value - The value to test
 * @return {boolean} Whether or not the value is a collection
 * @example
 * IsNonCollection({}) // false
 * IsNonCollection([]) // false
 * IsNonCollection(``) // true
 * IsNonCollection(1) // true
 * IsNonCollection(null) // true
 * IsNonCollection(undefined) // true
 * IsNonCollection(()=>{}) // true
 * IsNonCollection(true) // true
 */
var nonCollections = ["string", "number", "null", "undefined", "function", "boolean", "date"];
function IsNonCollection(value) {
  return nonCollections.indexOf(typeof_default()(value)) > -1 || value === null || value instanceof Date;
}
// CONCATENATED MODULE: ./src/utils/is-dom.js
/**
 * Determines if a value is a valid DOM element
 * @function IsDom
 * @param {any} value - The value to test
 * @return {boolean} If the value is a DOM element
 * @example
 * const element = document.createElement(`div`)
 * IsDom(element) // true
 * IsDom(`nope`) // false
 */
function IsDom(value) {
  return value instanceof Element || value instanceof Node;
}
// CONCATENATED MODULE: ./src/utils/is-date.js
/**
 * Determines if a value is or can be a valid date
 * @function IsDate
 * @param {any} value - The value to test
 * @return (boolean) If the value is a valid date
 * @example 
 * IsDate(`Mon Nov 18 2019 07:41:48 GMT-0800`).value // true
 * IsDate(`Not a date`).value // false
 */
function IsDate(value) {
  var tempValue = new Date(Date.parse(value));
  return tempValue !== "Invalid Date" && !isNaN(tempValue) && tempValue instanceof Date;
}
// CONCATENATED MODULE: ./src/utils/type.js


function Type(value) {
  return value === null ? "null" : IsNonCollection(value) ? typeof_default()(value) : IsDom(value) ? "dom" : Array.isArray(value) ? "array" : IsDate(value) ? "date" : IsObject(value) ? "object" : typeof thing === "undefined" ? "undefined" : typeof_default()(thing);
}
// CONCATENATED MODULE: ./src/utils/is-t-monad.js

/**
 * Determines if a value is a TMonad
 * @function IsTMonad
 * @param {any} value - The value to test
 * @return {boolean} Whether or not the value is a TMonad
 * @example
 * IsTMonad({}) // false
 * IsTMonad([]) // false
 * IsTMonad(``) // false
 * IsTMonad({
 *      value:``,
 *      valid: true,
 *      type: `string`
 * }) // true
 */

function IsTMonad(value) {
  if (IsEmpty(value) || !IsObject(value)) {
    return false;
  }

  var keysItShouldHave = [{
    key: "valid",
    type: "boolean"
  }, {
    key: "type",
    type: "string"
  }, {
    key: "value"
  }];
  return keysItShouldHave.reduce(ReduceFilter(function hasValue(keyObj) {
    return Object.prototype.hasOwnProperty.call(value, keyObj.key) && (!keyObj.type || Type(value[keyObj.key]) === keyObj.type);
  }), []).length === keysItShouldHave.length;
}
// CONCATENATED MODULE: ./src/utils/t-monad.js

function TMonad(value) {
  if (IsTMonad(value)) {
    return Object.assign({}, value, {
      type: Type(value.value)
    });
  }

  return {
    valid: true,
    value: value,
    type: Type(value),
    stringChanges: [],
    // not required
    stop: false // not required

  };
}
// CONCATENATED MODULE: ./src/utils/to-string.js

function ToString(value) {
  var stop = Object(utils_get["a" /* Get */])(value, "stop", false);

  if (stop) {
    return TMonad(value);
  }

  var result = TMonad(value);

  try {
    if (!!result.value || result.value === "") {
      result.value = result.value.toString();
      result.valid = typeof result.value === "string";
    } else {
      result.value = "";
      result.valid = false;
    }
  } catch (error) {
    result.valid = false;
  }

  result.type = Type(result.value);
  return result;
}
// CONCATENATED MODULE: ./src/utils/if-invalid.js

/**
 * Returns a function that then takes a TMonad. If that value is invalid, it returns the replacement instead
 * @function TMonad
 * @param {any} replacement - The value to be returned if the resulting funtion is invalid
 * @return {any} Either the original value or the replacement
 * @example
 * 
 * const ifInvalid = IfInvalid(`hey`)
 * const value = ToNumber(`hola`)
 * const result = ifInvalid(value).value // `hey`
 */

function IfInvalid(replacement) {
  /** Return a new function that takes a TMonad */
  return function IfInvalidInternal(value) {
    var result = TMonad(value);
    /** If the stop flag is true or the TMonad is valid, continue */

    if (result.stop || !!result.valid) {
      return result;
    }
    /** If not valid, return replacement */


    return TMonad(replacement);
  };
}
// CONCATENATED MODULE: ./src/utils/to-bool.js

function ToBool(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  switch (result.value) {
    case "0":
    case 0:
    case "off":
    case "false":
    case false:
      result.value = false;
      result.valid = true;
      break;

    case "1":
    case 1:
    case "on":
    case "true":
    case true:
      result.value = true;
      result.valid = true;
      break;

    default:
      result.value = false;
      result.valid = false;
      break;
  }

  result.type = Type(result.value);
  return result;
}
// CONCATENATED MODULE: ./src/utils/to-number.js

function ToNumber(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type === "string" && !IsEmpty(result.value)) {
    result.value = parseFloat(result.value);
  }

  result.type = Type(result.value);
  result.valid = !isNaN(result.value);
  return result;
}
// CONCATENATED MODULE: ./src/utils/stop-if-invalid.js

function StopIfInvalid(value) {
  var result = TMonad(value);

  if (!result.valid) {
    result.stop = true;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/do-uri.js

function DoURI(value) {
  var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var component = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  try {
    if (encode) {
      if (component) {
        result.value = encodeURIComponent(result.value);
      } else {
        result.value = encodeURI(result.value);
      }
    } else {
      if (component) {
        result.value = decodeURIComponent(result.value);
      } else {
        result.value = decodeURI(result.value);
      }
    }
  } catch (error) {
    result.valid = false;
  }

  result.type = Type(result.value);
  return result;
}
// CONCATENATED MODULE: ./src/utils/from-uri-component.js

function FromURIComponent(value) {
  return DoURI(value, false, true);
}
// CONCATENATED MODULE: ./src/utils/from-entities.js

function FromEntities(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type === "string" && !!result.value) {
    result.value = result.value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g, "\"").replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g, "'");
    result.valid = true;
  } else {
    result.valid = false;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/t-monad-update.js

function TMonadUpdate(tmonad, expectedType) {
  return Object.assign(tmonad, {
    type: Type(tmonad.value),
    valid: expectedType === "?" ? true : tmonad.type === expectedType // '?' signifies any

  });
}
// CONCATENATED MODULE: ./src/utils/to-plain-text.js

function ToPlainText(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type !== "string") {
    result = Pipe(ToString, StopIfInvalid, FromURIComponent, FromEntities)(result);
  } else {
    result = Pipe(FromURIComponent, FromEntities)(result);
  }

  return TMonadUpdate(result, "string", "ToPlainText");
}
// CONCATENATED MODULE: ./src/utils/to-regex.js

function ToRegex(string) {
  var result = TMonad(string);

  if (!result.value) {
    result.value = new RegExp("");
  } else if (typeof result.value.split !== "function" && typeof result.value === "object") {
    // already regex, clone
    result.value = new RegExp(result.value);
  } else if (typeof result.value === "string") {
    if (result.value.indexOf("/") === 0) {
      // regex that has been converted to string and needs to be prepared
      // split and make sure to remove empties(usually begining/end or if json escaped) for the join later
      var parts = result.value.split("/").filter(function (p) {
        return !!p;
      });
      var options = parts.pop();

      if (options.match(/[^gmisuy]/)) {
        // if anything other than standard flag, send back to regex
        parts.push(options);
        options = undefined;
      }

      result.value = new RegExp(parts.join("/"), options);
    } else {
      // proper first argument
      result.value = new RegExp(result.value);
    }
  }

  result.valid = true;
  result.type = "object";
  return result;
}
// CONCATENATED MODULE: ./src/utils/to-split-meta.js

function ToSplitMeta(string) {
  var delimeter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var match;
  var arr = [];
  var result = {
    value: string,
    stringChanges: []
  };

  try {
    if (!string || !delimeter && delimeter !== "") {
      return result;
    }

    delimeter = ToRegex(delimeter).value;
    var str = result.value ? result.value.toString() : "";

    if (delimeter.toString() === "/(?:)/") {
      return {
        value: str.split(""),
        stringChanges: []
      };
    }

    while ((match = ToRegex(delimeter).value.exec(str)) !== null) {
      var length = match.toString().length;
      var matched = {
        start: match.index,
        end: match.index + length,
        input: match.input,
        length: length,
        result: [],
        removed: match[0]
      };
      var first = matched.start !== 0 ? str.slice(0, matched.start) : "";
      var second = str.slice(matched.end);
      matched.result = [first, second];
      result.stringChanges.push(matched);
      arr.push(first);
      str = second;
    }

    arr.push(str);
    result.value = arr.filter(function (v) {
      return !!v;
    });
  } catch (error) {}

  return result;
}
// CONCATENATED MODULE: ./src/utils/to-split.js

function ToSplit(delimeter) {
  return function ToSplitInner(value) {
    var result = TMonad(value);

    if (result.stop) {
      return result;
    }

    if (result.type !== "string") {
      result = ToString(result);
    }

    var splat = ToSplitMeta(result.value, delimeter);

    if (typeof splat.value === "string") {
      result.valid = false;
      return TMonadUpdate(result, "array", "Split");
    }

    result.stringChanges = result.stringChanges.concat(splat.stringChanges);
    result.value = splat.value;
    return TMonadUpdate(result, "array", "Split");
  };
}
// CONCATENATED MODULE: ./src/utils/from-json.js

function FromJSON(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  try {
    result.value = JSON.parse(FromURIComponent(result.value).value);
    result.valid = true;
  } catch (error) {
    result.valid = false;
  }

  result.type = Type(result.value);

  if (["object", "array"].indexOf(result.type) > -1) {
    result.valid = true;
  }

  return result;
}
/* harmony default export */ var from_json = (FromJSON);
// CONCATENATED MODULE: ./src/utils/to-array.js

function ToArray(value) {
  var temp = TMonad(value);

  if (temp.stop) {
    return value;
  }

  var result = Array.isArray(temp.value) ? temp : typeof temp.value === "string" ? Pipe(ToPlainText, FromJSON)(temp) : temp;
  result.type = Type(result.value);
  result.valid = result.type === "array";
  return result;
}
// CONCATENATED MODULE: ./src/utils/to-map.js

function ToMap(fn) {
  return function (value) {
    var result = TMonad(value);

    if (result.stop) {
      return result;
    }

    var map = function map(v) {
      if (Type(v.value) !== "array") {
        v.valid = false;
        return v;
      }

      v.value = v.value.map(fn);
      return v;
    };

    return TMonadUpdate(Pipe(ToArray, StopIfInvalid, map)(result), "array", "Map");
  };
}
// CONCATENATED MODULE: ./src/utils/to-trim.js

function ToTrim(value) {
  var stop = Object(utils_get["a" /* Get */])(value, "stop", false);

  if (stop) {
    return TMonad(value);
  }

  var result = TMonad(value);

  try {
    result.value = result.value.trim();
  } catch (error) {}

  return result;
}
// CONCATENATED MODULE: ./src/utils/commas-to-array.js

function CommasToArray(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type === "array") {
    return result;
  }

  if (result.type === "undefined") {
    result.valid = false;
    return result;
  }

  var piped = Pipe(ToPlainText, ToSplit(","), ToMap(function (v) {
    return ToTrim(v).value;
  }))(result);
  return piped;
}
// CONCATENATED MODULE: ./src/utils/equals.js

function Equals(value1, value2) {
  var type = Type(value1);

  if (Type(value2) !== type) {
    return false;
  }

  if (IsNonCollection(value1)) {
    return value2 === value1;
  }

  if (type === "boolean" && value1 !== value2) {
    return false;
  }

  if (type === "array" && value1.length !== value2.length) {
    return false;
  }

  if (type === "object" && Object.keys(value1).length !== Object.keys(value2).length) {
    return false;
  }

  if (type === "object" && value1.constructor !== value2.constructor) {
    return false;
  }

  if (type === "date") {
    var d = value1 === value2;

    try {
      d = new Date(value1).getTime() === new Date(value2).getTime();
    } catch (error) {}

    return d;
  }

  if (type === "dom") {
    return value1.isEqualNode(value2);
  } // Start walking


  if (type === "array") {
    var len = value1.length;

    while (len--) {
      if (!Equals(value1[len], value2[len])) {
        return false;
      }
    }
  }

  if (type === "object") {
    var keys = Object.keys(value1);
    var _len = keys.length;

    while (_len--) {
      if (!Equals(value1[keys[_len]], value2[keys[_len]])) {
        return false;
      }
    }
  }

  return true;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(5);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// CONCATENATED MODULE: ./src/utils/to-filter.js

function ToFilter(predicate) {
  return function (value) {
    var result = TMonad(value);

    if (result.stop) {
      return result;
    }

    var filter = function filter(v) {
      v.value = v.value.filter(predicate);
      return v;
    };

    return TMonadUpdate(Pipe(ToArray, StopIfInvalid, filter)(result), "array", "Filter");
  };
}
// CONCATENATED MODULE: ./src/utils/component-class-object.js



var component_class_object_wcClass = function wcClass(el, newClasses, previousClasses) {
  if (!el) {
    return;
  }

  if (Array.isArray(el)) {
    el = el[0];
  }

  var oldBrowser = !window.DOMTokenList.prototype.replace;
  var newClassArray = Pipe(CommasToArray, IfInvalid([]))(newClasses).value;
  var previousClassArray = Pipe(CommasToArray, IfInvalid([]))(previousClasses).value;

  if (oldBrowser) {
    if (previousClassArray.length && !!el.className) {
      previousClassArray.forEach(function (c) {
        return el.className = el.className.split(c).map(function (cl) {
          return cl.trim();
        }).join("");
      });
    }

    if (newClassArray.length) {
      newClassArray.forEach(function (c) {
        return el.className = "".concat(el.className ? el.className : "", " ").concat(c);
      });
    }

    return;
  }

  if (previousClassArray.length) {
    var _el$classList;

    (_el$classList = el.classList).remove.apply(_el$classList, toConsumableArray_default()(previousClassArray));
  }

  if (newClassArray.length) {
    var _el$classList2;

    (_el$classList2 = el.classList).add.apply(_el$classList2, toConsumableArray_default()(newClassArray));
  }
};

var ComponentClassObject = {
  format: function format(val) {
    return Pipe(ToString, IfInvalid(""), ToSplit(" "), ToMap(function (v) {
      return v.trim();
    }), ToFilter(function (v) {
      return !!v;
    }))(val).value;
  },
  onChange: function onChange(val, host) {
    return component_class_object_wcClass(host.elements.root, val, host.state["class"].previous);
  }
};
// CONCATENATED MODULE: ./src/utils/set-style-rules.js
function SetStyleRules(styleElement, ruleString) {
  if (!styleElement || ruleString === undefined || ruleString === null || ruleString === "undefined" || ruleString === "null") {
    return;
  }

  if (styleElement.styleSheet) {
    // IE
    styleElement.styleSheet.cssText = "".concat(styleElement.styleSheet.cssText ? styleElement.styleSheet.cssText : "").concat(ruleString);
  } else {
    // the world
    styleElement.innerHTML = "";
    var tt1 = document.createTextNode(ruleString);
    styleElement.appendChild(tt1);
  }
}
// CONCATENATED MODULE: ./src/utils/observer-unsubscribe.js

/**
 * Looks for subscriptions in an object, DOM element or a subscription itself and unsubscribes.
 * @function ObserverUnsubscribe
 * @param {Object|HTMLElement|function()} subscription - An element that has or is a observer subscription. If is a DOM element, must be under `subscriptions` or `eventSubscriptions` properties
 * @return {void}
 */

function ObserverUnsubscribe(subscription) {
  if (!subscription) {
    return;
  }

  if (typeof subscription === "function") {
    return subscription();
  }

  if (Array.isArray(subscription)) {
    return subscription.forEach(function (current) {
      return typeof current === "function" ? current() : undefined;
    });
  }

  if (IsDom(subscription)) {
    var key = subscription.eventSubscriptions ? "eventSubscriptions" : "subscriptions";

    if (!subscription[key]) {
      return;
    }

    return Object.keys(subscription[key]).forEach(function (current) {
      return typeof subscription[key][current] === "function" ? subscription[key][current]() : undefined;
    });
  }

  if (IsObject(subscription)) {
    Object.keys(subscription).forEach(function (current) {
      return typeof subscription[current] === "function" ? subscription[current]() : undefined;
    });
  }
}
// CONCATENATED MODULE: ./src/utils/wc-elements.js


var wc_elements_removeOld = function removeOld(el) {
  var parent = Object(utils_get["a" /* Get */])(el, "parentNode", Object(utils_get["a" /* Get */])(el, "host"));

  if (!parent) {
    return;
  }

  parent.removeChild(el);
};

function WCElements(host, elements) {
  var elStates = {};
  var state = {};
  var elCache = {};

  var getEl = function getEl(key) {
    var get = function get() {
      var els = host.shadowRoot.querySelectorAll(elements[key].selector);
      var result = els.length > 1 ? Array.from(els) : els[0];
      state[key] = result;
      return result;
    };

    if (elCache[key]) {
      Object(on_next_frame["a" /* OnNextFrame */])(get);
      return elCache[key];
    }

    return get();
  };

  Object.keys(elements).forEach(function (key) {
    elStates[key] = Observer(getEl(key));
    Object.defineProperty(state, key, {
      get: function get() {
        return elStates[key].value;
      },
      set: function set(value) {
        if (value !== elStates[key].value) {
          elStates[key].next(value);
        }
      }
    });
    elStates[key].subscribe(function (newElement) {
      ObserverUnsubscribe(elStates[key].previous);
      wc_elements_removeOld(elStates[key].previous);

      if (typeof elements[key].onChange === "function") {
        elements[key].onChange(newElement, host);
      }
    });
  });
  return {
    state: state,
    disconnect: function disconnect() {
      return Object.keys(elStates).forEach(function (key) {
        var el = host.elements[key];
        elStates[key].complete();

        if (el) {
          ObserverUnsubscribe(el);
        }
      });
    }
  };
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(20);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(14);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(9);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(8);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(15);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(16);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/wrapNativeSuper.js
var wrapNativeSuper = __webpack_require__(21);
var wrapNativeSuper_default = /*#__PURE__*/__webpack_require__.n(wrapNativeSuper);

// CONCATENATED MODULE: ./src/utils/append-style-element.js

/**
 * Appends a style element with the provided rules to a provided element
 * @function AppendStyleElement
 * @param {string} rulesString - The rules to add to the style element
 * @param {HTMLElement} parent - The element to append to
 * @param {string} name - Optional. A name to give the style element
 * @example
 * AppendStyleElement(`.selector { color: black;}`, document.head, `dark-text-n-stuff`)
 */

function AppendStyleElement(rulesString, parent, name, classes) {
  if (!parent || !rulesString) {
    return;
  }
  /** First create and add the style element */


  var style = create_element_CreateElement({
    tagName: "style",
    type: "text/css",
    style: "display:none;",
    "class": classes,
    name: name
  }, true);
  parent.appendChild(style);
  /** Then set the rules */

  SetStyleRules(style, rulesString);
  return style;
}
// CONCATENATED MODULE: ./src/utils/set-shadow-root.js

function SetShadowRoot(options) {
  var componentName = options.componentName,
      element = options.element,
      template = options.template,
      style = options.style,
      outerStyle = options.outerStyle;
  var Template = document.createElement("template");
  Template.innerHTML = template;
  var clone = document.importNode(Template.content, true);
  element.attachShadow({
    mode: "open"
  }).appendChild(clone);
  AppendStyleElement(style, element.shadowRoot, "".concat(componentName, "-componentStyle"), "componentStyle");
  AppendStyleElement(" ", element.shadowRoot, "".concat(componentName, "-themeStyles"), "themeStyles");
  AppendStyleElement(" ", element.shadowRoot, "".concat(componentName, "-injectedStyles"), "injectedStyles");

  if (outerStyle) {
    AppendStyleElement(outerStyle, element, "".concat(componentName, "-outerStyle"), "outerStyle");
  }

  if (!("registerElement" in document) && !document.head.querySelector("style[name=\"".concat(componentName, "\"]"))) {
    AppendStyleElement(style, document.head, componentName);
  }
}
// EXTERNAL MODULE: ./src/services/componentStore.js
var componentStore = __webpack_require__(6);

// CONCATENATED MODULE: ./src/utils/wc-class.js










function WCClass(componentName, template, style, outerStyle, observedAttributes, ConnectedFn, onDisconnected, formElement) {
  var ComponentClass =
  /*#__PURE__*/
  function (_HTMLElement) {
    inherits_default()(ComponentClass, _HTMLElement);

    createClass_default()(ComponentClass, null, [{
      key: "observedAttributes",
      get: function get() {
        return observedAttributes;
      }
    }]);

    function ComponentClass() {
      var _this;

      classCallCheck_default()(this, ComponentClass);

      var self = _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(ComponentClass).call(this));

      self.wcID = "";
      self.state = {};
      self.elements = {};

      self.disconnectElements = function () {};

      SetShadowRoot({
        componentName: componentName,
        template: template,
        style: style,
        outerStyle: outerStyle,
        element: self
      });

      try {
        self.internals_ = self.attachInternals();
      } catch (error) {}

      return possibleConstructorReturn_default()(_this, self);
    }

    createClass_default()(ComponentClass, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attrName, oldValue, newValue) {
        if (newValue !== oldValue) {
          this[attrName] = newValue;
        }
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        componentStore["a" /* ComponentStore */].addComponent(this);
        ConnectedFn(this);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _this2 = this;

        componentStore["a" /* ComponentStore */].removeComponent(this);

        if (this.state) {
          Object.keys(this.state).forEach(function (key) {
            _this2.state[key].complete();
          });
        }

        this.disconnectElements();
        ObserverUnsubscribe(this);

        if (onDisconnected) {
          onDisconnected(this);
        }
      }
    }, {
      key: "form",
      get: function get() {
        return this.internals_.form;
      }
    }]);

    return ComponentClass;
  }(wrapNativeSuper_default()(HTMLElement));

  if (formElement) {
    var FormElementComponent =
    /*#__PURE__*/
    function (_ComponentClass) {
      inherits_default()(FormElementComponent, _ComponentClass);

      function FormElementComponent() {
        var _this3;

        classCallCheck_default()(this, FormElementComponent);

        var self = _this3 = possibleConstructorReturn_default()(this, getPrototypeOf_default()(FormElementComponent).call(this));

        try {
          self.internals_ = self.attachInternals();
        } catch (error) {}

        return _this3;
      }

      return FormElementComponent;
    }(ComponentClass);

    defineProperty_default()(FormElementComponent, "formAssociated", true);

    return FormElementComponent;
  }

  return ComponentClass;
}
// CONCATENATED MODULE: ./src/utils/wc-constructor.js


/** Does not actually mutate anything, tho itself gets mutated across setting styles, properties, etc */

var wc_constructor_setProperty = function setProperty(host, key, formatter, getter, setter) {
  try {
    Object.defineProperty(host, key, {
      get: function get() {
        if (typeof getter === "function") {
          return getter(host);
        }

        return host.state[key].value;
      },
      set: function set(value) {
        if (!host.state[key]) {
          return;
        }

        if (typeof setter === "function") {
          return setter(host)(value);
        }

        var formattedValue = formatter(value, host);
        var previous = host.state[key].value;

        if (typeof previous === "function" && typeof formattedValue === "function" && formattedValue.toString() !== previous.toString()) {
          return host.state[key].next(formattedValue);
        }

        if (!Equals(host.state[key].value, formattedValue)) {
          host.state[key].next(formattedValue);
        }
      }
    }); // eslint-disable-next-line no-empty
  } catch (error) {}
};

var wc_constructor_setStateProperty = function setStateProperty(host, key, formatter, onChange, getter, setter) {
  Object(on_next_frame["a" /* OnNextFrame */])(function () {
    if (typeof formatter !== "function") {
      return;
    }

    host.state[key] = Observer(formatter(host[key], host));
    wc_constructor_setProperty(host, key, formatter, getter, setter);

    if (typeof onChange !== "function") {
      return;
    }

    host.state[key].subscribe(function (val) {
      return onChange(val, host);
    });
  });
};

function WCConstructor(options) {
  var componentName = options.componentName,
      _options$computed = options.computed,
      computed = _options$computed === void 0 ? {} : _options$computed,
      _options$elements = options.elements,
      elements = _options$elements === void 0 ? {} : _options$elements,
      _options$getters = options.getters,
      getters = _options$getters === void 0 ? {} : _options$getters,
      _options$methods = options.methods,
      methods = _options$methods === void 0 ? {} : _options$methods,
      _options$onConnected = options.onConnected,
      onConnected = _options$onConnected === void 0 ? function () {} : _options$onConnected,
      _options$onDisconnect = options.onDisconnected,
      onDisconnected = _options$onDisconnect === void 0 ? function () {} : _options$onDisconnect,
      _options$onReady = options.onReady,
      onReady = _options$onReady === void 0 ? function () {} : _options$onReady,
      _options$properties = options.properties,
      properties = _options$properties === void 0 ? {} : _options$properties,
      _options$setters = options.setters,
      setters = _options$setters === void 0 ? {} : _options$setters,
      _options$style = options.style,
      style = _options$style === void 0 ? "" : _options$style,
      outerStyle = options.outerStyle,
      _options$template = options.template,
      template = _options$template === void 0 ? "<slot></slot>" : _options$template,
      _options$formElement = options.formElement,
      formElement = _options$formElement === void 0 ? false : _options$formElement;

  if (!componentName) {
    return;
  }

  var propertyKeys = Object.keys(properties);
  options.observedAttributes = options.observedAttributes || propertyKeys;
  properties["class"] = ComponentClassObject;
  properties["outertheme"] = {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      var styleEl = host.querySelector("style.outertheme");

      if (!styleEl) {
        styleEl = create_element_CreateElement({
          tagName: "style",
          "class": "outertheme",
          name: "outertheme",
          style: "display:none;"
        });
        host.appendChild(styleEl);
      }

      SetStyleRules(styleEl, val);
    }
  };
  properties["styles"] = {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return WCwhenPropertyReady(host, "elements.injectedStyles").then(function (stylesElement) {
        return SetStyleRules(stylesElement, val);
      })["catch"](function () {});
    }
  };
  properties["theme"] = {
    format: function format(val, host) {
      return typeof val === "string" ? val : host.theme;
    },
    onChange: function onChange(val, host) {
      return WCwhenPropertyReady(host, "elements.theme").then(function (themeElement) {
        return SetStyleRules(themeElement, val);
      })["catch"](function () {});
    }
  };
  options.observedAttributes.push("class");
  options.observedAttributes.push("styles");
  options.observedAttributes.push("theme");
  options.observedAttributes.push("outertheme");
  elements["injectedStyles"] = {
    selector: "style.injectedStyles"
  };
  elements["theme"] = {
    selector: "style.themeStyles"
  };
  elements["componentStyle"] = {
    selector: "style.componentStyle"
  };
  var observedAttributes = options.observedAttributes;

  var ConnectedFn = function ConnectedFn(element) {
    Object(on_next_frame["a" /* OnNextFrame */])(function () {
      element.wcID = Object(utils_id["a" /* ID */])();

      element.unsubscribeEvents = function () {
        return ObserverUnsubscribe(element);
      };

      Object.keys(computed).forEach(function (key) {
        try {
          Object.defineProperty(element, key, computed[key](element));
        } catch (error) {}
      });
      Object.keys(methods).forEach(function (key) {
        return element[key] = methods[key](element);
      });

      if (elements) {
        var ElementData = WCElements(element, elements);
        element.elements = ElementData.state;
        element.disconnectElements = ElementData.disconnect;
      }

      if (!properties.ready) {
        wc_constructor_setStateProperty(element, "ready", function (val) {
          return Pipe(ToBool, IfInvalid(false))(val).value;
        }, function () {}, getters.ready, setters.ready);
      }

      Object.keys(properties).forEach(function (key) {
        return wc_constructor_setStateProperty(element, key, properties[key].format, properties[key].onChange, getters[key], setters[key]);
      });
      Object(on_next_frame["a" /* OnNextFrame */])(function () {
        element["ready"] = true;
        onReady(element);
        onConnected(element); // check - when should events go off?

        element.dispatchEvent(new CustomEvent("ready", {
          detail: element
        }));
      });
    });
  };

  var componentClass = WCClass(componentName, template, style, outerStyle, observedAttributes, ConnectedFn, onDisconnected, formElement);

  function newComponentObject() {
    return function (element) {
      element.observedAttributes = observedAttributes.slice();
      element.state = {};
      element.elements = {};

      element.disconnectElements = function () {};

      element.attributeChangedCallback = function () {};

      element.disconnectedCallback = function () {};

      SetShadowRoot({
        componentName: componentName,
        template: template,
        style: style,
        outerStyle: outerStyle,
        element: element
      });
      ConnectedFn(element);
      return element;
    };
  }
  /** TODO - to provide support for old ass browsers eventually */


  var object = newComponentObject();
  return {
    object: object,
    component: componentClass
  };
}
// CONCATENATED MODULE: ./src/utils/try.js
function Try(fn) {
  return function TryInner() {
    try {
      return fn.apply(null, arguments);
    } catch (error) {}
  };
}
// CONCATENATED MODULE: ./src/utils/observe-slots.js


function ObserveSlots(element) {
  var mustHaveSlotAttribute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var propsToWatch = arguments.length > 2 ? arguments[2] : undefined;

  var returnEmpty = function returnEmpty() {
    var _observer = Observer(false);

    Object(on_next_frame["a" /* OnNextFrame */])(function () {
      _observer.next(false);

      _observer.complete();
    });
    return _observer;
  };

  if (!element) {
    return returnEmpty();
  }

  var observer = Observer();
  var exists = ObserveExists(element).subscribe(function (exists) {
    return exists ? undefined : dispose();
  });

  var newSlots = function newSlots() {
    var added = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var removed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return added.length || removed.length ? observer.next({
      added: added,
      removed: removed
    }) : undefined;
  };

  var slotObserver = new MutationObserver(function (mutationsList) {
    var added = [];
    var removed = [];
    var props = {};
    var list = Array.from(mutationsList);
    var len = list.length;
    propsToWatch.forEach(function (prop) {
      return props[prop] = [];
    });

    while (len--) {
      if (list[len].type === "childList" && (list[len].addedNodes.length || list[len].removedNodes.length)) {
        if (mustHaveSlotAttribute) {
          list[len].addedNodes.forEach(function (a) {
            return a.getAttribute("slot") ? added.push(a) : undefined;
          });
          list[len].removedNodes.forEach(function (r) {
            return r.getAttribute("slot") ? removed.push(r) : undefined;
          });
        } else {
          list[len].addedNodes.forEach(function (a) {
            return added.push(a);
          });
          list[len].removedNodes.forEach(function (r) {
            return removed.push(r);
          });
        }
      }
    }

    newSlots(added, removed);
  });

  var dispose = function dispose() {
    try {
      exists;
    } catch (error) {}

    observer.complete();
    slotObserver.disconnect();
  };

  slotObserver.observe(element, Object.assign({
    childList: true
  }, propsToWatch));
  return observer;
}
// CONCATENATED MODULE: ./src/utils/polyfill-object-assign.js
function PolyfillObjectAssign() {
  if (typeof Object.assign !== "function") {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target) {
        // .length of function is 2
        'use strict';

        if (target === null || target === undefined) {
          throw new TypeError("Cannot convert undefined or null to object");
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource !== null && nextSource !== undefined) {
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }

        return to;
      },
      writable: true,
      configurable: true
    });
  }
}
// CONCATENATED MODULE: ./src/utils/polyfill-mutation-observer.js

function PolyfillMutationObserver(w) {
  (function () {
    if (w.MutationObserver !== null && w.MutationObserver !== undefined) {
      return;
    }

    w.MutationObserver = function (cb) {
      this.callBack = cb;
      return this;
    };

    w.MutationObserver.prototype.observe = function (element) {
      var _this = this;

      var cb = this.callBack;
      var oldHtml;

      var func = function func() {
        var html = element.innerHTML;

        if (html !== oldHtml) {
          oldHtml = html;
          return cb.apply(null);
        }

        _this.interval = Object(on_next_frame["a" /* OnNextFrame */])(func);
      };

      func();
    };

    w.MutationObserver.prototype.disconnect = function () {
      return this.interval.cancel();
    };
  }).call(this);
}
// CONCATENATED MODULE: ./src/utils/polyfill-wc.js
var setBUIltComponents = function setBUIltComponents(w) {
  return w.bUIltComponents ? undefined : w.bUIltComponents = {};
};

var setBUIltComponentsListener = function setBUIltComponentsListener(w) {
  if (!w.bUIltComponents.listener) {
    w.bUIltComponents.listener = new w.MutationObserver(function () {
      Object.keys(w.bUIltComponents).forEach(function (key) {
        Array.from(document.body.querySelectorAll(key)).forEach(function (el) {
          if (!el.ready) {
            w.bUIltComponents[key](el);
          }
        });
      });
    });
    w.bUIltComponents.listener.observe(document.body);
  }
};

function PolyFillWC(w, componentName, componentClass) {
  setBUIltComponents(w);

  if (w.bUIltComponents[componentName]) {
    return;
  }

  setBUIltComponentsListener(w);
  w.bUIltComponents[componentName] = componentClass;
}
// CONCATENATED MODULE: ./src/utils/wc-define.js

function WCDefine(componentName, componentClass) {
  var wc = window.WebComponents;
  var ce = window.customElements;

  var defineComponent = function defineComponent() {
    if (!ce) {
      PolyfillObjectAssign();
      PolyfillMutationObserver(window);
      return PolyFillWC(window, componentName, componentClass.object);
    }

    if (!ce.get(componentName)) {
      ce.define(componentName, componentClass.component);
    }
  };

  if (wc && wc.ready) {
    defineComponent();
  } else {
    window.addEventListener("WebComponentsReady", function () {
      defineComponent();
    });
  }
}
// CONCATENATED MODULE: ./src/components/ajax-form/index.js

var defaultWidth = 240;
var defaultGap = [16, 16];

var ajax_form_template = __webpack_require__(22);

var ajax_form_componentName = "ajax-form";
var componentRoot = ".".concat(ajax_form_componentName, "-container");

var ajax_form_outerStyle = __webpack_require__(23).toString();

var ajax_form_setAttribute = function setAttribute(host, val, name, elKey) {
  return WCwhenPropertyReady(host, "elements.".concat(elKey)).then(function (el) {
    return el[val ? "setAttribute" : "removeAttribute"](name, val);
  });
};

var submitForm = function submitForm(host) {
  return host.elements.form.dispatchEvent(new Event("submit"));
};

var ajax_form_getFormData = function getFormData(host) {
  var newForm = create_element_CreateElement({
    tagName: "form",
    action: host.action,
    method: host.method,
    name: host.name,
    style: "position:fixed;top:0;left:0;pointer-events:none;opacity:0;"
  });
  Array.from(host.querySelectorAll("input")).forEach(function (input) {
    return newForm.appendChild(create_element_CreateElement({
      tagName: "input",
      autocomplete: input.autocomplete,
      value: input.value,
      type: input.type,
      name: input.name || input.autocomplete || input.type
    }));
  });
  document.body.appendChild(newForm);
  var data = {};
  var formData = new FormData(newForm);
  formData.forEach(function (value, key) {
    data[key] = value;
  });
  host.dispatchEvent(new CustomEvent("submitdata", {
    detail: data
  }));
  Object(on_next_frame["a" /* OnNextFrame */])(function () {
    return document.body.removeChild(newForm);
  }); // newForm.addEventListener(`submit`, e => {
  //     e.preventDefault()
  //     const data = {}
  //     const formData = new FormData(newForm)
  //     formData.forEach((value, key) => { data[key] = value })
  //     if (!host.request) {
  //         host.dispatchEvent(new CustomEvent(`submitdata`, { detail: data }))
  //         OnNextFrame(() => document.body.removeChild(newForm))
  //         return false
  //     }
  //     const xhr = new XMLHttpRequest()
  //     xhr.open(host.method, host.action)
  //     xhr.setRequestHeader(`Content-Type`, host.contenttype)
  //     xhr.addEventListener(`load`, () => {
  //         host.dispatchEvent(new CustomEvent(`response`, { detail: xhr }))
  //         return host.reload ? location.reload() : undefined
  //     })
  //     xhr.send(JSON.stringify(data))
  //     OnNextFrame(() => document.body.removeChild(newForm))
  //     return false
  // })
  // newForm.dispatchEvent(new Event(`submit`))
};

var ajax_form_elements = {
  root: {
    selector: componentRoot
  },
  grid: {
    selector: ".".concat(ajax_form_componentName, "-grid")
  },
  form: {
    selector: ".".concat(ajax_form_componentName, "-form"),
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        submit: ObserveEvent(el, "submit", {
          preventDefault: true
        }).subscribe(function (e) {
          e.preventDefault();
          ajax_form_getFormData(host);
        })
      };
    }
  }
};
var ajax_form_properties = {
  action: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("/"))(val).value;
    },
    onChange: function onChange(val, host) {
      return ajax_form_setAttribute(host, val, "action", "form");
    }
  },
  method: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("POST"))(val).value;
    },
    onChange: function onChange(val, host) {
      return ajax_form_setAttribute(host, val, "method", "form");
    }
  },
  name: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      return ajax_form_setAttribute(host, val, "name", "form");
    }
  },
  request: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    }
  },
  reload: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    }
  },
  contenttype: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("application/json"))(val).value;
    }
  },
  scaletofit: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(val, host) {
      return ajax_form_setAttribute(host, val, "scaletofit", "grid");
    }
  },
  columnwidth: {
    format: function format(val) {
      return val === "100%" ? val : Pipe(ToNumber, IfInvalid(defaultWidth))(val).value;
    },
    onChange: function onChange(val, host) {
      return ajax_form_setAttribute(host, val, "columnwidth", "grid");
    }
  },
  gap: {
    format: function format(val) {
      return Pipe(CommasToArray, IfInvalid([val, val]), ToMap(function (v) {
        var tv = ToNumber(v).value;

        if (isNaN(tv)) {
          return defaultGap[0];
        }

        return tv;
      }))(val).value;
    },
    onChange: function onChange(val, host) {
      return ajax_form_setAttribute(host, val, "gap", "grid");
    }
  }
};
var AjaxForm = WCConstructor({
  componentName: ajax_form_componentName,
  componentRoot: componentRoot,
  template: ajax_form_template,
  outerStyle: ajax_form_outerStyle,
  properties: ajax_form_properties,
  observedAttributes: Object.keys(ajax_form_properties),
  elements: ajax_form_elements,
  onConnected: function onConnected(host) {
    var wrap = function wrap(el) {
      return WCwhenPropertyReady(host, "elements.grid").then(function (appendTo) {
        var tagName = Object(utils_get["a" /* Get */])(el, "tagName.toLowerCase()");
        var isInput = tagName === "input-field";
        var isBtn = tagName === "button-element";
        var isSubmit = isBtn && el.type === "submit";
        var id = Object(utils_id["a" /* ID */])();
        var wrapper = create_element_CreateElement({
          tagName: "div",
          "class": ".".concat(ajax_form_componentName, "-slot-wrapper"),
          id: id
        });
        var slot = create_element_CreateElement({
          tagName: "slot",
          name: id
        });

        if (isSubmit) {
          el.eventSubscriptions = {
            click: ObserveEvent(el, "click").subscribe(function () {
              return submitForm(host);
            })
          };
        } else if (isInput) {
          el.eventSubscriptions = {
            done: ObserveEvent(el, "done").subscribe(function () {
              return submitForm(host);
            })
          };
        }

        el.slot = id;
        el.container = wrapper;
        wrapper.appendChild(slot);
        appendTo.appendChild(wrapper);
      });
    };

    var removeEl = function removeEl() {
      return Try(function (el) {
        Object(utils_get["a" /* Get */])(el, "container.parentElement").removeChild(el.container);
      });
    };

    var unsubscribeEl = function unsubscribeEl() {
      return Try(function (el) {
        ObserverUnsubscribe(el);
      });
    };

    var unwrap = function unwrap(el) {
      unsubscribeEl(el);
      removeEl(el);
    };

    host.eventSubscriptions = {
      slots: ObserveSlots(host, false).subscribe(function (elements) {
        elements.added.forEach(function (el) {
          return Object(utils_get["a" /* Get */])(el, "tagName.toLowerCase()") === "style" ? undefined : wrap(el);
        });
        elements.removed.forEach(unwrap);
      })
    };
  },
  onDisconnected: function onDisconnected(host) {
    ObserverUnsubscribe(host);
  }
});
WCDefine(ajax_form_componentName, AjaxForm);
// CONCATENATED MODULE: ./src/components/button-element/index.js



var button_element_template = __webpack_require__(31);

var button_element_componentName = "button-element";
var button_element_componentRoot = ".".concat(button_element_componentName, "-container");

var button_element_style = __webpack_require__(32).toString();

var button_element_properties = {
  name: {
    format: function format(val, host) {
      return Pipe(ToString, IfInvalid(host.textContent))(val).value;
    },
    onChange: function onChange(val, host) {
      return WCwhenPropertyReady(host, "elements.button").then(function (btn) {
        return btn.setAttribute("name", val);
      });
    }
  },
  disabled: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      return WCwhenPropertyReady(host, "elements.root").then(function (root) {
        return root.classList[val ? "add" : "remove"]("disabled");
      });
    }
  },
  type: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      return WCwhenPropertyReady(host, "elements.button").then(function (btn) {
        if (val) {
          btn.setAttribute("type", "submit");
          btn.appendChild(create_element_CreateElement({
            tagName: "input",
            type: "submit"
          }));
        } else {
          btn.removeAttribute("type", "submit");

          try {
            btn.removeChild(btn.querySelector("input[type=\"submit\"]"));
          } catch (error) {}
        }
      });
    }
  }
};
var button_element_elements = {
  root: {
    selector: button_element_componentRoot
  },
  button: {
    selector: "".concat(button_element_componentRoot, " > button")
  },
  slot: {
    selector: "slot"
  }
};
var ButtonElement = WCConstructor({
  componentName: button_element_componentName,
  componentRoot: button_element_componentRoot,
  template: button_element_template,
  style: button_element_style,
  observedAttributes: Object.keys(button_element_properties),
  properties: button_element_properties,
  elements: button_element_elements,
  onConnected: function onConnected(host) {
    return host.elements.button.classList.add("ready");
  }
});
WCDefine(button_element_componentName, ButtonElement);
// CONCATENATED MODULE: ./src/utils/throttle.js
function Throttle(fn) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 33;
  var timer = null;
  var start = null;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    cancelAnimationFrame(timer);
    start = new Date().getTime();

    var _this = this;

    var test = function test() {
      var now = new Date().getTime();

      if (now - start >= wait) {
        fn.apply(_this, args);
        cancelAnimationFrame(timer);
        start = null;
        timer = null;
        return;
      }

      timer = requestAnimationFrame(test);
    };

    test();
  };
}
// CONCATENATED MODULE: ./src/utils/index-of.js

function IndexOf(array) {
  return function (value) {
    var result = TMonad(value);

    if (result.stop) {
      return result;
    }

    var arr = ToArray(array);

    if (!arr.valid) {
      result.valid = false;
      return result;
    }

    result.valid = arr.value.indexOf(result.value) > -1;
    return result;
  };
}
// CONCATENATED MODULE: ./src/utils/was-clicked-on.js
function WasClickedOn(element, event) {
  if (!element) {
    return false;
  }

  var isArray = Array.isArray(element);

  var isIt = function isIt(el, par) {
    var isEqual = el === par;
    var isContained = par instanceof Node && el.contains(par);

    if (isEqual || isContained) {
      return true;
    }

    return false;
  };

  var target = Array.isArray(event.path) ? event.path[0] : event.composedPath && typeof event.composedPath === "function" && event.composedPath()[0] ? event.composedPath()[0] : event.originalTarget ? event.originalTarget : event.explicitOriginalTarget ? event.explicitOriginalTarget : event.target;

  var cycleUp = function cycleUp(parent) {
    while (parent && parent !== document.body) {
      if (isArray) {
        if (element.length == 1) {
          if (isIt(element[0], parent)) {
            return true;
          }
        } else {
          var len = element.length;

          while (len) {
            len = len - 1;

            if (isIt(element[len], parent)) {
              return true;
            }
          }
        }
      } else {
        if (isIt(element, parent)) {
          return true;
        }
      }

      parent = parent.parentNode || parent.host;
    }

    return false;
  };

  return cycleUp(target);
}
// CONCATENATED MODULE: ./src/components/collapse-menu/index.js


var collapse_menu_style = __webpack_require__(33).toString();

var collapse_menu_outerStyle = __webpack_require__(34).toString();

var collapse_menu_template = __webpack_require__(35);

var collapse_menu_componentName = "collapse-menu";
var collapse_menu_componentRoot = ".".concat(collapse_menu_componentName, "-container");
var directions = ["horizontal", "vertical"];
var alignments = ["left", "right"];

var setAttr = function setAttr(el, attr, value) {
  return el ? el.setAttribute(attr, value) : undefined;
};
/** 
 * TODO
 * commented out collapse on wrap and minwidth settings as they are buggy at best
 */
// const removeSizer = el => (el.parentElement || el.parentNode.host).removeChild(el)
// const createSizer = () => {
//     const iframe = document.createElement(`iframe`)
//     iframe.style.opacity = `0`
//     iframe.style.position = `absolute`
//     iframe.style.width = `100%`
//     iframe.style.height = `100%`
//     iframe.style.top = `0%`
//     iframe.style.left = `0%`
//     iframe.style.zIndex = `-1`
//     iframe.style.pointerEvents = `none`
//     iframe.style.border = `none`
//     return iframe
// }
// const handleCollapse = (container, host) => {
//     Throttle(() => {
//         if (!host.collapseonwrap || host.expanded) { return }
//         const scrollWidth = container.scrollWidth
//         const width = container.offsetWidth
//         const itemsWidth = host.elements.items.scrollWidth
//         const hostWidth = host.scrollWidth
//         const siblingsWidth = Array.from(container.children).reduce((total, current) => total + current.scrollWidth, -(hostWidth + host.sizer.scrollWidth))
//         if (scrollWidth > width && !host.expandable) {
//             host.expandable = true
//         } else if (width >= itemsWidth + siblingsWidth) {
//             host.expandable = false
//         }
//     }, host.throttle || 0)()
// }
// const setContainer = (container, host) => {
//     if (host.sizer) { removeSizer(host.sizer) }
//     if (!container || !host.collapseonwrap) { return }
//     host.sizer = createSizer()
//     container.appendChild(host.sizer)
//     host.sizer.contentWindow.addEventListener(`resize`, () => handleCollapse(container, host))
//     requestAnimationFrame(() => handleCollapse(container, host))
// }
// const handleMinWidth = host => {
//     if (!host.minwidth) { return }
//     if (host.minWidthSizer.scrollWidth < host.minwidth) {
//         host.expandable = true
//     } else {
//         host.expandable = false
//     }
// }
// const setMinWidth = (minWidth, host) => {
//     if (!minWidth && host.minWidthSizer) { return removeSizer(host.minWidthSizer) }
//     if (!minWidth) { return }
//     const root = host.elements.root
//     host.minWidthSizer = createSizer()
//     root.appendChild(host.minWidthSizer)
//     host.minWidthSizer.contentWindow.addEventListener(`resize`, () => handleMinWidth(host))
//     requestAnimationFrame(() => handleMinWidth(host))
// }


var collapse_menu_setMinPageWidth = function setMinPageWidth(minWidth, host) {
  if (!minWidth) {
    return;
  }

  var handlePageWidth = Throttle(function (host) {
    if (!host.minpagewidth) {
      return;
    }

    if (window.innerWidth < host.minpagewidth) {
      host.expandable = true;
    } else {
      host.expandable = false;
    }
  }, 333);
  window.addEventListener("resize", function () {
    return handlePageWidth(host);
  });
  handlePageWidth(host);
};

var setBackground = function setBackground(color, el) {
  return !el ? undefined : el.style.backgroundColor = color;
};

var collapse_menu_clickToggle = function clickToggle(el, host) {
  if (!el.eventSubscriptions) {
    el.eventSubscriptions = {};
  }

  el.eventSubscriptions.click = ObserveEvent(el, "click").subscribe(function () {
    return host.expanded = !host.expanded;
  });
};

var collapse_menu_properties = {
  expanded: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      setAttr(host.elements.root, "expanded", val);
      setAttr(host, "expanded", val);
    }
  },
  expandable: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      setAttr(host.elements.root, "expandable", val);
      setAttr(host, "expandable", val);

      if (!val) {
        host.expanded = false;
      }
    }
  },
  minpagewidth: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(null))(val).value;
    },
    onChange: collapse_menu_setMinPageWidth
  },
  direction: {
    format: function format(val) {
      return Pipe(ToString, IndexOf(directions), IfInvalid(directions[0]))(val).value;
    },
    onChange: function onChange(val, host) {
      return setAttr(host.elements.root, "direction", val);
    }
  },
  align: {
    format: function format(val) {
      return Pipe(ToString, IndexOf(alignments), IfInvalid(alignments[0]))(val).value;
    },
    onChange: function onChange(val, host) {
      return setAttr(host.elements.root, "align", val);
    }
  },
  background: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("none"))(val).value;
    },
    onChange: function onChange(val, host) {
      setBackground(val, host.elements.background);
    }
  } // throttle: {
  //     format: val => Pipe(ToNumber, IfInvalid(0))(val).value
  // },
  // minwidth: {
  //     format: val => Pipe(ToNumber, IfInvalid(null))(val).value,
  //     onChange: setMinWidth,
  // },
  // collapseonwrap: {
  //     format: val => Pipe(ToBool, IfInvalid(false))(val).value,
  //     onChange(val, host) {
  //         const root = host.elements.root
  //         if (!root) { return }
  //         root.classList[val ? `add` : `remove`](`collapseonwrap`)
  //     }
  // },
  // container: {
  //     format: (val, host) => Get(host, val, host),
  //     onChange: setContainer
  // }

};
var collapse_menu_observedAttributes = Object.keys(collapse_menu_properties);
var collapse_menu_elements = {
  root: {
    selector: collapse_menu_componentRoot,
    onChange: function onChange(el, host) {
      setAttr(host.elements.root, "direction", host.direction);
      el.classList[host.collapseonwrap ? "add" : "remove"]("collapseonwrap");
      el.eventSubscriptions = {
        click: ObserveEvent(el, "click").subscribe(function (e) {
          var items = Array.from(host.querySelectorAll("[slot=\"item\"]"));
          var len = items.length;

          while (len) {
            len = len - 1;

            if (WasClickedOn(items[len], e)) {
              return host.dispatchEvent(new CustomEvent("itemclick", {
                detail: {
                  event: e,
                  item: items[len]
                }
              }));
            }
          }
        })
      };
    }
  },
  items: {
    selector: ".collapse-menu-items"
  },
  background: {
    selector: ".collapse-menu-items-bg",
    onChange: function onChange(el, host) {
      setBackground(host.background, el);
    }
  },
  toggle: {
    selector: ".collapse-menu-toggle",
    onChange: collapse_menu_clickToggle
  },
  toggleInner: {
    selector: ".collapse-menu-toggle-inner",
    onChange: collapse_menu_clickToggle
  }
};
var CollapseMenu = WCConstructor({
  componentName: collapse_menu_componentName,
  componentRoot: collapse_menu_componentRoot,
  template: collapse_menu_template,
  style: collapse_menu_style,
  outerStyle: collapse_menu_outerStyle,
  observedAttributes: collapse_menu_observedAttributes,
  properties: collapse_menu_properties,
  elements: collapse_menu_elements
});
WCDefine(collapse_menu_componentName, CollapseMenu);
// CONCATENATED MODULE: ./src/services/icons.js
var iconArrow = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z\"/></svg>";
var iconCheck = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\"/></svg>";
var iconChevron = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/></svg>";
var iconClose = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/></svg>";
var iconDelete = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\"/></svg>";
var iconError = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"/></svg>";
var iconFilter = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15.96 10.29l-2.75 3.54-1.96-2.36L8.5 15h11l-3.54-4.71zM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z\"/></svg>";
var iconGear = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z\"/></svg>";
var iconInfo = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z\"/></svg>";
var iconPencil = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z\"/></svg>";
var iconPlay = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M8 5v14l11-7z\"/></svg>";
var iconTriangle = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M7 10l5 5 5-5z\"/></svg>";
var iconWarning = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\"/></svg>";
var Icons = {
  arrow: iconArrow,
  check: iconCheck,
  chevron: iconChevron,
  close: iconClose,
  "delete": iconDelete,
  error: iconError,
  filter: iconFilter,
  gear: iconGear,
  info: iconInfo,
  pencil: iconPencil,
  play: iconPlay,
  triangle: iconTriangle,
  warning: iconWarning
};
// CONCATENATED MODULE: ./src/components/content-collapse/index.js
/**
 * add ripple and bounce to toggle container
 */





var content_collapse_style = __webpack_require__(36).toString();

var content_collapse_template = __webpack_require__(37);

var content_collapse_componentName = "content-collapse";
var content_collapse_componentRoot = ".".concat(content_collapse_componentName, "-container");

var content_collapse_setStyles = function setStyles(el, styles) {
  return el ? SetStyleRules(el, styles) : undefined;
};

var content_collapse_setStyleElement = function setStyleElement(host) {
  var outerStyle = host.querySelector("style[name=\"outer\"]");
  var componentStyle = host.shadowRoot.querySelector("style[name=\"\"]");
  var styleString = [content_collapse_style, host.theme, host.styles].join("");

  if (!outerStyle) {
    AppendStyleElement(styleString, host, "outer");
    outerStyle = host.querySelector("style[name=\"outer\"]");
  }

  content_collapse_setStyles(componentStyle, styleString);
  content_collapse_setStyles(outerStyle, styleString);
};
var content_collapse_properties = {
  "class": ComponentClassObject,
  expanded: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      host.setAttribute("expanded", val);

      if (host.group && val) {
        var parent = GetParent(host);
        Array.from(parent ? parent.children : []).forEach(function (s) {
          return s !== host && s.group === host.group && s.expanded === true ? s.expanded = false : undefined;
        });
      }

      WCwhenPropertyReady(host, "elements.transition.transition").then(function (transition) {
        transition(val ? 1 : 0);
        host.elements.icon.setAttribute("rotation", val ? "down" : "right");
      });
    }
  },
  arrow: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(iconChevron))(val).value;
    },
    onChange: function onChange(val, host) {
      WCwhenPropertyReady(host, "elements.icon").then(function (el) {
        return el.svg = val;
      });
    }
  },
  group: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    }
  },
  speed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(333))(val).value;
    },
    onChange: function onChange(val, host) {
      return WCwhenPropertyReady(host, "elements.transition").then(function (transition) {
        return transition.speed = val;
      });
    }
  },
  styles: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(_val, host) {
      return content_collapse_setStyleElement(host);
    }
  },
  theme: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(_val, host) {
      return content_collapse_setStyleElement(host);
    }
  }
};
var content_collapse_observedAttributes = Object.keys(content_collapse_properties);
var content_collapse_elements = {
  root: {
    selector: content_collapse_componentRoot
  },
  transition: {
    selector: ".".concat(content_collapse_componentName, "-transition")
  },
  icon: {
    selector: ".".concat(content_collapse_componentName, "-toggler-icon")
  },
  toggler: {
    selector: ".".concat(content_collapse_componentName, "-toggler"),
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        click: ObserveEvent(el, "click").subscribe(function () {
          return host.expanded = !host.expanded;
        }),
        mouseenter: ObserveEvent(el, "mouseenter").subscribe(function () {
          return el.classList.add("hovering");
        }),
        mouseleave: ObserveEvent(el, "mouseleave").subscribe(function () {
          return el.classList.remove("hovering");
        })
      };
    }
  }
};
var ContentCollapse = WCConstructor({
  componentName: content_collapse_componentName,
  componentRoot: content_collapse_componentRoot,
  template: content_collapse_template,
  style: content_collapse_style,
  observedAttributes: content_collapse_observedAttributes,
  properties: content_collapse_properties,
  elements: content_collapse_elements,
  onConnected: function onConnected(host) {
    content_collapse_setStyleElement(host);
  }
});
WCDefine(content_collapse_componentName, ContentCollapse);
// CONCATENATED MODULE: ./src/components/content-drawer/toggle.js
var toggle_toggle = function toggle(host, open) {
  if (!host.ready) {
    return;
  }

  var root = host.elements.root;

  if (root) {
    root.classList[open ? "add" : "remove"]("open");
  }

  var header = host.elements.header;
  var scaler = host.elements.scaler;
  var underline = host.elements.underline;
  scaler.scaled = !open;

  if (underline) {
    if (!host.underline && underline.targets.length) {
      underline.targets = [];
    }

    if (host.underline && !underline.targets.length && header) {
      underline.targets = [header];
    }

    if (host.underline && underline.opacity !== host.underlineamount) {
      underline.opacity = host.underlineamount;
    }

    if (host.underline && underline.speed !== host.underlinespeed) {
      underline.speed = host.underlinespeed;
    }

    if (host.underline && underline.color !== host.accentcolor) {
      underline.color = host.underlinecolor || host.accentcolor;
    }

    if (!!host.underline && underline.direction !== host.underline) {
      underline.direction = host.underline;
    }
  }

  var others = [];

  if (host.drawergroup) {
    others = Array.from(document.querySelectorAll("content-drawer[drawergroup=\"".concat(host.drawergroup, "\"]")));
  }

  if (open) {
    underline.open();
    others.forEach(function (other) {
      if (other !== host) {
        other.open = false;
      }
    });
  } else {
    underline.close();
  }
};
// CONCATENATED MODULE: ./src/components/content-drawer/index.js




var content_drawer_style = __webpack_require__(38).toString();

var content_drawer_outerStyle = __webpack_require__(39).toString();

var content_drawer_template = __webpack_require__(40);

var content_drawer_componentName = "content-drawer";
var content_drawer_componentRoot = ".".concat(content_drawer_componentName, "-container");
var content_drawer_directions = ["auto", "left", "right", "top", "bottom"];

var setElementParam = function setElementParam(el, key, value) {
  return !el ? undefined : el[key] = value;
};

var toEffectStartFrom = function toEffectStartFrom(val) {
  return val === "auto" ? "auto" : val === "top" ? "center top" : val === "bottom" ? "center bottom" : val === "left" ? "left center" : "right center";
};

var setHeaderIcon = function setHeaderIcon(host) {
  var prop = host.headericon.slice(0, 4) === "<svg" ? "svg" : "type";
  host.elements.headerIcon[prop] = host.headericon;
};

var content_drawer_properties = {
  drawergroup: {
    format: function format(val) {
      return val;
    }
  },
  headericon: {
    format: function format(val) {
      return val === "true" || val === undefined || val === null ? iconArrow : val === "false" ? false : val;
    },
    onChange: function onChange(_val, host) {
      return setHeaderIcon(host);
    }
  },
  openfrom: {
    format: function format(val) {
      return Pipe(IndexOf(content_drawer_directions), IfInvalid("top"))(val).value;
    },
    onChange: function onChange(val, host) {
      setElementParam(host.elements.scaler, "startfrom", toEffectStartFrom(val));
      setElementParam(host.elements.scaler, "x", ["left", "right"].indexOf(val) > -1);
      setElementParam(host.elements.scaler, "y", ["top", "bottom"].indexOf(val) > -1);
    }
  },
  open: {
    format: function format(val) {
      return ToBool(val).value;
    },
    onChange: function onChange(val, host) {
      return toggle_toggle(host, val);
    }
  },
  speed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(333))(val).value;
    },
    onChange: function onChange(val, host) {
      return setElementParam(host.elements.scaler, "speed", val);
    }
  },
  underline: {
    format: function format(val) {
      return val;
    }
  },
  underlineamount: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(undefined))(val).value;
    }
  },
  underlinecolor: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(undefined))(val).value;
    }
  },
  underlinespeed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(undefined))(val).value;
    }
  }
};
var content_drawer_elements = {
  root: {
    selector: ".".concat(content_drawer_componentName, "-container")
  },
  header: {
    selector: ".".concat(content_drawer_componentName, "-header"),
    onChange: function onChange(el, host) {
      return el.eventSubscriptions = {
        click: ObserveEvent(el, "click").subscribe(function () {
          return host.open = !host.open;
        })
      };
    }
  },
  content: {
    selector: ".".concat(content_drawer_componentName, "-content")
  },
  contentInner: {
    selector: ".".concat(content_drawer_componentName, "-content-inner")
  },
  headerIcon: {
    selector: "icon-element"
  },
  scaler: {
    selector: "effect-scale",
    onChange: function onChange(scaler, host) {
      scaler.targets = [host.elements.contentInner];
      scaler.x = ["left", "right"].indexOf(host.openfrom) > -1;
      scaler.y = ["top", "bottom"].indexOf(host.openfrom) > -1;
      scaler.startfrom = toEffectStartFrom(host.openfrom);
      scaler.scaled = !host.open;
    }
  },
  underline: {
    selector: "effect-underline",
    onChange: function onChange(underline, host) {
      underline.color = host.accentcolor;
      underline.direction = host.underline;
      underline.targets = [host.elements.header];

      if (typeof underline.open !== "function") {
        return;
      }

      if (host.open) {
        underline.open();
      } else {
        underline.close();
      }
    }
  }
};
var ContentDrawer = WCConstructor({
  componentName: content_drawer_componentName,
  componentRoot: content_drawer_componentRoot,
  template: content_drawer_template,
  style: content_drawer_style,
  outerStyle: content_drawer_outerStyle,
  observedAttributes: Object.keys(content_drawer_properties),
  properties: content_drawer_properties,
  elements: content_drawer_elements,
  onReady: function onReady(host) {
    host.elements.root.classList[host.open ? "add" : "remove"]("open");
    setHeaderIcon(host);
  }
});
WCDefine(content_drawer_componentName, ContentDrawer);
// EXTERNAL MODULE: ./src/services/timer.js
var timer = __webpack_require__(18);

// CONCATENATED MODULE: ./src/utils/get-ease.js
var distance = function distance(v) {
  return v[1] - v[0];
};

function GetEase(values, duration, pow, powerFn) {
  var results = [];
  var index = 0;

  while (index < duration - 1) {
    var current = Math.round(distance(values) * powerFn(index, duration, pow) * 1000) / 1000;
    results.push(values[0] + current);
    index = index + 1;
  }

  results.push(values[1]);
  return results;
}
// CONCATENATED MODULE: ./src/utils/ease-power.js
function EasePower(stepDecimal) {
  var pow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  return 1 - Math.pow(1 - stepDecimal, pow);
}
// CONCATENATED MODULE: ./src/utils/ease-in-out.js

function EaseInOut(values, duration) {
  var pow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  return GetEase(values, duration, pow, function (index, frames, pow) {
    return EasePower(index / frames * (index / frames), pow);
  });
}
// CONCATENATED MODULE: ./src/components/content-transition/methods.js


var methods_style = __webpack_require__(17).toString();

var methods_animator = function animator(from, to, speed, stepFn) {
  return new Promise(function (resolve) {
    try {
      Object(timer["a" /* Timer */])(stepFn, EaseInOut([from, to], speed)).then(resolve);
    } catch (error) {
      resolve();
    }
  });
};

var animateHeight = function animateHeight(from, to, el, speed) {
  return methods_animator(from, to, speed, function (heightStep) {
    return el.style.height = "".concat(heightStep, "px");
  });
};

var animateLeft = function animateLeft(from, to, el, speed) {
  return methods_animator(from, to, speed, function (leftStep) {
    return el.style.transform = "translateZ(0) translateX(".concat(leftStep, "%)");
  });
};

var animateOpacity = function animateOpacity(from, to, el, speed) {
  return methods_animator(from, to, speed, function (opacityStep) {
    return el.style.opacity = opacityStep;
  });
};

var removeElement = function removeElement(el) {
  try {
    el.parentNode.removeChild(el);
  } catch (error) {}
};

var dispatchTransition = function dispatchTransition(host, from, to, isEnd) {
  return host.dispatchEvent(new CustomEvent("transition".concat(isEnd ? "ed" : "ing"), {
    detail: {
      host: host,
      from: from,
      to: to
    }
  }));
};

var methods_elementOpacity = function elementOpacity(el) {
  var defaultOpacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return Object(utils_get["a" /* Get */])(el, "style.opacity", defaultOpacity, function (val) {
    return val === "" ? defaultOpacity : parseFloat(val);
  });
};

var getChildren = function getChildren(host) {
  return function () {
    return Array.from(host.children).filter(function (c) {
      return c.hasAttribute("slot");
    });
  };
};
var getCurrent = function getCurrent(host) {
  return function () {
    return host.querySelector("[slot=\"current\"]");
  };
};
var getComponentStyles = function getComponentStyles(host) {
  return function () {
    return "".concat(methods_style).concat(host.theme).concat(host.styles);
  };
};
var getIndex = function getIndex(host) {
  return function () {
    return host.getChildren().indexOf(host.getCurrent());
  };
};
var start$ = function start$(host) {
  return function (next) {
    var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var complete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    return host.state.start.subscribe(next, error, complete);
  };
};
var end$ = function end$(host) {
  return function (next) {
    var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var complete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    return host.state.end.subscribe(next, error, complete);
  };
};

var getTransitionElements = function getTransitionElements(host, indexOrChild) {
  var child = isNaN(indexOrChild) ? indexOrChild : host.getChildren()[indexOrChild];
  var current = host.current || host.getCurrent();

  if (!child) {
    return;
  }

  host.current = child;
  return {
    nextContainer: host.elements.nextContainer,
    currentContainer: host.elements.currentContainer,
    root: host.elements.root,
    child: child,
    current: current
  };
};

var endTransition = function endTransition(host, old, current, currentContainer, nextContainer) {
  try {
    if (old && old.slot !== "hidden") {
      old.slot = "hidden";
    }

    if (current && current.slot !== "current") {
      current.slot = "current";
    }

    currentContainer.style.removeProperty("transform");
    currentContainer.style.removeProperty("opacity");
    nextContainer.style.removeProperty("transform");
    nextContainer.style.removeProperty("opacity");
    host.elements.root.style.removeProperty("height");
    host.end = {
      current: current,
      index: host.getChildren().indexOf(current)
    };
  } catch (error) {}

  return current;
};

var startTransition = function startTransition(host, current, child) {
  try {
    if (!host.contains(child)) {
      host.appendChild(child);
    }

    child.setAttribute("slot", "next");
    host.start = {
      from: current,
      to: child
    };
    dispatchTransition(host, current, child);
  } catch (error) {}
};

var methods_switchHeights = function switchHeights(root, child, speed) {
  return new Promise(function (resolve) {
    // OnNextFrame(() => {
    var endHeight = Object(utils_get["a" /* Get */])(child, "offsetHeight", 0);
    var startHeight = Object(utils_get["a" /* Get */])(root, "offsetHeight", endHeight);
    return endHeight === startHeight ? setTimeout(resolve, speed) : animateHeight(startHeight, endHeight, root, speed).then(resolve); // })
  });
};

var transitionFade = function transitionFade(current, next, speed) {
  return Promise.all([animateOpacity(methods_elementOpacity(current), 0, current, speed * 0.75), animateOpacity(methods_elementOpacity(next, 0), 1, next, speed * 1.1)]);
};

var transitionSlide = function transitionSlide(current, next, speed) {
  return Promise.all([animateOpacity(methods_elementOpacity(current), 0, current, speed * 0.5), animateOpacity(methods_elementOpacity(next, 0), 1, next, speed * 0.7), animateLeft(0, 100, current, speed * 0.8), animateLeft(-100, 0, next, speed)]);
};

var methods_methods = {
  slide: transitionSlide,
  fade: transitionFade
};
var methods_transition = function transition(host) {
  return function (index) {
    return new Promise(function (resolve) {
      var maxTries = 1000;

      var run = function run() {
        maxTries = maxTries - 1;

        if (host.speed === undefined) {
          if (!maxTries) {
            return;
          }

          return Object(on_next_frame["a" /* OnNextFrame */])(run);
        }

        var elements = getTransitionElements(host, index);

        if (!elements) {
          return resolve();
        }

        startTransition(host, elements.current, elements.child);
        return Promise.all([methods_switchHeights(elements.root, elements.child, host.speed), !methods_methods[host.type] ? Promise.resolve() : methods_methods[host.type](elements.currentContainer, elements.nextContainer, host.speed)]).then(function () {
          return endTransition(host, elements.current, elements.child, elements.currentContainer, elements.nextContainer);
        }).then(function () {
          if (!host.keepchildren) {
            while (host.getChildren().length > 1) {
              removeElement(host.getChildren()[0]);
            }
          }

          return elements.child;
        }).then(resolve);
      };

      run();
    });
  };
};
var setCurrent = function setCurrent(host) {
  return function (index) {
    var elements = getTransitionElements(host, index);

    if (!elements) {
      return Promise.reject();
    }

    return endTransition(host, elements.current, elements.child, elements.currentContainer, elements.nextContainer);
  };
};
// CONCATENATED MODULE: ./src/components/content-transition/index.js



var content_transition_style = __webpack_require__(17).toString();

var content_transition_outerStyle = __webpack_require__(41).toString();

var content_transition_template = __webpack_require__(42);

var content_transition_componentName = "content-transition";
var content_transition_componentRoot = ".content-transition-container";
var content_transition_elements = {
  root: {
    selector: ".content-transition-container",
    onChange: function onChange(el, host) {
      el.setAttribute("type", host.type);
    }
  },
  current: {
    selector: "slot[name=\"current\"]"
  },
  next: {
    selector: "slot[name=\"next\"]"
  },
  nextContainer: {
    selector: ".next-slot"
  },
  hidden: {
    selector: "slot[name=\"hidden\"]"
  },
  hiddentContainer: {
    selector: ".hidden-slot"
  },
  currentContainer: {
    selector: ".current-slot"
  }
};
var content_transition_properties = {
  speed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(300))(val).value;
    }
  },
  type: {
    format: function format(val) {
      return ["fade", "slide", "height"].indexOf(val) > -1 ? val : "fade";
    },
    onChange: function onChange(val, host) {
      var root = host.elements.root;

      if (!root) {
        return;
      }

      root.setAttribute("type", val);
    }
  },
  keepchildren: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(_val, host) {
      var root = host.elements.root;

      if (!root) {
        return;
      }

      root.classList[host.keepchildren ? "add" : "remove"]("keepchildren");
    }
  },
  current: {
    format: function format(val) {
      return val;
    }
  },
  start: {
    format: function format(val) {
      return val;
    }
  },
  end: {
    format: function format(val) {
      return val;
    }
  }
};
var ContentTransition = WCConstructor({
  componentName: content_transition_componentName,
  componentRoot: content_transition_componentRoot,
  template: content_transition_template,
  style: content_transition_style,
  outerStyle: content_transition_outerStyle,
  observedAttributes: Object.keys(content_transition_properties),
  properties: content_transition_properties,
  elements: content_transition_elements,
  methods: {
    transition: methods_transition,
    getComponentStyles: getComponentStyles,
    getIndex: getIndex,
    getCurrent: getCurrent,
    getChildren: getChildren,
    start$: start$,
    end$: end$,
    setCurrent: setCurrent
  }
});
WCDefine(content_transition_componentName, ContentTransition);
// CONCATENATED MODULE: ./src/components/cookie-message/index.js


var cookie_message_style = __webpack_require__(43).toString();

var cookie_message_template = __webpack_require__(44);

var cookie_message_componentName = "cookie-message";
var cookie_message_componentRoot = ".cookie-message-container";

var cookie_message_setButton = function setButton(host) {
  var button = host.elements.button;

  if (!button) {
    return;
  }

  button.innerHTML = host.buttontext || "";
  button.accentcolor = host.buttonaccent;
  button.ripple = host.buttonripple;
  button.bounce = host.buttonbounce;

  if (typeof button.clickListener === "function") {
    button.clickListener();
  }

  button.clickListener = ObserveEvent(button, "click").subscribe(function () {
    host.shown = false;
  });
};

var setMessage = function setMessage(host) {
  var message = host.elements.message;

  if (!message) {
    return;
  }

  message.innerHTML = host.message || "";
};

var cookieName = "accepted_cookies";

var setCookie = function setCookie() {
  return document.cookie = "".concat(cookieName, "=true");
};

var getCookie = function getCookie() {
  try {
    return !!document.cookie.split(";").filter(function (c) {
      return c.indexOf(cookieName) > -1;
    }).map(function (c) {
      return JSON.parse(c.split("=")[1]);
    })[0];
  } catch (error) {}
};

var cookie_message_properties = {
  shown: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(!getCookie()))(val).value;
    },
    onChange: function onChange(val, host) {
      var root = host.elements.root;

      if (val) {
        try {
          localStorage.removeItem(cookieName);
        } catch (error) {}
      } else {
        setCookie();
      }

      if (root) {
        root.classList[val ? "add" : "remove"]("shown");
      }
    }
  },
  message: {
    format: function format(val) {
      return typeof val === "string" ? val : "By clicking \"Continue\" or continuing to use our site, you acknowledge that you accept our use of cookies, which are used to provide you with the best possible experience and no personal information is stored.";
    },
    onChange: function onChange(_val, host) {
      return setMessage(host);
    }
  },
  buttontext: {
    format: function format(val) {
      return typeof val === "string" ? val : "Continue";
    },
    onChange: function onChange(_val, host) {
      return cookie_message_setButton(host);
    }
  },
  buttonripple: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(_val, host) {
      return cookie_message_setButton(host);
    }
  },
  buttonbounce: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(_val, host) {
      return cookie_message_setButton(host);
    }
  },
  buttonaccent: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("#59a2d8"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return cookie_message_setButton(host);
    }
  }
};
var cookie_message_observedAttributes = Object.keys(cookie_message_properties);
var cookie_message_elements = {
  root: {
    selector: cookie_message_componentRoot,
    onChange: function onChange() {}
  },
  button: {
    selector: "button-element",
    onChange: function onChange(_el, host) {
      return cookie_message_setButton(host);
    }
  },
  message: {
    selector: ".cookie-message-text",
    onChange: function onChange(_el, host) {
      return setMessage(host);
    }
  }
};
var CookieMessage = WCConstructor({
  componentName: cookie_message_componentName,
  componentRoot: cookie_message_componentRoot,
  template: cookie_message_template,
  style: cookie_message_style,
  observedAttributes: cookie_message_observedAttributes,
  properties: cookie_message_properties,
  elements: cookie_message_elements,
  onConnected: function onConnected(host) {
    host.shown = !getCookie();
  }
});
WCDefine(cookie_message_componentName, CookieMessage);
// CONCATENATED MODULE: ./src/components/drop-down/index.js


var drop_down_style = __webpack_require__(45).toString();

var drop_down_outerStyle = __webpack_require__(46).toString();

var drop_down_toggleOptions = function toggleOptions(show, host) {
  var overlay = host.elements.overlay;
  var root = host.elements.root;

  if (!root || !overlay) {
    return;
  }

  if (show && overlay.showing) {
    return;
  }

  try {
    overlay[show ? "show" : "hide"]();
  } catch (error) {}

  Object(on_next_frame["a" /* OnNextFrame */])(function () {
    if (!show) {
      root.classList.remove("opened");
    } else {
      root.classList.add("opened");
    }

    host.dispatchEvent(new CustomEvent(show ? "selectopen" : "selectclose", {
      detail: host
    }));
  });
};

var drop_down_properties = {
  open: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: drop_down_toggleOptions
  },
  closeonclick: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    }
  }
};

var drop_down_template = __webpack_require__(47);

var drop_down_componentName = "drop-down";
var drop_down_componentRoot = ".".concat(drop_down_componentName, "-container");

var drop_down_openClose = function openClose(open, host) {
  var change = function change() {
    var needsFocusBlur = host.open !== open;
    host.open = open;

    if (needsFocusBlur) {
      if (open) {
        host.focus();
      } else {
        host.blur();
      }
    }

    Array.from(host.children).forEach(function (c) {
      return c.blur();
    });
  };

  if (open) {
    return change();
  }

  Object(on_next_frame["a" /* OnNextFrame */])(change);
};

var drop_down_elements = {
  root: {
    selector: drop_down_componentRoot
  },
  heading: {
    selector: ".drop-down-heading"
  },
  overlay: {
    selector: ".drop-down-overlay",
    onChange: function onChange(el, host) {
      el.target = host;
    }
  }
};
var DropDown = WCConstructor({
  componentName: drop_down_componentName,
  componentRoot: drop_down_componentRoot,
  template: drop_down_template,
  style: drop_down_style,
  outerStyle: drop_down_outerStyle,
  properties: drop_down_properties,
  elements: drop_down_elements,
  observedAttributes: Object.keys(drop_down_properties),
  onConnected: function onConnected(host) {
    host.tabIndex = "0";

    var addClasses = function addClasses() {
      Array.from(host.children).forEach(function (child) {
        if (child.getAttribute("slot") === "option") {
          child.tabIndex = "0";
          child.classList.add("drop-down-option");
        }
      });
    };

    addClasses();
    host.eventSubscriptions = {
      slotObserver: ObserveSlots(host, true).subscribe(addClasses),
      docClick: ObserveEvent(document.body, "click").subscribe(function (e) {
        if (!WasClickedOn(host, e)) {
          return host.open ? drop_down_openClose(false, host) : undefined;
        }

        if (WasClickedOn(Array.from(host.querySelectorAll("[slot=\"option\"]")), e)) {
          host.dispatchEvent(new CustomEvent("optionclick", {
            detail: {
              host: host,
              event: e
            }
          }));
        }

        if (WasClickedOn([host.elements.heading, host.querySelector("[slot=\"label\"]")], e)) {
          host.dispatchEvent(new CustomEvent("labelclick", {
            detail: {
              host: host,
              event: e
            }
          }));

          if (host.open) {
            return Object(on_next_frame["a" /* OnNextFrame */])(function () {
              return drop_down_openClose(false, host);
            });
          } else {
            return drop_down_openClose(true, host);
          }
        }

        if (host.closeonclick && host.open) {
          return Object(on_next_frame["a" /* OnNextFrame */])(function () {
            return drop_down_openClose(false, host);
          });
        }
      })
    };
  },
  onDisconnected: function onDisconnected(host) {
    ObserverUnsubscribe(host);
  }
});
WCDefine(drop_down_componentName, DropDown);
// CONCATENATED MODULE: ./src/utils/get-curve.js
/** BORROWED HEAVILY FROM: https://stackoverflow.com/a/15528789 */
function GetCurve(points) {
  var tension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  var closedPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var frames = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 16;
  var numOfSegments = Math.round(frames * .3295);
  var isPairs = Array.isArray(points[0]);
  var res = [];
  var pts = points.slice(0);
  var pts2 = pts.slice(0);
  var x;
  var y;
  var t1x;
  var t2x;
  var t1y;
  var t2y;
  var c1;
  var c2;
  var c3;
  var c4;
  var st;
  var t;
  var i;

  if (isPairs) {
    pts = pts.concat.apply([], pts);
  } else {
    pts = pts.concat.apply([], pts.map(function (p) {
      return [p, p];
    }));
  }

  pts2 = pts.slice(0);

  if (closedPath) {
    pts.unshift(pts2[pts2.length - 1]);
    pts.unshift(pts2[pts2.length - 2]);
    pts.unshift(pts2[pts2.length - 1]);
    pts.unshift(pts2[pts2.length - 2]);
    pts.push(pts2[0]);
    pts.push(pts2[1]);
  } else {
    pts.unshift(pts2[1]);
    pts.unshift(pts2[0]);
    pts.push(pts[pts2.length - 2]);
    pts.push(pts[pts2.length - 1]);
  }

  for (i = 2; i < pts.length - 4; i += 2) {
    for (t = 0; t <= numOfSegments; t++) {
      // calc tension vectors
      t1x = (pts[i + 2] - pts[i - 2]) * tension;
      t2x = (pts[i + 4] - pts[i]) * tension;
      t1y = (pts[i + 3] - pts[i - 1]) * tension;
      t2y = (pts[i + 5] - pts[i + 1]) * tension; // calc step

      st = t / numOfSegments; // calc cardinals

      c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
      c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
      c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
      c4 = Math.pow(st, 3) - Math.pow(st, 2); // calc x and y cords with common control vectors

      x = c1 * pts[i] + c2 * pts[i + 2] + c3 * t1x + c4 * t2x;
      y = c1 * pts[i + 1] + c2 * pts[i + 3] + c3 * t1y + c4 * t2y;
      res.push([x, y]);
    }
  }

  return isPairs ? res : res.map(function (p) {
    return p[0];
  });
}
// CONCATENATED MODULE: ./src/utils/is-element.js

function IsElement(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  result.valid = Object(utils_get["a" /* Get */])(result, "value.nodeType") === 1;
  return result;
}
// CONCATENATED MODULE: ./src/components/effect-bounce-z/index.js


var effect_bounce_z_template = __webpack_require__(48);

var effect_bounce_z_componentName = "effect-bounce-z";
var effect_bounce_z_componentRoot = ".effect-push-container";
var defaultOn = "mousedown";
var defaultSpeed = 300;
var defaultAmount = -4;

var effect_bounce_z_unloadTargets = function unloadTargets(host) {
  return Object(utils_get["a" /* Get */])(host, "_targets", []).forEach(function (target) {
    return Object(utils_get["a" /* Get */])(target, "observer()");
  });
};

var validTarget = function validTarget(target) {
  return !!target.element;
};

var effect_bounce_z_animator = function animator(points, speed, stepFn) {
  return Object(timer["a" /* Timer */])(stepFn, GetCurve(points, 0.5, false, speed));
};

var effect_bounce_z_loadTargets = function loadTargets(_val, host) {
  effect_bounce_z_unloadTargets(host);
  host._targets = Object(utils_get["a" /* Get */])(host, "targets", []).map(function (target) {
    var object = {
      element: Pipe(IsElement, IfInvalid(null))(target.element).value,
      on: typeof target.on === "string" ? target.on : defaultOn,
      amount: Pipe(ToNumber, IfInvalid(defaultAmount))(target.amount).value,
      speed: Pipe(ToNumber, IfInvalid(defaultSpeed))(target.speed).value
    };

    if (validTarget(target)) {
      object.handler = function (e) {
        host.dispatchEvent(new Event("started", {
          detail: object
        }));
        object.element.style.transformStyle = "preserve-3d";
        object.element.style.backfaceVisibility = "hidden";

        if (typeof target.handler === "function") {
          target.handler(e);
        }

        return effect_bounce_z_animator([1, -object.amount, -object.amount * 1.125, 1], object.speed, function (scale) {
          var max = Math.max(object.element.offsetWidth, object.element.offsetHeight);
          var min = Math.min(object.element.offsetWidth, object.element.offsetHeight);
          var dimension = (max - min) / 2 + min;
          object.element.style.transform = "perspective(1px) translateZ(0) scale(".concat((dimension - scale) / dimension, ")");
        }).then(function () {
          object.element.style.removeProperty("transform");
          host.dispatchEvent(new Event("ended", {
            detail: object
          }));
          return object;
        });
      };

      object.observer = ObserveEvent(object.element, object.on).subscribe(object.handler);
      return object;
    }
  }).filter(function (t) {
    return !!t;
  });
};

var effect_bounce_z_properties = {
  "class": ComponentClassObject,
  targets: {
    format: function format(val) {
      return Pipe(ToArray, IfInvalid([]))(val).value;
    },
    onChange: effect_bounce_z_loadTargets
  }
};

var effect_bounce_z_runTargetAtIndex = function runTargetAtIndex(index, host) {
  return Object(utils_get["a" /* Get */])(host, "_targets.".concat(index, ".handler()"));
};

var EffectBounceZ = WCConstructor({
  componentName: effect_bounce_z_componentName,
  componentRoot: effect_bounce_z_componentRoot,
  template: effect_bounce_z_template,
  properties: effect_bounce_z_properties,
  observedAttributes: Object.keys(effect_bounce_z_properties),
  methods: {
    trigger: function trigger(host) {
      return function (index) {
        return effect_bounce_z_runTargetAtIndex(index, host);
      };
    }
  },
  onDisconnected: function onDisconnected(host) {
    return effect_bounce_z_unloadTargets(host);
  }
});
WCDefine(effect_bounce_z_componentName, EffectBounceZ);
// CONCATENATED MODULE: ./src/components/effect-fade/index.js


var effect_fade_style = __webpack_require__(49).toString();

var effect_fade_template = __webpack_require__(50);

var effect_fade_componentName = "effect-fade";
var effect_fade_componentRoot = ".effect-fade-container";
var effect_fade_elements = {
  root: {
    selector: ".effect-fade-container"
  }
};
var effect_fade_defaultOn = "mousedown";
var defaultOff = "mouseup";
var effect_fade_defaultSpeed = 600;
var effect_fade_defaultOpacity = [0, 1];

var effect_fade_unloadTargets = function unloadTargets(host) {
  return Object(utils_get["a" /* Get */])(host, "_targets", []).forEach(function (target) {
    return [Object(utils_get["a" /* Get */])(target, "observers.on()"), Object(utils_get["a" /* Get */])(target, "observers.off()")];
  });
};

var effect_fade_validTarget = function validTarget(target) {
  return target && !!target.element;
};

var effect_fade_animator = function animator(points, speed, stepFn) {
  return Object(timer["a" /* Timer */])(stepFn, GetCurve(points, 0.5, false, speed));
};

var atStartPosition = function atStartPosition(object) {
  return parseFloat(window.getComputedStyle(object.element).getPropertyValue("opacity")) === parseFloat(object.opacity[0]);
};

var effect_fade_loadTargets = function loadTargets(_val, host) {
  effect_fade_unloadTargets(host);
  host._targets = Object(utils_get["a" /* Get */])(host, "targets", []).map(function (target) {
    var object = {
      element: Pipe(IsElement, IfInvalid(null))(Object(utils_get["a" /* Get */])(target, "element")).value,
      on: Object(utils_get["a" /* Get */])(target, "on") && typeof target.on === "string" ? target.on : effect_fade_defaultOn,
      off: Object(utils_get["a" /* Get */])(target, "off") && typeof target.off === "string" ? target.off : defaultOff,
      opacity: Pipe(CommasToArray, IfInvalid(effect_fade_defaultOpacity), ToMap(function (v) {
        return ToNumber(v).value;
      }))(Object(utils_get["a" /* Get */])(target, "opacity")).value,
      speed: Pipe(ToNumber, IfInvalid(effect_fade_defaultSpeed))(Object(utils_get["a" /* Get */])(target, "speed")).value
    };

    if (effect_fade_validTarget(target)) {
      object.onHandler = function (e) {
        object.atStart = atStartPosition(object);
        host.dispatchEvent(new Event("startedon", {
          detail: object
        }));

        if (typeof target.onHandler === "function") {
          target.onHandler(e);
        }

        return effect_fade_animator(object.opacity.slice(), object.speed, function (opacity) {
          return object.element.style.opacity = opacity;
        }).then(function () {
          object.element.style.opacity = object.opacity[object.opacity.length];
          host.dispatchEvent(new Event("endedon", {
            detail: object
          }));
          return object;
        });
      };

      object.offHandler = function (e) {
        object.atStart = atStartPosition(object);
        host.dispatchEvent(new Event("startedoff", {
          detail: object
        }));

        if (typeof target.offHandler === "function") {
          target.offHandler(e);
        }

        return effect_fade_animator(object.opacity.slice().reverse(), object.speed, function (opacity) {
          return object.element.style.opacity = opacity;
        }).then(function () {
          object.element.style.opacity = object.opacity[0];
          host.dispatchEvent(new Event("endedoff", {
            detail: object
          }));
          return object;
        });
      };

      object.observers = {
        on: ObserveEvent(object.element, object.on).subscribe(object.onHandler),
        off: ObserveEvent(object.element, object.off).subscribe(object.offHandler)
      };
      return object;
    }
  }).filter(function (t) {
    return !!t;
  });
};

var effect_fade_properties = {
  "class": ComponentClassObject,
  targets: {
    format: function format(val) {
      return Pipe(ToArray, IfInvalid([]))(val).value;
    },
    onChange: effect_fade_loadTargets
  }
};

var effect_fade_runTargetAtIndex = function runTargetAtIndex(index, host) {
  var object = Object(utils_get["a" /* Get */])(host, "_targets.".concat(index));
  var handler = Object(utils_get["a" /* Get */])(object, "".concat(atStartPosition(object) ? "on" : "off", "Handler"));
  return handler ? handler() : undefined;
};

var EffectFade = WCConstructor({
  componentName: effect_fade_componentName,
  componentRoot: effect_fade_componentRoot,
  template: effect_fade_template,
  style: effect_fade_style,
  observedAttributes: Object.keys(effect_fade_properties),
  properties: effect_fade_properties,
  elements: effect_fade_elements,
  methods: {
    trigger: function trigger(host) {
      return function (index) {
        return effect_fade_runTargetAtIndex(index, host);
      };
    }
  },
  onReady: function onReady(host) {
    return effect_fade_loadTargets(undefined, host);
  },
  onDisconnected: function onDisconnected(host) {
    return effect_fade_unloadTargets(host);
  }
});
WCDefine(effect_fade_componentName, EffectFade);
// CONCATENATED MODULE: ./src/utils/use-if.js

function UseIf(condition, ifNot, value) {
  return TMonad(condition(value) ? value : ifNot(value));
}
// CONCATENATED MODULE: ./src/utils/selector-to-element.js

function SelectorToElement(parent, value) {
  var Value = TMonad(value);

  if (Value.stop) {
    return Value;
  }

  if (!parent || typeof parent.querySelector !== "function") {
    parent = document.firstElementChild || document.documentElement.body || document.documentElement.firstElementChild;
  }

  if (Value.type === "string") {
    Value.value = parent.querySelector(Value.value);
  }

  var result = IsElement(Value);
  return result;
}
// CONCATENATED MODULE: ./src/utils/selector-array-to-elements.js

function SelectorArrayToElements(parent, value) {
  var Value = ToArray(value);

  if (Value.stop) {
    return Value;
  }

  if (!Value.valid || Value.type !== "array") {
    return Value;
  }

  if (!parent) {
    parent = document.firstElementChild;
  }

  Value.value = Value.value.map(function (el) {
    return UseIf(function (v) {
      return v.valid;
    }, function () {
      return {
        value: null
      };
    }, SelectorToElement(null, el)).value;
  }).filter(function (v) {
    return !!v;
  });
  Value.valid = Value.value.length;
  return Value;
}
// CONCATENATED MODULE: ./src/components/effect-ripple/index.js


var effect_ripple_style = __webpack_require__(51).toString();

var effect_ripple_template = __webpack_require__(52);

var effect_ripple_componentName = "effect-ripple";
var effect_ripple_componentRoot = ".effect-ripple-container";
var maxScale = 1.3;

var effect_ripple_animator = function animator(points, speed, stepFn) {
  return new Promise(function (resolve) {
    return Object(timer["a" /* Timer */])(stepFn, EaseInOut(points, speed)).then(resolve);
  });
};

var effect_ripple_trigger = function trigger(host) {
  return function () {
    return effect_ripple_runStart(host);
  };
};

var effect_ripple_selectorsToDom = function selectorsToDom(val) {
  return SelectorArrayToElements(null, val).value;
};

var effect_ripple_runStart = function runStart(host) {
  if (!host.ready || host.isRunning) {
    return;
  }

  host.isRunning = true;
  var ripple = host.elements.ripple;
  var rippleInner = document.createElement("span");
  rippleInner.className = "ripple-inner";
  rippleInner.style.backgroundColor = host.color;
  ripple.appendChild(rippleInner);
  effect_ripple_setOrigin(host, rippleInner);
  effect_ripple_animator([0, maxScale], host.speed / 2, function (scale) {
    var scaleAmount = Math.max(Math.min(maxScale, scale), 0);
    rippleInner.style.transform = "perspective(1px) translateZ(0) scaleX(".concat(scaleAmount, ") scaley(").concat(scaleAmount, ")");
  });
  effect_ripple_animator([host.opacity * 0.5, host.opacity, host.opacity * 0.5, host.opacity * 0.125, host.opacity * 0.03, 0], host.speed, function (opacity) {
    return rippleInner.style.opacity = "".concat(Math.max(Math.min(1, opacity), 0));
  }).then(function () {
    return Object(on_next_frame["a" /* OnNextFrame */])(function () {
      return ripple ? ripple.removeChild(rippleInner) : undefined;
    });
  });
};

var effect_ripple_setOrigin = function setOrigin(host, rippleInner) {
  if (!host.ready) {
    return;
  }

  Object(on_next_frame["a" /* OnNextFrame */])(function () {
    var nonAutoOrigin = host.nonAutoOrigin;
    var rippleInnerStyle = rippleInner.style;

    if (nonAutoOrigin) {
      return rippleInnerStyle.transformOrigin = nonAutoOrigin;
    }

    if (!host.downEvent || !host.downEvent.target) {
      return rippleInnerStyle.transformOrigin = "50% 50%";
    }

    var eventX = host.downEvent.x;
    var eventY = host.downEvent.y;
    var targetBox = host.downEvent.target.getBoundingClientRect();
    var left = Math.round((eventX - targetBox.left) / targetBox.width * 100);
    var top = Math.round((eventY - targetBox.top) / targetBox.height * 100);
    rippleInnerStyle.transformOrigin = "".concat(left, "% ").concat(top, "%");
  });
};

var effect_ripple_unloadTargets = function unloadTargets(host) {
  if (!host.hasTargets$) {
    return;
  }

  host.targets$.forEach(function (ob$) {
    return ob$();
  });
  host.targets$ = [];
};

var effect_ripple_loadTargets = function loadTargets(host) {
  if (!Array.isArray(host.targets$)) {
    host.targets$ = [];
  }

  if (!host.targets || !host.start) {
    return;
  }

  if (!Array.isArray(host.targets)) {
    return;
  }

  host.targets.forEach(function (target) {
    host.targets$.push(ObserveEvent(target, "mousedown").subscribe(function (e) {
      return host.downEvent = e;
    }));
    host.targets$.push(ObserveEvent(target, host.start).subscribe(function () {
      return effect_ripple_runStart(host);
    }));
  });
};

var effect_ripple_resetTargets = function resetTargets(host) {
  effect_ripple_unloadTargets(host);
  effect_ripple_loadTargets(host);
};

var effect_ripple_properties = {
  color: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("#59a2d8"))(val).value;
    }
  },
  opacity: {
    format: function format(val) {
      return Math.min(1, Math.max(0, Pipe(ToNumber, IfInvalid(0.2))(val).value));
    }
  },
  speed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(600))(val).value;
    }
  },
  start: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("mousedown"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return effect_ripple_resetTargets(host);
    }
  },
  direction: {
    format: function format(val) {
      return typeof val === "string" ? val : "auto";
    }
  },
  targets: {
    format: effect_ripple_selectorsToDom,
    onChange: function onChange(_val, host) {
      return effect_ripple_resetTargets(host);
    }
  }
};

var hasTargets = function hasTargets(host) {
  return {
    get: function get() {
      return host.ready && !!host.targets && Array.isArray(host.targets) && !!host.targets.length;
    }
  };
};

var hasTargets$ = function hasTargets$(host) {
  return {
    get: function get() {
      return host.hasTargets && host.targets$ && Array.isArray(host.targets$);
    }
  };
};

var hasStart = function hasStart(host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && !!host.start;
    }
  };
};

var canStart = function canStart(host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.start && host.start !== "none";
    }
  };
};

var effect_ripple_nonAutoOrigin = function nonAutoOrigin(host) {
  return {
    get: function get() {
      return host.downEvent === undefined || host.downEvent && !host.downEvent.target || host.direction !== undefined && host.direction !== "auto" ? host.direction === "to left" ? "100% center" : ["center", "auto"].indexOf(host.direction) > -1 ? "center center" : "0% center" : false;
    }
  };
};

var canLoadTargets = function canLoadTargets(host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.hasStart;
    }
  };
};

var effect_ripple_elements = {
  root: {
    selector: ".effect-ripple-container"
  },
  ripple: {
    selector: ".ripple"
  }
};
var EffectRipple = WCConstructor({
  componentName: effect_ripple_componentName,
  componentRoot: effect_ripple_componentRoot,
  template: effect_ripple_template,
  style: effect_ripple_style,
  observedAttributes: Object.keys(effect_ripple_properties),
  properties: effect_ripple_properties,
  elements: effect_ripple_elements,
  methods: {
    trigger: effect_ripple_trigger
  },
  computed: {
    hasTargets: hasTargets,
    hasTargets$: hasTargets$,
    hasStart: hasStart,
    canLoadTargets: canLoadTargets,
    canStart: canStart,
    nonAutoOrigin: effect_ripple_nonAutoOrigin
  },
  onDisconnected: function onDisconnected(host) {
    return effect_ripple_unloadTargets(host);
  }
});
WCDefine(effect_ripple_componentName, EffectRipple);
// CONCATENATED MODULE: ./src/utils/selector-to-elements.js

function SelectorToElements(parent, value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  if (!parent) {
    parent = document.firstElementChild || document.documentElement;
  }

  var isEl = IsElement(result);

  if (result.type === "string") {
    result.value = Array.from(parent.querySelectorAll(result.value));
  } else if (isEl.valid) {
    result.value = [result.value];
  }

  result.valid = result.value && result.value.length && result.value.filter(function (e) {
    return IsElement(e).valid;
  }).length;
  return result;
}
// CONCATENATED MODULE: ./src/utils/selector-array-to-all-elements.js

function SelectorArrayToAllElements(parent, value) {
  var Value = ToArray(value);

  if (Value.stop) {
    return Value;
  }

  if (!Value.valid || Value.type !== "array") {
    return Value;
  }

  if (!parent) {
    parent = document.firstElementChild;
  }

  Value.value = Value.value.map(function (el) {
    var values = UseIf(function (v) {
      return v.valid;
    }, function () {
      return {
        value: null
      };
    }, SelectorToElements(null, el)).value;
    return values.value;
  }).filter(function (v) {
    return !!v;
  });
  Value.valid = Value.value.length;
  return Value;
}
// CONCATENATED MODULE: ./src/components/effect-scale/methods.js

var idealFPS = 60;

var methods_frames = function frames(speed) {
  return Math.round(idealFPS * (speed / 1000));
};

var setTransform = function setTransform(element, X, Y, doX, doY, lastFrame, toScaledState) {
  element.style.transform = "perspective(1px) translateZ(0) scaleX(".concat(X, ") scaleY(").concat(Y, ")");

  if (doX === true) {
    element.style.width = "unset";
  }

  if (doY === true) {
    element.style.height = "unset";
  }

  if (lastFrame && !toScaledState) {
    return;
  }

  var box = element.getBoundingClientRect();

  if (doX === true) {
    element.style.width = lastFrame && !toScaledState ? "unset" : "".concat(box.width, "px");
  }

  if (doY === true) {
    element.style.height = lastFrame && !toScaledState ? "unset" : "".concat(box.height, "px");
  }
  /*
  if (doX === true) {
      const calculatedWidth = element.scrollWidth * X
      element.style.width = lastFrame && !toScaledState ? `unset` : `${calculatedWidth}px`
  }
   if (doY === true) {
      const calculatedHeight = element.scrollHeight * Y
      element.style.height = lastFrame && !toScaledState ? `unset` : `${calculatedHeight}px`
  }
  */

};

var transformElements = function transformElements(targets, X, Y, doX, doY, lastFrame, toScaledState) {
  targets.forEach(function (element) {
    if (Array.isArray(element)) {
      return element.forEach(function (el) {
        return setTransform(el, X, Y, doX, doY, lastFrame, toScaledState);
      });
    }

    setTransform(element, X, Y, doX, doY, lastFrame, toScaledState);
  });
};

var setStaticTransform = function setStaticTransform(targets) {
  var set = function set(el) {
    el.style.transformStyle = "preserve-3d";
    el.style.backfaceVisibility = "hidden";
  };

  targets.forEach(function (element) {
    if (Array.isArray(element)) {
      return element.forEach(set);
    }

    set(element);
  });
};

var canNotRun = function canNotRun(host) {
  return host.ready !== true || !host.hasTargets || typeof host.x !== "boolean" || typeof host.y !== "boolean" || typeof host.scaled !== "boolean";
};

var methods_run = function run(scaled, host) {
  var quickSet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (canNotRun(host)) {
    return;
  }

  scaled = host.scaled;
  setStaticTransform(host.targets);
  var initial = 1;
  var amount = initial + host.amount;
  var startAmount = !scaled ? amount : initial;
  var endAmount = !scaled ? initial : amount;
  var scalePoints = GetCurve([startAmount, endAmount], !scaled ? host.spring : 0.5, false, quickSet || host.isInitialized !== true ? 1 : methods_frames(scaled ? host.speed * 0.618 : host.speed));
  host.isInitialized = true;

  var loop = function loop() {
    if (scaled !== host.scaled) {
      return;
    }

    var scale = scalePoints.shift();
    var lastFrame = !scalePoints.length;

    var getXY = function getXY(key) {
      return !!host[key] && lastFrame ? endAmount : host[key] ? scale : 1;
    };

    host.isScaling = lastFrame ? false : true;
    host.isScaled = scaled && lastFrame ? true : false;
    transformElements(host.targets, getXY("x"), getXY("y"), host.x, host.y, lastFrame, scaled);

    if (!lastFrame) {
      return requestAnimationFrame(loop);
    }
  };

  loop();
};
var methods_setOrigin = function setOrigin(val, host) {
  if (!host.hasTargets) {
    return;
  }

  var parts = val.split(" ");
  var x = parts[0];
  var y = parts.length > 1 ? parts[1] : parts[0];
  var origin = "".concat(x, " ").concat(y);

  if (!Array.isArray(host.targets)) {
    return;
  }

  host.targets.forEach(function (target) {
    if (Array.isArray(target)) {
      return target.forEach(function (element) {
        return element.style.transformOrigin = origin;
      });
    }

    if (target) {
      target.style.transformOrigin = origin;
    }
  });
};
var methods_dispose = function dispose(host) {
  unloadElements(host, "targets");
  unloadElements(host, "triggers");
};

var unloadElements = function unloadElements(host, key) {
  if (!host["".concat(key, "$")]) {
    return;
  }

  host["".concat(key, "$")].forEach(function (ob$) {
    return ob$();
  });
  host["".concat(key, "$")] = [];
};

var methods_loadElements = function loadElements(host, key) {
  if (key === "targets") {
    return methods_run(host.scaled, host);
  }

  if (!host.hasTriggers || !host.start) {
    return;
  }

  if (!Array.isArray(host.triggers$)) {
    host.triggers$ = [];
  }

  var toggle = !host.end;

  var setEvents = function setEvents(trigger) {
    if (toggle) {
      return host.triggers$.push(ObserveEvent(trigger, host.start).subscribe(function () {
        return host.scaled = !host.scaled;
      }));
    }

    host.triggers$.push(ObserveEvent(trigger, host.start).subscribe(function () {
      return host.scaled = true;
    }));
    host.triggers$.push(ObserveEvent(trigger, host.end).subscribe(function () {
      return host.scaled = false;
    }));
  };

  host.triggers.forEach(function (trigger) {
    if (Array.isArray(trigger)) {
      return trigger.forEach(setEvents);
    }

    setEvents(trigger);
  });
};

var methods_unloadTargets = function unloadTargets(host) {
  return unloadElements(host, "targets");
};
var unloadTriggers = function unloadTriggers(host) {
  return unloadElements(host, "triggers");
};
var methods_loadTargets = function loadTargets(host) {
  return methods_loadElements(host, "targets");
};
var loadTriggers = function loadTriggers(host) {
  return methods_loadElements(host, "triggers");
};
// CONCATENATED MODULE: ./src/components/effect-scale/properties.js



var properties_reset = function reset(host) {
  methods_unloadTargets(host);
  unloadTriggers(host);
  methods_loadTargets(host);
  loadTriggers(host);
  methods_setOrigin(host.startfrom, host);
};

var properties_directions = ["center", "center top", "center bottom", "left top", "left center", "left bottom", "right top", "right center", "right bottom"];

var properties_onChange = function onChange() {};

var properties_selectorsToDom = function selectorsToDom(val) {
  return SelectorArrayToAllElements(null, val).value;
};

var attributes = {
  amount: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(-1))(val).value;
    },
    onChange: properties_onChange
  },
  "class": ComponentClassObject,
  end: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(_val, host) {
      return properties_reset(host);
    }
  },
  scaled: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      return host.ready ? methods_run(val, host) : undefined;
    }
  },
  speed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(333))(val).value;
    },
    onChange: properties_onChange
  },
  spring: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(4))(val).value;
    },
    onChange: properties_onChange
  },
  start: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("mousedown"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return properties_reset(host);
    }
  },
  startfrom: {
    format: function format(val) {
      return Pipe(IndexOf(properties_directions), IfInvalid("center"))(val).value;
    },
    onChange: methods_setOrigin
  },
  targets: {
    format: properties_selectorsToDom,
    onChange: function onChange(_val, host) {
      return properties_reset(host);
    }
  },
  triggers: {
    format: properties_selectorsToDom,
    onChange: function onChange(_val, host) {
      return properties_reset(host);
    }
  },
  x: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: properties_onChange
  },
  y: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: properties_onChange
  }
}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var properties_properties = attributes;
var properties_observedAttributes = Object.keys(attributes);
// CONCATENATED MODULE: ./src/components/effect-scale/elements.js
var elements_elements = {
  root: {
    selector: ".effect-scale-container"
  }
};
/* harmony default export */ var effect_scale_elements = (elements_elements);
// CONCATENATED MODULE: ./src/components/effect-scale/index.js



 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var effect_scale_style = __webpack_require__(53).toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var effect_scale_template = __webpack_require__(54);

var effect_scale_componentName = "effect-scale";
var effect_scale_componentRoot = ".effect-scale-container";
var EffectScale = WCConstructor({
  componentName: effect_scale_componentName,
  componentRoot: effect_scale_componentRoot,
  template: effect_scale_template,
  style: effect_scale_style,
  observedAttributes: properties_observedAttributes,
  properties: properties_properties,
  elements: effect_scale_elements,
  computed: {
    hasTargets: function hasTargets(host) {
      return {
        get: function get() {
          return !!host.targets && host.targets.length && typeof host.targets.forEach === "function";
        }
      };
    },
    hasTriggers: function hasTriggers(host) {
      return {
        get: function get() {
          return !!host.triggers && host.triggers.length && typeof host.triggers.forEach === "function";
        }
      };
    },
    hasScale: function hasScale(host) {
      return {
        get: function get() {
          return host.isScaling || host.isScaled;
        }
      };
    }
  },
  onReady: function onReady(host) {
    methods_run(host.scaled, host, true);
  },
  onDisconnected: function onDisconnected(host) {
    return methods_dispose(host);
  }
});
WCDefine(effect_scale_componentName, EffectScale);
// CONCATENATED MODULE: ./src/components/effect-underline/methods.js


var signalEnd = function signalEnd(host) {
  return runEnd(host);
};

var effect_underline_methods_animator = function animator(points, speed, stepFn) {
  return new Promise(function (resolve) {
    return Object(timer["a" /* Timer */])(stepFn, EaseInOut(points, speed)).then(resolve);
  });
};

var runAnimation = function runAnimation(host, isOn) {
  var underlineStyle = host.elements.underline.style;

  if (isOn) {
    underlineStyle.opacity = host.opacity;
    effect_underline_methods_setOrigin(host);
  }

  effect_underline_methods_animator(isOn ? [0, 1] : [1, 0], host.speed / 2, function (scale) {
    return underlineStyle.transform = "perspective(1px) translateZ(0) scaleX(".concat(scale, ")");
  }).then(function () {
    return underlineStyle.transform = "perspective(1px) translateZ(0) scaleX(".concat(isOn ? 1 : 0, ")");
  });
};

var runEnd = function runEnd(host) {
  return function () {
    if (!host.canRunEnd) {
      return;
    }

    host.on = false;
    runAnimation(host, false);
  };
};

var methods_runStart = function runStart(host) {
  return function () {
    if (!host.canRunStart) {
      return;
    }

    host.on = true;
    runAnimation(host, true);
    host.downEvent = undefined;
  };
};

var effect_underline_methods_setOrigin = function setOrigin(host) {
  if (!host.ready) {
    return;
  }

  Object(on_next_frame["a" /* OnNextFrame */])(function () {
    var nonAutoOrigin = host.nonAutoOrigin;
    var underlineStyle = host.elements.underline.style;

    if (nonAutoOrigin) {
      return underlineStyle.transformOrigin = nonAutoOrigin;
    }

    var eventX = Object(utils_get["a" /* Get */])(host, "downEvent.x", 0);
    var targetBox = Object(utils_get["a" /* Get */])(host, "downEvent.target.getBoundingClientRect()", {
      left: 0,
      width: 0
    });
    var left = Math.round((eventX - targetBox.left) / targetBox.width * 100);
    underlineStyle.transformOrigin = "".concat(left, "% center");
  });
};

var methods_toggle = function toggle(host) {
  return host.on ? runEnd(host) : methods_runStart(host);
};
var methods_open = function open(host) {
  return methods_runStart(host);
};
var methods_close = function close(host) {
  return runEnd(host);
};
var effect_underline_methods_unloadTargets = function unloadTargets(host) {
  if (!host.hasTargets$) {
    return;
  }

  host.targets$.forEach(function (ob$) {
    return ob$();
  });
  host.targets$ = [];
};
var effect_underline_methods_loadTargets = function loadTargets(host) {
  if (!Array.isArray(host.targets$)) {
    host.targets$ = [];
  }

  if (!host.canLoadTargets) {
    return;
  }

  effect_underline_methods_unloadTargets(host);

  if (!Array.isArray(host.targets)) {
    return;
  }

  host.targets.forEach(function (target) {
    if (host.canStart) {
      host.targets$.push(ObserveEvent(target, "mousedown").subscribe(function (e) {
        return host.downEvent = e;
      }));
      host.targets$.push(ObserveEvent(target, host.start).subscribe(methods_runStart(host)));
    }

    if (host.canEnd) {
      host.targets$.push(ObserveEvent(target, host.end).subscribe(signalEnd(host)));
    }
  });
};
// CONCATENATED MODULE: ./src/components/effect-underline/properties.js



var properties_resetTargets = function resetTargets(host) {
  effect_underline_methods_unloadTargets(host);
  effect_underline_methods_loadTargets(host);
};

var effect_underline_properties_selectorsToDom = function selectorsToDom(val) {
  return SelectorArrayToElements(null, val).value;
};

var properties_attributes = {
  color: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("#59a2d8"))(val).value;
    },
    onChange: function onChange(val, host) {
      return !val || !host.elements.underline ? undefined : host.elements.underline.style.backgroundColor = "".concat(val);
    }
  },
  direction: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("auto"))(val).value;
    }
  },
  end: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(_val, host) {
      return properties_resetTargets(host);
    }
  },
  opacity: {
    format: function format(val) {
      return Math.min(1, Math.max(0, Pipe(ToNumber, IfInvalid(0.2))(val).value));
    }
  },
  speed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(700))(val).value;
    }
  },
  start: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("mousedown"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return properties_resetTargets(host);
    }
  },
  spring: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(4))(val).value;
    }
  },
  targets: {
    format: effect_underline_properties_selectorsToDom,
    onChange: function onChange(_val, host) {
      return properties_resetTargets(host);
    }
  }
}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var effect_underline_properties_properties = properties_attributes;
var effect_underline_properties_observedAttributes = Object.keys(properties_attributes);
var properties_hasTargets = function hasTargets(host) {
  return {
    get: function get() {
      return host.ready && !!host.targets && Array.isArray(host.targets) && !!host.targets.length;
    }
  };
};
var properties_hasTargets$ = function hasTargets$(host) {
  return {
    get: function get() {
      return host.hasTargets && host.targets$ && Array.isArray(host.targets$);
    }
  };
};
var properties_hasStart = function hasStart(host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.start;
    }
  };
};
var properties_canStart = function canStart(host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.start && host.start !== "none";
    }
  };
};
var canEnd = function canEnd(host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.end && host.end !== "none";
    }
  };
};
var canRunStart = function canRunStart(host) {
  return {
    get: function get() {
      return host.hasTargets && !host.on;
    }
  };
};
var canRunEnd = function canRunEnd(host) {
  return {
    get: function get() {
      return host.hasTargets && host.on;
    }
  };
};
var properties_nonAutoOrigin = function nonAutoOrigin(host) {
  return {
    get: function get() {
      return host.downEvent === undefined || host.downEvent && !host.downEvent.target || host.direction !== undefined && host.direction !== "auto" ? host.direction === "to left" ? "100% center" : ["center", "auto"].indexOf(host.direction) > -1 ? "center center" : "0% center" : false;
    }
  };
};
var properties_canLoadTargets = function canLoadTargets(host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.hasStart;
    }
  };
};
// CONCATENATED MODULE: ./src/components/effect-underline/index.js



var effect_underline_elements = {
  root: {
    selector: ".effect-underline-container"
  },
  underline: {
    selector: ".underline"
  }
};

var effect_underline_style = __webpack_require__(55).toString();

var effect_underline_template = __webpack_require__(56);

var effect_underline_componentName = "effect-underline";
var effect_underline_componentRoot = ".effect-underline-container";
var EffectUnderline =
/*#__PURE__*/
WCConstructor({
  componentName: effect_underline_componentName,
  componentRoot: effect_underline_componentRoot,
  template: effect_underline_template,
  style: effect_underline_style,
  observedAttributes: effect_underline_properties_observedAttributes,
  properties: effect_underline_properties_properties,
  elements: effect_underline_elements,
  methods: {
    toggle: methods_toggle,
    open: methods_open,
    close: methods_close
  },
  computed: {
    hasTargets: properties_hasTargets,
    hasTargets$: properties_hasTargets$,
    hasStart: properties_hasStart,
    canLoadTargets: properties_canLoadTargets,
    canStart: properties_canStart,
    canEnd: canEnd,
    canRunStart: canRunStart,
    canRunEnd: canRunEnd,
    nonAutoOrigin: properties_nonAutoOrigin
  },
  onDisconnected: function onDisconnected(host) {
    return effect_underline_methods_unloadTargets(host);
  }
});
WCDefine(effect_underline_componentName, EffectUnderline);
// CONCATENATED MODULE: ./src/utils/observe-visibility.js


function ObserveVisibility(element) {
  var returnEmpty = function returnEmpty() {
    var _observer = Observer(false);

    Object(on_next_frame["a" /* OnNextFrame */])(function () {
      _observer.next(false);

      _observer.complete();
    });
    return _observer;
  };

  if (!element) {
    return returnEmpty();
  }

  var isRunning = false;
  var intersectionObserver;

  var callback = function callback(e) {
    return !observer || !observer.subscriptions || Object.keys(observer.subscriptions).length === 0 ? shutDown() : observer.next(e);
  };

  var startup = function startup() {
    if (isRunning || intersectionObserver) {
      return;
    }

    isRunning = true;
    intersectionObserver = new IntersectionObserver(callback);
    intersectionObserver.observe(element);
  };

  var observer = Observer(undefined, undefined, startup);

  var shutDown = function shutDown() {
    try {
      intersectionObserver.disconnect();
    } catch (error) {}

    intersectionObserver = undefined;
    isRunning = false;
  };

  var dispose = function dispose() {
    shutDown();
    observer.complete();

    try {
      exists();
    } catch (error) {}
  };

  var exists = ObserveExists(element).subscribe(function (exists) {
    return exists ? undefined : dispose();
  });
  startup();
  return observer;
}
// CONCATENATED MODULE: ./src/components/grid-layout/index.js




var grid_layout_style = __webpack_require__(19).toString();

var grid_layout_outerStyle = __webpack_require__(57).toString();

var grid_layout_template = __webpack_require__(58);

var grid_layout_componentName = "grid-layout";
var grid_layout_componentRoot = ".".concat(grid_layout_componentName, "-container");
var grid_layout_defaultWidth = 240;
var grid_layout_defaultGap = [16, 16];

var unsupportedCSS = function unsupportedCSS(host, gap, columnwidth) {
  return typeof host.style.grid === "string" ? "" : ".grid-layout-items{margin-left:-".concat(gap, "px;margin-right:-").concat(gap, "px;}.grid-layout-items .grid-layout-item{max-width:").concat(columnwidth, "px;margin:").concat(gap, "px;}");
};

var cancelTimer = function cancelTimer(host) {
  return host.timer ? host.timer.cancel() : undefined;
};

var grid_layout_setScale = function setScale(host) {
  return Object(on_next_frame["a" /* OnNextFrame */])(function () {
    if (!host.scaletofit) {
      return;
    }

    var gap = host.gap || grid_layout_defaultGap;
    var gapMedian = gap.reduce(function (t, c) {
      t = t + c;
      return t;
    }, 0) / 2;
    var columnwidth = host.columnwidth || grid_layout_defaultWidth;
    var contentWidth = host.elements.root.offsetWidth + gapMedian;
    var columnGapPercent = 100 / Math.round(contentWidth / (gapMedian + columnwidth));
    var ratio = 1 - gapMedian / columnwidth;

    if (columnwidth === "100%") {
      columnwidth = 100;
      gapMedian = 0;
    } else {
      if (columnGapPercent > 50) {
        columnGapPercent = 50;
      }

      columnwidth = columnGapPercent * ratio;
      gapMedian = (columnGapPercent - columnwidth) / 2;
    }

    var thisStyle = ".grid-layout-items{display:flex; width:".concat(100 + gapMedian * 2, "%;margin-left:-").concat(gapMedian, "%;}.grid-layout-item{width:").concat(columnwidth, "%;padding:").concat(gapMedian / 2, "% ").concat(gapMedian, "%;}");
    SetStyleRules(host.elements.innerStyles, thisStyle);
  });
};

var grid_layout_setDimensions = function setDimensions(host) {
  return Object(on_next_frame["a" /* OnNextFrame */])(function () {
    var gap = host.gap || grid_layout_defaultGap;
    var gapValues = Array.isArray(gap) ? [gap[0], gap[1]] : [gap, gap];
    var gapMedian = gapValues.reduce(function (t, c) {
      t = t + c;
      return t;
    }, 0) / 2;
    var columnwidth = host.columnwidth || grid_layout_defaultWidth;
    var thisStyle = ".grid-layout-items{grid-row-gap:".concat(gapValues[0], "px; grid-column-gap:").concat(gapValues[1], "px; grid-template-columns:repeat(auto-fit, minmax(").concat(columnwidth, "px, 0fr));}").concat(unsupportedCSS(host, gapMedian, columnwidth));
    SetStyleRules(host.elements.innerStyles, thisStyle);
  });
};

var grid_layout_elements = {
  root: {
    selector: grid_layout_componentRoot
  },
  itemsContainer: {
    selector: ".".concat(grid_layout_componentName, "-items")
  },
  innerStyles: {
    selector: "style.innerStyles"
  }
};

var runDimensions = function runDimensions(host) {
  cancelTimer(host);
  host.timer = grid_layout_setDimensions(host);
};

var runScale = function runScale(host) {
  cancelTimer(host);
  host.timer = grid_layout_setScale(host);
};

var grid_layout_properties = {
  columnwidth: {
    format: function format(val) {
      return val === "100%" ? val : Pipe(ToNumber, IfInvalid(grid_layout_defaultWidth))(val).value;
    },
    onChange: function onChange(_val, host) {
      return host.scaletofit ? runScale(host) : runDimensions(host);
    }
  },
  gap: {
    format: function format(val) {
      return Pipe(CommasToArray, IfInvalid([val, val]), ToMap(function (v) {
        var tv = ToNumber(v).value;

        if (isNaN(tv)) {
          return grid_layout_defaultGap[0];
        }

        return tv;
      }))(val).value;
    },
    onChange: function onChange(_val, host) {
      return host.scaletofit ? runScale(host) : runDimensions(host);
    }
  },
  scaletofit: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    }
  },
  watchhidden: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(_val, host) {
      return host.wrap();
    }
  }
};

var grid_layout_getComponentStyles = function getComponentStyles(host) {
  return function () {
    return "".concat(__webpack_require__(19).toString()).concat(host.theme || "").concat(host.styles);
  };
};

var grid_layout_notSlottable = function notSlottable(el) {
  return Object(utils_get["a" /* Get */])(el, "nongrid") || Object(utils_get["a" /* Get */])(el, "tagName.toLowerCase()") === "style";
};

var grid_layout_clear = function clear(host) {
  return function () {
    return Array.from(host.children).forEach(function (el) {
      return !grid_layout_notSlottable(el) ? Try(function (el) {
        return host.removeChild(el);
      })(el) : undefined;
    });
  };
};

var grid_layout_wrap = function wrap(host) {
  return function () {
    return Array.from(host.children).forEach(function (el) {
      if (grid_layout_notSlottable(el)) {
        return;
      }

      if (host.watchhidden) {
        grid_layout_watchItemVisibility(el);
      }

      if (el.getAttribute("wrapped")) {
        return;
      }

      grid_layout_wrapItem(host.elements.itemsContainer, el);
    });
  };
};

var grid_layout_watchItemVisibility = function watchItemVisibility(el) {
  if (!el.eventSubscriptions) {
    el.eventSubscriptions = {};
  }

  if (el.eventSubscriptions.visibility) {
    return;
  }

  el.eventSubscriptions.visibility = ObserveVisibility(el).subscribe(function (e) {
    var container = el.container;

    if (!container) {
      return;
    }

    var bounds = e[e.length - 1].boundingClientRect;
    var hidden = bounds.width === 0 && bounds.height === 0;
    var currentlyHidden = container.classList.contains("hidden");

    if (hidden !== currentlyHidden) {
      container.classList[hidden ? "add" : "remove"]("hidden");
    }
  });
};

var grid_layout_wrapItem = function wrapItem(itemsContainer, el) {
  var id = Object(utils_id["a" /* ID */])();
  var slotWrapper = document.createElement("div");
  slotWrapper.className = "grid-layout-item";
  slotWrapper.id = id;
  itemsContainer.appendChild(slotWrapper);
  var slot = document.createElement("slot");
  slot.name = id;
  slotWrapper.appendChild(slot);
  el.slot = id;
  el.container = slotWrapper;
  el.setAttribute("wrapped", id);
  return el;
};

var GridLayout = WCConstructor({
  componentName: grid_layout_componentName,
  componentRoot: grid_layout_componentRoot,
  template: grid_layout_template,
  style: grid_layout_style,
  outerStyle: grid_layout_outerStyle,
  observedAttributes: Object.keys(grid_layout_properties),
  properties: grid_layout_properties,
  elements: grid_layout_elements,
  computed: {
    items: function items(host) {
      return {
        get: function get() {
          return Array.from(host.children).filter(function (el) {
            return el.tagName.toLowerCase() !== "style";
          });
        }
      };
    }
  },
  methods: {
    getComponentStyles: grid_layout_getComponentStyles,
    clear: grid_layout_clear,
    wrap: grid_layout_wrap
  },
  onConnected: function onConnected(host) {
    host.elements.innerStyles = AppendStyleElement(" ", host.shadowRoot, "innerStyles", "innerStyles");

    var disconnectEl = function disconnectEl(el) {
      var containerParent = Object(utils_get["a" /* Get */])(el, "container.parentElement");
      ObserverUnsubscribe(el);

      if (containerParent) {
        containerParent.removeChild(el.container);
      }
    };

    host.eventSubscriptions = {
      slot: ObserveSlots(host).subscribe(function (results) {
        results.removed.forEach(disconnectEl);
        host.wrap();
      })
    };
    window.addEventListener("resize", function () {
      return host.scaletofit ? runScale(host) : undefined;
    });
    host.wrap();
    Object(on_next_frame["a" /* OnNextFrame */])(function () {
      return host.setAttribute("viewable", true);
    });
  },
  onDisconnected: function onDisconnected(host) {
    ObserverUnsubscribe(host);
  }
});
WCDefine(grid_layout_componentName, GridLayout);
// CONCATENATED MODULE: ./src/components/horizontal-slider/methods.js


function whichTransitionEvent() {
  var t;
  var el = document.createElement("fakeelement");
  var transitions = {
    'transition': "transitionend",
    'OTransition': "oTransitionEnd",
    'MozTransition': "transitionend",
    'WebkitTransition': "webkitTransitionEnd"
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

var setLoop = function setLoop(host) {
  var itemContainer = host.elements.itemContainer;
  var inner = host.elements.inner;

  if (!host.items || !itemContainer || !inner) {
    return;
  }

  var transitionEvent = whichTransitionEvent();

  if (!transitionEvent) {
    setTimeout(function () {
      finish();
    }, 300);
  } else {
    itemContainer.addEventListener(transitionEvent, function endHandler() {
      finish();
      window.removeEventListener(transitionEvent, endHandler, false);
    }, false);
  }

  var items = host.items;
  var currentItem = items[host.currentindex];

  var getLeft = function getLeft() {
    return currentItem.offsetLeft + currentItem.offsetWidth / 2 - inner.offsetWidth / 2;
  };

  itemContainer.style.transform = "translateZ(0) translateX(".concat(-getLeft(), "px)");

  var finish = function finish() {
    itemContainer.style.transition = "none";
    var indexShift = Math.ceil(host.items.length / 2) - host.currentindex;
    var beforeCurrent = host.currentindex - 1;
    var afterCurrent = host.currentindex + 1;
    currentItem.style.order = Math.ceil(host.items.length / 2);

    var getShift = function getShift(index) {
      if (index + indexShift > items.length) {
        return -items.length + index + indexShift;
      }

      if (index + indexShift < 1) {
        return index + indexShift + items.length;
      }

      return index + indexShift;
    };

    while (items[beforeCurrent]) {
      items[beforeCurrent].style.order = getShift(beforeCurrent);
      itemContainer.style.transform = "translateZ(0) translateX(".concat(-getLeft(), "px)");
      beforeCurrent = beforeCurrent - 1;
    }

    while (items[afterCurrent]) {
      items[afterCurrent].style.order = getShift(afterCurrent);
      itemContainer.style.transform = "translateZ(0) translateX(".concat(-getLeft(), "px)");
      afterCurrent = afterCurrent + 1;
    }

    itemContainer.style.removeProperty("transition");
  };
};
var autoplay = function autoplay(host) {
  if (!Array.isArray(host.items)) {
    return;
  }

  var canPlay = function canPlay() {
    return !!host.intervalplay && host.intervalplay > 0 && host.paused !== true;
  };

  if (host.playing && canPlay()) {
    return;
  }

  var time = new Date().getTime();

  var run = function run() {
    if (!canPlay()) {
      host.playing = false;
      return;
    }

    var newTime = new Date().getTime();

    if (newTime - time > host.intervalplay) {
      host.playing = true;
      host.currentindex = host.currentindex + 1 > host.items.length - 1 ? 0 : host.currentindex + 1;
      time = new Date().getTime();
    }

    requestAnimationFrame(run);
  };

  if (canPlay()) {
    run();
  }
};
var methods_scrollToIndex = function scrollToIndex(host) {
  return function (index) {
    var itemContainer = host.elements.itemContainer;

    if (!host.items || !itemContainer) {
      return;
    }

    var finish = function finish() {
      setActiveItem(host);
      setActiveChicklet(host, index);
    };

    if (host.loop) {
      setLoop(host);
      return finish();
    }

    var item = host.items[index];
    host.currentindex = index;

    if (!item) {
      return;
    }

    var left = -(item.offsetLeft - (host.center ? host.elements.inner.offsetWidth / 2 - item.offsetWidth / 2 : 0));
    itemContainer.style.transform = "translateZ(0) translateX(".concat(left, "px)");
    finish();
  };
};
var goToNextPage = function goToNextPage(host, currentIndex) {
  var inner = host.elements.inner;
  var itemContainer = host.elements.itemContainer;

  if (!inner || !itemContainer) {
    return;
  }

  var targeWidth = inner.offsetWidth;
  var currentWidth = 0;
  var i = currentIndex;

  while (host.items[i]) {
    var itemWidth = host.items[i].offsetWidth;
    currentWidth = currentWidth + itemWidth;

    if (currentWidth > targeWidth) {
      break;
    }

    i = i + 1;
  }

  host.currentindex = i;
};
var goToPreviousPage = function goToPreviousPage(host, currentIndex) {
  var inner = host.elements.inner;
  var itemContainer = host.elements.itemContainer;

  if (!inner || !itemContainer) {
    return;
  }

  var currentWidth = inner.offsetWidth;
  var i = currentIndex;

  while (host.items[i]) {
    var itemWidth = host.items[i].offsetWidth;
    currentWidth = currentWidth - itemWidth;

    if (currentWidth < 0) {
      break;
    }

    i = i - 1;
  }

  host.currentindex = i;
};
// CONCATENATED MODULE: ./src/components/horizontal-slider/elements.js


var sliderItemSelectedClass = "active-horizontal-slider-item";
var sliderItemClass = "horizontal-slider-item";

var handleItemEnter = function handleItemEnter(item) {
  return item.hovering = true;
};

var handleItemLeave = function handleItemLeave(item) {
  return item.hovering = false;
};

var handleItemUp = function handleItemUp(item) {
  return item.touching = false;
};

var handleItemDown = function handleItemDown(item, host) {
  item.touching = true;
  host.currentindex = item.itemIndex;
  host.dispatchEvent(new CustomEvent("itemclick", {
    detail: {
      index: host.currentindex,
      item: item,
      host: host
    }
  }));
};

var elements_unsetItemEvents = function unsetItemEvents(items) {
  if (!items || !Array.isArray(items)) {
    return;
  }

  items.forEach(function (item) {
    Object.keys(Object(utils_get["a" /* Get */])(item, "eventSubscriptions", {})).forEach(function (key) {
      if (item.eventSubscriptions[key] && typeof item.eventSubscriptions[key] === "function") {
        item.eventSubscriptions[key]();
      }
    });
    item.classList.remove(sliderItemClass);
  });
};
var elements_setItemEvents = function setItemEvents(items, host) {
  if (!items || !Array.isArray(items)) {
    return;
  }

  items.forEach(function (item) {
    item.classList.add(sliderItemClass);
    item.eventSubscriptions = {
      mouseenter: ObserveEvent(item, "mouseenter").subscribe(function () {
        return handleItemEnter(item);
      }),
      mouseleave: ObserveEvent(item, "mouseleave").subscribe(function () {
        return handleItemLeave(item);
      }),
      mousedown: ObserveEvent(item, "mousedown").subscribe(function () {
        return handleItemDown(item, host);
      }),
      mouseup: ObserveEvent(item, "mouseup").subscribe(function () {
        return handleItemUp(item);
      })
    };
  });
};
var elements_setSlot = function setSlot(el, host) {
  if (!el) {
    return;
  }

  el.eventSubscriptions = {
    slot: ObserveEvent(el, "slotchange").subscribe(function () {
      var images = [];
      var items = Array.from(host.children).map(function (item, index) {
        item.itemIndex = index;
        item.style.order = index + 1;
        images = images.concat(Array.from(item.querySelectorAll("img")));
        return item;
      });
      Promise.all(images.map(function (image) {
        return new Promise(function (resolve) {
          if (image.complete) {
            return resolve(image);
          }

          function onComplete() {
            image.removeEventListener("load", onComplete, true);
            image.removeEventListener("error", onComplete, true);
            return resolve(image);
          }

          image.addEventListener("load", onComplete, true);
          image.addEventListener("error", onComplete, true);
        });
      })).then(function () {
        return host.items = items;
      });
    })
  };
};
var setActiveItem = function setActiveItem(host) {
  if (!Array.isArray(host.items)) {
    return;
  }

  var index = host.currentindex;
  host.items.forEach(function (item) {
    return item.classList[item.itemIndex === index ? "add" : "remove"](sliderItemSelectedClass);
  });
};
var chickletSelector = "horizontal-slider-chicklet";
var setActiveChicklet = function setActiveChicklet(host, selectedIndex) {
  var chickletContainer = host.elements.chicklets;
  Array.from(chickletContainer.querySelectorAll(".".concat(chickletSelector))).forEach(function (chicklet, index) {
    chicklet.classList[index === selectedIndex ? "add" : "remove"]("active");
  });
};
var elements_setChicklets = function setChicklets(host) {
  var chicklets = host.elements.chicklets;
  var root = host.elements.root;

  if (!chicklets || !Array.isArray(host.items)) {
    return;
  }

  if (!host.chicklets) {
    var currentChicklets = Array.from(chicklets.querySelectorAll(".".concat(chickletSelector)));
    currentChicklets.forEach(function (chicklet) {
      return host.unsubscribeEvents(chicklet);
    });
    chicklets.innerHTML = "";
  }

  root.classList[host.chicklets ? "add" : "remove"]("has-chicklets");
  host.items.forEach(function (_item, index) {
    var chicklet = document.createElement("div");
    chicklet.className = chickletSelector;
    chicklet.itemIndex = index;
    chicklets.appendChild(chicklet);
    chicklet.eventSubscriptions = {
      click: ObserveEvent(chicklet, "click").subscribe(function () {
        return host.currentindex = index;
      })
    };
  });
  setActiveChicklet(host, host.currentindex);
};
var arrowClass = "show-horizontal-slider-arrows";
var elements_setPrevious = function setPrevious(el, host) {
  if (!el) {
    return;
  }

  el.classList[host.arrows ? "add" : "remove"](arrowClass);
  host.unsubscribeEvents(el);
  el.eventSubscriptions = {
    click: ObserveEvent(el, "click").subscribe(function () {
      return goToPreviousPage(host, host.currentindex);
    })
  };
};
var elements_setNext = function setNext(el, host) {
  if (!el) {
    return;
  }

  el.classList[host.arrows ? "add" : "remove"](arrowClass);
  host.unsubscribeEvents(el);
  el.eventSubscriptions = {
    click: ObserveEvent(el, "click").subscribe(function () {
      return goToNextPage(host, host.currentindex);
    })
  };
};
var horizontal_slider_elements_elements = {
  root: {
    selector: ".horizontal-slider-container",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        mouseenter: ObserveEvent(el, "mouseenter").subscribe(function () {
          host.paused = true;
        }),
        mouseleave: ObserveEvent(el, "mouseleave").subscribe(function () {
          host.paused = false;
          autoplay(host);
        })
      };
    }
  },
  slot: {
    selector: "slot:not([name])",
    onChange: elements_setSlot
  },
  inner: {
    selector: ".horizontal-slider-inner"
  },
  itemContainer: {
    selector: ".horizontal-slider-items"
  },
  previous: {
    selector: ".horizontal-slider-previous",
    onChange: elements_setPrevious
  },
  next: {
    selector: ".horizontal-slider-next",
    onChange: elements_setNext
  },
  chicklets: {
    selector: ".horizontal-slider-chicklets",
    onChange: function onChange(_el, host) {
      return elements_setChicklets(host);
    }
  }
};
/* harmony default export */ var horizontal_slider_elements = (horizontal_slider_elements_elements);
// CONCATENATED MODULE: ./src/components/horizontal-slider/properties.js



var horizontal_slider_properties_attributes = {
  chicklets: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_setChicklets(host);
    }
  },
  arrows: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(_val, host) {
      elements_setPrevious(host.elements.previous, host);
      elements_setNext(host.elements.next, host);
    }
  },
  intervalplay: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(0))(val).value;
    },
    onChange: function onChange(_val, host) {
      return autoplay(host);
    }
  },
  currentindex: {
    format: function format(val, host) {
      var num = Pipe(ToNumber, IfInvalid(0))(val).value;

      if (Array.isArray(host.items) && num >= host.items.length) {
        num = host.items.length - 1;
      }

      if (num < 0) {
        num = 0;
      }

      return num;
    },
    onChange: function onChange(val, host) {
      return host.scrollToIndex(val);
    }
  },
  loop: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(_val, host) {
      setLoop(host);
    }
  },
  center: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(_val, host) {
      host.scrollToIndex(host.currentindex);
    }
  }
};
var horizontal_slider_properties_properties = Object.assign({}, horizontal_slider_properties_attributes, {
  items: {
    format: function format(val, host) {
      return Pipe(ToArray, IfInvalid(Object(utils_get["a" /* Get */])(host, "state.items.value", [])))(val).value;
    },
    onChange: function onChange(val, host) {
      elements_unsetItemEvents(host.state.items.previous);
      elements_setItemEvents(val, host);
      host.scrollToIndex(host.currentindex);
      elements_setChicklets(host);
      setLoop(host);
      autoplay(host);
      host.classList.add("isready");
    }
  }
});
var horizontal_slider_properties_observedAttributes = Object.keys(horizontal_slider_properties_attributes);
// CONCATENATED MODULE: ./src/components/horizontal-slider/index.js
/**
 * on load, images seem stretched then go to normal
 * cover flow
 * single item
 * onslidestart
 * onslideend
 * odd flicker when scrolling back
 * page scroll when center is messed up
 */





var horizontal_slider_style = __webpack_require__(59).toString();

var horizontal_slider_template = __webpack_require__(60);

var horizontal_slider_componentName = "horizontal-slider";
var horizontal_slider_componentRoot = ".horizontal-slider-container";
var HorizontalSlider =
/*#__PURE__*/
WCConstructor({
  componentName: horizontal_slider_componentName,
  componentRoot: horizontal_slider_componentRoot,
  template: horizontal_slider_template,
  style: horizontal_slider_style,
  observedAttributes: horizontal_slider_properties_observedAttributes,
  properties: horizontal_slider_properties_properties,
  elements: horizontal_slider_elements,
  methods: {
    scrollToIndex: methods_scrollToIndex
  },
  onConnected: function onConnected(host) {
    window.addEventListener("resize", function () {
      return host.scrollToIndex(host.currentindex);
    });

    if (!document.head.querySelector("style[name=\"horizontal-slider-styles\"]")) {
      AppendStyleElement(horizontal_slider_style, document.head, "horizontal-slider-styles");
    }
  }
});
WCDefine(horizontal_slider_componentName, HorizontalSlider);
// CONCATENATED MODULE: ./src/components/icon-element/index.js


var icon_element_style = __webpack_require__(61).toString();

var icon_element_elements = {
  svgContainer: {
    selector: ".svg-container"
  }
};
var icon_element_attributes = {
  svg: {
    format: function format(val) {
      return typeof val === "string" ? val : null;
    },
    onChange: function onChange(value, host) {
      if (!value) {
        return;
      }

      if (host.subscription) {
        host.subscription();
      }

      Object(on_next_frame["a" /* OnNextFrame */])(function () {
        WCwhenPropertyReady(host, "elements.svgContainer").then(function (el) {
          return el.innerHTML = value;
        });
        host.dispatchEvent(new CustomEvent("iconloaded", {
          detail: host
        }));
      });
    }
  },
  color: {
    format: function format(val) {
      return typeof val === "string" ? val : null;
    },
    onChange: function onChange(value, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return WCwhenPropertyReady(host, "elements.svgContainer").then(function (el) {
          return el.style.color = value;
        });
      });
    }
  },
  size: {
    format: function format(val) {
      return typeof val === "string" ? val : "1.5em";
    },
    onChange: function onChange(value, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return WCwhenPropertyReady(host, "elements.svgContainer").then(function (el) {
          return el.style.height = el.style.width = value;
        });
      });
    }
  }
};
var icon_element_properties = Object.assign({}, {
  subscription: {
    format: function format(val) {
      return val;
    }
  }
}, icon_element_attributes);

var icon_element_template = __webpack_require__(62);

var icon_element_componentName = "icon-element";
var icon_element_componentRoot = ".icon-element-container";
var IconElement = WCConstructor({
  componentName: icon_element_componentName,
  componentRoot: icon_element_componentRoot,
  template: icon_element_template,
  style: icon_element_style,
  observedAttributes: Object.keys(icon_element_attributes),
  properties: icon_element_properties,
  elements: icon_element_elements
});
WCDefine(icon_element_componentName, IconElement);
// CONCATENATED MODULE: ./src/utils/svg-tags.js
var svgTags = ["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "audio", "canvas", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "video", "view", "vkern"];
// CONCATENATED MODULE: ./src/utils/html-tags.js
var htmlTags = ["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"];
// CONCATENATED MODULE: ./src/utils/validate-html.js

function ValidateHtml(str, allowedHtmlTags, disallowedHtmlTags) {
  var original = str;
  var converted = Pipe(ToString, FromEntities)(str);
  var val = converted.value;

  var getElements = function getElements(Doc, selector) {
    return Array.from(Doc.body.querySelectorAll(selector));
  };

  if (!str || !str.length || converted.type !== "string") {
    return {
      original: original,
      valid: false,
      sanitized: val,
      reason: ["no value"]
    };
  }

  var doc;

  try {
    doc = new DOMParser().parseFromString(val, "text/html");
  } catch (error) {
    return {
      original: original,
      valid: true,
      sanitized: val,
      reason: ["no html present"]
    };
  }

  var totalElements = getElements(doc, "*");
  var tagsToDestroy = [];
  var elementsToDestroy = [];

  if (disallowedHtmlTags && disallowedHtmlTags.length) {
    tagsToDestroy = disallowedHtmlTags.slice(0);
  } else {
    tagsToDestroy = [].concat(svgTags, htmlTags);
  }

  if (allowedHtmlTags && allowedHtmlTags.length) {
    allowedHtmlTags.forEach(function (tag) {
      var index = tagsToDestroy.indexOf(tag);

      if (index > -1) {
        tagsToDestroy.splice(index, 1);
      }
    });
  }

  tagsToDestroy.forEach(function (tag) {
    elementsToDestroy = [].concat(getElements(doc, tag), elementsToDestroy);
  });
  elementsToDestroy.forEach(function (el) {
    if (el && el.parentNode) {
      var childrenLength = el.children.length;
      var index = 0;

      while (index < childrenLength) {
        try {
          el.parentNode.insertBefore(el.children[index], el);
        } catch (error) {}

        index = index + 1;
      }

      el.parentNode.removeChild(el);
    }
  });
  var leftOverElements = getElements(doc, "*");
  var diff = totalElements.length - leftOverElements.length;
  var valid = diff === 0;
  return {
    original: original,
    valid: valid,
    sanitized: valid ? val : !doc.body.innerHTML || !doc.body.innerHTML.length ? "" : doc.body.innerHTML,
    reason: valid ? [] : ["".concat(diff, " element").concat(diff > 1 ? "s were" : " was", " removed")]
  };
}
// CONCATENATED MODULE: ./src/components/image-loader/index.js


var image_loader_style = __webpack_require__(63).toString();

var image_loader_outerStyle = __webpack_require__(64).toString();

var image_loader_template = __webpack_require__(65);

var image_loader_componentName = "image-loader";
var image_loader_componentRoot = ".image-loader-container";

var image_loader_setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles);
};

var setInternalStyle = function setInternalStyle(host) {
  var internalStyle = !host.fit ? "" : ".image-loader-container>img.image-loader-image{\n            object-position:".concat(host.position ? host.position : "50% 50%", ";\n            object-fit:").concat(host.fit ? host.fit : "contain", ";\n        }");
  image_loader_setStyles(host.elements.internalStyles, internalStyle);
  waitForEl(host, "root").then(function (root) {
    if (host.fit) {
      root.classList.add("fill");
      root.setAttribute("fit", host.fit);
    } else {
      root.classList.remove("fill");
      root.removeAttribute("fit");
    }
  });
};

var waitForEl = function waitForEl(host, key) {
  return new Promise(function (resolve) {
    var el = host.elements[key];

    var checkIfReady = function checkIfReady() {
      cancelAnimationFrame(host["timerFor".concat(key)]);
      el = host.elements[key];
      return !el ? host["timerFor".concat(key)] = requestAnimationFrame(checkIfReady) : resolve(el);
    };

    checkIfReady();
  });
};

var waitForEls = function waitForEls(host, keys) {
  return Promise.all(keys.map(function (key) {
    return waitForEl(host, key);
  }));
};

var toggleLoad = function toggleLoad(host) {
  return waitForEls(host, ["root", "spinner"]).then(function (elements) {
    clearTimeout(host.spinnerTimer);
    var root = elements[0];
    var spinner = elements[1];
    var loaded = !host.loading && !!host.src;
    host.setAttribute("loaded", loaded);
    host.setAttribute("errored", host.error);
    root.setAttribute("loaded", loaded);
    root.classList[host.loading ? "add" : "remove"]("loading");
    root.classList[host.error ? "add" : "remove"]("errored");
    host.dispatchEvent(new CustomEvent(host.error ? "imageerror" : host.loading ? "imageloading" : "imageloaded", {
      detail: host
    }));

    if (!host.loading) {
      host.complete = true;
      host.dispatchEvent(new CustomEvent("imagecomplete", {
        detail: host
      }));
    }

    toggleText(host);

    if (!host.loading) {
      spinner.setAttribute("visible", false);
      return;
    }

    host.spinnerTimer = setTimeout(function () {
      return spinner.setAttribute("visible", host.loading && host.spinner ? true : false);
    }, 333);
  });
};

var toggleText = function toggleText(host) {
  return waitForEl(host, "root").then(function (root) {
    var showingtext = host.error && !host.loading || !host.src;
    root.classList[showingtext ? "add" : "remove"]("show-text");
    host.setAttribute("showingtext", showingtext);
  });
};

var image_loader_properties = {
  src: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      return loadSrc(host, val);
    }
  },
  altsrc: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    }
  },
  alttext: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      if (!val) {
        return;
      }

      waitForEl(host, "text").then(function (textEl) {
        textEl.innerHTML = ValidateHtml(val, [], ["script"]).sanitized;
        toggleText(host);
      });
    }
  },
  loading: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(_val, host) {
      toggleLoad(host);
    }
  },
  error: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    }
  },
  complete: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    }
  },
  fit: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(_val, host) {
      setInternalStyle(host);
    }
  },
  position: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(_val, host) {
      setInternalStyle(host);
    }
  },
  spinner: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    }
  }
};
var image_loader_observedAttributes = Object.keys(image_loader_properties);
var image_loader_elements = {
  root: {
    selector: image_loader_componentRoot,
    onChange: function onChange(el) {
      requestAnimationFrame(function () {
        el.classList.remove("notready");
        el.style.removeProperty("opacity");
      });
    }
  },
  spinner: {
    selector: "".concat(image_loader_componentRoot, " spinner-element"),
    onChange: function onChange(el) {
      var remove = function remove() {
        return el.style.removeProperty("opacity");
      };

      setTimeout(function () {
        return requestAnimationFrame(remove);
      }, 66);
    }
  },
  img: {
    selector: "img",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        load: ObserveEvent(el, "load").subscribe(function () {
          host.error = false;
          host.loading = false;
        }),
        error: ObserveEvent(el, "error").subscribe(function () {
          host.error = true;
          host.loading = false;
        })
      };
    }
  },
  text: {
    selector: ".image-loader-text"
  },
  internalStyles: {
    selector: "style.internalStyles",
    onChange: function onChange(_el, host) {
      return setInternalStyle(host);
    }
  }
};

var loadSrc = function loadSrc(host, src) {
  return new Promise(function (resolve) {
    if (!src) {
      return resolve();
    }

    waitForEl(host, "img").then(function (img) {
      if (img.src === src) {
        return resolve(img);
      }

      host.error = false;
      host.loading = true;
      img.src = src;
    });
  });
};

var image_loader_methods = {
  toCanvas: function toCanvas(host) {
    return function () {
      try {
        var dpr = window.devicePixelRatio || 1;
        var ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = host.image.width * dpr;
        ctx.canvas.height = host.image.height * dpr;
        ctx.scale(dpr, dpr);
        ctx.drawImage(host.image, 0, 0);
        return ctx.canvas;
      } catch (error) {
        throw Error(error);
      }
    };
  },
  toDataUrl: function toDataUrl(host) {
    return function () {
      var mime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "image/jpeg";
      var quality = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return host.toCanvas().then(function (canvas) {
        return canvas.toDataURL(mime, quality);
      });
    };
  },
  toObjectUrl: function toObjectUrl(host) {
    return function () {
      var mime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "image/jpeg";
      var quality = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return host.toBlob(mime, quality).then(function (blob) {
        return URL.createObjectURL(blob);
      });
    };
  },
  toBlob: function toBlob(host) {
    return function () {
      var mime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "image/jpeg";
      var quality = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return host.toCanvas().then(function (canvas) {
        return new Promise(function (resolve) {
          return canvas.toBlob(resolve, mime, quality);
        });
      });
    };
  },
  toData: function toData(host) {
    return function () {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var w = arguments.length > 2 ? arguments[2] : undefined;
      var h = arguments.length > 3 ? arguments[3] : undefined;
      return host.toCanvas().then(function (canvas) {
        return canvas.getContext("2d").getImageData(x, y, w ? w : canvas.width, h ? h : canvas.height);
      });
    };
  }
};
var ImageLoader = WCConstructor({
  componentName: image_loader_componentName,
  componentRoot: image_loader_componentRoot,
  template: image_loader_template,
  style: image_loader_style,
  outerStyle: image_loader_outerStyle,
  observedAttributes: image_loader_observedAttributes,
  properties: image_loader_properties,
  elements: image_loader_elements,
  methods: image_loader_methods,
  onConnected: function onConnected(host) {
    setInternalStyle(host);
  }
});
WCDefine(image_loader_componentName, ImageLoader);
// CONCATENATED MODULE: ./src/utils/set-attribute.js
function SetAttribute(element, name, value) {
  var asProperty = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (!element || !name) {
    return element;
  }

  var set = function set(n, v) {
    if (n === "accept") {
      return element.setAttribute("accept", v ? Array.isArray(v) ? v.join(", ") : v : undefined);
    }

    var arias = ["disabled", "required"];

    if (arias.indexOf(n) > -1) {
      set("aria-".concat(n), v);
    }

    if (!asProperty) {
      return v ? element.setAttribute(n, v) : element.removeAttribute(n);
    }

    return v ? element[n] = v : element[n] = undefined;
  };

  if (Array.isArray(name)) {
    name.forEach(function (n, i) {
      return set(n, value[i]);
    });
  } else {
    set(name, value);
  }

  return element;
}
// CONCATENATED MODULE: ./src/utils/if-not.js

function IfNot(compare, replace) {
  return function (value) {
    var result = TMonad(value);
    compare = TMonad(compare);
    result.valid = result.value === compare.value;

    if (!result.valid) {
      var res = TMonad(replace);
      return res;
    }

    return result;
  };
}
// CONCATENATED MODULE: ./src/utils/to-object.js

var to_object_ToObject = function ToObject(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type === "string") {
    result = Pipe(FromURIComponent, FromEntities, FromJSON)(result);
  }

  result.valid = Type(result.value) === "object";
  return result;
};
// CONCATENATED MODULE: ./src/components/input-shared/definitions.js
var labelPositions = ["top", "bottom", "left", "right", "inside"];
var resizeOptions = ["true", "false", "horizontal", "vertical", "auto"];
var boolAttrs = ["aria-labelledby", "disabled", "id", "name", "readonly", "required", "aria-required", "tabindex", "value"];
var fieldAttrs = [].concat(boolAttrs, ["autocorrect", "autocomplete", "autofocus", "maxlength", "placeholder", "pattern"]);
var fileAttrs = [].concat(fieldAttrs, ["accept"]);
var InputFieldInputAttributes = {
  field: fieldAttrs,
  bool: boolAttrs,
  file: fileAttrs
};
var supportedInputTypes = ["file", "email", "password", "url", "text", "textarea", "number", "radio", "checkbox", "tel", "usphone", "intlphone", "uszip", "select"];
var processedNullValue = function processedNullValue() {
  return {
    original: "",
    sanitized: "",
    valid: true,
    reason: []
  };
};
var processedFileValue = function processedFileValue(file) {
  return {
    original: file,
    sanitized: file,
    valid: true,
    reason: []
  };
};
// CONCATENATED MODULE: ./src/components/input-shared/set-input-id.js



function inputIdString(host) {
  return "".concat(host.inputID, "-input_").concat(host.id || "");
}
function setInputID(host) {
  var id = inputIdString(host);
  var inputID = host.inputID;
  return Object(on_next_frame["a" /* OnNextFrame */])(function () {
    return Promise.all([WCwhenPropertyReady(host, "labelelement").then(function (label) {
      return SetAttribute(label, ["id", "for"], [inputID, id]);
    }), WCwhenPropertyReady(host, "input").then(function (input) {
      return SetAttribute(input, ["id", "aria-labelledby"], [id, inputID]);
    })]);
  });
}
// CONCATENATED MODULE: ./src/components/input-shared/on-focus.js
function onFocus(host) {
  if (host.focused) {
    return;
  }

  host.focused = true;
}
// CONCATENATED MODULE: ./src/components/input-shared/dispatch.js
function dispatch_dispatch(host, type, data) {
  return host.dispatchEvent(new CustomEvent(type, {
    detail: data ? data : data === false ? false : host.state
  }));
}
// CONCATENATED MODULE: ./src/utils/get-input-value.js
function GetInputValue(input) {
  if (!input) {
    return;
  }

  var type = input.tagName.toLowerCase() === "select" ? "select" : input.type;

  if (type === "checkbox" || type === "radio") {
    return input.checked;
  }

  if (type === "select") {
    var vals = Array.from(input.selectedOptions).map(function (o) {
      return o.value;
    });
    return vals.length > 1 ? vals : vals[0];
  }

  if (type === "select" && input.selectedOptions) {
    var value = Array.from(input.selectedOptions).map(function (o) {
      return o.value;
    });

    if (value.length < 2) {
      return value[0];
    }

    return value;
  }

  if (type === "file") {
    return Array.from(input.files);
  }

  return input.value;
}
// CONCATENATED MODULE: ./src/components/input-shared/on-blur.js



function onBlur(host) {
  if (!host.focused) {
    return;
  }

  host.focused = false;
  WCwhenPropertyReady(host, "input").then(function (input) {
    host.value = GetInputValue(input);
    input.blur();
    dispatch_dispatch(host, "blur", host);
  });
}
// CONCATENATED MODULE: ./src/components/input-shared/on-done.js



function onDone(host) {
  return WCwhenPropertyReady(host, "input").then(function (input) {
    input.blur();
    dispatch_dispatch(host, "done", host);
    var form = Object(utils_get["a" /* Get */])(host, "internals_.form", host.closest("form"));

    if (form) {
      try {
        var domEvent = document.createEvent("Event");
        domEvent.initEvent("submit", false, true);
        form.dispatchEvent(domEvent);
      } catch (error) {
        form.dispatchEvent(new Event("submit"));
      }
    }
  })["catch"](function () {});
}
// CONCATENATED MODULE: ./src/components/input-shared/on-keydown.js

function onKeyDown(e, host) {
  if (!e) {
    return;
  }

  if (e.key && e.key.toLowerCase() === "enter" && host.type !== "textarea") {
    return onDone(host);
  }
}
// CONCATENATED MODULE: ./src/components/input-shared/on-input.js


function onInput(host) {
  return WCwhenPropertyReady(host, "input").then(function (input) {
    host.value = GetInputValue(input);

    if (host.value !== input.value) {
      input.value = host.value;
    }
  })["catch"](console.error);
}
// CONCATENATED MODULE: ./src/components/input-shared/set-input.js















var set_input_inputAttributeList = function inputAttributeList(host) {
  return ["radio", "checkbox"].indexOf(host.inputType) > -1 ? InputFieldInputAttributes.bool : host.type === "file" ? InputFieldInputAttributes.file : InputFieldInputAttributes.field;
};
var asIsTypes = ["checkbox", "checkbox", "date", "email", "file", "number", "password", "radio", "tel", "url"];

var tagType = function tagType(type) {
  return type === "textarea" ? "textarea" : type === "select" ? "select" : "input";
};

var set_input_unsubscribeInput = function unsubscribeInput(input) {
  return ObserverUnsubscribe(input);
};

var set_input_setInputValue = function setInputValue(host) {
  return SetAttribute(host.input, "value", host.processedValue.original);
};

function setInput(host) {
  Object(on_next_frame["a" /* OnNextFrame */])(function () {
    if (host.input) {
      host.removeChild(host.input);
    }

    WCwhenPropertyReady(host, "elements.container").then(function (container) {
      return SetAttribute(container, "input-kind", host.type);
    });
    var tagName = tagType(host.type);
    var type = tagName === "input" ? asIsTypes.indexOf(host.type) > -1 ? host.type : "text" : undefined;
    var elData = {
      tagName: tagName,
      "class": "input-field-input",
      slot: "input"
    };

    if (type) {
      elData.type = type;
    }

    var input = create_element_CreateElement(elData);
    host.appendChild(input);
    host.input = input;
    ObserveExists(input).subscribe(function () {}, function () {
      return set_input_unsubscribeInput(input);
    }, function () {
      return set_input_unsubscribeInput(input);
    });
    set_input_inputAttributeList(host).forEach(function (attr) {
      return attr === "value" ? set_input_setInputValue(host) : SetAttribute(input, attr, host[attr]);
    });
    input.name = Object(utils_get["a" /* Get */])(host, "name", Object(utils_get["a" /* Get */])(host, "label", Object(utils_get["a" /* Get */])(host, "placeholder", "")));
    setInputID(host);

    if (host.type === "select" && Array.isArray(host.options)) {
      if (host.emptyoption !== "false") {
        input.appendChild(create_element_CreateElement({
          tagName: "option",
          value: Object(utils_get["a" /* Get */])(host, "emptyoption.value", ""),
          innerHTML: ValidateHtml(Object(utils_get["a" /* Get */])(host, "emptyoption.label", Object(utils_get["a" /* Get */])(host, "emptyoption", "")), [], ["script"]).sanitized
        }));
      }

      if (Array.isArray(host.options)) {
        host.options.forEach(function (o) {
          return input.appendChild(create_element_CreateElement({
            tagName: "option",
            value: o.value,
            innerHTML: ValidateHtml(o.label, [], ["script"]).sanitized
          }));
        });
      }
    }

    input.eventSubscriptions = {
      onFocus: ObserveEvent(input, "focus").subscribe(function () {
        return onFocus(host);
      }),
      onBlur: ObserveEvent(input, "blur").subscribe(function () {
        return onBlur(host);
      }),
      onKeyDown: ObserveEvent(input, "keydown").subscribe(function (e) {
        return onKeyDown(e, host);
      }),
      onInput: ObserveEvent(input, "input", {
        preventDefault: true
      }).subscribe(function () {
        return onInput(host);
      })
    }; // if ([`checkbox`, `radio`].indexOf(host.type) > -1) {
    //     // input.eventSubscriptions.inputContainerClick = ObserveEvent(host.elements.inputContainer, `click`, { stopPropagation: true, preventDefault: true }).subscribe(() => {
    //     //     const newVal = !host.value
    //     //     host.value = newVal
    //     //     dispatch(host, `input`, newVal)
    //     //     dispatch(host, `inputchange`, newVal)
    //     // })
    //     input.eventSubscriptions.onInput = ObserveEvent(input, `input`).subscribe(() => onInput(host))
    // } else {
    //     input.eventSubscriptions.onInput = ObserveEvent(input, `input`).subscribe(() => onInput(host))
    // }
    // setDroppable(host)
  });
}
// CONCATENATED MODULE: ./src/components/input-shared/set-label.js





 // import { ObserveEvent } from '../../utils/observe-event.js'

var set_label_unsubscribeLabel = function unsubscribeLabel(input) {
  return ObserverUnsubscribe(input);
};

function setLabel(host) {
  var labelelement = host.labelelement,
      inputID = host.inputID,
      labelposition = host.labelposition,
      label = host.label;
  Try(function () {
    return host.removeChild(labelelement);
  });
  var element = create_element_CreateElement({
    tagName: "label",
    id: inputID,
    tabIndex: -1,
    "for": inputIdString(host),
    "class": "input-field-".concat(labelposition, "-label"),
    slot: "label-".concat(labelposition),
    innerHTML: ValidateHtml(label, [], ["script"]).sanitized || ""
  });
  host.appendChild(element);
  host.labelelement = element;
  ObserveExists(element).subscribe(function () {}, function () {
    return set_label_unsubscribeLabel(element);
  }, function () {
    return set_label_unsubscribeLabel(element);
  }); // host.labelelement.eventSubscriptions = {
  //     click: ObserveEvent(host.labelelement, `click`).subscribe(e => onLabelClick(e, host))
  // }
}
// CONCATENATED MODULE: ./src/components/input-shared/get-label-position.js

function getDefaultLabelPosition(host) {
  return Object(utils_get["a" /* Get */])(host, "state.labelposition.value", ["input-bool"].indexOf(host.tagName.toLowerCase()) === -1 ? "inside" : "left");
}
// CONCATENATED MODULE: ./src/components/input-shared/on-invalid.js

function onInvalid(host) {
  return dispatch_dispatch(host, "invalid", {
    value: host.value,
    error: host.validationMessage
  });
}
// CONCATENATED MODULE: ./src/components/input-shared/properties.js





















var properties_trueOrNull = function trueOrNull(val) {
  return Pipe(ToBool, IfNot(true, null))(val).value;
};

var properties_stringOrEmpty = function stringOrEmpty(val) {
  return Pipe(ToString, IfInvalid(""))(val).value;
};

var properties_addRemoveContainerClass = function addRemoveContainerClass(val, host, clss) {
  return Object(utils_get["a" /* Get */])(host, "elements.container.classList", {
    add: function add() {},
    remove: function remove() {}
  })[val ? "add" : "remove"](clss);
};

var properties_setInputAttribute = function setInputAttribute(host, name, value) {
  return WCwhenPropertyReady(host, "input").then(function (input) {
    return SetAttribute(input, name, value);
  });
};

var defaultType = function defaultType(host) {
  var tag = host.tagName.toLowerCase();
  return tag === "input-bool" ? "checkbox" : tag === "input-select" ? "select" : "text";
};

var input_shared_properties_properties = {
  autofocus: {
    format: properties_trueOrNull,
    onChange: function onChange(val, host) {
      return properties_setInputAttribute(host, "autofocus", val);
    }
  },
  disabled: {
    format: properties_trueOrNull,
    onChange: function onChange(val, host) {
      properties_setInputAttribute(host, "disabled", val);
      properties_addRemoveContainerClass(val, host, "disabled");
    }
  },
  focused: {
    format: properties_trueOrNull,
    onChange: function onChange(val, host) {
      properties_addRemoveContainerClass(val, host, "focused");
      host.setAttribute("focused", val ? val : "false");
      host.processValue();
      dispatch_dispatch(host, "focus", host);
    }
  },
  format: {
    format: function format(val) {
      return Pipe(to_object_ToObject, IfInvalid(Pipe(ToString, IfInvalid(null))(val).value))(val).value;
    },
    onChange: function onChange(_val, host) {
      return host.processValue();
    }
  },
  helptext: {
    format: properties_stringOrEmpty,
    onChange: function onChange(val, host) {
      return WCwhenPropertyReady(host, "elements.help").then(function (el) {
        return el.innerHTML = ValidateHtml(val, [], ["script"]).sanitized || "";
      });
    }
  },
  inputID: {
    format: properties_stringOrEmpty,
    onChange: function onChange(_val, host) {
      return setInputID(host);
    }
  },
  invalid: {
    format: function format(val) {
      return ToBool(val).value;
    },
    onChange: function onChange(val, host) {
      SetAttribute(host.elements.container, "valid", val);
      properties_addRemoveContainerClass(val, host, "invalid");
      WCwhenPropertyReady(host, "elements.error").then(function (el) {
        return el.innerHTML = ValidateHtml(host.validationMessage, [], ["script"]).sanitized || "";
      });
      onInvalid(host);
    }
  },
  labelposition: {
    format: function format(val, host) {
      return Pipe(IndexOf(labelPositions), IfInvalid(getDefaultLabelPosition(host)))(val).value;
    },
    onChange: function onChange(val, host) {
      WCwhenPropertyReady(host, "elements.container").then(function (container) {
        return SetAttribute(container, "label-position", val);
      });
      WCwhenPropertyReady(host, "labelelement").then(function (label) {
        return label.slot = "label-".concat(val);
      });
    }
  },
  label: {
    format: properties_stringOrEmpty,
    onChange: function onChange(_val, host) {
      return setLabel(host);
    }
  },
  matchinput: {
    format: function format(val) {
      return IsElement(val) ? val : undefined;
    }
  },
  name: {
    format: properties_stringOrEmpty,
    onChange: function onChange(val, host) {
      return properties_setInputAttribute(host, "name", val);
    }
  },
  notempty: {
    format: function format(val) {
      return ToBool(val).value;
    },
    onChange: function onChange(val, host) {
      return properties_addRemoveContainerClass(val, SetAttribute(host, "has-value", "".concat(val)), "notempty");
    }
  },
  readonly: {
    format: properties_trueOrNull,
    onChange: function onChange(val, host) {
      return properties_setInputAttribute(host, "readonly", val);
    }
  },
  ready: {
    format: properties_trueOrNull,
    onChange: function onChange(val, host) {
      return properties_addRemoveContainerClass(val, host, "ready");
    }
  },
  required: {
    format: properties_trueOrNull,
    onChange: function onChange(val, host) {
      properties_setInputAttribute(host, "required", val);
      properties_setInputAttribute(host, "aria-required", val);
    }
  },
  tabindex: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(0))(val).value;
    },
    onChange: function onChange(val, host) {
      return properties_setInputAttribute(host, "tabIndex", val);
    }
  },
  type: {
    format: function format(val, host) {
      return Pipe(IndexOf(supportedInputTypes), IfInvalid(defaultType(host)))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setInput(host);
    }
  },
  value: {
    format: function format(val, host) {
      if (host.type === "checkbox" || host.type === "radio") {
        return ToBool(val).value;
      }

      return val;
    },
    onChange: function onChange(_val, host) {
      host.processValue();
      dispatch_dispatch(host, "inputchange", host.value);
      dispatch_dispatch(host, "input", host.value);
    }
  } // clearbutton: {
  //     format: val => Pipe(ToString, IfInvalid(null))(val).value,
  //     onChange: (val, host) => {
  //         SetAttribute(host.elements.clearButton, `type`, val)
  //         addRemoveContainerClass(!!val, host, `clearbutton`)
  //     }
  // },

};
var input_shared_properties_observedAttributes = Object.keys(input_shared_properties_properties);
// CONCATENATED MODULE: ./src/components/input-shared/processed-value.js


function isEmpty(value) {
  return value === "" || value === null || value === undefined;
}

var reduceReasons = function reduceReasons(target, current) {
  if (!!current && target.indexOf(current) === -1) {
    target.push(current);
  }

  return target;
};

function emptyValue() {
  return {
    original: "",
    sanitized: "",
    valid: true,
    reason: []
  };
}

function getValueMetadata(host, value) {
  if (typeof host.preProcessValue !== "function") {
    var empty = isEmpty(value);
    return {
      original: value === undefined ? "" : value,
      sanitized: value === undefined ? "" : value,
      valid: empty ? true : host.validationMessage === "",
      reason: empty ? [] : [host.validationMessage].reduce(reduceReasons, [])
    };
  }

  if (isEmpty(value)) {
    return emptyValue();
  }

  var preProccessed = host.preProcessValue(value);

  if (isEmpty(preProccessed.sanitized)) {
    return emptyValue();
  }

  var validity = host.validity;
  var invalids = [];
  var keysToSkip = ["valid", "customError", "message"];
  Object.keys(validity).forEach(function (key) {
    return keysToSkip.indexOf(key) === -1 && validity[key] === true ? invalids.push(key) : undefined;
  });
  return {
    original: value,
    sanitized: preProccessed.sanitized,
    valid: invalids.length === 0 && validity.valid,
    reason: [host.validationMessage].concat(preProccessed.reason).reduce(reduceReasons, []),
    validity: validity
  };
}

function processedValue(host) {
  return {
    get: function get() {
      return getValueMetadata(host, Object(utils_get["a" /* Get */])(host, "state.value.value"));
    }
  };
}
// CONCATENATED MODULE: ./src/utils/is-autofilled.js
function IsAutoFilled(input) {
  var nativeMatches = input.matches || input["msMatchesSelector"];

  try {
    return nativeMatches.call(input, ":-webkit-autofill");
  } catch (error) {
    try {
      return nativeMatches.call(input, ":-moz-autofill");
    } catch (error) {
      try {
        return nativeMatches.call(input, ":-ms-autofill");
      } catch (error) {
        try {
          return nativeMatches.call(input, ":-o-autofill");
        } catch (error) {
          try {
            return nativeMatches.call(input, ":autofill");
          } catch (error) {
            return false;
          }
        }
      }
    }
  }
}
// CONCATENATED MODULE: ./src/components/input-shared/process-value.js



var supportsInternals = "ElementInternals" in window && "setFormData" in window.ElementInternals;
function processValue(host) {
  return function processingValue() {
    return WCwhenPropertyReady(host, "input").then(function (input) {
      var processed = host.processedValue;
      var sanitized = processed.sanitized;
      var autofilled = IsAutoFilled(input);
      var stringEmpty = (isNaN(sanitized) || typeof sanitized === "string") && !sanitized.length;
      var empty = stringEmpty && !autofilled;
      var valid = !host.focused && empty ? true : processed.valid;
      var badFormat = Object(utils_get["a" /* Get */])(processed, "validity.badFormat");

      if (badFormat && processed.reason.length) {
        host.setCustomValidity(processed.reason.join(", "));
        host.invalid = true;
      }

      if (supportsInternals) {
        host.internals_.setFormValue(sanitized);
      }

      if (typeof host.postProcessValue === "function") {
        host.postProcessValue({
          input: input,
          valid: valid,
          sanitized: sanitized
        });
      }

      if (host.type === "select") {
        if (host.emptyoption === "false" || host.emptyoption === false || host.emptyoption === undefined) {
          host.notempty = !empty;
        } else {
          host.notempty = true;
        }
      } else {
        host.notempty = !empty;
      }

      if (valid) {
        return host.invalid = false;
      }

      if (empty) {
        return host.invalid = false;
      }

      if (!host.focused) {
        return host.invalid = true;
      }
    })["catch"](console.error);
  };
} //     if (!host.input) { return }
//     const processed = host.processedValue
//     const sanitized = processed.sanitized
//     host.setCustomValidity(processed.reason.join(`, `))
//     const errors = host.validationMessage
//     const valid = (errors.length ? false : processed.valid) || (!host.focused && host.valid)
//     const autofilled = IsAutoFilled(input)
//     const stringEmpty = (isNaN(sanitized) || typeof sanitized === `string`) && !sanitized.length
//     const empty = stringEmpty && !autofilled
//     host.count = host.type === `number` ? sanitized : sanitized ? sanitized.length : 0
//     host.elements.container.classList[sanitized ? `add` : `remove`](`checked`)
//     if (host.type === `file`) {
//         const files = getDroppedFiles(sanitized) || getFileValue(input)
//         const filenames = !files ? [] : files.map(f => f.name)
//         SetAttribute(host.elements.inputContainer, `title`, filenames.join(`, `))
//         try {
//             input.files = (new ClipboardEvent(``).clipboardData || new DataTransfer).files
//         } catch (error) { }
//         if (!filenames.length && host.pathvalue) {
//             host.notempty = true
//             return
//         } else if (filenames.length) {
//             host.pathvalue = ``
//         }
//         if (supportsInternals) {
//             host.internals_.setFormValue(input.files)
//         }
//     } else {
//         try {
//             const selectionEnd = input.selectionEnd
//             let cursorPosition = selectionEnd
//             // masker(input, sanitized, [input.selectionStart, input.selectionEnd], countries)
//             const formatted = InputFieldFormatValue(sanitized, host.format || host.type)
//             const newValue = formatted.value || ``
//             const current = input.value
//             if (formatted.stringChanges && formatted.stringChanges.length) {
//                 formatted.stringChanges.forEach(change => {
//                     if (!!change.added && !!change.removed && change.start < cursorPosition) {
//                         return cursorPosition = cursorPosition + (change.added.length - change.removed.length)
//                     }
//                     if (!!change.removed && change.start < cursorPosition) {
//                         return cursorPosition = cursorPosition - change.removed.length
//                     }
//                     if (!!change.added && change.start < cursorPosition) {
//                         return cursorPosition = cursorPosition + change.added.length
//                     }
//                 })
//             }
//             input.cursorPosition = cursorPosition
//             if (current !== newValue || host.type === `intlphone`) {
//                 input.value = newValue
//                 if (formatted.stringChanges && formatted.stringChanges.length) {
//                     SetCaret(input, cursorPosition, host.shadowRoot)
//                 }
//                 if (supportsInternals) {
//                     host.internals_.setFormValue(newValue)
//                 }
//             } else {
//                 if (supportsInternals) {
//                     host.internals_.setFormValue(current)
//                 }
//             }
//         } catch (error) { }
//     }
//     textareaHeight(host.resize, input)
//     host.notempty = !empty
//     if (valid) { return host.invalid = false }
//     if (empty) { return host.invalid = false }
//     if (!host.focused) { return host.invalid = true }
// }
// CONCATENATED MODULE: ./src/components/input-shared/set-custom-validity.js

function setCustomValidity(host) {
  return function setCustomValidityMessage(error) {
    return WCwhenPropertyReady(host, "input.setCustomValidity", true).then(function () {
      return host.input.setCustomValidity(error);
    })["catch"](console.error);
  };
}
// CONCATENATED MODULE: ./src/components/input-shared/match-input-message.js

function matchInputMessage(host) {
  if (!host.matchinput) {
    return "";
  }

  if (host.value === Object(utils_get["a" /* Get */])(host, "matchinput.value")) {
    return "";
  }

  var otherInput = host.matchinput;
  return "Value does not match".concat(otherInput.label || otherInput.placeholder || otherInput.name || "", ".");
}
// CONCATENATED MODULE: ./src/components/input-shared/validation-message.js


var validation_message_validationMessage = function validationMessage(host) {
  return {
    get: function get() {
      return Object(utils_get["a" /* Get */])(host, "input.validationMessage", "", function (message) {
        return message ? message : matchInputMessage(host);
      });
    }
  };
};
// CONCATENATED MODULE: ./src/utils/validate-bool.js
function ValidateBool(val) {
  var original = val;
  var reasons = [];
  var result;

  if (val === true || val === "on" || val === "true") {
    result = true;
  }

  if (val === false || val === "off" || val === "false") {
    result = false;
  }

  if (result === undefined) {
    result = false;
    reasons.push("not valid");
  }

  return {
    original: original,
    valid: reasons.length === 0,
    sanitized: !!result,
    reason: reasons
  };
}
// CONCATENATED MODULE: ./src/components/input-shared/validity.js


var validity_validity = function validity(host) {
  return {
    get: function get() {
      try {
        host.input.setCustomValidity("");
      } catch (error) {}

      return Object(utils_get["a" /* Get */])(host, "input.validity", {}, function (_ref) {
        var valueMissing = _ref.valueMissing,
            typeMismatch = _ref.typeMismatch,
            patternMismatch = _ref.patternMismatch,
            tooLong = _ref.tooLong,
            tooShort = _ref.tooShort,
            rangeUnderflow = _ref.rangeUnderflow,
            rangeOverflow = _ref.rangeOverflow,
            stepMismatch = _ref.stepMismatch,
            badInput = _ref.badInput,
            customError = _ref.customError,
            valid = _ref.valid;
        var value = host.value;
        var valueAsAstring = value !== undefined && value !== null ? "".concat(value) : value;
        var notMatchingInput = matchInputMessage(host) !== "";
        var badFormat = valueAsAstring !== Object(utils_get["a" /* Get */])(host, "input.value");
        return {
          valueMissing: valueMissing,
          typeMismatch: typeMismatch,
          patternMismatch: patternMismatch,
          tooLong: tooLong,
          tooShort: tooShort,
          rangeUnderflow: rangeUnderflow,
          rangeOverflow: rangeOverflow,
          stepMismatch: stepMismatch,
          badInput: badInput,
          customError: customError,
          badFormat: badFormat,
          notMatchingInput: notMatchingInput,
          valid: valid && !badFormat && !notMatchingInput
        };
      });
    }
  };
};
// CONCATENATED MODULE: ./src/components/input-shared/check-validity.js

function checkValidity(host) {
  return Object(utils_get["a" /* Get */])(host, "validity.valid");
}
// CONCATENATED MODULE: ./src/components/input-bool/index.js














var input_bool_outerStyle = __webpack_require__(12).toString();

var input_bool_style = __webpack_require__(66).toString();

var input_bool_template = __webpack_require__(67);

var input_bool_componentName = "input-bool";
var input_bool_componentRoot = ".".concat(input_bool_componentName, "-container");
var input_bool_elements = {
  checkIcon: {
    selector: ".input-field-checkbox-icon",
    onChange: function onChange(el) {
      el.svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"stroke:currentColor;stroke-width:2px;\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/></svg>";
    }
  },
  container: {
    selector: ".input-field-container-inner"
  },
  count: {
    selector: ".input-field-character-count"
  },
  error: {
    selector: ".input-field-message-error"
  },
  help: {
    selector: ".input-field-message-help"
  },
  inputContainer: {
    selector: ".input-field-input-container-inner"
  },
  root: {
    selector: ".input-field-container"
  }
};
var InputBool = WCConstructor({
  componentName: input_bool_componentName,
  componentRoot: input_bool_componentRoot,
  template: input_bool_template,
  style: input_bool_style,
  outerStyle: input_bool_outerStyle,
  observedAttributes: input_shared_properties_observedAttributes,
  properties: input_shared_properties_properties,
  elements: input_bool_elements,
  methods: {
    processValue: processValue,
    setCustomValidity: setCustomValidity,
    preProcessValue: function preProcessValue() {
      return function (value) {
        return ValidateBool(value);
      };
    },
    postProcessValue: function postProcessValue(host) {
      return function (results) {
        return WCwhenPropertyReady(host, "elements.container").then(function (container) {
          return container.classList[results.sanitized ? "add" : "remove"]("checked");
        });
      };
    },
    checkValidity: checkValidity
  },
  computed: {
    processedValue: processedValue,
    validationMessage: validation_message_validationMessage,
    validity: validity_validity
  },
  getters: {
    value: function value(host) {
      return host.preProcessValue(Object(utils_get["a" /* Get */])(host, "state.value.value", false)).sanitized;
    }
  },
  onConnected: function onConnected(host) {
    return host.inputID = Object(utils_id["a" /* ID */])();
  },
  formElement: true
});
WCDefine(input_bool_componentName, InputBool);
// CONCATENATED MODULE: ./src/utils/validate-number.js

function ValidateNumber(num) {
  var original = num;
  var reasons = [];
  var formatted = ToNumber(num);

  if (!formatted.valid) {
    reasons.push("not a number");
  }

  return {
    original: original,
    valid: reasons.length === 0,
    sanitized: formatted.value,
    reason: reasons
  };
}
// CONCATENATED MODULE: ./src/utils/validate-email.js

function ValidateEmail(str) {
  var original = str;
  var converted = Pipe(ToString, FromEntities)(str);
  var val = converted.value;

  if (!val || !val.length || converted.type !== "string") {
    return {
      original: original,
      valid: false,
      sanitized: val,
      reason: ["no value"]
    };
  }

  var reasons = [];
  var split = val.split("@");

  if (!split[0] || !split[0].length) {
    reasons.push("missing username");
  }

  if (split.length < 2) {
    reasons.push("missing @ symbol");
    reasons.push("missing domain, i.e. \"mail.com\"");
  }

  if (split.length > 1) {
    var domain = split[1].split(".");

    if (!domain[0] || !domain[0].length || !domain[1] || !domain[1].length) {
      reasons.push("missing domain, i.e. \"mail.com\"");
    }
  }

  if (reasons.length) {
    return {
      original: original,
      valid: false,
      sanitized: val,
      reason: reasons
    };
  }

  return ValidateHtml(val);
}
// CONCATENATED MODULE: ./src/utils/validate-us-phone.js

function ValidateUsPhone(val) {
  var original = val;
  var reason = [];
  var converted = Pipe(ToString, FromEntities, IfInvalid(""))(val);
  var value = converted.value.replace(/[^\d]+/g, "");

  if (value.length < 10) {
    reason.push("needs at least 10 digits");
  }

  return {
    original: original,
    valid: reason.length === 0,
    sanitized: original,
    reason: reason
  };
}
// CONCATENATED MODULE: ./src/utils/validate-intl-phone.js

function ValidateIntlPhone(val) {
  var original = val;
  var reason = [];
  var converted = Pipe(ToString, FromEntities, IfInvalid(""))(val);
  var value = converted.value.replace(/[^\d]+/g, "");

  if (value.length < 11) {
    reason.push("needs at least 11 digits");
  }

  return {
    original: original,
    valid: reason.length === 0,
    sanitized: original,
    reason: reason
  };
}
// CONCATENATED MODULE: ./src/utils/remove-meta.js

function RemoveMeta(string, search) {
  var match;
  var result = {
    value: string.toString(),
    stringChanges: []
  };

  while ((match = ToRegex(search).value.exec(result.value)) !== null) {
    var matched = {
      start: match.index,
      end: match.index + match[0].length,
      input: match.input,
      length: match[0].length,
      result: "",
      removed: match[0]
    };
    var first = matched.start !== 0 ? result.value.slice(0, matched.start) : "";
    var second = result.value.slice(matched.end);
    matched.result = "".concat(first).concat(second);
    result.stringChanges.push(matched);
    result.value = matched.result;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/to-digits.js

function ToDigits(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type !== "string") {
    result = ToString(result);
  }

  try {
    var cleaned = RemoveMeta(result.value, /[^\d]+/g);
    result.stringChanges = result.stringChanges.concat(cleaned.stringChanges);
    result.value = cleaned.value.toString();
    result.valid = !!result.value;
  } catch (error) {
    result.valid = false;
  }

  result.type = Type(result.value);
  return result;
}
// CONCATENATED MODULE: ./src/utils/to-join-meta.js
function ToJoinMeta(array, delimeter) {
  var result = {
    value: array,
    stringChanges: []
  };

  if (!delimeter) {
    result.value = result.value.join(delimeter);
    return result;
  }

  try {
    var index = 1;
    var joinedValue = result.value[index] || "";

    while (index < result.value.length) {
      result.stringChanges.push({
        start: joinedValue.length,
        end: joinedValue.length + delimeter.length,
        input: result.value[index],
        length: delimeter.length,
        result: "",
        added: delimeter
      });
      joinedValue = "".concat(joinedValue).concat(delimeter).concat(result.value[index]);
      index = index + 1;
    }

    result.value = joinedValue;
  } catch (error) {}

  return result;
}
// CONCATENATED MODULE: ./src/utils/to-join.js

function ToJoin(delimeter) {
  return function (value) {
    var result = TMonad(value);

    if (result.stop) {
      return result;
    }

    var resultingMeta = ToJoinMeta(result.value, delimeter);
    result.value = resultingMeta.value;
    result.stringChanges = result.stringChanges.concat(resultingMeta.stringChanges);
    result.valid = typeof result.value === "string";
    return TMonadUpdate(result, "string", "Join");
  };
}
// CONCATENATED MODULE: ./src/utils/to-us-zip.js

function ToUsZip(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  var mapper = ToMap(function (val, index) {
    if (index < 5 || index > 5 && index < 9) {
      return val;
    }

    if (index === 5) {
      return "-".concat(val);
    }

    return "";
  });
  result = Pipe(ToDigits, ToSplit(""), mapper, ToJoin(""))(result);
  result.valid = typeof result.value === "string" && (result.value.length === 5 || result.value.length === 10);
  return result;
}
// CONCATENATED MODULE: ./src/utils/validate-us-zip.js

function ValidateUsZip(val) {
  var original = val;
  var reason = [];
  var result = ToUsZip(val);

  if (!result.valid) {
    if (result.value.length < 5) {
      reason.push("minimum of 5 digits");
    }

    if (result.value.length > 5 && result.value.length < 10) {
      reason.push("needs to be 5 or 9 digits");
    }
  }

  return {
    original: original,
    valid: result.valid,
    sanitized: original,
    reason: reason
  };
}
// CONCATENATED MODULE: ./src/utils/validate-url.js

function ValidateUrl(str) {
  var original = str;
  var converted = Pipe(ToString, FromEntities)(str);
  var val = converted.value;

  if (!str || str.length === 0 || converted.type !== "string") {
    return {
      original: str,
      valid: false,
      sanitized: null,
      reason: ["no value"]
    };
  }

  var reasons = [];
  var link = document.createElement("a");
  link.href = val;

  if (!link.protocol) {
    reasons.push("Missing url protocol");
  }

  if (!link.host) {
    reasons.push("Missing url host");
  }

  return {
    original: original,
    valid: reasons.length === 0,
    sanitized: val,
    reason: reasons
  };
}
/* harmony default export */ var validate_url = (ValidateUrl);
// CONCATENATED MODULE: ./src/utils/validate-text.js

function ValidateText(str) {
  var original = str;
  var reasons = [];
  var converted = Pipe(ToString, FromEntities)(str);
  var val = converted.value;

  if (!val || !val.length || converted.type !== "string") {
    return {
      original: original,
      valid: false,
      sanitized: val,
      reason: reasons.concat(["no value"])
    };
  }

  var htmlResults = ValidateHtml(val);
  htmlResults.reason = htmlResults.reason.concat(reasons);
  return htmlResults;
}
// CONCATENATED MODULE: ./src/components/input-field/value-validation.js









function parseNoValue(validated) {
  if (validated && !validated.valid && validated.reason[0] === "no value") {
    validated.reason.shift();
    validated.valid = true;
  }

  return validated;
}

function valueValidation(val, type, allowhtml, disallowhtml) {
  if (type === "number" || type === "month") {
    var validated = ValidateNumber(val);
    validated.sanitized = validated.sanitized === undefined || validated.sanitized === null || validated.sanitized === "" ? validated.sanitized : "".concat(validated.sanitized);
    return parseNoValue(ValidateNumber(val));
  }

  if (type === "email") {
    return parseNoValue(ValidateEmail(val));
  }

  if (type === "tel" || type === "usphone") {
    return parseNoValue(ValidateUsPhone(val));
  }

  if (type === "intlphone") {
    return parseNoValue(ValidateIntlPhone(val));
  }

  if (type === "uszip") {
    return parseNoValue(ValidateUsZip(val));
  }

  if (type === "url") {
    return parseNoValue(validate_url(val));
  }

  if (allowhtml || disallowhtml) {
    return parseNoValue(ValidateHtml(val, allowhtml, disallowhtml));
  }

  return parseNoValue(ValidateText(val));
}
// CONCATENATED MODULE: ./src/components/input-field/value-max-min.js
function valueMaxMin(host, value) {
  var valid = true;
  var errorText = "";

  if (value === undefined || value === null) {
    return {
      value: value,
      valid: valid,
      errorText: errorText
    };
  }

  if (host.type === "number") {
    if (!!host.max && host.max < value) {
      value = host.max;
    }

    if (!!host.min && host.min > value) {
      value = host.min;
    }
  } else {
    if (!!host.max && host.max < value.length) {
      value = value.slice(0, host.max);
    }

    if (!!host.min && !!value && host.min > value.length && !host.focused) {
      errorText = "Must be at least ".concat(host.min, " characters");
      valid = false;
    }
  }

  return {
    value: value,
    valid: valid,
    errorText: errorText
  };
}
// CONCATENATED MODULE: ./src/components/input-field/value-format.js
/** TODO 
 * give human readable errors 
 * Called way too many times
 * */

function valueFormat(pattern, value) {
  if (typeof value !== "string" || !pattern) {
    return {
      valid: true,
      value: value
    };
  }

  var regex = ToRegex(pattern);
  var regexp = regex.value;

  if (!regex.valid) {
    return {
      valid: true,
      value: value
    };
  }

  var matches = value.matchAll(regexp);
  var results = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var match = _step.value;
      results.push(match[0]);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var result = results.join("");
  return {
    valid: result === value,
    value: result
  };
}
// CONCATENATED MODULE: ./src/components/input-field/index.js





















var input_field_outerStyle = __webpack_require__(12).toString();

var input_field_style = __webpack_require__(68).toString();

var input_field_template = __webpack_require__(69);

var input_field_componentName = "input-field";
var input_field_componentRoot = ".".concat(input_field_componentName, "-container");

var input_field_preProcessValue = function preProcessValue(host) {
  return function (value) {
    var validated = valueValidation(value, host.type, host.allowhtml, host.disallowhtml);
    var formatParsed = valueFormat(host.format, validated.sanitized);
    var parsedValue = valueMaxMin(host, formatParsed.value);
    /** TODO input format cursor position */

    /** TODO i think this is called on every input on the page */

    return {
      valid: validated.valid && parsedValue.valid && formatParsed.valid,
      reason: [!formatParsed.valid ? "Value does not match pattern" : undefined, parsedValue.errorText].concat(validated.reason).filter(function (m) {
        return !!m;
      }),
      value: parsedValue.value,
      sanitized: parsedValue.value
    };
  };
};

var input_field_postProcessValue = function postProcessValue(host) {
  return function (results) {
    results.input.value = results.sanitized;
    host.count = host.type === "number" ? results.sanitized : results.sanitized ? results.sanitized.length : 0;
  };
};

var input_field_properties = Object.assign({}, input_shared_properties_properties, {
  pattern: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      return WCwhenPropertyReady(host, "input").then(function (input) {
        return SetAttribute(input, "pattern", val);
      });
    }
  }
});
var input_field_elements = {
  clearButton: {
    selector: ".input-field-clear" // onChange: (el, host) => el.eventSubscriptions = {
    //     click: ObserveEvent(el, `click`).subscribe(() => clearInput(host))
    // }

  },
  container: {
    selector: ".input-field-container-inner"
  },
  count: {
    selector: ".input-field-character-count"
  },
  error: {
    selector: ".input-field-message-error"
  },
  help: {
    selector: ".input-field-message-help"
  },
  icon: {
    selector: ".input-field-icon",
    onChange: function onChange(el, host) {
      return el.eventSubscriptions = {
        click: ObserveEvent(el, "click").subscribe(function () {
          host.dispatchEvent(new CustomEvent("iconclick", {
            detail: host
          }));
        })
      };
    }
  },
  inputContainer: {
    selector: ".input-field-input-container-inner"
  },
  max: {
    selector: ".input-field-character-count-max"
  },
  root: {
    selector: ".input-field-container"
  } // filePathInput: {
  //     selector: `.input-field-file-path-overlay`,
  //     onChange: (el, host) => {
  //         if (host.type === `file` && host.pathvalue) {
  //             el.value = host.pathvalue
  //             return
  //         }
  //         el.value = ``
  //         if (host.type !== `file`) {
  //             el.style.display = `none`
  //         }
  //     }
  // },

};
var InputField = WCConstructor({
  componentName: input_field_componentName,
  componentRoot: input_field_componentRoot,
  template: input_field_template,
  style: input_field_style,
  outerStyle: input_field_outerStyle,
  properties: input_field_properties,
  observedAttributes: Object.keys(input_field_properties),
  elements: input_field_elements,
  methods: {
    processValue: processValue,
    setCustomValidity: setCustomValidity,
    checkValidity: checkValidity,
    preProcessValue: input_field_preProcessValue,
    postProcessValue: input_field_postProcessValue
  },
  computed: {
    processedValue: processedValue,
    validationMessage: validation_message_validationMessage,
    validity: validity_validity
  },
  getters: {
    value: function value(host) {
      return host.preProcessValue(Object(utils_get["a" /* Get */])(host, "state.value.value", "")).sanitized;
    }
  },
  onConnected: function onConnected(host) {
    return host.inputID = Object(utils_id["a" /* ID */])();
  },
  formElement: true
});
WCDefine(input_field_componentName, InputField, "input");
// CONCATENATED MODULE: ./src/components/input-select/index.js



















var input_select_outerStyle = __webpack_require__(12).toString();

var input_select_style = __webpack_require__(70).toString();

var input_select_template = __webpack_require__(71);

var input_select_componentName = "input-select";
var input_select_componentRoot = ".".concat(input_select_componentName, "-container");

var input_select_postProcessValue = function postProcessValue() {
  return function (results) {
    return results.input.value = results.sanitized;
  };
};

var input_select_properties = Object.assign({}, input_shared_properties_properties, {
  options: {
    format: function format(val) {
      return Pipe(CommasToArray, IfInvalid([]), ToMap(function (option) {
        if (typeof option !== "object") {
          option = {
            value: option,
            label: option
          };
        }

        if (!Object.prototype.hasOwnProperty.call(option, "value")) {
          return;
        }

        return option;
      }), ToFilter(function (o) {
        return !!o;
      }))(val).value;
    },
    onChange: function onChange(_val, host) {
      setInput(host);
    }
  },
  emptyoption: {
    format: function format(val) {
      return val;
    },
    onChange: function onChange(_val, host) {
      setInput(host);
    }
  }
});
var input_select_observedAttributes = Object.keys(input_select_properties);
var input_select_elements = {
  arrow: {
    selector: ".input-field-arrow",
    onChange: function onChange(el) {
      return el.svg = iconTriangle;
    }
  },
  container: {
    selector: ".input-field-container-inner"
  },
  error: {
    selector: ".input-field-message-error"
  },
  help: {
    selector: ".input-field-message-help"
  },
  inputContainer: {
    selector: ".input-field-input-container-inner"
  },
  root: {
    selector: ".input-field-container"
  }
};
var InputSelect = WCConstructor({
  componentName: input_select_componentName,
  componentRoot: input_select_componentRoot,
  template: input_select_template,
  style: input_select_style,
  outerStyle: input_select_outerStyle,
  observedAttributes: input_select_observedAttributes,
  properties: input_select_properties,
  elements: input_select_elements,
  methods: {
    processValue: processValue,
    setCustomValidity: setCustomValidity,
    postProcessValue: input_select_postProcessValue,
    checkValidity: checkValidity
  },
  computed: {
    processedValue: processedValue,
    validationMessage: validation_message_validationMessage,
    validity: validity_validity,
    selectedIndex: function selectedIndex(host) {
      return {
        get: function get() {
          return Object(utils_get["a" /* Get */])(host, "input.selectedIndex", 0);
        }
      };
    },
    selectedOptions: function selectedOptions(host) {
      return {
        get: function get() {
          return Array.from(Object(utils_get["a" /* Get */])(host, "input.selectedOptions", []));
        }
      };
    },
    optionElements: function optionElements(host) {
      return {
        get: function get() {
          return Array.from(Object(utils_get["a" /* Get */])(host, "input.options", []));
        }
      };
    }
  },
  getters: {
    value: function value(host) {
      return Object(utils_get["a" /* Get */])(host, "state.value.value", "");
    }
  },
  onConnected: function onConnected(host) {
    host.inputID = Object(utils_id["a" /* ID */])();
    host.processValue();
  },
  formElement: true
});
WCDefine(input_select_componentName, InputSelect);
// CONCATENATED MODULE: ./src/components/overlay-content/index.js


var overlay_content_style = __webpack_require__(72).toString();

var overlay_content_outerStyle = __webpack_require__(73).toString();

var positionPadding = 40;
var widths = ["content", "target"];
var overlay_content_alignments = ["center", "left", "right", "top", "bottom", "center center", "center top", "center bottom", "left center", "left top", "left bottom", "right center", "right top", "right bottom"];
var emptyBox = {
  top: 0,
  y: 0,
  bottom: 0,
  left: 0,
  x: 0,
  right: 0,
  width: 0,
  height: 0
};

var overlay_content_template = __webpack_require__(74);

var overlay_content_componentName = "overlay-content";
var overlay_content_componentRoot = ".overlay-content-container";
var overlay_content_elements = {
  root: {
    selector: overlay_content_componentRoot
  },
  contentContainer: {
    selector: ".".concat(overlay_content_componentName, "-content-container")
  },
  contentInner: {
    selector: ".".concat(overlay_content_componentName, "-content-inner")
  },
  inner: {
    selector: ".".concat(overlay_content_componentName, "-container-inner")
  }
};
var overlay_content_attributes = {
  target: {
    format: function format(val) {
      return val instanceof HTMLElement || val instanceof HTMLUnknownElement ? val : null;
    }
  },
  align: {
    format: function format(val) {
      return Pipe(IndexOf(overlay_content_alignments), IfInvalid("center"))(val).value;
    }
  },
  from: {
    format: function format(val) {
      return Pipe(IndexOf(overlay_content_alignments), IfInvalid("center"))(val).value;
    }
  },
  speed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(333))(val).value;
    }
  },
  widthbasis: {
    format: function format(val) {
      return Pipe(IndexOf(widths), IfInvalid("content"))(val).value;
    }
  }
};

var overlay_content_setPositions = function setPositions(host) {
  cancelAnimationFrame(host.positionTimer);
  var target = host.target;

  if (!host.showing || !target) {
    return;
  }

  host.getPositions().then(function (positions) {
    if (positions.outOfView) {
      return host.hide();
    }

    host.width = positions.containerWidth;

    if (positions.rootBox.y !== 0) {
      positions.inner.style.top = "-".concat(positions.rootBox.y, "px");
    }

    if (positions.rootBox.x !== 0) {
      positions.inner.style.left = "-".concat(positions.rootBox.x, "px");
    }

    if (positions.rootBox.width !== positions.clientWidth) {
      positions.inner.style.width = "".concat(positions.clientWidth, "px");
    }

    if (positions.rootBox.height !== positions.clientHeight) {
      positions.inner.style.height = "".concat(positions.clientHeight, "px");
    }

    positions.container.style.width = positions.targetWidth;
    positions.container.style.minWidth = positions.targetMinWidth;
    positions.container.style.height = "auto";
    positions.container.style.maxHeight = "".concat(positions.hostHeight, "px");
    positions.container.style.left = "".concat(positions.containerLeft, "px");
    positions.container.style.top = "".concat(positions.isOnTop ? positions.targetBox.top - positions.containerHeight : positions.spaceAbove + positions.targetBox.height, "px");
    positions.container.style.transformOrigin = "center ".concat(positions.isOnTop ? "bottom" : "top");

    if (positions.inner.classList.contains("bottom") && positions.isOnTop) {
      positions.inner.classList.remove("bottom");
    }

    if (!positions.inner.classList.contains("bottom") && !positions.isOnTop) {
      positions.inner.classList.add("bottom");
    }

    host.positionTimer = requestAnimationFrame(function () {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return setPositions(host);
      });
    });
  });
};

var overlay_content_animator = function animator(points, speed, stepFn) {
  return new Promise(function (resolve) {
    return Object(timer["a" /* Timer */])(stepFn, EaseInOut(points, speed)).then(resolve);
  });
};

var OverlayContent = WCConstructor({
  componentName: overlay_content_componentName,
  componentRoot: overlay_content_componentRoot,
  template: overlay_content_template,
  style: overlay_content_style,
  outerStyle: overlay_content_outerStyle,
  observedAttributes: Object.keys(overlay_content_attributes),
  properties: Object.assign({}, {
    showing: {
      format: function format(val) {
        return ToBool(val).value;
      }
    },
    width: {
      format: function format(val) {
        return val;
      },
      onChange: function onChange(_val, host) {
        return host.dispatchEvent(new CustomEvent("widthchange", {
          detail: host
        }));
      }
    }
  }, overlay_content_attributes),
  computed: {
    position: function position(host) {
      return {
        get: function get() {
          return host.getPositions();
        }
      };
    }
  },
  methods: {
    getPositions: function getPositions(host) {
      return function () {
        return Object(on_next_frame["a" /* OnNextFrame */])(function () {
          var container = host.elements.contentContainer;
          var targetBox = Object(utils_get["a" /* Get */])(host, "target.getBoundingClientRect()", emptyBox);
          var targetMinWidth = targetBox.width ? "".concat(targetBox.width, "px") : "auto";
          var spaceAbove = targetBox.top;
          var clientHeight = document.documentElement.clientHeight;
          var spaceBelow = clientHeight - (targetBox.top + targetBox.height);
          var containerWidth = Object(utils_get["a" /* Get */])(container, "offsetWidth", 0);
          var containerHeight = Object(utils_get["a" /* Get */])(container, "offsetHeight", 0);
          var windowWidth = window.innerWidth;
          var inner = host.elements.inner;
          var innerBox = Object(utils_get["a" /* Get */])(inner, "getBoundingClientRect()", emptyBox);
          var isOnTop = spaceAbove > spaceBelow;
          return Object.assign({}, Object(utils_get["a" /* Get */])(container, "getBoundingClientRect()", emptyBox), {
            hostHeight: (isOnTop ? spaceAbove : spaceBelow) - positionPadding,
            scrollTop: Object(utils_get["a" /* Get */])(container, "scrollTop", 0),
            scrollLeft: Object(utils_get["a" /* Get */])(container, "scrollLeft", 0),
            targetWidth: !host.widthbasis || host.widthbasis === "content" ? "auto" : targetMinWidth,
            targetMinWidth: targetMinWidth,
            targetBox: targetBox,
            rootBox: Object(utils_get["a" /* Get */])(host, "elements.root.getBoundingClientRect()", emptyBox),
            spaceAbove: spaceAbove,
            spaceBelow: spaceBelow,
            isOnTop: isOnTop,
            clientWidth: document.documentElement.clientWidth,
            clientHeight: clientHeight,
            windowWidth: windowWidth,
            containerWidth: containerWidth,
            containerHeight: containerHeight,
            containerTop: (isOnTop ? targetBox.top - containerHeight : spaceAbove + targetBox.height) - innerBox.y,
            containerLeft: (targetBox.left + containerWidth >= windowWidth - 10 ? targetBox.right - containerWidth : targetBox.left) - innerBox.left,
            container: container,
            inner: inner,
            innerBox: innerBox,
            outOfView: targetBox.top - 10 > clientHeight || targetBox.bottom + 10 < 0
          });
        }).promise;
      };
    },
    scrollContent: function scrollContent(host) {
      return function (x, y) {
        var container = host.elements.contentContainer;

        if (!container) {
          return;
        }

        container.scrollTop = y;
        container.scrollLeft = x;
      };
    },
    show: function show(host) {
      return function () {
        if (host.showing) {
          return Promise.resolve();
        }

        return new Promise(function (resolve) {
          host.showing = true;
          var container = host.elements.contentContainer;
          var inner = host.elements.inner;

          if (!container || !inner) {
            return;
          }

          container.style.pointerEvents = "all";
          inner.style.display = "block";
          overlay_content_animator([0, 1.02, 0.99, 1], host.speed / 2, function (scalePoint) {
            container.style.transform = "scale(1, ".concat(scalePoint, ")");
            container.style.opacity = scalePoint;
          }).then(function () {
            container.style.transform = "scale(1, 1)";
            container.style.opacity = 1;
            resolve(host.dispatchEvent(new CustomEvent("shown")));
          });
          overlay_content_setPositions(host);
        });
      };
    },
    hide: function hide(host) {
      return function () {
        if (!host.showing) {
          return Promise.resolve();
        }

        return new Promise(function (resolve) {
          host.showing = false;
          var container = host.elements.contentContainer;
          var inner = host.elements.inner;

          if (!container || !inner) {
            return;
          }

          inner.style.display = container.style.pointerEvents = "none";
          container.style.transform = "scale(1, 0)";
          container.style.opacity = 0;
          resolve(host.dispatchEvent(new CustomEvent("hidden")));
        });
      };
    }
  },
  elements: overlay_content_elements
});
WCDefine(overlay_content_componentName, OverlayContent);
// CONCATENATED MODULE: ./src/utils/set.js
function Set(source, path, value) {
  if (path) {
    path = [source].concat(path.split("."));
  } else {
    path = [source];
  }

  path.reduce(function (accumulator, currentValue) {
    if (!accumulator) {
      accumulator = {};
    }

    if (!accumulator[currentValue]) {
      accumulator[currentValue] = {};
    }

    if (currentValue) {
      if (currentValue === path[path.length - 1]) {
        accumulator[currentValue] = value;
      }

      return accumulator[currentValue];
    } else {
      accumulator[currentValue] = null;
      return accumulator;
    }
  });
  return source;
}
// CONCATENATED MODULE: ./src/components/overlay-message/index.js


var overlay_message_style = __webpack_require__(75).toString();

var overlay_message_template = __webpack_require__(76);

var overlay_message_componentName = "overlay-message";
var overlay_message_componentRoot = ".".concat(overlay_message_componentName, "-container");
var overlay_message_speed = 333;

var overlay_message_setShown = function setShown(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  var opacityNow = root.style.opacity;

  if (!host.shown && (opacityNow === "" || opacityNow === "0")) {
    return;
  }

  Object(timer["a" /* Timer */])(function (opacityStep) {
    return root.style.opacity = opacityStep;
  }, EaseInOut(host.shown ? [0, 1] : [1, 0], overlay_message_speed)).then(function () {
    root.classList[host.shown ? "add" : "remove"]("shown");
    host.dispatchEvent(new CustomEvent(host.shown ? "opened" : "closed", {
      detail: host
    }));
  });
};

var setColorTheme = function setColorTheme(color, root) {
  return root.setAttribute("colortheme", color);
};

var overlay_message_setCloseButton = function setCloseButton(host) {
  Array.from(host.querySelectorAll("*")).forEach(function (el) {
    try {
      Object(utils_get["a" /* Get */])(el, "eventSubscriptions.closeOverlay", function () {})();
    } catch (error) {}
  });

  if (!host.closeselector) {
    return;
  }

  Array.from(host.querySelectorAll(host.closeselector)).forEach(function (el) {
    return Set(el, "eventSubscriptions.closeOverlay", ObserveEvent(el, "click").subscribe(function () {
      return host.shown = false;
    }));
  });
};

var overlay_message_properties = {
  shown: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(_val, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return overlay_message_setShown(host);
      });
    }
  },
  colortheme: {
    format: function format(val) {
      return Pipe(IndexOf(["dark", "light", "transparent"]), IfInvalid("light"))(val).value;
    },
    onChange: function onChange(val, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return setColorTheme(val, host.elements.root);
      });
    }
  },
  closeselector: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("[overlay-message-close]"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return overlay_message_setCloseButton(host);
      });
    }
  }
};
var overlay_message_elements = {
  root: {
    selector: overlay_message_componentRoot
  }
};
var OverlayMessage = WCConstructor({
  componentName: overlay_message_componentName,
  componentRoot: overlay_message_componentRoot,
  template: overlay_message_template,
  style: overlay_message_style,
  observedAttributes: Object.keys(overlay_message_properties),
  properties: overlay_message_properties,
  elements: overlay_message_elements,
  methods: {
    clear: function clear(host) {
      return function () {
        return Array.from(host.children).forEach(function (c) {
          return c.slot ? host.removeChild(c) : undefined;
        });
      };
    }
  },
  onDisconnected: function onDisconnected(host) {
    ObserverUnsubscribe(host);
  },
  onConnected: function onConnected(host) {
    host.subscriptions = {
      slots: ObserveSlots(host, true).subscribe(function () {
        return Object(on_next_frame["a" /* OnNextFrame */])(function () {
          return overlay_message_setCloseButton(host);
        });
      })
    };
  }
});
WCDefine(overlay_message_componentName, OverlayMessage);
// CONCATENATED MODULE: ./src/components/progress-bar/index.js

 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var progress_bar_style = __webpack_require__(77).toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var progress_bar_template = __webpack_require__(78);

var progress_bar_componentName = "progress-bar";
var progress_bar_componentRoot = ".".concat(progress_bar_componentName, "-container");
var types = ["bar", "circle"];
var animations = ["indeterminate", "linear", "volley"];

var progress_bar_setVisible = function setVisible(val, root) {
  return Object(on_next_frame["a" /* OnNextFrame */])(function () {
    return root ? root.classList[val ? "add" : "remove"]("visible") : undefined;
  });
};

var progress_bar_setOverlay = function setOverlay(val, root) {
  return Object(on_next_frame["a" /* OnNextFrame */])(function () {
    return root ? root.classList[val ? "add" : "remove"]("overlay") : undefined;
  });
};

var progress_bar_setPercentage = function setPercentage(val, root) {
  return Object(on_next_frame["a" /* OnNextFrame */])(function () {
    return root ? root.classList[val ? "add" : "remove"]("percentage") : undefined;
  });
};

var progress_bar_setScrimColor = function setScrimColor(val, root) {
  return Object(on_next_frame["a" /* OnNextFrame */])(function () {
    return root ? val ? root.style.backgroundColor = val : root.style.removeProperty("background-color") : undefined;
  });
};

var progress_bar_setTrack = function setTrack(val, root) {
  return Object(on_next_frame["a" /* OnNextFrame */])(function () {
    return root ? root.classList[val ? "add" : "remove"]("track") : undefined;
  });
};

var progress_bar_setScrimBlur = function setScrimBlur(val, root) {
  return Object(on_next_frame["a" /* OnNextFrame */])(function () {
    return root ? root.style.backdropFilter = "blur(".concat(val, "px)") : undefined;
  });
};

var progress_bar_setThickness = function setThickness(val, el) {
  return Object(on_next_frame["a" /* OnNextFrame */])(function () {
    return el ? el.style.height = val : undefined;
  });
};

var progress_bar_setHeading = function setHeading(val, el) {
  return el ? el.innerHTML = ValidateHtml(val, [], ["script"]).sanitized : undefined;
};

var progress_bar_setText = function setText(val, el) {
  return el ? el.innerHTML = ValidateHtml(val, [], ["script"]).sanitized : undefined;
};

var progress_bar_setColor = function setColor(val, el) {
  return Object(on_next_frame["a" /* OnNextFrame */])(function () {
    return el && val ? el.style.color = val : el ? el.style.removeProperty("color") : undefined;
  });
};

var setAnimation = function setAnimation(val, root) {
  return root ? root.setAttribute("animation", val) : undefined;
};

var progress_bar_setScrim = function setScrim(val, root) {
  if (!root) {
    return;
  }

  Object(on_next_frame["a" /* OnNextFrame */])(function () {
    if (!val) {
      root.style.removeProperty("background-color");
    }

    root.classList[val ? "add" : "remove"]("scrim");
  });
};

var progress_bar_setButton = function setButton(val, el) {
  Object(on_next_frame["a" /* OnNextFrame */])(function () {
    if (val && el) {
      el.classList.add("show");
      el.innerHTML = ValidateHtml(val, [], ["script"]).sanitized;
    } else if (el) {
      el.classList.remove("show");
    }
  });
};

var progress_bar_setValues = function setValues(vals, host) {
  var top = host.elements.top;
  var bottom = host.elements.bottom;
  var percentage = host.elements.percentage;
  var mainVal = "".concat(Math.min(100, vals[0] || 0), "%");
  var secondaryVal = "".concat(Math.min(100, vals[1] || 0), "%");

  if (!top || !bottom) {
    return;
  }

  Object(on_next_frame["a" /* OnNextFrame */])(function () {
    top.style.width = mainVal;
    bottom.style.width = secondaryVal;
    percentage.textContent = mainVal;
  });
};

var progress_bar_properties = {
  value: {
    format: function format(val) {
      return Pipe(CommasToArray, IfInvalid([val]), ToMap(function (v) {
        return isNaN(parseInt(v)) ? 0 : parseInt(v);
      }))(val).value;
    },
    onChange: function onChange(val, host) {
      progress_bar_setValues(val, host);
    }
  },
  color: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      progress_bar_setColor(val, host.elements.trackInner);
    }
  },
  button: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      progress_bar_setButton(val, host.elements.button);
    }
  },
  text: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(val, host) {
      progress_bar_setText(val, host.elements.text);
    }
  },
  header: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(val, host) {
      progress_bar_setHeading(val, host.elements.header);
    }
  },
  percentage: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(val, host) {
      progress_bar_setPercentage(val, host.elements.root);
    }
  },
  thickness: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("3px"))(val).value;
    },
    onChange: function onChange(val, host) {
      progress_bar_setThickness(val, host.elements.container);
    }
  },
  visible: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      progress_bar_setVisible(val, host.elements.root);
    }
  },
  overlay: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(val, host) {
      progress_bar_setOverlay(val, host.elements.root);
    }
  },
  scrim: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(val, host) {
      progress_bar_setScrim(val, host.elements.root);
    }
  },
  track: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(val, host) {
      progress_bar_setTrack(val, host.elements.root);
    }
  },
  scrimcolor: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("rgba(0,0,0,0.84)"))(val).value;
    },
    onChange: function onChange(val, host) {
      progress_bar_setScrimColor(val, host.elements.root);
    }
  },
  scrimblur: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(0))(val).value;
    },
    onChange: function onChange(val, host) {
      progress_bar_setScrimBlur(val, host.elements.root);
    }
  },
  animation: {
    format: function format(val) {
      return Pipe(IndexOf(animations), IfInvalid(animations[0]))(val).value;
    },
    onChange: function onChange(val, host) {
      setAnimation(val, host.elements.root);
    }
  },

  /** TODO */
  type: {
    format: function format(val) {
      return Pipe(IndexOf(types), IfInvalid(types[0]))(val).value;
    }
  }
};
var progress_bar_observedAttributes = Object.keys(progress_bar_properties);
var progress_bar_elements = {
  root: {
    selector: progress_bar_componentRoot,
    onChange: function onChange(el, host) {
      progress_bar_setOverlay(host.overlay, el);
      progress_bar_setScrim(host.scrim, el);
      progress_bar_setScrimColor(host.scrimcolor, el);
      progress_bar_setVisible(host.visible, el);
      progress_bar_setTrack(host.visible, el);
      progress_bar_setScrimBlur(host.scrimblur, el);
      progress_bar_setPercentage(host.percentage, el);
      setAnimation(host.animation, el);
    }
  },
  container: {
    selector: ".progress-bar-inner",
    onChange: function onChange(el, host) {
      progress_bar_setThickness(host.thickness, el);
    }
  },
  trackInner: {
    selector: ".progress-bar-track-inner",
    onChange: function onChange(el, host) {
      progress_bar_setColor(host.color, el);
    }
  },
  header: {
    selector: ".progress-bar-header",
    onChange: function onChange(el, host) {
      progress_bar_setHeading(host.header, el);
    }
  },
  text: {
    selector: ".progress-bar-text",
    onChange: function onChange(el, host) {
      progress_bar_setText(host.text, el);
    }
  },
  button: {
    selector: ".progress-bar-button",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        click: ObserveEvent(el, "click").subscribe(function () {
          return host.dispatchEvent(new CustomEvent("buttonclick", {
            detail: host
          }));
        })
      };
      progress_bar_setButton(host.button, el);
    }
  },
  percentage: {
    selector: ".progress-bar-percentage"
  },
  bottom: {
    selector: ".progress-bar-bottom"
  },
  top: {
    selector: ".progress-bar-top"
  }
};
var ProgressBar = WCConstructor({
  componentName: progress_bar_componentName,
  componentRoot: progress_bar_componentRoot,
  template: progress_bar_template,
  style: progress_bar_style,
  observedAttributes: progress_bar_observedAttributes,
  properties: progress_bar_properties,
  elements: progress_bar_elements
});
WCDefine(progress_bar_componentName, ProgressBar);
// CONCATENATED MODULE: ./src/utils/event-name.js
var event_name_events = {
  transitionend: {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd",
    msTransition: "msTransitionEnd"
  },
  transitionstart: {
    transition: "transitionstart",
    OTransition: "oTransitionStart",
    MozTransition: "transitionstart",
    WebkitTransition: "webkitTransitionStart",
    msTransition: "msTransitionStart"
  }
};
var event_name_el = document.createElement("fake-element");
function EventName(key) {
  if (!event_name_events[key]) {
    return "";
  }

  var e;

  for (e in event_name_events[key]) {
    if (event_name_el.style[e] !== undefined) {
      return event_name_events[key][e];
    }
  }

  return "";
}
// CONCATENATED MODULE: ./src/utils/if-empty.js

function IfEmpty(newValue) {
  return function (value) {
    var result = TMonad(value);

    if (result.stop || IsEmpty(result.value)) {
      return result;
    }

    return TMonad(newValue);
  };
}
// CONCATENATED MODULE: ./src/components/snack-bar/index.js


var snack_bar_style = __webpack_require__(79).toString();

var snack_bar_outerStyle = __webpack_require__(80).toString();

var snack_bar_template = __webpack_require__(81);

var snack_bar_componentName = "snack-bar";
var snack_bar_componentRoot = ".".concat(snack_bar_componentName, "-container");

var snack_bar_setShown = function setShown(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  var endEventName = EventName("transitionend");

  var dispatch = function dispatch() {
    return host.dispatchEvent(new CustomEvent(host.shown ? "opened" : "closed", {
      detail: host
    }));
  };

  if (endEventName) {
    root.addEventListener(endEventName, function startEvent() {
      root.removeEventListener(endEventName, startEvent);
      Object(on_next_frame["a" /* OnNextFrame */])(dispatch);
    });
  } else {
    Object(on_next_frame["a" /* OnNextFrame */])(dispatch);
  }

  root.classList[host.shown ? "add" : "remove"]("shown");
};

var setAlign = function setAlign(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute("align", host.align);
};

var snack_bar_setType = function setType(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute("type", host.type);
};

var snack_bar_setIcon = function setIcon(host, key) {
  WCwhenPropertyReady(host, key).then(function () {
    var icon = host.elements[key];

    if (!icon) {
      return;
    }

    icon[host[key][0] === "<" ? "svg" : "type"] = host[key];
  });
};

var showHideClose = function showHideClose(el, show) {
  if (!el) {
    return;
  }

  el.classList[show ? "remove" : "add"]("hide-close-btn");
};

var snack_bar_properties = {
  shown: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(_val, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return snack_bar_setShown(host);
      });
    }
  },
  align: {
    format: function format(val) {
      return Pipe(ToString, IndexOf(["top", "bottom", "none"]), IfInvalid("bottom"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return setAlign(host);
      });
    }
  },
  type: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(_val, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return snack_bar_setType(host);
      });
    }
  },
  infoicon: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(iconInfo), IfEmpty(iconInfo))(val).value;
    },
    onChange: function onChange(_val, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return snack_bar_setIcon(host, "infoicon");
      });
    }
  },
  successicon: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(iconCheck), IfEmpty(iconCheck))(val).value;
    },
    onChange: function onChange(_val, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return snack_bar_setIcon(host, "successicon");
      });
    }
  },
  erroricon: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(iconError), IfEmpty(iconError))(val).value;
    },
    onChange: function onChange(_val, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return snack_bar_setIcon(host, "erroricon");
      });
    }
  },
  warningicon: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(iconWarning), IfEmpty(iconWarning))(val).value;
    },
    onChange: function onChange(_val, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return snack_bar_setIcon(host, "warningicon");
      });
    }
  },
  hideclose: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return showHideClose(host.elements.root, !val);
      });
    }
  }
};
var snack_bar_observedAttributes = Object.keys(snack_bar_properties);
var snack_bar_elements = {
  root: {
    selector: snack_bar_componentRoot,
    onChange: function onChange(_el, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        setAlign(host);
        snack_bar_setShown(host);
      });
    }
  },
  button: {
    selector: ".snack-bar-close",
    onChange: function onChange(el, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        el.eventListeners = {
          click: ObserveEvent(el, "click").subscribe(function () {
            return host.shown = false;
          })
        };
        showHideClose(host.elements.root, !host.hideclose);
      });
    }
  },
  infoicon: {
    selector: ".infoicon",
    onChange: function onChange(_el, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return snack_bar_setIcon(host, "infoicon");
      });
    }
  },
  successicon: {
    selector: ".successicon",
    onChange: function onChange(_el, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return snack_bar_setIcon(host, "successicon");
      });
    }
  },
  erroricon: {
    selector: ".erroricon",
    onChange: function onChange(_el, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return snack_bar_setIcon(host, "erroricon");
      });
    }
  },
  warningicon: {
    selector: ".warningicon",
    onChange: function onChange(_el, host) {
      return Object(on_next_frame["a" /* OnNextFrame */])(function () {
        return snack_bar_setIcon(host, "warningicon");
      });
    }
  },
  closeIcon: {
    selector: ".".concat(snack_bar_componentName, "-close-icon"),
    onChange: function onChange(el) {
      return el.svg = iconClose;
    }
  }
};
var SnackBar = WCConstructor({
  componentName: snack_bar_componentName,
  componentRoot: snack_bar_componentRoot,
  template: snack_bar_template,
  style: snack_bar_style,
  outerStyle: snack_bar_outerStyle,
  observedAttributes: snack_bar_observedAttributes,
  properties: snack_bar_properties,
  elements: snack_bar_elements,
  methods: {
    clear: function clear(host) {
      return function () {
        return Array.from(host.children).forEach(function (c) {
          return c.slot ? host.removeChild(c) : undefined;
        });
      };
    }
  }
});
WCDefine(snack_bar_componentName, SnackBar);
// CONCATENATED MODULE: ./src/components/spinner-element/index.js


var spinner_element_style = __webpack_require__(82).toString();

var spinner_element_outerStyle = __webpack_require__(83).toString();

var spinner_element_template = __webpack_require__(84);

var spinner_element_componentName = "spinner-element";
var spinner_element_componentRoot = ".".concat(spinner_element_componentName, "-container");

var doAllTheThings = function doAllTheThings(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute("type", host.type);
  spinner_element_setRootClass(host, host.page, "fullpage");
  spinner_element_setRootClass(host, host.scrim, "showscrim");
  spinner_element_setType(host);
  spinner_element_setScrimColor(host);
  spinner_element_setScrimOpacity(host);
  spinner_element_setBlur(host);
};

var spinner_element_setRootClass = function setRootClass(host, condition, clss) {
  Object(on_next_frame["a" /* OnNextFrame */])(function () {
    var root = host.elements.root;

    if (!root) {
      return;
    }

    root.classList[condition ? "add" : "remove"](clss);
  });
};

var spinner_element_setType = function setType(host) {
  Object(on_next_frame["a" /* OnNextFrame */])(function () {
    var root = host.elements.root;

    if (!root) {
      return;
    }

    root.setAttribute("type", host.type);
  });
};

var spinner_element_setBlur = function setBlur(host) {
  Object(on_next_frame["a" /* OnNextFrame */])(function () {
    var scrim = host.elements.scrim;

    if (!scrim) {
      return;
    }

    scrim.style.backdropFilter = "blur(".concat(host.blur, "px)");
  });
};

var spinner_element_setScrimColor = function setScrimColor(host) {
  Object(on_next_frame["a" /* OnNextFrame */])(function () {
    var scrim = host.elements.scrim;

    if (!scrim) {
      return;
    }

    scrim.style.background = host.scrimcolor;
  });
};

var spinner_element_setScrimOpacity = function setScrimOpacity(host) {
  Object(on_next_frame["a" /* OnNextFrame */])(function () {
    var scrim = host.elements.scrim;

    if (!scrim) {
      return;
    }

    if (host.scrim) {
      return scrim.style.opacity = host.scrimopacity;
    }

    scrim.style.opacity = 0;
  });
};

var spinner_element_toggleVisibility = function toggleVisibility(host) {
  return Object(on_next_frame["a" /* OnNextFrame */])(function () {
    return host.elements.root.classList[host.visible ? "add" : "remove"]("shown");
  });
};

var spinner_element_elements = {
  root: {
    selector: spinner_element_componentRoot,
    onChange: function onChange(_el, host) {
      return doAllTheThings(host);
    }
  },
  scrim: {
    selector: ".spinner-element-scrim",
    onChange: function onChange(_el, host) {
      return doAllTheThings(host);
    }
  },
  inner: {
    selector: ".spinner-element-inner"
  },
  slot: {
    selector: "slot"
  }
};
var spinner_element_properties = {
  visible: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(_val, host) {
      return spinner_element_toggleVisibility(host);
    }
  },
  page: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(_val, host) {
      return doAllTheThings(host);
    }
  },
  scrim: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(_val, host) {
      return doAllTheThings(host);
    }
  },
  blur: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(0))(val).value;
    },
    onChange: function onChange(_val, host) {
      return doAllTheThings(host);
    }
  },
  scrimopacity: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(1))(val).value;
    },
    onChange: function onChange(_val, host) {
      return doAllTheThings(host);
    }
  },
  type: {
    format: function format(val) {
      return typeof val === "string" ? val : "column";
    },
    onChange: function onChange(_val, host) {
      return doAllTheThings(host);
    }
  }
};
var SpinnerElement = WCConstructor({
  componentName: spinner_element_componentName,
  componentRoot: spinner_element_componentRoot,
  template: spinner_element_template,
  style: spinner_element_style,
  outerStyle: spinner_element_outerStyle,
  observedAttributes: Object.keys(spinner_element_properties),
  properties: spinner_element_properties,
  elements: spinner_element_elements
});
WCDefine(spinner_element_componentName, SpinnerElement);
// CONCATENATED MODULE: ./src/services/router/invalid-query.js
var invalidQuery = function invalidQuery(searchString) {
  return !searchString || typeof searchString.split !== "function" || searchString === "";
};

/* harmony default export */ var invalid_query = (invalidQuery);
// CONCATENATED MODULE: ./src/services/router/get-query.js


var get_query_getQuery = function getQuery(url) {
  var result = {};
  var searchString = !!url && typeof url === "string" ? url.slice() : undefined;

  if (!!url && typeof url.search === "string") {
    searchString = url.search;
  }

  if (invalid_query(searchString)) {
    return result;
  }

  var queryString = searchString.split("?")[1];

  if (invalid_query(queryString)) {
    return result;
  }

  queryString.split("&").forEach(function (v) {
    if (!v || typeof v.split !== "function") {
      return;
    }

    result[v.split("=")[0]] = v.split("=")[1];
  });
  return result;
};

/* harmony default export */ var get_query = (get_query_getQuery);
// CONCATENATED MODULE: ./src/services/router/query-object-to-string.js


var query_object_to_string_queryObjectToString = function queryObjectToString() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!Object.keys(query).length) {
    return "";
  }

  var queries = Object.keys(query).map(function (q) {
    return IsEmpty(query[q]) ? false : "".concat(q, "=").concat(query[q]);
  }).filter(function (v) {
    return !!v;
  }).join("&");

  if (queries) {
    return "?".concat(queries);
  }

  return "";
};

/* harmony default export */ var query_object_to_string = (query_object_to_string_queryObjectToString);
// CONCATENATED MODULE: ./src/services/router/parse-url.js


var parse_url_parseUrl = function parseUrl(url) {
  var validated = typeof url === "string" ? ValidateHtml(url.split("?")[0]).sanitized // prevent XSS
  : url.pathname ? ValidateHtml(url.pathname).sanitized // prevent XSS
  : "";
  return validated.length > 1 && validated[validated.length - 1] === "/" ? validated.slice(0, validated.length - 1) : validated;
};

/* harmony default export */ var parse_url = (parse_url_parseUrl);
// CONCATENATED MODULE: ./src/services/router/get-route-by-path.js


var get_route_by_path_getRouteByPath = function getRouteByPath(routes) {
  return function (path) {
    path = parse_url(typeof path === "string" ? path.toLowerCase() : path);
    var r;
    var i = 0;
    var keys = Object.keys(routes || {});
    var urlParts = typeof path === "string" ? path.split("/") : [];

    while (i < keys.length && !r) {
      if (routes[keys[i]].pathname === path) {
        return routes[keys[i]];
      }

      if (routes[keys[i]].pathname.indexOf("/*") > -1) {
        var pathParts = routes[keys[i]].pathname.split("/");

        if (pathParts.length > urlParts.length) {
          if (pathParts[urlParts.length - 1] !== "**") {
            i = i + 1;
            continue;
          }
        }

        if (pathParts.length < urlParts.length) {
          if (pathParts[pathParts.length - 1] !== "**") {
            i = i + 1;
            continue;
          }
        }

        var match = false;
        var partsIndex = 0;

        while (partsIndex < pathParts.length) {
          if (urlParts[partsIndex] !== pathParts[partsIndex] && pathParts[partsIndex].indexOf("*") === -1) {
            match = false;
            break;
          }

          match = true;
          partsIndex = partsIndex + 1;
        }

        if (match) {
          return routes[keys[i]];
        }
      }

      i = i + 1;
    }

    return {};
  };
};

/* harmony default export */ var get_route_by_path = (get_route_by_path_getRouteByPath);
// CONCATENATED MODULE: ./src/services/router/click-listener.js


var click_listener_findParentLink = function findParentLink(parent) {
  var link;

  try {
    while (!link && parent && parent !== document.body) {
      if (Object(utils_get["a" /* Get */])(parent, "tagName").toLowerCase() === "a") {
        link = parent;
      }

      parent = parent.parentNode;
    } // eslint-disable-next-line no-empty

  } catch (error) {}

  return link;
};

var click_listener_clickListener = function clickListener(methods) {
  document.documentElement.addEventListener("click", function (e) {
    var target = e.target;
    var tag = target.tagName.toLowerCase();
    var link;

    if (tag === "a") {
      link = target;
    }

    if (!link && Array.isArray(e.path)) {
      var pathIndex = 0;

      while (!link && pathIndex < e.path.length) {
        if (Object(utils_get["a" /* Get */])(e, "path.".concat(pathIndex, ".tagName"), "").toLowerCase() === "a" && !!Object(utils_get["a" /* Get */])(e, "path.".concat(pathIndex, ".href"))) {
          link = Object(utils_get["a" /* Get */])(e, "path.".concat(pathIndex));
        }

        pathIndex = pathIndex + 1;
      }
    } // Safari


    if (!link && e.composedPath && typeof e.composedPath === "function") {
      var ePath = e.composedPath();
      var _pathIndex = 0;

      while (!link && _pathIndex < ePath.length) {
        if (Object(utils_get["a" /* Get */])(ePath, "".concat(_pathIndex, ".tagName"), "").toLowerCase() === "a" && !!Object(utils_get["a" /* Get */])(ePath, "".concat(_pathIndex, ".href"))) {
          link = ePath[_pathIndex];
        }

        _pathIndex = _pathIndex + 1;
      }
    } // FF and IE


    if (!link && e.originalTarget) {
      link = click_listener_findParentLink(e.originalTarget);
    }

    if (!link && e.explicitOriginalTarget) {
      link = click_listener_findParentLink(e.explicitOriginalTarget);
    }

    if (!link) {
      link = click_listener_findParentLink(e.parentNode);
    }

    if (!link || link.getAttribute("target") === "_blank") {
      return;
    }

    try {
      var url = new URL(link.href);

      if (url.host !== location.host) {
        return;
      }

      if (methods.route(url)) {
        e.preventDefault();
      } // eslint-disable-next-line no-empty

    } catch (error) {}
  }, true);
};

/* harmony default export */ var click_listener = (click_listener_clickListener);
// CONCATENATED MODULE: ./src/services/router/pop-state-listener.js
var popStateListener = function popStateListener(methods) {
  window.addEventListener("popstate", function () {
    return methods.route("".concat(location.pathname).concat(location.search), true);
  }, false);
};

/* harmony default export */ var pop_state_listener = (popStateListener);
// CONCATENATED MODULE: ./src/services/router/get-route.js



var get_route_getRoute = function getRoute(routes, url) {
  return get_route_by_path(routes)(parse_url(url));
};

/* harmony default export */ var get_route = (get_route_getRoute);
// CONCATENATED MODULE: ./src/services/router/update-state.js


var addLeadingSlash = function addLeadingSlash(pathname) {
  return !pathname ? "" : pathname[0] === "/" ? pathname : "/".concat(pathname);
};

var update_state_joinUrl = function joinUrl(pathname, query) {
  return "".concat(location.protocol, "//").concat(location.host).concat(addLeadingSlash(pathname)).concat(query_object_to_string(query));
};

var update_state_UpdateState = function UpdateState(methods) {
  var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!methods.current) {
    return;
  }

  var lastQuery = query_object_to_string(methods.lastState.query);
  var currentQuery = query_object_to_string(methods.current.query);
  var full = update_state_joinUrl(methods.current.pathname, methods.current.query);
  var state = {
    title: methods.current.title || document.title,
    pathname: methods.current.pathname,
    full: full,
    query: methods.current.query || {}
  };

  if (methods.current.pathname === methods.lastState.pathname && lastQuery === currentQuery && !force) {
    return;
  }

  if ((replace || force) && history.replaceState) {
    history.replaceState(state, document.title, full);
  }

  if (!replace && !force && history.pushState) {
    history.pushState(state, document.title, full);
  }

  if (lastQuery !== currentQuery || force) {
    methods.query$.next(methods.current.query);
  }

  methods.lastState = state;
};

/* harmony default export */ var update_state = (update_state_UpdateState);
// CONCATENATED MODULE: ./src/services/router/handle-route.js







var handle_route_handleRoute = function handleRoute(methods, url) {
  var replace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var force = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var parsedUrl = parse_url(url).toLowerCase();
  var route = get_route(methods.routes, url);

  if (!route) {
    return replace ? false : methods.route("/");
  }

  if (route.title) {
    document.title = route.title;
  }

  var currentPath = Object(utils_get["a" /* Get */])(methods.current, "pathname");
  var routePath = Object(utils_get["a" /* Get */])(route, "pathname");
  var currentQuery = query_object_to_string(Object(utils_get["a" /* Get */])(methods.current, "query", {}));
  var query = get_query(url);

  if (route.allowedQueries && Array.isArray(route.allowedQueries)) {
    if (route.allowedQueries.length === 0) {
      query = {};
    }

    var allowed = {};
    Object.keys(query).forEach(function (queryKey) {
      return route.allowedQueries.indexOf(queryKey) > -1 ? allowed[queryKey] = query[queryKey] : undefined;
    });
    query = allowed;
  }

  var routeQuery = query_object_to_string(query);

  if (routePath === currentPath && currentQuery === routeQuery && !force) {
    return true;
  }

  methods.current = Object.assign({}, route, {
    query: query,
    pathname: parsedUrl
  });

  if (replace) {
    update_state(methods, true, force);
  } else {
    update_state(methods, false, force);
  }

  methods.route$.next(methods.current);
  return true;
};

/* harmony default export */ var handle_route = (handle_route_handleRoute);
// CONCATENATED MODULE: ./src/services/router/index.js









function Router(routes) {
  var _routes = Object.assign({}, routes);

  var getRouteByPath = get_route_by_path(_routes); // internal state

  var lastState = {};
  var current = Object.assign({}, {
    path: location.pathname,
    query: get_query(location.search),
    base: "".concat(location.protocol, "//").concat(location.host).concat(location.port ? ":".concat(location.port) : "")
  }, getRouteByPath(location.pathname));
  var initialPath = "".concat(location.pathname).concat(location.search);
  var initialRoute = Object.assign({}, get_route(_routes, initialPath), current);
  var methods = {
    get current() {
      return Object.assign({}, current || {}, {
        path: location.pathname,
        base: "".concat(location.protocol, "//").concat(location.host).concat(location.port ? ":".concat(location.port) : "")
      });
    },

    // TODO should not be accesible but handle-route needs it, refactor later
    set current(cur) {
      current = cur;
    },

    get lastState() {
      return lastState;
    },

    set lastState(l) {
      lastState = l;
    },

    getRouteByPath: getRouteByPath,
    getQuery: get_query,
    queryObjectToString: query_object_to_string,
    routes: _routes,
    has: function has(url) {
      return !!get_route(_routes, url);
    },
    route: function route(url) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return handle_route(methods, url, false, force);
    },
    replaceRoute: function replaceRoute(url) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return handle_route(methods, url, true, force);
    },
    route$: Observer(initialRoute),
    query$: Observer(initialRoute.query),
    updateQuery: function updateQuery(query) {
      if (!methods.current) {
        return;
      }

      methods.current = Object.assign({}, methods.current, {
        query: query
      });
      update_state(methods);
    },
    addQuery: function addQuery(query) {
      if (!methods.current) {
        return;
      }

      methods.current = Object.assign({}, methods.current, {
        query: Object.assign({}, methods.current.query, query)
      });
      update_state(methods);
    },
    replaceQuery: function replaceQuery(query) {
      if (!methods.current) {
        return;
      }

      methods.current = Object.assign({}, methods.current);
      methods.current.query = query;
      update_state(methods, true);
    },
    removeQuery: function removeQuery(query) {
      if (!methods.current) {
        return;
      }

      if (!query || Array.isArray(query) && !query.length) {
        methods.current.query = {};
      } else {
        if (typeof query === "string") {
          methods.current.query[query] = undefined;
          delete methods.current.query[query];
        } else if (Array.isArray(query)) {
          query.forEach(function (key) {
            methods.current.query[key] = undefined;
            delete methods.current.query[key];
          });
        }
      }

      update_state(methods, true, true);
    }
  };
  click_listener(methods);
  pop_state_listener(methods);
  return methods;
}
// CONCATENATED MODULE: ./src/services/dragDrop.js
function DragDropService(element) {
  var draggables = [];
  var htmlElement = document.firstElementChild;

  var filterElements = function filterElements(elements) {
    return elements.filter(function (el) {
      return el.parentNode;
    });
  };

  var handleDataTransfer = function handleDataTransfer(dataTransfer) {
    return element.dispatchEvent(new CustomEvent("dropped", {
      detail: dataTransfer
    }));
  };

  var setUserSelect = function setUserSelect() {
    var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!remove) {
      htmlElement.style.userSelect = "none";
    } else {
      htmlElement.style.removeProperty("user-select");
    }
  };

  var startDrag = function startDrag(e) {
    var target = e.target;

    if (target && target.getAttribute("draggable") === "false") {
      return;
    }

    e.preventDefault();
    setUserSelect();
    element.dispatchEvent(new CustomEvent("dragstarted"));
  };

  var drop = function drop(e) {
    e.preventDefault();
    element.classList.remove("dragging");
    element.classList.remove("dragover");
    setUserSelect(true);
    handleDataTransfer(e.dataTransfer || e.originalEvent.dataTransfer);
  };

  var dragover = function dragover(e) {
    e.preventDefault();
    element.classList.add("dragover");
  };

  var dragleave = function dragleave(e) {
    e.preventDefault();
    element.classList.remove("dragover");
  };

  var dragend = function dragend(e) {
    e.preventDefault();
    element.classList.remove("dragging");
    element.classList.remove("dragover");
    setUserSelect(true);
    element.dispatchEvent(new CustomEvent("dragended"));
  };

  element.addEventListener("dragstart", startDrag);
  element.addEventListener("dragover", dragover);
  element.addEventListener("drop", drop);
  element.addEventListener("dragleave", dragleave);
  element.addEventListener("dragend", dragend);
  var methods = {
    get draggables() {
      return filterElements(draggables);
    },

    set draggables(elements) {
      draggables = [];
      filterElements(Array.from(elements)).forEach(function (d) {
        draggables.push(d);
      });
    },

    get dropZone() {
      return element;
    },

    destroy: function destroy() {
      element.removeEventListener("dragstart", startDrag);
      element.removeEventListener("dragover", dragover);
      element.removeEventListener("drop", drop);
      element.removeEventListener("dragleave", dragleave);
      element.removeEventListener("dragend", dragleave);
      var isDragging = element.classList.contains("dragging");

      if (isDragging) {
        element.classList.remove("dragging");
        document.body.classList.remove("dragging-elements");
      }
    }
  };
  return methods;
}
// CONCATENATED MODULE: ./src/utils/to-json.js

function ToJSON(value) {
  var result = FromJSON(value);

  if (result.stop) {
    return result;
  }

  try {
    result.value = JSON.stringify(result.value);
    result.valid = true;
  } catch (error) {
    result.valid = false;
  }

  result.type = Type(result.value);
  return result;
}
// CONCATENATED MODULE: ./src/utils/observe-worker.js

function ObserveWorker(func) {
  var value;
  var previous;
  var worker;
  var functionString = ToString(func).value;
  var subscriptions = {};
  var firstBracket = functionString.indexOf("{");
  var beginingSlice = functionString.slice(firstBracket);
  var pendingSubscriptions = [];
  functionString = "function webworker()".concat(beginingSlice, "webworker()");

  var loop = function loop(method, data, subs) {
    return Object.keys(subs).forEach(function (key) {
      return Object(utils_get["a" /* Get */])(subs, "".concat(key, ".").concat(method), function () {})(data);
    });
  };

  var shutDown = function shutDown() {
    if (worker) {
      worker.terminate();
    }

    worker = undefined;
    return false;
  };

  var startUp = function startUp() {
    if (worker) {
      return;
    }

    var blob;

    try {
      blob = window.URL.createObjectURL(new Blob([functionString], {
        type: "application/javascript"
      }));
    } catch (error) {}

    if (!blob) {
      return;
    }

    worker = new Worker(blob);

    worker.onmessage = function (e) {
      previous = value;
      value = e.data;
      return loop("next", value, subscriptions);
    };

    worker.onerror = function (e) {
      return loop("error", e.message, subscriptions);
    };

    return worker;
  };

  var noShutdown = function noShutdown(subs) {
    return Object.keys(subs).length === 0 ? shutDown() : true;
  };

  var unSubscribe = function unSubscribe(subscriberId) {
    return function () {
      subscriptions[subscriberId] = null;
      delete subscriptions[subscriberId];
      noShutdown(subscriptions);
    };
  };

  var completeAll = function completeAll(subs) {
    return Object.keys(subs).forEach(function (key) {
      subs[key].complete();
      unSubscribe(key);
    });
  };

  var methods = {
    get value() {
      return value;
    },

    get previous() {
      return previous;
    },

    get functionString() {
      return functionString;
    },

    get subscriptions() {
      return subscriptions;
    },

    get pending() {
      return pendingSubscriptions;
    },

    dispose: function dispose() {
      completeAll(subscriptions);
    },
    post: function post(msg) {
      var index = pendingSubscriptions.length;
      return new Promise(function (resolve, reject) {
        var res = function res(e) {
          pendingSubscriptions[index]();
          return resolve(e);
        };

        var rej = function rej(e) {
          pendingSubscriptions[index]();
          return reject(e);
        };

        pendingSubscriptions.push(methods.subscribe(res, rej, rej));
        worker.postMessage(ToJSON(msg).value);
      });
    },
    subscribe: function subscribe(next) {
      var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var complete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      if (typeof next !== "function") {
        return;
      }

      var subscriber = {
        next: next,
        error: error,
        complete: complete,
        id: Object(utils_id["a" /* ID */])()
      };
      subscriptions[subscriber.id] = subscriber;

      if (typeof subscriptions[subscriber.id].error !== "function") {
        subscriptions[subscriber.id].error = unSubscribe(subscriber.id);
      }

      if (typeof subscriptions[subscriber.id].complete !== "function") {
        subscriptions[subscriber.id].complete = unSubscribe(subscriber.id);
      }

      startUp();
      return unSubscribe(subscriber.id);
    }
  };
  return methods;
}
// CONCATENATED MODULE: ./src/services/request.js

function Request(apiBase) {
  return function (reqData) {
    var base = apiBase;
    var path = "".concat(base).concat("/".concat(reqData.path || "").split("//").join("/"));
    var REQ = Object.assign({}, {
      data: undefined,
      headers: {},
      method: "POST"
    }, reqData, {
      path: path
    });
    var isFormData = REQ.data instanceof FormData;

    if (!isFormData && REQ.data && typeof REQ.data !== "string") {
      REQ.data = JSON.stringify(REQ.data);
    }

    if (isFormData) {
      REQ.toForm = true;
      var jsonData = {};
      REQ.data.forEach(function (value, key) {
        jsonData[key] = value;
      });
      REQ.data = JSON.stringify(REQ.data);
    }

    return new Promise(function (resolve, reject) {
      var worker$ = ObserveWorker(function () {
        self.onmessage = function (e) {
          var xhr = new XMLHttpRequest();
          var data = JSON.parse(e.data);
          var formData = data.data;

          if (data.toForm) {
            var form = new FormData();
            Object.keys(formData).forEach(function (key) {
              return form.append(key, formData[key]);
            });
            formData = form;
          }

          xhr.open(data.method, data.path, false);
          Object.keys(data.headers).forEach(function (key) {
            return xhr.setRequestHeader(key, data.headers[key]);
          });

          xhr.onload = function () {
            return postMessage({
              status: xhr.status,
              response: xhr.responseText || xhr.statusText
            });
          };

          xhr.onerror = function () {
            return postMessage({
              status: xhr.status,
              response: xhr.statusText
            });
          };

          xhr.send(data.data);
        };
      });
      var workerSubscription = worker$.subscribe(function (e) {
        workerSubscription();
        var res = e.response; // eslint-disable-next-line no-empty

        try {
          res = JSON.parse(res);
        } catch (error) {}

        if (e.status === 200) {
          return resolve(res);
        } else {
          return reject(e);
        }
      }, function (e) {
        workerSubscription();
        reject(e);
      });
      worker$.post(REQ);
    });
  };
}
// CONCATENATED MODULE: ./src/utils/animator.js

function Animator(_ref) {
  var _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 0 : _ref$duration,
      _ref$stepFn = _ref.stepFn,
      stepFn = _ref$stepFn === void 0 ? function () {} : _ref$stepFn,
      _ref$frameValues = _ref.frameValues,
      frameValues = _ref$frameValues === void 0 ? [] : _ref$frameValues,
      _ref$completeFn = _ref.completeFn,
      completeFn = _ref$completeFn === void 0 ? function () {} : _ref$completeFn;

  if (!duration || isNaN(duration) || !Array.isArray(frameValues) || !frameValues.length) {
    return;
  }

  var startTime = Date.now();

  var run = function run() {
    var currentTime = Date.now();
    var currentFrame = frameValues[currentTime - startTime];

    if (currentTime - startTime > duration || currentFrame === undefined) {
      return completeFn();
    }

    Object(on_next_frame["a" /* OnNextFrame */])(function () {
      return stepFn(currentFrame);
    });
    Object(on_next_frame["a" /* OnNextFrame */])(run);
  };

  run();
}
// CONCATENATED MODULE: ./src/services/unsupported.js

function WCSupportClass() {
  var setUnsupportedClass = function setUnsupportedClass() {
    return document.body.className = "wc-unsupported";
  };

  var wc = window.WebComponents;
  var safariVersions = ["Version/9", "Version/8", "Version/7"];

  var tryCustomElements = function tryCustomElements() {
    requestAnimationFrame(function () {
      try {
        var t = typeof_default()(window.customElements.define);

        if (t !== "function") {
          setUnsupportedClass();
        }
      } catch (error) {
        setUnsupportedClass();
      }
    });
  };

  if (navigator.userAgent.indexOf("Safari") > -1 && safariVersions.reduce(function (prev, cur) {
    return prev ? true : navigator.userAgent.indexOf(cur) > -1;
  }, false)) {
    setUnsupportedClass();
  }

  if (wc && wc.ready) {
    tryCustomElements();
  } else {
    window.addEventListener("WebComponentsReady", tryCustomElements);
  }
}
// CONCATENATED MODULE: ./src/services/uploader.js
/* eslint-disable tree-shaking/no-side-effects-in-initialization */
 // TODO pako is not so great, minimal size savings. Is there anything else?
// const pako = require('../lib/pako/dist/pako.min.js')
// var reader = new FileReader();
// reader.onload = function () {
//     var compressed_file = pako.deflate(this.result, { level: 5 });
//     var myBlob = new Blob([compressed_file], { type: `application/x-gzip` })
//     // Pass it back to the main thread
// }
// reader.readAsArrayBuffer(fileObject)
// TODO API get urls
// TODO API save to disc
// TODO API stitch
// TODO check is there has been progress already, resume
// TODO pre upload chunk function?
// TODO pre upload function?

function UploadService(options, file) {
  if (!file) {
    return {
      upload: function upload() {},
      cancel: function cancel() {}
    };
  }

  var Options = Object.assign({}, {
    progressCB: function progressCB() {},
    completeCB: function completeCB() {},
    errorCB: function errorCB() {},
    url: location.href,
    bytesPerChunk: 647212,
    withCredentials: false,
    uploadMethod: "POST",
    headers: {},
    parallel: false
  }, options);

  var getFile = function getFile() {
    return file[0] ? file[0] : file;
  };

  var getTotal = function getTotal(file, bytesPerChunk) {
    return !!bytesPerChunk && bytesPerChunk > 0 ? Math.ceil(file.size / bytesPerChunk) : 1;
  };

  var uploadMessages = [];
  var completedChunks = [];
  var fileObject = getFile();
  var size = fileObject.size;
  var total = getTotal(fileObject, Options.bytesPerChunk);
  var uploadData = Object.assign({}, Options, {
    size: size,
    total: total,
    fileObject: fileObject
  });
  var stop = false;
  var chunkIndex = 0;
  var worker$ = ObserveWorker(function workerFunction() {
    self.onmessage = function (e) {
      var data = JSON.parse(e.data);
      var x = new XMLHttpRequest();
      x.open(data.method, data.url, true);
      x.withCredentials = data.withCredentials;
      Object.keys(data.headers).forEach(function (key) {
        return x.setRequestHeader(key, data.headers[key]);
      });

      x.onloadend = function () {
        self.postMessage(JSON.stringify({
          response: x.response,
          statusText: x.statusText,
          status: x.status
        }));
      };

      x.send(data.data);
    };
  });

  var setProgress = function setProgress() {
    return Options.progressCB(UseIf(function (p) {
      return p <= 1;
    }, function () {
      return 1;
    }, uploadData.total === 1 ? 1 : !completedChunks.length ? 0 : Math.ceil(completedChunks.length / uploadData.total * 100) / 100).value);
  };

  var getHeaders = function getHeaders(index, chunkSize, fileSize) {
    return Object.assign({}, {
      'Content-Type': "application/octet-stream",
      'X-Chunk-Id': index,
      'X-Chunk-Length': chunkSize,
      'X-File-Length': fileSize
    }, uploadData.headers);
  };

  var uploadUrl = function uploadUrl(index, url) {
    return !Array.isArray(url) ? url : url[index];
  };

  var getChunk = function getChunk(index) {
    return uploadData.total === 1 ? uploadData.fileObject : uploadData.fileObject.slice(index * uploadData.bytesPerChunk, (index + 1) * uploadData.bytesPerChunk);
  };

  var populateData = function populateData(index) {
    var data = getChunk(index);
    return {
      data: data,
      url: uploadUrl(index, uploadData.url),
      method: uploadData.uploadMethod,
      withCredentials: uploadData.withCredentials,
      headers: getHeaders(index, data.size, uploadData.fileObject.size)
    };
  };

  var onChunkUploaded = function onChunkUploaded(e) {
    // If no event, reject
    if (!e) {
      return Promise.reject();
    }

    var data = to_object_ToObject(e).value;

    if (data.status !== 200) {
      return Promise.reject(data.statusText);
    }

    completedChunks.push(chunkIndex);
    uploadMessages.push({
      chunk: chunkIndex,
      data: data
    }); // increment current chunk index

    chunkIndex = chunkIndex + 1; // update progress

    setProgress(); // if more chunks to upload

    if (chunkIndex < uploadData.total) {
      return uploadChunk(chunkIndex);
    } else {
      worker$.dispose();
      return Promise.resolve();
    }
  };

  var onChunkUploadedAsync = function onChunkUploadedAsync(index, e) {
    if (!e) {
      return Promise.reject();
    }

    var data = to_object_ToObject(e).value;

    if (data.status !== 200) {
      return Promise.reject(data.statusText);
    }

    completedChunks.push(index);
    uploadMessages.push({
      chunk: index,
      data: data
    }); // update progress

    setProgress();
    return Promise.resolve();
  };

  var uploadChunk = function uploadChunk(index) {
    return new Promise(function (resolve, reject) {
      if (stop) {
        return reject("upload was canceled");
      }

      return worker$.post(populateData(index)).then(onChunkUploaded).then(resolve)["catch"](reject);
    });
  };

  var uploadChunkAsync = function uploadChunkAsync(index) {
    return new Promise(function (resolve, reject) {
      if (stop) {
        return reject("upload was canceled");
      }

      return worker$.post(populateData(index)).then(function (res) {
        return onChunkUploadedAsync(index, res);
      }).then(resolve)["catch"](reject);
    });
  };

  var methods = {
    get currentChunk() {
      return chunkIndex;
    },

    cancel: function cancel() {
      stop = true;
    },
    upload: function upload() {
      if (!uploadData.size || !uploadData.total) {
        worker$.dispose();
        return Options.errorCB("invalid file");
      }

      if (!uploadData.url) {
        worker$.dispose();
        return Options.errorCB("invalid upload url");
      }

      if (stop) {
        worker$.dispose();
        return Options.errorCB("upload stopped");
      }

      if (!uploadData.parallel) {
        return uploadChunk(chunkIndex).then(Options.completeCB)["catch"](Options.errorCB);
      }

      var chunkArray = [];
      var index = 0;

      while (index < uploadData.total) {
        chunkArray.push(index);
        index = index + 1;
      }

      return Promise.all(chunkArray.map(function (c) {
        return uploadChunkAsync(c);
      })).then(function () {
        return Options.completeCB(uploadMessages);
      })["catch"](Options.errorCB);
    }
  };
  return methods;
}
window.UploadService = UploadService;
// CONCATENATED MODULE: ./src/utils/after-every-nth.js

function AfterEveryNth(nth, insert) {
  return function (value) {
    var result = TMonad(value);
    var pointer = 0;
    var changes = [];

    if (result.stop) {
      return result;
    }

    if (result.type !== "string") {
      result = ToString(result);
    }

    var mapper = ToMap(function (val, index) {
      var mapped = "";

      if ((index + 1) % nth === 0 && index !== 0) {
        mapped = "".concat(val).concat(insert);
        changes.push({
          start: pointer,
          end: pointer + (1 + insert.length),
          input: val,
          length: 1 + insert.length,
          result: mapped,
          added: insert
        });
        pointer = pointer + insert.length;
      } else {
        mapped = val;
        pointer = pointer + 1;
      }

      return mapped;
    });
    var r = Pipe(ToSplit(""), mapper, ToJoin(""))(result);
    r.stringChanges = r.stringChanges.concat(changes);
    r.valid = typeof r.value === "string" && r.value.length === 14;
    return r;
  };
}
// CONCATENATED MODULE: ./src/utils/append-children.js
function AppendChildren(el, children) {
  var documentFragment = document.createDocumentFragment();
  var len = children.length;
  var i = len;

  while (i) {
    documentFragment.appendChild(children[len - i]);
    i = i - 1;
  }

  el.appendChild(documentFragment);
  return el;
}
// CONCATENATED MODULE: ./src/utils/before-every-nth.js

function BeforeEveryNth(nth, insert) {
  return function (value) {
    var result = TMonad(value);
    var pointer = 0;
    var changes = [];

    if (result.stop) {
      return result;
    }

    if (result.type !== "string") {
      result = ToString(result);
    }

    var mapper = ToMap(function (val, index) {
      var mapped = "";

      if ((index + 1) % nth === 0 && index !== 0) {
        mapped = "".concat(insert).concat(val);
        changes.push({
          start: pointer,
          end: pointer + (1 + insert.length),
          input: val,
          length: 1 + insert.length,
          result: mapped,
          added: insert
        });
        pointer = pointer + insert.length;
      } else {
        mapped = val;
        pointer = pointer + 1;
      }

      return mapped;
    });
    var r = Pipe(ToSplit(""), mapper, ToJoin(""))(result);
    r.stringChanges = r.stringChanges.concat(changes);
    r.valid = typeof r.value === "string" && r.value.length === 14;
    return r;
  };
}
// CONCATENATED MODULE: ./src/utils/between.js
function Between(start, end, value) {
  var regex = new RegExp("".concat(start, "([^").concat(end, "]+)").concat(end), "gm");

  var getAll = function getAll() {
    var match;
    var matches = [];

    while ((match = regex.exec(value)) !== null) {
      matches.push(match[1]);
    }

    return matches;
  };

  return {
    all: function all() {
      return getAll();
    },
    first: function first() {
      return regex.exec(value)[1];
    },
    last: function last() {
      var results = getAll();
      return results[results.length - 1];
    },
    at: function at(index) {
      var results = getAll();
      return results[index];
    },
    get: function get() {
      return regex.exec(value);
    }
  };
}
// CONCATENATED MODULE: ./src/utils/browser-is.js
var isChrome = navigator.userAgent.indexOf("Chrome") > -1;
var isExplorer = navigator.userAgent.indexOf("MSIE") > -1;
var isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
var isSafari = navigator.userAgent.indexOf("Safari") > -1;
var isOpera = navigator.userAgent.toLowerCase().indexOf("op") > -1;

if (isChrome && isSafari) {
  isSafari = false;
}

if (isChrome && isOpera) {
  isChrome = false;
}

var BrowserIs = {
  safari: isSafari,
  chrome: isChrome,
  ie: isExplorer,
  firefox: isFirefox,
  opera: isOpera,
  which: isSafari ? "safari" : isChrome ? "chrome" : isExplorer ? "ie" : isFirefox ? "firefox" : isOpera ? "opera" : undefined
};
// CONCATENATED MODULE: ./src/utils/clear-html.js
function ClearHTML(el) {
  if (el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  return el;
}
// CONCATENATED MODULE: ./src/utils/to-date.js

function ToDate(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  try {
    result.value = new Date(Date.parse(result.value));
  } catch (error) {}

  var isDate = result.value !== "Invalid Date" && !isNaN(result.value) && result.value instanceof Date;
  result.type = isDate ? "date" : Type(result.value);
  result.valid = result.type === "date";
  return result;
}
// CONCATENATED MODULE: ./src/utils/date-to-object.js

function DateToObject(value) {
  var result = ToDate(value);

  if (result.stop || !result.valid) {
    return result;
  }

  var hour = parseInt(result.value.toLocaleTimeString(navigator.language, {
    hour: "numeric",
    hour12: true
  }));
  result.value = {
    year: result.value.getFullYear(),
    yearShort: result.value.toLocaleDateString(navigator.language, {
      year: "2-digit"
    }),
    monthIndex: result.value.getMonth(),
    month: result.value.getMonth() + 1,
    monthDouble: result.value.toLocaleDateString(navigator.language, {
      month: "2-digit"
    }),
    monthName: result.value.toLocaleString(navigator.language, {
      month: "long"
    }),
    monthNameShort: result.value.toLocaleString(navigator.language, {
      month: "short"
    }),
    day: result.value.getDate(),
    dayDouble: result.value.toLocaleDateString(navigator.language, {
      day: "2-digit"
    }),
    dayOfWeek: result.value.toLocaleString(navigator.language, {
      weekday: "long"
    }),
    dayOfWeekShort: result.value.toLocaleString(navigator.language, {
      weekday: "short"
    }),
    dayIndex: result.value.getDay(),
    hour24: parseInt(result.value.toLocaleTimeString(navigator.language, {
      hour: "numeric",
      hour12: false
    })),
    hour: hour,
    hourDouble: result.value.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      hour12: true
    }).replace(/[^0-9.]+/g, ""),
    hourDouble24: result.value.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      hour12: false
    }).replace(/[^0-9.]+/g, ""),
    minutes: parseInt(result.value.toLocaleTimeString(navigator.language, {
      minute: "numeric"
    })),
    minutesDouble: "0".concat(result.value.getMinutes()).slice(-2),
    seconds: parseInt(result.value.toLocaleTimeString(navigator.language, {
      second: "numeric"
    })),
    secondsDouble: "0".concat(result.value.getSeconds()).slice(-2),
    milliseconds: result.value.getMilliseconds(),
    ampm: result.value.toLocaleTimeString(navigator.language, {
      hour12: true,
      hour: "numeric"
    }).replace(/[:\d]/g, "").trim(),
    //result.value.getHours() > 11 ? `PM` : `AM`,
    date: result.value
  };
  return result;
}
// CONCATENATED MODULE: ./src/utils/ease-bounce.js

function EaseBounce(values, duration) {
  var pow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  return GetEase(values, duration, pow, function (index, frames, pow) {
    return EasePower(1 - index / frames, pow);
  });
}
// CONCATENATED MODULE: ./src/utils/ease-in.js

function EaseIn(values, duration) {
  var pow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  return GetEase(values, duration, pow, function (index, frames) {
    var t = index / frames;
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  });
}
// CONCATENATED MODULE: ./src/utils/ease-out.js

function EaseOut(values, duration) {
  var pow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  return GetEase(values, duration, pow, function (index, frames, pow) {
    return EasePower(index / frames, pow);
  });
}
// CONCATENATED MODULE: ./src/utils/find-element-in.js
function FindElementIn(parent, selector) {
  var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return !parent ? undefined : parent[all ? "querySelectorAll" : "querySelector"](selector);
}
// CONCATENATED MODULE: ./src/utils/first-of-month.js

var first_of_month_FirstOfMonth = function FirstOfMonth(value) {
  var result = ToDate(value);

  if (result.stop || !result.valid) {
    return result;
  }

  result.value = DateToObject(new Date(result.value.getFullYear(), result.value.getMonth(), 1)).value;
  return result;
};
// CONCATENATED MODULE: ./src/utils/from-uri.js

function FromURI(value) {
  return DoURI(value);
}
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
 * const curried = FunctionToPartial( (a, b, c) => { console.log(a, b, c) })
 * curried(`one`) // proxy with argument `a` populated with `one`
 * curried(`two`) // proxy with argument `b` populated with `two`
 * curried(`three`) // `one two three`
 */
function FunctionToPartial() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var argArray = [].concat(args);
  var fn = argArray.shift();
  /** If no function passed in, return */

  if (!fn) {
    return;
  }
  /** If the passed in arguments equal the original functions arity, just call the function */


  if (argArray.length >= fn.length) {
    return fn.apply(fn, argArray);
  }
  /** return function that takes new arguments which then returns a new FunctionToPartial */


  return function () {
    for (var _len2 = arguments.length, newArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      newArgs[_key2] = arguments[_key2];
    }

    return FunctionToPartial.apply(void 0, [fn].concat(toConsumableArray_default()(argArray.concat([].concat(newArgs)))));
  };
}
// CONCATENATED MODULE: ./src/utils/has-keys.js

function HasKeys(compare) {
  return function (value) {
    var result = to_object_ToObject(value);

    if (result.stop) {
      return result;
    }

    if (!result.valid) {
      return result;
    }

    var keys = Object.keys(result.value);
    result.valid = !keys.length && !compare.length ? true : keys.length && !compare.length ? false : compare.filter(function (v) {
      return keys.indexOf(v) > -1;
    }).length === compare.length;
    return result;
  };
}
// CONCATENATED MODULE: ./src/utils/has-method.js
function HasMethod(obj, method) {
  return !!obj && typeof obj[method] === "function";
}
// CONCATENATED MODULE: ./src/utils/if-is.js

function IfIs(compare, replace) {
  return function (value) {
    var result = TMonad(value);
    compare = TMonad(compare);
    result.valid = result.value === compare.value;

    if (result.value === compare.value) {
      result.value = TMonad(replace).value;
      result = TMonad(result.value);
    }

    return result;
  };
}
// CONCATENATED MODULE: ./src/utils/is-element-type.js

function IsElementType(tag) {
  return function (value) {
    var result = TMonad(value);

    if (result.stop) {
      return result;
    }

    result.valid = Object(utils_get["a" /* Get */])(result, "value.tagName", "").toLowerCase() === tag.toLowerCase();
    return result;
  };
}
// CONCATENATED MODULE: ./src/utils/is-mobile.js
var IsMobile = typeof window.orientation !== "undefined" || window.navigator.userAgent.indexOf("IEMobile") !== -1;
// CONCATENATED MODULE: ./src/utils/last-of-month.js

var last_of_month_LastOfMonth = function LastOfMonth(value) {
  var result = ToDate(value);

  if (result.stop || !result.valid) {
    return result;
  }

  result.value = DateToObject(new Date(result.value.getFullYear(), result.value.getMonth() + 1, 0)).value;
  return result;
};
// CONCATENATED MODULE: ./src/utils/reduce-map.js
/**
 * Takes a mapping function and returns a reducer
 * @function ReduceMap
 * @param {function( item:any ) :any } mapFunction - The function to be called on every element, performs the mapping operation
 * @return {function( accumulator:[], current:any ):[] } ReduceMapResult - The reducer function
 * @example 
 * [`A`, `B`].reduce(ReduceMap(mapFunction), []) // [`a`, `b`,]
 */
function ReduceMap(mapFunction) {
  return function ReduceMapResult(result, current) {
    return result.concat([mapFunction(current)]);
  };
}
// CONCATENATED MODULE: ./src/utils/map.js

/**
 * Performs a provided mapping operation to a provided collection. Intended to be used inconjunction with a transducer.
 * @function Map
 * @param {function() } mapFunction - The function to be called on every element, performs the mapping operation
 * @param {any[]} collection - The collection to iterate over
 * @return {any[]} Mapped collection
 * @example
 * Map(v=>v.toLowerCase(), [`A`, `B`]) // [`a`, `b`]
 * TODO - be able to take an object, Set, Weak map, etc
 */

function Map(mapFunction, collection) {
  return collection.reduce(ReduceMap(mapFunction), []);
}


// CONCATENATED MODULE: ./src/utils/match.js

var match_Match = function Match(toSearchFor, toSearchIn) {
  var doSearch = function doSearch(search) {
    return search.match(ToRegex(toSearchFor).value);
  };

  if (toSearchIn === undefined) {
    return function (toSearchIn) {
      return doSearch(toSearchIn);
    };
  }

  return doSearch(toSearchIn);
};
// CONCATENATED MODULE: ./src/utils/memoize.js
var cache = new WeakMap();
function Memoize(fn) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var obj = {
      fn: fn,
      args: [].concat(args)
    };
    var cached = cache.get(obj);
    console.log(cached, obj);

    if (cached) {
      return cached;
    }

    var result = fn.apply(fn, obj.args);
    cache.set(obj, result);
    return result; // const argArray = [...args]
    // const id = JSON.stringify(argArray)
    // const isCached = id in cache
    // function newOne() {
    //     cache.add = fn.apply(fn, argArray)
    //     return cache[id]
    // }
    // console.log(isCached, id)
    // return isCached ?
    //     cache[id] :
    //     newOne()
  };
} // export function Memoize() {
//     const cache = {}
//     function cacheHandler(fn) {
//         return function () {
//             const id = JSON.stringify(arguments)
//             if (cache[id]) { return cache[id] }
//             cache[id] = fn.apply(this, arguments)
//             return cache[id]
//         }
//     }
//     return {
//         go(fn) { return cacheHandler(fn) },
//         get cached() { return cache }
//     }
// }
// CONCATENATED MODULE: ./src/utils/merge.js


var mergeArray = function mergeArray(arr1, arr2) {
  var result = arr1.slice(0);
  arr2.forEach(function (value, index) {
    return result[index] = value;
  });
  return result;
};

var merge_merge = function merge(obj1, obj2) {
  if (!obj1) {
    return Object.assign({}, obj2);
  }

  if (!obj2) {
    return Object.assign({}, obj1);
  }

  var type1 = Type(obj1);
  var type2 = Type(obj2);

  if (type1 !== type2 || ["array", "object"].indexOf(type1) === -1) {
    return obj2;
  }

  if (type1 === "array") {
    return mergeArray(obj1, obj2);
  }

  var result = Object.assign({}, obj1);

  for (var key in obj2) {
    if (!obj2[key]) {
      continue;
    }

    result[key] = merge(obj1[key], obj2[key]);
  }

  return result;
};

var mutateMergeArray = function mutateMergeArray(arr1, arr2) {
  arr2.forEach(function (value, index) {
    return arr1[index] = value;
  });
  return arr1;
};

var merge_mutateMerge = function mutateMerge(obj1, obj2) {
  if (!obj1) {
    return obj2;
  }

  if (!obj2) {
    return obj1;
  }

  var type1 = Type(obj1);
  var type2 = Type(obj2);

  if (type1 !== type2 || ["array", "object"].indexOf(type1) === -1) {
    return obj2;
  }

  if (type1 === "array") {
    return mutateMergeArray(obj1, obj2);
  }

  for (var key in obj2) {
    if (!obj2[key]) {
      continue;
    }

    obj1[key] = mutateMerge(obj1[key], obj2[key]);
  }

  return obj1;
};

var Merge = function Merge(obj1, obj2) {
  var mutate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return !mutate ? merge_merge(obj1, obj2) : merge_mutateMerge(obj1, obj2);
};
// CONCATENATED MODULE: ./src/utils/month-data.js

var month_data_MonthData = function MonthData(value) {
  var result = ToDate(value);

  if (result.stop || !result.valid) {
    return result;
  }

  var first = first_of_month_FirstOfMonth(result.value).value;
  var last = last_of_month_LastOfMonth(result.value).value;
  var startIndex = first.dayIndex;
  var bufferStart = [];

  while (startIndex) {
    var d = DateToObject(new Date(first.year, first.monthIndex, 1 - startIndex)).value;
    d.outOfRange = true;
    bufferStart.push(d);
    startIndex = startIndex - 1;
  }

  var endIndex = 6 - last.dayIndex;
  var bufferEnd = [];

  while (endIndex) {
    var _d = DateToObject(new Date(last.year, last.monthIndex, last.day + (7 - (endIndex + last.dayIndex)))).value;
    _d.outOfRange = true;
    bufferEnd.push(_d);
    endIndex = endIndex - 1;
  }

  var daysArray = [].concat(bufferStart.slice());
  var dayIndex = 0;

  while (dayIndex < last.day) {
    var _d2 = DateToObject(new Date(first.year, first.monthIndex, first.day + dayIndex)).value;
    daysArray.push(_d2);
    dayIndex = dayIndex + 1;
  }

  result.value = daysArray.concat(bufferEnd.slice());
  return result;
};
// CONCATENATED MODULE: ./src/utils/properties-are.js

function PropertiesAre(compare) {
  return function (value) {
    var result = to_object_ToObject(value);

    if (result.stop) {
      return result;
    }

    if (!result.valid) {
      return result;
    }

    var keys = Object.keys(result.value);
    result.valid = keys.length === 0 ? true : keys.filter(function (v) {
      return Type(v) === compare;
    }).length > 0;
    return result;
  };
}
// CONCATENATED MODULE: ./src/utils/replace-element-contents.js
function ReplaceElementContents(element, contents) {
  var respond = function respond() {
    return {
      element: element,
      contents: contents
    };
  };

  if (!element) {
    return respond();
  }

  element.innerHTML = "";

  if (typeof contents === "string") {
    element.innerHTML = contents;
    return respond();
  }

  if (!Array.isArray(contents)) {
    return respond();
  }

  contents.forEach(function (content) {
    return element.appendChild(content);
  });
  return respond();
}
// CONCATENATED MODULE: ./src/utils/scroll-to.js


var scroll_to_animator = function animator(from, to, speed, stepFn) {
  return new Promise(function (resolve) {
    return Object(timer["a" /* Timer */])(stepFn, EaseInOut([from, to], speed)).then(resolve);
  });
};

function ScrollTo(options) {
  if (!options) {
    return;
  }

  if (options.element) {
    var box = options.element.getBoundingClientRect();
    options.x = box.left;
    options.y = box.top;
  }

  options = Object.assign({}, {
    speed: 300,
    x: 0,
    y: 0,
    target: window
  }, options);
  var target = Object(utils_get["a" /* Get */])(options, "target");

  if (!target) {
    return;
  }
  /** TODO - handle x */


  var fromY = target.scrollY || target.scrollTop;
  var toY = Object(utils_get["a" /* Get */])(options, "y");
  var toX = Object(utils_get["a" /* Get */])(options, "x");
  var speed = Object(utils_get["a" /* Get */])(options, "speed");
  scroll_to_animator(fromY || 0, toY || 0, speed, function (y) {
    return target.scrollTo(toX, y);
  });
}
// CONCATENATED MODULE: ./src/utils/set-caret.js
function SetCaret(input, position, doc) {
  if (!input || !doc || doc.activeElement !== input) {
    return;
  }

  if (input.createTextRange) {
    var range = input.createTextRange();
    range.move("character", position);
    range.select();
  } else if (input.selectionStart) {
    input.setSelectionRange(position, position);
  }

  return input;
}
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
 * @property {function(...args)} curry - Returns a copy of the current curried function, adding in any passed arguments
 * @property {function(arg)} pushArgument - Adds a new argument
 * @property {function()} popArgument - Removes the last argument
 * @property {function(property:string, next:function, error:function, complete:function)} subscribe - Subscribes to a state property observer, if it exists
 * 
 * @return {function()} A proxy version of the original function with the above properties/methods
 * 
 * @example
 * const wonderFunction = SuperFunction( (a, b, c) => `${a} | ${b} | ${c}` )
 * 
 * wonderFunction(`one`) // `one undefined undefined`
 * 
 * const curried = wonderFunction.curried
 * curried(`one`) // proxy with argument `a` populated with `one`
 * curried(`two`) // proxy with argument `b` populated with `two`
 * curried(`three`) // `one | two | three`
 * 
 * const curried2 = wonderFunction.curried
 * curried2.pushArgument(`Aquaman`) // (`Aquaman`, b, c) => `${a} | ${b} | ${c}`
 * 
 * const curried3 = curried2.curried
 * curried3.pushArgument(`Skateman`) // (`Aquaman`, `Skateman`, c) => `${a} | ${b} | ${c}`
 * curried3.length // 3
 * curried3.args // [`Aquaman`, `Skateman`]
 * curried3.complete // false
 * curried3.versions // [curried, curried2]
 * 
 * curried3.popArgument()
 * curried3.args // [`Aquaman`]
 * 
 * curried3.curry(`Krypto the Superdog`, `Arm Rip Off Boy`) // `Aquaman | Krypto the Superdog | Arm Rip Off Boy`
 * 
 * curried3.subscribe(`args`, console.log)
 * curried3.pushArgument(`Squirrel Girl`) 
 * // subscription triggered -> [`Aquaman`, `Squirrel Girl`]
 * 
 * curried3.subscribe(`call`, console.log)
 * curried3(`Razorback`)
 * // subscription triggered -> {
 * //   arguments:[
 * //       `Aquaman`, 
 * //       `Squirrel Girl`, 
 * //       `Razorback`
 * //   ], 
 * //   returned: `Aquaman | Squirrel Girl | Razorback`, 
 * //   self:curried3 
 * // }
 */

function SuperFunction(fn) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : fn ? fn.name : "";
  var length = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : fn ? fn.length : 0;

  if (!fn) {
    return;
  }
  /** State object, holds observers to subscribe to */


  var state = {
    curried: Observer([FunctionToPartial(fn)]),
    args: Observer(toConsumableArray_default()(args)),
    call: Observer({})
  };
  /** Gets last curried function */

  function currentCurry() {
    return state.curried.value[state.curried.value.length - 1];
  }
  /** Object to store a proxy of the passed in function. It's stored in an object so that properties like name and length can be set to the proxy */


  var result = {};
  /** Proxy, a function that wraps the original function, passing in the stored arguments and any arguments passed in */

  result[name] = function () {
    for (var _len = arguments.length, proxyArgs = new Array(_len), _key = 0; _key < _len; _key++) {
      proxyArgs[_key] = arguments[_key];
    }

    // concat the arguments, call the original function and store it's result
    var newArgs = state.args.value.concat(proxyArgs).slice(0, length);
    /** TODO - this is duplicate code, needs to be DRY but not sure how yet */

    var newResult = {};
    newResult[name] = fn.apply(result[name], newArgs);

    if (typeof newResult[name] === "function" && newResult[name].name === "") {
      newResult[name] = SuperFunction(newResult[name], [], name, length);
    } // Triggers 'call' observer subscriptions


    state.call.next({
      arguments: newArgs,
      returned: newResult[name],
      self: result[name]
    });
    return newResult[name];
  };
  /** Define new properties for the proxy function */


  Object.defineProperties(result[name], {
    /** @prototype Inherit original function name */
    name: {
      value: name
    },

    /** @prototype Inherit original function arity */
    length: {
      get: function get() {
        return length;
      }
    },

    /** @prototype Stored arguments */
    args: {
      get: function get() {
        return state.args.value;
      },

      /** Replaces all stored arguments and resets the curried versions */
      set: function set(arg) {
        state.args.next(!Array.isArray(arg) ? [arg] : arg);
        state.curried.next([FunctionToPartial(fn)]);
      }
    },

    /** Returns a new super copy of the function */
    curried: {
      get: function get() {
        return SuperFunction(currentCurry(), state.args.value, name, length);
      }
    },

    /** Returns true if the stored arguments length is that of the original functions argument length */
    complete: {
      get: function get() {
        return state.args.value.length === length;
      }
    },
    isSuperFunction: {
      value: true
    }
  });
  /**
   * @prototype Adds a new argument to the end of the stored arguments
   * @param {any} arg - the argument to add
   */

  result[name].pushArgument = function (arg) {
    /** Do not add more arguments than the function can take */
    if (length === state.args.value.length) {
      return;
    }
    /** Add the argument to the curried state, creating a new version */


    var curried = state.curried.value.slice();
    curried.push(curried[curried.length - 1](arg));
    state.curried.next(curried);
    /** Add the argument */

    state.args.next(state.args.value.concat([arg]));
  };
  /** @prototype Removes the last argument from the stored arguments as well as the last curry */


  result[name].popArgument = function () {
    if (state.args.value.length === 0) {
      return;
    }

    state.args.next(state.args.value.slice(0, state.args.value.length - 1));
    state.curried.next(state.curried.value.slice(0, state.curried.value.length - 1));
  };
  /** @prototype Returns a copy of the current curried function, adding in any passed arguments */


  result[name].curry = function () {
    var proxy = result[name].curried;

    for (var _len2 = arguments.length, argsToAdd = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      argsToAdd[_key2] = arguments[_key2];
    }

    argsToAdd.forEach(proxy.pushArgument);
    return proxy;
  };
  /** 
   * @prototype Subscribes to a state property observer, if it exists
   * @param {string} property - the property in which to subscribe
   * @param {any} callbacks - Observer callbacks, next, error, complete
   */


  result[name].subscribe = function () {
    for (var _len3 = arguments.length, subscribeArguments = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      subscribeArguments[_key3] = arguments[_key3];
    }

    return !state[subscribeArguments[0]] ? undefined : state[subscribeArguments[0]].subscribe(subscribeArguments[1], subscribeArguments[2], subscribeArguments[3]);
  };

  return result[name];
}


// CONCATENATED MODULE: ./src/utils/to-ascii.js

function ToAscii(string) {
  var result = TMonad(string);

  try {
    // eslint-disable-next-line no-control-regex
    result.value = result.replace(/[^\x00-\x7F]/g, "");
  } catch (error) {
    result.valid = false;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/to-capitalize.js

function ToCapitalize(string) {
  var result = TMonad(string);

  try {
    result.value = "".concat(result.value.slice(0, 1).toUpperCase()).concat(result.value.slice(1) || "");
  } catch (error) {
    result.valid = false;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/to-entities.js

function ToEntities(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type === "string" && !!result.value) {
    result.value = result.value.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/`/g, "&apos;");
    result.valid = true;
  } else {
    result.valid = false;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/to-function.js

function ToFunction(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  return TMonadUpdate(result, "function", "ToFunction");
}
// CONCATENATED MODULE: ./src/utils/to-phone.js

function ToPhone(value) {
  var result = TMonad(value);
  var pointer = 0;
  var changes = [];

  if (result.stop) {
    return result;
  }

  var mapper = ToMap(function (val, index) {
    var length = "".concat(result.value || "").length;
    var mapped = "";

    if (index === 0) {
      mapped = length ? "(".concat(val) : val;
      changes.push({
        start: pointer,
        end: pointer + 1,
        input: val,
        length: 1,
        result: mapped,
        added: "("
      });
      pointer = pointer + 2;
    }

    if (index === 3) {
      mapped = length > 4 ? ") ".concat(val) : val;
      changes.push({
        start: pointer,
        end: pointer + 2,
        input: val,
        length: 2,
        result: mapped,
        added: ") "
      });
      pointer = pointer + 3;
    }

    if (index === 6) {
      mapped = length > 9 ? "-".concat(val) : val;
      changes.push({
        start: pointer,
        end: pointer + 1,
        input: val,
        length: 1,
        result: mapped,
        added: "-"
      });
      pointer = pointer + 2;
    }

    if ([9, 8, 7, 5, 4, 2, 1].indexOf(index) > -1) {
      mapped = val;
      pointer = pointer + 1;
    }

    if (index > 9) {
      mapped = "";
      changes.push({
        start: pointer,
        end: pointer + 1,
        input: val,
        length: 1,
        result: mapped,
        removed: val
      });
      pointer = pointer + 1;
    }

    return mapped;
  });
  var r = Pipe(ToDigits, ToSplit(""), mapper, ToJoin(""))(result);
  r.stringChanges = r.stringChanges.concat(changes);
  r.valid = typeof r.value === "string" && r.value.length === 14;
  return r;
}
// CONCATENATED MODULE: ./src/utils/to-intl-phone.js

function ToIntlPhone(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  var parts = result.value.split(" ");
  var countryCode = parts[0].indexOf("+") > -1 ? "".concat(parts.shift(), " ") : "";
  var countryCodeMonad = ToDigits(countryCode);
  var r = ToPhone(parts.join(" "));
  result.value = "+".concat(countryCodeMonad.value, " ").concat(r.value).trim();
  result.stringChanges = r.stringChanges;
  return result;
}
// CONCATENATED MODULE: ./src/utils/to-lower-case.js

function ToLowerCase(string) {
  var result = TMonad(string);

  try {
    result.value = result.value.toLowerCase();
  } catch (error) {
    result.valid = false;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/to-match-meta.js

function ToMatchMeta(string, search) {
  var justOne = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var matches = [];
  var changes = [];
  var value = typeof string === "string" ? string : ToString(string).value;

  var lastMatch = function lastMatch() {
    return changes[changes.length - 1];
  };

  var hasMatched = false;
  value.replace(ToRegex(search).value, function () {
    if (justOne && hasMatched) {
      return;
    }

    hasMatched = true;
    var arr = [].slice.call(arguments, 0);

    if (arr[0] === "") {
      return;
    }

    var extras = arr.splice(-2);
    arr.index = extras[0];
    arr.input = extras[1];
    var last = lastMatch();
    var length = arr[0].length;
    var match = {
      start: arr.index,
      end: arr.index + length,
      input: arr.input,
      length: length,
      result: arr[0],
      removed: undefined
    };

    if (match.start && last && last.end !== match.start) {
      match.removed = match.input.slice(last.end, match.start);
    } else {
      delete match.removed;
    }

    matches.push(match.result);
    changes.push(match);
  });
  var last = lastMatch();

  if (last.end < value.length) {
    var removed = value.slice(last.end);
    changes.push({
      start: last.end,
      end: value.length,
      input: value,
      length: value.length - last.end,
      result: removed,
      removed: removed
    });
  }

  return {
    value: matches,
    stringChanges: changes
  };
}
// CONCATENATED MODULE: ./src/utils/to-match.js

function ToMatch(search) {
  return function (value) {
    var result = TMonad(value);

    if (result.stop) {
      return result;
    }

    if (result.type !== "string") {
      result = ToString(result);
    }

    var matches = ToMatchMeta(result.value, search, true);
    result.value = matches.value;
    result.valid = result.value.length === 1;
    result.stringChanges = result.stringChanges.concat(matches.stringChanges);
    return result;
  };
}
// CONCATENATED MODULE: ./src/utils/to-match-all.js

function ToMatchAll(search) {
  return function (value) {
    var result = TMonad(value);

    if (result.stop) {
      return result;
    }

    if (result.type !== "string") {
      result = ToString(result);
    }

    var matches = ToMatchMeta(result.value, search);
    result.value = matches.value;
    result.valid = result.value.length > 0;
    result.stringChanges = result.stringChanges.concat(matches.stringChanges);
    return result;
  };
}
// CONCATENATED MODULE: ./src/utils/to-options.js

function ToOptions(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  var mapper = ToMap(function (value) {
    if (typeof value === "object" && Object.prototype.hasOwnProperty.call(value, "value")) {
      if (!Object.prototype.hasOwnProperty.call(value, "label")) {
        value.label = value.value;
      }

      return value;
    }

    return {
      value: value,
      label: value
    };
  });
  return TMonadUpdate(Pipe(CommasToArray, IfInvalid([]), mapper)(result), "array", "Options");
}
// CONCATENATED MODULE: ./src/utils/to-replacement-pattern.js

var to_replacement_pattern_ToReplacementPattern = function ToReplacementPattern(string) {
  if (!string) {
    return [];
  }

  var str = ToString(string).value;
  var matches = str.match(/(\$\d+)+/g) || [];
  var extras = str.split(new RegExp("[".concat(matches.join("|"), "]")));
  var parsedMatches = matches ? matches.map(function (match) {
    return Pipe(ToDigits, ToNumber)(match).value;
  }) : [];
  var result = [];
  extras.forEach(function (extra, index) {
    if (extra === "") {
      if (index === 0 || index === extras.length - 1) {
        var replacement = parsedMatches.shift();
        return result.push({
          index: replacement,
          original: "$".concat(replacement)
        });
      }

      return;
    }

    result.push(extra);
  });
  return result;
};
// CONCATENATED MODULE: ./src/utils/to-replace-meta.js

function ToReplaceMeta(string, search, insert) {
  var replacements = to_replacement_pattern_ToReplacementPattern(insert);
  var result = {
    value: string.toString(),
    stringChanges: []
  };
  var testString = result.value;
  var match;
  var index = 0;

  while ((match = ToRegex(search).value.exec(testString)) !== null) {
    var end = match.index + match[0].length;
    var matched = {
      start: match.index,
      end: end,
      input: match.input,
      length: match[0].length,
      result: "",
      removed: match[0],
      pre: "",
      post: "",
      index: index
    };
    matched.pre = matched.start !== 0 ? testString.slice(0, matched.start) : "";
    matched.post = testString.slice(end);
    matched.result = "".concat(matched.pre).concat(matched.post);

    if (match.length > 1 && replacements.length) {
      matched.added = replacements.reduce(function (previous, current) {
        if (typeof current === "string") {
          return "".concat(previous).concat(current);
        }

        return "".concat(previous).concat(match[current.index] || "");
      }, "");
      matched.length = matched.added.length;
      matched.end = match.index + matched.length;
      matched.result = "".concat(matched.pre).concat(matched.added || "").concat(matched.post);
    }

    result.stringChanges.push(matched);
    testString = matched.post;
    index = index + 1;
  }

  if (result.stringChanges.length) {
    result.value = result.stringChanges.reduce(function (previous, current, i) {
      var added = current.added || "";
      var post = i !== result.stringChanges.length - 1 ? "" : current.post;
      return "".concat(previous).concat(current.pre).concat(added).concat(post);
    }, "");
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/to-replace.js

function ToReplace(search, replace) {
  return function (value) {
    var result = TMonad(value);

    if (result.stop) {
      return result;
    }

    if (result.type !== "string") {
      result = ToString(result);
    }

    try {
      var replaced = ToReplaceMeta(result.value, search, replace);
      result.value = replaced.value;
      result.valid = true;
      result.stringChanges = result.stringChanges.concat(replaced.stringChanges);
    } catch (error) {
      result.valid = false;
    }

    return TMonadUpdate(result, "string", "Replace");
  };
}
// CONCATENATED MODULE: ./src/utils/to-slice.js

function ToSlice(start, end) {
  return function (value) {
    var result = TMonad(value);

    if (result.stop) {
      return result;
    }

    try {
      var v = result.value.slice();
      result.value = v.slice(start, end);

      if (typeof v === "string") {
        if (start !== 0) {
          result.stringChanges.push({
            start: 0,
            end: start,
            input: v,
            length: start,
            result: v.slice(0, start),
            removed: v.slice(0, start)
          });
        }

        if (end < v.length) {
          result.stringChanges.push({
            start: end,
            end: v.length,
            input: v,
            length: v.length - end,
            result: v.slice(end),
            removed: v.slice(end)
          });
        }
      }
    } catch (error) {
      result.valid = false;
    }

    return result;
  };
}
// CONCATENATED MODULE: ./src/utils/to-upper-case.js

function ToUpperCase(string) {
  var result = TMonad(string);

  try {
    result.value = result.value.toUpperCase();
  } catch (error) {
    result.valid = false;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/to-uri.js

function ToURI(value) {
  return DoURI(value, true);
}
// CONCATENATED MODULE: ./src/utils/to-uri-component.js

function ToURIComponent(value) {
  return DoURI(value, true, true);
}
// CONCATENATED MODULE: ./src/utils/transduce-filter.js
function TransduceFilter(predicateFunction) {
  return function (nextReducer) {
    return function (result, current) {
      return predicateFunction(current) ? nextReducer(result, current) : result;
    };
  };
}
// CONCATENATED MODULE: ./src/utils/transduce-map.js
function TransduceMap(conversionFunction) {
  return function (nextReducer) {
    return function (result, current) {
      return nextReducer(result, conversionFunction(current));
    };
  };
}
// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport AjaxForm */__webpack_require__.d(__webpack_exports__, "AjaxForm", function() { return AjaxForm; });
/* concated harmony reexport ButtonElement */__webpack_require__.d(__webpack_exports__, "ButtonElement", function() { return ButtonElement; });
/* concated harmony reexport CollapseMenu */__webpack_require__.d(__webpack_exports__, "CollapseMenu", function() { return CollapseMenu; });
/* concated harmony reexport ContentCollapse */__webpack_require__.d(__webpack_exports__, "ContentCollapse", function() { return ContentCollapse; });
/* concated harmony reexport ContentDrawer */__webpack_require__.d(__webpack_exports__, "ContentDrawer", function() { return ContentDrawer; });
/* concated harmony reexport ContentTransition */__webpack_require__.d(__webpack_exports__, "ContentTransition", function() { return ContentTransition; });
/* concated harmony reexport CookieMessage */__webpack_require__.d(__webpack_exports__, "CookieMessage", function() { return CookieMessage; });
/* concated harmony reexport DropDown */__webpack_require__.d(__webpack_exports__, "DropDown", function() { return DropDown; });
/* concated harmony reexport EffectBounceZ */__webpack_require__.d(__webpack_exports__, "EffectBounceZ", function() { return EffectBounceZ; });
/* concated harmony reexport EffectFade */__webpack_require__.d(__webpack_exports__, "EffectFade", function() { return EffectFade; });
/* concated harmony reexport EffectRipple */__webpack_require__.d(__webpack_exports__, "EffectRipple", function() { return EffectRipple; });
/* concated harmony reexport EffectScale */__webpack_require__.d(__webpack_exports__, "EffectScale", function() { return EffectScale; });
/* concated harmony reexport EffectUnderline */__webpack_require__.d(__webpack_exports__, "EffectUnderline", function() { return EffectUnderline; });
/* concated harmony reexport GridLayout */__webpack_require__.d(__webpack_exports__, "GridLayout", function() { return GridLayout; });
/* concated harmony reexport HorizontalSlider */__webpack_require__.d(__webpack_exports__, "HorizontalSlider", function() { return HorizontalSlider; });
/* concated harmony reexport IconElement */__webpack_require__.d(__webpack_exports__, "IconElement", function() { return IconElement; });
/* concated harmony reexport ImageLoader */__webpack_require__.d(__webpack_exports__, "ImageLoader", function() { return ImageLoader; });
/* concated harmony reexport InputBool */__webpack_require__.d(__webpack_exports__, "InputBool", function() { return InputBool; });
/* concated harmony reexport InputField */__webpack_require__.d(__webpack_exports__, "InputField", function() { return InputField; });
/* concated harmony reexport InputSelect */__webpack_require__.d(__webpack_exports__, "InputSelect", function() { return InputSelect; });
/* concated harmony reexport OverlayContent */__webpack_require__.d(__webpack_exports__, "OverlayContent", function() { return OverlayContent; });
/* concated harmony reexport OverlayMessage */__webpack_require__.d(__webpack_exports__, "OverlayMessage", function() { return OverlayMessage; });
/* concated harmony reexport ProgressBar */__webpack_require__.d(__webpack_exports__, "ProgressBar", function() { return ProgressBar; });
/* concated harmony reexport SnackBar */__webpack_require__.d(__webpack_exports__, "SnackBar", function() { return SnackBar; });
/* concated harmony reexport SpinnerElement */__webpack_require__.d(__webpack_exports__, "SpinnerElement", function() { return SpinnerElement; });
/* concated harmony reexport Router */__webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* concated harmony reexport ComponentStore */__webpack_require__.d(__webpack_exports__, "ComponentStore", function() { return componentStore["a" /* ComponentStore */]; });
/* concated harmony reexport DragDropService */__webpack_require__.d(__webpack_exports__, "DragDropService", function() { return DragDropService; });
/* concated harmony reexport OnNextFrame */__webpack_require__.d(__webpack_exports__, "OnNextFrame", function() { return on_next_frame["a" /* OnNextFrame */]; });
/* concated harmony reexport Request */__webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* concated harmony reexport Animator */__webpack_require__.d(__webpack_exports__, "Animator", function() { return Animator; });
/* concated harmony reexport Timer */__webpack_require__.d(__webpack_exports__, "Timer", function() { return timer["a" /* Timer */]; });
/* concated harmony reexport WCSupportClass */__webpack_require__.d(__webpack_exports__, "WCSupportClass", function() { return WCSupportClass; });
/* concated harmony reexport UploadService */__webpack_require__.d(__webpack_exports__, "UploadService", function() { return UploadService; });
/* concated harmony reexport iconArrow */__webpack_require__.d(__webpack_exports__, "iconArrow", function() { return iconArrow; });
/* concated harmony reexport iconCheck */__webpack_require__.d(__webpack_exports__, "iconCheck", function() { return iconCheck; });
/* concated harmony reexport iconChevron */__webpack_require__.d(__webpack_exports__, "iconChevron", function() { return iconChevron; });
/* concated harmony reexport iconClose */__webpack_require__.d(__webpack_exports__, "iconClose", function() { return iconClose; });
/* concated harmony reexport iconDelete */__webpack_require__.d(__webpack_exports__, "iconDelete", function() { return iconDelete; });
/* concated harmony reexport iconError */__webpack_require__.d(__webpack_exports__, "iconError", function() { return iconError; });
/* concated harmony reexport iconFilter */__webpack_require__.d(__webpack_exports__, "iconFilter", function() { return iconFilter; });
/* concated harmony reexport iconGear */__webpack_require__.d(__webpack_exports__, "iconGear", function() { return iconGear; });
/* concated harmony reexport iconInfo */__webpack_require__.d(__webpack_exports__, "iconInfo", function() { return iconInfo; });
/* concated harmony reexport iconPencil */__webpack_require__.d(__webpack_exports__, "iconPencil", function() { return iconPencil; });
/* concated harmony reexport iconPlay */__webpack_require__.d(__webpack_exports__, "iconPlay", function() { return iconPlay; });
/* concated harmony reexport iconTriangle */__webpack_require__.d(__webpack_exports__, "iconTriangle", function() { return iconTriangle; });
/* concated harmony reexport iconWarning */__webpack_require__.d(__webpack_exports__, "iconWarning", function() { return iconWarning; });
/* concated harmony reexport Icons */__webpack_require__.d(__webpack_exports__, "Icons", function() { return Icons; });
/* concated harmony reexport AfterEveryNth */__webpack_require__.d(__webpack_exports__, "AfterEveryNth", function() { return AfterEveryNth; });
/* concated harmony reexport AppendChildren */__webpack_require__.d(__webpack_exports__, "AppendChildren", function() { return AppendChildren; });
/* concated harmony reexport AppendStyleElement */__webpack_require__.d(__webpack_exports__, "AppendStyleElement", function() { return AppendStyleElement; });
/* concated harmony reexport BeforeEveryNth */__webpack_require__.d(__webpack_exports__, "BeforeEveryNth", function() { return BeforeEveryNth; });
/* concated harmony reexport Between */__webpack_require__.d(__webpack_exports__, "Between", function() { return Between; });
/* concated harmony reexport BrowserIs */__webpack_require__.d(__webpack_exports__, "BrowserIs", function() { return BrowserIs; });
/* concated harmony reexport CommasToArray */__webpack_require__.d(__webpack_exports__, "CommasToArray", function() { return CommasToArray; });
/* concated harmony reexport ComponentClassObject */__webpack_require__.d(__webpack_exports__, "ComponentClassObject", function() { return ComponentClassObject; });
/* concated harmony reexport ClearHTML */__webpack_require__.d(__webpack_exports__, "ClearHTML", function() { return ClearHTML; });
/* concated harmony reexport CreateElement */__webpack_require__.d(__webpack_exports__, "CreateElement", function() { return create_element_CreateElement; });
/* concated harmony reexport DateToObject */__webpack_require__.d(__webpack_exports__, "DateToObject", function() { return DateToObject; });
/* concated harmony reexport EaseBounce */__webpack_require__.d(__webpack_exports__, "EaseBounce", function() { return EaseBounce; });
/* concated harmony reexport EaseIn */__webpack_require__.d(__webpack_exports__, "EaseIn", function() { return EaseIn; });
/* concated harmony reexport EaseInOut */__webpack_require__.d(__webpack_exports__, "EaseInOut", function() { return EaseInOut; });
/* concated harmony reexport EaseOut */__webpack_require__.d(__webpack_exports__, "EaseOut", function() { return EaseOut; });
/* concated harmony reexport EasePower */__webpack_require__.d(__webpack_exports__, "EasePower", function() { return EasePower; });
/* concated harmony reexport Equals */__webpack_require__.d(__webpack_exports__, "Equals", function() { return Equals; });
/* concated harmony reexport EventName */__webpack_require__.d(__webpack_exports__, "EventName", function() { return EventName; });
/* concated harmony reexport FindElementIn */__webpack_require__.d(__webpack_exports__, "FindElementIn", function() { return FindElementIn; });
/* concated harmony reexport FirstOfMonth */__webpack_require__.d(__webpack_exports__, "FirstOfMonth", function() { return first_of_month_FirstOfMonth; });
/* concated harmony reexport FromJSON */__webpack_require__.d(__webpack_exports__, "FromJSON", function() { return FromJSON; });
/* concated harmony reexport FromEntities */__webpack_require__.d(__webpack_exports__, "FromEntities", function() { return FromEntities; });
/* concated harmony reexport FromURI */__webpack_require__.d(__webpack_exports__, "FromURI", function() { return FromURI; });
/* concated harmony reexport FromURIComponent */__webpack_require__.d(__webpack_exports__, "FromURIComponent", function() { return FromURIComponent; });
/* concated harmony reexport FunctionToPartial */__webpack_require__.d(__webpack_exports__, "FunctionToPartial", function() { return FunctionToPartial; });
/* concated harmony reexport Get */__webpack_require__.d(__webpack_exports__, "Get", function() { return utils_get["a" /* Get */]; });
/* concated harmony reexport GetCurve */__webpack_require__.d(__webpack_exports__, "GetCurve", function() { return GetCurve; });
/* concated harmony reexport GetEase */__webpack_require__.d(__webpack_exports__, "GetEase", function() { return GetEase; });
/* concated harmony reexport GetInputValue */__webpack_require__.d(__webpack_exports__, "GetInputValue", function() { return GetInputValue; });
/* concated harmony reexport GetParent */__webpack_require__.d(__webpack_exports__, "GetParent", function() { return GetParent; });
/* concated harmony reexport HasKeys */__webpack_require__.d(__webpack_exports__, "HasKeys", function() { return HasKeys; });
/* concated harmony reexport HasMethod */__webpack_require__.d(__webpack_exports__, "HasMethod", function() { return HasMethod; });
/* concated harmony reexport htmlTags */__webpack_require__.d(__webpack_exports__, "htmlTags", function() { return htmlTags; });
/* concated harmony reexport ID */__webpack_require__.d(__webpack_exports__, "ID", function() { return utils_id["a" /* ID */]; });
/* concated harmony reexport IfEmpty */__webpack_require__.d(__webpack_exports__, "IfEmpty", function() { return IfEmpty; });
/* concated harmony reexport IfInvalid */__webpack_require__.d(__webpack_exports__, "IfInvalid", function() { return IfInvalid; });
/* concated harmony reexport IfIs */__webpack_require__.d(__webpack_exports__, "IfIs", function() { return IfIs; });
/* concated harmony reexport IfNot */__webpack_require__.d(__webpack_exports__, "IfNot", function() { return IfNot; });
/* concated harmony reexport IndexOf */__webpack_require__.d(__webpack_exports__, "IndexOf", function() { return IndexOf; });
/* concated harmony reexport IsAutoFilled */__webpack_require__.d(__webpack_exports__, "IsAutoFilled", function() { return IsAutoFilled; });
/* concated harmony reexport IsDate */__webpack_require__.d(__webpack_exports__, "IsDate", function() { return IsDate; });
/* concated harmony reexport IsDom */__webpack_require__.d(__webpack_exports__, "IsDom", function() { return IsDom; });
/* concated harmony reexport IsElement */__webpack_require__.d(__webpack_exports__, "IsElement", function() { return IsElement; });
/* concated harmony reexport IsElementType */__webpack_require__.d(__webpack_exports__, "IsElementType", function() { return IsElementType; });
/* concated harmony reexport IsEmpty */__webpack_require__.d(__webpack_exports__, "IsEmpty", function() { return IsEmpty; });
/* concated harmony reexport IsMobile */__webpack_require__.d(__webpack_exports__, "IsMobile", function() { return IsMobile; });
/* concated harmony reexport IsNonCollection */__webpack_require__.d(__webpack_exports__, "IsNonCollection", function() { return IsNonCollection; });
/* concated harmony reexport IsObject */__webpack_require__.d(__webpack_exports__, "IsObject", function() { return IsObject; });
/* concated harmony reexport IsTMonad */__webpack_require__.d(__webpack_exports__, "IsTMonad", function() { return IsTMonad; });
/* concated harmony reexport LastOfMonth */__webpack_require__.d(__webpack_exports__, "LastOfMonth", function() { return last_of_month_LastOfMonth; });
/* concated harmony reexport Map */__webpack_require__.d(__webpack_exports__, "Map", function() { return Map; });
/* concated harmony reexport Match */__webpack_require__.d(__webpack_exports__, "Match", function() { return match_Match; });
/* concated harmony reexport Memoize */__webpack_require__.d(__webpack_exports__, "Memoize", function() { return Memoize; });
/* concated harmony reexport Merge */__webpack_require__.d(__webpack_exports__, "Merge", function() { return Merge; });
/* concated harmony reexport MonthData */__webpack_require__.d(__webpack_exports__, "MonthData", function() { return month_data_MonthData; });
/* concated harmony reexport ObserveExists */__webpack_require__.d(__webpack_exports__, "ObserveExists", function() { return ObserveExists; });
/* concated harmony reexport ObserveEvent */__webpack_require__.d(__webpack_exports__, "ObserveEvent", function() { return ObserveEvent; });
/* concated harmony reexport ObserveSlots */__webpack_require__.d(__webpack_exports__, "ObserveSlots", function() { return ObserveSlots; });
/* concated harmony reexport ObserveWorker */__webpack_require__.d(__webpack_exports__, "ObserveWorker", function() { return ObserveWorker; });
/* concated harmony reexport ObserveVisibility */__webpack_require__.d(__webpack_exports__, "ObserveVisibility", function() { return ObserveVisibility; });
/* concated harmony reexport Observer */__webpack_require__.d(__webpack_exports__, "Observer", function() { return Observer; });
/* concated harmony reexport ObserverUnsubscribe */__webpack_require__.d(__webpack_exports__, "ObserverUnsubscribe", function() { return ObserverUnsubscribe; });
/* concated harmony reexport Pipe */__webpack_require__.d(__webpack_exports__, "Pipe", function() { return Pipe; });
/* concated harmony reexport PolyfillMutationObserver */__webpack_require__.d(__webpack_exports__, "PolyfillMutationObserver", function() { return PolyfillMutationObserver; });
/* concated harmony reexport PolyfillObjectAssign */__webpack_require__.d(__webpack_exports__, "PolyfillObjectAssign", function() { return PolyfillObjectAssign; });
/* concated harmony reexport PolyFillWC */__webpack_require__.d(__webpack_exports__, "PolyFillWC", function() { return PolyFillWC; });
/* concated harmony reexport PropertiesAre */__webpack_require__.d(__webpack_exports__, "PropertiesAre", function() { return PropertiesAre; });
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
/* concated harmony reexport SetShadowRoot */__webpack_require__.d(__webpack_exports__, "SetShadowRoot", function() { return SetShadowRoot; });
/* concated harmony reexport SetStyleRules */__webpack_require__.d(__webpack_exports__, "SetStyleRules", function() { return SetStyleRules; });
/* concated harmony reexport StopIfInvalid */__webpack_require__.d(__webpack_exports__, "StopIfInvalid", function() { return StopIfInvalid; });
/* concated harmony reexport svgTags */__webpack_require__.d(__webpack_exports__, "svgTags", function() { return svgTags; });
/* concated harmony reexport SuperFunction */__webpack_require__.d(__webpack_exports__, "SuperFunction", function() { return SuperFunction; });
/* concated harmony reexport Throttle */__webpack_require__.d(__webpack_exports__, "Throttle", function() { return Throttle; });
/* concated harmony reexport TMonad */__webpack_require__.d(__webpack_exports__, "TMonad", function() { return TMonad; });
/* concated harmony reexport TMonadUpdate */__webpack_require__.d(__webpack_exports__, "TMonadUpdate", function() { return TMonadUpdate; });
/* concated harmony reexport ToArray */__webpack_require__.d(__webpack_exports__, "ToArray", function() { return ToArray; });
/* concated harmony reexport ToAscii */__webpack_require__.d(__webpack_exports__, "ToAscii", function() { return ToAscii; });
/* concated harmony reexport ToBool */__webpack_require__.d(__webpack_exports__, "ToBool", function() { return ToBool; });
/* concated harmony reexport ToCapitalize */__webpack_require__.d(__webpack_exports__, "ToCapitalize", function() { return ToCapitalize; });
/* concated harmony reexport ToDate */__webpack_require__.d(__webpack_exports__, "ToDate", function() { return ToDate; });
/* concated harmony reexport ToDigits */__webpack_require__.d(__webpack_exports__, "ToDigits", function() { return ToDigits; });
/* concated harmony reexport ToEntities */__webpack_require__.d(__webpack_exports__, "ToEntities", function() { return ToEntities; });
/* concated harmony reexport ToFilter */__webpack_require__.d(__webpack_exports__, "ToFilter", function() { return ToFilter; });
/* concated harmony reexport ToFunction */__webpack_require__.d(__webpack_exports__, "ToFunction", function() { return ToFunction; });
/* concated harmony reexport ToIntlPhone */__webpack_require__.d(__webpack_exports__, "ToIntlPhone", function() { return ToIntlPhone; });
/* concated harmony reexport ToJoin */__webpack_require__.d(__webpack_exports__, "ToJoin", function() { return ToJoin; });
/* concated harmony reexport ToJoinMeta */__webpack_require__.d(__webpack_exports__, "ToJoinMeta", function() { return ToJoinMeta; });
/* concated harmony reexport ToJSON */__webpack_require__.d(__webpack_exports__, "ToJSON", function() { return ToJSON; });
/* concated harmony reexport ToLowerCase */__webpack_require__.d(__webpack_exports__, "ToLowerCase", function() { return ToLowerCase; });
/* concated harmony reexport ToMap */__webpack_require__.d(__webpack_exports__, "ToMap", function() { return ToMap; });
/* concated harmony reexport ToMatch */__webpack_require__.d(__webpack_exports__, "ToMatch", function() { return ToMatch; });
/* concated harmony reexport ToMatchAll */__webpack_require__.d(__webpack_exports__, "ToMatchAll", function() { return ToMatchAll; });
/* concated harmony reexport ToMatchMeta */__webpack_require__.d(__webpack_exports__, "ToMatchMeta", function() { return ToMatchMeta; });
/* concated harmony reexport ToNumber */__webpack_require__.d(__webpack_exports__, "ToNumber", function() { return ToNumber; });
/* concated harmony reexport ToObject */__webpack_require__.d(__webpack_exports__, "ToObject", function() { return to_object_ToObject; });
/* concated harmony reexport ToOptions */__webpack_require__.d(__webpack_exports__, "ToOptions", function() { return ToOptions; });
/* concated harmony reexport ToPhone */__webpack_require__.d(__webpack_exports__, "ToPhone", function() { return ToPhone; });
/* concated harmony reexport ToPlainText */__webpack_require__.d(__webpack_exports__, "ToPlainText", function() { return ToPlainText; });
/* concated harmony reexport ToRegex */__webpack_require__.d(__webpack_exports__, "ToRegex", function() { return ToRegex; });
/* concated harmony reexport ToReplace */__webpack_require__.d(__webpack_exports__, "ToReplace", function() { return ToReplace; });
/* concated harmony reexport ToReplacementPattern */__webpack_require__.d(__webpack_exports__, "ToReplacementPattern", function() { return to_replacement_pattern_ToReplacementPattern; });
/* concated harmony reexport ToReplaceMeta */__webpack_require__.d(__webpack_exports__, "ToReplaceMeta", function() { return ToReplaceMeta; });
/* concated harmony reexport ToSlice */__webpack_require__.d(__webpack_exports__, "ToSlice", function() { return ToSlice; });
/* concated harmony reexport ToSplit */__webpack_require__.d(__webpack_exports__, "ToSplit", function() { return ToSplit; });
/* concated harmony reexport ToSplitMeta */__webpack_require__.d(__webpack_exports__, "ToSplitMeta", function() { return ToSplitMeta; });
/* concated harmony reexport ToString */__webpack_require__.d(__webpack_exports__, "ToString", function() { return ToString; });
/* concated harmony reexport ToTrim */__webpack_require__.d(__webpack_exports__, "ToTrim", function() { return ToTrim; });
/* concated harmony reexport ToUpperCase */__webpack_require__.d(__webpack_exports__, "ToUpperCase", function() { return ToUpperCase; });
/* concated harmony reexport ToURI */__webpack_require__.d(__webpack_exports__, "ToURI", function() { return ToURI; });
/* concated harmony reexport ToURIComponent */__webpack_require__.d(__webpack_exports__, "ToURIComponent", function() { return ToURIComponent; });
/* concated harmony reexport ToUsZip */__webpack_require__.d(__webpack_exports__, "ToUsZip", function() { return ToUsZip; });
/* concated harmony reexport TransduceFilter */__webpack_require__.d(__webpack_exports__, "TransduceFilter", function() { return TransduceFilter; });
/* concated harmony reexport TransduceMap */__webpack_require__.d(__webpack_exports__, "TransduceMap", function() { return TransduceMap; });
/* concated harmony reexport Try */__webpack_require__.d(__webpack_exports__, "Try", function() { return Try; });
/* concated harmony reexport Type */__webpack_require__.d(__webpack_exports__, "Type", function() { return Type; });
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
/* concated harmony reexport WCClass */__webpack_require__.d(__webpack_exports__, "WCClass", function() { return WCClass; });
/* concated harmony reexport WasClickedOn */__webpack_require__.d(__webpack_exports__, "WasClickedOn", function() { return WasClickedOn; });
/* concated harmony reexport WCConstructor */__webpack_require__.d(__webpack_exports__, "WCConstructor", function() { return WCConstructor; });
/* concated harmony reexport WCDefine */__webpack_require__.d(__webpack_exports__, "WCDefine", function() { return WCDefine; });
/* concated harmony reexport WCElements */__webpack_require__.d(__webpack_exports__, "WCElements", function() { return WCElements; });
/* concated harmony reexport WCwhenPropertyReady */__webpack_require__.d(__webpack_exports__, "WCwhenPropertyReady", function() { return WCwhenPropertyReady; });
/** COMPONENTS */

















 // export { InputFile } from './components/input-file/index.js'








/** SERVICES */











/** UTILS */

















































































































































/***/ }),
/* 8 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(3);

var assertThisInitialized = __webpack_require__(28);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(input-field){display:inline-block;width:300px;max-width:100%;vertical-align:top;position:relative;color:inherit}:host(input-bool){display:inline-block;width:300px;max-width:100%;vertical-align:top;position:relative;color:inherit}:host(input-file){display:inline-block;width:300px;max-width:100%;vertical-align:top;position:relative;color:inherit}:host(input-select){display:inline-block;width:300px;max-width:100%;vertical-align:top;position:relative;color:inherit}input-field,input-bool,input-file,input-select{display:inline-block;width:300px;max-width:100%;vertical-align:top;position:relative;color:inherit}input-field[resize=\"auto\"] .input-field-input,input-field[resize=\"none\"] .input-field-input,input-bool[resize=\"auto\"] .input-field-input,input-bool[resize=\"none\"] .input-field-input,input-file[resize=\"auto\"] .input-field-input,input-file[resize=\"none\"] .input-field-input,input-select[resize=\"auto\"] .input-field-input,input-select[resize=\"none\"] .input-field-input{resize:none}input-field[resize=\"horizontal\"] .input-field-input,input-bool[resize=\"horizontal\"] .input-field-input,input-file[resize=\"horizontal\"] .input-field-input,input-select[resize=\"horizontal\"] .input-field-input{resize:horizontal}input-field[resize=\"vertical\"] .input-field-input,input-bool[resize=\"vertical\"] .input-field-input,input-file[resize=\"vertical\"] .input-field-input,input-select[resize=\"vertical\"] .input-field-input{resize:vertical}input-field .input-field-input,input-bool .input-field-input,input-file .input-field-input,input-select .input-field-input{background:rgba(255,255,255,0.4);position:relative;border:none;border-radius:2px;display:block;margin:0em;height:100%;width:100%;padding:1em;opacity:1;font:inherit;color:inherit;outline:none !important;-webkit-appearance:none;-moz-appearance:none;appearance:none;box-sizing:border-box;text-overflow:ellipsis;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;box-shadow:none;-webkit-transition:color 0.4s, background-color 0.4s, box-shadow 0.3s;transition:color 0.4s, background-color 0.4s, box-shadow 0.3s}input-field .input-field-input[disabled],input-bool .input-field-input[disabled],input-file .input-field-input[disabled],input-select .input-field-input[disabled]{pointer-events:none;cursor:not-allowed;opacity:0.6;background:rgba(200,200,200,0.6)}input-field .input-field-input[readonly],input-bool .input-field-input[readonly],input-file .input-field-input[readonly],input-select .input-field-input[readonly]{cursor:not-allowed;pointer-events:none}input-field .input-field-input.intl-phone-input,input-bool .input-field-input.intl-phone-input,input-file .input-field-input.intl-phone-input,input-select .input-field-input.intl-phone-input{padding:0;display:-webkit-box;display:flex;flex-wrap:nowrap;-webkit-box-align:center;align-items:center}input-field .input-field-input.intl-phone-input input,input-bool .input-field-input.intl-phone-input input,input-file .input-field-input.intl-phone-input input,input-select .input-field-input.intl-phone-input input{-webkit-box-flex:1;flex-grow:1;width:100%;padding:1em 1em 1em 0.25em;margin:0;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;outline:none !important;font:inherit;line-height:inherit}input-field .input-field-input::-webkit-input-placeholder,input-bool .input-field-input::-webkit-input-placeholder,input-file .input-field-input::-webkit-input-placeholder,input-select .input-field-input::-webkit-input-placeholder{color:currentColor;opacity:0.62}input-field .input-field-input:-webkit-input-placeholder,input-bool .input-field-input:-webkit-input-placeholder,input-file .input-field-input:-webkit-input-placeholder,input-select .input-field-input:-webkit-input-placeholder{color:currentColor;opacity:0.62}input-field .input-field-input:-ms-input-placeholder,input-bool .input-field-input:-ms-input-placeholder,input-file .input-field-input:-ms-input-placeholder,input-select .input-field-input:-ms-input-placeholder{color:currentColor;opacity:0.62}input-field .input-field-input::-webkit-input-placeholder,input-bool .input-field-input::-webkit-input-placeholder,input-file .input-field-input::-webkit-input-placeholder,input-select .input-field-input::-webkit-input-placeholder{color:currentColor;opacity:0.62}input-field .input-field-input::-moz-placeholder,input-bool .input-field-input::-moz-placeholder,input-file .input-field-input::-moz-placeholder,input-select .input-field-input::-moz-placeholder{color:currentColor;opacity:0.62}input-field .input-field-input::-ms-input-placeholder,input-bool .input-field-input::-ms-input-placeholder,input-file .input-field-input::-ms-input-placeholder,input-select .input-field-input::-ms-input-placeholder{color:currentColor;opacity:0.62}input-field .input-field-input::placeholder,input-bool .input-field-input::placeholder,input-file .input-field-input::placeholder,input-select .input-field-input::placeholder{color:currentColor;opacity:0.62}input-field input,input-field textarea,input-bool input,input-bool textarea,input-file input,input-file textarea,input-select input,input-select textarea{cursor:text}input-field input::-ms-clear,input-bool input::-ms-clear,input-file input::-ms-clear,input-select input::-ms-clear{display:none}@supports (-webkit-overflow-scrolling: touch){input-field input.input-field-input:focus,input-field textarea.input-field-input:focus,input-bool input.input-field-input:focus,input-bool textarea.input-field-input:focus,input-file input.input-field-input:focus,input-file textarea.input-field-input:focus,input-select input.input-field-input:focus,input-select textarea.input-field-input:focus{font-size:16px !important}}input-field label,input-bool label,input-file label,input-select label{padding:0.1em;font-weight:bold;min-height:1.6em;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;outline:none !important;opacity:1;cursor:pointer;-webkit-transition:opacity 0.2s ease-in-out 0.1s, -webkit-transform 0.2s ease-in-out;transition:opacity 0.2s ease-in-out 0.1s, -webkit-transform 0.2s ease-in-out;transition:opacity 0.2s ease-in-out 0.1s, transform 0.2s ease-in-out;transition:opacity 0.2s ease-in-out 0.1s, transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out}input-field label.input-field-left-label,input-bool label.input-field-left-label,input-file label.input-field-left-label,input-select label.input-field-left-label{padding-right:1em}input-field label.input-field-right-label,input-bool label.input-field-right-label,input-file label.input-field-right-label,input-select label.input-field-right-label{padding-left:1em}input-field label.input-field-inside-label,input-bool label.input-field-inside-label,input-file label.input-field-inside-label,input-select label.input-field-inside-label{position:relative;pointer-events:none;padding:0;font-weight:normal;opacity:0.5;font-size:85%;-webkit-transform:scale(1.1) translateY(2.5em) translateX(1em);transform:scale(1.1) translateY(2.5em) translateX(1em);-webkit-transform-origin:left center;transform-origin:left center;min-height:1.6em;max-width:calc(100% - 4em)}input-field[has-value=\"true\"] label.input-field-inside-label,input-field[focused=\"true\"] label.input-field-inside-label,input-field[icon][has-value=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-field[icon][has-value=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-field[icon][focused=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-field[icon][focused=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-field[icon][has-value=\"true\"][clearbutton] label.input-field-inside-label,input-field[icon][focused=\"true\"][clearbutton] label.input-field-inside-label,input-bool[has-value=\"true\"] label.input-field-inside-label,input-bool[focused=\"true\"] label.input-field-inside-label,input-bool[icon][has-value=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-bool[icon][has-value=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-bool[icon][focused=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-bool[icon][focused=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-bool[icon][has-value=\"true\"][clearbutton] label.input-field-inside-label,input-bool[icon][focused=\"true\"][clearbutton] label.input-field-inside-label,input-file[has-value=\"true\"] label.input-field-inside-label,input-file[focused=\"true\"] label.input-field-inside-label,input-file[icon][has-value=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-file[icon][has-value=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-file[icon][focused=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-file[icon][focused=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-file[icon][has-value=\"true\"][clearbutton] label.input-field-inside-label,input-file[icon][focused=\"true\"][clearbutton] label.input-field-inside-label,input-select[has-value=\"true\"] label.input-field-inside-label,input-select[focused=\"true\"] label.input-field-inside-label,input-select[icon][has-value=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-select[icon][has-value=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-select[icon][focused=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-select[icon][focused=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-select[icon][has-value=\"true\"][clearbutton] label.input-field-inside-label,input-select[icon][focused=\"true\"][clearbutton] label.input-field-inside-label{pointer-events:all;padding:0;font-weight:bold;opacity:1;font-size:85%;-webkit-transform:scale(1) translateY(0em) translateX(0em);transform:scale(1) translateY(0em) translateX(0em);max-width:100%}input-field:not([focused=\"true\"]),input-bool:not([focused=\"true\"]),input-file:not([focused=\"true\"]),input-select:not([focused=\"true\"]){-webkit-transform-style:preserve-3d;transform-style:preserve-3d}input-field:not([focused=\"true\"]) .input-field-label-inside,input-bool:not([focused=\"true\"]) .input-field-label-inside,input-file:not([focused=\"true\"]) .input-field-label-inside,input-select:not([focused=\"true\"]) .input-field-label-inside{-webkit-transform:translate3d(0, 0, 1px);transform:translate3d(0, 0, 1px)}input-field[icon][iconalign=\"left\"] label.input-field-inside-label,input-field[icon][clearbutton] label.input-field-inside-label,input-bool[icon][iconalign=\"left\"] label.input-field-inside-label,input-bool[icon][clearbutton] label.input-field-inside-label,input-file[icon][iconalign=\"left\"] label.input-field-inside-label,input-file[icon][clearbutton] label.input-field-inside-label,input-select[icon][iconalign=\"left\"] label.input-field-inside-label,input-select[icon][clearbutton] label.input-field-inside-label{padding-left:1.2em}input-bool input.input-field-input{cursor:pointer;opacity:0;-webkit-transition:none;transition:none}input-bool label.input-field-left-label,input-bool label.input-field-right-label{margin-top:-0.2em}input-select select.input-field-input{padding:1em 2em 1em 1em}\n", ""]);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(24);


/***/ }),
/* 14 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(11);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".content-transition-container{position:relative}.content-transition-container .current-slot{opacity:1}.content-transition-container .next-slot{width:100%;height:100%;position:absolute;top:0;left:0;opacity:0}.content-transition-container .hidden-slot{width:100%;height:100%;overflow:hidden;opacity:0;pointer-events:none;position:absolute;top:0;left:0;z-index:-1;visibility:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.content-transition-container .hidden-slot .hidden-slot-inner{width:100%;height:100%;display:inline-block;position:absolute;top:0;left:0}.content-transition-container.keepchildren .next-slot{pointer-events:none;opacity:0;-webkit-transform:translateZ(0) translateX(-100%);transform:translateZ(0) translateX(-100%)}.content-transition-container.keepchildren[type=\"fade\"] .next-slot{-webkit-transform:translateZ(0) translateX(0);transform:translateZ(0) translateX(0)}.content-transition-container.sliding{overflow:hidden}.content-transition-container.flex-stretch{-webkit-box-flex:1;flex-grow:1;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.content-transition-container.flex-stretch .content-transition-inner,.content-transition-container.flex-stretch .current-slot,.content-transition-container.flex-stretch .next-slot,.content-transition-container.flex-stretch .hidden-slot{-webkit-box-flex:1;flex-grow:1;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}\n", ""]);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Timer; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);

var TimerKey = Symbol["for"]("builtjs.TimerKey");
var globalSymbols = Object.getOwnPropertySymbols(global);
var hasTimerKey = globalSymbols.indexOf(TimerKey) > -1;
var subscriptions = {};
var isRunning = false;

var removeSubscription = function removeSubscription(subscription) {
  if (!subscription || !subscription.id) {
    return;
  }

  var id = subscription.id;

  if (!subscriptions[id] || subscriptions[id].resolved) {
    return;
  }

  subscriptions[id].resolved = true;
  subscriptions[id].resolve();
  Object(___WEBPACK_IMPORTED_MODULE_0__[/* OnNextFrame */ "a"])(function () {
    subscriptions[id] = null;
    delete subscriptions[id];
  });
};

var loop = function loop() {
  isRunning = true;
  var subscriptionKeys = Object.keys(subscriptions);

  if (!subscriptionKeys.length) {
    isRunning = false;
    return;
  }

  subscriptionKeys.forEach(function (key) {
    if (!subscriptions[key] || subscriptions[key].resolved) {
      return;
    }

    var subscription = subscriptions[key];
    var index = new Date().getTime() - subscription.started;

    if (index >= subscription.frameValues.length) {
      subscription.end = index;
      Object(___WEBPACK_IMPORTED_MODULE_0__[/* OnNextFrame */ "a"])(function () {
        return subscription.stepFn(subscription.frameValues[subscription.frameValues.length - 1]);
      });
      Object(___WEBPACK_IMPORTED_MODULE_0__[/* OnNextFrame */ "a"])(function () {
        return removeSubscription(subscription);
      });
    } else {
      Object(___WEBPACK_IMPORTED_MODULE_0__[/* OnNextFrame */ "a"])(function () {
        return subscription.stepFn(subscription.frameValues[index]);
      });
    }
  });
  Object(___WEBPACK_IMPORTED_MODULE_0__[/* OnNextFrame */ "a"])(loop);
};

if (!hasTimerKey) {
  global[TimerKey] = function (stepFn, frameValues) {
    if (!Array.isArray(frameValues) || frameValues.length === 0) {
      return;
    }

    if (typeof stepFn !== "function") {
      return;
    }

    var id = Object(___WEBPACK_IMPORTED_MODULE_1__[/* ID */ "a"])();
    var resolve, reject;
    var promise = new Promise(function (res, rej) {
      resolve = res;
      reject = rej;
    });
    subscriptions[id] = {
      id: id,
      stepFn: stepFn,
      frameValues: frameValues,
      resolved: false,
      started: new Date().getTime(),
      cancel: function cancel() {
        return removeSubscription(subscriptions[id]);
      },
      then: function then(fn) {
        return promise.then(fn);
      },
      "catch": function _catch(fn) {
        return promise["catch"](fn);
      },
      promise: promise,
      resolve: resolve,
      reject: reject
    };

    if (!isRunning) {
      loop();
    }

    return subscriptions[id];
  };
}

var Timer = Object.freeze(global[TimerKey]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".grid-layout-items{display:-webkit-box;display:flex;display:grid;justify-items:center;grid-auto-flow:dense;width:100%;flex-wrap:wrap}.grid-layout-items>*,.grid-layout-items ::slotted(*){width:100%}.grid-layout-items .grid-layout-item.hidden{position:absolute;z-index:-1;opacity:0;pointer-events:none}\n", ""]);


/***/ }),
/* 20 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(8);

var setPrototypeOf = __webpack_require__(11);

var isNativeFunction = __webpack_require__(29);

var construct = __webpack_require__(30);

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "<div class=ajax-form-container> <form class=ajax-form-form> <grid-layout class=ajax-form-grid></grid-layout> </form> </div> ";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(ajax-form){font:inherit;line-height:inherit;display:block;position:relative}:host(ajax-form) input-field{width:100%}ajax-form{font:inherit;line-height:inherit;display:block;position:relative}ajax-form input-field{width:100%}\n", ""]);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(11);

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = "<div class=button-element-container> <button> <slot></slot> </button> </div> ";

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(button-element){font:inherit;line-height:inherit;display:inline-block;position:relative}button-element{font:inherit;line-height:inherit;display:inline-block;position:relative}.button-element-container{display:block;position:relative;margin:1.4em 0}.button-element-container.nomargin{margin:0}.button-element-container.slim button{padding:0.25em}.button-element-container.short button{padding:0.5em 1em}.button-element-container.nobackground button{background:transparent;background-color:transparent}.button-element-container.nobackground button:hover{background:transparent;background-color:transparent}.button-element-container.noshadow button{box-shadow:none}.button-element-container.noshadow button:hover{box-shadow:none}.button-element-container button{opacity:0;background:#fafafa;position:relative;border:none;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;margin:0px;width:auto;padding:1em;font:inherit;color:inherit;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;box-sizing:border-box;text-overflow:ellipsis;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;box-shadow:inset 0px -2px 0px rgba(0,0,0,0.13),inset 0px 0px 0px 1px rgba(0,0,0,0.25);border-radius:2px;outline:0px !important;-webkit-transform:scale(1);transform:scale(1);white-space:nowrap;-webkit-transition:box-shadow 0.2s, color 0.4s, background-color 0.4s, opacity 0.2s ease-in-out 0.01s;transition:box-shadow 0.2s, color 0.4s, background-color 0.4s, opacity 0.2s ease-in-out 0.01s}.button-element-container button.ready{opacity:1}.button-element-container button:hover{background-color:#fff;box-shadow:inset 0px -2px 0px rgba(0,0,0,0.13),inset 0px 0px 0px 1px rgba(0,0,0,0.25),0px 10px 9px -6px rgba(0,0,0,0.2)}.button-element-container button .btn-submit{position:absolute;width:100%;height:100%;background:none;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;opacity:0}.button-element-container button input{position:absolute;background:transparent;border:none;width:100%;height:100%;display:block;color:transparent;margin:0;padding:0;opacity:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.button-element-container.disabled{opacity:0.25;pointer-events:none}.button-element-container slot{pointer-events:none}\n", ""]);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".collapse-menu-container{position:relative}.collapse-menu-container .toggle-arrow,.collapse-menu-container .default-toggle-icon{display:inline-block;cursor:pointer;pointer-events:none;opacity:0;position:absolute;top:0;left:0;z-index:-1}.collapse-menu-container .toggle-arrow{position:relative;margin-left:-0.5em;margin-right:-0.5em}.collapse-menu-container .toggle-arrow svg{fill:currentColor}.collapse-menu-container .collapse-menu-items{-webkit-transition:-webkit-transform 0.2s;transition:-webkit-transform 0.2s;transition:transform 0.2s;transition:transform 0.2s, -webkit-transform 0.2s}.collapse-menu-container .collapse-menu-items .collapse-menu-items-inner{flex-wrap:nowrap;white-space:nowrap;position:relative}.collapse-menu-container:not(.collapseonwrap) .collapse-menu-items .collapse-menu-items-inner{flex-wrap:wrap;white-space:normal}.collapse-menu-container .collapse-menu-items-bg{position:absolute;width:100%;height:100%;opacity:0;-webkit-transition:opacity 0s;transition:opacity 0s}.collapse-menu-container .collapse-menu-toggle{position:absolute;opacity:0;pointer-events:none;height:1.5em;display:-webkit-box;display:flex;cursor:pointer;-webkit-transition:opacity 0.2s;transition:opacity 0.2s}.collapse-menu-container .collapse-menu-toggle-icon{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.collapse-menu-container .collapse-menu-toggle-inner{padding-left:1em;position:relative;display:none;cursor:pointer;margin:0;opacity:0;height:0}.collapse-menu-container .collapse-menu-toggle-inner .default-toggle-inner-icon{position:relative;left:-0.33em;pointer-events:none}.collapse-menu-container[direction=\"horizontal\"] .collapse-menu-items{display:-webkit-box;display:flex}.collapse-menu-container[direction=\"horizontal\"] .collapse-menu-items .collapse-menu-items-inner{display:-webkit-box;display:flex}.collapse-menu-container[expandable=\"true\"] .toggle-arrow,.collapse-menu-container[expandable=\"true\"] .default-toggle-icon{opacity:1;position:relative;pointer-events:all;z-index:unset}.collapse-menu-container[expandable=\"true\"] .collapse-menu-items{opacity:0;pointer-events:none;z-index:-1;position:fixed;-webkit-transform:translateX(-105%) perspective(1px) translateZ(0);transform:translateX(-105%) perspective(1px) translateZ(0);-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-backface-visibility:hidden;backface-visibility:hidden}.collapse-menu-container[expandable=\"true\"] .collapse-menu-items-bg{opacity:1;-webkit-transition:opacity 0s linear 0.3s;transition:opacity 0s linear 0.3s}.collapse-menu-container[expandable=\"true\"] .collapse-menu-toggle-inner{display:block;margin:1em 0;height:1.5em;-webkit-transition:margin 0.01s linear 0.4s, height 0.01s linear 0.4s;transition:margin 0.01s linear 0.4s, height 0.01s linear 0.4s}.collapse-menu-container[expandable=\"true\"] .collapse-menu-toggle{position:relative;opacity:1;pointer-events:all}.collapse-menu-container[expandable=\"true\"][align=\"right\"] .collapse-menu-items{-webkit-transform:translateX(105%) perspective(1px) translateZ(0);transform:translateX(105%) perspective(1px) translateZ(0);-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-backface-visibility:hidden;backface-visibility:hidden}.collapse-menu-container[expandable=\"false\"] .collapse-menu-items{position:relative;-webkit-transform:translateX(0%) perspective(1px) translateZ(0);transform:translateX(0%) perspective(1px) translateZ(0);-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-backface-visibility:hidden;backface-visibility:hidden}.collapse-menu-container[expandable=\"false\"] .collapse-menu-toggle-inner{opacity:0;z-index:-1;pointer-events:none}.collapse-menu-container[expandable=\"true\"][expanded=\"true\"] .collapse-menu-items{-webkit-transform:translateX(0em) perspective(1px) translateZ(0);transform:translateX(0em) perspective(1px) translateZ(0);-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-backface-visibility:hidden;backface-visibility:hidden;opacity:1;z-index:unset;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;top:0;left:0;height:100vh;-webkit-box-align:start;align-items:flex-start;pointer-events:all}.collapse-menu-container[expandable=\"true\"][expanded=\"true\"] .collapse-menu-items .collapse-menu-items-inner{-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;height:calc(100vh - 3.5em)}.collapse-menu-container[expandable=\"true\"][expanded=\"true\"] .collapse-menu-toggle{opacity:0}.collapse-menu-container[expandable=\"true\"][expanded=\"true\"] .collapse-menu-toggle-inner{opacity:1;-webkit-transition:opacity 0.5s ease-in-out 0.1s;transition:opacity 0.5s ease-in-out 0.1s}.collapse-menu-container[expandable=\"true\"][expanded=\"true\"][align=\"right\"] .collapse-menu-items{right:0;left:unset;text-align:left}.collapse-menu-container[expandable=\"true\"][expanded=\"true\"][align=\"right\"] .collapse-menu-toggle-inner{-webkit-transform:rotate(180deg) perspective(1px) translateZ(0);transform:rotate(180deg) perspective(1px) translateZ(0);-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-backface-visibility:hidden;backface-visibility:hidden;padding-left:0;padding-right:1em}\n", ""]);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(collapse-menu){display:block}collapse-menu{display:block}collapse-menu>[slot=\"item\"]{padding-right:1em;box-sizing:border-box;opacity:0;-webkit-transform:perspective(1px) translateZ(0);transform:perspective(1px) translateZ(0);-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-backface-visibility:hidden;backface-visibility:hidden}collapse-menu>[slot=\"item\"]:last-of-type{padding-right:0}collapse-menu[expandable=\"false\"]>[slot=\"item\"],collapse-menu:not([expandable])>[slot=\"item\"],collapse-menu[expanded=\"true\"]>[slot=\"item\"]{opacity:1}collapse-menu[expandable=\"false\"]>[slot=\"item\"]:last-of-type,collapse-menu:not([expandable])>[slot=\"item\"]:last-of-type{padding-right:0}collapse-menu[expandable=\"true\"][expanded=\"true\"]>[slot=\"item\"]{padding:0.5em 1.5em;position:relative}\n", ""]);


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = "<div class=collapse-menu-container expanded=false expandable=false> <div class=collapse-menu-toggle> <div class=collapse-menu-toggle-icon> <slot name=toggle-icon> <icon-element style=height:1.5em class=default-toggle-icon size=1.5em svg='<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z\"/></svg>'></icon-element> <div class=toggle-arrow style=height:1.5em;margin-top:-.3em> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox=\"0 0 24 24\"> <path d=\"M7 10l5 5 5-5z\"/></svg> </div> </slot> </div> </div> <div class=collapse-menu-items> <div class=collapse-menu-items-bg></div> <div class=collapse-menu-toggle-inner> <icon-element class=default-toggle-inner-icon size=1.5em svg='<svg class=\"default-inner-toggle-icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\" /></svg>'></icon-element> </div> <div class=collapse-menu-items-inner> <slot name=item></slot> </div> </div> </div> ";

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(content-collapse){display:block}.content-collapse-toggler{cursor:pointer;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;width:100%}.content-collapse-toggler .content-collapse-toggler-content{-webkit-box-flex:1;flex-grow:1}.content-collapse-toggler icon-element.content-collapse-toggler-icon{margin-left:-0.33em;-webkit-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:-webkit-transform 0.2s;transition:-webkit-transform 0.2s;transition:transform 0.2s;transition:transform 0.2s, -webkit-transform 0.2s}.content-collapse-toggler icon-element.content-collapse-toggler-icon[rotation=\"down\"]{-webkit-transform:rotate(90deg);transform:rotate(90deg)}\n", ""]);


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = "<div class=content-collapse-container> <div class=content-collapse-toggler> <icon-element class=content-collapse-toggler-icon size=1.5em></icon-element> <div class=content-collapse-toggler-content> <slot name=content-collapse-toggler></slot> </div> </div> <div class=content-collapse-content> <content-transition class=content-collapse-transition keepchildren=true type=fade> <div class=content-collapse-empty slot=hidden></div> <div class=content-collapse-content-holder slot=hidden> <slot name=content-collapse-content></slot> </div> </content-transition> </div> </div> ";

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".content-drawer-container{display:block;width:100%;position:relative;height:auto;left:0%;top:0px}.content-drawer-container.open icon-element.content-drawer-header-icon{-webkit-transform:translateZ(0) translateX(-0.3em) translateY(0.05em) rotate(90deg);transform:translateZ(0) translateX(-0.3em) translateY(0.05em) rotate(90deg)}.content-drawer-container .content-drawer-header,.content-drawer-container .content-drawer-content,.content-drawer-container .content-drawer-content-inner,.content-drawer-container .content-drawer-content-inner-inner{position:relative;width:100%;padding:1em 1em 1em 1.5em;box-sizing:border-box}.content-drawer-container .content-drawer-content-inner-inner{padding:0em 1em 1em 1.5em}.content-drawer-container .content-drawer-header{cursor:pointer;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;flex-wrap:nowrap}.content-drawer-container icon-element.content-drawer-header-icon{position:absolute;-webkit-transform:translateZ(0) translateX(-0.4em) translateY(0em) rotate(0deg);transform:translateZ(0) translateX(-0.4em) translateY(0em) rotate(0deg);left:0;-webkit-transition:-webkit-transform 0.2s ease-in-out;transition:-webkit-transform 0.2s ease-in-out;transition:transform 0.2s ease-in-out;transition:transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out}.content-drawer-container .content-drawer-content{overflow:hidden;padding:0em}.content-drawer-container .content-drawer-content-inner{padding:1px}\n", ""]);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(content-drawer){display:block;width:100%;position:relative;height:auto;left:0%;top:0px}content-drawer{display:block;width:100%;position:relative;height:auto;left:0%;top:0px}\n", ""]);


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = "<div class=content-drawer-container> <div class=content-drawer-header> <icon-element class=content-drawer-header-icon size=1.38em></icon-element> <slot name=header></slot> <effect-underline start=none opacity=1 speed=700></effect-underline> </div> <div class=content-drawer-content> <div class=content-drawer-content-inner> <div class=content-drawer-content-inner-inner> <slot name=content></slot> </div> </div> </div> <effect-scale start=click></effect-scale> </div> ";

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(content-transition){display:block;width:100%;position:relative}:host(content-transition).flex-stretch{-webkit-box-flex:1;flex-grow:1;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}content-transition{display:block;width:100%;position:relative}content-transition.flex-stretch{-webkit-box-flex:1;flex-grow:1;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}\n", ""]);


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = "<div class=content-transition-container> <div class=content-transition-inner> <div class=next-slot> <slot name=next></slot> </div> <div class=current-slot> <slot current=true name=current></slot> </div> <div class=hidden-slot> <div class=hidden-slot-inner> <slot name=hidden></slot> </div> </div> </div> </div> ";

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(cookie-message){font:inherit;line-height:inherit;position:fixed;width:100%;height:100%;top:0;left:0;pointer-events:none;z-index:99999999999;display:-webkit-box;display:flex;-webkit-box-align:end;align-items:flex-end;outline:none !important}cookie-message{font:inherit;line-height:inherit;position:fixed;width:100%;height:100%;top:0;left:0;pointer-events:none;z-index:99999999999;display:-webkit-box;display:flex;-webkit-box-align:end;align-items:flex-end;outline:none !important}.cookie-message-container{position:relative;width:90%;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;margin:1em auto;opacity:0;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out}.cookie-message-container button-element{white-space:nowrap}.cookie-message-container.shown{pointer-events:all;opacity:1}.cookie-message-inner{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;padding:0.5em;margin:0 -1em;background-color:#333;color:#fff;border-radius:2px;box-shadow:inset 0px -2px 0px rgba(0,0,0,0.13),inset 0px 0px 0px 1px rgba(0,0,0,0.25)}.cookie-message-inner>*{margin:0 1em}.cookie-message-text{-webkit-box-flex:1;flex-grow:1}\n", ""]);


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = "<div class=cookie-message-container> <div class=cookie-message-inner> <div class=cookie-message-text></div> <button-element class=cookie-message-button></button-element> </div> </div> ";

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".drop-down-container{display:-webkit-box;display:flex;flex-wrap:nowrap;-webkit-box-align:center;align-items:center;width:100%;position:relative;cursor:pointer;outline:none !important}.drop-down-container.opened overlay-content{z-index:4}.drop-down-container .drop-down-heading{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;flex-wrap:nowrap}.drop-down-container .drop-down-arrow{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;margin:0 0.25em 0 -0.5em}.drop-down-container .drop-down-arrow svg{fill:currentColor}.drop-down-container .drop-down-label{position:relative;display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;opacity:1;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out}.drop-down-container .drop-down-label:after{position:relative;display:inline-block;content:\"\\00a0\"}.drop-down-option{padding:0.5em 1em;color:inherit;background-color:#fafafa;outline:none !important}\n", ""]);


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(drop-down){outline:none !important;display:inline-block;position:relative}drop-down{outline:none !important;display:inline-block;position:relative}\n", ""]);


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = "<div class=drop-down-container> <div class=drop-down-heading> <div class=drop-down-label> <slot name=label></slot> </div> <div class=drop-down-arrow> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox=\"0 0 24 24\"> <path d=\"M7 10l5 5 5-5z\"/></svg> </div> </div> <overlay-content align=\"center bottom\" class=drop-down-overlay> <slot name=option></slot> </overlay-content> <slot name=nonitem></slot> </div> ";

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = "<div class=effect-push-container></div> ";

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(effect-fade){pointer-events:none;box-sizing:border-box}effect-fade,.effect-fade-container,.effect-fade-container *{pointer-events:none;box-sizing:border-box;outline:none !important}\n", ""]);


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = "<div class=effect-fade-container></div> ";

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".effect-ripple-container,.effect-ripple-container *{pointer-events:none;box-sizing:border-box}.effect-ripple-container{overflow:hidden}.effect-ripple-container .ripple{position:absolute;top:0px;left:0px;height:100%;width:100%;max-width:100%;pointer-events:none;overflow:hidden;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}.effect-ripple-container .ripple-inner{display:none;height:0%;padding:50% 0px;width:100%;background:#59a2d8;border-radius:50%;-webkit-transform:perspective(1px) translateZ(0) scaleX(0) scaley(0);transform:perspective(1px) translateZ(0) scaleX(0) scaley(0);-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-backface-visibility:hidden;backface-visibility:hidden;position:absolute}.effect-ripple-container .ripple-inner:nth-child(1){display:block}\n", ""]);


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = "<div class=effect-ripple-container> <span class=ripple></span> </div> ";

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(effect-scale){pointer-events:none;box-sizing:border-box}effect-scale,.effect-scale-container,.effect-scale-container *{pointer-events:none;box-sizing:border-box}\n", ""]);


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = "<div class=effect-scale-container></div> ";

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(effect-underline){pointer-events:none;box-sizing:border-box}effect-underline,.effect-underline-container,.effect-underline-container *{pointer-events:none;box-sizing:border-box}.effect-underline-container .underline{position:absolute;top:calc(100% - 2px);left:0px;height:2px;width:100%;background:#59a2d8;opacity:0;pointer-events:none;display:block;-webkit-transform:perspective(1px) translateZ(0) scaleX(0);transform:perspective(1px) translateZ(0) scaleX(0);-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-backface-visibility:hidden;backface-visibility:hidden}\n", ""]);


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = "<div class=effect-underline-container> <span class=underline></span> </div> ";

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(grid-layout){display:block;opacity:0;-webkit-transition:opacity 0.15s linear 0.15s;transition:opacity 0.15s linear 0.15s}:host(grid-layout)[viewable=\"true\"]{opacity:1}grid-layout{display:block;opacity:0;-webkit-transition:opacity 0.15s linear 0.15s;transition:opacity 0.15s linear 0.15s}grid-layout[viewable=\"true\"]{opacity:1}\n", ""]);


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = "<div class=grid-layout-container> <div class=grid-layout-items></div> </div> ";

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(horizontal-slider){display:-webkit-box;display:flex;width:100%;height:100%;pointer-events:none;overflow:hidden;position:relative;padding:0 0 2.5em;box-sizing:border-box}horizontal-slider{display:-webkit-box;display:flex;width:100%;height:100%;pointer-events:none;overflow:hidden;position:relative;padding:0 0 2.5em;box-sizing:border-box}.horizontal-slider-container{width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-align:start;align-items:flex-start;flex-wrap:nowrap;padding:0;box-sizing:border-box;pointer-events:all;opacity:0;-webkit-transition:opacity 0.2s;transition:opacity 0.2s}.horizontal-slider-container.isready{opacity:1}.horizontal-slider-container.isready .horizontal-slider-items{-webkit-transition:-webkit-transform 0.4s;transition:-webkit-transform 0.4s;transition:transform 0.4s;transition:transform 0.4s, -webkit-transform 0.4s}.horizontal-slider-container.has-chicklets .horizontal-slider-inner{height:calc(100% - 2em)}.horizontal-slider-inner{display:-webkit-box;display:flex;height:100%;-webkit-box-flex:1;flex-grow:1;position:relative;overflow:visible;background:rgba(0,0,0,0.62)}.horizontal-slider-items{display:-webkit-box;display:flex;width:auto;height:100%;-webkit-box-align:center;align-items:center;-webkit-box-pack:start;justify-content:flex-start;flex-wrap:nowrap;position:absolute;touch-action:pan-y;-webkit-perspective:1px;perspective:1px;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden;outline:1px solid transparent}.horizontal-slider-item{display:inline-block;height:100%;max-height:100%;width:auto;cursor:pointer;position:relative;z-index:1;pointer-events:all;-webkit-transition:opacity 0.5s ease-in-out;transition:opacity 0.5s ease-in-out}.horizontal-slider-item:before{content:\"\";position:absolute;top:0;bottom:0;width:100%;height:100%;opacity:0;box-shadow:0 5px 25px 0px rgba(0,0,0,0.18),0 12px 12px -10px rgba(0,0,0,0.48);-webkit-transition:opacity 0.5s linear 0.3s;transition:opacity 0.5s linear 0.3s}.horizontal-slider-item:hover,.horizontal-slider-item.active-horizontal-slider-item{z-index:2}.horizontal-slider-item:hover:before,.horizontal-slider-item.active-horizontal-slider-item:before{opacity:1;-webkit-transition:opacity 0.5s;transition:opacity 0.5s}.horizontal-slider-item>*{position:relative}.horizontal-slider-item img{-webkit-perspective:1px;perspective:1px;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden;outline:1px solid transparent}.horizontal-slider-item.not-visible-item{opacity:0;pointer-events:none}.horizontal-slider-next,.horizontal-slider-previous{width:2em;min-width:2em;height:100%;display:none;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;flex-basis:0;pointer-events:all;position:relative;z-index:2;background:transparent;cursor:pointer;color:inherit;opacity:0.7;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transition:opacity 0.2s;transition:opacity 0.2s}.horizontal-slider-next:hover,.horizontal-slider-previous:hover{opacity:1}.horizontal-slider-next .horizontal-slider-default-arrow,.horizontal-slider-previous .horizontal-slider-default-arrow{fill:currentColor;stroke:currentColor;stroke-width:0.5px;border-radius:50%;background-color:rgba(0,0,0,0.37);padding:0.25em;display:block;width:2em;height:2em;box-sizing:border-box;box-shadow:inset 0 0 0 1px rgba(0,0,0,0.2)}.horizontal-slider-next.show-horizontal-slider-arrows,.horizontal-slider-previous.show-horizontal-slider-arrows{display:-webkit-box;display:flex}.horizontal-slider-chicklets{position:absolute;width:100%;bottom:5px;left:0;pointer-events:none;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;margin:0 -0.25em;flex-wrap:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.horizontal-slider-chicklets .horizontal-slider-chicklet{width:0.8em;min-width:0.8em;max-width:0.8em;height:0.8em;min-height:0.8em;max-height:0.8em;background-color:rgba(129,133,138,0.49);position:relative;border-radius:50%;pointer-events:all;margin:0 0.25em;cursor:pointer;box-shadow:inset 0 1px 0 0 rgba(0,0,0,0.25),0 1px 0 0 rgba(255,255,255,0.25)}.horizontal-slider-chicklets .horizontal-slider-chicklet:after{content:\"\";width:100%;height:100%;position:absolute;top:0;left:0;background-color:#59a2d8;box-shadow:inset 0 0 0 1px rgba(0,0,0,0.15);opacity:0;border-radius:50%;pointer-events:none;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out}.horizontal-slider-chicklets .horizontal-slider-chicklet:hover:after,.horizontal-slider-chicklets .horizontal-slider-chicklet.active:after{opacity:1}\n", ""]);


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = "<div class=horizontal-slider-container> <div class=horizontal-slider-chicklets></div> <div class=horizontal-slider-previous> <slot name=previous-button> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox=\"0 0 24 24\" class=horizontal-slider-default-arrow> <path d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"/></svg> </slot> </div> <div class=horizontal-slider-inner> <div class=horizontal-slider-items> <slot></slot> </div> </div> <div class=horizontal-slider-next> <slot name=next-button> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox=\"0 0 24 24\" class=horizontal-slider-default-arrow> <path d=\"M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z\"/></svg> </slot> </div> </div> ";

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(icon-element){display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:start;justify-content:flex-start}icon-element{display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:start;justify-content:flex-start}.icon-element-container{display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:start;justify-content:flex-start}.icon-element-container .svg-container{display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:start;justify-content:flex-start}.icon-element-container svg{width:100%;height:100%;fill:currentColor}\n", ""]);


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = "<div class=icon-element-container> <div class=svg-container></div> </div> ";

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".image-loader-container{position:relative;width:0%;height:0%}.image-loader-container spinner-element{top:0;left:0}.image-loader-container.animate{-webkit-transition:width 0.2s, height 0.2s;transition:width 0.2s, height 0.2s}.image-loader-container.notready spinner-element{opacity:0}.image-loader-container.fill.show-text[loaded=\"false\"],.image-loader-container.fill[loaded=\"true\"],.image-loader-container.fill[loaded=\"true\"]>img{width:100%;height:100%}.image-loader-container.fill[loaded=\"true\"][fit=\"width\"]>img{width:100%;height:auto}.image-loader-container.errored,.image-loader-container.errored>img{width:auto;height:auto}.image-loader-container,.image-loader-container>img{display:inline-block}.image-loader-container .image-loader-text{display:none}.image-loader-container.show-text .image-loader-text{display:inline-block}.image-loader-container.show-text>img{display:none}.image-loader-container>img{-o-object-fit:contain;object-fit:contain;display:block;opacity:1;-webkit-transition:opacity 0.3s;transition:opacity 0.3s}.image-loader-container.loading>img{opacity:0}\n", ""]);


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(image-loader){display:inline-block;outline:none !important}image-loader{display:inline-block;outline:none !important}image-loader[fit]{width:100%;height:100%}image-loader[fit][error=\"true\"]{width:auto;height:auto}\n", ""]);


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = "<div class=\"image-loader-container notready\" style=opacity:0> <img class=image-loader-image> <div class=image-loader-text></div> <spinner-element scrim=true page=false type=circle visible=false style=opacity:0></spinner-element> <style type=text/css rel=stylesheet style=display:none class=internalStyles></style> </div> ";

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".input-field-container{display:inline-block;width:100%;max-width:100%;vertical-align:top;opacity:1;pointer-events:all;position:relative}.input-field-container *{box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.input-field-container .input-field-container-inner{position:relative;padding:1em 0em;min-height:1em;opacity:0;pointer-events:none;max-width:100%;transition:opacity 0.2s ease-in-out 0.01s}.input-field-container .input-field-container-inner.ready{opacity:1;pointer-events:all}.input-field-container .input-field-container-inner[label-position=\"inside\"]{padding:0 0 1.3em}.input-field-container .input-field-container-inner[label-position=\"left\"] .input-field-bottom-content{justify-content:flex-end;text-align:right}.input-field-container .input-field-container-inner[label-position=\"right\"] .input-field-bottom-content{justify-content:flex-start}.input-field-container .input-field-container-inner.invalid[label-position=\"inside\"]{padding:0}.input-field-container .input-field-container-inner.invalid .input-field-message-help{opacity:0;font-size:0%;transform:scale(0)}.input-field-container .input-field-container-inner.invalid .input-field-message-error{opacity:1;font-size:90%;transform:scale(1)}.input-field-container .input-field-container-inner.invalid .input-field-border{box-shadow:inset 0px 0px 0px 1px #a10005}.input-field-container .input-field-container-inner.icon .input-field-icon{pointer-events:all;cursor:pointer}.input-field-container .input-field-container-inner.clearbutton .input-field-clear{opacity:1;pointer-events:all;cursor:pointer;display:flex}.input-field-container .input-field-container-inner.icon[icon-align=\"right\"] .input-field-input,.input-field-container .input-field-container-inner.clearbutton .input-field-input{padding-right:2.2em}.input-field-container .input-field-container-inner.icon[icon-align=\"left\"] .input-field-input{padding-left:2.2em}.input-field-container .input-field-container-inner.icon.clearbutton .input-field-input{padding-left:2.2em;padding-right:2.2em}.input-field-container .input-field-container-inner.icon[icon-align=\"right\"] .input-field-input-overlay{justify-content:flex-end}.input-field-container .input-field-container-inner.icon.clearbutton[icon-align=\"right\"] .input-field-input-overlay{justify-content:space-between}.input-field-container .input-field-bottom-content{display:flex;align-items:center;justify-content:space-between;font-size:90%;padding:0.1em}.input-field-container .input-field-message-help{opacity:0.6;line-height:1.6em;font-size:90%;transform:scale(1);transition:opacity 0.2s ease-in-out, transform 0.2s ease-in-out}.input-field-container .input-field-message-error{opacity:0;line-height:1.6em;transform:scale(0);font-size:0%;color:#a10005;transition:opacity 0.2s ease-in-out 0.1s, transform 0.2s ease-in-out}.input-field-container icon-element{align-items:center;justify-content:center;display:flex}.input-field-container .input-field-clear{display:none}.input-field-container .input-field-middle-section{display:flex;flex-wrap:nowrap;width:100%;align-items:center;position:relative}.input-field-container .input-field-input-section{width:100%;max-width:100%;position:relative;flex-grow:1;flex-basis:0}.input-field-container .input-field-input-container{position:relative}.input-field-container .input-field-border{position:absolute;width:100%;height:100%;top:0;left:0;border-radius:2px;pointer-events:none;box-shadow:inset 0px 0px 0px 1px;color:inherit;transition:box-shadow 0.4s}.input-field-container .input-field-input-overlay{position:absolute;width:100%;height:100%;top:0px;left:0px;pointer-events:none;display:flex;align-items:center;justify-content:space-between;padding:0em 0.5em}.input-field-container .input-field-container-inner[input-kind=\"checkbox\"],.input-field-container .input-field-container-inner[input-kind=\"radio\"]{min-height:5.25em;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center}.input-field-container .input-field-container-inner[input-kind=\"checkbox\"] .input-field-input-container-inner,.input-field-container .input-field-container-inner[input-kind=\"radio\"] .input-field-input-container-inner{width:1.7em;height:1.7em;left:-0.25em;top:-0.17em;position:relative;margin-right:-0.5em;margin-bottom:-0.25em;cursor:pointer;pointer-events:all}.input-field-container .input-field-container-inner[input-kind=\"checkbox\"] .input-field-border,.input-field-container .input-field-container-inner[input-kind=\"radio\"] .input-field-border{box-shadow:none}.input-field-container .input-field-container-inner[input-kind=\"checkbox\"] effect-underline,.input-field-container .input-field-container-inner[input-kind=\"radio\"] effect-underline{display:none}.input-field-container .input-field-container-inner[input-kind=\"checkbox\"] .input-field-middle-section,.input-field-container .input-field-container-inner[input-kind=\"checkbox\"] .input-field-input-section,.input-field-container .input-field-container-inner[input-kind=\"radio\"] .input-field-middle-section,.input-field-container .input-field-container-inner[input-kind=\"radio\"] .input-field-input-section{width:auto;-webkit-box-flex:0;flex-grow:0}.input-field-container .input-field-container-inner[input-kind=\"checkbox\"] .input-field-middle-section,.input-field-container .input-field-container-inner[input-kind=\"radio\"] .input-field-middle-section{-webkit-box-align:start;align-items:flex-start}.input-field-container .input-field-container-inner[input-kind=\"checkbox\"] .input-field-input-container-inner:after{content:\"\";display:block;position:absolute;top:0.24em;left:0.24em;width:1.2em;height:1.2em;pointer-events:none;background:rgba(255,255,255,0.4);box-shadow:inset 0px 0px 0px 1px;-webkit-transition:background-color .4s, box-shadow .4s;transition:background-color .4s, box-shadow .4s}.input-field-container .input-field-container-inner[input-kind=\"checkbox\"].checked .input-field-input-container-inner:after{background:currentColor}.input-field-container .input-field-container-inner[input-kind=\"radio\"] .input-field-input-overlay{border-radius:50%}.input-field-container .input-field-container-inner[input-kind=\"radio\"] .input-field-input-container-inner:before{content:\"\";display:block;position:absolute;top:0.235em;left:0.235em;width:1.2em;height:1.2em;pointer-events:none;background:rgba(255,255,255,0.4);border-radius:50%;box-shadow:inset 0px 0px 0px 1px;-webkit-transition:background-color .4s, box-shadow .4s;transition:background-color .4s, box-shadow .4s}.input-field-container .input-field-container-inner[input-kind=\"radio\"].checked .input-field-input-container-inner:before{background:currentColor}.input-field-container .input-field-container-inner[input-kind=\"radio\"].checked .input-field-input-container-inner:after{content:\"\\00b7\";color:#fff;display:-webkit-box;display:flex;position:absolute;pointer-events:none;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;font-size:2.3em;top:0;left:0;width:100%;height:100%;line-height:2.3em}.input-field-container .input-field-container-inner.notempty.checked[input-kind=\"checkbox\"] .input-field-checkbox-overlay{opacity:1}.input-field-container .input-field-checkbox-overlay{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;position:absolute;width:1.2em;height:1.2em;top:0px;left:0px;pointer-events:none;color:#fff;opacity:0;margin-left:0.009em;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out}.input-field-container .input-field-input-container{position:relative;left:-50%}\n", ""]);


/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = "<div class=input-field-container> <div class=input-field-container-inner> <div class=input-field-top-section> <div class=input-field-label-top> <slot name=label-top></slot> </div> </div> <div class=input-field-middle-section> <div class=input-field-label-left> <slot name=label-left></slot> </div> <div class=input-field-input-section> <div class=input-field-label-inside> <slot name=label-inside></slot> </div> <div class=input-field-input-container> <div class=input-field-input-container-inner> <slot name=input></slot> </div> <div class=input-field-input-overlay> <div class=input-field-checkbox-overlay> <icon-element class=input-field-checkbox-icon size=0.7em></icon-element> </div> </div> <div class=input-field-border></div> </div> </div> <div class=input-field-label-right> <slot name=label-right></slot> </div> </div> <div class=input-field-bottom-section> <div class=input-field-label-bottom> <slot name=label-bottom></slot> </div> <div class=input-field-bottom-content> <div class=input-field-messages> <div class=input-field-message-help></div> <div class=input-field-message-error></div> </div> </div> </div> </div> </div> ";

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".input-field-container{display:inline-block;width:100%;max-width:100%;vertical-align:top;opacity:1;pointer-events:all;position:relative}.input-field-container *{box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.input-field-container .input-field-container-inner{position:relative;padding:1em 0em;min-height:1em;opacity:0;pointer-events:none;max-width:100%;transition:opacity 0.2s ease-in-out 0.01s}.input-field-container .input-field-container-inner.ready{opacity:1;pointer-events:all}.input-field-container .input-field-container-inner[label-position=\"inside\"]{padding:0 0 1.3em}.input-field-container .input-field-container-inner[label-position=\"left\"] .input-field-bottom-content{justify-content:flex-end;text-align:right}.input-field-container .input-field-container-inner[label-position=\"right\"] .input-field-bottom-content{justify-content:flex-start}.input-field-container .input-field-container-inner.invalid[label-position=\"inside\"]{padding:0}.input-field-container .input-field-container-inner.invalid .input-field-message-help{opacity:0;font-size:0%;transform:scale(0)}.input-field-container .input-field-container-inner.invalid .input-field-message-error{opacity:1;font-size:90%;transform:scale(1)}.input-field-container .input-field-container-inner.invalid .input-field-border{box-shadow:inset 0px 0px 0px 1px #a10005}.input-field-container .input-field-container-inner.icon .input-field-icon{pointer-events:all;cursor:pointer}.input-field-container .input-field-container-inner.clearbutton .input-field-clear{opacity:1;pointer-events:all;cursor:pointer;display:flex}.input-field-container .input-field-container-inner.icon[icon-align=\"right\"] .input-field-input,.input-field-container .input-field-container-inner.clearbutton .input-field-input{padding-right:2.2em}.input-field-container .input-field-container-inner.icon[icon-align=\"left\"] .input-field-input{padding-left:2.2em}.input-field-container .input-field-container-inner.icon.clearbutton .input-field-input{padding-left:2.2em;padding-right:2.2em}.input-field-container .input-field-container-inner.icon[icon-align=\"right\"] .input-field-input-overlay{justify-content:flex-end}.input-field-container .input-field-container-inner.icon.clearbutton[icon-align=\"right\"] .input-field-input-overlay{justify-content:space-between}.input-field-container .input-field-bottom-content{display:flex;align-items:center;justify-content:space-between;font-size:90%;padding:0.1em}.input-field-container .input-field-message-help{opacity:0.6;line-height:1.6em;font-size:90%;transform:scale(1);transition:opacity 0.2s ease-in-out, transform 0.2s ease-in-out}.input-field-container .input-field-message-error{opacity:0;line-height:1.6em;transform:scale(0);font-size:0%;color:#a10005;transition:opacity 0.2s ease-in-out 0.1s, transform 0.2s ease-in-out}.input-field-container icon-element{align-items:center;justify-content:center;display:flex}.input-field-container .input-field-clear{display:none}.input-field-container .input-field-middle-section{display:flex;flex-wrap:nowrap;width:100%;align-items:center;position:relative}.input-field-container .input-field-input-section{width:100%;max-width:100%;position:relative;flex-grow:1;flex-basis:0}.input-field-container .input-field-input-container{position:relative}.input-field-container .input-field-border{position:absolute;width:100%;height:100%;top:0;left:0;border-radius:2px;pointer-events:none;box-shadow:inset 0px 0px 0px 1px;color:inherit;transition:box-shadow 0.4s}.input-field-container .input-field-input-overlay{position:absolute;width:100%;height:100%;top:0px;left:0px;pointer-events:none;display:flex;align-items:center;justify-content:space-between;padding:0em 0.5em}.input-field-container .input-field-container-inner[input-kind=\"textarea\"] .input-field-input-overlay{padding-top:0.85em;-webkit-box-align:start;align-items:flex-start}.input-field-container .input-field-container-inner.max .input-field-character-count-max-divider,.input-field-container .input-field-container-inner.max .input-field-character-count-max,.input-field-container .input-field-container-inner.maxlength .input-field-character-count-max-divider,.input-field-container .input-field-container-inner.maxlength .input-field-character-count-max{display:block}.input-field-container .input-field-container-inner.showcount .input-field-character-count-container{display:block}.input-field-container .input-field-character-count-inner{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:end;justify-content:flex-end;opacity:0.6;padding:0em 0em 0em 1em}.input-field-container .input-field-character-count-container,.input-field-container .input-field-character-count-max-divider,.input-field-container .input-field-character-count-max{display:none}\n", ""]);


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = "<div class=input-field-container> <div class=input-field-container-inner> <div class=input-field-top-section> <div class=input-field-label-top> <slot name=label-top></slot> </div> </div> <div class=input-field-middle-section> <div class=input-field-label-left> <slot name=label-left></slot> </div> <div class=input-field-input-section> <div class=input-field-label-inside> <slot name=label-inside></slot> </div> <div class=input-field-input-container> <div class=input-field-input-container-inner> <slot name=input></slot> </div> <div class=input-field-input-overlay> <icon-element class=input-field-icon size=1.25em></icon-element> <icon-element class=input-field-clear size=1.25em></icon-element> </div> <div class=input-field-border></div> </div> </div> <div class=input-field-label-right> <slot name=label-right></slot> </div> </div> <div class=input-field-bottom-section> <div class=input-field-label-bottom> <slot name=label-bottom></slot> </div> <div class=input-field-bottom-content> <div class=input-field-messages> <div class=input-field-message-help></div> <div class=input-field-message-error></div> </div> <div class=input-field-character-count-container> <div class=input-field-character-count-inner> <div class=input-field-character-count></div> <div class=input-field-character-count-max-divider>/</div> <div class=input-field-character-count-max></div> </div> </div> </div> </div> </div> </div> ";

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".input-field-container{display:inline-block;width:100%;max-width:100%;vertical-align:top;opacity:1;pointer-events:all;position:relative}.input-field-container *{box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.input-field-container .input-field-container-inner{position:relative;padding:1em 0em;min-height:1em;opacity:0;pointer-events:none;max-width:100%;transition:opacity 0.2s ease-in-out 0.01s}.input-field-container .input-field-container-inner.ready{opacity:1;pointer-events:all}.input-field-container .input-field-container-inner[label-position=\"inside\"]{padding:0 0 1.3em}.input-field-container .input-field-container-inner[label-position=\"left\"] .input-field-bottom-content{justify-content:flex-end;text-align:right}.input-field-container .input-field-container-inner[label-position=\"right\"] .input-field-bottom-content{justify-content:flex-start}.input-field-container .input-field-container-inner.invalid[label-position=\"inside\"]{padding:0}.input-field-container .input-field-container-inner.invalid .input-field-message-help{opacity:0;font-size:0%;transform:scale(0)}.input-field-container .input-field-container-inner.invalid .input-field-message-error{opacity:1;font-size:90%;transform:scale(1)}.input-field-container .input-field-container-inner.invalid .input-field-border{box-shadow:inset 0px 0px 0px 1px #a10005}.input-field-container .input-field-container-inner.icon .input-field-icon{pointer-events:all;cursor:pointer}.input-field-container .input-field-container-inner.clearbutton .input-field-clear{opacity:1;pointer-events:all;cursor:pointer;display:flex}.input-field-container .input-field-container-inner.icon[icon-align=\"right\"] .input-field-input,.input-field-container .input-field-container-inner.clearbutton .input-field-input{padding-right:2.2em}.input-field-container .input-field-container-inner.icon[icon-align=\"left\"] .input-field-input{padding-left:2.2em}.input-field-container .input-field-container-inner.icon.clearbutton .input-field-input{padding-left:2.2em;padding-right:2.2em}.input-field-container .input-field-container-inner.icon[icon-align=\"right\"] .input-field-input-overlay{justify-content:flex-end}.input-field-container .input-field-container-inner.icon.clearbutton[icon-align=\"right\"] .input-field-input-overlay{justify-content:space-between}.input-field-container .input-field-bottom-content{display:flex;align-items:center;justify-content:space-between;font-size:90%;padding:0.1em}.input-field-container .input-field-message-help{opacity:0.6;line-height:1.6em;font-size:90%;transform:scale(1);transition:opacity 0.2s ease-in-out, transform 0.2s ease-in-out}.input-field-container .input-field-message-error{opacity:0;line-height:1.6em;transform:scale(0);font-size:0%;color:#a10005;transition:opacity 0.2s ease-in-out 0.1s, transform 0.2s ease-in-out}.input-field-container icon-element{align-items:center;justify-content:center;display:flex}.input-field-container .input-field-clear{display:none}.input-field-container .input-field-middle-section{display:flex;flex-wrap:nowrap;width:100%;align-items:center;position:relative}.input-field-container .input-field-input-section{width:100%;max-width:100%;position:relative;flex-grow:1;flex-basis:0}.input-field-container .input-field-input-container{position:relative}.input-field-container .input-field-border{position:absolute;width:100%;height:100%;top:0;left:0;border-radius:2px;pointer-events:none;box-shadow:inset 0px 0px 0px 1px;color:inherit;transition:box-shadow 0.4s}.input-field-container .input-field-input-overlay{position:absolute;width:100%;height:100%;top:0px;left:0px;pointer-events:none;display:flex;align-items:center;justify-content:space-between;padding:0em 0.5em}.input-field-arrow{margin-right:-0.25em}\n", ""]);


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = "<div class=input-field-container> <div class=input-field-container-inner> <div class=input-field-top-section> <div class=input-field-label-top> <slot name=label-top></slot> </div> </div> <div class=input-field-middle-section> <div class=input-field-label-left> <slot name=label-left></slot> </div> <div class=input-field-input-section> <div class=input-field-label-inside> <slot name=label-inside></slot> </div> <div class=input-field-input-container> <div class=input-field-input-container-inner> <slot name=input></slot> </div> <div class=input-field-input-overlay> <icon-element class=input-field-icon size=1.25em></icon-element> <icon-element class=input-field-arrow size=1.5em></icon-element> </div> <div class=input-field-border></div> </div> </div> <div class=input-field-label-right> <slot name=label-right></slot> </div> </div> <div class=input-field-bottom-section> <div class=input-field-label-bottom> <slot name=label-bottom></slot> </div> <div class=input-field-bottom-content> <div class=input-field-messages> <div class=input-field-message-help></div> <div class=input-field-message-error></div> </div> </div> </div> </div> </div> ";

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".overlay-content-container{display:block;position:absolute;height:0px;width:0px;top:0px;left:0px;z-index:99999;overflow:visible;pointer-events:none}.overlay-content-container .overlay-content-container-inner{position:absolute;width:100%;height:100%;top:0px;left:0px;pointer-events:none;overflow:hidden;display:none}.overlay-content-container .overlay-content-content-container{max-height:80vh;max-width:80vw;overflow:auto;position:absolute;width:100%;-webkit-transform-origin:center center;transform-origin:center center;-webkit-transform:scale(1, 0);transform:scale(1, 0);pointer-events:none;opacity:0;display:-webkit-inline-box;display:inline-flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.overlay-content-container.active .overlay-content-container-inner{display:block}.overlay-content-container.active .overlay-content-content-container{pointer-events:all}.overlay-content-container.activating .overlay-content-container-inner{display:block}.overlay-content-container .overlay-content-content-inner{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:end;justify-content:flex-end;min-height:0}.overlay-content-container .overlay-content-content-inner.bottom{-webkit-box-pack:start;justify-content:flex-start}\n", ""]);


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(overlay-content){display:block;position:fixed;height:0px;width:0px;top:0px;left:0px;z-index:99999;overflow:visible;pointer-events:none;outline:none !important}overlay-content{display:block;position:fixed;height:0px;width:0px;top:0px;left:0px;z-index:99999;overflow:visible;pointer-events:none;outline:none !important}\n", ""]);


/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = "<div class=overlay-content-container> <div class=overlay-content-container-inner> <div class=overlay-content-content-container> <div class=overlay-content-content-inner> <slot></slot> </div> </div> </div> </div> ";

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".overlay-message-container{position:fixed;width:100%;height:100%;top:0;left:0;opacity:0;pointer-events:none;-webkit-transition:opacity 0.3s;transition:opacity 0.3s}.overlay-message-container .overlay-message-scrim{position:absolute;width:100%;height:100%;background:rgba(31,31,31,0.9);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.overlay-message-container .overlay-message-content-container{position:relative;top:50%;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;width:80%;max-width:600px;max-height:90vh;overflow:auto;margin:auto;border-radius:5px;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.25),0 2px 22px rgba(0,0,0,0.62);-webkit-transform:translateY(-50%);transform:translateY(-50%)}.overlay-message-container .overlay-message-content{padding:0.62em}.overlay-message-container .overlay-message-header{font-size:162%;text-transform:capitalize;font-weight:bold;padding:0.125em 0;box-sizing:border-box;position:relative;white-space:nowrap;-webkit-box-flex:1;flex-grow:1}.overlay-message-container .overlay-message-header:after{content:\"\";display:block;width:100%;box-shadow:0 1px 0 0;height:1px;opacity:0.25;margin-top:0.25em;margin-bottom:0.75em}.overlay-message-container .overlay-message-header:empty{display:none}.overlay-message-container .overlay-message-body{opacity:0.62}.overlay-message-container .overlay-message-buttons{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:end;justify-content:flex-end;width:calc(100% + 0.5em);margin-left:-0.25em;padding:1.5em 0 0;box-sizing:border-box;white-space:nowrap;-webkit-box-flex:1;flex-grow:1}.overlay-message-container .overlay-message-buttons ::slotted(*){margin:0 0.25em}.overlay-message-container.shown{pointer-events:all;z-index:99999999999999999}.overlay-message-container[colortheme=\"light\"] .overlay-message-content-container,.overlay-message-container[colortheme=\"dark\"] .overlay-message-content-container{text-shadow:none;padding:1.5em;box-sizing:border-box;box-shadow:0 10px 10px -5px rgba(0,0,0,0.38)}.overlay-message-container[colortheme=\"light\"] .overlay-message-content-container{background:#fafafa;color:#333}.overlay-message-container[colortheme=\"dark\"] .overlay-message-content-container{background:#1f1f1f;color:#e2e2e2}\n", ""]);


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = "<div class=overlay-message-container> <div class=overlay-message-scrim></div> <div class=overlay-message-content-container> <div class=overlay-message-header> <slot name=header></slot> </div> <div class=overlay-message-body> <slot name=body></slot> </div> <div class=overlay-message-buttons> <slot name=button></slot> </div> </div> </div> ";

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, "@-webkit-keyframes indeterminate{0%{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(0%) scale(0, 1);transform:translateX(0%) scale(0, 1)}100%{-webkit-transform-origin:50% 0;transform-origin:50% 0;-webkit-transform:translateX(100%) scale(0.8, 1);transform:translateX(100%) scale(0.8, 1)}}@keyframes indeterminate{0%{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translateX(0%) scale(0, 1);transform:translateX(0%) scale(0, 1)}100%{-webkit-transform-origin:50% 0;transform-origin:50% 0;-webkit-transform:translateX(100%) scale(0.8, 1);transform:translateX(100%) scale(0.8, 1)}}.progress-bar-container{width:100%;height:100%;opacity:0;pointer-events:none;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;-webkit-transition:opacity 0.3s;transition:opacity 0.3s}.progress-bar-container.overlay{position:fixed;top:0;left:0}.progress-bar-container.overlay .progress-bar-inner{width:90%}.progress-bar-container.overlay .progress-bar-heading{width:90%;left:0;-webkit-box-pack:center;justify-content:center}.progress-bar-container.overlay .progress-bar-bottom-container{width:90%;-webkit-box-align:center;align-items:center}.progress-bar-container.visible{opacity:1;pointer-events:all}.progress-bar-container.percentage .progress-bar-percentage{display:block}.progress-bar-container:not(.scrim){background-color:transparent}.progress-bar-container:not(.track) .progress-bar-track:before{background-color:transparent}.progress-bar-container[animation=\"indeterminate\"] .progress-bar-top,.progress-bar-container[animation=\"indeterminate\"] .progress-bar-bottom{width:100% !important;-webkit-transform-origin:0 0;transform-origin:0 0}.progress-bar-container[animation=\"indeterminate\"].visible .progress-bar-top{-webkit-animation-name:indeterminate;animation-name:indeterminate;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-timing-function:cubic-bezier(0.445, 0.05, 0.55, 0.95);animation-timing-function:cubic-bezier(0.445, 0.05, 0.55, 0.95)}.progress-bar-container[animation=\"indeterminate\"].visible .progress-bar-bottom{opacity:1;-webkit-animation-name:indeterminate;animation-name:indeterminate;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-timing-function:cubic-bezier(0.445, 0.05, 0.55, 0.95);animation-timing-function:cubic-bezier(0.445, 0.05, 0.55, 0.95);-webkit-animation-delay:1.382s;animation-delay:1.382s}.progress-bar-heading{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:start;justify-content:flex-start;position:relative;left:-0.25em;width:calc(100% + 0.5em);font-size:1.25em}.progress-bar-heading>*{margin:0 0.5em;padding:1em 0}.progress-bar-heading:empty{display:none}.progress-bar-header:empty{display:none}.progress-bar-percentage{display:none}.progress-bar-inner{width:100%;position:relative;height:3px;overflow:hidden}.progress-bar-track{width:100%;height:100%}.progress-bar-track:before{content:'';position:absolute;width:100%;height:100%;top:0;left:0;opacity:0.33;background:currentColor}.progress-bar-bottom,.progress-bar-top{position:absolute;width:0;height:100%;top:0;left:0;background-color:currentColor;-webkit-transition:width 0.2s linear;transition:width 0.2s linear}.progress-bar-bottom{opacity:0.33}.progress-bar-cancel{display:none}.progress-bar-cancel.show{display:block}.progress-bar-bottom-container{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:start;align-items:flex-start;width:100%}.progress-bar-text{padding:1em 0}.progress-bar-text:empty{display:none}\n", ""]);


/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = "<div class=progress-bar-container> <div class=progress-bar-heading> <div class=progress-bar-header></div> <div class=progress-bar-percentage></div> </div> <div class=progress-bar-inner> <div class=progress-bar-track> <div class=progress-bar-track-inner> <div class=progress-bar-bottom></div> <div class=progress-bar-top></div> </div> </div> </div> <div class=progress-bar-bottom-container> <div class=progress-bar-text></div> <button-element class=progress-bar-button></button-element> </div> </div> ";

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".snack-bar-container{pointer-events:none;opacity:0;position:fixed;left:0;width:100%;z-index:10;box-sizing:border-box;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out}.snack-bar-container[align=\"none\"]{top:unset;left:unset;position:relative}.snack-bar-container[align=\"top\"]{top:4em}.snack-bar-container[align=\"bottom\"]{bottom:2em}.snack-bar-container.shown{pointer-events:all;opacity:1}.snack-bar-container .snack-bar-inner{width:90%;max-width:600px;background-color:#fff;box-shadow:0 7px 10px -5px rgba(0,0,0,0.61);margin:0 auto;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;flex-wrap:nowrap;-webkit-box-flex:0;flex:0 1 auto}.snack-bar-container .snack-bar-inner [slot=\"body\"]{padding:1em;box-sizing:border-box;-webkit-box-align:center;align-items:center;display:block;width:100%;word-break:break-word}.snack-bar-container .snack-bar-inner ::slotted(*){padding:1em;box-sizing:border-box;-webkit-box-align:center;align-items:center;display:block;width:100%;word-break:break-word}.snack-bar-container .snack-bar-text{-webkit-box-flex:1;flex-grow:1;width:calc(100% - 7.5em)}.snack-bar-container .snack-bar-text .snack-bar-text-inner{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;width:100%;-webkit-box-flex:0;flex:0 1 auto}.snack-bar-container .snack-bar-text,.snack-bar-container .snack-bar-icon,.snack-bar-container .snack-bar-close,.snack-bar-container .snack-bar-type-bar{display:-webkit-box;display:flex;align-self:stretch;-webkit-box-flex:0;flex:0 1 auto}.snack-bar-container .snack-bar-type-bar{width:3px;min-width:3px;display:none}.snack-bar-container .snack-bar-close{width:4em;-ms-flex-preferred-size:4em}.snack-bar-container .snack-bar-close .snack-bar-close-inner{padding:1em;box-sizing:border-box;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.snack-bar-container .snack-bar-icon{width:3.5em;-ms-flex-preferred-size:3.5em;color:#fff;background-image:linear-gradient(-75deg, rgba(0,0,0,0.125), transparent 36%)}.snack-bar-container .snack-bar-icon .snack-bar-icon-inner{width:100%;padding:1em;box-sizing:border-box;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}.snack-bar-container .infoicon,.snack-bar-container .successicon,.snack-bar-container .warningicon,.snack-bar-container .erroricon{display:none;box-sizing:border-box;-webkit-box-align:center;align-items:center}.snack-bar-container[type=\"info\"] .infoicon{display:-webkit-box;display:flex}.snack-bar-container[type=\"info\"] .snack-bar-icon{background-color:#4fa8b8}.snack-bar-container[type=\"info\"] .snack-bar-type-bar{display:-webkit-box;display:flex;background-color:#4fa8b8}.snack-bar-container[type=\"error\"] .erroricon{display:-webkit-box;display:flex}.snack-bar-container[type=\"error\"] .snack-bar-icon{background-color:#ce0000}.snack-bar-container[type=\"error\"] .snack-bar-type-bar{display:-webkit-box;display:flex;background-color:#ce0000}.snack-bar-container[type=\"warning\"] .warningicon{display:-webkit-box;display:flex}.snack-bar-container[type=\"warning\"] .snack-bar-icon{background-color:#f1813a}.snack-bar-container[type=\"warning\"] .snack-bar-type-bar{display:-webkit-box;display:flex;background-color:#f1813a}.snack-bar-container[type=\"success\"] .successicon{display:-webkit-box;display:flex}.snack-bar-container[type=\"success\"] .snack-bar-icon{background-color:#5eb344}.snack-bar-container[type=\"success\"] .snack-bar-type-bar{display:-webkit-box;display:flex;background-color:#5eb344}.snack-bar-container.hide-close-btn .snack-bar-close{display:none}.snack-bar-container.hide-close-btn .snack-bar-text{width:calc(100% - 3.5em)}\n", ""]);


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, "snack-bar [slot=\"body\"]{padding:1em;box-sizing:border-box;-webkit-box-align:center;align-items:center;display:block;width:100%;word-break:break-word}snack-bar ::slotted(*){padding:1em;box-sizing:border-box;-webkit-box-align:center;align-items:center;display:block;width:100%;word-break:break-word}\n", ""]);


/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = "<div class=snack-bar-container> <div class=snack-bar-inner> <div class=snack-bar-icon> <div class=snack-bar-icon-inner> <icon-element size=1.5em class=infoicon></icon-element> <icon-element size=1.5em class=successicon></icon-element> <icon-element size=1.5em class=erroricon></icon-element> <icon-element size=1.5em class=warningicon></icon-element> </div> </div> <div class=snack-bar-text> <div class=snack-bar-text-inner> <slot name=body></slot> </div> </div> <div class=snack-bar-close> <div class=snack-bar-close-inner> <button-element class=\"snack-bar-default-button nomargin slim nobackground noshadow\"> <icon-element size=1.5em class=snack-bar-close-icon></icon-element> </button-element> </div> </div> <div class=snack-bar-type-bar></div> </div> </div> ";

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ".spinner-element-container{width:100%;height:100%;top:0;left:0;opacity:0;pointer-events:none;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;-webkit-transition:opacity 0.3s;transition:opacity 0.3s}.spinner-element-container.fullpage{position:fixed}.spinner-element-container.shown{opacity:1;pointer-events:all}.spinner-element-container.shown[type=\"column\"] .spin,.spinner-element-container.shown[type=\"column\"] .spin:before,.spinner-element-container.shown[type=\"column\"] .spin:after{background:currentColor;width:1em;height:4em;position:relative;box-shadow:0 0px;-webkit-animation:column 1s infinite ease-in-out;animation:column 1s infinite ease-in-out}.spinner-element-container.shown[type=\"column\"] .spin:before,.spinner-element-container.shown[type=\"column\"] .spin:after{content:\"\";position:absolute;top:0}.spinner-element-container.shown[type=\"column\"] .spin{-webkit-animation-delay:-0.16s;animation-delay:-0.16s}.spinner-element-container.shown[type=\"column\"] .spin:before{left:-1.38em;-webkit-animation-delay:-0.32s;animation-delay:-0.32s}.spinner-element-container.shown[type=\"column\"] .spin:after{left:1.38em}@-webkit-keyframes column{0%,80%,100%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}@keyframes column{0%,80%,100%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}.spinner-element-container.shown[type=\"circle\"] .spin,.spinner-element-container.shown[type=\"circle\"] .spin:after{border-radius:50%;box-sizing:content-box}.spinner-element-container.shown[type=\"circle\"] .spin{position:relative;border:0.5em solid transparent;border-top-color:inherit;width:4em;height:4em;-webkit-animation:circle 1s infinite linear;animation:circle 1s infinite linear}.spinner-element-container.shown[type=\"circle\"] .spin:after{content:\"\";position:absolute;border:0.5em solid currentColor;opacity:0.19;top:-0.5em;left:-0.5em;width:100%;height:100%}@-webkit-keyframes circle{0%{-webkit-transform:translateZ(0) rotate(0deg);transform:translateZ(0) rotate(0deg)}100%{-webkit-transform:translateZ(0) rotate(360deg);transform:translateZ(0) rotate(360deg)}}@keyframes circle{0%{-webkit-transform:translateZ(0) rotate(0deg);transform:translateZ(0) rotate(0deg)}100%{-webkit-transform:translateZ(0) rotate(360deg);transform:translateZ(0) rotate(360deg)}}.spinner-element-container.shown[type=\"ripple\"] .spin,.spinner-element-container.shown[type=\"ripple\"] .spin:after,.spinner-element-container.shown[type=\"ripple\"] .spin:before{border-radius:50%;box-sizing:content-box}.spinner-element-container.shown[type=\"ripple\"] .spin{position:relative;width:5em;height:5em}.spinner-element-container.shown[type=\"ripple\"] .spin:after,.spinner-element-container.shown[type=\"ripple\"] .spin:before{content:\"\";position:absolute;width:100%;height:100%;border:0.5em solid;opacity:0;-webkit-transform:translateZ(0) scale(0);transform:translateZ(0) scale(0);-webkit-animation:ripple 1s infinite ease-in-out;animation:ripple 1s infinite ease-in-out}.spinner-element-container.shown[type=\"ripple\"] .spin:after{-webkit-animation-delay:0.33s;animation-delay:0.33s}@-webkit-keyframes ripple{0%{opacity:0;-webkit-transform:translateZ(0) scale(0);transform:translateZ(0) scale(0)}7%{opacity:0.38}100%{opacity:0;-webkit-transform:translateZ(0) scale(1);transform:translateZ(0) scale(1)}}@keyframes ripple{0%{opacity:0;-webkit-transform:translateZ(0) scale(0);transform:translateZ(0) scale(0)}7%{opacity:0.38}100%{opacity:0;-webkit-transform:translateZ(0) scale(1);transform:translateZ(0) scale(1)}}.spinner-element-container.shown[type=\"boading\"] .spin,.spinner-element-container.shown[type=\"boading\"] .spin:after,.spinner-element-container.shown[type=\"boading\"] .spin:before{border-radius:50%;box-sizing:content-box}.spinner-element-container.shown[type=\"boading\"] .spin{position:relative;width:5em;height:5em;margin-left:2em}.spinner-element-container.shown[type=\"boading\"] .spin:after,.spinner-element-container.shown[type=\"boading\"] .spin:before{content:\"\";position:absolute;width:50%;height:50%;background:currentColor;opacity:1;-webkit-transform:translateZ(0) translateX(0) scale(0);transform:translateZ(0) translateX(0) scale(0);-webkit-animation:boading 1s infinite linear;animation:boading 1s infinite linear}.spinner-element-container.shown[type=\"boading\"] .spin:after{opacity:0.75;-webkit-animation-delay:0.5s;animation-delay:0.5s}@-webkit-keyframes boading{0%{-webkit-transform:translateZ(0) translateX(25%) scale(0);transform:translateZ(0) translateX(25%) scale(0)}25%{-webkit-transform:translateZ(0) translateX(75%) scale(0.5);transform:translateZ(0) translateX(75%) scale(0.5)}50%{-webkit-transform:translateZ(0) translateX(0%) scale(1);transform:translateZ(0) translateX(0%) scale(1)}75%{-webkit-transform:translateZ(0) translateX(-75%) scale(0.5);transform:translateZ(0) translateX(-75%) scale(0.5)}100%{-webkit-transform:translateZ(0) translateX(-25%) scale(0);transform:translateZ(0) translateX(-25%) scale(0)}}@keyframes boading{0%{-webkit-transform:translateZ(0) translateX(25%) scale(0);transform:translateZ(0) translateX(25%) scale(0)}25%{-webkit-transform:translateZ(0) translateX(75%) scale(0.5);transform:translateZ(0) translateX(75%) scale(0.5)}50%{-webkit-transform:translateZ(0) translateX(0%) scale(1);transform:translateZ(0) translateX(0%) scale(1)}75%{-webkit-transform:translateZ(0) translateX(-75%) scale(0.5);transform:translateZ(0) translateX(-75%) scale(0.5)}100%{-webkit-transform:translateZ(0) translateX(-25%) scale(0);transform:translateZ(0) translateX(-25%) scale(0)}}.spinner-element-container.shown[type=\"tail\"] .spin{font-size:300%;overflow:hidden;width:1em;height:1em;border-radius:50%;position:relative;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-animation:tail 1.2s infinite ease, tail-round 1.2s infinite ease;animation:tail 1.2s infinite ease, tail-round 1.2s infinite ease}@-webkit-keyframes tail{0%{box-shadow:0 -.83em 0 -.3em,0 -.83em 0 -.34em,0 -.83em 0 -.37em,0 -.83em 0 -.41em,0 -.83em 0 -.44em}5%,95%{box-shadow:0 -.83em 0 -.3em,0 -.83em 0 -.34em,0 -.83em 0 -.37em,0 -.83em 0 -.41em,0 -.83em 0 -.44em}10%,59%{box-shadow:0 -.83em 0 -.3em,-.10292em -.80842em 0 -.34em,-.18924em -.79514em 0 -.37em,-.27224em -.7719em 0 -.41em,-.31291em -.75779em 0 -.44em}20%{box-shadow:0 -.83em 0 -.3em,-.20501em -.73289em 0 -.34em,-.48804em -.58349em 0 -.37em,-.63744em -.42081em 0 -.41em,-.73206em -.20667em 0 -.44em}38%{box-shadow:0 -.83em 0 -.3em,-.24402em -.72293em 0 -.34em,-.57851em -.48804em 0 -.37em,-.74119em -.22991em 0 -.41em,-.80261em -.00664em 0 -.44em}100%{box-shadow:0 -.83em 0 -.3em,0 -.83em 0 -.34em,0 -.83em 0 -.37em,0 -.83em 0 -.41em,0 -.83em 0 -.44em}}@keyframes tail{0%{box-shadow:0 -.83em 0 -.3em,0 -.83em 0 -.34em,0 -.83em 0 -.37em,0 -.83em 0 -.41em,0 -.83em 0 -.44em}5%,95%{box-shadow:0 -.83em 0 -.3em,0 -.83em 0 -.34em,0 -.83em 0 -.37em,0 -.83em 0 -.41em,0 -.83em 0 -.44em}10%,59%{box-shadow:0 -.83em 0 -.3em,-.10292em -.80842em 0 -.34em,-.18924em -.79514em 0 -.37em,-.27224em -.7719em 0 -.41em,-.31291em -.75779em 0 -.44em}20%{box-shadow:0 -.83em 0 -.3em,-.20501em -.73289em 0 -.34em,-.48804em -.58349em 0 -.37em,-.63744em -.42081em 0 -.41em,-.73206em -.20667em 0 -.44em}38%{box-shadow:0 -.83em 0 -.3em,-.24402em -.72293em 0 -.34em,-.57851em -.48804em 0 -.37em,-.74119em -.22991em 0 -.41em,-.80261em -.00664em 0 -.44em}100%{box-shadow:0 -.83em 0 -.3em,0 -.83em 0 -.34em,0 -.83em 0 -.37em,0 -.83em 0 -.41em,0 -.83em 0 -.44em}}@-webkit-keyframes tail-round{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes tail-round{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.spinner-element-container.showscrim .spinner-element-scrim{opacity:1}.spinner-element-container .spinner-element-scrim{position:absolute;width:100%;height:100%;top:0;left:0;opacity:0;pointer-events:none;background:rgba(0,0,0,0.38);-webkit-transition:opacity 0.3s;transition:opacity 0.3s}.spinner-element-container .spinner-element-inner{width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;max-height:100vh;max-width:100vw;position:absolute;top:0;left:0}\n", ""]);


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, ":host(spinner-element){position:absolute;height:100%;width:100%;display:block;pointer-events:none;z-index:999999999999999999}:host(spinner-element)[page=\"true\"]{top:0;left:0}spinner-element{position:absolute;height:100%;width:100%;display:block;pointer-events:none;z-index:999999999999999999}spinner-element[page=\"true\"]{top:0;left:0}\n", ""]);


/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = "<div class=spinner-element-container> <div class=spinner-element-scrim></div> <div class=spinner-element-inner> <slot> <div class=spin></div> </slot> </div> </div> ";

/***/ })
/******/ ]);
});