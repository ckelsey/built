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

/***/ 11:
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

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var id_1 = __webpack_require__(11);

var Observe = function Observe(initialValue, noInit) {
  if (noInit === void 0) {
    noInit = false;
  }

  var values = Object.assign({}, {
    value: initialValue,
    previousValue: undefined,
    updated: new Date().getTime(),
    subscriptions: {}
  });

  var loop = function loop(key, val, valuesObj) {
    if (valuesObj === void 0) {
      valuesObj = {};
    }

    Object.keys(values.subscriptions).forEach(function (subscriptionId) {
      var subscriptionFn = values.subscriptions[subscriptionId][key];

      if (!subscriptionFn || typeof subscriptionFn !== "function") {
        return;
      }

      subscriptionFn(val, valuesObj, subscriptionId);
    });
  };

  var _unsubscribe = function unsubscribe(subscription) {
    return function () {
      values.subscriptions[subscription.id] = null;
      delete values.subscriptions[subscription.id];
    };
  };

  return {
    get value() {
      return values.value;
    },

    get previous() {
      return values.previousValue;
    },

    next: function next(v) {
      values = Object.assign({}, {
        value: v,
        previousValue: values.value,
        updated: new Date().getTime(),
        subscriptions: values.subscriptions
      });
      loop("next", values.value, values);
    },
    error: function error(err) {
      loop("error", err, values);
    },
    complete: function complete() {
      loop("complete", values);
    },
    subscribe: function subscribe(next, error, complete) {
      if (error === void 0) {
        error = function error(_e) {};
      }

      if (complete === void 0) {
        complete = function complete() {};
      }

      var subscription = Object.assign({}, {
        next: next,
        error: error,
        complete: complete,
        id: id_1["default"]()
      });
      subscription.unsubscribe = _unsubscribe(subscription);
      values.subscriptions[subscription.id] = subscription;

      if (!noInit && values.value !== undefined && typeof subscription.next === "function") {
        subscription.next(values.value, values, subscription.id);
      }

      return _unsubscribe(subscription);
    },
    unsubscribe: function unsubscribe(subscription) {
      if (!subscription || !subscription.id || !values.subscriptions[subscription.id]) {
        return;
      }

      return _unsubscribe(subscription);
    }
  };
};

exports["default"] = Observe;

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var observe_1 = __webpack_require__(13);

var ComponentStore =
/** @class */
function () {
  function ComponentStore() {
    this._components = {};
    this.components = {};
    this.themes = {};
  }

  ComponentStore.prototype.getTagName = function (element) {
    return element.tagName.toLowerCase();
  };

  ComponentStore.prototype.hasTagName = function (element) {
    return !!element && !!element.tagName && typeof element.tagName.toLowerCase === "function";
  };

  ComponentStore.prototype.observeIfNotObserved = function (tagname) {
    if (!this._components[tagname]) {
      this._components[tagname] = observe_1["default"]([]);
    }
  };

  ComponentStore.prototype.registerComponent = function (tagname) {
    if (!tagname) {
      return;
    }

    var that = this;
    tagname = tagname.toLowerCase();

    if (Object.getOwnPropertyDescriptor(that.components, tagname)) {
      return;
    }

    Object.defineProperty(that.components, tagname, {
      get: function get() {
        that.observeIfNotObserved(tagname);
        return that._components[tagname].value;
      },
      set: function set(el) {
        if (!that.hasTagName(el)) {
          return;
        }

        var elTag = that.getTagName(el);

        if (elTag !== tagname) {
          return;
        }

        that.observeIfNotObserved(tagname);

        that._components[tagname].next(that.components[tagname].concat([el]));
      }
    });
  };

  ComponentStore.prototype.themeComponent = function (component) {
    var _this = this;

    var tagname = this.getTagName(component);
    Object.keys(this.themes[tagname]).forEach(function (key) {
      component[key] = _this.themes[tagname][key];
    });
  };

  ComponentStore.prototype.theme = function (tag, theme) {
    var _this = this;

    this.themes[tag] = Object.assign({}, this.themes[tag] || {}, theme);
    this.components[tag].forEach(function (component) {
      return _this.themeComponent(component);
    });
  };

  ComponentStore.prototype.addComponent = function (element) {
    if (!this.hasTagName(element)) {
      return;
    }

    var tagname = this.getTagName(element);
    this.registerComponent(tagname);
    this.components[tagname] = element;

    if (this.themes[tagname]) {
      this.themeComponent(element);
    }
  };

  ComponentStore.prototype.removeComponent = function (element) {
    if (!this.hasTagName(element)) {
      return;
    }

    var tagname = this.getTagName(element);
    var existingComponents = this.components[tagname] || [];
    var index = existingComponents.indexOf(element);

    if (index > -1) {
      existingComponents.splice(index, 1);

      this._components[tagname].next(existingComponents);
    }
  };

  ComponentStore.prototype.subscribeTo = function (tagname, next, error, complete) {
    this.registerComponent(tagname);
    return this._components[tagname].subscribe(next, error, complete);
  };

  return ComponentStore;
}();

var ComponentObserver = new ComponentStore();
Object.freeze(ComponentObserver);
exports["default"] = ComponentObserver;

/***/ })

/******/ });
});