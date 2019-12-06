webpackHotUpdatebuiltjs(0,{

/***/ "./src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/utils/set-style-rules/index.js
function SetStyleRules(styleElement, ruleString) {
  if (!styleElement || !ruleString || ruleString === "undefined" || ruleString === "null") {
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
// CONCATENATED MODULE: ./src/utils/pipe/index.js
function Pipe() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function PipeInnerFunction(value) {
    return functions.reduce(function PipeInnerFunctionReducer(result, currentFunction) {
      return typeof currentFunction !== "function" ? result : currentFunction(result);
    }, value);
  };
}
// EXTERNAL MODULE: ./src/utils/get/index.js
var utils_get = __webpack_require__("./src/utils/get/index.js");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__("./node_modules/@babel/runtime/helpers/typeof.js");
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./src/utils/is-empty/index.js


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
// CONCATENATED MODULE: ./src/utils/is-object/index.js


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
// CONCATENATED MODULE: ./src/utils/reduce-filter/index.js
function ReduceFilter(predicateFunction) {
  return function ReduceFilterResult(result, current) {
    return predicateFunction(current) ? result.concat([current]) : result;
  };
}
// CONCATENATED MODULE: ./src/utils/is-non-collection/index.js

var nonCollections = ["string", "number", "null", "undefined", "function", "boolean"];
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

function IsNonCollection(value) {
  return nonCollections.indexOf(typeof_default()(value)) > -1 || value === null;
}
// CONCATENATED MODULE: ./src/utils/is-dom/index.js
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
// CONCATENATED MODULE: ./src/utils/is-date/index.js
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
// CONCATENATED MODULE: ./src/utils/type/index.js


function Type(value) {
  return value === null ? "null" : IsNonCollection(value) ? typeof_default()(value) : IsDom(value) ? "dom" : Array.isArray(value) ? "array" : IsDate(value) ? "date" : IsObject(value) ? "object" : typeof thing === "undefined" ? "undefined" : typeof_default()(thing);
}
// CONCATENATED MODULE: ./src/utils/is-t-monad/index.js

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
// CONCATENATED MODULE: ./src/utils/t-monad/index.js

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
// CONCATENATED MODULE: ./src/utils/to-string/index.js

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
// CONCATENATED MODULE: ./src/utils/if-invalid/index.js

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
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("./node_modules/@babel/runtime/helpers/toConsumableArray.js");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// CONCATENATED MODULE: ./src/utils/stop-if-invalid/index.js

function StopIfInvalid(value) {
  var result = TMonad(value);

  if (!result.valid) {
    result.stop = true;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/do-uri/index.js


var do_uri_doURI = function doURI(value) {
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
};
// CONCATENATED MODULE: ./src/utils/from-uri-component/index.js

function FromURIComponent(value) {
  return do_uri_doURI(value, false, true);
}
// CONCATENATED MODULE: ./src/utils/from-entities/index.js

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
// CONCATENATED MODULE: ./src/utils/t-monad-update/index.js

function TMonadUpdate(tmonad, expectedType) {
  return Object.assign(tmonad, {
    type: Type(tmonad.value),
    valid: expectedType === "?" ? true : tmonad.type === expectedType // '?' signifies any

  });
}
// CONCATENATED MODULE: ./src/utils/to-plain-text/index.js

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
// CONCATENATED MODULE: ./src/utils/to-regex/index.js

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
// CONCATENATED MODULE: ./src/utils/to-split-meta/index.js

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
// CONCATENATED MODULE: ./src/utils/to-split/index.js

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
// CONCATENATED MODULE: ./src/utils/from-json/index.js

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
// CONCATENATED MODULE: ./src/utils/to-array/index.js

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
// CONCATENATED MODULE: ./src/utils/to-map/index.js

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
// CONCATENATED MODULE: ./src/utils/to-trim/index.js

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
// CONCATENATED MODULE: ./src/utils/commas-to-array/index.js

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
// CONCATENATED MODULE: ./src/utils/to-filter/index.js

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
// CONCATENATED MODULE: ./src/utils/component-class-object/index.js



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
// CONCATENATED MODULE: ./src/utils/to-bool/index.js

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
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/assertThisInitialized.js
var assertThisInitialized = __webpack_require__("./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/wrapNativeSuper.js
var wrapNativeSuper = __webpack_require__("./node_modules/@babel/runtime/helpers/wrapNativeSuper.js");
var wrapNativeSuper_default = /*#__PURE__*/__webpack_require__.n(wrapNativeSuper);

// CONCATENATED MODULE: ./src/utils/to-function/index.js

function ToFunction(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  return TMonadUpdate(result, "function", "ToFunction");
}
// CONCATENATED MODULE: ./src/utils/equals/index.js

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

  if (type === "date") {
    var d = value1 === value2;

    try {
      d = new Date(value1).getTime() === new Date(value2).getTime();
    } catch (error) {}

    return d;
  }

  if (type === "dom") {
    return value1.isEqualNode(value2);
  }

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
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("./node_modules/@babel/runtime/regenerator/index.js");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// CONCATENATED MODULE: ./src/utils/id/index.js


var _marked =
/*#__PURE__*/
regenerator_default.a.mark(idGenerator);

/**
 * Generates a runtime unique ID
 * @generator
 * @yields { string }
 */
function idGenerator() {
  var index, objectIds, doHash, doId, objectId;
  return regenerator_default.a.wrap(function idGenerator$(_context) {
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
// CONCATENATED MODULE: ./src/utils/observer/index.js


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
      var subscription = Object.assign({}, {
        next: next,
        error: error,
        complete: complete,
        id: ID()
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


// CONCATENATED MODULE: ./src/utils/append-style-element/index.js

/**
 * Appends a style element with the provided rules to a provided element
 * @function AppendStyleElement
 * @param {string} rulesString - The rules to add to the style element
 * @param {HTMLElement} parent - The element to append to
 * @param {string} name - Optional. A name to give the style element
 * @example
 * AppendStyleElement(`.selector { color: black;}`, document.head, `dark-text-n-stuff`)
 */

function AppendStyleElement(rulesString, parent) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  if (!parent || !rulesString) {
    return;
  }
  /** First create and add the style element */


  var style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.setAttribute("name", name);
  style.style.display = "none";
  parent.appendChild(style);
  /** Then set the rules */

  SetStyleRules(style, rulesString);
  return style;
}
// CONCATENATED MODULE: ./src/utils/wc-elements/index.js


var removeOld = function removeOld(el) {
  if (!el || !el.parentNode) {
    return;
  }

  el.parentNode.removeChild(el);
};

function WCElements(host, elements) {
  var elStates = {};
  var state = {}; // let currentEl
  // const currentElExists = () => !!currentEl && (
  //     (Array.isArray(currentEl) && currentEl.filter(el => !!el && !!el.parentElement).length) ||
  //     !!currentEl.parentNode
  // )

  var getEl = function getEl(key) {
    // if (currentElExists()) { return currentEl }
    var els = host.shadowRoot.querySelectorAll(elements[key].selector);

    if (els.length > 1) {
      // currentEl = Array.from(els)
      var e = Array.from(els);
      return e;
    } // currentEl = els[0]


    return els[0];
  };

  Object.keys(elements).sort().forEach(function (key) {
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
      host.unsubscribeEvents(elStates[key].previous);
      removeOld(elStates[key].previous);

      if (typeof elements[key].onChange === "function") {
        elements[key].onChange(newElement, host);
      }
    });
  });
  return {
    state: state,
    disconnect: function disconnect() {
      return Object.keys(elStates).forEach(function (key) {
        elStates[key].complete();
      });
    }
  };
}
// CONCATENATED MODULE: ./src/utils/set-shadow-root/index.js

function SetShadowRoot(tagname, element, templateString, styleString) {
  var notWebComponent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var appendStylesToHead = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  if (notWebComponent) {
    element.shadowRoot = element;
    return element.innerHTML = "".concat(templateString, "<style type=\"text/css\">").concat(styleString, "</style>");
  }

  var Template = document.createElement("template");
  Template.innerHTML = templateString;
  AppendStyleElement(styleString, Template.content);
  var clone = document.importNode(Template.content, true);
  element.attachShadow({
    mode: "open"
  }).appendChild(clone);

  if ((!("registerElement" in document) || appendStylesToHead) && !document.head.querySelector("style[name=\"".concat(tagname, "\"]"))) {
    AppendStyleElement(styleString, document.head, tagname);
  }
}
// EXTERNAL MODULE: ./src/services/componentStore.js
var componentStore = __webpack_require__("./src/services/componentStore.js");

// CONCATENATED MODULE: ./src/utils/wc-constructor/index.js









var wc_constructor_unsub = function unsub(el, elementProperty, eventKey) {
  return Pipe(ToFunction, IfInvalid(function () {}))(Object(utils_get["a" /* Get */])(el, "".concat(elementProperty, ".").concat(eventKey))).value();
};

var unsubscribeEvents = function unsubscribeEvents(el) {
  var elementProperty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "eventSubscriptions";

  if (!el || !el[elementProperty]) {
    return;
  }

  Object.keys(el[elementProperty]).forEach(function (eventKey) {
    return wc_constructor_unsub(el, elementProperty, eventKey);
  });
};

var unsubscribeEvent = function unsubscribeEvent(el, eventKey) {
  var elementProperty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "eventSubscriptions";

  if (!el || !el[elementProperty]) {
    return;
  }

  wc_constructor_unsub(el, elementProperty, eventKey);
};

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
};

function WCConstructor(options) {
  var componentName = options.componentName;
  var observedAttributes = options.observedAttributes || [];
  var template = options.template || "<slot></slot>";
  var style = options.style || "";
  var properties = options.properties || {};
  var elements = options.elements || {};
  var methods = options.methods;
  var computed = options.computed;
  var getters = options.getters || {};
  var setters = options.setters || {};
  var onConnected = options.onConnected;
  var onDisconnected = options.onDisconnected;
  var onReady = options.onReady;

  if (!componentName) {
    return;
  }

  var ConnectedFn = function ConnectedFn(element) {
    if (options.appendStylesToParent) {
      AppendStyleElement(style, element.parentElement, componentName);
    }

    element.wcID = ID();
    element.unsubscribeEvent = unsubscribeEvent;
    element.unsubscribeEvents = unsubscribeEvents;

    if (computed) {
      Object.keys(computed).forEach(function (key) {
        // eslint-disable-next-line no-empty
        try {
          Object.defineProperty(element, key, computed[key](element));
        } catch (error) {}
      });
    }

    if (methods) {
      Object.keys(methods).forEach(function (key) {
        return element[key] = methods[key](element);
      });
    }

    if (elements) {
      var ElementData = WCElements(element, elements);
      element.elements = ElementData.state;
      element.disconnectElements = ElementData.disconnect;
    }

    if (properties && !properties.ready) {
      wc_constructor_setStateProperty(element, "ready", function (val) {
        return Pipe(ToBool, IfInvalid(false))(val).value;
      }, function () {}, getters.ready, setters.ready);
    }

    if (properties) {
      Object.keys(properties).forEach(function (key) {
        return wc_constructor_setStateProperty(element, key, properties[key].format, properties[key].onChange, getters[key], setters[key]);
      });
    }

    if (onConnected) {
      onConnected(element);
    }

    if (element.state["ready"]) {
      element.state["ready"].subscribe(function () {
        return element.dispatchEvent(new CustomEvent("ready", {
          detail: element
        }));
      });
    }

    element["ready"] = true;

    if (onReady) {
      onReady(element);
    }

    element.dispatchEvent(new CustomEvent("ready", {
      detail: element
    }));
  };

  var componentClass =
  /*#__PURE__*/
  function (_HTMLElement) {
    inherits_default()(componentClass, _HTMLElement);

    createClass_default()(componentClass, null, [{
      key: "observedAttributes",
      get: function get() {
        return observedAttributes;
      }
    }]);

    function componentClass() {
      var _this;

      classCallCheck_default()(this, componentClass);

      _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(componentClass).call(this));
      _this.wcID = "";
      _this.state = {};
      _this.elements = {};

      _this.disconnectElements = function () {};

      SetShadowRoot(componentName, assertThisInitialized_default()(_this), template, style, false, options.appendStylesToHead);
      return _this;
    }

    createClass_default()(componentClass, [{
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

        if (onDisconnected) {
          onDisconnected(this);
        }
      }
    }]);

    return componentClass;
  }(wrapNativeSuper_default()(HTMLElement));

  function newComponentObject() {
    return function (element) {
      element.observedAttributes = observedAttributes.slice();
      element.state = {};
      element.elements = {};

      element.disconnectElements = function () {};

      element.attributeChangedCallback = function () {};

      element.disconnectedCallback = function () {};

      SetShadowRoot(componentName, element, template, style, true, options.appendStylesToHead);
      ConnectedFn(element);
      return element;
    };
  }

  return {
    object: newComponentObject(),
    component: componentClass
  };
}
// CONCATENATED MODULE: ./src/utils/polyfill-object-assign/index.js
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
// CONCATENATED MODULE: ./src/services/timer.js

var timer_subscriptions = {};
var timer_isRunning = false;

var timer_loop = function loop() {
  timer_isRunning = true;
  var subscriptionKeys = Object.keys(timer_subscriptions);

  if (!subscriptionKeys.length) {
    timer_isRunning = false;
    return;
  }

  subscriptionKeys.forEach(function (key) {
    var subscription = timer_subscriptions[key];
    var currentFrame = new Date().getTime() - subscription.started;

    if (!!subscription.duration && typeof subscription.frames[currentFrame] === "undefined") {
      return timer_subscriptions[key].cancel();
    }

    subscription.fn(subscription.frames[currentFrame]);
  });
  requestAnimationFrame(loop);
};

function Timer(duration, stepFn) {
  var frameValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var completeFn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

  if (!duration && duration !== 0) {
    return;
  }

  var id = ID();
  timer_subscriptions[id] = {
    id: id,
    duration: duration,
    complete: typeof completeFn !== "function" ? function () {} : completeFn,
    fn: typeof stepFn !== "function" ? function () {} : stepFn,
    frames: frameValues ? frameValues.slice() : duration ? Array(duration).fill(0) : [],
    cancel: function cancel() {
      timer_subscriptions[id].complete();
      timer_subscriptions[id] = null;
      delete timer_subscriptions[id];
    },
    started: new Date().getTime()
  };

  if (!timer_isRunning) {
    timer_loop();
  }

  return timer_subscriptions[id];
}
// CONCATENATED MODULE: ./src/utils/polyfill-mutation-observer/index.js

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
      var cb = this.callBack;
      var oldHtml;
      this.interval = Timer(0, function () {
        var html = element.innerHTML;

        if (html !== oldHtml) {
          oldHtml = html;
          return cb.apply(null);
        }
      });
    };

    w.MutationObserver.prototype.disconnect = function () {
      return this.interval.cancel();
    };
  }).call(this);
}
// CONCATENATED MODULE: ./src/utils/polyfill-wc/index.js
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
// CONCATENATED MODULE: ./src/utils/wc-define/index.js

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
// CONCATENATED MODULE: ./src/components/button-element/index.js
 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var button_element_style = __webpack_require__("./src/components/button-element/style.scss").toString();

var button_element_setStyles = function setStyles(el, host, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles || host.styles);
};

var button_element_setTheme = function setTheme(value, host) {
  var themeElement = host.elements.theme;

  if (!themeElement || value === undefined) {
    return;
  }

  SetStyleRules(themeElement, value);
};

var setName = function setName(btn, name) {
  return btn ? btn.setAttribute("name", name) : undefined;
};

var button_element_properties = {
  accentcolor: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("#59a2d8"))(val).value;
    },
    onChange: function onChange(val, host) {
      if (host.hasRipple) {
        host.elements.ripple.color = val;
      }

      if (host.hasBounce) {
        host.elements.bounce.color = val;
      }
    }
  },
  "class": ComponentClassObject,
  ready: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      if (!val) {
        return;
      }

      setBounce(host);
      setRipple(host);
    }
  },
  ripple: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setRipple(host);
    }
  },
  bounce: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setBounce(host);
    }
  },
  name: {
    format: function format(val, host) {
      return Pipe(ToString, IfInvalid(host.textContent))(val).value;
    },
    onChange: function onChange(val, host) {
      return setName(host.elements.button, val);
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return button_element_setStyles(host.elements.injectedStyles, host, val);
    }
  },
  theme: {
    format: function format(val, host) {
      return typeof val === "string" ? val : host.theme;
    },
    onChange: button_element_setTheme
  }
};
var button_element_observedAttributes = Object.keys(button_element_properties);
var button_element_elements = {
  root: {
    selector: ".button-element",
    onChange: function onChange() {}
  },
  button: {
    selector: ".button-element > button",
    onChange: function onChange(el, host) {
      setBounce(host);
      setRipple(host);

      if (!el.getAttribute("name")) {
        setName(el, host.name);
      }
    }
  },
  ripple: {
    selector: "effect-ripple",
    onChange: function onChange(_el, host) {
      return setRipple(host);
    }
  },
  bounce: {
    selector: "effect-bounce-z",
    onChange: function onChange(_el, host) {
      return setBounce(host);
    }
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: button_element_setStyles
  },
  theme: {
    selector: "style.themeStyles",
    onChange: function onChange(_el, host) {
      return button_element_setTheme(host.theme, host);
    }
  }
};

var setRipple = function setRipple(host) {
  var ripple = host.elements.ripple;

  if (!ripple) {
    return;
  }

  ripple.color = host.accentcolor;
  ripple.targets = host.ripple ? [host.elements.button] : [];
};

var setBounce = function setBounce(host) {
  var bounce = host.elements.bounce;
  var button = host.elements.button;

  if (!bounce || !button) {
    return;
  }

  bounce.targets = host.bounce ? [button] : [];
};

var button_element_template = __webpack_require__("./src/components/button-element/index.html");

var button_element_componentName = "button-element";
var componentRoot = ".button-element";
var ButtonElement = WCConstructor({
  componentName: button_element_componentName,
  componentRoot: componentRoot,
  template: button_element_template,
  style: button_element_style,
  observedAttributes: button_element_observedAttributes,
  properties: button_element_properties,
  elements: button_element_elements,
  computed: {
    hasRipple: function hasRipple(host) {
      return {
        get: function get() {
          var el = host.elements.ripple;
          return !!el && el.ready === true;
        }
      };
    },
    hasBounce: function hasBounce(host) {
      return {
        get: function get() {
          var el = host.elements.bounce;
          return !!el && el.ready === true;
        }
      };
    },
    canRipple: function canRipple(host) {
      return {
        get: function get() {
          var can = !!host.ripple;
          return host.hasRipple && can && !!host.elements.button && host.ready === true;
        }
      };
    },
    canBounce: function canBounce(host) {
      return {
        get: function get() {
          var can = !!host.bounce;
          return host.hasBounce && can && !!host.elements.button && host.ready === true;
        }
      };
    }
  },
  onConnected: function onConnected(host) {
    host.elements.button.classList.add("ready");
  }
});
WCDefine(button_element_componentName, ButtonElement);
// CONCATENATED MODULE: ./src/utils/reduce-map/index.js
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
// CONCATENATED MODULE: ./src/utils/observer-unsubscribe/index.js

/**
 * Looks for subscriptions in an object, DOM element or a subscription itself and unsubscribes.
 * @function ObserverUnsubscribe
 * @param {Object|HTMLElement|function()} subscription - An element that has or is a observer subscription. If is a DOM element, must be under `subscriptions` or `eventSubscriptions` properties
 * @return {void}
 */

function ObserverUnsubscribe(subscription) {
  // todo add filter for check
  var callArrayOfSubscriptions = ReduceMap(function (val) {
    return typeof val === "function" ? val() : undefined;
  });

  if (typeof subscription === "function") {
    return subscription();
  }

  if (Array.isArray(subscription)) {
    return subscription.reduce(callArrayOfSubscriptions, []);
  }

  if (IsDom(subscription)) {
    var key;

    if (subscription.subscriptions) {
      key = "subscriptions";
    }

    if (subscription.eventSubscriptions) {
      key = "eventSubscriptions";
    }

    if (!key) {
      return;
    }

    return Object.keys(subscription[key]).reduce(callArrayOfSubscriptions, []);
  }

  if (IsObject(subscription)) {
    Object.keys(subscription).reduce(callArrayOfSubscriptions, []);
  }
}
// CONCATENATED MODULE: ./src/utils/observe-event/index.js

function ObserveEvent(element, eventName) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!element || !eventName) {
    return;
  }

  var isRunning = false;
  var mObserver = {
    disconnect: function disconnect() {}
  };
  options = Object.assign({}, {
    preventDefault: false,
    stopPropagation: false,
    useCapture: true
  }, options);

  var startup = function startup() {
    if (!element || !element.parentNode && !element.host || isRunning) {
      return;
    }

    isRunning = true;
    element.addEventListener(eventName, eventHandler, options.useCapture);
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
    element.removeEventListener(eventName, eventHandler, options.useCapture);
    isRunning = false;
  };

  var dispose = function dispose() {
    shutDown();
    observer.complete();
    mObserver.disconnect();
  };

  mObserver = new MutationObserver(function (e) {
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
  var max = 1000;

  var tryIt = function tryIt() {
    var parent = element.parentNode || element.host;
    max = max - 1;

    if (!max) {
      return dispose();
    }

    if (!parent) {
      return requestAnimationFrame(tryIt);
    }

    mObserver.observe(parent, {
      childList: true
    });
    startup();
  };

  tryIt();
  return observer;
}
// CONCATENATED MODULE: ./src/utils/to-number/index.js

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
// CONCATENATED MODULE: ./src/utils/index-of/index.js

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
// CONCATENATED MODULE: ./src/components/collapse-menu/index.js
/**
 * add ripple and bounce to toggle container
 */
 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var collapse_menu_style = __webpack_require__("./src/components/collapse-menu/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var collapse_menu_template = __webpack_require__("./src/components/collapse-menu/index.html");

var collapse_menu_componentName = "collapse-menu";
var collapse_menu_componentRoot = ".".concat(collapse_menu_componentName, "-container");
var directions = ["horizontal", "vertical"];
var alignments = ["left", "right"];

var collapse_menu_setStyles = function setStyles(el, styles) {
  return el ? SetStyleRules(el, styles) : undefined;
};

var setAttr = function setAttr(el, attr, value) {
  return el ? el.setAttribute(attr, value) : undefined;
};

var collapse_menu_setStyleElement = function setStyleElement(host) {
  var outerStyle = host.querySelector("style[name=\"outer\"]");
  var componentStyle = host.shadowRoot.querySelector("style[name=\"\"]");
  var styleString = [collapse_menu_style, host.theme, host.styles].join("");

  if (!outerStyle) {
    AppendStyleElement(styleString, host, "outer");
    outerStyle = host.querySelector("style[name=\"outer\"]");
  }

  collapse_menu_setStyles(componentStyle, styleString);
  collapse_menu_setStyles(outerStyle, styleString);
};

var waitForElement = function waitForElement(host, key) {
  return new Promise(function (resolve, reject) {
    var max = 1000;

    var here = function here() {
      max = max - 1;

      if (!max) {
        return reject();
      }

      var el = host.elements[key];

      if (el) {
        return resolve(el);
      }

      requestAnimationFrame(here);
    };

    here();
  });
};

var resetExpandable = function resetExpandable(host) {
  if (!host.collapseonwrap && !host.minwidth && !host.minpagewidth && host.expandable) {
    host.expandable = false;
  }
};

var collapse_menu_observeSize = function observeSize(on, host) {
  var run = function run(sizer) {
    ObserverUnsubscribe(sizer);

    if (!on) {
      return resetExpandable(host);
    }

    var handleSizeChange = function handleSizeChange() {
      return host.expandable = host.offsetWidth < host.minwidth;
    };

    handleSizeChange();
    sizer.eventSubscriptions = {
      resize: ObserveEvent(sizer.contentWindow, "resize").subscribe(handleSizeChange)
    };
  };

  waitForElement(host, "sizer").then(run)["catch"](function () {});
};

var collapse_menu_observeWrapSize = function observeWrapSize(on, host) {
  var run = function run(sizer) {
    ObserverUnsubscribe(sizer);

    if (!on) {
      return resetExpandable(host);
    }

    var handleSizeChange = function handleSizeChange() {
      var width = Array.from(host.querySelectorAll("[slot=\"item\"]")).reduce(function (totalWidth, el) {
        totalWidth = el.offsetWidth + totalWidth;
        return totalWidth;
      }, 0);
      host.expandable = host.offsetWidth < width;
    };

    handleSizeChange();
    sizer.eventSubscriptions = {
      resize: ObserveEvent(sizer.contentWindow, "resize").subscribe(handleSizeChange)
    };
  };

  waitForElement(host, "wrapSizer").then(run)["catch"](function () {});
};

var collapse_menu_observeWindowSize = function observeWindowSize(on, host) {
  var run = function run(root) {
    ObserverUnsubscribe(root);

    if (!on) {
      return resetExpandable(host);
    }

    var handleWindowSize = function handleWindowSize() {
      return host.expandable = window.innerWidth < host.minpagewidth;
    };

    handleWindowSize();
    root.eventSubscriptions = {
      resize: ObserveEvent(window, "resize").subscribe(handleWindowSize)
    };
  };

  waitForElement(host, "root").then(run)["catch"](function () {});
};

var updateStyles = function updateStyles(host) {
  var items = host.elements.items;
  items.removeAttribute("style");

  if (host.expandable) {
    items.style.display = "none";
    requestAnimationFrame(function () {
      items.style.background = host.background;
      requestAnimationFrame(function () {
        var transitionString = "transform ".concat(host.speed, "ms, opacity ").concat(host.speed * 0.62, "ms");
        items.style.transition = host.expandable ? transitionString : "none";
        items.style.removeProperty("display");
      });
    });
  }
};

var collapse_menu_properties = {
  "class": ComponentClassObject,
  expanded: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      setAttr(host.elements.root, "expanded", val);
      setAttr(host, "expanded", val);
      clearTimeout(host.horizontalItemsChange);
      var items = host.elements.items;

      if (!items || host.direction === "vertical") {
        return;
      }

      if (val) {
        items.style.flexDirection = "column";
        items.style.margin = "0px";
        items.style.minWidth = "200px";
      } else {
        host.horizontalItemsChange = setTimeout(function () {
          items.style.removeProperty("flex-direction");
          items.style.removeProperty("margin");
          items.style.removeProperty("min-width");
        }, host.speed * 1.1);
      }
    }
  },
  expandable: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      setAttr(host.elements.root, "expandable", val);
      setAttr(host, "expandable", val);
      updateStyles(host);
    }
  },
  minwidth: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(null))(val).value;
    },
    onChange: collapse_menu_observeSize
  },
  minpagewidth: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(null))(val).value;
    },
    onChange: collapse_menu_observeWindowSize
  },
  collapseonwrap: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: collapse_menu_observeWrapSize
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
  container: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    }
  },
  speed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(333))(val).value;
    },
    onChange: function onChange(_val, host) {
      updateStyles(host);
    }
  },
  background: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("none"))(val).value;
    },
    onChange: function onChange(_val, host) {
      updateStyles(host);
    }
  },
  styles: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(_val, host) {
      return collapse_menu_setStyleElement(host);
    }
  },
  theme: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(_val, host) {
      return collapse_menu_setStyleElement(host);
    }
  }
};
var collapse_menu_observedAttributes = Object.keys(collapse_menu_properties);
var collapse_menu_elements = {
  root: {
    selector: collapse_menu_componentRoot
  },
  items: {
    selector: ".collapse-menu-items"
  },
  sizer: {
    selector: ".collapse-menu-sizer"
  },
  wrapSizer: {
    selector: ".collapse-menu-wrap-sizer"
  },
  internalStyles: {
    selector: "style.internalStyles"
  },
  toggle: {
    selector: ".collapse-menu-toggle",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        click: ObserveEvent(el, "click").subscribe(function () {
          return host.expanded = !host.expanded;
        })
      };
    }
  },
  toggleInner: {
    selector: ".collapse-menu-toggle-inner",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        click: ObserveEvent(el, "click").subscribe(function () {
          return host.expanded = !host.expanded;
        })
      };
    }
  }
};
var CollapseMenu = WCConstructor({
  componentName: collapse_menu_componentName,
  componentRoot: collapse_menu_componentRoot,
  template: collapse_menu_template,
  style: collapse_menu_style,
  observedAttributes: collapse_menu_observedAttributes,
  properties: collapse_menu_properties,
  elements: collapse_menu_elements,
  onConnected: function onConnected(host) {
    collapse_menu_setStyleElement(host);

    var targetIsInHost = function targetIsInHost(parent) {
      var isInHost = false;

      try {
        while (!isInHost && parent && parent !== document.body) {
          if (host.contains(parent) || parent === host) {
            isInHost = true;
          }

          parent = parent.parentElement;
        }
      } catch (error) {}

      return isInHost;
    };

    requestAnimationFrame(function () {
      host.eventSubscriptions = {
        click: ObserveEvent(window, "click").subscribe(function (e) {
          if (!host.expanded) {
            return;
          }

          var target = e.target;
          var root = host.elements.root;

          if (!root) {
            return;
          }

          if (target !== host && !host.contains(target) && !root.contains(target) && !targetIsInHost(target)) {
            host.expanded = false;
          }
        })
      };
    });
  },
  onDisconnected: function onDisconnected(host) {
    ObserverUnsubscribe(host);
  }
});
WCDefine(collapse_menu_componentName, CollapseMenu);
// CONCATENATED MODULE: ./src/services/icons.js
var iconArrow = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z\"/></svg>";
var iconChevron = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/></svg>";
var iconGear = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z\"/></svg>";
var iconPencil = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z\"/></svg>";
var iconPlay = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M8 5v14l11-7z\"/></svg>";
var iconTriangle = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M7 10l5 5 5-5z\"/></svg>";
var Icons = {
  arrow: iconArrow,
  chevron: iconChevron,
  gear: iconGear,
  pencil: iconPencil,
  play: iconPlay,
  triangle: iconTriangle
};
// CONCATENATED MODULE: ./src/components/content-collapse/index.js
/**
 * add ripple and bounce to toggle container
 */

 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var content_collapse_style = __webpack_require__("./src/components/content-collapse/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var content_collapse_template = __webpack_require__("./src/components/content-collapse/index.html");

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
      var transition = host.elements.transition;

      if (transition && typeof transition.transitionTo === "function") {
        transition.transitionTo(val ? 1 : 0);
        host.elements.icon.setAttribute("rotation", val ? "down" : "right");
      }
    }
  },
  speed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(333))(val).value;
    },
    onChange: function onChange(val, host) {
      var transition = host.elements.transition;

      if (transition) {
        transition.speed = val;
      }
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
    selector: ".".concat(content_collapse_componentName, "-toggler-icon"),
    onChange: function onChange(el) {
      el.svg = iconTriangle;
    }
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
// CONCATENATED MODULE: ./src/utils/if-empty/index.js

function IfEmpty(newValue) {
  return function (value) {
    var result = TMonad(value);

    if (result.stop || IsEmpty(result.value)) {
      return result;
    }

    return TMonad(newValue);
  };
}
// CONCATENATED MODULE: ./src/components/content-drawer/methods.js
var methods_toggle = function toggle(host, open) {
  if (!host.ready) {
    return;
  }

  var root = host.elements.root;

  if (root) {
    root.classList[open ? "add" : "remove"]("open");
  }

  var header = host.elements.header;
  var scaler = host.elements.scaler;
  var inner = host.elements.contentInner;
  var bounce = host.elements.bounce;
  var underline = host.elements.underline;
  var ripple = host.elements.ripple;
  var fader = host.elements.fader;
  scaler.scaled = !open;

  if (!!host.bounce && host.bounce !== "false") {
    var target;

    if (host.bounce === "header") {
      target = header;
    }

    if (host.bounce === "content") {
      target = inner;
    }

    if (host.bounce === "true" || host.bounce === "all") {
      target = root;
    }

    bounce.targets = [target];
    bounce.amount = host.bounceamount || -4;
    bounce.speed = host.bouncespeed;

    if (typeof bounce.trigger === "function") {
      bounce.trigger();
    }
  } else if (bounce.targets && bounce.targets.length) {
    bounce.targets = [];
  }

  if (fader) {
    if (!host.fade && fader.targets.length) {
      fader.targets = [];
    }

    if (host.fade && !fader.targets.length && inner) {
      fader.targets = [inner];
    }

    if (host.fade && fader.opacity !== host.fadeamount) {
      fader.opacity = host.fadeamount;
    }

    if (host.fade && fader.speed !== host.fadespeed) {
      fader.speed = host.fadespeed;
    }
  }

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

    if (host.underline && underline.color !== host.accentcolor && ripple.color !== host.underlinecolor) {
      underline.color = host.underlinecolor || host.accentcolor;
    }

    if (!!host.underline && underline.direction !== host.underline) {
      underline.direction = host.underline;
    }
  }

  if (ripple) {
    if (!host.ripple && ripple.targets.length) {
      ripple.targets = [];
    }

    if (host.ripple && !ripple.targets.length && header) {
      ripple.targets = [header];
    }

    if (host.ripple && ripple.opacity !== host.rippleamount) {
      ripple.opacity = host.rippleamount;
    }

    if (host.ripple && ripple.speed !== host.ripplespeed) {
      ripple.speed = host.ripplespeed;
    }

    if (host.ripple && ripple.color !== host.accentcolor && ripple.color !== host.ripplecolor) {
      ripple.color = host.ripplecolor || host.accentcolor;
    }

    if (!!host.ripple && ripple.direction !== host.ripple) {
      ripple.direction = host.ripple;
    }
  }

  var others = [];

  if (host.drawergroup) {
    others = Array.from(document.querySelectorAll("content-drawer[drawergroup=\"".concat(host.drawergroup, "\"]")));
  }

  if (open) {
    if (host.canUnderline) {
      underline.open();
    }

    if (host.canFade) {
      fader.open();
    }

    if (host.canRipple) {
      ripple.trigger();
    }

    others.forEach(function (other) {
      if (other !== host) {
        other.open = false;
      }
    });
  } else {
    if (host.canUnderline) {
      underline.close();
    }

    if (host.canFade) {
      fader.close();
    }
  }
};
// CONCATENATED MODULE: ./src/components/content-drawer/elements.js
/* eslint-disable tree-shaking/no-side-effects-in-initialization */


var elementSelectors = {
  root: ".content-drawer-container",
  header: ".content-drawer-header",
  content: ".content-drawer-content",
  contentInner: ".content-drawer-content-inner",
  scaler: "effect-scale",
  underline: "effect-underline",
  ripple: "effect-ripple",
  fader: "effect-fade",
  headerIcon: "icon-element",
  bounce: "effect-bounce-z",
  injectedStyles: "style.injectedStyles"
};
var elements_elements = {};
var elements_setScaler = function setScaler(host) {
  var inner = host.elements.contentInner;
  var scaler = host.elements.scaler;
  scaler.targets = [inner];
  scaler.x = ["left", "right"].indexOf(host.openfrom) > -1;
  scaler.y = ["top", "bottom"].indexOf(host.openfrom) > -1;
  scaler.startfrom = toEffectStartFrom(host.openfrom);
  scaler.scaled = !host.open;
};
var setFader = function setFader(host) {
  host.elements.fader.targets = [host.elements.contentInner];
};
var setUnderline = function setUnderline(host) {
  var underline = host.elements.underline;

  if (!underline) {
    return;
  }

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
};
var elements_setRipple = function setRipple(host) {
  var ripple = host.elements.ripple;
  ripple.targets = [host.elements.header];
  ripple.color = host.accentcolor;
  ripple.direction = host.ripple;
};
var setHeaderIcon = function setHeaderIcon(host) {
  var prop = host.headericon.slice(0, 4) === "<svg" ? "svg" : "type";
  host.elements.headerIcon[prop] = host.headericon;
};
var elements_setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles);
};
var elementMethods = {
  header: function header(el, host) {
    el.eventSubscriptions = {
      click: ObserveEvent(el, "click").subscribe(function () {
        return host.open = !host.open;
      })
    };
  },
  injectedStyles: function injectedStyles(el, host) {
    return elements_setStyles(el, host.styles);
  }
};
Object.keys(elementSelectors).forEach(function (key) {
  elements_elements[key] = {
    selector: elementSelectors[key],
    onChange: elementMethods[key] ? elementMethods[key] : function () {}
  };
});
/* harmony default export */ var content_drawer_elements = (elements_elements);
// CONCATENATED MODULE: ./src/components/content-drawer/properties.js



var arrowIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/></svg>";
var properties_directions = ["auto", "left", "right", "top", "bottom"];
var toEffectStartFrom = function toEffectStartFrom(val) {
  return val === "auto" ? "auto" : val === "top" ? "center top" : val === "bottom" ? "center bottom" : val === "left" ? "left center" : "right center";
};

var setElementParam = function setElementParam(el, key, value) {
  return !el ? undefined : el[key] = value;
};

var attributes = {
  accentcolor: {
    format: function format(val) {
      return Pipe(ToString, IfEmpty("#59a2d8"))(val).value;
    },
    onChange: function onChange(val, host) {
      setElementParam(host.elements.ripple, "color", val);
      setElementParam(host.elements.underline, "color", val);
    }
  },
  bounce: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("all"))(val).value;
    }
  },
  bounceamount: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(null))(val).value;
    }
  },
  bouncespeed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(null))(val).value;
    }
  },
  "class": ComponentClassObject,
  drawergroup: {
    format: function format(val) {
      return val;
    }
  },
  fade: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    }
  },
  fadeamount: {
    format: function format(val) {
      return Pipe(CommasToArray, IfInvalid([0, 1]), ToMap(function (v) {
        return ToNumber(v).value;
      }))(val).value;
    }
  },
  fadespeed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(null))(val).value;
    }
  },
  headericon: {
    format: function format(val) {
      return val === "true" || val === undefined || val === null ? arrowIcon : val === "false" ? false : val;
    },
    onChange: function onChange(_val, host) {
      return setHeaderIcon(host);
    }
  },
  openfrom: {
    format: function format(val) {
      return Pipe(IndexOf(properties_directions), IfInvalid("top"))(val).value;
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
      return methods_toggle(host, val);
    }
  },
  ripple: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("auto"))(val).value;
    }
  },
  rippleamount: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(undefined))(val).value;
    }
  },
  ripplecolor: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(undefined))(val).value;
    }
  },
  ripplespeed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(undefined))(val).value;
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
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return elements_setStyles(host.elements.injectedStyles, val);
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
var properties_properties = Object.assign({}, attributes);
var properties_observedAttributes = Object.keys(attributes);
var hasScaler = function hasScaler(host) {
  return {
    get: function get() {
      var el = host.elements.scaler;
      return !!el && el.ready === true;
    }
  };
};
var hasUnderline = function hasUnderline(host) {
  return {
    get: function get() {
      var el = host.elements.underline;
      return !!el && el.ready === true;
    }
  };
};
var hasRipple = function hasRipple(host) {
  return {
    get: function get() {
      var el = host.elements.ripple;
      return !!el && el.ready === true;
    }
  };
};
var hasHeaderIcon = function hasHeaderIcon(host) {
  return {
    get: function get() {
      var el = host.elements.headerIcon;
      return !!el && !!el.ready && host.headericon !== false;
    }
  };
};
var canScale = function canScale(host) {
  return {
    get: function get() {
      return host.hasScaler && !!host.elements.header && !!host.elements.contentInner;
    }
  };
};
var canUnderline = function canUnderline(host) {
  return {
    get: function get() {
      var can = !!host.underline && host.underline !== "false";
      return host.hasUnderline && can && !!host.elements.header && host.ready === true;
    }
  };
};
var canRipple = function canRipple(host) {
  return {
    get: function get() {
      var can = !!host.ripple && host.ripple !== "false";
      return host.hasRipple && can && !!host.elements.header && host.ready === true;
    }
  };
};
var hasFader = function hasFader(host) {
  return {
    get: function get() {
      var el = host.elements.fader;
      return !!el && el.ready === true;
    }
  };
};
var canFade = function canFade(host) {
  return {
    get: function get() {
      var can = !!host.fade && host.fade !== "false";
      return host.hasFader && can && !!host.elements.contentInner && host.ready === true;
    }
  };
};
// CONCATENATED MODULE: ./src/components/content-drawer/index.js


 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var content_drawer_style = __webpack_require__("./src/components/content-drawer/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var content_drawer_template = __webpack_require__("./src/components/content-drawer/index.html");

var content_drawer_componentName = "content-drawer";
var content_drawer_componentRoot = ".content-drawer-container";
var ContentDrawer =
/*#__PURE__*/
WCConstructor({
  componentName: content_drawer_componentName,
  componentRoot: content_drawer_componentRoot,
  template: content_drawer_template,
  style: content_drawer_style,
  observedAttributes: properties_observedAttributes,
  properties: properties_properties,
  elements: content_drawer_elements,
  computed: {
    hasScaler: hasScaler,
    hasUnderline: hasUnderline,
    hasRipple: hasRipple,
    hasHeaderIcon: hasHeaderIcon,
    hasFader: hasFader,
    canUnderline: canUnderline,
    canScale: canScale,
    canRipple: canRipple,
    canFade: canFade
  },
  onReady: function onReady(host) {
    host.elements.root.classList[host.open ? "add" : "remove"]("open");
    elements_setScaler(host);
    setFader(host);
    setUnderline(host);
    elements_setRipple(host);
    setHeaderIcon(host);
  }
});
WCDefine(content_drawer_componentName, ContentDrawer);
// CONCATENATED MODULE: ./src/components/content-transition/elements.js


var content_transition_elements_setStyles = function setStyles(el, host, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles || host.styles);
};
var setKeepChildren = function setKeepChildren(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.classList[host.keepchildren ? "add" : "remove"]("keepchildren");
};
var content_transition_elements_elements = {
  root: {
    selector: ".content-transition-container",
    onChange: function onChange(el, host) {
      content_transition_setStyleElement(host);
      el.setAttribute("type", host.type);
    }
  },
  current: {
    selector: "slot[name=\"current\"]"
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: content_transition_elements_setStyles
  },
  themeStyles: {
    selector: "style.themeStyles",
    onChange: function onChange(el, host) {
      return content_transition_elements_setStyles(el, host, host.theme);
    }
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
/* harmony default export */ var content_transition_elements = (content_transition_elements_elements);
// CONCATENATED MODULE: ./src/components/content-transition/properties.js


var content_transition_properties_properties = {
  "class": ComponentClassObject,
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return content_transition_elements_setStyles(host.elements.injectedStyles, host, val);
    }
  },
  theme: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return content_transition_elements_setStyles(host.elements.themeStyles, host, val);
    }
  },
  speed: {
    format: function format(val) {
      return isNaN(val) ? 300 : val;
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
      return setKeepChildren(host);
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
var content_transition_properties_observedAttributes = Object.keys(content_transition_properties_properties);
// CONCATENATED MODULE: ./src/utils/get-ease/index.js
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
// CONCATENATED MODULE: ./src/utils/ease-power/index.js
function EasePower(stepDecimal) {
  var pow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  return 1 - Math.pow(1 - stepDecimal, pow);
}
// CONCATENATED MODULE: ./src/utils/ease-in-out/index.js

function EaseInOut(values, duration) {
  var pow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  return GetEase(values, duration, pow, function (index, frames, pow) {
    return EasePower(index / frames * (index / frames), pow);
  });
}
// CONCATENATED MODULE: ./src/components/content-transition/methods.js
 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var methods_style = __webpack_require__("./src/components/content-transition/style.scss").toString();

var dispatchTransition = function dispatchTransition(host, from, to) {
  host.dispatchEvent(new CustomEvent("transitioning", {
    detail: {
      host: host,
      from: from,
      to: to
    }
  }));
};

var dispatchTransitioned = function dispatchTransitioned(host, from, to) {
  host.dispatchEvent(new CustomEvent("transitioned", {
    detail: {
      host: host,
      from: from,
      to: to
    }
  }));
};

var removeElement = function removeElement(el) {
  try {
    el.parentNode.removeChild(el);
  } catch (error) {}
};

var methods_animator = function animator(from, to, speed, stepFn) {
  return new Promise(function (resolve) {
    return Timer(speed, stepFn, EaseInOut([from, to], speed), resolve);
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

var getChildren = function getChildren(host) {
  return function () {
    return Array.from(host.querySelectorAll("[slot]"));
  };
};
var getCurrent = function getCurrent(host) {
  return function () {
    return host.querySelector("[slot=\"current\"]");
  };
};

var getTransitionElements = function getTransitionElements(host, indexOrChild) {
  var nextContainer = host.elements.nextContainer;
  var currentContainer = host.elements.currentContainer;
  var root = host.elements.root;
  var child = isNaN(indexOrChild) ? indexOrChild : host.getChildren()[indexOrChild];
  var current = host.current || host.getCurrent();

  if (!root || !nextContainer || !currentContainer || !child) {
    return;
  }

  host.current = child;
  return {
    nextContainer: nextContainer,
    currentContainer: currentContainer,
    root: root,
    child: child,
    current: current
  };
};

var cleanup = function cleanup(host) {
  var children = host.getChildren(); // TODO watch if this is needed. Causes issues with content-transition inside of content-transition being incorrectly changed
  // children.forEach(child => child === host.current ? undefined : child.setAttribute(`slot`, `hidden`))

  var current = host.getCurrent();
  host.end = {
    current: current,
    index: children.indexOf(current)
  };
  return host.current;
};

var transitionStart = function transitionStart(current) {
  return new Promise(function (resolve) {
    if (current) {
      current.className = current.className.split("content-transition-shown").join("").split(" ").filter(function (s) {
        return !!s.trim();
      }).join(" ");
    }

    requestAnimationFrame(resolve);
  });
};

var transitionEnd = function transitionEnd(next) {
  next.className = "content-transition-shown ".concat(next.className.split("content-transition-shown").join("").split(" ").filter(function (s) {
    return !!s.trim();
  }).join(" "));
};

var transitionSlide = function transitionSlide(host, index, speed, keepchildren) {
  return new Promise(function (resolve) {
    var elements = getTransitionElements(host, index);

    if (!elements) {
      return resolve();
    }

    dispatchTransition(host, elements.current, elements.child);
    host.start = {
      from: elements.current,
      to: elements.child
    };
    var startHeight = elements.root.offsetHeight;
    elements.root.style.height = "".concat(startHeight, "px");
    elements.root.classList.add("sliding");
    elements.child.setAttribute("slot", "next");
    var endHeight = elements.child.offsetHeight;
    transitionStart(elements.current).then(function () {
      if (startHeight !== endHeight) {
        animateHeight(startHeight, elements.child.offsetHeight, elements.root, speed).then(function () {
          requestAnimationFrame(function () {
            elements.root.style.removeProperty("height");
            transitionEnd(elements.child);
          });
        });
      }

      setTimeout(function () {
        requestAnimationFrame(function () {
          animateOpacity(0, 1, elements.nextContainer, speed * 0.25);
        });
      }, speed * 0.1);
      animateOpacity(1, 0, elements.currentContainer, speed * 0.8);
      animateLeft(0, 100, elements.currentContainer, speed * 0.8);
      animateLeft(-100, 0, elements.nextContainer, speed).then(function () {
        if (elements.current) {
          elements.current.setAttribute("slot", "hidden");
        }

        elements.currentContainer.removeAttribute("style");
        elements.child.setAttribute("slot", "current");
        elements.nextContainer.removeAttribute("style");
        elements.root.classList.remove("sliding");
        transitionEnd(elements.child);
        dispatchTransitioned(host, elements.current, elements.child);

        if (!keepchildren) {
          removeElement(elements.current);
        }

        return resolve(cleanup(host));
      });
    });
  });
};

var runHeight = function runHeight(elements, speed, keepchildren, host) {
  return new Promise(function (resolve) {
    dispatchTransition(host, elements.current, elements.child);
    host.start = {
      from: elements.current,
      to: elements.child
    };
    var startHeight = elements.root.offsetHeight;
    elements.root.style.height = "".concat(startHeight, "px");
    elements.child.setAttribute("slot", "next");

    if (!host.contains(elements.child)) {
      host.appendChild(elements.child);
    }

    var endHeight = elements.child.offsetHeight;
    transitionStart(elements.current).then(function () {
      var afterHeightSet = function afterHeightSet() {
        if (!keepchildren) {
          while (host.getChildren().length > 1) {
            removeElement(host.getChildren()[0]);
          }
        }

        if (elements.current) {
          elements.current.setAttribute("slot", "hidden");
        }

        elements.child.setAttribute("slot", "current");
        elements.child.style.removeProperty("opacity");
        elements.currentContainer.style.removeProperty("opacity");
        elements.nextContainer.style.removeProperty("opacity");
        requestAnimationFrame(function () {
          dispatchTransitioned(host, elements.current, elements.child);
          transitionEnd(elements.child);
          cleanup(host);
          elements.root.style.removeProperty("height");
          return resolve(host.current);
        });
      };

      if (endHeight === startHeight) {
        return setTimeout(afterHeightSet, speed);
      }

      animateHeight(startHeight, endHeight, elements.root, speed).then(afterHeightSet);
    });
  });
};

var transitionFade = function transitionFade(host, child, speed, keepchildren) {
  return new Promise(function (resolve) {
    var elements = getTransitionElements(host, child);

    if (!elements) {
      return resolve();
    }

    animateOpacity(1, 0, elements.currentContainer, speed * 0.75);
    animateOpacity(0, 1, elements.nextContainer, speed);
    return runHeight(elements, speed, keepchildren, host).then(resolve);
  });
};

var transitionHeight = function transitionHeight(host, child, speed, keepchildren) {
  return new Promise(function (resolve) {
    var elements = getTransitionElements(host, child);

    if (!elements) {
      return resolve();
    }

    return runHeight(elements, speed, keepchildren, host).then(resolve);
  });
};

var transitionTo = function transitionTo(host) {
  return function (index) {
    return new Promise(function (resolve) {
      switch (host.type) {
        case "slide":
          return transitionSlide(host, index, host.speed, host.keepchildren).then(resolve);

        case "fade":
          return transitionFade(host, index, host.speed, host.keepchildren).then(resolve);

        case "height":
          return transitionHeight(host, index, host.speed, host.keepchildren).then(resolve);
      }
    });
  };
};
var transitionChild = function transitionChild(host) {
  return function (child) {
    return new Promise(function (resolve) {
      switch (host.type) {
        case "slide":
          return transitionSlide(host, child, host.speed, host.keepchildren).then(resolve);

        case "fade":
          return transitionFade(host, child, host.speed, host.keepchildren).then(resolve);

        case "height":
          return transitionHeight(host, child, host.speed, host.keepchildren).then(resolve);
      }
    });
  };
};
var getComponentStyles = function getComponentStyles(host) {
  return function () {
    return "".concat(methods_style).concat(host.styles);
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
var setCurrent = function setCurrent(host) {
  return function (index) {
    var elements = getTransitionElements(host, index);

    var end = function end() {
      if (elements.current && elements.current.slot !== "hidden") {
        elements.current.slot = "hidden";
      }

      if (elements.child && elements.child.slot !== "current") {
        elements.child.slot = "current";
      }
    };

    if (elements.current === elements.child) {
      return Promise.resolve(end());
    }

    return transitionStart(elements.current).then(function () {
      transitionEnd(elements.child);
      cleanup(host);
      return end();
    });
  };
};
// CONCATENATED MODULE: ./src/components/content-transition/index.js



 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var content_transition_style = __webpack_require__("./src/components/content-transition/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var content_transition_template = __webpack_require__("./src/components/content-transition/index.html");

var content_transition_componentName = "content-transition";
var content_transition_componentRoot = ".content-transition-container";
var content_transition_setStyleElement = function setStyleElement(host) {
  var outerStyle = host.querySelector("style[name=\"outer\"]");
  var componentStyle = host.shadowRoot.querySelector("style[name=\"\"]");
  var themeStyles = host.elements.themeStyles;
  var injectedStyles = host.elements.injectedStyles;
  var styleString = [content_transition_style, themeStyles ? themeStyles.innerHTML : "", injectedStyles ? injectedStyles.innerHTML : ""].join("");

  if (!outerStyle) {
    AppendStyleElement(styleString, host, "outer");
    outerStyle = host.querySelector("style[name=\"outer\"]");
    outerStyle.nonchild = true;
  }

  content_transition_elements_setStyles(componentStyle, host, styleString);
  content_transition_elements_setStyles(outerStyle, host, styleString);
};
var ContentTransition = WCConstructor({
  componentName: content_transition_componentName,
  componentRoot: content_transition_componentRoot,
  template: content_transition_template,
  style: content_transition_style,
  observedAttributes: content_transition_properties_observedAttributes,
  properties: content_transition_properties_properties,
  elements: content_transition_elements,
  methods: {
    transitionChild: transitionChild,
    transitionTo: transitionTo,
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
 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var cookie_message_style = __webpack_require__("./src/components/cookie-message/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var cookie_message_template = __webpack_require__("./src/components/cookie-message/index.html");

var cookie_message_componentName = "cookie-message";
var cookie_message_componentRoot = ".cookie-message-container";

var cookie_message_setStyles = function setStyles(el, host, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles || host.styles);
};

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
  document.cookie = "".concat(cookieName, "=true");
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
  "class": ComponentClassObject,
  shown: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(!getCookie()))(val).value;
    },
    onChange: function onChange(val, host) {
      if (val) {
        try {
          localStorage.removeItem(cookieName);
        } catch (error) {}

        host.elements.root.classList.add("shown");
      } else {
        setCookie();
        host.elements.root.classList.remove("shown");
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
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return cookie_message_setStyles(host.elements.injectedStyles, host, val);
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
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: cookie_message_setStyles
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
// CONCATENATED MODULE: ./src/utils/observe-slots/index.js

function ObserveSlots(element, mustHaveSlotAttribute) {
  if (!element) {
    return;
  }

  var mObserver = {
    disconnect: function disconnect() {}
  };
  var slotObserver = {
    disconnect: function disconnect() {}
  };
  var observer = Observer();

  var dispose = function dispose() {
    observer.complete();
    mObserver.disconnect();
    slotObserver.disconnect();
  };

  var newSlots = function newSlots(added, removed) {
    observer.next({
      added: added,
      removed: removed
    });
  };

  slotObserver = new MutationObserver(function (mutationsList) {
    var list = Array.from(mutationsList);

    while (list.length) {
      var mutation = list.shift();

      if (mutation.type === "childList" && (mutation.addedNodes.length || mutation.removedNodes.length)) {
        if (mustHaveSlotAttribute) {
          (function () {
            var added = [];
            var removed = [];
            mutation.addedNodes.forEach(function (a) {
              return a.getAttribute("slot") ? added.push(a) : undefined;
            });
            mutation.removedNodes.forEach(function (r) {
              return r.getAttribute("slot") ? removed.push(r) : undefined;
            });

            if (added.length || removed.length) {
              newSlots(added, removed);
            }
          })();
        } else {
          return newSlots(mutation.addedNodes, mutation.removedNodes);
        }
      }
    }
  });
  mObserver = new MutationObserver(function (e) {
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
  var max = 1000;

  var tryIt = function tryIt() {
    max = max - 1;

    if (!max) {
      return dispose();
    }

    var parent = element.parentNode || element.host;

    if (!parent) {
      return requestAnimationFrame(tryIt);
    }

    mObserver.observe(parent, {
      childList: true
    });
    slotObserver.observe(element, {
      childList: true
    });
  };

  tryIt();
  return observer;
}
// CONCATENATED MODULE: ./src/utils/was-clicked-on/index.js
function WasClickedOn(element, event) {
  if (!element) {
    return false;
  }

  var target = Array.isArray(event.path) ? event.path[0] : event.composedPath && typeof event.composedPath === "function" && event.composedPath()[0] ? event.composedPath()[0] : event.originalTarget ? event.originalTarget : event.explicitOriginalTarget ? event.explicitOriginalTarget : event.target;

  var cycleUp = function cycleUp(parent) {
    while (parent && parent !== document.body) {
      var isEqual = element === parent;
      var isContained = parent instanceof Node && element.contains(parent);

      if (isEqual || isContained) {
        return true;
      }

      parent = parent.parentNode || parent.host;
    }

    return false;
  };

  return cycleUp(target);
}
// CONCATENATED MODULE: ./src/components/drop-down/index.js
 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var drop_down_style = __webpack_require__("./src/components/drop-down/style.scss").toString();

var drop_down_setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles);
};

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

  if (!show) {
    root.classList.remove("opened");
  } else {
    root.classList.add("opened");
  }

  host.dispatchEvent(new CustomEvent(show ? "selectopen" : "selectclose", {
    detail: host
  }));
};

var drop_down_properties = {
  "class": ComponentClassObject,
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(_el, host) {
      return drop_down_setStyleElement(host);
    }
  },
  theme: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(_el, host) {
      return drop_down_setStyleElement(host);
    }
  },
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
}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var drop_down_template = __webpack_require__("./src/components/drop-down/index.html");

var drop_down_componentName = "drop-down";
var drop_down_componentRoot = ".".concat(drop_down_componentName, "-container");

var openClose = function openClose(open, host) {
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

  setTimeout(change, 333);
};

var drop_down_elements = {
  root: {
    selector: drop_down_componentRoot
  },
  heading: {
    selector: ".drop-down-heading"
  },
  overlay: {
    selector: ".drop-down-overlay"
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: function onChange(_el, host) {
      return drop_down_setStyleElement(host);
    }
  },
  themedStyles: {
    selector: "style.themedStyles",
    onChange: function onChange(_el, host) {
      return drop_down_setStyleElement(host);
    }
  }
};
var drop_down_setStyleElement = function setStyleElement(host) {
  var outerStyle = host.querySelector("style[name=\"outer\"]");
  var componentStyle = host.shadowRoot.querySelector("style[name=\"\"]");
  var styleString = [drop_down_style, host.theme, host.styles].join("");

  if (!outerStyle) {
    AppendStyleElement(styleString, host, "outer");
    outerStyle = host.querySelector("style[name=\"outer\"]");
    outerStyle.nonchild = true;
  }

  drop_down_setStyles(host.elements.injectedStyles, styleString);
  drop_down_setStyles(host.elements.themedStyles, styleString);
  drop_down_setStyles(componentStyle, styleString);
  drop_down_setStyles(outerStyle, styleString);
};
var DropDown = WCConstructor({
  componentName: drop_down_componentName,
  componentRoot: drop_down_componentRoot,
  template: drop_down_template,
  style: drop_down_style,
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
          if (host.open) {
            return openClose(false, host);
          }

          return;
        }

        if (WasClickedOn(host.elements.heading, e) || WasClickedOn(host.querySelector("[slot=\"label\"]"), e)) {
          if (host.open) {
            return requestAnimationFrame(function () {
              return openClose(false, host);
            });
          } else {
            return openClose(true, host);
          }
        }

        if (host.closeonclick && host.open) {
          return requestAnimationFrame(function () {
            return openClose(false, host);
          });
        }
      })
    };
    var overlay = host.elements.overlay;
    overlay.target = host;
  },
  onDisconnected: function onDisconnected(host) {
    ObserverUnsubscribe(host);
  }
});
WCDefine(drop_down_componentName, DropDown);
// CONCATENATED MODULE: ./src/utils/if-is/index.js

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
// CONCATENATED MODULE: ./src/utils/if-not/index.js

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
// CONCATENATED MODULE: ./src/utils/set-attribute/index.js
function SetAttribute(element, name, value) {
  var asProperty = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (!element || !name) {
    return element;
  }

  var set = function set(n, v) {
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
// CONCATENATED MODULE: ./src/utils/add-remove-attribute/index.js

function AddRemoveAttribute(el, attr, value) {
  if (!el) {
    return;
  }

  if (attr === "accept") {
    return SetAttribute(el, "accept", value ? value.join(", ") : undefined);
  }

  var arias = ["disabled", "required"];

  if (arias.indexOf(attr) > -1) {
    SetAttribute(el, "aria-".concat(attr), value);
  }

  SetAttribute(el, attr, value);
  return el;
}
// CONCATENATED MODULE: ./src/utils/is-mobile/index.js
var IsMobile = typeof window.orientation !== "undefined" || window.navigator.userAgent.indexOf("IEMobile") !== -1;
// CONCATENATED MODULE: ./src/utils/to-options/index.js

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
// CONCATENATED MODULE: ./src/utils/to-json/index.js

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
// CONCATENATED MODULE: ./src/utils/find-element-in/index.js
function FindElementIn(parent, selector) {
  var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return !parent ? undefined : parent[all ? "querySelectorAll" : "querySelector"](selector);
}
// CONCATENATED MODULE: ./src/utils/svg-tags.js
var svgTags = ["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "audio", "canvas", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "video", "view", "vkern"];
// CONCATENATED MODULE: ./src/utils/html-tags.js
var htmlTags = ["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"];
// CONCATENATED MODULE: ./src/utils/validate-html/index.js

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
// CONCATENATED MODULE: ./src/utils/replace-element-contents/index.js
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
// CONCATENATED MODULE: ./src/components/dropdown-select/elements.js


var dropdown_select_elements_elements = {
  root: {
    selector: ".dropdown-select-container",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        blur: ObserveEvent(el, "blur").subscribe(function () {
          return requestAnimationFrame(host.elements.overlay.hide);
        })
      };
    }
  },
  input: {
    selector: "select.dropdown-select-input"
  },
  filter: {
    selector: "input.dropdown-select-filter",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        focus: ObserveEvent(el, "focus").subscribe(function () {
          if (host["native"]) {
            return;
          }

          el.value = "";
          methods_toggleOptions(host, true);
        }),
        blur: ObserveEvent(el, "blur").subscribe(function () {
          if (host["native"]) {
            return;
          }

          var overlay = host.elements.overlay;
          var selectedOption = FindElementIn(overlay, ".select-option.selected");
          host.value = selectedOption ? selectedOption.value : "";
          elements_setLabel(host);
          requestAnimationFrame(overlay.hide);
        }),
        keydown: ObserveEvent(el, "keydown").subscribe(function (e) {
          if (host["native"]) {
            return;
          }

          var overlay = host.elements.overlay;
          var key = Object(utils_get["a" /* Get */])(e, "key", "").toLowerCase();

          var newSelection = function newSelection(option) {
            setSelectedOption(host, option);
          };

          if (["arrowup", "arrowdown"].indexOf(key) > -1) {
            e.preventDefault();
            var $options = FindElementIn(overlay, ".select-option:not(.filtered-out)", true);
            var $previous;
            var $next;
            var $newSelected;

            for (var i = 0; i < $options.length; i++) {
              var $option = $options[i];
              var isSelected = $option.classList.contains("selected");
              setUnselectedOption($option);

              if (isSelected) {
                $previous = $options[i - 1] ? $options[i - 1] : $options[i];
                $next = $options[i + 1] ? $options[i + 1] : $options[i];
                break;
              }
            }

            if (!$previous && !$next) {
              $previous = $next = $options[0];
            }

            if (key === "arrowup") {
              $newSelected = $previous;
            } else if (key === "arrowdown") {
              $newSelected = $next;
            }

            if ($newSelected && !$newSelected.classList.contains("selected")) {
              newSelection($newSelected);
            }
          }

          if (key === "enter") {
            var visibleOptions = FindElementIn(overlay, ".select-option:not(.filtered-out)", true);

            if (visibleOptions.length === 1) {
              newSelection(visibleOptions[0]);
            }

            el.blur();
          }

          if (key === "escape") {
            Array.from(FindElementIn(overlay, ".select-option.selected", true)).forEach(function (o) {
              return o.classList.remove("selected");
            });
            var selected = host.selectedOptionElement;

            if (selected) {
              selected.classList.add("selected");
            }

            el.blur();
          }
        }),
        input: ObserveEvent(el, "input").subscribe(function () {
          host["native"] ? undefined : methods_filter(host, el.value);
        })
      };
    }
  },
  overlay: {
    selector: "overlay-content",
    onChange: function onChange(el, host) {
      var filter = host.elements.filter;

      if (filter) {
        el.target = host.elements.filter;
      }

      var loop = function loop() {
        if (!el || !el.parentNode) {
          return;
        }

        if (el.state && el.state.showing) {
          return el.state.showing.subscribe(function (e) {
            methods_toggleOptions(host, e);
          });
        }

        requestAnimationFrame(loop);
      };

      loop();
    }
  },
  label: {
    selector: ".dropdown-select-label",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = el.eventSubscriptions ? el.eventSubscriptions : {};
      el.eventSubscriptions.click = ObserveEvent(el, "click").subscribe(function () {
        return methods_toggleOptions(host, true);
      });
    }
  },
  arrow: {
    selector: ".dropdown-select-arrow",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        click: ObserveEvent(el, "click").subscribe(function () {
          return methods_toggleOptions(host, true);
        })
      };
    }
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: function onChange(_el, host) {
      return dropdown_select_elements_setStyles(host);
    }
  }
};
var elements_setInput = function setInput(host) {
  var filter = host.elements.filter;
  var overlay = host.elements.overlay;

  if (filter && overlay) {
    overlay.target = host.elements.root;
  }
};
var elements_setLabel = function setLabel(host) {
  if (host.statictext) {
    return ReplaceElementContents(host.elements.label, ValidateHtml(host.statictext, [], ["script"]).sanitized || "");
  }

  var formatFunction = host.formatvaluelabel && typeof host.formatvaluelabel === "function" ? host.formatvaluelabel : function (o) {
    return o.label;
  };
  var emptyOption = host.emptyoption ? host.emptyoption : "";
  var option = !host.options ? {
    value: "",
    label: emptyOption
  } : host.options[host.selectedIndex];
  var label = option ? formatFunction(option) : host.showempty ? emptyOption : "";
  ReplaceElementContents(host.elements.label, ValidateHtml(label, [], ["script"]).sanitized || "");
};
var dropdown_select_elements_setStyles = function setStyles(host) {
  var el = host.elements.injectedStyles;

  if (!el) {
    return;
  }

  var labelSize = ".dropdown-select-container .dropdown-select-label{font-size:".concat(host.labelsize, ";}");
  var optionColors = ".dropdown-select-container overlay-content .select-option{font-size:".concat(host.optionsize, ";color:").concat(host.optioncolor, ";background-color:").concat(host.optionbackground, ";}");
  var optionSelectedColors = ".dropdown-select-container overlay-content .select-option.selected,.dropdown-select-container overlay-content .select-option:hover{color:".concat(host.optionselectedcolor, ";background-color:").concat(host.optionselectedbackground, ";}");
  var styles = "".concat(host.styles).concat(optionColors).concat(optionSelectedColors).concat(labelSize);
  SetStyleRules(el, styles);
};
/* harmony default export */ var dropdown_select_elements = (dropdown_select_elements_elements);
// CONCATENATED MODULE: ./src/components/dropdown-select/methods.js


var methods_dispatch = function dispatch(host, type) {
  return host.dispatchEvent(new CustomEvent(type, {
    detail: host
  }));
};
var methods_initInput = function initInput(host) {
  setSelectOptions(host);
  elements_setInput(host);
  elements_setLabel(host);
};

var methods_setOptions = function setOptions(input, options, emptySelect) {
  var optionTag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "option";

  if (!input || !options) {
    return;
  }

  var optionElements = [];

  var createOption = function createOption(option) {
    var optionElement = document.createElement(optionTag);
    optionElement.className = "select-option".concat(option["class"] ? " ".concat(option["class"]) : "");
    optionElement["value"] = option.value;
    optionElement.innerHTML = ValidateHtml(option.label, [], ["script"]).sanitized || "";
    optionElements.push(optionElement);
  };

  if (emptySelect !== false) {
    createOption({
      value: "",
      label: emptySelect,
      "class": "blank"
    });
  }

  options.forEach(function (option) {
    return createOption(option);
  });
  ReplaceElementContents(input, optionElements);

  if (optionTag !== "option") {
    optionElements.forEach(function (optionElement) {
      var link = optionElement.href ? optionElement : optionElement.querySelector("a");
      optionElement.eventSubscriptions = {
        mousedown: ObserveEvent(optionElement, "mousedown").subscribe(function () {
          optionElements.forEach(function (o) {
            return o.classList.remove("selected");
          });
          optionElement.classList.add("selected");
          input.value = optionElement.value;
          input.dispatchEvent(new Event("input"));
          optionElement.dispatchEvent(new Event("click"));

          if (link) {
            link.click();
          }
        })
      };
    });
  }

  return {
    input: input,
    options: options,
    optionElements: optionElements
  };
};

var scrollToSelectedOption = function scrollToSelectedOption(overlay, option) {
  if (!overlay || !option) {
    return;
  }

  var optionBox = option.getBoundingClientRect();
  var containerPosition = overlay.position;
  var optionTop = optionBox.top - containerPosition.top;
  var optionBottom = optionBox.height + optionTop;

  if (optionBottom > containerPosition.height) {
    overlay.scrollContent(0, containerPosition.scrollTop + (optionBottom - containerPosition.height));
  }

  if (optionTop < 0) {
    overlay.scrollContent(0, containerPosition.scrollTop + optionTop);
  }
};
var setSelectedOption = function setSelectedOption(host, option) {
  option.classList.add("selected");
  scrollToSelectedOption(host.elements.overlay, option);
};
var setUnselectedOption = function setUnselectedOption(option) {
  option.classList.remove("selected");
};
var methods_toggleOptions = function toggleOptions(host, show) {
  var overlay = host.elements.overlay;
  var root = host.elements.root;

  if (!root || !overlay) {
    return;
  }

  if (show && overlay.showing) {
    return;
  }

  var options = Array.from(FindElementIn(overlay, ".select-option", true));
  var selectedOption;
  options.forEach(function (option) {
    option.classList.remove("filtered-out");

    if (host.value === option.value) {
      selectedOption = option;
      setSelectedOption(host, option);
    } else {
      setUnselectedOption(option);
    }
  });
  root.classList[show ? "add" : "remove"]("hidden-label");
  overlay[show ? "show" : "hide"]().then(function () {
    scrollToSelectedOption(overlay, selectedOption);
  });

  if (!show) {
    root.classList.remove("opened");
    host.elements.filter.blur();
  } else {
    root.classList.add("opened");
    host.elements.filter.focus();
  }

  host.dispatchEvent(new CustomEvent(show ? "selectopen" : "selectclose", {
    detail: host
  }));
};
var methods_filter = function filter(host, value) {
  var filterValue = (value || "").toLowerCase();
  var options = Array.from(FindElementIn(host.elements.overlay, ".select-option", true));
  var emptyFilter = filterValue === "";
  options.forEach(function (o) {
    var label = o.textContent.toLowerCase();

    if (!emptyFilter) {
      if (label === filterValue || label.indexOf(filterValue) > -1) {
        o.classList.remove("filtered-out");
      } else {
        o.classList.add("filtered-out");
      }
    } else {
      o.classList.remove("filtered-out");
    }
  });
};
var setSelectOptions = function setSelectOptions(host) {
  if (!host.ready) {
    return;
  }

  var overlay = host.elements.overlay;
  var options = host.options.map(function (o) {
    return {
      value: host.formatvalue(o),
      label: host.formatlabel(o)
    };
  });
  methods_setOptions(host.elements.input, options, host.emptyoption);
  methods_setOptions(overlay, options, host.emptyoption, "div");
};
var methods_focus = function focus(host) {
  return function () {
    return host["native"] ? host.elements.input.focus() : host.elements.filter.focus();
  };
};
var methods_blur = function blur(host) {
  return function () {
    return host["native"] ? host.elements.input.blur() : host.elements.filter.blur();
  };
};
// CONCATENATED MODULE: ./src/components/dropdown-select/properties.js




var properties_attributes = {
  arrow: {
    format: function format(val) {
      return Pipe(ToString, IndexOf(["right", "left", "true", "false"]), IfInvalid("true"), IfIs("true", "right"))(val).value;
    },
    onChange: function onChange(val, host) {
      return host.elements.root.setAttribute("arrow", val);
    }
  },
  "class": ComponentClassObject,
  disabled: {
    format: function format(val) {
      return Pipe(ToBool, IfNot(true, null))(val).value;
    },
    onChange: function onChange(val, host) {
      host.elements.root.classList[val ? "add" : "remove"]("disabled");
      AddRemoveAttribute(host.elements.input, "disabled", val);
    }
  },
  disablefilter: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      return host.elements.root.classList[val ? "add" : "remove"]("disablefilter");
    }
  },
  statictext: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_setLabel(host);
    }
  },
  showempty: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_setLabel(host);
    }
  },
  emptyoption: {
    format: function format(val) {
      return val === false || val === "false" ? false : val === undefined ? "Select..." : val;
    },
    onChange: function onChange(_val, host) {
      return setSelectOptions(host);
    }
  },
  hideonfilter: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(val, host) {
      return host.elements.root.classList[val ? "add" : "remove"]("hidefilteredout");
    }
  },
  multiple: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      AddRemoveAttribute(host.elements.input, "multiple", val);
    }
  },
  name: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      AddRemoveAttribute(host.elements.input, "name", val);
    }
  },
  "native": {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid( false || IsMobile))(val).value;
    },
    onChange: function onChange(val, host) {
      host.elements.root.classList[val ? "add" : "remove"]("native-select");
    }
  },
  options: {
    format: function format(val) {
      return Pipe(ToOptions, IfInvalid([]))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setSelectOptions(host);
    }
  },
  formatlabel: {
    format: function format(val) {
      return Pipe(ToFunction, IfInvalid(function (v) {
        return v.label;
      }))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setSelectOptions(host);
    }
  },
  formatvaluelabel: {
    format: function format(val) {
      return typeof val === "function" ? val : function (v) {
        return v.label;
      };
    },
    onChange: function onChange(_val, host) {
      return setSelectOptions(host);
    }
  },
  formatvalue: {
    format: function format(val) {
      return Pipe(ToFunction, IfInvalid(function (v) {
        return v.value;
      }))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setSelectOptions(host);
    }
  },
  readonly: {
    format: function format(val) {
      return Pipe(ToBool, IfNot(true, null))(val).value;
    },
    onChange: function onChange(val, host) {
      host.elements.root.classList[val ? "add" : "remove"]("readonly");
      AddRemoveAttribute(host.elements.input, "readonly", val);
    }
  },
  required: {
    format: function format(val) {
      return Pipe(ToBool, IfNot(true, null))(val).value;
    },
    onChange: function onChange(val, host) {
      AddRemoveAttribute(host.elements.input, "required", val);
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(_val, host) {
      return dropdown_select_elements_setStyles(host);
    }
  },
  tabindex: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(-1))(val).value;
    },
    onChange: function onChange(val, host) {
      AddRemoveAttribute(host.elements.input, "tabindex", val);
    }
  },
  value: {
    format: function format(val) {
      return val;
    },
    onChange: function onChange(_val, host) {
      var overlay = host.elements.overlay;

      if (overlay && typeof overlay.hide === "function") {
        overlay.hide();
      }

      elements_setLabel(host);
      methods_dispatch(host, "input");
    }
  },
  optioncolor: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("inherit"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return dropdown_select_elements_setStyles(host);
    }
  },
  optionbackground: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("#fafafa"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return dropdown_select_elements_setStyles(host);
    }
  },
  optionselectedcolor: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("#fff"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return dropdown_select_elements_setStyles(host);
    }
  },
  optionselectedbackground: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("#59a2d8"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return dropdown_select_elements_setStyles(host);
    }
  },
  labelsize: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("inherit"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return dropdown_select_elements_setStyles(host);
    }
  },
  optionsize: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("inherit"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return dropdown_select_elements_setStyles(host);
    }
  }
}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var dropdown_select_properties_properties = Object.assign({}, properties_attributes);
var dropdown_select_properties_observedAttributes = Object.keys(properties_attributes);
var properties_selectedIndex = function selectedIndex(host) {
  return {
    get: function get() {
      if (!host.options || !host.options.length) {
        return undefined;
      }

      var parsed = Pipe(ToJSON, ToString)(host.value);

      if (parsed.type === "undefined" || parsed.value === "" || parsed.value === "\"\"") {
        if (host.emptyoption === false) {
          host.value = host.formatvalue(host.options[0]);
          return 0;
        }

        return undefined;
      }

      var i = 0;

      while (i < host.options.length) {
        var formatted = host.formatvalue(host.options[i]);
        var val = Pipe(ToJSON, ToString)(formatted).value;

        if (val === parsed.value) {
          return i;
        }

        i = i + 1;
      }

      return;
    }
  };
};
var properties_selectedOptionElement = function selectedOptionElement(host) {
  return {
    get: function get() {
      var overlay = host.elements.overlay;

      if (!overlay) {
        return;
      }

      return Array.from(FindElementIn(overlay, ".select-option", true))[host.selectedIndex + (host.emptyoption !== false ? 1 : 0)];
    }
  };
};
var properties_optionElements = function optionElements(host) {
  return {
    get: function get() {
      var overlay = host.elements.overlay;

      if (!overlay) {
        return [];
      }

      return Array.from(FindElementIn(overlay, ".select-option", true));
    }
  };
};
// CONCATENATED MODULE: ./src/components/dropdown-select/index.js



 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var dropdown_select_style = __webpack_require__("./src/components/dropdown-select/style.scss").toString();

var dropdown_select_formatter = function formatter(host, value, key) {
  if (value === undefined && typeof host.state[key].value === "function") {
    return;
  }

  var formatted = host.properties[key].format(value);

  if (formatted !== host.state[key].value) {
    host.state[key].next(formatted);
  }
}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var dropdown_select_template = __webpack_require__("./src/components/dropdown-select/index.html");

var dropdown_select_componentName = "dropdown-select";
var dropdown_select_componentRoot = ".".concat(dropdown_select_componentName, "-container");
var DropdownSelect =
/*#__PURE__*/
WCConstructor({
  componentName: dropdown_select_componentName,
  componentRoot: dropdown_select_componentRoot,
  template: dropdown_select_template,
  style: dropdown_select_style,
  observedAttributes: dropdown_select_properties_observedAttributes,
  properties: dropdown_select_properties_properties,
  elements: dropdown_select_elements,
  methods: {
    focus: methods_focus,
    blur: methods_blur
  },
  computed: {
    selectedIndex: properties_selectedIndex,
    selectedOptionElement: properties_selectedOptionElement,
    optionElements: properties_optionElements
  },
  setters: {
    formatlabel: function formatlabel(host) {
      return function (value) {
        return dropdown_select_formatter(host, value, "formatlabel");
      };
    },
    formatvalue: function formatvalue(host) {
      return function (value) {
        return dropdown_select_formatter(host, value, "formatvalue");
      };
    },
    formatvaluelabel: function formatvaluelabel(host) {
      return function (value) {
        return dropdown_select_formatter(host, value, "formatvaluelabel");
      };
    }
  },
  onReady: function onReady(host) {
    return methods_initInput(host);
  }
});
WCDefine(dropdown_select_componentName, DropdownSelect);
// CONCATENATED MODULE: ./src/utils/use-if/index.js

function UseIf(condition, ifNot, value) {
  return TMonad(condition(value) ? value : ifNot(value));
}
// CONCATENATED MODULE: ./src/utils/is-element/index.js

function IsElement(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  result.valid = Object(utils_get["a" /* Get */])(result, "value.nodeType") === 1;
  return result;
}
// CONCATENATED MODULE: ./src/utils/selector-to-element/index.js

function SelectorToElement(parent, value) {
  var Value = TMonad(value);

  if (Value.stop) {
    return Value;
  }

  if (!parent) {
    parent = document.firstElementChild;
  }

  if (Value.type === "string") {
    Value.value = parent.querySelector(Value.value);
  }

  var result = IsElement(Value);
  return result;
}
// CONCATENATED MODULE: ./src/utils/selector-array-to-elements/index.js

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
// CONCATENATED MODULE: ./src/utils/get-curve/index.js
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
// CONCATENATED MODULE: ./src/components/effect-bounce-z/methods.js


var getDimension = function getDimension(target) {
  var max = Math.max(target.offsetWidth, target.offsetHeight);
  var min = Math.min(target.offsetWidth, target.offsetHeight);
  return (max - min) / 2 + min;
};

var methods_runStart = function runStart(host) {
  return function () {
    if (host.on || !host.targets || !host.ready) {
      return;
    }

    host.on = true;

    if (!Array.isArray(host.targets)) {
      return;
    }

    Timer(host.speed, function (scale) {
      var set = function set(el) {
        var dimension = getDimension(el);
        var scaleFactor = (dimension - scale) / dimension;
        el.style.transform = "perspective(1px) translateZ(0) scaleX(".concat(scaleFactor, ") scaleY(").concat(scaleFactor, ")");
      };

      Object(utils_get["a" /* Get */])(host, "targets", []).forEach(function (target) {
        return Array.isArray(target) ? target.forEach(set) : set(target);
      });
    }, GetCurve([1, -host.amount, -host.amount * 1.125, 1], 0.5, false, host.speed), function () {
      var set = function set(el) {
        return el.style.removeProperty("transform");
      };

      Object(utils_get["a" /* Get */])(host, "targets", []).forEach(function (target) {
        return Array.isArray(target) ? target.forEach(set) : set(target);
      });
      host.on = false;
    });
  };
};

var methods_trigger = function trigger(host) {
  return methods_runStart(host);
};
var methods_unloadTargets = function unloadTargets(host) {
  if (!host.targets$ || !host.ready) {
    return;
  }

  Object(utils_get["a" /* Get */])(host, "targets$", []).forEach(function (ob$) {
    return ob$();
  });
  host.targets$ = [];
};
var methods_loadTargets = function loadTargets(host) {
  if (!host.targets || !host.start) {
    return;
  }

  var set = function set(el) {
    el.style.transformStyle = "preserve-3d";
    el.style.backfaceVisibility = "hidden";
    host.targets$.push(ObserveEvent(el, host.start).subscribe(methods_runStart(host)));
  };

  if (!Array.isArray(host.targets)) {
    return;
  }

  Object(utils_get["a" /* Get */])(host, "targets", []).forEach(function (target) {
    if (Array.isArray(target)) {
      return target.forEach(set);
    }

    set(target);
  });
};
// CONCATENATED MODULE: ./src/components/effect-bounce-z/properties.js



var properties_resetTargets = function resetTargets(host) {
  methods_unloadTargets(host);
  methods_loadTargets(host);
};

var properties_onChange = function onChange() {};

var properties_selectorsToDom = function selectorsToDom(val) {
  return SelectorArrayToElements(null, val).value;
};

var effect_bounce_z_properties_attributes = {
  amount: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(0))(val).value;
    },
    onChange: properties_onChange
  },
  "class": ComponentClassObject,
  speed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(300))(val).value;
    },
    onChange: properties_onChange
  },
  start: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("mousedown"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return properties_resetTargets(host);
    }
  },
  targets: {
    format: properties_selectorsToDom,
    onChange: function onChange(_val, host) {
      return properties_resetTargets(host);
    }
  }
};
var effect_bounce_z_properties_properties = Object.assign({
  targets$: {
    format: function format() {
      return [];
    },
    onChange: properties_onChange
  }
}, effect_bounce_z_properties_attributes);
var effect_bounce_z_properties_observedAttributes = Object.keys(effect_bounce_z_properties_attributes);
// CONCATENATED MODULE: ./src/components/effect-bounce-z/index.js


 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var effect_bounce_z_template = __webpack_require__("./src/components/effect-bounce-z/index.html");

var effect_bounce_z_componentName = "effect-bounce-z";
var effect_bounce_z_componentRoot = ".effect-push-container";
var EffectBounceZ = WCConstructor({
  componentName: effect_bounce_z_componentName,
  componentRoot: effect_bounce_z_componentRoot,
  template: effect_bounce_z_template,
  observedAttributes: effect_bounce_z_properties_observedAttributes,
  properties: effect_bounce_z_properties_properties,
  methods: {
    trigger: methods_trigger
  },
  onDisconnected: function onDisconnected(host) {
    return methods_unloadTargets(host);
  }
});
WCDefine(effect_bounce_z_componentName, EffectBounceZ);
// CONCATENATED MODULE: ./src/components/effect-fade/methods.js


var methods_runAnimation = function runAnimation(host, isOn) {
  if (!Array.isArray(host.targets)) {
    return;
  }

  Timer(host.speed, function (opacity) {
    var set = function set(el) {
      return el.style.opacity = opacity;
    };

    host.targets.forEach(function (target) {
      return Array.isArray(target) ? target.forEach(set) : set(target);
    });
  }, GetCurve(isOn ? host.opacity.slice() : host.opacity.slice().reverse(), isOn ? host.spring : 0.5, false, host.speed), function () {
    var set = function set(el) {
      return el.style.opacity = isOn ? 1 : 0;
    };

    host.targets.forEach(function (target) {
      return Array.isArray(target) ? target.forEach(set) : set(target);
    });
  });
};

var runEnd = function runEnd(host) {
  return function () {
    if (!host.canRunEnd) {
      return;
    }

    host.on = false;
    methods_runAnimation(host, false);
  };
};

var effect_fade_methods_runStart = function runStart(host) {
  return function () {
    if (!host.canRunStart) {
      return;
    }

    host.on = true;
    methods_runAnimation(host, true);
  };
};

var effect_fade_methods_toggle = function toggle(host) {
  return host.on ? runEnd(host) : effect_fade_methods_runStart(host);
};
var methods_open = function open(host) {
  return effect_fade_methods_runStart(host);
};
var methods_close = function close(host) {
  return runEnd(host);
};
var unloadTriggers = function unloadTriggers(host) {
  if (!host.hasTriggers$) {
    return;
  }

  host.triggers$.forEach(function (ob$) {
    return ob$();
  });
  host.triggers$ = [];
};
var methods_loadTriggers = function loadTriggers(host) {
  if (!host.canLoadTriggers) {
    return;
  }

  var set = function set(el) {
    host.triggers$.push(ObserveEvent(el, host.start, {
      useCapture: true
    }).subscribe(effect_fade_methods_runStart(host)));

    if (host.canEnd) {
      host.triggers$.push(ObserveEvent(el, host.end).subscribe(runEnd(host)));
    }
  };

  host.triggers.forEach(function (trigger) {
    if (Array.isArray(trigger)) {
      return trigger.forEach(set);
    }

    set(trigger);
  });
};
// CONCATENATED MODULE: ./src/components/effect-fade/properties.js



var properties_resetTriggers = function resetTriggers(host) {
  unloadTriggers(host);
  methods_loadTriggers(host);
};

var effect_fade_properties_onChange = function onChange() {};

var effect_fade_properties_selectorsToDom = function selectorsToDom(val) {
  return SelectorArrayToElements(null, CommasToArray(val).value).value;
};

var effect_fade_properties_attributes = {
  end: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(_val, host) {
      return properties_resetTriggers(host);
    }
  },
  opacity: {
    format: function format(val) {
      return Pipe(CommasToArray, IfInvalid([0, 1]), ToMap(function (v) {
        return ToNumber(v).value;
      }))(val).value;
    },
    onChange: effect_fade_properties_onChange
  },
  speed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(600))(val).value;
    },
    onChange: effect_fade_properties_onChange
  },
  start: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("mousedown"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return properties_resetTriggers(host);
    }
  },
  targets: {
    format: effect_fade_properties_selectorsToDom,
    onChange: function onChange(_val, host) {
      return properties_resetTriggers(host);
    }
  },
  triggers: {
    format: effect_fade_properties_selectorsToDom,
    onChange: function onChange(_val, host) {
      return properties_resetTriggers(host);
    }
  },
  "class": ComponentClassObject
};
var effect_fade_properties_properties = Object.assign({
  on: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: effect_fade_properties_onChange
  },
  triggers$: {
    format: function format() {
      return [];
    },
    onChange: effect_fade_properties_onChange
  }
}, effect_fade_properties_attributes);
var effect_fade_properties_observedAttributes = Object.keys(effect_fade_properties_attributes);
var hasTargets = function hasTargets(host) {
  return {
    get: function get() {
      return !!host.ready && !!host.targets && Array.isArray(host.targets) && !!host.targets.length;
    }
  };
};
var hasTriggers = function hasTriggers(host) {
  return {
    get: function get() {
      return !!host.ready && !!host.triggers && Array.isArray(host.triggers) && !!host.triggers.length;
    }
  };
};
var hasTriggers$ = function hasTriggers$(host) {
  return {
    get: function get() {
      return !!host.triggers$ && Array.isArray(host.triggers$);
    }
  };
};
var hasStart = function hasStart(host) {
  return {
    get: function get() {
      return !!host.start;
    }
  };
};
var canStart = function canStart(host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasStart && host.start !== "none";
    }
  };
};
var canEnd = function canEnd(host) {
  return {
    get: function get() {
      return host.hasTargets && !!host.end && host.end !== "none";
    }
  };
};
var canRunStart = function canRunStart(host) {
  return {
    get: function get() {
      return host.hasTargets;
    }
  };
};
var canRunEnd = function canRunEnd(host) {
  return {
    get: function get() {
      return host.hasTargets;
    }
  };
};
var canLoadTriggers = function canLoadTriggers(host) {
  return {
    get: function get() {
      return host.hasTriggers && host.hasTriggers$ && host.hasStart;
    }
  };
};
// CONCATENATED MODULE: ./src/components/effect-fade/elements.js
var elements_elementSelectors = {
  root: ".effect-fade-container"
};
var effect_fade_elements_elements = {};
Object.keys(elements_elementSelectors).forEach(function (key) {
  effect_fade_elements_elements[key] = {
    selector: elements_elementSelectors[key],
    onChange: function onChange() {}
  };
});
/* harmony default export */ var effect_fade_elements = (effect_fade_elements_elements);
// CONCATENATED MODULE: ./src/components/effect-fade/index.js



 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var effect_fade_style = __webpack_require__("./src/components/effect-fade/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var effect_fade_template = __webpack_require__("./src/components/effect-fade/index.html");

var effect_fade_componentName = "effect-fade";
var effect_fade_componentRoot = ".effect-fade-container";
var EffectFade =
/*#__PURE__*/
WCConstructor({
  componentName: effect_fade_componentName,
  componentRoot: effect_fade_componentRoot,
  template: effect_fade_template,
  style: effect_fade_style,
  observedAttributes: effect_fade_properties_observedAttributes,
  properties: effect_fade_properties_properties,
  elements: effect_fade_elements,
  methods: {
    toggle: effect_fade_methods_toggle,
    open: methods_open,
    close: methods_close
  },
  computed: {
    hasTargets: hasTargets,
    hasTriggers: hasTriggers,
    hasTriggers$: hasTriggers$,
    hasStart: hasStart,
    canLoadTriggers: canLoadTriggers,
    canStart: canStart,
    canEnd: canEnd,
    canRunStart: canRunStart,
    canRunEnd: canRunEnd
  },
  onReady: function onReady(host) {
    unloadTriggers(host);
    methods_loadTriggers(host);
  },
  onDisconnected: unloadTriggers
});
WCDefine(effect_fade_componentName, EffectFade);
// CONCATENATED MODULE: ./src/components/effect-ripple/methods.js

var maxScale = 1.3;

var effect_ripple_methods_runStart = function runStart(host) {
  if (!host.ready || host.isRunning) {
    return;
  }

  host.isRunning = true;
  var rippleInner = document.createElement("span");
  var style = rippleInner.style;
  rippleInner.className = "ripple-inner";
  rippleInner.style.backgroundColor = host.color;
  host.elements.ripple.appendChild(rippleInner);
  setOrigin(host, rippleInner);
  Timer(host.speed, function (scale) {
    var scaleAmount = Math.max(Math.min(maxScale, scale), 0);
    style.transform = "perspective(1px) translateZ(0) scaleX(".concat(scaleAmount, ") scaley(").concat(scaleAmount, ")");
  }, GetCurve([0, maxScale], 0, false, host.speed));
  Timer(host.speed, function (opacity) {
    return style.opacity = "".concat(Math.max(Math.min(1, opacity), 0));
  }, GetCurve([host.opacity * 0.5, host.opacity, host.opacity * 0.5, host.opacity * 0.125, host.opacity * 0.03, 0], 0, false, host.speed), function () {
    requestAnimationFrame(function () {
      if (host.elements.ripple) {
        host.elements.ripple.removeChild(rippleInner);
      }

      host.isRunning = false;
    });
  });
};

var setOrigin = function setOrigin(host, rippleInner) {
  if (!host.ready) {
    return;
  }

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
};

var effect_ripple_methods_trigger = function trigger(host) {
  return function () {
    return effect_ripple_methods_runStart(host);
  };
};
var effect_ripple_methods_unloadTargets = function unloadTargets(host) {
  if (!host.hasTargets$) {
    return;
  }

  host.targets$.forEach(function (ob$) {
    return ob$();
  });
  host.targets$ = [];
};
var effect_ripple_methods_loadTargets = function loadTargets(host) {
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
      return effect_ripple_methods_runStart(host);
    }));
  });
};
// CONCATENATED MODULE: ./src/components/effect-ripple/elements.js

var effect_ripple_elements_elementSelectors = {
  root: ".effect-ripple-container",
  ripple: ".ripple",
  injectedStyles: "style.injectedStyles"
};
var effect_ripple_elements_setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles);
};
var effect_ripple_elements_elements = {};
Object.keys(effect_ripple_elements_elementSelectors).forEach(function (key) {
  effect_ripple_elements_elements[key] = {
    selector: effect_ripple_elements_elementSelectors[key],
    onChange: key === "injectedStyles" ? function (el, host) {
      return effect_ripple_elements_setStyles(el, host.styles);
    } : function () {}
  };
});
/* harmony default export */ var effect_ripple_elements = (effect_ripple_elements_elements);
// CONCATENATED MODULE: ./src/components/effect-ripple/properties.js




var effect_ripple_properties_resetTargets = function resetTargets(host) {
  effect_ripple_methods_unloadTargets(host);
  effect_ripple_methods_loadTargets(host);
};

var effect_ripple_properties_onChange = function onChange() {};

var effect_ripple_properties_selectorsToDom = function selectorsToDom(val) {
  return SelectorArrayToElements(null, val).value;
};

var effect_ripple_properties_attributes = {
  "class": ComponentClassObject,
  color: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("#59a2d8"))(val).value;
    },
    onChange: effect_ripple_properties_onChange
  },
  opacity: {
    format: function format(val) {
      return Math.min(1, Math.max(0, Pipe(ToNumber, IfInvalid(0.2))(val).value));
    },
    onChange: effect_ripple_properties_onChange
  },
  speed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(600))(val).value;
    },
    onChange: effect_ripple_properties_onChange
  },
  start: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("mousedown"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return effect_ripple_properties_resetTargets(host);
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return effect_ripple_elements_setStyles(host.elements.injectedStyles, val);
    }
  },
  direction: {
    format: function format(val) {
      return typeof val === "string" ? val : "auto";
    },
    onChange: function onChange() {}
  },
  targets: {
    format: effect_ripple_properties_selectorsToDom,
    onChange: function onChange(_val, host) {
      return effect_ripple_properties_resetTargets(host);
    }
  }
}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var effect_ripple_properties_properties = Object.assign({
  downEvent: {
    format: function format(val) {
      return val;
    },
    onChange: effect_ripple_properties_onChange
  },
  targets$: {
    format: function format() {
      return [];
    },
    onChange: effect_ripple_properties_onChange
  }
}, effect_ripple_properties_attributes);
var effect_ripple_properties_observedAttributes = Object.keys(effect_ripple_properties_attributes);
var properties_hasTargets = function hasTargets(host) {
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
var properties_hasStart = function hasStart(host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && !!host.start;
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
var nonAutoOrigin = function nonAutoOrigin(host) {
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
// CONCATENATED MODULE: ./src/components/effect-ripple/index.js



 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var effect_ripple_style = __webpack_require__("./src/components/effect-ripple/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var effect_ripple_template = __webpack_require__("./src/components/effect-ripple/index.html");

var effect_ripple_componentName = "effect-ripple";
var effect_ripple_componentRoot = ".effect-ripple-container";
var EffectRipple =
/*#__PURE__*/
WCConstructor({
  componentName: effect_ripple_componentName,
  componentRoot: effect_ripple_componentRoot,
  template: effect_ripple_template,
  style: effect_ripple_style,
  observedAttributes: effect_ripple_properties_observedAttributes,
  properties: effect_ripple_properties_properties,
  elements: effect_ripple_elements,
  methods: {
    trigger: effect_ripple_methods_trigger
  },
  computed: {
    hasTargets: properties_hasTargets,
    hasTargets$: hasTargets$,
    hasStart: properties_hasStart,
    canLoadTargets: canLoadTargets,
    canStart: properties_canStart,
    nonAutoOrigin: nonAutoOrigin
  },
  onDisconnected: function onDisconnected(host) {
    return effect_ripple_methods_unloadTargets(host);
  }
});
WCDefine(effect_ripple_componentName, EffectRipple);
// CONCATENATED MODULE: ./src/utils/selector-to-elements/index.js

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

  result.valid = result.value.length && result.value.filter(function (e) {
    return IsElement(e).valid;
  }).length;
  return result;
}
// CONCATENATED MODULE: ./src/utils/selector-array-to-all-elements/index.js

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

    target.style.transformOrigin = origin;
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

  if (!host.hasTriggers || !host.start || !host.triggers$) {
    return;
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

var effect_scale_methods_unloadTargets = function unloadTargets(host) {
  return unloadElements(host, "targets");
};
var methods_unloadTriggers = function unloadTriggers(host) {
  return unloadElements(host, "triggers");
};
var effect_scale_methods_loadTargets = function loadTargets(host) {
  return methods_loadElements(host, "targets");
};
var effect_scale_methods_loadTriggers = function loadTriggers(host) {
  return methods_loadElements(host, "triggers");
};
// CONCATENATED MODULE: ./src/components/effect-scale/properties.js



var properties_reset = function reset(host) {
  effect_scale_methods_unloadTargets(host);
  methods_unloadTriggers(host);
  effect_scale_methods_loadTargets(host);
  effect_scale_methods_loadTriggers(host);
  methods_setOrigin(host.startfrom, host);
};

var effect_scale_properties_directions = ["center", "center top", "center bottom", "left top", "left center", "left bottom", "right top", "right center", "right bottom"];

var effect_scale_properties_onChange = function onChange() {};

var effect_scale_properties_selectorsToDom = function selectorsToDom(val) {
  return SelectorArrayToAllElements(null, val).value;
};

var effect_scale_properties_attributes = {
  amount: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(-1))(val).value;
    },
    onChange: effect_scale_properties_onChange
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
    onChange: effect_scale_properties_onChange
  },
  spring: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(4))(val).value;
    },
    onChange: effect_scale_properties_onChange
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
      return Pipe(IndexOf(effect_scale_properties_directions), IfInvalid("center"))(val).value;
    },
    onChange: methods_setOrigin
  },
  targets: {
    format: effect_scale_properties_selectorsToDom,
    onChange: function onChange(_val, host) {
      return properties_reset(host);
    }
  },
  triggers: {
    format: effect_scale_properties_selectorsToDom,
    onChange: function onChange(_val, host) {
      return properties_reset(host);
    }
  },
  x: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: effect_scale_properties_onChange
  },
  y: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: effect_scale_properties_onChange
  }
}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var effect_scale_properties_properties = Object.assign({
  targets$: {
    format: function format() {
      return [];
    },
    onChange: effect_scale_properties_onChange
  },
  triggers$: {
    format: function format() {
      return [];
    },
    onChange: effect_scale_properties_onChange
  },
  isScaling: {
    format: function format(val) {
      return val;
    },
    onChange: effect_scale_properties_onChange
  },
  isScaled: {
    format: function format(val) {
      return val;
    },
    onChange: effect_scale_properties_onChange
  }
}, effect_scale_properties_attributes);
var effect_scale_properties_observedAttributes = Object.keys(effect_scale_properties_attributes);
// CONCATENATED MODULE: ./src/components/effect-scale/elements.js
var effect_scale_elements_elementSelectors = {
  root: ".effect-scale-container"
};
var effect_scale_elements_elements = {}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

Object.keys(effect_scale_elements_elementSelectors).forEach(function (key) {
  effect_scale_elements_elements[key] = {
    selector: effect_scale_elements_elementSelectors[key],
    onChange: function onChange() {}
  };
});
/* harmony default export */ var effect_scale_elements = (effect_scale_elements_elements);
// CONCATENATED MODULE: ./src/components/effect-scale/index.js



 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var effect_scale_style = __webpack_require__("./src/components/effect-scale/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var effect_scale_template = __webpack_require__("./src/components/effect-scale/index.html");

var effect_scale_componentName = "effect-scale";
var effect_scale_componentRoot = ".effect-scale-container";
var EffectScale = WCConstructor({
  componentName: effect_scale_componentName,
  componentRoot: effect_scale_componentRoot,
  template: effect_scale_template,
  style: effect_scale_style,
  observedAttributes: effect_scale_properties_observedAttributes,
  properties: effect_scale_properties_properties,
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
  return methods_runEnd(host);
};

var effect_underline_methods_runAnimation = function runAnimation(host, isOn) {
  var underlineStyle = host.elements.underline.style;

  if (isOn) {
    underlineStyle.opacity = host.opacity;
    effect_underline_methods_setOrigin(host);
  }

  Timer(host.speed, function (scale) {
    return underlineStyle.transform = "perspective(1px) translateZ(0) scaleX(".concat(scale, ")");
  }, GetCurve(isOn ? [0, 1] : [1, 0], isOn ? host.spring : 0.5, false, host.speed), function () {
    return underlineStyle.transform = "perspective(1px) translateZ(0) scaleX(".concat(isOn ? 1 : 0, ")");
  });
};

var methods_runEnd = function runEnd(host) {
  return function () {
    if (!host.canRunEnd) {
      return;
    }

    host.on = false;
    effect_underline_methods_runAnimation(host, false);
  };
};

var effect_underline_methods_runStart = function runStart(host) {
  return function () {
    if (!host.canRunStart) {
      return;
    }

    host.on = true;
    effect_underline_methods_runAnimation(host, true);
    host.downEvent = undefined;
  };
};

var effect_underline_methods_setOrigin = function setOrigin(host) {
  if (!host.ready) {
    return;
  }

  var nonAutoOrigin = host.nonAutoOrigin;
  var underlineStyle = host.elements.underline.style;

  if (nonAutoOrigin) {
    return underlineStyle.transformOrigin = nonAutoOrigin;
  }

  var eventX = host.downEvent.x;
  var targetBox = host.downEvent.target.getBoundingClientRect();
  var left = Math.round((eventX - targetBox.left) / targetBox.width * 100);
  underlineStyle.transformOrigin = "".concat(left, "% center");
};

var effect_underline_methods_toggle = function toggle(host) {
  return host.on ? methods_runEnd(host) : effect_underline_methods_runStart(host);
};
var effect_underline_methods_open = function open(host) {
  return effect_underline_methods_runStart(host);
};
var effect_underline_methods_close = function close(host) {
  return methods_runEnd(host);
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
      host.targets$.push(ObserveEvent(target, host.start).subscribe(effect_underline_methods_runStart(host)));
    }

    if (host.canEnd) {
      host.targets$.push(ObserveEvent(target, host.end).subscribe(signalEnd(host)));
    }
  });
};
// CONCATENATED MODULE: ./src/components/effect-underline/elements.js

var effect_underline_elements_elementSelectors = {
  root: ".effect-underline-container",
  underline: ".underline",
  injectedStyles: "style.injectedStyles"
};
var effect_underline_elements_setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles);
};
var effect_underline_elements_elements = {};
Object.keys(effect_underline_elements_elementSelectors).forEach(function (key) {
  effect_underline_elements_elements[key] = {
    selector: effect_underline_elements_elementSelectors[key],
    onChange: key === "injectedStyles" ? function (el, host) {
      return effect_underline_elements_setStyles(el, host.styles);
    } : function () {}
  };
});
/* harmony default export */ var effect_underline_elements = (effect_underline_elements_elements);
// CONCATENATED MODULE: ./src/components/effect-underline/properties.js




var effect_underline_properties_resetTargets = function resetTargets(host) {
  effect_underline_methods_unloadTargets(host);
  effect_underline_methods_loadTargets(host);
};

var effect_underline_properties_onChange = function onChange() {};

var effect_underline_properties_selectorsToDom = function selectorsToDom(val) {
  return SelectorArrayToElements(null, val).value;
};

var effect_underline_properties_attributes = {
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
    },
    onChange: effect_underline_properties_onChange
  },
  end: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(_val, host) {
      return effect_underline_properties_resetTargets(host);
    }
  },
  opacity: {
    format: function format(val) {
      return Math.min(1, Math.max(0, Pipe(ToNumber, IfInvalid(0.2))(val).value));
    },
    onChange: effect_underline_properties_onChange
  },
  speed: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(700))(val).value;
    },
    onChange: effect_underline_properties_onChange
  },
  start: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("mousedown"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return effect_underline_properties_resetTargets(host);
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return effect_underline_elements_setStyles(host.elements.injectedStyles, val);
    }
  },
  spring: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(4))(val).value;
    },
    onChange: effect_underline_properties_onChange
  },
  targets: {
    format: effect_underline_properties_selectorsToDom,
    onChange: function onChange(_val, host) {
      return effect_underline_properties_resetTargets(host);
    }
  },
  "class": ComponentClassObject
}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var effect_underline_properties_properties = Object.assign({
  downEvent: {
    format: function format(val) {
      return val;
    },
    onChange: effect_underline_properties_onChange
  },
  on: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: effect_underline_properties_onChange
  },
  targets$: {
    format: function format() {
      return [];
    },
    onChange: effect_underline_properties_onChange
  }
}, effect_underline_properties_attributes);
var effect_underline_properties_observedAttributes = Object.keys(effect_underline_properties_attributes);
var effect_underline_properties_hasTargets = function hasTargets(host) {
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
var effect_underline_properties_hasStart = function hasStart(host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.start;
    }
  };
};
var effect_underline_properties_canStart = function canStart(host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.start && host.start !== "none";
    }
  };
};
var properties_canEnd = function canEnd(host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.end && host.end !== "none";
    }
  };
};
var properties_canRunStart = function canRunStart(host) {
  return {
    get: function get() {
      return host.hasTargets && !host.on;
    }
  };
};
var properties_canRunEnd = function canRunEnd(host) {
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



 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var effect_underline_style = __webpack_require__("./src/components/effect-underline/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var effect_underline_template = __webpack_require__("./src/components/effect-underline/index.html");

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
    toggle: effect_underline_methods_toggle,
    open: effect_underline_methods_open,
    close: effect_underline_methods_close
  },
  computed: {
    hasTargets: effect_underline_properties_hasTargets,
    hasTargets$: properties_hasTargets$,
    hasStart: effect_underline_properties_hasStart,
    canLoadTargets: properties_canLoadTargets,
    canStart: effect_underline_properties_canStart,
    canEnd: properties_canEnd,
    canRunStart: properties_canRunStart,
    canRunEnd: properties_canRunEnd,
    nonAutoOrigin: properties_nonAutoOrigin
  },
  onDisconnected: function onDisconnected(host) {
    return effect_underline_methods_unloadTargets(host);
  }
});
WCDefine(effect_underline_componentName, EffectUnderline);
// CONCATENATED MODULE: ./src/components/grid-layout/index.js
 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var grid_layout_style = __webpack_require__("./src/components/grid-layout/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var grid_layout_template = __webpack_require__("./src/components/grid-layout/index.html");

var grid_layout_componentName = "grid-layout";
var grid_layout_componentRoot = ".".concat(grid_layout_componentName, "-container");
var defaultWidth = "15em";
var defaultGap = "1em";

var grid_layout_setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles);
};

var grid_layout_setDimensions = function setDimensions(host) {
  var canDoGrid = typeof host.style.grid === "string";
  var gap = host.gap || defaultGap;
  var columnwidth = host.columnwidth || defaultWidth;
  var componentStyle = host.shadowRoot.querySelector("style[name=\"\"]");
  var themeStyles = host.elements.themeStyles;
  var injectedStyles = host.elements.injectedStyles;
  var outerStyle = host.querySelector("style[name=\"outer\"]");
  var unsupportedCSS = canDoGrid ? "" : ".grid-layout-items{margin-left:-".concat(gap, ";margin-right:-").concat(gap, ";}.grid-layout-items .grid-layout-item{max-width:").concat(columnwidth, ";margin:").concat(gap, ";}");
  var styleString = [grid_layout_style, themeStyles ? themeStyles.innerHTML : "", injectedStyles ? injectedStyles.innerHTML : "", ".grid-layout-items{grid-gap:".concat(gap, "; grid-template-columns:repeat(auto-fit, minmax(").concat(columnwidth, ", 0fr));}").concat(unsupportedCSS)].join("");

  if (!outerStyle) {
    AppendStyleElement(styleString, host, "outer");
    outerStyle = host.querySelector("style[name=\"outer\"]");
    outerStyle.nongrid = true;
  }

  grid_layout_setStyles(componentStyle, styleString);
  grid_layout_setStyles(outerStyle, styleString);
};

var grid_layout_elements = {
  root: {
    selector: grid_layout_componentRoot
  },
  itemsContainer: {
    selector: ".".concat(grid_layout_componentName, "-items")
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: function onChange(el, host) {
      return grid_layout_setStyles(el, host.styles);
    }
  },
  themeStyles: {
    selector: "style.themeStyles",
    onChange: function onChange(el, host) {
      return grid_layout_setStyles(el, host.theme);
    }
  }
};
var grid_layout_properties = {
  columnwidth: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(defaultWidth))(val).value;
    },
    onChange: function onChange(_val, host) {
      return grid_layout_setDimensions(host);
    }
  },
  gap: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(defaultGap))(val).value;
    },
    onChange: function onChange(_val, host) {
      return grid_layout_setDimensions(host);
    }
  },
  styles: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(val, host) {
      return grid_layout_setStyles(host.elements.injectedStyles, val);
    }
  },
  theme: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(val, host) {
      return grid_layout_setStyles(host.elements.themeStyles, val);
    }
  }
};

var grid_layout_getComponentStyles = function getComponentStyles(host) {
  return function () {
    return "".concat(__webpack_require__("./src/components/grid-layout/style.scss").toString()).concat(host.theme || "").concat(host.styles);
  };
};

var GridLayout = WCConstructor({
  componentName: grid_layout_componentName,
  componentRoot: grid_layout_componentRoot,
  template: grid_layout_template,
  style: grid_layout_style,
  observedAttributes: Object.keys(grid_layout_properties),
  properties: grid_layout_properties,
  elements: grid_layout_elements,
  computed: {
    items: function items(host) {
      return {
        get: function get() {
          Array.from(host.children).filter(function (el) {
            return el.tagName.toLowerCase() !== "style";
          });
        }
      };
    }
  },
  methods: {
    getComponentStyles: grid_layout_getComponentStyles
  },
  onConnected: function onConnected(host) {
    var itemsContainer = host.elements.itemsContainer; // const spanValue = span => !HasNonDigits(span).valid ? `span ${span}` : span === `full` ? `1 / -1` : span
    // const setSpan = (el, span) => Set(el, `container.style.gridColumn`, spanValue(span))

    var wrapItem = function wrapItem(el) {
      var id = ID();
      var slotWrapper = document.createElement("div");
      slotWrapper.className = "grid-layout-item";
      slotWrapper.id = id; // setSpan(el, Get(el, `span`, host.subsections))

      itemsContainer.appendChild(slotWrapper);
      var slot = document.createElement("slot");
      slot.name = id;
      slotWrapper.appendChild(slot);
      el.slot = id;
      el.container = slotWrapper;
      return el;
    };

    var observeEl = function observeEl(el) {
      if (el.nongrid) {
        return;
      }

      wrapItem(el); // const element = wrapItem(el)
      // Set(
      //     element,
      //     `eventSubscriptions.span`,
      //     new MutationObserver(mutationsList => {
      //         const list = Array.from(mutationsList)
      //         while (list.length) {
      //             const mutation = list.shift()
      //             if (mutation.type === `attributes` && mutation.attributeName === `span`) {
      //                 // const span = element.getAttribute('span') || host.subsections
      //                 // setSpan(element, span)
      //             }
      //         }
      //     })
      // )
      // element.eventSubscriptions.span.observe(element, { attributes: true })
    };

    var disconnectEl = function disconnectEl(el) {
      var containerParent = Object(utils_get["a" /* Get */])(el, "container.parentElement");
      Object(utils_get["a" /* Get */])(el, "eventSubscriptions.span.disconnect()");

      if (containerParent) {
        containerParent.removeChild(el.container);
      }
    };

    Array.from(host.children).forEach(observeEl);
    host.slotObserver = new MutationObserver(function (mutationsList) {
      var list = Array.from(mutationsList);

      while (list.length) {
        var mutation = list.shift();

        if (mutation.type === "childList") {
          Array.from(mutation.addedNodes).forEach(observeEl);
          Array.from(mutation.removedNodes).forEach(disconnectEl);
        }
      }
    });
    host.slotObserver.observe(host, {
      childList: true
    });
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
var horizontal_slider_elements_setStyles = function setStyles(el, host, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles || host.styles);
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
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: horizontal_slider_elements_setStyles
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
  "class": ComponentClassObject,
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return horizontal_slider_elements_setStyles(host.elements.injectedStyles, host, val);
    }
  },
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



 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var horizontal_slider_style = __webpack_require__("./src/components/horizontal-slider/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var horizontal_slider_template = __webpack_require__("./src/components/horizontal-slider/index.html");

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
// CONCATENATED MODULE: ./src/utils/observe-worker/index.js

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
        id: ID()
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
// CONCATENATED MODULE: ./src/components/icon-element/index.js
 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var icon_element_style = __webpack_require__("./src/components/icon-element/style.scss").toString();

var icon_element_elementSelectors = {
  root: ".icon-element-container",
  svgContainer: ".svg-container",
  injectedStyles: "style.injectedStyles"
};

var icon_element_setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles);
};

var icon_element_elements = {}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

Object.keys(icon_element_elementSelectors).forEach(function (key) {
  icon_element_elements[key] = {
    selector: icon_element_elementSelectors[key],
    onChange: key === "injectedStyles" ? function (el, host) {
      return icon_element_setStyles(el, host.styles);
    } : function () {}
  };
});
var AvailableIcons = {};

var icon_element_getIcon = function getIcon(path) {
  if (!path) {
    if (!AvailableIcons[path]) {
      AvailableIcons[path] = Observer("");
    }

    AvailableIcons[path].next("");
    return Promise.resolve(AvailableIcons[path]);
  }

  return new Promise(function (resolve) {
    if (path.slice(0, 5) === "<svg") {
      return resolve(Observer(path));
    }

    if (path.indexOf("https://") === -1 && path.indexOf("http://") === -1) {
      path = "".concat(location.protocol, "//").concat(location.host).concat(path[0] === "/" ? path : "/".concat(path));
    }

    if (AvailableIcons[path]) {
      return resolve(AvailableIcons[path]);
    }

    AvailableIcons[path] = Observer("");
    resolve(AvailableIcons[path]);
    var worker$ = ObserveWorker(function () {
      self.onmessage = function (e) {
        var xhr = new XMLHttpRequest();
        var data = JSON.parse(e.data);
        xhr.open(data.method, data.path, false);

        xhr.onload = function () {
          return postMessage({
            status: xhr.status,
            svg: xhr.responseText
          });
        };

        xhr.send();
      };
    });
    var workerSubscription = worker$.subscribe(function (e) {
      workerSubscription();
      AvailableIcons[path].next(e.svg);
    }, function (e) {
      workerSubscription();
      AvailableIcons[path].error(e.status);
    });
    worker$.post({
      path: path,
      method: "GET"
    });
  });
};

var trySet = function trySet(host, icon) {
  if (!host.elements.svgContainer) {
    return requestAnimationFrame(function () {
      return trySet(host, icon);
    });
  }

  host.elements.svgContainer.innerHTML = icon;
  host.dispatchEvent(new CustomEvent("iconloaded", {
    detail: host
  }));
};

var icon_element_attributes = {
  type: {
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

      return icon_element_getIcon(value).then(function (subject) {
        host.subscription = subject.subscribe(function (icon) {
          trySet(host, icon);
        });
      });
    }
  },
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

      host.elements.svgContainer.innerHTML = value;
      host.dispatchEvent(new CustomEvent("iconloaded", {
        detail: host
      }));
    }
  },
  color: {
    format: function format(val) {
      return typeof val === "string" ? val : null;
    },
    onChange: function onChange(value, host) {
      return host.elements.svgContainer.style.color = value;
    }
  },
  size: {
    format: function format(val) {
      return typeof val === "string" ? val : "1.5em";
    },
    onChange: function onChange(value, host) {
      return host.elements.svgContainer.style.height = host.elements.svgContainer.style.width = value;
    }
  },
  "class": ComponentClassObject,
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return icon_element_setStyles(host.elements.injectedStyles, val);
    }
  }
}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var icon_element_properties = Object.assign({}, {
  subscription: {
    format: function format(val) {
      return val;
    }
  }
}, icon_element_attributes); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var icon_element_template = __webpack_require__("./src/components/icon-element/index.html");

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
// CONCATENATED MODULE: ./src/components/image-loader/index.js
 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var image_loader_style = __webpack_require__("./src/components/image-loader/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var image_loader_template = __webpack_require__("./src/components/image-loader/index.html");

var image_loader_componentName = "image-loader";
var image_loader_componentRoot = ".image-loader-container";

var image_loader_setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles);
};

var image_loader_setStyleElement = function setStyleElement(host) {
  var outerStyle = host.querySelector("style[name=\"outer\"]");
  var componentStyle = host.shadowRoot.querySelector("style[name=\"\"]");
  var styleString = [image_loader_style, host.theme, host.styles].join("");

  if (!outerStyle) {
    AppendStyleElement(styleString, host, "outer");
    outerStyle = host.querySelector("style[name=\"outer\"]");
  }

  image_loader_setStyles(host.elements.themedStyles, styleString);
  image_loader_setStyles(componentStyle, styleString);
  image_loader_setStyles(outerStyle, styleString);
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
  theme: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(_val, host) {
      return image_loader_setStyleElement(host);
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
  themedStyles: {
    selector: "style.themeStyles",
    onChange: function onChange(_el, host) {
      return image_loader_setStyleElement(host);
    }
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
  observedAttributes: image_loader_observedAttributes,
  properties: image_loader_properties,
  elements: image_loader_elements,
  methods: image_loader_methods,
  onConnected: function onConnected(host) {
    image_loader_setStyleElement(host);
    setInternalStyle(host);
  }
});
WCDefine(image_loader_componentName, ImageLoader);
// CONCATENATED MODULE: ./src/utils/to-object/index.js






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
// CONCATENATED MODULE: ./src/utils/set/index.js
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
// CONCATENATED MODULE: ./src/utils/validate-number/index.js

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
// CONCATENATED MODULE: ./src/utils/validate-bool/index.js
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
// CONCATENATED MODULE: ./src/utils/validate-email/index.js

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
// CONCATENATED MODULE: ./src/utils/validate-us-phone/index.js

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
// CONCATENATED MODULE: ./src/utils/validate-intl-phone/index.js

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
// CONCATENATED MODULE: ./src/utils/remove-meta/index.js

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
// CONCATENATED MODULE: ./src/utils/to-digits/index.js

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
// CONCATENATED MODULE: ./src/utils/to-join-meta/index.js
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
// CONCATENATED MODULE: ./src/utils/to-join/index.js

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
// CONCATENATED MODULE: ./src/utils/to-us-zip/index.js

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
// CONCATENATED MODULE: ./src/utils/validate-us-zip/index.js

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
// CONCATENATED MODULE: ./src/utils/validate-url/index.js

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
// CONCATENATED MODULE: ./src/utils/validate-text/index.js

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
// CONCATENATED MODULE: ./src/utils/to-slice/index.js

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
// CONCATENATED MODULE: ./src/utils/to-match-meta/index.js

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
// CONCATENATED MODULE: ./src/utils/to-match/index.js

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
// CONCATENATED MODULE: ./src/utils/to-match-all/index.js

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
// CONCATENATED MODULE: ./src/utils/to-replacement-pattern/index.js

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
// CONCATENATED MODULE: ./src/utils/to-replace-meta/index.js

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
// CONCATENATED MODULE: ./src/utils/to-replace/index.js

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
// CONCATENATED MODULE: ./src/utils/to-upper-case/index.js

function ToUpperCase(string) {
  var result = TMonad(string);

  try {
    result.value = result.value.toUpperCase();
  } catch (error) {
    result.valid = false;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/to-lower-case/index.js

function ToLowerCase(string) {
  var result = TMonad(string);

  try {
    result.value = result.value.toLowerCase();
  } catch (error) {
    result.valid = false;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/to-capitalize/index.js

function ToCapitalize(string) {
  var result = TMonad(string);

  try {
    result.value = "".concat(result.value.slice(0, 1).toUpperCase()).concat(result.value.slice(1) || "");
  } catch (error) {
    result.valid = false;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/after-every-nth/index.js

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
// CONCATENATED MODULE: ./src/utils/before-every-nth/index.js

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
// CONCATENATED MODULE: ./src/utils/to-phone/index.js

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
// CONCATENATED MODULE: ./src/utils/to-intl-phone/index.js

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
// CONCATENATED MODULE: ./src/utils/is-autofilled/index.js
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
// CONCATENATED MODULE: ./src/utils/set-caret/index.js
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
// CONCATENATED MODULE: ./src/components/input-field/definitions.js
var labelPositions = ["top", "bottom", "left", "right", "inside"];
var resizeOptions = ["true", "false", "horizontal", "vertical", "auto"];
var InputFieldInputAttributes = {
  all: ["accept", "aria-describedby", "aria-labelledby", "autocomplete", "autofocus", "disabled", "id", "maxlength", "name", "placeholder", "readonly", "required", "tabindex", "value"],
  bool: ["aria-describedby", "aria-labelledby", "disabled", "id", "name", "readonly", "required", "tabindex", "value"]
};
var supportedInputTypes = ["file", "email", "password", "url", "text", "textarea", "number", "radio", "checkbox", "tel", "usphone", "intlphone", "uszip"];
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
// CONCATENATED MODULE: ./src/components/input-field/methods-value.js
/* eslint-disable no-fallthrough */



var setMaskPositions = function setMaskPositions(input, positions) {
  if (!input) {
    return;
  }

  if (input.setSelectionRange) {
    input.setSelectionRange(positions[0], positions[1]);
  } else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd("character", positions[1]);
    range.moveStart("character", positions[0]);
    range.select();
  }
};
var valueToMask = function valueToMask(value, masks, positions) {
  var initial = "+_ (___) ___-____";
  var newPositions = positions.slice(0);

  if (!value) {
    return {
      value: initial,
      positions: [1, 1]
    };
  }

  var incrementPositions = function incrementPositions(index) {
    if (positions[0] > index) {
      newPositions[0] = newPositions[0] + 1;
    }

    if (positions[1] > index) {
      newPositions[1] = newPositions[1] + 1;
    }
  };

  var getAreaCode = function getAreaCode(v) {
    var parts = v.split(/\D/g);
    var i = 0;

    while (i < parts.length) {
      if (parts[i] !== "") {
        return parts[i];
      }

      i = i + 1;
    }

    return "";
  };

  var valueAreaCode = getAreaCode(value);
  var possibles = [];
  var mask;
  var i = masks.length;

  while (!mask && i--) {
    var maskAreaCode = getAreaCode(masks[i].mask);

    if (valueAreaCode === maskAreaCode) {
      mask = masks[i].mask;
      break;
    }

    if (maskAreaCode.indexOf(valueAreaCode) === 0 || valueAreaCode.indexOf(maskAreaCode) === 0) {
      possibles.push(masks[i].mask);
    }
  }

  if (!mask && possibles[0]) {
    mask = possibles[0];
  }

  if (!mask) {
    return {
      value: "",
      positions: positions
    };
  }

  var valueParts = value.split("");
  var newValue = mask.split("").map(function (_char, index) {
    if (_char === valueParts[0]) {
      valueParts.shift();
      return _char;
    }

    if (_char === "#") {
      if (!valueParts.length) {
        // incrementPositions(index)
        return "_";
      }

      var v = valueParts.shift();

      while (v && /\D/.test(v)) {
        v = valueParts.shift();
      }

      return v;
    }

    if (/\d/.test(_char)) {
      valueParts.shift();
    } else {
      incrementPositions(index);
    }

    return _char;
  });
  return {
    value: newValue.join(""),
    positions: newPositions
  };
};
var valueFromMask = function valueFromMask(value, masks) {
  if (!value) {
    return value;
  }

  var split = function split(v) {
    return v.split(/\D/g).filter(function (v) {
      return !!v;
    });
  };

  var valueParts = split(value);
  var mask;
  var i = masks.length;

  while (i--) {
    var maskCode = split(masks[i].mask)[0];

    if (valueParts[0] === maskCode || maskCode.indexOf(valueParts[0]) > -1) {
      mask = masks[i].mask;
    }
  }

  if (!mask) {
    return value;
  }
};
var masker = function masker(input, value, positions, masks) {
  var unmask = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (!masks || masks.length === 0) {
    return {
      input: input,
      value: value,
      newValue: value,
      masks: masks,
      positions: positions
    };
  }

  var newValue;

  if (unmask) {
    newValue = valueFromMask(value, masks);
  } else {
    newValue = valueToMask(value, masks, positions);
  }

  input.value = newValue.value || "";
  setMaskPositions(input, newValue.positions);
  return {
    input: input,
    value: value,
    newValue: newValue.value,
    masks: masks,
    positions: newValue.positions
  };
};
var inputCaretPositions = function inputCaretPositions(input) {
  return !input ? [0, 0] : [input.selectionStart || 0, input.selectionEnd || 0];
};
var clearInput = function clearInput(host) {
  return host.value = "";
};
var setError = function setError(host) {
  return function (error) {
    host.processedError = error;
    host.invalid = !error ? false : true;
  };
};
var isEmpty = function isEmpty(val) {
  return val === "" || val === null || val === undefined;
};
var methods_value_sanitizeValue = function sanitizeValue(val, type, allowhtml, disallowhtml) {
  if (Array.isArray(type)) {
    return type.map(function (t, i) {
      return sanitizeValue(val[i], t.type, allowhtml, disallowhtml);
    });
  }

  var validation;

  switch (type) {
    case "number":
    case "month":
      validation = ValidateNumber(val);
      break;

    case "radio":
    case "checkbox":
      validation = ValidateBool(val);
      break;

    case "email":
      validation = ValidateEmail(val);
      break;

    case "tel":
    case "usphone":
      validation = ValidateUsPhone(val);
      break;

    case "intlphone":
      validation = ValidateIntlPhone(val);
      break;

    case "uszip":
      validation = ValidateUsZip(val);
      break;

    case "url":
      validation = ValidateUrl(val);
      break;

    case "file":
      validation = processedFileValue(val);
      break;

    default:
      if (allowhtml || disallowhtml) {
        validation = ValidateHtml(val, allowhtml, disallowhtml);
      } else {
        validation = ValidateText(val);
      }

  }

  if (validation && !validation.valid && validation.reason[0] === "no value") {
    validation.reason.shift();
    validation.valid = true;
  }

  return validation;
};

var methods_value_getFunction = function getFunction(functionString) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  switch (functionString) {
    case "Slice":
    case "slice":
      return ToSlice.apply(null, args || []);

    case "Split":
    case "split":
      return ToSplit(args[0]);

    case "Join":
    case "join":
      return ToJoin(args[0]);

    case "Match":
    case "match":
      return ToMatch.call(null, args[0]);

    case "MatchAll":
      return ToMatchAll.call(null, args[0]);

    case "Replace":
    case "replace":
      return ToReplace.apply(null, args || []);

    case "UpperCase":
    case "toUpperCase":
      return ToUpperCase;

    case "LowerCase":
    case "toLowerCase":
      return ToLowerCase;

    case "Capitalize":
      return ToCapitalize;

    case "AfterEveryNth":
      return AfterEveryNth.apply(null, args || []);

    case "BeforeEveryNth":
      return BeforeEveryNth.apply(null, args || []);
  }

  return TMonad;
};

var methods_value_InputFieldFormatValue = function InputFieldFormatValue(value, format) {
  if (!format) {
    return TMonad(value);
  }

  var Format;

  if (typeof format === "string") {
    try {
      Format = JSON.parse(format).slice();
    } catch (error) {
      switch (format) {
        case "tel":
        case "telephone":
        case "phone":
        case "usphone":
          return ToPhone(value);

        case "intlphone":
          return ToIntlPhone(value);

        case "uszip":
          return ToUsZip(value);
      }

      return TMonad(value);
    }
  } else if (!Array.isArray(format)) {
    return TMonad(value);
  }

  var functions = Format.map(function (f) {
    if (!f) {
      return false;
    }

    if (!Array.isArray(f)) {
      return methods_value_getFunction(f);
    }

    return methods_value_getFunction(f.slice(0, 1)[0], f.slice(1));
  }).filter(function (f) {
    return !!f;
  });
  return Pipe.apply(null, functions)(value);
};
var maxMin = function maxMin(host, value) {
  var nonStringTypes = ["number", "checkbox", "radio", "file"];
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
  }

  if (nonStringTypes.indexOf(host.type) === -1) {
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
};
var methods_value_pattern = function pattern(host, value) {
  if (!host.pattern) {
    return value;
  }

  return RemoveMeta(value, host.pattern).value;
};
var getFileValue = function getFileValue(input) {
  return !input || !input.files || input.files.length === 0 ? null : Array.from(input.files);
};

var getDroppedFiles = function getDroppedFiles(value) {
  return Array.isArray(value) && value.filter(function (f) {
    return f instanceof File;
  }).length ? value : null;
};

var methods_value_processValue = function processValue(host) {
  var input = host.elements.input;

  if (!input) {
    return;
  }

  var processed = host.processedValue;
  var sanitized = processed.sanitized;
  host.processedError = processed.reason.join(", ");
  var errors = host.validationMessage;
  var valid = (errors.length ? false : processed.valid) || !host.focused && host.valid;
  var autofilled = IsAutoFilled(input);
  var stringEmpty = (isNaN(sanitized) || typeof sanitized === "string") && !sanitized.length;
  var empty = stringEmpty && !autofilled;
  host.count = host.type === "number" ? sanitized : sanitized ? sanitized.length : 0;
  host.elements.container.classList[sanitized ? "add" : "remove"]("checked");

  if (host.type === "file") {
    var files = getDroppedFiles(sanitized) || getFileValue(input);
    var filenames = !files ? [] : files.map(function (f) {
      return f.name;
    });
    SetAttribute(host.elements.inputContainer, "title", filenames.join(", "));

    try {
      input.files = (new ClipboardEvent("").clipboardData || new DataTransfer()).files;
    } catch (error) {}

    if (!filenames.length && host.pathvalue) {
      host.notempty = true;
      return;
    } else if (filenames.length) {
      host.pathvalue = "";
    }
  } else {
    try {
      var selectionEnd = input.selectionEnd;
      var cursorPosition = selectionEnd; // masker(input, sanitized, [input.selectionStart, input.selectionEnd], countries)

      var formatted = methods_value_InputFieldFormatValue(sanitized, host.format || host.type);
      var newValue = formatted.value || "";
      var current = input.value;

      if (formatted.stringChanges && formatted.stringChanges.length) {
        formatted.stringChanges.forEach(function (change) {
          if (!!change.added && !!change.removed && change.start < cursorPosition) {
            return cursorPosition = cursorPosition + (change.added.length - change.removed.length);
          }

          if (!!change.removed && change.start < cursorPosition) {
            return cursorPosition = cursorPosition - change.removed.length;
          }

          if (!!change.added && change.start < cursorPosition) {
            return cursorPosition = cursorPosition + change.added.length;
          }
        });
      }

      input.cursorPosition = cursorPosition;

      if (current !== newValue || host.type === "intlphone") {
        input.value = newValue;

        if (formatted.stringChanges && formatted.stringChanges.length) {
          SetCaret(input, cursorPosition, host.shadowRoot);
        }
      }
    } catch (error) {}
  }

  textareaHeight(host.resize, input);
  host.notempty = !empty;

  if (valid) {
    return host.invalid = false;
  }

  if (empty) {
    return host.invalid = false;
  }

  if (!host.focused) {
    return host.invalid = true;
  }
};
// CONCATENATED MODULE: ./src/utils/get-input-value/index.js
function GetInputValue(input) {
  var type = input.type;

  if (type === "checkbox" || type === "radio") {
    return input["checked"];
  }

  if (type === "select" && input["selectedOptions"]) {
    var value = Array.from(input["selectedOptions"]).map(function (o) {
      return o.value;
    });

    if (value.length < 2) {
      return value[0];
    }

    return value;
  }

  return input.value;
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
// CONCATENATED MODULE: ./src/components/input-field/methods-events.js


var methods_events_dispatch = function dispatch(host, type, data) {
  return host.dispatchEvent(new CustomEvent(type, {
    detail: data ? data : data === false ? false : host.state
  }));
};
var methods_events_onInput = function onInput(host) {
  var input = host.elements.input;
  var value = GetInputValue(input);

  if (host.type === "file") {
    value = UseIf(function (v) {
      return v.length;
    }, function () {
      return "";
    }, getFileValue(input)).value;
  }

  host.value = value;
  methods_events_dispatch(host, "inputchange", host.value);
};
var methods_events_onFocus = function onFocus(host) {
  if (host.focused) {
    return;
  }

  host.focused = true;
  host.setAttribute("focused", "true");
  methods_value_processValue(host);
  methods_events_dispatch(host, "focus", host);
};
var methods_events_onBlur = function onBlur(host) {
  if (!host.focused) {
    return;
  }

  host.focused = false;
  host.setAttribute("focused", "false");
  methods_events_dispatch(host, "blur", host);
  host.elements.input.blur();
  methods_value_processValue(host);
};
var onKeyDown = function onKeyDown(e, host) {
  if (!e) {
    return;
  }

  if (e.key && e.key.toLowerCase() === "enter" && host.type !== "textarea") {
    return onDone(host);
  }
};
var onLabelClick = function onLabelClick(e, host) {
  var input = host.elements.input;

  if (!input) {
    return;
  }

  methods_events_dispatch(host, "labelClick", host);

  if (["checkbox", "radio"].indexOf(host.type) === -1) {
    var bounceZ = host.elements.bounceZ;
    var ripple = host.elements.ripple;

    if (bounceZ) {
      bounceZ.trigger();
    }

    if (ripple) {
      ripple.trigger(e);
    }
  } else {
    input.focus();
  }
};
var onDone = function onDone(host) {
  var input = host.elements.input;

  if (!input) {
    return;
  }

  input.blur();
  var valid = host.valid;
  var error = host.validationMessage.join(", ");

  if (!valid && error) {
    return host.setError(error);
  }

  methods_events_dispatch(host, "done", {
    processedValue: host.processedValue,
    value: host.value,
    valid: valid,
    error: error
  });
};
var onInvalid = function onInvalid(host) {
  return methods_events_dispatch(host, "invalid", {
    processedValue: host.processedValue,
    value: host.value,
    error: host.validationMessage.join(", ")
  });
};
var methods_events_setDroppable = function setDroppable(host) {
  var input = host.elements.input;
  var container = host.elements.container;

  function drop(e) {
    host.value = UseIf(function (v) {
      return v.length > 0;
    }, function () {
      return "";
    }, !host.accept ? Array.from(e.detail.files) : Array.from(e.detail.files).filter(function (file) {
      return host.accept.indexOf(file.type) > -1;
    })).value;
    methods_value_processValue(host);
    methods_events_dispatch(host, "input", host.value);
  }

  if (!input || !container) {
    return;
  }

  if (container.dragDrop && typeof container.dragDrop.destroy === "function") {
    container.dragDrop.destroy();
  }

  if (container.drop$ && typeof container.drop$ === "function") {
    container.drop$();
  }

  if (container.dragended$ && typeof container.dragended$ === "function") {
    container.dragended$();
  }

  if (container.dragstarted$ && typeof container.dragstarted$ === "function") {
    container.dragstarted$();
  }

  if (!host.droppable) {
    return;
  }

  container.dragDrop = DragDropService(container);
  container.drop$ = ObserveEvent(container, "dropped").subscribe(drop);
  container.dragended$ = ObserveEvent(container, "dragended").subscribe(function () {
    return document.body.classList.remove("dragging-elements");
  });
  container.dragstarted$ = ObserveEvent(container, "dragstarted").subscribe(function () {
    return document.body.classList.add("dragging-elements");
  });
};
// CONCATENATED MODULE: ./src/components/input-field/elements.js




var input_field_elements_setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles);
}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var input_field_elements_elementSelectors = Object.freeze({
  bounceZ: ".input-field-input-container effect-bounce-z",
  checkIcon: ".input-field-checkbox-icon",
  clearButton: ".input-field-clear",
  container: ".input-field-container-inner",
  count: ".input-field-character-count",
  error: ".input-field-message-error",
  help: ".input-field-message-help",
  icon: ".input-field-icon",
  inputContainer: ".input-field-input-container-inner",
  inputContainerOuter: ".input-field-input-container",
  input: ".input-field-input",
  label: ".input-field-container-inner label",
  max: ".input-field-character-count-max",
  ripple: ".input-field-input-container effect-ripple",
  root: ".input-field-container",
  underline: ".input-field-input-container effect-underline",
  injectedStyles: "style.injectedStyles",
  themeStyles: "style.themeStyles",
  filePathInput: ".input-field-file-path-overlay"
});

var elements_setInputEvents = function setInputEvents(input, host) {
  if (host.inputContainerClick$) {
    host.inputContainerClick$();
  }

  input.eventSubscriptions = {
    onFocus: ObserveEvent(input, "focus").subscribe(function () {
      return methods_events_onFocus(host);
    }),
    onBlur: ObserveEvent(input, "blur").subscribe(function () {
      return methods_events_onBlur(host);
    }),
    onKeyDown: ObserveEvent(input, "keydown").subscribe(function (e) {
      return onKeyDown(e, host);
    })
  };

  if (["checkbox", "radio"].indexOf(host.type) > -1) {
    host.inputContainerClick$ = ObserveEvent(host.elements.inputContainer, "click", {
      stopPropagation: true,
      preventDefault: true
    }).subscribe(function () {
      host.value = !host.value;
      methods_events_dispatch(host, "input", host.value);
      methods_events_dispatch(host, "inputchange", host.value);
    });
  } else if (host.type === "intlphone") {
    input.eventSubscriptions.onInput = ObserveEvent(input, "inputchange").subscribe(function (e) {
      host.value = e.detail;
    });
  } else {
    input.eventSubscriptions.onInput = ObserveEvent(input, "input").subscribe(function () {
      methods_events_onInput(host);
    });
  }
};

var elements_setElementColor = function setElementColor(element, property, color) {
  return element ? Set(element, property, color) : undefined;
};

var setColors = function setColors(host, invalid) {
  var color = invalid ? host.warningcolor : host.accentcolor;
  elements_setElementColor(host.elements.ripple, "color", color);
  elements_setElementColor(host.elements.underline, "color", color);

  if (["checkbox", "radio"].indexOf(host.type) > -1) {
    elements_setElementColor(host.elements.inputContainer, "style.color", color);
  }
};
var elements_elementMethods = {
  input: function input(_input, host) {
    methods_elements_inputAttributeList(host).forEach(function (attr) {
      return attr === "value" ? methods_elements_setInputValue(_input, host) : AddRemoveAttribute(_input, attr, host[attr]);
    });
    elements_setInputEvents(_input, host);
    methods_elements_setInputID(host, host.inputID);
    setEffects(host);
    methods_events_setDroppable(host);
  },
  clearButton: function clearButton(el, host) {
    el.eventSubscriptions = {
      click: ObserveEvent(el, "click").subscribe(function () {
        return clearInput(host);
      })
    };
  },
  label: function label(el, host) {
    el.eventSubscriptions = {
      click: ObserveEvent(el, "click").subscribe(function (e) {
        return onLabelClick(e, host);
      })
    };
  },
  ripple: function ripple(_el, host) {
    return setColors(host, host.invalid);
  },
  underline: function underline(_el, host) {
    return setColors(host, host.invalid);
  },
  injectedStyles: function injectedStyles(el, host) {
    return input_field_elements_setStyles(el, host.styles);
  },
  themeStyles: function themeStyles(el, host) {
    return input_field_elements_setStyles(el, host.theme);
  },
  icon: function icon(el, host) {
    el.eventSubscriptions = {
      click: ObserveEvent(el, "click").subscribe(function () {
        // const input = host.elements.input
        // if (input) {
        //     input.focus()
        // }
        host.dispatchEvent(new CustomEvent("iconclick", {
          detail: host
        }));
      })
    };
  },
  filePathInput: function filePathInput(el, host) {
    if (host.type === "file" && host.pathvalue) {
      el.value = host.pathvalue;
      return;
    }

    el.value = "";

    if (host.type !== "file") {
      el.style.display = "none";
    }
  }
};
var input_field_elements_elements = {}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

Object.keys(input_field_elements_elementSelectors).forEach(function (key) {
  input_field_elements_elements[key] = {
    selector: input_field_elements_elementSelectors[key],
    onChange: elements_elementMethods[key] ? elements_elementMethods[key] : function () {}
  };
});
/* harmony default export */ var input_field_elements = (input_field_elements_elements);
// CONCATENATED MODULE: ./src/components/input-field/methods-elements.js



var setDefaultLabelPosition = function setDefaultLabelPosition(host) {
  return ["checkbox", "radio"].indexOf(host.type) === -1 ? "inside" : "left";
};

var tagType = function tagType(type) {
  return type === "textarea" ? "textarea" : "input";
};

var getInputType = function getInputType(tag, type) {
  if (tag === "input") {
    switch (type) {
      case "checkbox":
      case "date":
      case "email":
      case "file":
      case "number":
      case "password":
      case "radio":
      case "tel":
      case "url":
        return type;
    }

    return "text";
  }

  return false;
};

var methods_elements_setInputValue = function setInputValue(input, host) {
  SetAttribute(input, "value", host.processedValue.original);
  return input;
};
var methods_elements_setInput = function setInput(host) {
  var inputContainer = host.elements.inputContainer;

  if (!inputContainer) {
    return;
  }

  var currentInput = host.elements.input;

  if (currentInput && typeof currentInput.dispose === "function") {
    currentInput.dispose();
  }

  var filePathInput = host.elements.filePathInput;

  if (filePathInput) {
    filePathInput.style.display = host.type !== "file" ? "none" : "block";
  }

  if (host.type && Array.isArray(host.type) && host.type.length) {
    var container = document.createElement("div");
    container.className = "".concat(input_field_elements_elementSelectors.input.split(".").join(""), " multi-input");
    container.inputElements = [];
    container.focusedElement = null;
    container.tabIndex = -1;
    host.type.forEach(function (type) {
      var input = type.type === "span" ? document.createElement("span") : methods_elements_createInput(type.type);
      input.className = "input-field-input-input";
      container.appendChild(input);

      if (type.type !== "span") {
        Object.keys(type).forEach(function (key) {
          if (key !== "type") {
            input[key] = type[key];
          }
        });
        container.inputElements.push(input);
        input.eventSubscriptions = {
          input: ObserveEvent(input, "input").subscribe(function () {
            return container.dispatchEvent(new Event("input"));
          }),
          focus: ObserveEvent(input, "focus").subscribe(function () {
            if (!container.focusedElement) {
              container.dispatchEvent(new Event("focus"));
            }

            container.focusedElement = input;
          }),
          blur: ObserveEvent(input, "blur").subscribe(function () {
            if (container.focusedElement === input) {
              container.focusedElement = null;
              container.dispatchEvent(new Event("blur"));
            }
          })
        };
      }
    });

    if (!!host.value && Array.isArray(host.value)) {
      container.inputElements.forEach(function (input, index) {
        input.value = host.value[index] ? host.value[index] : "";
      });
    }

    Object.Property(container, "value", {
      get: function get() {
        return this.inputElements.map(function (i) {
          return i.value ? i.value : "";
        });
      },
      set: function set(values) {
        this.inputElements.forEach(function (inp, i) {
          return inp.value = values[i] ? values[i] : "";
        });
      }
    });
    host.elements.input = container;

    container.dispose = function () {
      container.inputElements.forEach(function (innerInput) {
        return Object.keys(innerInput.eventSubscriptions).forEach(function (key) {
          return innerInput.eventSubscriptions[key]();
        });
      });
    };

    inputContainer.appendChild(container);

    if (host.getAttribute("labelposition") === undefined) {
      host.labelposition = setDefaultLabelPosition(host);
    }

    return;
  }

  host.elements.input = ReplaceElementContents(FindElementIn(SetAttribute(host.elements.container, "input-kind", host.type), input_field_elements_elementSelectors.inputContainer), [methods_elements_createInput(host.type)]).contents[0];
};
var methods_elements_createInput = function createInput(type) {
  var tag = tagType(type);
  var input = document.createElement(tag);
  var typeAttribute = getInputType(tag, type);
  input.className = input_field_elements_elementSelectors.input.split(".").join("");

  if (typeAttribute) {
    input.setAttribute("type", typeAttribute);
  }

  return input;
};
var setEffects = function setEffects(host) {
  if (["checkbox", "radio"].indexOf(host.type) > -1) {
    host.elements.bounceZ["targets"] = [host.elements.inputContainerOuter];
  } else {
    host.elements.bounceZ["targets"] = [host.elements.inputContainerOuter];
    host.elements.ripple["targets"] = host.elements.underline["targets"] = [host.elements.input];
  }
};
var methods_elements_setInputID = function setInputID(host, value) {
  SetAttribute(host.elements.label, ["id", "for"], [value, "".concat(value, "-input")]);
  SetAttribute(host.elements.help, "id", "".concat(value, "-help"));
  methods_elements_setInputAttribute(host, ["id", "aria-labelledby", "aria-describedby"], ["".concat(value, "-input"), value, "".concat(value, "-help")]);
};
var methods_elements_inputAttributeList = function inputAttributeList(host) {
  return ["radio", "checkbox"].indexOf(host.inputType) > -1 ? InputFieldInputAttributes.bool : InputFieldInputAttributes.all;
};
var methods_elements_setInputAttribute = function setInputAttribute(host, name, value) {
  var input = host.elements.input;
  var attrs = methods_elements_inputAttributeList(host);

  var updateAttr = function updateAttr(n, v) {
    return attrs.indexOf(n) === -1 ? undefined : name === "value" ? methods_elements_setInputValue(input, host) : AddRemoveAttribute(input, n, v);
  };

  if (Array.isArray(name)) {
    name.forEach(function (n, i) {
      return updateAttr(n, value[i]);
    });
  } else {
    updateAttr(name, value);
  }
};
var methods_elements_setLabel = function setLabel(value, labelposition, host) {
  var labs = ReplaceElementContents(host.labelContainer, [SetAttribute(ReplaceElementContents(document.createElement("label"), ValidateHtml(value, [], ["script"]).sanitized || "").element, ["id", "tabIndex", "for", "class"], [host.inputID, -1, "".concat(host.inputID, "-input"), "input-field-".concat(labelposition, "-label")])]).contents[0];
  host.elements.label = labs;
};
var textareaHeight = function textareaHeight(resize, input) {
  if (input.tagName.toLowerCase() !== "textarea" || resize !== "auto") {
    return;
  }

  input.style.overflow = "hidden";
  input.style.height = "inherit";
  input.style.height = "".concat(input.scrollHeight, "px");
};
// CONCATENATED MODULE: ./src/components/input-field/properties.js







var properties_trueOrNull = function trueOrNull(val) {
  return Pipe(ToBool, IfNot(true, null))(val).value;
};

var addRemoveContainerClass = function addRemoveContainerClass(val, host, clss) {
  return host.elements.container.classList[val ? "add" : "remove"](clss);
};

var input_field_properties_onChange = function onChange() {};

var inputStates = {
  focused: {
    format: properties_trueOrNull,
    onChange: function onChange(val, host) {
      return addRemoveContainerClass(val, host, "focused");
    }
  },
  notempty: {
    format: properties_trueOrNull,
    onChange: function onChange(val, host) {
      return addRemoveContainerClass(val, SetAttribute(host, "has-value", "".concat(val)), "notempty");
    }
  },
  invalid: {
    format: function format(val) {
      return ToBool(val).value;
    },
    onChange: function onChange(val, host) {
      setColors(host, val);
      SetAttribute(host.elements.container, "valid", val);
      addRemoveContainerClass(val, host, "invalid");
    }
  },
  ready: {
    format: properties_trueOrNull,
    onChange: function onChange(val, host) {
      return addRemoveContainerClass(val, host, "ready");
    }
  },
  count: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(0))(val).value;
    },
    onChange: function onChange(val, host) {
      return ReplaceElementContents(host.elements.count, val);
    }
  }
};
var inputAttributes = {
  accept: {
    format: function format(val) {
      return Pipe(CommasToArray, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_setInputAttribute(host, "accept", val);
    }
  },
  autocomplete: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_setInputAttribute(host, "autocomplete", val);
    }
  },
  autofocus: {
    format: function format(val) {
      return Pipe(ToBool, IfNot(true, null))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_setInputAttribute(host, "autofocus", val);
    }
  },
  disabled: {
    format: function format(val) {
      return Pipe(ToBool, IfNot(true, null))(val).value;
    },
    onChange: function onChange(val, host) {
      methods_elements_setInputAttribute(host, "disabled", val);
      addRemoveContainerClass(val, host, "disabled");
    }
  },
  maxlength: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      ReplaceElementContents(host.elements.max, val || "");
      addRemoveContainerClass(val, host, "maxlength");
      methods_value_processValue(host);
    }
  },
  max: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      ReplaceElementContents(host.elements.max, val || "");
      addRemoveContainerClass(val, host, "max");
      methods_value_processValue(host);
    }
  },
  min: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      addRemoveContainerClass(val, host, "min");
      methods_value_processValue(host);
    }
  },
  name: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_setInputAttribute(host, "name", val);
    }
  },
  pattern: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(_val, host) {
      return methods_value_processValue(host);
    }
  },
  placeholder: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_setInputAttribute(host, "placeholder", val);
    }
  },
  readonly: {
    format: properties_trueOrNull,
    onChange: function onChange(val, host) {
      return methods_elements_setInputAttribute(host, "readonly", val);
    }
  },
  required: {
    format: properties_trueOrNull,
    onChange: function onChange(val, host) {
      return methods_elements_setInputAttribute(host, "required", val);
    }
  },
  step: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_setInputAttribute(host, "step", val);
    }
  },
  tabindex: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(0))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_setInputAttribute(host, "tabIndex", val);
    }
  },
  type: {
    format: function format(val) {
      return Pipe(ToArray, IfInvalid(val))(val).value || "text";
    },
    onChange: function onChange(_val, host) {
      return methods_elements_setInput(host);
    }
  },
  value: {
    format: function format(val) {
      return val;
    },
    onChange: function onChange(_val, host) {
      return methods_value_processValue(host);
    }
  }
};
var inputFieldProperties = {
  accentcolor: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("#59a2d8"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setColors(host, host.invalid);
    }
  },
  allowhtml: {
    format: function format(val) {
      return Pipe(CommasToArray, IfInvalid(null))(val).value;
    },
    onChange: input_field_properties_onChange
  },
  "class": ComponentClassObject,
  clearbutton: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      SetAttribute(host.elements.clearButton, "type", val);
      addRemoveContainerClass(!!val, host, "clearbutton");
    }
  },
  disablefilter: {
    format: function format(val) {
      return ToBool(val).value;
    },
    onChange: function onChange(val, host) {
      return addRemoveContainerClass(val, host, "disablefilter");
    }
  },
  disallowhtml: {
    format: function format(val) {
      return Pipe(CommasToArray, IfInvalid(null))(val).value;
    },
    onChange: input_field_properties_onChange
  },
  droppable: {
    format: function format(val) {
      return ToBool(val).value;
    },
    onChange: function onChange(_val, host) {
      return methods_events_setDroppable(host);
    }
  },
  format: {
    format: function format(val) {
      return Pipe(to_object_ToObject, IfInvalid(Pipe(ToString, IfInvalid(null))(val).value))(val).value;
    },
    onChange: function onChange(_val, host) {
      return methods_value_processValue(host);
    }
  },
  helptext: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(val, host) {
      return ReplaceElementContents(host.elements.help, ValidateHtml(val, [], ["script"]).sanitized || "");
    }
  },
  icon: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      if (val) {
        SetAttribute(host.elements.icon, val.slice(0, 5) === "<svg " ? "svg" : "type", val);
      }

      addRemoveContainerClass(val, host, "icon");
    }
  },
  iconalign: {
    format: function format(val) {
      return typeof val === "string" && (val === "left" || val === "right") ? val : "left";
    },
    onChange: function onChange(val, host) {
      return SetAttribute(host.elements.container, "icon-align", val);
    }
  },
  inputID: {
    format: function format(val) {
      return val ? val : "";
    },
    onChange: function onChange(val, host) {
      return methods_elements_setInputID(host, val);
    }
  },
  // Needs to be before the label property otherwise won't be able to find labelContainer in computed
  labelposition: {
    format: function format(val, host) {
      return Pipe(IndexOf(labelPositions), IfInvalid(setDefaultLabelPosition(host)))(val).value;
    },
    onChange: function onChange(val, host) {
      SetAttribute(host.elements.container, "label-position", val);
      methods_elements_setLabel(host.label, val, host);
    }
  },
  label: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_setLabel(val, host.labelposition, host);
    }
  },
  musthave: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    }
  },
  matchinput: {
    format: function format(val) {
      return val;
    }
  },
  pathvalue: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(val, host) {
      var filePathInput = host.elements.filePathInput;

      if (!filePathInput || host.type !== "file") {
        return;
      }

      filePathInput.value = val.split("/").pop();
      methods_value_processValue(host);
    }
  },
  processedError: {
    format: function format(val) {
      return ValidateHtml(Pipe(ToString, IfInvalid(""))(val).value, [], ["script"]).sanitized || "";
    },
    onChange: function onChange(val, host) {
      return val ? ReplaceElementContents(host.elements.error, val) : undefined;
    }
  },
  resize: {
    format: function format(val) {
      return Pipe(IndexOf(resizeOptions), IfInvalid("auto"))(val).value;
    },
    onChange: function onChange(val, host) {
      return SetAttribute(host.elements.container, "resize", val);
    }
  },
  showcount: {
    format: properties_trueOrNull,
    onChange: function onChange(val, host) {
      return addRemoveContainerClass(val, host, "showcount");
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return input_field_elements_setStyles(host.elements.injectedStyles, val);
    }
  },
  theme: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return input_field_elements_setStyles(host.elements.themeStyles, val);
    }
  },
  warningcolor: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("#a10005"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setColors(host, host.invalid);
    }
  }
};
var input_field_properties_observedAttributes = Object.keys(inputAttributes) // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
.concat(Object.keys(inputFieldProperties), Object.keys(inputStates)); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var input_field_properties_properties = Object.assign({}, inputAttributes, inputFieldProperties, inputStates);
// CONCATENATED MODULE: ./src/components/input-field/computed.js




var processedErrorText = function processedErrorText(sanitized) {
  return sanitized && sanitized.reason ? sanitized.reason.join(", ") : "";
};

var computed_multiProcessedValue = function multiProcessedValue(host, value) {
  var sanitized = host.type.map(function (t, i) {
    return methods_value_sanitizeValue(value[i], t.type, host.allowhtml, host.disallowhtml);
  });
  host.processedError = sanitized.map(processedErrorText).filter(function (s) {
    return !!s;
  }).join(", ");
  return sanitized;
};

var computed_getVal = function getVal(host, value) {
  var sanitized = methods_value_sanitizeValue(value, host.type, host.allowhtml, host.disallowhtml);
  var maxMined = maxMin(host, methods_value_pattern(host, sanitized.sanitized));
  var mustHaveValid = true;
  var matchInputValid = true;

  if (host.musthave) {
    mustHaveValid = new RegExp(host.musthave, "g").test(maxMined.value);
  }

  if (host.matchinput) {
    matchInputValid = maxMined.value === Object(utils_get["a" /* Get */])(host, "matchinput.value");
  }

  sanitized.valid = sanitized.valid && maxMined.valid && mustHaveValid && matchInputValid;

  if (maxMined.errorText) {
    sanitized.reason.push(maxMined.errorText);
  }

  if (!mustHaveValid) {
    sanitized.reason.push("Invalid value.");
  }

  if (!matchInputValid) {
    var toMatch = host.matchinput;
    var label = toMatch.label || toMatch.getAttribute("label");
    var placeholder = toMatch.placeholder || toMatch.getAttribute("placeholder");
    var name = toMatch.name || toMatch.getAttribute("name");
    var toMatchName = label || placeholder || name;
    sanitized.reason.push("Value does not match".concat(toMatchName ? " '".concat(toMatchName, "'") : "", "."));
  }

  host.processedError = processedErrorText(sanitized);
  sanitized.sanitized = maxMined.value;
  return sanitized;
};

var computed_processedValue = function processedValue(host) {
  return {
    get: function get() {
      var value = Object(utils_get["a" /* Get */])(host.state, "value.value");

      if (isEmpty(value)) {
        return processedNullValue();
      }

      return computed_getVal(host, value);
    }
  };
};
var computed_multiFormattedValue = function multiFormattedValue(host, value) {
  var sanitized = host.type.map(function (t, i) {
    return methods_value_sanitizeValue(methods_value_InputFieldFormatValue(value[i], host.format || t.type).value, t.type, host.allowhtml, host.disallowhtml);
  });
  var values = [];
  var errors = [];
  sanitized.forEach(function (s) {
    values.push(s.sanitized);
    errors.push(processedErrorText(s));
  });
  host.processedError = errors.filter(function (s) {
    return !!s;
  }).join(", ");
  return values;
};
var computed_formattedValue = function formattedValue(host) {
  return {
    get: function get() {
      var value = Object(utils_get["a" /* Get */])(host.state, "value.value");

      if (isEmpty(value)) {
        return processedNullValue().sanitized;
      }

      var formatted = methods_value_InputFieldFormatValue(value, host.format || host.type);
      return computed_getVal(host, formatted.value).sanitized;
    }
  };
};
var labelContainer = function labelContainer(host) {
  return {
    get: function get() {
      if (!host.shadowRoot) {
        return;
      }

      return host.shadowRoot.querySelector(".input-field-label-".concat(host.labelposition));
    }
  };
};
var computed_valid = function valid(host) {
  return {
    get: function get() {
      return (!host.processedError || host.processedError === "") && Object(utils_get["a" /* Get */])(host, "elements.input.validity.valid");
    }
  };
};
var computed_validationMessage = function validationMessage(host) {
  return {
    get: function get() {
      return [host.processedError, Object(utils_get["a" /* Get */])(host, "elements.input.validationMessage")].filter(function (m) {
        return !!m;
      });
    }
  };
};
// CONCATENATED MODULE: ./src/components/input-field/index.js
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization





 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var input_field_style = __webpack_require__("./src/components/input-field/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var input_field_template = __webpack_require__("./src/components/input-field/index.html");

var input_field_componentName = "input-field";
var input_field_componentRoot = ".input-field-container";
var InputField = WCConstructor({
  componentName: input_field_componentName,
  componentRoot: input_field_componentRoot,
  template: input_field_template,
  style: input_field_style,
  observedAttributes: input_field_properties_observedAttributes,
  properties: input_field_properties_properties,
  elements: input_field_elements,
  methods: {
    setError: setError
  },
  computed: {
    processedValue: computed_processedValue,
    formattedValue: computed_formattedValue,
    labelContainer: labelContainer,
    valid: computed_valid,
    validationMessage: computed_validationMessage
  },
  getters: {
    value: function value(host) {
      return host.formattedValue;
    },
    invalid: function invalid(host) {
      return !host.valid;
    }
  },
  setters: {
    value: function value(host) {
      return function (value) {
        return host.state.value.next(value);
      };
    }
  },
  onConnected: function onConnected(host) {
    host.inputID = ID();
    setEffects(host);
    requestAnimationFrame(function () {
      host.elements.checkIcon.svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"stroke:currentColor;stroke-width:2px;\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/></svg>";
    });
  }
});
WCDefine(input_field_componentName, InputField);
// CONCATENATED MODULE: ./src/components/overlay-content/index.js
 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var overlay_content_style = __webpack_require__("./src/components/overlay-content/style.scss").toString();

var overlay_content_setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles);
};
var overlay_content_alignments = ["center", "left", "right", "top", "bottom", "center center", "center top", "center bottom", "left center", "left top", "left bottom", "right center", "right top", "right bottom"];

var overlay_content_template = __webpack_require__("./src/components/overlay-content/index.html");

var overlay_content_componentName = "overlay-content";
var overlay_content_componentRoot = ".overlay-content-container";
var positionPadding = 40;
var overlay_content_elements = {};
var overlay_content_elementSelectors = {
  root: overlay_content_componentRoot,
  contentContainer: ".overlay-content-content-container",
  contentInner: ".overlay-content-content-inner",
  inner: ".overlay-content-container-inner",
  injectedStyles: "style.injectedStyles"
}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

Object.keys(overlay_content_elementSelectors).forEach(function (key) {
  overlay_content_elements[key] = {
    selector: overlay_content_elementSelectors[key],
    onChange: key === "injectedStyles" ? function (el, host) {
      return overlay_content_setStyles(el, host.styles);
    } : function () {}
  };
});
var overlay_content_widths = ["content", "target"];
var overlay_content_attributes = {
  target: {
    format: function format(val) {
      return val instanceof HTMLElement ? val : null;
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
  "class": ComponentClassObject,
  widthbasis: {
    format: function format(val) {
      return Pipe(IndexOf(overlay_content_widths), IfInvalid("content"))(val).value;
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return overlay_content_setStyles(host.elements.injectedStyles, val);
    }
  }
};

var getWidth = function getWidth(host) {
  var targetWidth = host.target ? "".concat(host.target.getBoundingClientRect().width, "px") : "auto";
  return {
    width: !host.widthbasis || host.widthbasis === "content" ? "auto" : targetWidth,
    minWidth: targetWidth
  };
};

var setPositions = function setPositions(host) {
  return function () {
    cancelAnimationFrame(host.positionTimer);
    var target = host.target;

    if (!host.showing || !target) {
      return;
    }

    var container = host.elements.contentContainer;
    var inner = host.elements.inner;
    var rootBox = host.elements.root.getBoundingClientRect();

    if (rootBox.y !== 0) {
      inner.style.top = "-".concat(rootBox.y, "px");
    }

    if (rootBox.x !== 0) {
      inner.style.left = "-".concat(rootBox.x, "px");
    }

    if (rootBox.width !== document.documentElement.clientWidth) {
      inner.style.width = "".concat(document.documentElement.clientWidth, "px");
    }

    if (rootBox.height !== document.documentElement.clientHeight) {
      inner.style.height = "".concat(document.documentElement.clientHeight, "px");
    }

    var targetBox = target.getBoundingClientRect();
    var isOnTop = host.isOnTop;

    if (targetBox.top - 10 > document.documentElement.clientHeight || targetBox.bottom + 10 < 0) {
      return host.hide();
    }

    var widths = getWidth(host);
    container.style.width = widths.width;
    container.style.minWidth = widths.minWidth;
    container.style.height = "auto";
    container.style.maxHeight = "".concat(host.height, "px");
    var left = targetBox.left + container.offsetWidth >= window.innerWidth - 10 ? targetBox.right - container.offsetWidth : targetBox.left;
    container.style.left = "".concat(left, "px");
    container.style.top = "".concat(isOnTop ? targetBox.top - container.offsetHeight : host.spaceAbove + targetBox.height, "px");
    var origin = "center ".concat(isOnTop ? "bottom" : "top");
    host.width = container.offsetWidth;
    container.style.transformOrigin = "".concat(origin);

    if (inner.classList.contains("bottom") && isOnTop) {
      inner.classList.remove("bottom");
    }

    if (!inner.classList.contains("bottom") && !isOnTop) {
      inner.classList.add("bottom");
    }

    host.positionTimer = requestAnimationFrame(function () {
      setPositions(host)();
    });
  };
};

var OverlayContent = WCConstructor({
  componentName: overlay_content_componentName,
  componentRoot: overlay_content_componentRoot,
  template: overlay_content_template,
  style: overlay_content_style,
  observedAttributes: Object.keys(overlay_content_attributes),
  // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
  properties: Object.assign({}, {
    positionTimer: {
      format: function format(val) {
        return val;
      }
    },
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
        host.dispatchEvent(new CustomEvent("widthchange", {
          detail: host
        }));
      }
    }
  }, overlay_content_attributes),
  computed: {
    height: function height(host) {
      return {
        get: function get() {
          return (host.isOnTop ? host.spaceAbove : host.spaceBelow) - positionPadding;
        }
      };
    },
    isOnTop: function isOnTop(host) {
      return {
        get: function get() {
          return host.spaceAbove > host.spaceBelow;
        }
      };
    },
    spaceAbove: function spaceAbove(host) {
      return {
        get: function get() {
          return host.target ? host.target.getBoundingClientRect().top : 0;
        }
      };
    },
    spaceBelow: function spaceBelow(host) {
      return {
        get: function get() {
          return document.documentElement.clientHeight - (host.spaceAbove + (host.target ? host.target.getBoundingClientRect().height : 0));
        }
      };
    },
    position: function position(host) {
      return {
        get: function get() {
          var container = host.elements.contentContainer;

          if (!container) {
            return {
              top: 0,
              y: 0,
              bottom: 0,
              left: 0,
              x: 0,
              right: 0,
              width: 0,
              height: 0,
              scrollTop: 0,
              scrollLeft: 0
            };
          }

          var box = container.getBoundingClientRect();
          return {
            top: box.top,
            y: box.y,
            bottom: box.bottom,
            left: box.left,
            x: box.x,
            right: box.right,
            width: box.width,
            height: box.height,
            scrollTop: container.scrollTop,
            scrollLeft: container.scrollLeft
          };
        }
      };
    }
  },
  methods: {
    scrollContent: function scrollContent(host) {
      return function (x, y) {
        var container = host.elements.contentContainer;
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
          host.elements.root.classList.add("activating");
          host.showing = true;
          setPositions(host)();
          var scalePoints = GetCurve([0, 1.02, 0.99, 1]);
          var timeout = GetCurve([0, host.speed / scalePoints.length]);
          var widths = getWidth(host);
          var container = host.elements.contentContainer;
          container.style.width = widths.width;
          container.style.minWidth = widths.minWidth;

          var loop = function loop() {
            if (!host.showing) {
              return Promise.resolve();
            }

            var scalePoint = scalePoints.shift();
            var time = timeout[scalePoints.length];
            container.style.transform = "scale(1, ".concat(scalePoint, ")");

            if (scalePoints.length) {
              setTimeout(function () {
                return loop();
              }, time);
            } else {
              host.elements.root.classList.add("active");
              host.elements.root.classList.remove("activating");
              resolve();
              host.dispatchEvent(new CustomEvent("shown"));
            }
          };

          loop();
        });
      };
    },
    hide: function hide(host) {
      return function () {
        if (!host.showing) {
          return Promise.resolve();
        }

        return new Promise(function (resolve) {
          host.elements.root.classList.remove("activating");
          host.showing = false;
          var scalePoints = GetCurve([1, 0]);
          var timeout = GetCurve([0, host.speed / scalePoints.length]);
          var container = host.elements.contentContainer;

          var loop = function loop() {
            if (host.showing) {
              return resolve();
            }

            var scalePoint = scalePoints.shift();
            var time = timeout[scalePoint.length];
            container.style.transform = "scale(1, ".concat(scalePoint, ")");

            if (scalePoints.length) {
              setTimeout(function () {
                return loop();
              }, time);
            } else {
              host.elements.root.classList.remove("active");
              resolve();
              host.dispatchEvent(new CustomEvent("hidden"));
            }
          };

          loop();
        });
      };
    }
  },
  elements: overlay_content_elements
});
WCDefine(overlay_content_componentName, OverlayContent);
// CONCATENATED MODULE: ./src/utils/event-name/index.js
var events = {
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
  if (!events[key]) {
    return "";
  }

  var e;

  for (e in events[key]) {
    if (event_name_el.style[e] !== undefined) {
      return events[key][e];
    }
  }

  return "";
}
// CONCATENATED MODULE: ./src/components/overlay-message/index.js
 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var overlay_message_style = __webpack_require__("./src/components/overlay-message/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var overlay_message_template = __webpack_require__("./src/components/overlay-message/index.html");

var overlay_message_componentName = "overlay-message";
var overlay_message_componentRoot = ".".concat(overlay_message_componentName, "-container");

var overlay_message_setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles);
};

var overlay_message_setShown = function setShown(host) {
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
      requestAnimationFrame(dispatch);
    });
  } else {
    requestAnimationFrame(dispatch);
  }

  root.classList[host.shown ? "add" : "remove"]("shown");
};

var setColorTheme = function setColorTheme(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute("colortheme", host.colortheme);
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
  "class": ComponentClassObject,
  shown: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(_val, host) {
      return overlay_message_setShown(host);
    }
  },
  colortheme: {
    format: function format(val) {
      return Pipe(IndexOf(["dark", "light", "transparent"]), IfInvalid("light"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setColorTheme(host);
    }
  },
  closeselector: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("[overlay-message-close]"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return overlay_message_setCloseButton(host);
    }
  },
  styles: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(val, host) {
      return overlay_message_setStyles(host.elements.injectedStyles, val);
    }
  },
  theme: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(val, host) {
      return overlay_message_setStyles(host.elements.themeStyles, val);
    }
  }
};
var overlay_message_observedAttributes = Object.keys(overlay_message_properties);
var overlay_message_elements = {
  root: {
    selector: overlay_message_componentRoot,
    onChange: function onChange(_el, host) {
      setColorTheme(host);
      overlay_message_setShown(host);
    }
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: function onChange(el, host) {
      return overlay_message_setStyles(el, host.styles);
    }
  },
  themeStyles: {
    selector: "style.themeStyles",
    onChange: function onChange(el, host) {
      return overlay_message_setStyles(el, host.theme);
    }
  }
};
var OverlayMessage = WCConstructor({
  componentName: overlay_message_componentName,
  componentRoot: overlay_message_componentRoot,
  template: overlay_message_template,
  style: overlay_message_style,
  observedAttributes: overlay_message_observedAttributes,
  properties: overlay_message_properties,
  elements: overlay_message_elements,
  onDisconnected: function onDisconnected(host) {
    ObserverUnsubscribe(host);
  },
  onConnected: function onConnected(host) {
    host.subscriptions = {
      slots: ObserveSlots(host, true).subscribe(function () {
        return overlay_message_setCloseButton(host);
      })
    };
  }
});
WCDefine(overlay_message_componentName, OverlayMessage);
// CONCATENATED MODULE: ./src/components/progress-bar/index.js

 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var progress_bar_style = __webpack_require__("./src/components/progress-bar/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var progress_bar_template = __webpack_require__("./src/components/progress-bar/index.html");

var progress_bar_componentName = "progress-bar";
var progress_bar_componentRoot = ".".concat(progress_bar_componentName, "-container");
var types = ["bar", "circle"];
var animations = ["indeterminate", "linear", "volley"];

var progress_bar_setStyles = function setStyles(el, styles) {
  return el ? SetStyleRules(el, styles) : undefined;
};

var setVisible = function setVisible(val, root) {
  return root ? root.classList[val ? "add" : "remove"]("visible") : undefined;
};

var setOverlay = function setOverlay(val, root) {
  return root ? root.classList[val ? "add" : "remove"]("overlay") : undefined;
};

var setPercentage = function setPercentage(val, root) {
  return root ? root.classList[val ? "add" : "remove"]("percentage") : undefined;
};

var setScrimColor = function setScrimColor(val, root) {
  return root ? val ? root.style.backgroundColor = val : root.style.removeProperty("background-color") : undefined;
};

var setTrack = function setTrack(val, root) {
  return root ? root.classList[val ? "add" : "remove"]("track") : undefined;
};

var setScrimBlur = function setScrimBlur(val, root) {
  return root ? root.style.backdropFilter = "blur(".concat(val, "px)") : undefined;
};

var setThickness = function setThickness(val, el) {
  return el ? el.style.height = val : undefined;
};

var progress_bar_setHeading = function setHeading(val, el) {
  return el ? el.innerHTML = ValidateHtml(val, [], ["script"]).sanitized : undefined;
};

var progress_bar_setText = function setText(val, el) {
  return el ? el.innerHTML = ValidateHtml(val, [], ["script"]).sanitized : undefined;
};

var setColor = function setColor(val, el) {
  return el && val ? el.style.color = val : el ? el.style.removeProperty("color") : undefined;
};

var setAnimation = function setAnimation(val, root) {
  return root ? root.setAttribute("animation", val) : undefined;
};

var setScrim = function setScrim(val, root) {
  if (!root) {
    return;
  }

  if (!val) {
    root.style.removeProperty("background-color");
  }

  root.classList[val ? "add" : "remove"]("scrim");
};

var progress_bar_setButton = function setButton(val, el) {
  if (val && el) {
    el.classList.add("show");
    el.innerHTML = ValidateHtml(val, [], ["script"]).sanitized;
  } else if (el) {
    el.classList.remove("show");
  }
};

var setValues = function setValues(vals, host) {
  var top = host.elements.top;
  var bottom = host.elements.bottom;
  var percentage = host.elements.percentage;
  var mainVal = "".concat(Math.min(100, vals[0] || 0), "%");
  var secondaryVal = "".concat(Math.min(100, vals[1] || 0), "%");

  if (!top || !bottom) {
    return;
  }

  top.style.width = mainVal;
  bottom.style.width = secondaryVal;
  percentage.textContent = mainVal;
};

var progress_bar_properties = {
  "class": ComponentClassObject,
  styles: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(val, host) {
      return progress_bar_setStyles(host.elements.injectedStyles, val);
    }
  },
  theme: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(val, host) {
      return progress_bar_setStyles(host.elements.themeStyles, val);
    }
  },
  value: {
    format: function format(val) {
      return Pipe(CommasToArray, IfInvalid([val]), ToMap(function (v) {
        return isNaN(parseInt(v)) ? 0 : parseInt(v);
      }))(val).value;
    },
    onChange: function onChange(val, host) {
      setValues(val, host);
    }
  },
  color: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      setColor(val, host.elements.trackInner);
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
      setPercentage(val, host.elements.root);
    }
  },
  thickness: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("3px"))(val).value;
    },
    onChange: function onChange(val, host) {
      setThickness(val, host.elements.container);
    }
  },
  visible: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      setVisible(val, host.elements.root);
    }
  },
  overlay: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(val, host) {
      setOverlay(val, host.elements.root);
    }
  },
  scrim: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(val, host) {
      setScrim(val, host.elements.root);
    }
  },
  track: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(val, host) {
      setTrack(val, host.elements.root);
    }
  },
  scrimcolor: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid("rgba(0,0,0,0.84)"))(val).value;
    },
    onChange: function onChange(val, host) {
      setScrimColor(val, host.elements.root);
    }
  },
  scrimblur: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(0))(val).value;
    },
    onChange: function onChange(val, host) {
      setScrimBlur(val, host.elements.root);
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
      setOverlay(host.overlay, el);
      setScrim(host.scrim, el);
      setScrimColor(host.scrimcolor, el);
      setVisible(host.visible, el);
      setTrack(host.visible, el);
      setScrimBlur(host.scrimblur, el);
      setPercentage(host.percentage, el);
      setAnimation(host.animation, el);
    }
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: function onChange(el, host) {
      return progress_bar_setStyles(el, host.styles);
    }
  },
  themeStyles: {
    selector: "style.themeStyles",
    onChange: function onChange(el, host) {
      return progress_bar_setStyles(el, host.theme);
    }
  },
  container: {
    selector: ".progress-bar-inner",
    onChange: function onChange(el, host) {
      setThickness(host.thickness, el);
    }
  },
  trackInner: {
    selector: ".progress-bar-track-inner",
    onChange: function onChange(el, host) {
      setColor(host.color, el);
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
// CONCATENATED MODULE: ./src/components/snack-bar/index.js
 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var snack_bar_style = __webpack_require__("./src/components/snack-bar/style.scss").toString(); // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var snack_bar_template = __webpack_require__("./src/components/snack-bar/index.html");

var snack_bar_componentName = "snack-bar";
var snack_bar_componentRoot = ".".concat(snack_bar_componentName, "-container");
var infoiconSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z\"/></svg>";
var successiconSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\"/></svg>";
var erroriconSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"/></svg>";
var warningiconSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\"/></svg>";

var snack_bar_setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles);
};

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
      requestAnimationFrame(dispatch);
    });
  } else {
    requestAnimationFrame(dispatch);
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

var setType = function setType(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute("type", host.type);
};

var setIcon = function setIcon(host, key) {
  var icon = host.elements[key];

  if (!icon) {
    return;
  }

  icon[host[key][0] === "<" ? "svg" : "type"] = host[key];
};

var showHideClose = function showHideClose(el, show) {
  if (!el) {
    return;
  }

  el.classList[show ? "remove" : "add"]("hide-close-btn");
};

var snack_bar_properties = {
  "class": ComponentClassObject,
  shown: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(_val, host) {
      return snack_bar_setShown(host);
    }
  },
  align: {
    format: function format(val) {
      return Pipe(ToString, IndexOf(["top", "bottom", "none"]), IfInvalid("bottom"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setAlign(host);
    }
  },
  type: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setType(host);
    }
  },
  infoicon: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(infoiconSvg), IfEmpty(infoiconSvg))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setIcon(host, "infoicon");
    }
  },
  successicon: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(successiconSvg), IfEmpty(successiconSvg))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setIcon(host, "successicon");
    }
  },
  erroricon: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(erroriconSvg), IfEmpty(erroriconSvg))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setIcon(host, "erroricon");
    }
  },
  warningicon: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(warningiconSvg), IfEmpty(warningiconSvg))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setIcon(host, "warningicon");
    }
  },
  hideclose: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      return showHideClose(host.elements.root, !val);
    }
  },
  styles: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(val, host) {
      return snack_bar_setStyles(host.elements.injectedStyles, val);
    }
  },
  theme: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(""))(val).value;
    },
    onChange: function onChange(val, host) {
      return snack_bar_setStyles(host.elements.themeStyles, val);
    }
  }
};
var snack_bar_observedAttributes = Object.keys(snack_bar_properties);
var snack_bar_elements = {
  root: {
    selector: snack_bar_componentRoot,
    onChange: function onChange(_el, host) {
      setAlign(host);
      snack_bar_setShown(host);
    }
  },
  button: {
    selector: ".snack-bar-close",
    onChange: function onChange(el, host) {
      el.eventListeners = {
        click: ObserveEvent(el, "click").subscribe(function () {
          return host.shown = false;
        })
      };
      showHideClose(host.elements.root, !host.hideclose);
    }
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: function onChange(el, host) {
      return snack_bar_setStyles(el, host.styles);
    }
  },
  themeStyles: {
    selector: "style.themeStyles",
    onChange: function onChange(el, host) {
      return snack_bar_setStyles(el, host.theme);
    }
  },
  infoicon: {
    selector: ".infoicon",
    onChange: function onChange(_el, host) {
      return setIcon(host, "infoicon");
    }
  },
  successicon: {
    selector: ".successicon",
    onChange: function onChange(_el, host) {
      return setIcon(host, "successicon");
    }
  },
  erroricon: {
    selector: ".erroricon",
    onChange: function onChange(_el, host) {
      return setIcon(host, "erroricon");
    }
  },
  warningicon: {
    selector: ".warningicon",
    onChange: function onChange(_el, host) {
      return setIcon(host, "warningicon");
    }
  }
};
var SnackBar = WCConstructor({
  componentName: snack_bar_componentName,
  componentRoot: snack_bar_componentRoot,
  template: snack_bar_template,
  style: snack_bar_style,
  observedAttributes: snack_bar_observedAttributes,
  properties: snack_bar_properties,
  elements: snack_bar_elements
});
WCDefine(snack_bar_componentName, SnackBar);
// CONCATENATED MODULE: ./src/components/spinner-element/index.js
 // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization

var spinner_element_style = __webpack_require__("./src/components/spinner-element/style.scss").toString();

var spinner_element_setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  SetStyleRules(el, styles);
};

var spinner_element_setTheme = function setTheme(value, host) {
  var themeElement = host.elements.theme;

  if (!themeElement || value === undefined) {
    return;
  }

  SetStyleRules(themeElement, value);
}; // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization


var spinner_element_template = __webpack_require__("./src/components/spinner-element/index.html");

var spinner_element_componentName = "spinner-element";
var spinner_element_componentRoot = ".".concat(spinner_element_componentName, "-container");

var doAllTheThings = function doAllTheThings(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute("type", host.type);
  setRootClass(host, host.page, "fullpage");
  setRootClass(host, host.scrim, "showscrim");
  spinner_element_setType(host);
  spinner_element_setScrimColor(host);
  setScrimOpacity(host);
  setBlur(host);
};

var setRootClass = function setRootClass(host, condition, clss) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.classList[condition ? "add" : "remove"](clss);
};

var spinner_element_setType = function setType(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute("type", host.type);
};

var setBlur = function setBlur(host) {
  var scrim = host.elements.scrim;

  if (!scrim) {
    return;
  }

  scrim.style.backdropFilter = "blur(".concat(host.blur, "px)");
};

var spinner_element_setScrimColor = function setScrimColor(host) {
  var scrim = host.elements.scrim;

  if (!scrim) {
    return;
  }

  scrim.style.background = host.scrimcolor;
};

var setScrimOpacity = function setScrimOpacity(host) {
  var scrim = host.elements.scrim;

  if (!scrim) {
    return;
  }

  if (host.scrim) {
    return scrim.style.opacity = host.scrimopacity;
  }

  scrim.style.opacity = 0;
};

var toggleVisibility = function toggleVisibility(host) {
  host.elements.root.classList[host.visible ? "add" : "remove"]("shown");
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
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: function onChange(el, host) {
      return spinner_element_setStyles(el, host.styles);
    }
  },
  theme: {
    selector: "style.themeStyles",
    onChange: function onChange(_el, host) {
      return spinner_element_setTheme(host.theme, host);
    }
  }
};
var spinner_element_properties = {
  "class": ComponentClassObject,
  visible: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(_val, host) {
      return toggleVisibility(host);
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
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return spinner_element_setStyles(host.elements.injectedStyles, val);
    }
  },
  type: {
    format: function format(val) {
      return typeof val === "string" ? val : "column";
    },
    onChange: function onChange(_val, host) {
      return doAllTheThings(host);
    }
  },
  theme: {
    format: function format(val, host) {
      return typeof val === "string" ? val : host.theme;
    },
    onChange: spinner_element_setTheme
  }
};
var SpinnerElement = WCConstructor({
  componentName: spinner_element_componentName,
  componentRoot: spinner_element_componentRoot,
  template: spinner_element_template,
  style: spinner_element_style,
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
// CONCATENATED MODULE: ./src/services/router/get-route-by-path.js
var get_route_by_path_getRouteByPath = function getRouteByPath(routes) {
  return function (path) {
    path = typeof path === "string" ? path.toLowerCase() : path;
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
// CONCATENATED MODULE: ./src/services/router/parse-url.js


var parse_url_parseUrl = function parseUrl(url) {
  return typeof url === "string" ? ValidateHtml(url.split("?")[0]).sanitized // prevent XSS
  : url.pathname ? ValidateHtml(url.pathname).sanitized // prevent XSS
  : "";
};

/* harmony default export */ var parse_url = (parse_url_parseUrl);
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
  var current = {};
  var lastState = {};

  var _routes = Object.assign({}, routes);

  var getRouteByPath = get_route_by_path(_routes);
  current = Object.assign({}, {
    path: location.pathname,
    query: get_query(location.search),
    base: "".concat(location.protocol, "//").concat(location.host).concat(location.port ? ":".concat(location.port) : "")
  }, getRouteByPath(location.pathname));
  var methods = {
    get current() {
      return Object.assign({}, current || {}, {
        path: location.pathname,
        base: "".concat(location.protocol, "//").concat(location.host).concat(location.port ? ":".concat(location.port) : "")
      });
    },

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
    route$: Observer(undefined),
    query$: Observer(undefined),
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
  methods.route("".concat(location.pathname).concat(location.search));
  click_listener(methods);
  pop_state_listener(methods);
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
// CONCATENATED MODULE: ./src/utils/between/index.js
function Between(start, end, value) {
  var regex = new RegExp("".concat(start, "([^").concat(end, "]+)").concat(end), "gm");

  var getAll = function getAll() {
    var match;
    var matches = [];

    while ((match = regex.exec(value)) !== null) {
      if (match.index === regex.lastIndex) {
        regex.lastIndex = regex.lastIndex + 1;
      }

      matches.push(match[1]);
    }

    return matches;
  };

  return {
    all: function all() {
      return getAll();
    },
    first: function first() {
      try {
        return regex.exec(value)[1];
      } catch (error) {
        return;
      }
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
// CONCATENATED MODULE: ./src/utils/browser-is/index.js
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
// CONCATENATED MODULE: ./src/utils/create-element/index.js

var create_element_CreateElement = function CreateElement(obj) {
  var el = document.createElement(obj.tagName || "div");
  Object.keys(obj).forEach(function (key) {
    if (key === "tagName") {
      return;
    }

    if (["textContent", "innerHTML"].indexOf(key) > -1) {
      return el[key] = obj[key];
    }

    if (["string", "number", "boolean"].indexOf(Type(obj[key])) > -1) {
      el.setAttribute(key, obj[key]);
    } else {
      el[key] = obj[key];
    }
  });
  return el;
};
// CONCATENATED MODULE: ./src/utils/to-date/index.js

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
// CONCATENATED MODULE: ./src/utils/date-to-object/index.js

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
    }).replace(/[^0-9\.]+/g, ""),
    hourDouble24: result.value.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      hour12: false
    }).replace(/[^0-9\.]+/g, ""),
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
// CONCATENATED MODULE: ./src/utils/ease-bounce/index.js

function EaseBounce(values, duration) {
  var pow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  return GetEase(values, duration, pow, function (index, frames, pow) {
    return EasePower(1 - index / frames, pow);
  });
}
// CONCATENATED MODULE: ./src/utils/ease-in/index.js

function EaseIn(values, duration) {
  var pow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  return GetEase(values, duration, pow, function (index, frames) {
    var t = index / frames;
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  });
}
// CONCATENATED MODULE: ./src/utils/ease-out/index.js

function EaseOut(values, duration) {
  var pow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  return GetEase(values, duration, pow, function (index, frames, pow) {
    return EasePower(index / frames, pow);
  });
}
// CONCATENATED MODULE: ./src/utils/first-of-month/index.js

var first_of_month_FirstOfMonth = function FirstOfMonth(value) {
  var result = ToDate(value);

  if (result.stop || !result.valid) {
    return result;
  }

  result.value = DateToObject(new Date(result.value.getFullYear(), result.value.getMonth(), 1)).value;
  return result;
};
// CONCATENATED MODULE: ./src/utils/from-uri/index.js

function FromURI(value) {
  return do_uri_doURI(value);
}
// CONCATENATED MODULE: ./src/utils/function-to-partial/index.js


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
  var fn = argArray[0];
  argArray.shift();
  var initialArguments = argArray;
  /** If no function passed in, return */

  if (!fn) {
    return;
  }
  /** If the passed in arguments equal the original functions arity, just call the function */


  if (initialArguments.length >= fn.length) {
    return fn.apply(fn, initialArguments);
  }
  /** return function that takes new arguments which then returns a new FunctionToPartial */


  return function () {
    for (var _len2 = arguments.length, newArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      newArgs[_key2] = arguments[_key2];
    }

    return FunctionToPartial.apply(void 0, [fn].concat(toConsumableArray_default()(initialArguments.concat([].concat(newArgs)))));
  };
}
// CONCATENATED MODULE: ./src/utils/has-keys/index.js

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
// CONCATENATED MODULE: ./src/utils/has-method/index.js
function HasMethod(obj, method) {
  return !!obj && typeof obj[method] === "function";
}
// CONCATENATED MODULE: ./src/utils/is-element-type/index.js

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
// CONCATENATED MODULE: ./src/utils/last-of-month/index.js

var last_of_month_LastOfMonth = function LastOfMonth(value) {
  var result = ToDate(value);

  if (result.stop || !result.valid) {
    return result;
  }

  result.value = DateToObject(new Date(result.value.getFullYear(), result.value.getMonth() + 1, 0)).value;
  return result;
};
// CONCATENATED MODULE: ./src/utils/map/index.js

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


// CONCATENATED MODULE: ./src/utils/merge/index.js


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
// CONCATENATED MODULE: ./src/utils/month-data/index.js

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
// CONCATENATED MODULE: ./src/utils/properties-are/index.js

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
// CONCATENATED MODULE: ./src/utils/scroll-to/index.js


var scroll_to_animator = function animator(from, to, speed, stepFn) {
  return new Promise(function (resolve) {
    return Timer(speed, stepFn, EaseInOut([from, to], speed), resolve);
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
// CONCATENATED MODULE: ./src/utils/super-function/index.js



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


// CONCATENATED MODULE: ./src/utils/throttle/index.js
function Throttle(fn) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 33;
  var timer = null;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timer === null) {
      timer = setTimeout(function () {
        fn.apply(_this, args);
        timer = null;
      }, wait);
    }
  };
}
// CONCATENATED MODULE: ./src/utils/to-entities/index.js

function ToEntities(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type === "string" && !!result.value) {
    result.value = result.value.replace(/\&/g, "&amp;").replace(/\>/g, "&gt;").replace(/\</g, "&lt;").replace(/"/g, "&quot;").replace(/`/g, "&apos;");
    result.valid = true;
  } else {
    result.valid = false;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/to-uri/index.js

function ToURI(value) {
  return do_uri_doURI(value, true);
}
// CONCATENATED MODULE: ./src/utils/to-uri-component/index.js

function ToURIComponent(value) {
  return do_uri_doURI(value, true, true);
}
// CONCATENATED MODULE: ./src/utils/transduce-filter/index.js
function TransduceFilter(predicateFunction) {
  return function (nextReducer) {
    return function (result, current) {
      return predicateFunction(current) ? nextReducer(result, current) : result;
    };
  };
}
// CONCATENATED MODULE: ./src/utils/transduce-map/index.js
function TransduceMap(conversionFunction) {
  return function (nextReducer) {
    return function (result, current) {
      return nextReducer(result, conversionFunction(current));
    };
  };
}
// CONCATENATED MODULE: ./src/utils/wc-css-rules-from-selector/index.js
function WCCSSRulesFromSelector(selector) {
  var sheets = Array.from(document.body.ownerDocument.styleSheets);
  var rules = [];
  sheets.forEach(function (sheet) {
    return Array.from(sheet.rules).forEach(function (rule) {
      return rule.cssText.split("{")[0].trim().indexOf(selector) > -1 ? rules.push(rule.cssText) : undefined;
    });
  });
  return rules;
}
// CONCATENATED MODULE: ./src/utils/wc-render-markup/index.js


var getRegex = function getRegex(r) {
  return new RegExp(r, "igm");
};

var getBegining = function getBegining(m, t) {
  return m.index !== 0 ? t.slice(0, m.index) : "";
};

var getEnd = function getEnd(m, t) {
  return t.slice(m.index + m[0].length);
};

var wc_render_markup_r = /\$(.*?)\$/;
function WCRenderMarkup(templateStr, values) {
  var regex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : wc_render_markup_r;
  var template = document.createElement("template");
  var match;

  while ((match = getRegex(regex).exec(templateStr)) !== null) {
    templateStr = "".concat(getBegining(match, templateStr)).concat(values[match[1]]).concat(getEnd(match, templateStr));
  }

  template.innerHTML = ValidateHtml(templateStr, [], ["script"]).sanitized;
  return document.importNode(template.content, true);
}
// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport ButtonElement */__webpack_require__.d(__webpack_exports__, "ButtonElement", function() { return ButtonElement; });
/* concated harmony reexport CollapseMenu */__webpack_require__.d(__webpack_exports__, "CollapseMenu", function() { return CollapseMenu; });
/* concated harmony reexport ContentCollapse */__webpack_require__.d(__webpack_exports__, "ContentCollapse", function() { return ContentCollapse; });
/* concated harmony reexport ContentDrawer */__webpack_require__.d(__webpack_exports__, "ContentDrawer", function() { return ContentDrawer; });
/* concated harmony reexport ContentTransition */__webpack_require__.d(__webpack_exports__, "ContentTransition", function() { return ContentTransition; });
/* concated harmony reexport CookieMessage */__webpack_require__.d(__webpack_exports__, "CookieMessage", function() { return CookieMessage; });
/* concated harmony reexport DropDown */__webpack_require__.d(__webpack_exports__, "DropDown", function() { return DropDown; });
/* concated harmony reexport DropdownSelect */__webpack_require__.d(__webpack_exports__, "DropdownSelect", function() { return DropdownSelect; });
/* concated harmony reexport EffectBounceZ */__webpack_require__.d(__webpack_exports__, "EffectBounceZ", function() { return EffectBounceZ; });
/* concated harmony reexport EffectFade */__webpack_require__.d(__webpack_exports__, "EffectFade", function() { return EffectFade; });
/* concated harmony reexport EffectRipple */__webpack_require__.d(__webpack_exports__, "EffectRipple", function() { return EffectRipple; });
/* concated harmony reexport EffectScale */__webpack_require__.d(__webpack_exports__, "EffectScale", function() { return EffectScale; });
/* concated harmony reexport EffectUnderline */__webpack_require__.d(__webpack_exports__, "EffectUnderline", function() { return EffectUnderline; });
/* concated harmony reexport GridLayout */__webpack_require__.d(__webpack_exports__, "GridLayout", function() { return GridLayout; });
/* concated harmony reexport HorizontalSlider */__webpack_require__.d(__webpack_exports__, "HorizontalSlider", function() { return HorizontalSlider; });
/* concated harmony reexport IconElement */__webpack_require__.d(__webpack_exports__, "IconElement", function() { return IconElement; });
/* concated harmony reexport ImageLoader */__webpack_require__.d(__webpack_exports__, "ImageLoader", function() { return ImageLoader; });
/* concated harmony reexport InputField */__webpack_require__.d(__webpack_exports__, "InputField", function() { return InputField; });
/* concated harmony reexport OverlayContent */__webpack_require__.d(__webpack_exports__, "OverlayContent", function() { return OverlayContent; });
/* concated harmony reexport OverlayMessage */__webpack_require__.d(__webpack_exports__, "OverlayMessage", function() { return OverlayMessage; });
/* concated harmony reexport ProgressBar */__webpack_require__.d(__webpack_exports__, "ProgressBar", function() { return ProgressBar; });
/* concated harmony reexport SnackBar */__webpack_require__.d(__webpack_exports__, "SnackBar", function() { return SnackBar; });
/* concated harmony reexport SpinnerElement */__webpack_require__.d(__webpack_exports__, "SpinnerElement", function() { return SpinnerElement; });
/* concated harmony reexport Router */__webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* concated harmony reexport ComponentStore */__webpack_require__.d(__webpack_exports__, "ComponentStore", function() { return componentStore["a" /* ComponentStore */]; });
/* concated harmony reexport DragDropService */__webpack_require__.d(__webpack_exports__, "DragDropService", function() { return DragDropService; });
/* concated harmony reexport Request */__webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* concated harmony reexport Timer */__webpack_require__.d(__webpack_exports__, "Timer", function() { return Timer; });
/* concated harmony reexport WCSupportClass */__webpack_require__.d(__webpack_exports__, "WCSupportClass", function() { return WCSupportClass; });
/* concated harmony reexport UploadService */__webpack_require__.d(__webpack_exports__, "UploadService", function() { return UploadService; });
/* concated harmony reexport iconArrow */__webpack_require__.d(__webpack_exports__, "iconArrow", function() { return iconArrow; });
/* concated harmony reexport iconChevron */__webpack_require__.d(__webpack_exports__, "iconChevron", function() { return iconChevron; });
/* concated harmony reexport iconGear */__webpack_require__.d(__webpack_exports__, "iconGear", function() { return iconGear; });
/* concated harmony reexport iconPencil */__webpack_require__.d(__webpack_exports__, "iconPencil", function() { return iconPencil; });
/* concated harmony reexport iconPlay */__webpack_require__.d(__webpack_exports__, "iconPlay", function() { return iconPlay; });
/* concated harmony reexport iconTriangle */__webpack_require__.d(__webpack_exports__, "iconTriangle", function() { return iconTriangle; });
/* concated harmony reexport Icons */__webpack_require__.d(__webpack_exports__, "Icons", function() { return Icons; });
/* concated harmony reexport AddRemoveAttribute */__webpack_require__.d(__webpack_exports__, "AddRemoveAttribute", function() { return AddRemoveAttribute; });
/* concated harmony reexport AfterEveryNth */__webpack_require__.d(__webpack_exports__, "AfterEveryNth", function() { return AfterEveryNth; });
/* concated harmony reexport AppendStyleElement */__webpack_require__.d(__webpack_exports__, "AppendStyleElement", function() { return AppendStyleElement; });
/* concated harmony reexport BeforeEveryNth */__webpack_require__.d(__webpack_exports__, "BeforeEveryNth", function() { return BeforeEveryNth; });
/* concated harmony reexport Between */__webpack_require__.d(__webpack_exports__, "Between", function() { return Between; });
/* concated harmony reexport BrowserIs */__webpack_require__.d(__webpack_exports__, "BrowserIs", function() { return BrowserIs; });
/* concated harmony reexport CommasToArray */__webpack_require__.d(__webpack_exports__, "CommasToArray", function() { return CommasToArray; });
/* concated harmony reexport ComponentClassObject */__webpack_require__.d(__webpack_exports__, "ComponentClassObject", function() { return ComponentClassObject; });
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
/* concated harmony reexport HasKeys */__webpack_require__.d(__webpack_exports__, "HasKeys", function() { return HasKeys; });
/* concated harmony reexport HasMethod */__webpack_require__.d(__webpack_exports__, "HasMethod", function() { return HasMethod; });
/* concated harmony reexport htmlTags */__webpack_require__.d(__webpack_exports__, "htmlTags", function() { return htmlTags; });
/* concated harmony reexport ID */__webpack_require__.d(__webpack_exports__, "ID", function() { return ID; });
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
/* concated harmony reexport Merge */__webpack_require__.d(__webpack_exports__, "Merge", function() { return Merge; });
/* concated harmony reexport MonthData */__webpack_require__.d(__webpack_exports__, "MonthData", function() { return month_data_MonthData; });
/* concated harmony reexport ObserveEvent */__webpack_require__.d(__webpack_exports__, "ObserveEvent", function() { return ObserveEvent; });
/* concated harmony reexport ObserveSlots */__webpack_require__.d(__webpack_exports__, "ObserveSlots", function() { return ObserveSlots; });
/* concated harmony reexport ObserveWorker */__webpack_require__.d(__webpack_exports__, "ObserveWorker", function() { return ObserveWorker; });
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
/* concated harmony reexport WasClickedOn */__webpack_require__.d(__webpack_exports__, "WasClickedOn", function() { return WasClickedOn; });
/* concated harmony reexport WCConstructor */__webpack_require__.d(__webpack_exports__, "WCConstructor", function() { return WCConstructor; });
/* concated harmony reexport WCCSSRulesFromSelector */__webpack_require__.d(__webpack_exports__, "WCCSSRulesFromSelector", function() { return WCCSSRulesFromSelector; });
/* concated harmony reexport WCDefine */__webpack_require__.d(__webpack_exports__, "WCDefine", function() { return WCDefine; });
/* concated harmony reexport WCElements */__webpack_require__.d(__webpack_exports__, "WCElements", function() { return WCElements; });
/* concated harmony reexport WCRenderMarkup */__webpack_require__.d(__webpack_exports__, "WCRenderMarkup", function() { return WCRenderMarkup; });
/** COMPONENTS */























/** SERVICES */









/** UTILS */









































































































































/***/ })

})