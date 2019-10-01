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
/******/ 	return __webpack_require__(__webpack_require__.s = 82);
/******/ })
/************************************************************************/
/******/ ({

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Get = function Get(el, path, emptyVal, conditionFn) {
  if (el === void 0) {
    el = {};
  }

  if (path === void 0) {
    path = "";
  }

  if (emptyVal === void 0) {
    emptyVal = undefined;
  }

  if (conditionFn === void 0) {
    conditionFn = function conditionFn(v) {
      return v;
    };
  }

  if (!el) {
    return emptyVal;
  }

  var Path = [el];

  if (path && path.toString().split) {
    Path = [el].concat(path.toString().split("."));
  }

  var result = Path.reduce(function (accumulator, currentValue) {
    if (accumulator === undefined || accumulator === null) {
      return emptyVal;
    }

    if (currentValue.indexOf(".") === -1 && currentValue.indexOf("(") > -1) {
      var reg = /\((.*?)\)/g.exec(currentValue);
      var argsString = reg ? reg[1] : "";
      var args = argsString.split(",").map(function (arg) {
        return arg.trim();
      });
      var functionName = currentValue.split("(")[0];

      if (typeof accumulator[functionName] === "function") {
        return accumulator[functionName].apply(accumulator, args);
      }
    }

    if (accumulator !== null && accumulator !== undefined && currentValue) {
      return accumulator[currentValue];
    } else {
      return accumulator;
    }
  });

  if (result === undefined || result === null) {
    return emptyVal;
  }

  return conditionFn(result);
};

exports["default"] = Get;

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var id_1 = __webpack_require__(9);

var get_1 = __webpack_require__(12);

var childMutations = function childMutations() {
  var methods = {
    subscriptions: {},
    mutations: {},
    observedElements: [],
    subscribe: function subscribe(key, fn) {
      if (!methods.subscriptions[key]) {
        methods.subscriptions[key] = {};
      }

      var id = id_1["default"](key);

      while (!!methods.subscriptions[key][id]) {
        id = id_1["default"](key);
      }

      methods.subscriptions[key][id] = fn;

      if (Array.isArray(methods.mutations[key])) {
        methods.mutations[key].forEach(fn);
      }

      return id;
    },
    unsubscribe: function unsubscribe(key, id) {
      var subscription = get_1["default"](methods, "subscriptions." + key + "." + id);

      if (!subscription) {
        return;
      }

      methods.subscriptions[key][id] = null;
      delete methods.subscriptions[key][id];
    },
    mutation: function mutation(key, event) {
      if (!methods.subscriptions[key]) {
        methods.subscriptions[key] = {};
      }

      if (!methods.mutations[key]) {
        methods.mutations[key] = [];
      }

      methods.mutations[key].push(event);
      var subscriptions = methods.subscriptions[key];
      Object.keys(subscriptions).forEach(function (id) {
        return typeof subscriptions[id] === "function" ? subscriptions[id](event) : undefined;
      });
    },
    newObserver: function newObserver(componentName, target) {
      var observer = new MutationObserver(function (mutationsList) {
        for (var _i = 0, mutationsList_1 = mutationsList; _i < mutationsList_1.length; _i++) {
          var mutation = mutationsList_1[_i];
          methods.mutation(componentName, mutation);
        }
      });
      observer.observe(target, {
        childList: true,
        subtree: true
      });
      methods.observedElements.push(target);
      return function () {// const index = methods.observedElements.indexOf(target)
        // if (index > -1) {
        //     methods.observedElements.splice(index, 1)
        // }
        // observer.disconnect()
      };
    }
  };
  return methods;
};

var ChildMutations = window.ChildMutations = childMutations();
ChildMutations.newObserver("body", document.body);
exports["default"] = ChildMutations;

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* TODO - use js generator to create unique ids */

var ID = function ID(prefx) {
  if (prefx === void 0) {
    prefx = "";
  }

  return ("" + prefx + (new Date().getTime() / 1000 | 0).toString(16) + "xxxxxxxxxxxxxxxx").replace(/[x]/g, function () {
    return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
};

exports["default"] = ID;

/***/ })

/******/ });
});