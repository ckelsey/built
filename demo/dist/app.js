/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 134);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(88);
var redefine = __webpack_require__(25);
var toString = __webpack_require__(140);

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(13);
var toObject = __webpack_require__(33);
var nativeKeys = __webpack_require__(62);
var fails = __webpack_require__(9);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var exec = __webpack_require__(74);

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var $indexOf = __webpack_require__(105).indexOf;
var arrayMethodIsStrict = __webpack_require__(71);
var arrayMethodUsesToLength = __webpack_require__(43);

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(92).charAt;
var InternalStateModule = __webpack_require__(28);
var defineIterator = __webpack_require__(85);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var forEach = __webpack_require__(119);

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var DOMIterables = __webpack_require__(118);
var forEach = __webpack_require__(119);
var createNonEnumerableProperty = __webpack_require__(32);

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var shared = __webpack_require__(78);
var has = __webpack_require__(17);
var uid = __webpack_require__(61);
var NATIVE_SYMBOL = __webpack_require__(81);
var USE_SYMBOL_AS_UID = __webpack_require__(102);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(136)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__(25);
var anObject = __webpack_require__(16);
var fails = __webpack_require__(9);
var flags = __webpack_require__(94);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var fails = __webpack_require__(9);
var isArray = __webpack_require__(70);
var isObject = __webpack_require__(15);
var toObject = __webpack_require__(33);
var toLength = __webpack_require__(27);
var createProperty = __webpack_require__(73);
var arraySpeciesCreate = __webpack_require__(93);
var arrayMethodHasSpeciesSupport = __webpack_require__(58);
var wellKnownSymbol = __webpack_require__(7);
var V8_VERSION = __webpack_require__(95);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var isObject = __webpack_require__(15);
var isArray = __webpack_require__(70);
var toAbsoluteIndex = __webpack_require__(82);
var toLength = __webpack_require__(27);
var toIndexedObject = __webpack_require__(38);
var createProperty = __webpack_require__(73);
var wellKnownSymbol = __webpack_require__(7);
var arrayMethodHasSpeciesSupport = __webpack_require__(58);
var arrayMethodUsesToLength = __webpack_require__(43);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var getOwnPropertyDescriptor = __webpack_require__(64).f;
var createNonEnumerableProperty = __webpack_require__(32);
var redefine = __webpack_require__(25);
var setGlobal = __webpack_require__(79);
var copyConstructorProperties = __webpack_require__(109);
var isForced = __webpack_require__(66);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(38);
var addToUnscopables = __webpack_require__(135);
var Iterators = __webpack_require__(54);
var InternalStateModule = __webpack_require__(28);
var defineIterator = __webpack_require__(85);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var DOMIterables = __webpack_require__(118);
var ArrayIteratorMethods = __webpack_require__(14);
var createNonEnumerableProperty = __webpack_require__(32);
var wellKnownSymbol = __webpack_require__(7);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(9);

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(20);
var IE8_DOM_DEFINE = __webpack_require__(101);
var anObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(60);

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(13);
var assign = __webpack_require__(120);

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(75);
var isRegExp = __webpack_require__(125);
var anObject = __webpack_require__(16);
var requireObjectCoercible = __webpack_require__(40);
var speciesConstructor = __webpack_require__(126);
var advanceStringIndex = __webpack_require__(96);
var toLength = __webpack_require__(27);
var callRegExpExec = __webpack_require__(76);
var regexpExec = __webpack_require__(74);
var fails = __webpack_require__(9);

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var $filter = __webpack_require__(57).filter;
var arrayMethodHasSpeciesSupport = __webpack_require__(58);
var arrayMethodUsesToLength = __webpack_require__(43);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var createNonEnumerableProperty = __webpack_require__(32);
var has = __webpack_require__(17);
var setGlobal = __webpack_require__(79);
var inspectSource = __webpack_require__(84);
var InternalStateModule = __webpack_require__(28);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(75);
var anObject = __webpack_require__(16);
var toObject = __webpack_require__(33);
var toLength = __webpack_require__(27);
var toInteger = __webpack_require__(52);
var requireObjectCoercible = __webpack_require__(40);
var advanceStringIndex = __webpack_require__(96);
var regExpExec = __webpack_require__(76);

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(52);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(108);
var global = __webpack_require__(8);
var isObject = __webpack_require__(15);
var createNonEnumerableProperty = __webpack_require__(32);
var objectHas = __webpack_require__(17);
var sharedKey = __webpack_require__(63);
var hiddenKeys = __webpack_require__(53);

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var $map = __webpack_require__(57).map;
var arrayMethodHasSpeciesSupport = __webpack_require__(58);
var arrayMethodUsesToLength = __webpack_require__(43);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var IndexedObject = __webpack_require__(50);
var toIndexedObject = __webpack_require__(38);
var arrayMethodIsStrict = __webpack_require__(71);

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(13);
var from = __webpack_require__(131);
var checkCorrectnessOfIteration = __webpack_require__(90);

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(20);
var definePropertyModule = __webpack_require__(21);
var createPropertyDescriptor = __webpack_require__(46);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(40);

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var IS_PURE = __webpack_require__(45);
var global = __webpack_require__(8);
var getBuiltIn = __webpack_require__(41);
var NativePromise = __webpack_require__(147);
var redefine = __webpack_require__(25);
var redefineAll = __webpack_require__(56);
var setToStringTag = __webpack_require__(42);
var setSpecies = __webpack_require__(91);
var isObject = __webpack_require__(15);
var aFunction = __webpack_require__(55);
var anInstance = __webpack_require__(48);
var classof = __webpack_require__(39);
var inspectSource = __webpack_require__(84);
var iterate = __webpack_require__(68);
var checkCorrectnessOfIteration = __webpack_require__(90);
var speciesConstructor = __webpack_require__(126);
var task = __webpack_require__(128).set;
var microtask = __webpack_require__(148);
var promiseResolve = __webpack_require__(149);
var hostReportErrors = __webpack_require__(150);
var newPromiseCapabilityModule = __webpack_require__(130);
var perform = __webpack_require__(151);
var InternalStateModule = __webpack_require__(28);
var isForced = __webpack_require__(66);
var wellKnownSymbol = __webpack_require__(7);
var V8_VERSION = __webpack_require__(95);

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (V8_VERSION === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE && typeof PromiseRejectionEvent != 'function') return true;
  }
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructor.prototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    // https://github.com/zloirock/core-js/issues/640
    }, { unsafe: true });

    // wrap fetch result
    if (typeof $fetch == 'function') $({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input /* , init */) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
      }
    });
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var global = __webpack_require__(8);
var getBuiltIn = __webpack_require__(41);
var IS_PURE = __webpack_require__(45);
var DESCRIPTORS = __webpack_require__(20);
var NATIVE_SYMBOL = __webpack_require__(81);
var USE_SYMBOL_AS_UID = __webpack_require__(102);
var fails = __webpack_require__(9);
var has = __webpack_require__(17);
var isArray = __webpack_require__(70);
var isObject = __webpack_require__(15);
var anObject = __webpack_require__(16);
var toObject = __webpack_require__(33);
var toIndexedObject = __webpack_require__(38);
var toPrimitive = __webpack_require__(60);
var createPropertyDescriptor = __webpack_require__(46);
var nativeObjectCreate = __webpack_require__(51);
var objectKeys = __webpack_require__(62);
var getOwnPropertyNamesModule = __webpack_require__(65);
var getOwnPropertyNamesExternal = __webpack_require__(144);
var getOwnPropertySymbolsModule = __webpack_require__(87);
var getOwnPropertyDescriptorModule = __webpack_require__(64);
var definePropertyModule = __webpack_require__(21);
var propertyIsEnumerableModule = __webpack_require__(86);
var createNonEnumerableProperty = __webpack_require__(32);
var redefine = __webpack_require__(25);
var shared = __webpack_require__(78);
var sharedKey = __webpack_require__(63);
var hiddenKeys = __webpack_require__(53);
var uid = __webpack_require__(61);
var wellKnownSymbol = __webpack_require__(7);
var wrappedWellKnownSymbolModule = __webpack_require__(121);
var defineWellKnownSymbol = __webpack_require__(122);
var setToStringTag = __webpack_require__(42);
var InternalStateModule = __webpack_require__(28);
var $forEach = __webpack_require__(57).forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(13);
var DESCRIPTORS = __webpack_require__(20);
var global = __webpack_require__(8);
var has = __webpack_require__(17);
var isObject = __webpack_require__(15);
var defineProperty = __webpack_require__(21).f;
var copyConstructorProperties = __webpack_require__(109);

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(122);

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(50);
var requireObjectCoercible = __webpack_require__(40);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(107);
var global = __webpack_require__(8);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(21).f;
var has = __webpack_require__(17);
var wellKnownSymbol = __webpack_require__(7);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(20);
var fails = __webpack_require__(9);
var has = __webpack_require__(17);

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var $trim = __webpack_require__(145).trim;
var forcedStringTrimMethod = __webpack_require__(146);

// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(55);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var $reduce = __webpack_require__(162).left;
var arrayMethodIsStrict = __webpack_require__(71);
var arrayMethodUsesToLength = __webpack_require__(43);

var STRICT_METHOD = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(9);
var classof = __webpack_require__(39);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(16);
var defineProperties = __webpack_require__(103);
var enumBugKeys = __webpack_require__(83);
var hiddenKeys = __webpack_require__(53);
var html = __webpack_require__(106);
var documentCreateElement = __webpack_require__(80);
var sharedKey = __webpack_require__(63);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(25);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(47);
var IndexedObject = __webpack_require__(50);
var toObject = __webpack_require__(33);
var toLength = __webpack_require__(27);
var arraySpeciesCreate = __webpack_require__(93);

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(9);
var wellKnownSymbol = __webpack_require__(7);
var V8_VERSION = __webpack_require__(95);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(20);
var global = __webpack_require__(8);
var isForced = __webpack_require__(66);
var inheritIfRequired = __webpack_require__(117);
var defineProperty = __webpack_require__(21).f;
var getOwnPropertyNames = __webpack_require__(65).f;
var isRegExp = __webpack_require__(125);
var getFlags = __webpack_require__(94);
var stickyHelpers = __webpack_require__(124);
var redefine = __webpack_require__(25);
var fails = __webpack_require__(9);
var setInternalState = __webpack_require__(28).set;
var setSpecies = __webpack_require__(91);
var wellKnownSymbol = __webpack_require__(7);

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y || fails(function () {
  re2[MATCH] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = getFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(
      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
      thisIsRegExp ? this : RegExpPrototype,
      RegExpWrapper
    );

    if (UNSUPPORTED_Y && sticky) setInternalState(result, { sticky: sticky });

    return result;
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;
  while (keys.length > index) proxy(keys[index++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(104);
var enumBugKeys = __webpack_require__(83);

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(78);
var uid = __webpack_require__(61);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(20);
var propertyIsEnumerableModule = __webpack_require__(86);
var createPropertyDescriptor = __webpack_require__(46);
var toIndexedObject = __webpack_require__(38);
var toPrimitive = __webpack_require__(60);
var has = __webpack_require__(17);
var IE8_DOM_DEFINE = __webpack_require__(101);

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(104);
var enumBugKeys = __webpack_require__(83);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(9);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var hiddenKeys = __webpack_require__(53);
var isObject = __webpack_require__(15);
var has = __webpack_require__(17);
var defineProperty = __webpack_require__(21).f;
var uid = __webpack_require__(61);
var FREEZING = __webpack_require__(142);

var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(16);
var isArrayIteratorMethod = __webpack_require__(115);
var toLength = __webpack_require__(27);
var bind = __webpack_require__(47);
var getIteratorMethod = __webpack_require__(69);
var callWithSafeIterationClosing = __webpack_require__(116);

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(89);
var Iterators = __webpack_require__(54);
var wellKnownSymbol = __webpack_require__(7);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(39);

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(9);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(20);
var defineProperty = __webpack_require__(21).f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(60);
var definePropertyModule = __webpack_require__(21);
var createPropertyDescriptor = __webpack_require__(46);

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__(94);
var stickyHelpers = __webpack_require__(124);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(2);
var redefine = __webpack_require__(25);
var fails = __webpack_require__(9);
var wellKnownSymbol = __webpack_require__(7);
var regexpExec = __webpack_require__(74);
var createNonEnumerableProperty = __webpack_require__(32);

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(39);
var regexpExec = __webpack_require__(74);

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var toAbsoluteIndex = __webpack_require__(82);
var toInteger = __webpack_require__(52);
var toLength = __webpack_require__(27);
var toObject = __webpack_require__(33);
var arraySpeciesCreate = __webpack_require__(93);
var createProperty = __webpack_require__(73);
var arrayMethodHasSpeciesSupport = __webpack_require__(58);
var arrayMethodUsesToLength = __webpack_require__(43);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(45);
var store = __webpack_require__(100);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var createNonEnumerableProperty = __webpack_require__(32);

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var isObject = __webpack_require__(15);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(9);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(52);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 83 */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(100);

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var createIteratorConstructor = __webpack_require__(110);
var getPrototypeOf = __webpack_require__(112);
var setPrototypeOf = __webpack_require__(113);
var setToStringTag = __webpack_require__(42);
var createNonEnumerableProperty = __webpack_require__(32);
var redefine = __webpack_require__(25);
var wellKnownSymbol = __webpack_require__(7);
var IS_PURE = __webpack_require__(45);
var Iterators = __webpack_require__(54);
var IteratorsCore = __webpack_require__(111);

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),
/* 87 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(7);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(88);
var classofRaw = __webpack_require__(39);
var wellKnownSymbol = __webpack_require__(7);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(7);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(41);
var definePropertyModule = __webpack_require__(21);
var wellKnownSymbol = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(20);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(52);
var requireObjectCoercible = __webpack_require__(40);

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);
var isArray = __webpack_require__(70);
var wellKnownSymbol = __webpack_require__(7);

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(16);

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var userAgent = __webpack_require__(123);

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(92).charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(75);
var anObject = __webpack_require__(16);
var toLength = __webpack_require__(27);
var requireObjectCoercible = __webpack_require__(40);
var advanceStringIndex = __webpack_require__(96);
var regExpExec = __webpack_require__(76);

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "input-field,input-bool,input-file,input-select{display:inline-block;width:300px;max-width:100%;vertical-align:top;position:relative;color:inherit}input-field .input-field-input,input-bool .input-field-input,input-file .input-field-input,input-select .input-field-input{background:rgba(255,255,255,0.4);position:relative;border:none;border-radius:2px;display:block;margin:0em;height:100%;width:100%;padding:1em;opacity:1;font:inherit;color:inherit;outline:none !important;-webkit-appearance:none;-moz-appearance:none;appearance:none;box-sizing:border-box;text-overflow:ellipsis;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;box-shadow:none;-webkit-transition:color 0.4s, background-color 0.4s, box-shadow 0.3s;transition:color 0.4s, background-color 0.4s, box-shadow 0.3s}input-field .input-field-input[disabled],input-bool .input-field-input[disabled],input-file .input-field-input[disabled],input-select .input-field-input[disabled]{pointer-events:none;cursor:not-allowed;opacity:0.6;background:rgba(200,200,200,0.6)}input-field .input-field-input[readonly],input-bool .input-field-input[readonly],input-file .input-field-input[readonly],input-select .input-field-input[readonly]{cursor:not-allowed;pointer-events:none}input-field .input-field-input.intl-phone-input,input-bool .input-field-input.intl-phone-input,input-file .input-field-input.intl-phone-input,input-select .input-field-input.intl-phone-input{padding:0;display:-webkit-box;display:flex;flex-wrap:nowrap;-webkit-box-align:center;align-items:center}input-field .input-field-input.intl-phone-input input,input-bool .input-field-input.intl-phone-input input,input-file .input-field-input.intl-phone-input input,input-select .input-field-input.intl-phone-input input{-webkit-box-flex:1;flex-grow:1;width:100%;padding:1em 1em 1em 0.25em;margin:0;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;outline:none !important;font:inherit;line-height:inherit}input-field .input-field-input::-webkit-input-placeholder,input-bool .input-field-input::-webkit-input-placeholder,input-file .input-field-input::-webkit-input-placeholder,input-select .input-field-input::-webkit-input-placeholder{color:currentColor;opacity:0.62}input-field .input-field-input:-webkit-input-placeholder,input-bool .input-field-input:-webkit-input-placeholder,input-file .input-field-input:-webkit-input-placeholder,input-select .input-field-input:-webkit-input-placeholder{color:currentColor;opacity:0.62}input-field .input-field-input:-ms-input-placeholder,input-bool .input-field-input:-ms-input-placeholder,input-file .input-field-input:-ms-input-placeholder,input-select .input-field-input:-ms-input-placeholder{color:currentColor;opacity:0.62}input-field .input-field-input::-webkit-input-placeholder,input-bool .input-field-input::-webkit-input-placeholder,input-file .input-field-input::-webkit-input-placeholder,input-select .input-field-input::-webkit-input-placeholder{color:currentColor;opacity:0.62}input-field .input-field-input::-moz-placeholder,input-bool .input-field-input::-moz-placeholder,input-file .input-field-input::-moz-placeholder,input-select .input-field-input::-moz-placeholder{color:currentColor;opacity:0.62}input-field .input-field-input::-ms-input-placeholder,input-bool .input-field-input::-ms-input-placeholder,input-file .input-field-input::-ms-input-placeholder,input-select .input-field-input::-ms-input-placeholder{color:currentColor;opacity:0.62}input-field .input-field-input::placeholder,input-bool .input-field-input::placeholder,input-file .input-field-input::placeholder,input-select .input-field-input::placeholder{color:currentColor;opacity:0.62}input-field input,input-field textarea,input-bool input,input-bool textarea,input-file input,input-file textarea,input-select input,input-select textarea{cursor:text}input-field input::-ms-clear,input-bool input::-ms-clear,input-file input::-ms-clear,input-select input::-ms-clear{display:none}@supports (-webkit-overflow-scrolling: touch){input-field input.input-field-input:focus,input-field textarea.input-field-input:focus,input-bool input.input-field-input:focus,input-bool textarea.input-field-input:focus,input-file input.input-field-input:focus,input-file textarea.input-field-input:focus,input-select input.input-field-input:focus,input-select textarea.input-field-input:focus{font-size:16px !important}}input-field label,input-bool label,input-file label,input-select label{padding:0.1em;font-weight:bold;min-height:1.6em;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;outline:none !important;opacity:1;cursor:pointer;-webkit-transition:opacity 0.2s ease-in-out 0.1s, -webkit-transform 0.2s ease-in-out;transition:opacity 0.2s ease-in-out 0.1s, -webkit-transform 0.2s ease-in-out;transition:opacity 0.2s ease-in-out 0.1s, transform 0.2s ease-in-out;transition:opacity 0.2s ease-in-out 0.1s, transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out}input-field label.input-field-left-label,input-bool label.input-field-left-label,input-file label.input-field-left-label,input-select label.input-field-left-label{padding-right:1em}input-field label.input-field-right-label,input-bool label.input-field-right-label,input-file label.input-field-right-label,input-select label.input-field-right-label{padding-left:1em}input-field label.input-field-inside-label,input-bool label.input-field-inside-label,input-file label.input-field-inside-label,input-select label.input-field-inside-label{position:relative;pointer-events:none;padding:0;font-weight:normal;opacity:0.5;font-size:85%;-webkit-transform:scale(1.1) translateY(2.5em) translateX(1em);transform:scale(1.1) translateY(2.5em) translateX(1em);-webkit-transform-origin:left center;transform-origin:left center;min-height:1.6em;max-width:calc(100% - 6em);-webkit-transition:max-width 0.2s, opacity 0.2s, -webkit-transform 0.2s;transition:max-width 0.2s, opacity 0.2s, -webkit-transform 0.2s;transition:max-width 0.2s, transform 0.2s, opacity 0.2s;transition:max-width 0.2s, transform 0.2s, opacity 0.2s, -webkit-transform 0.2s}input-field[has-value=\"true\"] label.input-field-inside-label,input-field[focused=\"true\"] label.input-field-inside-label,input-field[icon][has-value=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-field[icon][has-value=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-field[icon][focused=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-field[icon][focused=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-field[icon][has-value=\"true\"][clearbutton] label.input-field-inside-label,input-field[icon][focused=\"true\"][clearbutton] label.input-field-inside-label,input-bool[has-value=\"true\"] label.input-field-inside-label,input-bool[focused=\"true\"] label.input-field-inside-label,input-bool[icon][has-value=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-bool[icon][has-value=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-bool[icon][focused=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-bool[icon][focused=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-bool[icon][has-value=\"true\"][clearbutton] label.input-field-inside-label,input-bool[icon][focused=\"true\"][clearbutton] label.input-field-inside-label,input-file[has-value=\"true\"] label.input-field-inside-label,input-file[focused=\"true\"] label.input-field-inside-label,input-file[icon][has-value=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-file[icon][has-value=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-file[icon][focused=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-file[icon][focused=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-file[icon][has-value=\"true\"][clearbutton] label.input-field-inside-label,input-file[icon][focused=\"true\"][clearbutton] label.input-field-inside-label,input-select[has-value=\"true\"] label.input-field-inside-label,input-select[focused=\"true\"] label.input-field-inside-label,input-select[icon][has-value=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-select[icon][has-value=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-select[icon][focused=\"true\"][iconalign=\"left\"] label.input-field-inside-label,input-select[icon][focused=\"true\"][iconalign=\"right\"] label.input-field-inside-label,input-select[icon][has-value=\"true\"][clearbutton] label.input-field-inside-label,input-select[icon][focused=\"true\"][clearbutton] label.input-field-inside-label{pointer-events:all;padding:0;font-weight:bold;opacity:1;font-size:85%;-webkit-transform:scale(1) translateY(0em) translateX(0em);transform:scale(1) translateY(0em) translateX(0em);max-width:100%}input-field:not([focused=\"true\"]),input-bool:not([focused=\"true\"]),input-file:not([focused=\"true\"]),input-select:not([focused=\"true\"]){-webkit-transform-style:preserve-3d;transform-style:preserve-3d}input-field:not([focused=\"true\"]) .input-field-label-inside,input-bool:not([focused=\"true\"]) .input-field-label-inside,input-file:not([focused=\"true\"]) .input-field-label-inside,input-select:not([focused=\"true\"]) .input-field-label-inside{-webkit-transform:translate3d(0, 0, 1px);transform:translate3d(0, 0, 1px)}input-field[icon][iconalign=\"left\"] label.input-field-inside-label,input-field[icon][clearbutton] label.input-field-inside-label,input-bool[icon][iconalign=\"left\"] label.input-field-inside-label,input-bool[icon][clearbutton] label.input-field-inside-label,input-file[icon][iconalign=\"left\"] label.input-field-inside-label,input-file[icon][clearbutton] label.input-field-inside-label,input-select[icon][iconalign=\"left\"] label.input-field-inside-label,input-select[icon][clearbutton] label.input-field-inside-label{padding-left:1.2em}input-bool input.input-field-input{cursor:pointer;opacity:0;-webkit-transition:none;transition:none}input-bool label.input-field-left-label,input-bool label.input-field-right-label{margin-top:-0.2em}input-select select.input-field-input{padding:1em 2em 1em 1em}input-select select::-ms-expand{display:none}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(75);
var anObject = __webpack_require__(16);
var requireObjectCoercible = __webpack_require__(40);
var sameValue = __webpack_require__(183);
var regExpExec = __webpack_require__(76);

// @@search logic
fixRegExpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative(nativeSearch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var setGlobal = __webpack_require__(79);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(20);
var fails = __webpack_require__(9);
var createElement = __webpack_require__(80);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(81);

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(20);
var definePropertyModule = __webpack_require__(21);
var anObject = __webpack_require__(16);
var objectKeys = __webpack_require__(62);

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(17);
var toIndexedObject = __webpack_require__(38);
var indexOf = __webpack_require__(105).indexOf;
var hiddenKeys = __webpack_require__(53);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(38);
var toLength = __webpack_require__(27);
var toAbsoluteIndex = __webpack_require__(82);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(41);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);

module.exports = global;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var inspectSource = __webpack_require__(84);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(17);
var ownKeys = __webpack_require__(137);
var getOwnPropertyDescriptorModule = __webpack_require__(64);
var definePropertyModule = __webpack_require__(21);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(111).IteratorPrototype;
var create = __webpack_require__(51);
var createPropertyDescriptor = __webpack_require__(46);
var setToStringTag = __webpack_require__(42);
var Iterators = __webpack_require__(54);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__(112);
var createNonEnumerableProperty = __webpack_require__(32);
var has = __webpack_require__(17);
var wellKnownSymbol = __webpack_require__(7);
var IS_PURE = __webpack_require__(45);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(17);
var toObject = __webpack_require__(33);
var sharedKey = __webpack_require__(63);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(138);

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(16);
var aPossiblePrototype = __webpack_require__(139);

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(13);
var global = __webpack_require__(8);
var isForced = __webpack_require__(66);
var redefine = __webpack_require__(25);
var InternalMetadataModule = __webpack_require__(67);
var iterate = __webpack_require__(68);
var anInstance = __webpack_require__(48);
var isObject = __webpack_require__(15);
var fails = __webpack_require__(9);
var checkCorrectnessOfIteration = __webpack_require__(90);
var setToStringTag = __webpack_require__(42);
var inheritIfRequired = __webpack_require__(117);

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(7);
var Iterators = __webpack_require__(54);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(16);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);
var setPrototypeOf = __webpack_require__(113);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),
/* 118 */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__(57).forEach;
var arrayMethodIsStrict = __webpack_require__(71);
var arrayMethodUsesToLength = __webpack_require__(43);

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(20);
var fails = __webpack_require__(9);
var objectKeys = __webpack_require__(62);
var getOwnPropertySymbolsModule = __webpack_require__(87);
var propertyIsEnumerableModule = __webpack_require__(86);
var toObject = __webpack_require__(33);
var IndexedObject = __webpack_require__(50);

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(7);

exports.f = wellKnownSymbol;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(107);
var has = __webpack_require__(17);
var wrappedWellKnownSymbolModule = __webpack_require__(121);
var defineProperty = __webpack_require__(21).f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(41);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(9);

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);
var classof = __webpack_require__(39);
var wellKnownSymbol = __webpack_require__(7);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(16);
var aFunction = __webpack_require__(55);
var wellKnownSymbol = __webpack_require__(7);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),
/* 127 */
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var fails = __webpack_require__(9);
var classof = __webpack_require__(39);
var bind = __webpack_require__(47);
var html = __webpack_require__(106);
var createElement = __webpack_require__(80);
var IS_IOS = __webpack_require__(129);

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__(123);

module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(55);

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(47);
var toObject = __webpack_require__(33);
var callWithSafeIterationClosing = __webpack_require__(116);
var isArrayIteratorMethod = __webpack_require__(115);
var toLength = __webpack_require__(27);
var createProperty = __webpack_require__(73);
var getIteratorMethod = __webpack_require__(69);

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(4);
var $ = __webpack_require__(13);
var DESCRIPTORS = __webpack_require__(20);
var USE_NATIVE_URL = __webpack_require__(133);
var global = __webpack_require__(8);
var defineProperties = __webpack_require__(103);
var redefine = __webpack_require__(25);
var anInstance = __webpack_require__(48);
var has = __webpack_require__(17);
var assign = __webpack_require__(120);
var arrayFrom = __webpack_require__(131);
var codeAt = __webpack_require__(92).codeAt;
var toASCII = __webpack_require__(180);
var setToStringTag = __webpack_require__(42);
var URLSearchParamsModule = __webpack_require__(181);
var InternalStateModule = __webpack_require__(28);

var NativeURL = global.URL;
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var floor = Math.floor;
var pow = Math.pow;

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[A-Za-z]/;
var ALPHANUMERIC = /[\d+\-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^(0x|0X)/;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/;
// eslint-disable-next-line no-control-regex
var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/;
// eslint-disable-next-line no-control-regex
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/;
// eslint-disable-next-line no-control-regex
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
// eslint-disable-next-line no-control-regex
var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;
  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result;
  // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);
    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }
    url.host = result;
  } else {
    input = toASCII(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }
    numbers.push(number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = numbers.pop();
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// eslint-disable-next-line max-statements
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var char = function () {
    return input.charAt(pointer);
  };

  if (char() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (char()) {
    if (pieceIndex == 8) return;
    if (char() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && HEX.test(char())) {
      value = value * 16 + parseInt(char(), 16);
      pointer++;
      length++;
    }
    if (char() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (char()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (char() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!DIGIT.test(char())) return;
        while (DIGIT.test(char())) {
          number = parseInt(char(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (char() == ':') {
      pointer++;
      if (!char()) return;
    } else if (char()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor(host / 256);
    } return result.join('.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (char, set) {
  var code = codeAt(char, 0);
  return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return has(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0))
    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
    string.length == 2 ||
    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;
  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function (segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

// eslint-disable-next-line max-statements
var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, char, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');

  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    char = codePoints[pointer];
    switch (state) {
      case SCHEME_START:
        if (char && ALPHA.test(char)) {
          buffer += char.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;
        break;

      case SCHEME:
        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
          buffer += char.toLowerCase();
        } else if (char == ':') {
          if (stateOverride && (
            (isSpecial(url) != has(specialSchemes, buffer)) ||
            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
            (url.scheme == 'file' && !url.host)
          )) return;
          url.scheme = buffer;
          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }
          buffer = '';
          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;
        break;

      case NO_SCHEME:
        if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
        if (base.cannotBeABaseURL && char == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }
        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (char == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        } break;

      case PATH_OR_AUTHORITY:
        if (char == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;
        if (char == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (char == '/' || (char == '\\' && isSpecial(url))) {
          state = RELATIVE_SLASH;
        } else if (char == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        } break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (char == '/' || char == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (char == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        } break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (char != '/' && char != '\\') {
          state = AUTHORITY;
          continue;
        } break;

      case AUTHORITY:
        if (char == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);
          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];
            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }
            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;
            else url.username += encodedCodePoints;
          }
          buffer = '';
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += char;
        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (char == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (char == '[') seenBracket = true;
          else if (char == ']') seenBracket = false;
          buffer += char;
        } break;

      case PORT:
        if (DIGIT.test(char)) {
          buffer += char;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url)) ||
          stateOverride
        ) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
            buffer = '';
          }
          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;
        break;

      case FILE:
        url.scheme = 'file';
        if (char == '/' || char == '\\') state = FILE_SLASH;
        else if (base && base.scheme == 'file') {
          if (char == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }
            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        } break;

      case FILE_SLASH:
        if (char == '/' || char == '\\') {
          state = FILE_HOST;
          break;
        }
        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
          else url.host = base.host;
        }
        state = PATH;
        continue;

      case FILE_HOST:
        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          } continue;
        } else buffer += char;
        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (char != '/' && char != '\\') continue;
        } else if (!stateOverride && char == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          state = PATH;
          if (char != '/') continue;
        } break;

      case PATH:
        if (
          char == EOF || char == '/' ||
          (char == '\\' && isSpecial(url)) ||
          (!stateOverride && (char == '?' || char == '#'))
        ) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }
            url.path.push(buffer);
          }
          buffer = '';
          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }
          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(char, pathPercentEncodeSet);
        } break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (char == '?') {
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case QUERY:
        if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          if (char == "'" && isSpecial(url)) url.query += '%27';
          else if (char == '#') url.query += '%23';
          else url.query += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case FRAGMENT:
        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLConstructor, 'URL');
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = String(url);
  var state = setInternalState(that, { type: 'URL' });
  var baseState, failure;
  if (base !== undefined) {
    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
    else {
      failure = parseURL(baseState = {}, String(base));
      if (failure) throw TypeError(failure);
    }
  }
  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);
  searchParamsState.updateURL = function () {
    state.query = String(searchParams) || null;
  };
  if (!DESCRIPTORS) {
    that.href = serializeURL.call(that);
    that.origin = getOrigin.call(that);
    that.protocol = getProtocol.call(that);
    that.username = getUsername.call(that);
    that.password = getPassword.call(that);
    that.host = getHost.call(that);
    that.hostname = getHostname.call(that);
    that.port = getPort.call(that);
    that.pathname = getPathname.call(that);
    that.search = getSearch.call(that);
    that.searchParams = getSearchParams.call(that);
    that.hash = getHash.call(that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';
  if (host !== null) {
    output += '//';
    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }
    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';
  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URL(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? ''
    : port === null ? serializeHost(host)
    : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return { get: getter, set: setter, configurable: true, enumerable: true };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = String(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, String(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = String(port);
      if (port == '') url.port = null;
      else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, pathname + '', PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = String(search);
      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = String(hash);
      if (hash == '') {
        url.fragment = null;
        return;
      }
      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
redefine(URLPrototype, 'toJSON', function toJSON() {
  return serializeURL.call(this);
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
redefine(URLPrototype, 'toString', function toString() {
  return serializeURL.call(this);
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars
  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
    return nativeCreateObjectURL.apply(NativeURL, arguments);
  });
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars
  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
    return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(9);
var wellKnownSymbol = __webpack_require__(7);
var IS_PURE = __webpack_require__(45);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(186);


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(7);
var create = __webpack_require__(51);
var definePropertyModule = __webpack_require__(21);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),
/* 136 */
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
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(41);
var getOwnPropertyNamesModule = __webpack_require__(65);
var getOwnPropertySymbolsModule = __webpack_require__(87);
var anObject = __webpack_require__(16);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(9);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(88);
var classof = __webpack_require__(89);

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__(114);
var collectionStrong = __webpack_require__(143);

// `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects
module.exports = collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(9);

module.exports = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineProperty = __webpack_require__(21).f;
var create = __webpack_require__(51);
var redefineAll = __webpack_require__(56);
var bind = __webpack_require__(47);
var anInstance = __webpack_require__(48);
var iterate = __webpack_require__(68);
var defineIterator = __webpack_require__(85);
var setSpecies = __webpack_require__(91);
var DESCRIPTORS = __webpack_require__(20);
var fastKey = __webpack_require__(67).fastKey;
var InternalStateModule = __webpack_require__(28);

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(38);
var nativeGetOwnPropertyNames = __webpack_require__(65).f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(40);
var whitespaces = __webpack_require__(127);

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(9);
var whitespaces = __webpack_require__(127);

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);

module.exports = global.Promise;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var getOwnPropertyDescriptor = __webpack_require__(64).f;
var classof = __webpack_require__(39);
var macrotask = __webpack_require__(128).set;
var IS_IOS = __webpack_require__(129);

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !IS_IOS) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(16);
var isObject = __webpack_require__(15);
var newPromiseCapability = __webpack_require__(130);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),
/* 151 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),
/* 152 */
/***/ (function(module, exports) {

module.exports = "<div class=ajax-form-container> <form class=ajax-form-form> <grid-layout class=ajax-form-grid></grid-layout> </form> </div> ";

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "ajax-form{font:inherit;line-height:inherit;display:block;position:relative}ajax-form input-field{width:100%}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = "<div class=button-element-container> <button> <span slotname></span> </button> </div> ";

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "button-element{font:inherit;line-height:inherit;display:inline-block;position:relative}.button-element-container{display:block;position:relative;margin:1.4em 0}.button-element-container.nomargin{margin:0}.button-element-container.slim button{padding:0.25em}.button-element-container.short button{padding:0.5em 1em}.button-element-container.nobackground button{background:transparent;background-color:transparent}.button-element-container.nobackground button:hover{background:transparent;background-color:transparent}.button-element-container.noshadow button{box-shadow:none}.button-element-container.noshadow button:hover{box-shadow:none}.button-element-container button{background:#fafafa;position:relative;border:none;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;margin:0px;width:auto;padding:1em;font:inherit;color:inherit;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;box-sizing:border-box;text-overflow:ellipsis;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;box-shadow:inset 0px -2px 0px rgba(0,0,0,0.13),inset 0px 0px 0px 1px rgba(0,0,0,0.25);border-radius:2px;outline:0px !important;-webkit-transform:scale(1);transform:scale(1);white-space:nowrap;-webkit-transition:box-shadow 0.2s, color 0.4s, background-color 0.4s;transition:box-shadow 0.2s, color 0.4s, background-color 0.4s}.button-element-container button:hover{background-color:#fff;box-shadow:inset 0px -2px 0px rgba(0,0,0,0.13),inset 0px 0px 0px 1px rgba(0,0,0,0.25),0px 10px 9px -6px rgba(0,0,0,0.2)}.button-element-container button .btn-submit{position:absolute;width:100%;height:100%;background:none;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;opacity:0}.button-element-container button input{position:absolute;background:transparent;border:none;width:100%;height:100%;display:block;color:transparent;margin:0;padding:0;opacity:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.button-element-container.disabled{opacity:0.25;pointer-events:none}.button-element-container slot{pointer-events:none}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "button-element{opacity:0;display:inline-block}button-element[ready=\"true\"]{opacity:1}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".content-collapse-toggler{cursor:pointer;display:-webkit-box;display:flex;-webkit-box-align:start;align-items:flex-start;width:100%}.content-collapse-toggler .content-collapse-toggler-content{-webkit-box-flex:1;flex-grow:1}.content-collapse-toggler icon-element.content-collapse-toggler-icon{margin-left:-0.33em;margin-top:-0.125em;-webkit-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:-webkit-transform 0.2s;transition:-webkit-transform 0.2s;transition:transform 0.2s;transition:transform 0.2s, -webkit-transform 0.2s}.content-collapse-toggler icon-element.content-collapse-toggler-icon[rotation=\"down\"]{-webkit-transform:rotate(90deg);transform:rotate(90deg)}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 158 */
/***/ (function(module, exports) {

module.exports = "<div class=content-collapse-container> <div class=content-collapse-toggler> <icon-element class=content-collapse-toggler-icon size=1.5em></icon-element> <div class=content-collapse-toggler-content> <span slotname=content-collapse-toggler> </span></div> </div> <div class=content-collapse-content> <content-transition class=content-collapse-transition keepchildren=true type=fade> <div class=content-collapse-empty slot=hidden></div> <div class=content-collapse-content-holder slot=hidden> <span slotname=content-collapse-content></span> </div> </content-transition> </div> </div> ";

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".content-transition-container{position:relative}.content-transition-container .current-slot{opacity:1}.content-transition-container .next-slot{width:100%;height:100%;position:absolute;top:0;left:0;opacity:0}.content-transition-container .hidden-slot{width:100%;height:100%;overflow:hidden;opacity:0;pointer-events:none;position:absolute;top:0;left:0;z-index:-1;visibility:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.content-transition-container .hidden-slot .hidden-slot-inner{width:100%;height:100%;display:inline-block;position:absolute;top:0;left:0}.content-transition-container.keepchildren .next-slot{pointer-events:none;opacity:0;-webkit-transform:translateZ(0) translateX(-100%);transform:translateZ(0) translateX(-100%)}.content-transition-container.keepchildren[type=\"fade\"] .next-slot{-webkit-transform:translateZ(0) translateX(0);transform:translateZ(0) translateX(0)}.content-transition-container.sliding{overflow:hidden}.content-transition-container.flex-stretch{-webkit-box-flex:1;flex-grow:1;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.content-transition-container.flex-stretch .content-transition-inner,.content-transition-container.flex-stretch .current-slot,.content-transition-container.flex-stretch .next-slot,.content-transition-container.flex-stretch .hidden-slot{-webkit-box-flex:1;flex-grow:1;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "content-transition{display:block;width:100%;position:relative}content-transition.flex-stretch{-webkit-box-flex:1;flex-grow:1;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 161 */
/***/ (function(module, exports) {

module.exports = "<div class=content-transition-container> <div class=content-transition-inner> <div class=next-slot> <span slotname=next></span> </div> <div class=current-slot> <span slotname=current current=true></span> </div> <div class=hidden-slot> <div class=hidden-slot-inner> <span slotname=hidden></span> </div> </div> </div> </div> ";

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(55);
var toObject = __webpack_require__(33);
var IndexedObject = __webpack_require__(50);
var toLength = __webpack_require__(27);

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".grid-layout-items{display:-webkit-box;display:flex;display:grid;justify-items:center;grid-auto-flow:dense;width:100%;flex-wrap:wrap}.grid-layout-items>*,.grid-layout-items ::slotted(*){width:100%}.grid-layout-items .grid-layout-item{box-sizing:border-box}.grid-layout-items .grid-layout-item.hidden{position:absolute;z-index:-1;opacity:0;pointer-events:none}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "grid-layout{display:block;opacity:0;-webkit-transition:opacity 0.15s linear 0.15s;transition:opacity 0.15s linear 0.15s}grid-layout[viewable=\"true\"]{opacity:1}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports = "<div class=grid-layout-container> <div class=grid-layout-items></div> <style class=grid-innerStyles></style> </div> ";

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".icon-element-container{display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:start;justify-content:flex-start}.icon-element-container .svg-container{display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:start;justify-content:flex-start}.icon-element-container svg{width:100%;height:100%;fill:currentColor}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 167 */
/***/ (function(module, exports) {

module.exports = "<div class=icon-element-container> <div class=svg-container></div> </div> ";

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".input-field-container{display:inline-block;width:100%;max-width:100%;vertical-align:top;opacity:1;pointer-events:all;position:relative}.input-field-container *{box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.input-field-container .input-field-container-inner{position:relative;padding:1em 0em;min-height:1em;opacity:0;pointer-events:none;max-width:100%;transition:opacity 0.2s ease-in-out 0.01s}.input-field-container .input-field-container-inner.ready{opacity:1;pointer-events:all}.input-field-container .input-field-container-inner[label-position=\"inside\"]{padding:0 0 1.3em}.input-field-container .input-field-container-inner[label-position=\"left\"] .input-field-bottom-content{justify-content:flex-end;text-align:right}.input-field-container .input-field-container-inner[label-position=\"right\"] .input-field-bottom-content{justify-content:flex-start}.input-field-container .input-field-container-inner.invalid[label-position=\"inside\"]{padding:0}.input-field-container .input-field-container-inner.invalid .input-field-message-help{opacity:0;font-size:0%;transform:scale(0)}.input-field-container .input-field-container-inner.invalid .input-field-message-error{opacity:1;font-size:90%;transform:scale(1)}.input-field-container .input-field-container-inner.invalid .input-field-border{box-shadow:inset 0px 0px 0px 1px #a10005}.input-field-container .input-field-container-inner.icon .input-field-icon{pointer-events:all;cursor:pointer}.input-field-container .input-field-container-inner.clearbutton .input-field-clear{opacity:1;pointer-events:all;cursor:pointer;display:flex}.input-field-container .input-field-container-inner.icon[icon-align=\"right\"] .input-field-input,.input-field-container .input-field-container-inner.clearbutton .input-field-input{padding-right:2.2em}.input-field-container .input-field-container-inner.icon[icon-align=\"left\"] .input-field-input{padding-left:2.2em}.input-field-container .input-field-container-inner.icon.clearbutton .input-field-input{padding-left:2.2em;padding-right:2.2em}.input-field-container .input-field-container-inner.icon[icon-align=\"right\"] .input-field-input-overlay{justify-content:flex-end}.input-field-container .input-field-container-inner.icon.clearbutton[icon-align=\"right\"] .input-field-input-overlay{justify-content:space-between}.input-field-container .input-field-bottom-content{display:flex;align-items:center;justify-content:space-between;font-size:90%;padding:0.1em}.input-field-container .input-field-message-help{opacity:0.6;line-height:1.6em;font-size:90%;transform:scale(1);transition:opacity 0.2s ease-in-out, transform 0.2s ease-in-out}.input-field-container .input-field-message-error{opacity:0;line-height:1.6em;transform:scale(0);font-size:0%;color:#a10005;transition:opacity 0.2s ease-in-out 0.1s, transform 0.2s ease-in-out}.input-field-container icon-element{align-items:center;justify-content:center;display:flex}.input-field-container .input-field-clear{display:none}.input-field-container .input-field-middle-section{display:flex;flex-wrap:nowrap;width:100%;align-items:center;position:relative}.input-field-container .input-field-input-section{width:100%;max-width:100%;position:relative;flex-grow:1;flex-basis:0}.input-field-container .input-field-input-container{position:relative}.input-field-container .input-field-border{position:absolute;width:100%;height:100%;top:0;left:0;border-radius:2px;pointer-events:none;box-shadow:inset 0px 0px 0px 1px;color:inherit;transition:box-shadow 0.4s}.input-field-container .input-field-input-overlay{position:absolute;width:100%;height:100%;top:0px;left:0px;pointer-events:none;display:flex;align-items:center;justify-content:space-between;padding:0em 0.5em}.input-field-container [slotblock]{display:block}.input-field-container.input-bool .input-field-container-inner[showicon=\"true\"] .input-field-checkbox-overlay:after{content:'';border:0.125em solid;border-top-color:transparent;border-right-color:transparent;position:absolute;width:0.45em;height:0.225em;left:0.23em;top:0.29em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);border-radius:0.15em}.input-field-container.input-bool .input-field-container-inner[input-kind=\"checkbox\"],.input-field-container.input-bool .input-field-container-inner[input-kind=\"radio\"]{min-height:5.25em;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center}.input-field-container.input-bool .input-field-container-inner[input-kind=\"checkbox\"] .input-field-input-container-inner,.input-field-container.input-bool .input-field-container-inner[input-kind=\"radio\"] .input-field-input-container-inner{width:1.7em;height:1.7em;left:-0.25em;top:-0.17em;position:relative;margin-right:-0.5em;margin-bottom:-0.25em;cursor:pointer;pointer-events:all}.input-field-container.input-bool .input-field-container-inner[input-kind=\"checkbox\"] .input-field-border,.input-field-container.input-bool .input-field-container-inner[input-kind=\"radio\"] .input-field-border{box-shadow:none;-webkit-transition:none;transition:none}.input-field-container.input-bool .input-field-container-inner[input-kind=\"checkbox\"] effect-underline,.input-field-container.input-bool .input-field-container-inner[input-kind=\"radio\"] effect-underline{display:none}.input-field-container.input-bool .input-field-container-inner[input-kind=\"checkbox\"] .input-field-middle-section,.input-field-container.input-bool .input-field-container-inner[input-kind=\"checkbox\"] .input-field-input-section,.input-field-container.input-bool .input-field-container-inner[input-kind=\"radio\"] .input-field-middle-section,.input-field-container.input-bool .input-field-container-inner[input-kind=\"radio\"] .input-field-input-section{width:auto;-webkit-box-flex:0;flex-grow:0}.input-field-container.input-bool .input-field-container-inner[input-kind=\"checkbox\"] .input-field-middle-section,.input-field-container.input-bool .input-field-container-inner[input-kind=\"radio\"] .input-field-middle-section{-webkit-box-align:center;align-items:center}.input-field-container.input-bool .input-field-container-inner[input-kind=\"checkbox\"] .input-field-input-container-inner:after{content:\"\";display:block;position:absolute;top:0.24em;left:0.24em;width:1.2em;height:1.2em;pointer-events:none;background:rgba(255,255,255,0.4);box-shadow:inset 0px 0px 0px 1px;-webkit-transition:background-color .4s, box-shadow .4s;transition:background-color .4s, box-shadow .4s}.input-field-container.input-bool .input-field-container-inner[input-kind=\"checkbox\"].checked .input-field-input-container-inner:after{background:currentColor}.input-field-container.input-bool .input-field-container-inner[input-kind=\"radio\"] .input-field-input-overlay{border-radius:50%}.input-field-container.input-bool .input-field-container-inner[input-kind=\"radio\"] .input-field-input-container-inner:before{content:\"\";display:block;position:absolute;top:0.235em;left:0.235em;width:1.2em;height:1.2em;pointer-events:none;background:rgba(255,255,255,0.4);border-radius:50%;box-shadow:inset 0px 0px 0px 1px;-webkit-transition:background-color .4s, box-shadow .4s;transition:background-color .4s, box-shadow .4s}.input-field-container.input-bool .input-field-container-inner[input-kind=\"radio\"].checked .input-field-input-container-inner:before{background:currentColor}.input-field-container.input-bool .input-field-container-inner[input-kind=\"radio\"].checked .input-field-input-container-inner:after{content:\"\\00b7\";color:#fff;display:-webkit-box;display:flex;position:absolute;pointer-events:none;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;font-size:2.3em;top:0;left:0;width:100%;height:100%;line-height:2.3em}.input-field-container.input-bool .input-field-container-inner.notempty.checked[input-kind=\"checkbox\"] .input-field-checkbox-overlay{opacity:1}.input-field-container.input-bool .input-field-checkbox-overlay{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;position:absolute;width:1.2em;height:1.2em;top:0px;left:0px;pointer-events:none;color:#fff;opacity:0;margin-left:0.009em;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out}.input-field-container.input-bool .input-field-input-container{position:relative;left:-50%}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 169 */
/***/ (function(module, exports) {

module.exports = "<div class=\"input-field-container input-bool\"> <div class=input-field-container-inner> <div class=input-field-top-section> <div class=input-field-label-top> <span slotblock label-top></span> </div> </div> <div class=input-field-middle-section> <div class=input-field-label-left> <span slotblock label-left></span> </div> <div class=input-field-input-section> <div class=input-field-label-inside> <span slotblock label-inside></span> </div> <div class=input-field-input-container> <div class=input-field-input-container-inner> <span slotblock inputholder></span> </div> <div class=input-field-input-overlay> <div class=input-field-checkbox-overlay> <span slotblock input-field-checkbox-icon></span> </div> </div> <div class=input-field-border></div> </div> </div> <div class=input-field-label-right> <span slotblock label-right></span> </div> </div> <div class=input-field-bottom-section> <div class=input-field-label-bottom> <span slotblock label-bottom></span> </div> <div class=input-field-bottom-content> <div class=input-field-messages> <div class=input-field-message-help></div> <div class=input-field-message-error></div> </div> </div> </div> </div> </div> ";

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".input-field-container{display:inline-block;width:100%;max-width:100%;vertical-align:top;opacity:1;pointer-events:all;position:relative}.input-field-container *{box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.input-field-container .input-field-container-inner{position:relative;padding:1em 0em;min-height:1em;opacity:0;pointer-events:none;max-width:100%;transition:opacity 0.2s ease-in-out 0.01s}.input-field-container .input-field-container-inner.ready{opacity:1;pointer-events:all}.input-field-container .input-field-container-inner[label-position=\"inside\"]{padding:0 0 1.3em}.input-field-container .input-field-container-inner[label-position=\"left\"] .input-field-bottom-content{justify-content:flex-end;text-align:right}.input-field-container .input-field-container-inner[label-position=\"right\"] .input-field-bottom-content{justify-content:flex-start}.input-field-container .input-field-container-inner.invalid[label-position=\"inside\"]{padding:0}.input-field-container .input-field-container-inner.invalid .input-field-message-help{opacity:0;font-size:0%;transform:scale(0)}.input-field-container .input-field-container-inner.invalid .input-field-message-error{opacity:1;font-size:90%;transform:scale(1)}.input-field-container .input-field-container-inner.invalid .input-field-border{box-shadow:inset 0px 0px 0px 1px #a10005}.input-field-container .input-field-container-inner.icon .input-field-icon{pointer-events:all;cursor:pointer}.input-field-container .input-field-container-inner.clearbutton .input-field-clear{opacity:1;pointer-events:all;cursor:pointer;display:flex}.input-field-container .input-field-container-inner.icon[icon-align=\"right\"] .input-field-input,.input-field-container .input-field-container-inner.clearbutton .input-field-input{padding-right:2.2em}.input-field-container .input-field-container-inner.icon[icon-align=\"left\"] .input-field-input{padding-left:2.2em}.input-field-container .input-field-container-inner.icon.clearbutton .input-field-input{padding-left:2.2em;padding-right:2.2em}.input-field-container .input-field-container-inner.icon[icon-align=\"right\"] .input-field-input-overlay{justify-content:flex-end}.input-field-container .input-field-container-inner.icon.clearbutton[icon-align=\"right\"] .input-field-input-overlay{justify-content:space-between}.input-field-container .input-field-bottom-content{display:flex;align-items:center;justify-content:space-between;font-size:90%;padding:0.1em}.input-field-container .input-field-message-help{opacity:0.6;line-height:1.6em;font-size:90%;transform:scale(1);transition:opacity 0.2s ease-in-out, transform 0.2s ease-in-out}.input-field-container .input-field-message-error{opacity:0;line-height:1.6em;transform:scale(0);font-size:0%;color:#a10005;transition:opacity 0.2s ease-in-out 0.1s, transform 0.2s ease-in-out}.input-field-container icon-element{align-items:center;justify-content:center;display:flex}.input-field-container .input-field-clear{display:none}.input-field-container .input-field-middle-section{display:flex;flex-wrap:nowrap;width:100%;align-items:center;position:relative}.input-field-container .input-field-input-section{width:100%;max-width:100%;position:relative;flex-grow:1;flex-basis:0}.input-field-container .input-field-input-container{position:relative}.input-field-container .input-field-border{position:absolute;width:100%;height:100%;top:0;left:0;border-radius:2px;pointer-events:none;box-shadow:inset 0px 0px 0px 1px;color:inherit;transition:box-shadow 0.4s}.input-field-container .input-field-input-overlay{position:absolute;width:100%;height:100%;top:0px;left:0px;pointer-events:none;display:flex;align-items:center;justify-content:space-between;padding:0em 0.5em}.input-field-container [slotblock]{display:block}.input-field-container.input-field .input-field-container-inner[input-kind=\"textarea\"] .input-field-input-overlay{padding-top:0.85em;-webkit-box-align:start;align-items:flex-start}.input-field-container.input-field .input-field-container-inner.max .input-field-character-count-max-divider,.input-field-container.input-field .input-field-container-inner.max .input-field-character-count-max,.input-field-container.input-field .input-field-container-inner.maxlength .input-field-character-count-max-divider,.input-field-container.input-field .input-field-container-inner.maxlength .input-field-character-count-max{display:block}.input-field-container.input-field .input-field-container-inner.showcount .input-field-character-count-container{display:block}.input-field-container.input-field .input-field-character-count-inner{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:end;justify-content:flex-end;opacity:0.6;padding:0em 0em 0em 1em}.input-field-container.input-field .input-field-character-count-container,.input-field-container.input-field .input-field-character-count-max-divider,.input-field-container.input-field .input-field-character-count-max{display:none}.input-field-container.input-field .input-field-input-container-inner[resize=\"auto\"]>[inputholder]>.input-field-input,.input-field-container.input-field .input-field-input-container-inner[resize=\"none\"]>[inputholder]>.input-field-input{resize:none}.input-field-container.input-field .input-field-input-container-inner[resize=\"horizontal\"]>[inputholder]>.input-field-input{resize:horizontal}.input-field-container.input-field .input-field-input-container-inner[resize=\"vertical\"]>[inputholder]>.input-field-input{resize:vertical}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 171 */
/***/ (function(module, exports) {

module.exports = "<div class=\"input-field-container input-field\"> <div class=input-field-container-inner> <div class=input-field-top-section> <div class=input-field-label-top> <span slotblock label-top></span> </div> </div> <div class=input-field-middle-section> <div class=input-field-label-left> <span slotblock label-left></span> </div> <div class=input-field-input-section> <div class=input-field-label-inside> <span slotblock label-inside></span> </div> <div class=input-field-input-container> <div class=input-field-input-container-inner> <span slotblock inputholder></span> </div> <div class=input-field-input-overlay> <div class=input-field-icon> <span slotblock input-field-icon></span> </div> <div class=input-field-clear> <span slotblock input-field-clear></span> </div> </div> <div class=input-field-border></div> </div> </div> <div class=input-field-label-right> <span slotblock label-right></span> </div> </div> <div class=input-field-bottom-section> <div class=input-field-label-bottom> <span slotblock label-bottom></span> </div> <div class=input-field-bottom-content> <div class=input-field-messages> <div class=input-field-message-help></div> <div class=input-field-message-error></div> </div> <div class=input-field-character-count-container> <div class=input-field-character-count-inner> <div class=input-field-character-count></div> <div class=input-field-character-count-max-divider>/</div> <div class=input-field-character-count-max></div> </div> </div> </div> </div> </div> </div> ";

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".input-field-container{display:inline-block;width:100%;max-width:100%;vertical-align:top;opacity:1;pointer-events:all;position:relative}.input-field-container *{box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.input-field-container .input-field-container-inner{position:relative;padding:1em 0em;min-height:1em;opacity:0;pointer-events:none;max-width:100%;transition:opacity 0.2s ease-in-out 0.01s}.input-field-container .input-field-container-inner.ready{opacity:1;pointer-events:all}.input-field-container .input-field-container-inner[label-position=\"inside\"]{padding:0 0 1.3em}.input-field-container .input-field-container-inner[label-position=\"left\"] .input-field-bottom-content{justify-content:flex-end;text-align:right}.input-field-container .input-field-container-inner[label-position=\"right\"] .input-field-bottom-content{justify-content:flex-start}.input-field-container .input-field-container-inner.invalid[label-position=\"inside\"]{padding:0}.input-field-container .input-field-container-inner.invalid .input-field-message-help{opacity:0;font-size:0%;transform:scale(0)}.input-field-container .input-field-container-inner.invalid .input-field-message-error{opacity:1;font-size:90%;transform:scale(1)}.input-field-container .input-field-container-inner.invalid .input-field-border{box-shadow:inset 0px 0px 0px 1px #a10005}.input-field-container .input-field-container-inner.icon .input-field-icon{pointer-events:all;cursor:pointer}.input-field-container .input-field-container-inner.clearbutton .input-field-clear{opacity:1;pointer-events:all;cursor:pointer;display:flex}.input-field-container .input-field-container-inner.icon[icon-align=\"right\"] .input-field-input,.input-field-container .input-field-container-inner.clearbutton .input-field-input{padding-right:2.2em}.input-field-container .input-field-container-inner.icon[icon-align=\"left\"] .input-field-input{padding-left:2.2em}.input-field-container .input-field-container-inner.icon.clearbutton .input-field-input{padding-left:2.2em;padding-right:2.2em}.input-field-container .input-field-container-inner.icon[icon-align=\"right\"] .input-field-input-overlay{justify-content:flex-end}.input-field-container .input-field-container-inner.icon.clearbutton[icon-align=\"right\"] .input-field-input-overlay{justify-content:space-between}.input-field-container .input-field-bottom-content{display:flex;align-items:center;justify-content:space-between;font-size:90%;padding:0.1em}.input-field-container .input-field-message-help{opacity:0.6;line-height:1.6em;font-size:90%;transform:scale(1);transition:opacity 0.2s ease-in-out, transform 0.2s ease-in-out}.input-field-container .input-field-message-error{opacity:0;line-height:1.6em;transform:scale(0);font-size:0%;color:#a10005;transition:opacity 0.2s ease-in-out 0.1s, transform 0.2s ease-in-out}.input-field-container icon-element{align-items:center;justify-content:center;display:flex}.input-field-container .input-field-clear{display:none}.input-field-container .input-field-middle-section{display:flex;flex-wrap:nowrap;width:100%;align-items:center;position:relative}.input-field-container .input-field-input-section{width:100%;max-width:100%;position:relative;flex-grow:1;flex-basis:0}.input-field-container .input-field-input-container{position:relative}.input-field-container .input-field-border{position:absolute;width:100%;height:100%;top:0;left:0;border-radius:2px;pointer-events:none;box-shadow:inset 0px 0px 0px 1px;color:inherit;transition:box-shadow 0.4s}.input-field-container .input-field-input-overlay{position:absolute;width:100%;height:100%;top:0px;left:0px;pointer-events:none;display:flex;align-items:center;justify-content:space-between;padding:0em 0.5em}.input-field-container [slotblock]{display:block}.input-field-container.input-select .input-field-arrow{margin-right:-0.25em}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 173 */
/***/ (function(module, exports) {

module.exports = "<div class=\"input-field-container input-select\"> <div class=input-field-container-inner> <div class=input-field-top-section> <div class=input-field-label-top> <span slotblock label-top></span> </div> </div> <div class=input-field-middle-section> <div class=input-field-label-left> <span slotblock label-left></span> </div> <div class=input-field-input-section> <div class=input-field-label-inside> <span slotblock label-inside></span> </div> <div class=input-field-input-container> <div class=input-field-input-container-inner> <span slotblock inputholder></span> </div> <div class=input-field-input-overlay> <icon-element class=input-field-icon size=1.25em></icon-element> <icon-element class=input-field-arrow size=1.5em></icon-element> </div> <div class=input-field-border></div> </div> </div> <div class=input-field-label-right> <span slotblock label-right></span> </div> </div> <div class=input-field-bottom-section> <div class=input-field-label-bottom> <span slotblock label-bottom></span> </div> <div class=input-field-bottom-content> <div class=input-field-messages> <div class=input-field-message-help></div> <div class=input-field-message-error></div> </div> </div> </div> </div> </div> ";

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".spinner-element-container{width:100%;height:100%;top:0;left:0;opacity:0;pointer-events:none;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;-webkit-transition:opacity 0.3s;transition:opacity 0.3s}.spinner-element-container.fullpage{position:fixed}.spinner-element-container.shown{opacity:1;pointer-events:all}.spinner-element-container.shown[type=\"column\"] .spin,.spinner-element-container.shown[type=\"column\"] .spin:before,.spinner-element-container.shown[type=\"column\"] .spin:after{background:currentColor;width:1em;height:4em;position:relative;box-shadow:0 0px;-webkit-animation:column 1s infinite ease-in-out;animation:column 1s infinite ease-in-out}.spinner-element-container.shown[type=\"column\"] .spin:before,.spinner-element-container.shown[type=\"column\"] .spin:after{content:\"\";position:absolute;top:0}.spinner-element-container.shown[type=\"column\"] .spin{-webkit-animation-delay:-0.16s;animation-delay:-0.16s}.spinner-element-container.shown[type=\"column\"] .spin:before{left:-1.38em;-webkit-animation-delay:-0.32s;animation-delay:-0.32s}.spinner-element-container.shown[type=\"column\"] .spin:after{left:1.38em}@-webkit-keyframes column{0%,80%,100%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}@keyframes column{0%,80%,100%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}.spinner-element-container.shown[type=\"circle\"] .spin,.spinner-element-container.shown[type=\"circle\"] .spin:after{border-radius:50%;box-sizing:content-box}.spinner-element-container.shown[type=\"circle\"] .spin{position:relative;border:0.5em solid transparent;border-top-color:inherit;width:4em;height:4em;-webkit-animation:circle 1s infinite linear;animation:circle 1s infinite linear}.spinner-element-container.shown[type=\"circle\"] .spin:after{content:\"\";position:absolute;border:0.5em solid currentColor;opacity:0.19;top:-0.5em;left:-0.5em;width:100%;height:100%}@-webkit-keyframes circle{0%{-webkit-transform:translateZ(0) rotate(0deg);transform:translateZ(0) rotate(0deg)}100%{-webkit-transform:translateZ(0) rotate(360deg);transform:translateZ(0) rotate(360deg)}}@keyframes circle{0%{-webkit-transform:translateZ(0) rotate(0deg);transform:translateZ(0) rotate(0deg)}100%{-webkit-transform:translateZ(0) rotate(360deg);transform:translateZ(0) rotate(360deg)}}.spinner-element-container.shown[type=\"ripple\"] .spin,.spinner-element-container.shown[type=\"ripple\"] .spin:after,.spinner-element-container.shown[type=\"ripple\"] .spin:before{border-radius:50%;box-sizing:content-box}.spinner-element-container.shown[type=\"ripple\"] .spin{position:relative;width:5em;height:5em}.spinner-element-container.shown[type=\"ripple\"] .spin:after,.spinner-element-container.shown[type=\"ripple\"] .spin:before{content:\"\";position:absolute;width:100%;height:100%;border:0.5em solid;opacity:0;-webkit-transform:translateZ(0) scale(0);transform:translateZ(0) scale(0);-webkit-animation:ripple 1s infinite ease-in-out;animation:ripple 1s infinite ease-in-out}.spinner-element-container.shown[type=\"ripple\"] .spin:after{-webkit-animation-delay:0.33s;animation-delay:0.33s}@-webkit-keyframes ripple{0%{opacity:0;-webkit-transform:translateZ(0) scale(0);transform:translateZ(0) scale(0)}7%{opacity:0.38}100%{opacity:0;-webkit-transform:translateZ(0) scale(1);transform:translateZ(0) scale(1)}}@keyframes ripple{0%{opacity:0;-webkit-transform:translateZ(0) scale(0);transform:translateZ(0) scale(0)}7%{opacity:0.38}100%{opacity:0;-webkit-transform:translateZ(0) scale(1);transform:translateZ(0) scale(1)}}.spinner-element-container.shown[type=\"boading\"] .spin,.spinner-element-container.shown[type=\"boading\"] .spin:after,.spinner-element-container.shown[type=\"boading\"] .spin:before{border-radius:50%;box-sizing:content-box}.spinner-element-container.shown[type=\"boading\"] .spin{position:relative;width:5em;height:5em;margin-left:2em}.spinner-element-container.shown[type=\"boading\"] .spin:after,.spinner-element-container.shown[type=\"boading\"] .spin:before{content:\"\";position:absolute;width:50%;height:50%;background:currentColor;opacity:1;-webkit-transform:translateZ(0) translateX(0) scale(0);transform:translateZ(0) translateX(0) scale(0);-webkit-animation:boading 1s infinite linear;animation:boading 1s infinite linear}.spinner-element-container.shown[type=\"boading\"] .spin:after{opacity:0.75;-webkit-animation-delay:0.5s;animation-delay:0.5s}@-webkit-keyframes boading{0%{-webkit-transform:translateZ(0) translateX(25%) scale(0);transform:translateZ(0) translateX(25%) scale(0)}25%{-webkit-transform:translateZ(0) translateX(75%) scale(0.5);transform:translateZ(0) translateX(75%) scale(0.5)}50%{-webkit-transform:translateZ(0) translateX(0%) scale(1);transform:translateZ(0) translateX(0%) scale(1)}75%{-webkit-transform:translateZ(0) translateX(-75%) scale(0.5);transform:translateZ(0) translateX(-75%) scale(0.5)}100%{-webkit-transform:translateZ(0) translateX(-25%) scale(0);transform:translateZ(0) translateX(-25%) scale(0)}}@keyframes boading{0%{-webkit-transform:translateZ(0) translateX(25%) scale(0);transform:translateZ(0) translateX(25%) scale(0)}25%{-webkit-transform:translateZ(0) translateX(75%) scale(0.5);transform:translateZ(0) translateX(75%) scale(0.5)}50%{-webkit-transform:translateZ(0) translateX(0%) scale(1);transform:translateZ(0) translateX(0%) scale(1)}75%{-webkit-transform:translateZ(0) translateX(-75%) scale(0.5);transform:translateZ(0) translateX(-75%) scale(0.5)}100%{-webkit-transform:translateZ(0) translateX(-25%) scale(0);transform:translateZ(0) translateX(-25%) scale(0)}}.spinner-element-container.shown[type=\"tail\"] .spin{font-size:300%;overflow:hidden;width:1em;height:1em;border-radius:50%;position:relative;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-animation:tail 1.2s infinite ease, tail-round 1.2s infinite ease;animation:tail 1.2s infinite ease, tail-round 1.2s infinite ease}@-webkit-keyframes tail{0%{box-shadow:0 -.83em 0 -.3em,0 -.83em 0 -.34em,0 -.83em 0 -.37em,0 -.83em 0 -.41em,0 -.83em 0 -.44em}5%,95%{box-shadow:0 -.83em 0 -.3em,0 -.83em 0 -.34em,0 -.83em 0 -.37em,0 -.83em 0 -.41em,0 -.83em 0 -.44em}10%,59%{box-shadow:0 -.83em 0 -.3em,-.10292em -.80842em 0 -.34em,-.18924em -.79514em 0 -.37em,-.27224em -.7719em 0 -.41em,-.31291em -.75779em 0 -.44em}20%{box-shadow:0 -.83em 0 -.3em,-.20501em -.73289em 0 -.34em,-.48804em -.58349em 0 -.37em,-.63744em -.42081em 0 -.41em,-.73206em -.20667em 0 -.44em}38%{box-shadow:0 -.83em 0 -.3em,-.24402em -.72293em 0 -.34em,-.57851em -.48804em 0 -.37em,-.74119em -.22991em 0 -.41em,-.80261em -.00664em 0 -.44em}100%{box-shadow:0 -.83em 0 -.3em,0 -.83em 0 -.34em,0 -.83em 0 -.37em,0 -.83em 0 -.41em,0 -.83em 0 -.44em}}@keyframes tail{0%{box-shadow:0 -.83em 0 -.3em,0 -.83em 0 -.34em,0 -.83em 0 -.37em,0 -.83em 0 -.41em,0 -.83em 0 -.44em}5%,95%{box-shadow:0 -.83em 0 -.3em,0 -.83em 0 -.34em,0 -.83em 0 -.37em,0 -.83em 0 -.41em,0 -.83em 0 -.44em}10%,59%{box-shadow:0 -.83em 0 -.3em,-.10292em -.80842em 0 -.34em,-.18924em -.79514em 0 -.37em,-.27224em -.7719em 0 -.41em,-.31291em -.75779em 0 -.44em}20%{box-shadow:0 -.83em 0 -.3em,-.20501em -.73289em 0 -.34em,-.48804em -.58349em 0 -.37em,-.63744em -.42081em 0 -.41em,-.73206em -.20667em 0 -.44em}38%{box-shadow:0 -.83em 0 -.3em,-.24402em -.72293em 0 -.34em,-.57851em -.48804em 0 -.37em,-.74119em -.22991em 0 -.41em,-.80261em -.00664em 0 -.44em}100%{box-shadow:0 -.83em 0 -.3em,0 -.83em 0 -.34em,0 -.83em 0 -.37em,0 -.83em 0 -.41em,0 -.83em 0 -.44em}}@-webkit-keyframes tail-round{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes tail-round{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.spinner-element-container.showscrim .spinner-element-scrim{opacity:1}.spinner-element-container .spinner-element-scrim{position:absolute;width:100%;height:100%;top:0;left:0;opacity:0;pointer-events:none;background:rgba(0,0,0,0.38);-webkit-transition:opacity 0.3s;transition:opacity 0.3s}.spinner-element-container .spinner-element-inner{width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;max-height:100vh;max-width:100vw;position:absolute;top:0;left:0}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "spinner-element{position:fixed;height:100%;width:100%;display:block;pointer-events:none;z-index:999999999999999999}spinner-element[page=\"true\"]{top:0;left:0}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 176 */
/***/ (function(module, exports) {

module.exports = "<div class=spinner-element-container> <div class=spinner-element-scrim></div> <div class=spinner-element-inner> <span slotname> <div class=spin></div> </span> </div> </div> ";

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".snack-bar-container{pointer-events:none;opacity:0;position:fixed;left:0;width:100%;z-index:10;box-sizing:border-box;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out}.snack-bar-container[align=\"none\"]{top:unset;left:unset;position:relative}.snack-bar-container[align=\"top\"]{top:4em}.snack-bar-container[align=\"bottom\"]{bottom:2em}.snack-bar-container.shown{opacity:1}.snack-bar-container.shown .snack-bar-inner{pointer-events:all}.snack-bar-container .snack-bar-inner{width:90%;max-width:600px;background-color:#fff;box-shadow:0 7px 10px -5px rgba(0,0,0,0.61);margin:0 auto;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;flex-wrap:nowrap;-webkit-box-flex:0;flex:0 1 auto}.snack-bar-container .snack-bar-inner [slot=\"body\"]{padding:1em;box-sizing:border-box;-webkit-box-align:center;align-items:center;display:block;width:100%;word-break:break-word}.snack-bar-container .snack-bar-inner ::slotted(*){padding:1em;box-sizing:border-box;-webkit-box-align:center;align-items:center;display:block;width:100%;word-break:break-word}.snack-bar-container .snack-bar-text{-webkit-box-flex:1;flex-grow:1;width:calc(100% - 7.5em)}.snack-bar-container .snack-bar-text .snack-bar-text-inner{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;width:100%;-webkit-box-flex:0;flex:0 1 auto}.snack-bar-container .snack-bar-text,.snack-bar-container .snack-bar-icon,.snack-bar-container .snack-bar-close,.snack-bar-container .snack-bar-type-bar{display:-webkit-box;display:flex;align-self:stretch;-webkit-box-flex:0;flex:0 1 auto}.snack-bar-container .snack-bar-type-bar{width:3px;min-width:3px;display:none}.snack-bar-container .snack-bar-close{width:4em;-ms-flex-preferred-size:4em}.snack-bar-container .snack-bar-close .snack-bar-close-inner{padding:1em;box-sizing:border-box;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.snack-bar-container .snack-bar-icon{width:3.5em;-ms-flex-preferred-size:3.5em;color:#fff;background-image:linear-gradient(-75deg, rgba(0,0,0,0.125), transparent 36%)}.snack-bar-container .snack-bar-icon .snack-bar-icon-inner{width:100%;padding:1em;box-sizing:border-box;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}.snack-bar-container .infoicon,.snack-bar-container .successicon,.snack-bar-container .warningicon,.snack-bar-container .erroricon{display:none;box-sizing:border-box;-webkit-box-align:center;align-items:center}.snack-bar-container[type=\"info\"] .infoicon{display:-webkit-box;display:flex}.snack-bar-container[type=\"info\"] .snack-bar-icon{background-color:#4fa8b8}.snack-bar-container[type=\"info\"] .snack-bar-type-bar{display:-webkit-box;display:flex;background-color:#4fa8b8}.snack-bar-container[type=\"error\"] .erroricon{display:-webkit-box;display:flex}.snack-bar-container[type=\"error\"] .snack-bar-icon{background-color:#ce0000}.snack-bar-container[type=\"error\"] .snack-bar-type-bar{display:-webkit-box;display:flex;background-color:#ce0000}.snack-bar-container[type=\"warning\"] .warningicon{display:-webkit-box;display:flex}.snack-bar-container[type=\"warning\"] .snack-bar-icon{background-color:#f1813a}.snack-bar-container[type=\"warning\"] .snack-bar-type-bar{display:-webkit-box;display:flex;background-color:#f1813a}.snack-bar-container[type=\"success\"] .successicon{display:-webkit-box;display:flex}.snack-bar-container[type=\"success\"] .snack-bar-icon{background-color:#5eb344}.snack-bar-container[type=\"success\"] .snack-bar-type-bar{display:-webkit-box;display:flex;background-color:#5eb344}.snack-bar-container.hide-close-btn .snack-bar-close{display:none}.snack-bar-container.hide-close-btn .snack-bar-text{width:calc(100% - 3.5em)}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(19);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "snack-bar [slot=\"body\"]{padding:1em;box-sizing:border-box;-webkit-box-align:center;align-items:center;display:block;width:100%;word-break:break-word}snack-bar ::slotted(*){padding:1em;box-sizing:border-box;-webkit-box-align:center;align-items:center;display:block;width:100%;word-break:break-word}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 179 */
/***/ (function(module, exports) {

module.exports = "<div class=snack-bar-container> <div class=snack-bar-inner> <div class=snack-bar-icon> <div class=snack-bar-icon-inner> <icon-element size=1.5em class=infoicon></icon-element> <icon-element size=1.5em class=successicon></icon-element> <icon-element size=1.5em class=erroricon></icon-element> <icon-element size=1.5em class=warningicon></icon-element> </div> </div> <div class=snack-bar-text> <div class=snack-bar-text-inner> <span slotname=body></span> </div> </div> <div class=snack-bar-close> <div class=snack-bar-close-inner> <button-element class=\"snack-bar-default-button nomargin slim nobackground noshadow\"> <icon-element size=1.5em class=snack-bar-close-icon></icon-element> </button-element> </div> </div> <div class=snack-bar-type-bar></div> </div> </div> ";

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line  max-statements
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        for (var k = base; /* no condition */; k += base) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }
  return output.join('');
};

module.exports = function (input) {
  var encoded = [];
  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
  }
  return encoded.join('.');
};


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(14);
var $ = __webpack_require__(13);
var getBuiltIn = __webpack_require__(41);
var USE_NATIVE_URL = __webpack_require__(133);
var redefine = __webpack_require__(25);
var redefineAll = __webpack_require__(56);
var setToStringTag = __webpack_require__(42);
var createIteratorConstructor = __webpack_require__(110);
var InternalStateModule = __webpack_require__(28);
var anInstance = __webpack_require__(48);
var hasOwn = __webpack_require__(17);
var bind = __webpack_require__(47);
var classof = __webpack_require__(89);
var anObject = __webpack_require__(16);
var isObject = __webpack_require__(15);
var create = __webpack_require__(51);
var createPropertyDescriptor = __webpack_require__(46);
var getIterator = __webpack_require__(182);
var getIteratorMethod = __webpack_require__(69);
var wellKnownSymbol = __webpack_require__(7);

var $fetch = getBuiltIn('fetch');
var Headers = getBuiltIn('Headers');
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replace[match];
};

var serialize = function (it) {
  return encodeURIComponent(it).replace(find, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;
    while (index < attributes.length) {
      attribute = attributes[index++];
      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
});

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

  setInternalState(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () { /* empty */ },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject(init)) {
      iteratorMethod = getIteratorMethod(init);
      if (typeof iteratorMethod === 'function') {
        iterator = iteratorMethod.call(init);
        next = iterator.next;
        while (!(step = next.call(iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = entryNext.call(entryIterator)).done ||
            (second = entryNext.call(entryIterator)).done ||
            !entryNext.call(entryIterator).done
          ) throw TypeError('Expected sequence with length 2');
          entries.push({ key: first.value + '', value: second.value + '' });
        }
      } else for (key in init) if (hasOwn(init, key)) entries.push({ key: key, value: init[key] + '' });
    } else {
      parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.appent` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    state.entries.push({ key: name + '', value: value + '' });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) entries.splice(index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) result.push(entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = name + '';
    var val = value + '';
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) entries.splice(index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) entries.push({ key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    var entries = state.entries;
    // Array#sort is not stable in some engines
    var slice = entries.slice();
    var entry, entriesIndex, sliceIndex;
    entries.length = 0;
    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
      entry = slice[sliceIndex];
      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
        if (entries[entriesIndex].key > entry.key) {
          entries.splice(entriesIndex, 0, entry);
          break;
        }
      }
      if (entriesIndex === sliceIndex) entries.push(entry);
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries);

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
redefine(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;
  while (index < entries.length) {
    entry = entries[index++];
    result.push(serialize(entry.key) + '=' + serialize(entry.value));
  } return result.join('&');
}, { enumerable: true });

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` for correct work with polyfilled `URLSearchParams`
// https://github.com/zloirock/core-js/issues/674
if (!USE_NATIVE_URL && typeof $fetch == 'function' && typeof Headers == 'function') {
  $({ global: true, enumerable: true, forced: true }, {
    fetch: function fetch(input /* , init */) {
      var args = [input];
      var init, body, headers;
      if (arguments.length > 1) {
        init = arguments[1];
        if (isObject(init)) {
          body = init.body;
          if (classof(body) === URL_SEARCH_PARAMS) {
            headers = init.headers ? new Headers(init.headers) : new Headers();
            if (!headers.has('content-type')) {
              headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }
            init = create(init, {
              body: createPropertyDescriptor(0, String(body)),
              headers: createPropertyDescriptor(0, headers)
            });
          }
        }
        args.push(init);
      } return $fetch.apply(this, args);
    }
  });
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(16);
var getIteratorMethod = __webpack_require__(69);

module.exports = function (it) {
  var iteratorMethod = getIteratorMethod(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};


/***/ }),
/* 183 */
/***/ (function(module, exports) {

// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(8);
var redefineAll = __webpack_require__(56);
var InternalMetadataModule = __webpack_require__(67);
var collection = __webpack_require__(114);
var collectionWeak = __webpack_require__(185);
var isObject = __webpack_require__(15);
var enforceIternalState = __webpack_require__(28).enforce;
var NATIVE_WEAK_MAP = __webpack_require__(108);

var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.github.io/ecma262/#sec-weakmap-constructor
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(56);
var getWeakData = __webpack_require__(67).getWeakData;
var anObject = __webpack_require__(16);
var isObject = __webpack_require__(15);
var anInstance = __webpack_require__(48);
var iterate = __webpack_require__(68);
var ArrayIterationModule = __webpack_require__(57);
var $has = __webpack_require__(17);
var InternalStateModule = __webpack_require__(28);

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && $has(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && $has(data, state.id);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};


/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.js
var es_set = __webpack_require__(141);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(72);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__(3);

// CONCATENATED MODULE: ./src/utils/is-non-collection.js









function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
var nonCollections = ['string', 'number', 'null', 'undefined', 'function', 'boolean', 'date'];
function IsNonCollection(value) {
  return nonCollections.indexOf(_typeof(value)) > -1 || value === null || value instanceof Date;
}
// CONCATENATED MODULE: ./src/utils/is-dom.js
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
  return value instanceof Element || value instanceof Node;
}
// CONCATENATED MODULE: ./src/utils/is-date.js
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
  var tempValue = new Date(Date.parse(value));
  return tempValue !== 'Invalid Date' && !isNaN(tempValue) && tempValue instanceof Date;
}
// CONCATENATED MODULE: ./src/utils/is-object.js









function is_object_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { is_object_typeof = function _typeof(obj) { return typeof obj; }; } else { is_object_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return is_object_typeof(obj); }

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
  return is_object_typeof(value).indexOf('object') > -1 && value !== null && !Array.isArray(value) && !(value instanceof Date);
}
// CONCATENATED MODULE: ./src/utils/type.js








function type_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { type_typeof = function _typeof(obj) { return typeof obj; }; } else { type_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return type_typeof(obj); }





function Type(value) {
  return value === null ? 'null' : IsNonCollection(value) ? type_typeof(value) : IsDom(value) ? 'dom' : Array.isArray(value) ? 'array' : IsDate(value) ? 'date' : IsObject(value) ? 'object' : typeof thing === "undefined" ? "undefined" : type_typeof(thing);
}
// CONCATENATED MODULE: ./src/utils/is-empty.js










function is_empty_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { is_empty_typeof = function _typeof(obj) { return typeof obj; }; } else { is_empty_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return is_empty_typeof(obj); }

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
  return value === undefined || value === null || value === '' || Array.isArray(value) && value.length === 0 || is_empty_typeof(value).indexOf('object') > -1 && Object.keys(value).length === 0 || value === false || value === 'false' || value === 'undefined' || value === 'null';
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
 * IsTMonad('') // false
 * IsTMonad({
 *      value:'',
 *      valid: true,
 *      type: 'string'
 * }) // true
 */

function IsTMonad(value) {
  if (IsEmpty(value) || !IsObject(value)) {
    return false;
  }

  var keysItShouldHave = [{
    key: 'valid',
    type: 'boolean'
  }, {
    key: 'type',
    type: 'string'
  }, {
    key: 'value'
  }];
  var loopIndex = keysItShouldHave.length;
  var count = 0;

  while (loopIndex--) {
    if (Object.prototype.hasOwnProperty.call(value, keysItShouldHave[loopIndex].key) && (!keysItShouldHave[loopIndex].type || Type(value[keysItShouldHave[loopIndex].key]) === keysItShouldHave[loopIndex].type)) {
      count = count + 1;
    }
  }

  return keysItShouldHave.length === count;
}
// CONCATENATED MODULE: ./src/utils/t-monad.js



function TMonad(value) {
  if (IsTMonad(value)) {
    return Object.assign({}, value, {
      type: Type(value.value)
    });
  }

  var data = {
    valid: true,
    value: value,
    type: Type(value),
    stringChanges: [],
    // not required
    stop: false // not required

  };
  return data;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__(44);

// CONCATENATED MODULE: ./src/utils/get.js






function emptyModifyFn(v) {
  return v;
}

function argsMapper(arg) {
  return !isNaN(arg) ? parseFloat(arg) : arg.trim();
}

function isNull(v) {
  return v === undefined || v === null;
}

function Get(obj, path, emptyVal, modifyFn) {
  modifyFn = typeof modifyFn === 'function' ? modifyFn : emptyModifyFn;
  /** If nothing to search, return */

  if (!obj) {
    return modifyFn(emptyVal);
  }
  /** The search array, initial search item being the source */


  var pathParts = path.split('.');
  var result = obj;
  var count = pathParts.length;
  var loopIndex = pathParts.length; // for (let partIndex = 0; partIndex < pathParts.length; partIndex = partIndex + 1) {

  while (loopIndex) {
    if (isNull(result)) {
      result = emptyVal;
      break;
    }

    var partIndex = count - loopIndex;
    var startParens = /\(/.exec(pathParts[partIndex]);

    if (startParens) {
      var fn = result[pathParts[partIndex].slice(0, startParens.index)];

      if (typeof fn === 'function') {
        result = fn.apply(result, /\((.*?)\)/g.exec(pathParts[partIndex])[1].split(',').map(argsMapper));
        loopIndex = loopIndex - 1;
        continue;
      }
    }

    result = result[pathParts[partIndex]];
    loopIndex = loopIndex - 1;
  }
  /** If nothing was found return emptyVal */


  if (isNull(result)) {
    result = emptyVal;
  }

  return modifyFn(result);
}
// CONCATENATED MODULE: ./src/utils/to-string.js





function ToString(value) {
  var stop = Get(value, 'stop', false);

  if (stop) {
    return TMonad(value);
  }

  var result = TMonad(value);

  try {
    if (!!result.value || result.value === '') {
      result.value = result.value.toString();
      result.valid = typeof result.value === 'string';
    } else {
      result.value = '';
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
 * const ifInvalid = IfInvalid('hey')
 * const value = ToNumber('hola')
 * const result = ifInvalid(value).value // 'hey'
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
// CONCATENATED MODULE: ./src/utils/pipe.js
function Pipe() {
  var functions = arguments;
  var count = functions.length;
  return function PipeInnerFunction(value) {
    var loopIndex = count + 1;

    while (loopIndex--) {
      value = typeof functions[count - loopIndex] !== 'function' ? value : functions[count - loopIndex](value);
    }

    return value;
  };
}
// CONCATENATED MODULE: ./src/utils/to-bool.js



var invalids = ['0', 0, 'off', 'false', false];
var valids = ['1', 1, 'on', 'true', true];
function ToBool(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  if (invalids.indexOf(result.value) > -1) {
    result.value = false;
    result.valid = true;
  } else if (valids.indexOf(result.value) > -1) {
    result.value = true;
    result.valid = true;
  } else {
    result.value = false;
    result.valid = false;
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

  if (result.type === 'string' && !IsEmpty(result.value)) {
    result.value = parseFloat(result.value);
  }

  result.type = Type(result.value);
  result.valid = !isNaN(result.value);
  return result;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.constructor.js
var es_regexp_constructor = __webpack_require__(59);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(26);

// CONCATENATED MODULE: ./src/services/id.js





/**
 * Generates a runtime unique ID
 * @generator
 * @yields { string }
 */
var id_index = 0;

function doId(indx) {
  return doHash() + indx;
}

function doHash() {
  return (performance.now() + 'xxxxxxxxxxxxxxxx').replace(/[x]|\./g, function () {
    return (Math.random() * 16 | 0).toString(16);
  });
}

var ID = function IDInner() {
  id_index = id_index + 1;
  return doId(id_index);
};
// CONCATENATED MODULE: ./src/utils/observer.js















var emptyFn = function emptyFn() {};

function Observer(initialValue, noInit, onSubscribe) {
  noInit = noInit ? true : false;
  onSubscribe = onSubscribe && typeof onSubscribe === 'function' ? onSubscribe : emptyFn;
  var values = Object.assign({}, {
    value: initialValue,
    errors: [],
    previousValue: undefined,
    updated: new Date().getTime(),
    subscriptions: {},
    isComplete: false
  });

  function valuesSubsEach(subscriptionId) {
    return values.subscriptions[subscriptionId].unsubscribe();
  }

  function destroy() {
    Object.keys(values.subscriptions).forEach(valuesSubsEach);
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
        value: emptyFn
      },
      error: {
        value: emptyFn
      },
      complete: {
        value: emptyFn
      },
      subscribe: {
        value: emptyFn
      },
      unsubscribe: {
        value: emptyFn
      }
    });
    values.isComplete = true;
  }

  function loopSubsEach(key, val, valuesObj) {
    return function loopSubsEachInner(subscriptionId) {
      var subscriptionFn = values.subscriptions[subscriptionId][key];

      if (typeof subscriptionFn !== 'function') {
        return;
      }

      subscriptionFn(val, valuesObj, subscriptionId);
    };
  }

  function loop(key, val, valuesObj) {
    valuesObj = valuesObj ? valuesObj : {};

    var _loopSubsEach = loopSubsEach(key, val, valuesObj);

    Object.keys(values.subscriptions).forEach(_loopSubsEach);

    if (key === 'complete') {
      destroy();
    }
  }

  function _unsubscribe(subscription) {
    return function unsubscribeInner() {
      values.subscriptions[subscription.id] = null;
      delete values.subscriptions[subscription.id];
    };
  }

  function getArrayIndexOf(element, isArray) {
    if (!isArray) {
      return;
    }

    var index = values.value.indexOf(element);
    return index === -1 ? undefined : index;
  }

  function getObjectKey(value) {
    try {
      for (var prop in values.value) {
        if (values.value[prop]) {
          if (values.value[prop] === value) {
            return prop;
          }
        }
      }
    } catch (error) {}
  }

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
      loop('next', values.value, values);
      return values;
    },
    error: function error(err) {
      values = Object.assign({}, values, {
        errors: values.errors.concat([err]),
        updated: new Date().getTime()
      });
      loop('error', err, values);
    },
    complete: function complete() {
      loop('complete', values);
    },
    subscribe: function subscribe(next, error, complete) {
      error = error ? error : emptyFn;
      complete = complete ? complete : emptyFn;
      var subscription = Object.assign({}, {
        next: next,
        error: error,
        complete: complete,
        id: ID()
      });
      subscription.unsubscribe = _unsubscribe(subscription);
      values.subscriptions[subscription.id] = subscription;

      if (!noInit && values.value !== undefined && typeof subscription.next === 'function') {
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
    },
    insert: function insert(element, index) {
      try {
        if (index === undefined) {
          index = values.value.length;
        }

        if (Array.isArray(values.value)) {
          values.value.splice(index, 0, element);
          return result.next(values.value);
        }

        if (typeof values.value === 'string') {
          values.value.splice(index, 0, element);
          return result.next(values.value.slice(0, index) + element + values.value.slice(index));
        }

        values.value[index] = element;
      } catch (error) {}

      return result.next(values.value);
    },
    remove: function remove(element, index, all) {
      try {
        var isArray = Array.isArray(values.value);
        var isString = typeof values.value === 'string';

        if (index === undefined) {
          index = getArrayIndexOf(element, isArray);
        }

        if (index === undefined && isArray) {
          return values.value;
        }

        if (index === undefined && isString) {
          return result.next(values.value.replace(new RegExp(element, all ? 'gm' : ''), ''));
        }

        if (index !== undefined) {
          if (isArray) {
            values.value.splice(index, 1);
          } else if (isString) {
            values.value = values.value.slice(0, index);
          } else {
            values.value[index] = undefined;
            delete values.value[index];
          }

          return result.next(values.value);
        }

        var objectKey = getObjectKey(element);

        if (objectKey !== undefined) {
          values.value[objectKey] = undefined;
          delete values.value[objectKey];
          return result.next(values.value);
        }
      } catch (error) {}

      return result.next(values.value);
    },
    reverse: function reverse() {
      var isArray = Array.isArray(values.value);
      var isString = typeof values.value === 'string';

      if (isArray) {
        return result.next(values.value.reverse());
      }

      if (isString) {
        return result.next(values.value.split('').reverse());
      }

      result.next(values.value);
    },
    has: function has(value) {
      try {
        var isArray = Array.isArray(values.value);
        var isString = typeof values.value === 'string';

        if (isArray) {
          return getArrayIndexOf(value, isArray) || false;
        }

        if (isString) {
          return values.value.indexOf(value) > -1;
        }

        var objectKey = getObjectKey(value);

        if (objectKey !== undefined) {
          return true;
        }
      } catch (error) {}

      return false;
    },
    indexOf: function indexOf(value) {
      try {
        var isArray = Array.isArray(values.value);
        var isString = typeof values.value === 'string';

        if (isArray) {
          return getArrayIndexOf(value, isArray) || -1;
        }

        if (isString) {
          return values.value.indexOf(value);
        }
      } catch (error) {}

      return getObjectKey(value) || -1;
    }
  };
  return result;
}


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(34);

// CONCATENATED MODULE: ./src/services/on-next-frame.js



var OnNextFrameQueueObject = {};
var OnNextFrameQueue = [];
var on_next_frame_isRunning = false;
var frameTimer;
var timeout;

function deleteEntry(id) {
  if (!OnNextFrameQueueObject[id]) {
    return;
  }

  OnNextFrameQueueObject[id].hasRun = true;
  OnNextFrameQueueObject[id].canceled = true;
  OnNextFrameQueueObject[id] = null;
  delete OnNextFrameQueueObject[id];
}

function hasTime(startTime) {
  return performance.now() - startTime < runTasks.max;
}

function runTasks(startTime) {
  cancelAnimationFrame(frameTimer);
  clearTimeout(timeout);

  do {
    var id = OnNextFrameQueue.shift();

    if (OnNextFrameQueueObject[id] && !OnNextFrameQueueObject[id].canceled && !OnNextFrameQueueObject[id].hasRun) {
      OnNextFrameQueueObject[id].hasRun = true;
      OnNextFrameQueueObject[id].resolve(OnNextFrameQueueObject[id].task());
      deleteEntry(id);
    }
  } while (hasTime(startTime) && OnNextFrameQueue.length);

  if (OnNextFrameQueue.length) {
    return frameTimer = requestAnimationFrame(function () {
      timeout = setTimeout(function () {
        runTasks(performance.now());
      });
    });
  } else {
    on_next_frame_isRunning = false;
  }
}

runTasks.max = 4.5;

function RunOnNextFrame() {
  if (on_next_frame_isRunning || !OnNextFrameQueue.length) {
    return;
  }

  on_next_frame_isRunning = true;
  runTasks(performance.now());
}

function OnNextFrame(task) {
  var resolve;
  var reject;
  var promise = new Promise(function OnNextFramePromise(res, rej) {
    resolve = res;
    reject = rej;
  });
  var id = ID();
  OnNextFrameQueueObject[id] = {
    hasRun: false,
    canceled: false,
    task: task,
    promise: promise,
    resolve: resolve,
    reject: reject,
    id: id,
    cancel: function OnNextFrameCancel() {
      deleteEntry(id);
    }
  };
  OnNextFrameQueue.push(id);
  RunOnNextFrame();
  return OnNextFrameQueueObject[id];
}

OnNextFrame.max = function OnNextFrameMax(max) {
  runTasks.max = max;
};
// CONCATENATED MODULE: ./src/utils/observer-empty.js


function ObserverReturnEmpty() {
  var _observer = Observer(false);

  OnNextFrame(function returnEmptyNext() {
    _observer.next(false);

    _observer.complete();
  });
  return _observer;
}
// CONCATENATED MODULE: ./src/utils/get-parent.js


function modifier(p) {
  return !!p && p.nodeName === '#document-fragment' ? Get(p, 'host', p) : !!p && p.assignedSlot ? Get(p, 'assignedSlot.parentNode', p) : p;
}

function GetParent(element) {
  return Get(element, 'parentNode', Get(element, 'host', Get(element, '__shady_parent.host')), modifier);
}
// CONCATENATED MODULE: ./src/utils/observe-exists.js



function ObserveExists(element) {
  if (!element) {
    return ObserverReturnEmpty();
  }

  if (element.exists$ && !element.exists$.isComplete) {
    return element.exists$;
  }

  element.exists$ = Observer(!!GetParent(element));
  return element.exists$;
}
// CONCATENATED MODULE: ./src/utils/observe-event.js




function ObserveEvent(element, eventName, options) {
  if (!element || !eventName) {
    return;
  }

  options = options ? options : {};
  var isRunning = false;
  var disposeTimer = setTimeout(function () {});
  options = Object.assign({}, {
    preventDefault: false,
    stopPropagation: false,
    useCapture: true
  }, options);

  function isWindow() {
    return element && element.document && element.location && element.alert && element.setInterval;
  }

  function startup() {
    if (isRunning) {
      return;
    }

    isRunning = true;

    try {
      element.addEventListener(eventName, eventHandler, options.useCapture);
    } catch (error) {}
  }

  var observer = Observer(undefined, undefined, startup);

  function eventHandler(event) {
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
  }

  function shutDown() {
    try {
      element.removeEventListener(eventName, eventHandler, options.useCapture);
    } catch (error) {}

    isRunning = false;
  }

  function dispose() {
    shutDown();
    disposeTimer = setTimeout(function () {
      observer.complete();

      try {
        exists();
      } catch (error) {}
    }, 1000);
  }

  function subFn(exists) {
    clearTimeout(disposeTimer);

    if (!exists) {
      dispose();
    } else {
      startup();
    }
  }

  var exists = isWindow() ? function () {} : ObserveExists(element).subscribe(subFn);
  return observer;
}
// CONCATENATED MODULE: ./src/utils/when-available.js




function WhenAvailable(host, path, isMethod, max) {
  max = max === undefined ? 1000 : max;
  return new Promise(function WhenAvailablePromise(resolve, reject) {
    if (!host || !host.parentNode && !host.parentElement) {
      return reject({
        host: host,
        path: path
      });
    }

    function test() {
      max = max - 1;
      var val = Get(host, path);

      if (!max) {
        return reject({
          host: host,
          path: path
        });
      }

      if (val === undefined || isMethod && typeof val !== 'function') {
        return OnNextFrame(test);
      }

      return resolve(val);
    }

    test();
  });
}
// CONCATENATED MODULE: ./src/utils/is-element.js


function IsElement(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  result.valid = Get(result, 'value.nodeType') === 1;
  return result;
}
// CONCATENATED MODULE: ./src/utils/create-element.js










function create_element_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { create_element_typeof = function _typeof(obj) { return typeof obj; }; } else { create_element_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return create_element_typeof(obj); }





var fragment = document.createDocumentFragment();
function CreateElement(obj) {
  var el = document.createElement(obj.tagName || 'div');
  fragment.appendChild(el);

  function objKeysEach(key) {
    if (key === 'tagName') {
      return;
    }

    var max = 1000;
    var events = Get(obj, 'eventSubscriptions');

    function tryParent() {
      max = max - 1;
      var parent = GetParent(el);

      if (!parent && max) {
        if (max) {
          return OnNextFrame(tryParent);
        }
      }

      if (!el.eventSubscriptions) {
        el.eventSubscriptions = {};
      }

      var eventKeys = Object.keys(events);
      var loopIndex = eventKeys.length;

      while (loopIndex--) {
        if (typeof events[eventKeys[loopIndex]] === 'function') {
          el.eventSubscriptions[eventKeys[loopIndex]] = events[eventKeys[loopIndex]]();
        }
      }
    }

    function childrenArrayEach(child) {
      return IsElement(child).valid ? el.appendChild(child) : el.appendChild(CreateElement(child));
    }

    if (key === 'eventSubscriptions') {
      return tryParent();
    }

    if (['textContent', 'innerHTML'].indexOf(key) > -1) {
      return el[key] = obj[key];
    }

    if (key === 'children') {
      if (Array.isArray(obj[key])) {
        var loopIndex = obj[key].length;

        while (loopIndex--) {
          childrenArrayEach(obj[key][loopIndex]);
        }

        return;
      } else {
        return IsElement(obj[key]).valid ? el.appendChild(obj[key]) : el.appendChild(CreateElement(obj[key]));
      }
    }

    if (['string', 'number', 'boolean'].indexOf(create_element_typeof(obj[key])) > -1) {
      el.setAttribute(key, obj[key]);
    } else {
      el[key] = obj[key];
    }
  }

  var objKeys = Object.keys(obj);
  var index = objKeys.length;

  while (index--) {
    objKeysEach(objKeys[index]);
  }

  return el;
}
// CONCATENATED MODULE: ./src/utils/t-monad-update.js


function TMonadUpdate(tmonad, expectedType) {
  return Object.assign(tmonad, {
    type: Type(tmonad.value),
    valid: expectedType === '?' ? true : tmonad.type === expectedType // '?' signifies any

  });
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


function DoURI(value, encode, component) {
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

  if (result.type === 'string' && !!result.value) {
    result.value = result.value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"').replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g, '\'');
    result.valid = true;
  } else {
    result.valid = false;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/to-plain-text.js







function ToPlainText(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type !== 'string') {
    result = Pipe(ToString, StopIfInvalid, FromURIComponent, FromEntities)(result);
  } else {
    result = Pipe(FromURIComponent, FromEntities)(result);
  }

  return TMonadUpdate(result, 'string', 'ToPlainText');
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__(97);

// CONCATENATED MODULE: ./src/utils/to-regex.js
















function to_regex_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { to_regex_typeof = function _typeof(obj) { return typeof obj; }; } else { to_regex_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return to_regex_typeof(obj); }



function is(v) {
  return !!v;
}

function ToRegex(string) {
  var result = TMonad(string);

  if (!result.value) {
    result.value = new RegExp('');
  } else if (typeof result.value.split !== 'function' && to_regex_typeof(result.value) === 'object') {
    // already regex, clone
    result.value = new RegExp(result.value);
  } else if (typeof result.value === 'string') {
    if (result.value.indexOf('/') === 0) {
      // regex that has been converted to string and needs to be prepared
      // split and make sure to remove empties(usually begining/end or if json escaped) for the join later
      var parts = result.value.split('/').filter(is);
      var options = parts.pop();

      if (options.match(/[^gmisuy]/)) {
        // if anything other than standard flag, send back to regex
        parts.push(options);
        options = undefined;
      }

      result.value = new RegExp(parts.join('/'), options);
    } else {
      // proper first argument
      result.value = new RegExp(result.value);
    }
  }

  result.valid = true;
  result.type = 'object';
  return result;
}
// CONCATENATED MODULE: ./src/utils/to-split-meta.js








function to_split_meta_is(v) {
  return !!v;
}

function ToSplitMeta(string, delimeter) {
  delimeter = delimeter ? delimeter : '';
  var match;
  var arr = [];
  var result = {
    value: string,
    stringChanges: []
  };

  try {
    if (!string || !delimeter && delimeter !== '') {
      return result;
    }

    delimeter = ToRegex(delimeter).value;
    var str = result.value ? result.value.toString() : '';

    if (delimeter.toString() === '/(?:)/') {
      return {
        value: str.split(''),
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
      var first = matched.start !== 0 ? str.slice(0, matched.start) : '';
      var second = str.slice(matched.end);
      matched.result = [first, second];
      result.stringChanges.push(matched);
      arr.push(first);
      str = second;
    }

    arr.push(str);
    result.value = arr.filter(to_split_meta_is);
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

    if (result.type !== 'string') {
      result = ToString(result);
    }

    var splat = ToSplitMeta(result.value, delimeter);

    if (typeof splat.value === 'string') {
      result.valid = false;
      return TMonadUpdate(result, 'array', 'Split');
    }

    result.stringChanges = result.stringChanges.concat(splat.stringChanges);
    result.value = splat.value;
    return TMonadUpdate(result, 'array', 'Split');
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

  if (['object', 'array'].indexOf(result.type) > -1) {
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

  var result = Array.isArray(temp.value) ? temp : typeof temp.value === 'string' ? Pipe(ToPlainText, from_json)(temp) : temp;
  result.type = Type(result.value);
  result.valid = result.type === 'array';
  return result;
}
// CONCATENATED MODULE: ./src/utils/to-map.js







function ToMap(fn) {
  return function (value) {
    var result = TMonad(value);

    if (result.stop) {
      return result;
    }

    function map(v) {
      if (Type(v.value) !== 'array') {
        v.valid = false;
        return v;
      }

      v.value = v.value.map(fn);
      return v;
    }

    return TMonadUpdate(Pipe(ToArray, StopIfInvalid, map)(result), 'array', 'Map');
  };
}
// CONCATENATED MODULE: ./src/utils/to-trim.js



function ToTrim(value) {
  var stop = Get(value, 'stop', false);

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







function trim(el) {
  return ToTrim(el).value;
}

function CommasToArray(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type === 'array') {
    return result;
  }

  if (result.type === 'undefined') {
    result.valid = false;
    return result;
  }

  var piped = Pipe(ToPlainText, ToSplit(','), ToMap(trim))(result);
  return piped;
}
// CONCATENATED MODULE: ./src/utils/observer-unsubscribe.js





/**
 * Looks for subscriptions in an object, DOM element or a subscription itself and unsubscribes.
 * @function ObserverUnsubscribe
 * @param {Object|HTMLElement|function()} subscription - An element that has or is a observer subscription. If is a DOM element, must be under 'subscriptions' or 'eventSubscriptions' properties
 * @return {void}
 */

function ObserverUnsubscribe(subscription) {
  if (!subscription) {
    return;
  }

  if (typeof subscription === 'function') {
    return subscription();
  }

  function subscriptionEach(current) {
    return typeof current === 'function' ? current() : undefined;
  }

  function subscriptionKeysEach(key) {
    return function subscriptionKeysEachInner(current) {
      return typeof subscription[key][current] === 'function' ? subscription[key][current]() : undefined;
    };
  }

  function subscriptionObjectKeysEach(current) {
    return typeof subscription[current] === 'function' ? subscription[current]() : undefined;
  }

  if (Array.isArray(subscription)) {
    return subscription.forEach(subscriptionEach);
  }

  if (IsDom(subscription)) {
    var key = subscription.eventSubscriptions ? 'eventSubscriptions' : 'subscriptions';

    if (!subscription[key]) {
      return;
    }

    var _subscriptionKeysEach = subscriptionKeysEach(key);

    return Object.keys(subscription[key]).forEach(_subscriptionKeysEach);
  }

  if (IsObject(subscription)) {
    Object.keys(subscription).forEach(subscriptionObjectKeysEach);
  }
}
// CONCATENATED MODULE: ./src/utils/dispatch-event.js
function DispatchEvent(element, name, data) {
  var event;

  if (typeof Event === 'function') {
    event = new CustomEvent(name, {
      detail: data
    });
  } else {
    event = document.createEvent('Event');
    event.initEvent(name, true, true);
  }

  element.dispatchEvent(event);
}
// CONCATENATED MODULE: ./src/utils/for-each.js
function ForEach(fn, collection, reverseOrder) {
  if (!collection) {
    return;
  }

  var index = collection.length;
  var count = index;

  while (count && index) {
    fn(collection[reverseOrder ? index - 1 : count - index]);
    index = index - 1;
  }

  return collection;
}
// CONCATENATED MODULE: ./src/services/components.js



var components = {};
var initialized = false;
var Components = {
  get: function get(name) {
    if (name) {
      return components[name];
    }

    return components;
  },
  addComponent: function addComponent(tag, componentFunction) {
    if (!initialized) {
      initialized = true;
      Components.init();
    }

    components[tag] = {
      tag: tag,
      create: function create(node) {
        if (componentFunction(node)) {
          node.onConnected(node);
        }
      }
    };
    ForEach(components[tag].create, document.body.querySelectorAll(tag));
  },
  init: function init() {
    function handleAddedNode(node) {
      var tag = Get(node, 'nodeName.toLowerCase()');

      if (tag && components[tag]) {
        OnNextFrame(function () {
          components[tag].create(node);
        });
      }

      ForEach(function handleAddedNodeChildren(child) {
        handleAddedNode(child);
      }, node.children);

      if (node.exists$) {
        node.exists$.next(true);
      }
    }

    function handleRemovedNode(node) {
      var tag = Get(node, 'nodeName.toLowerCase()');

      if (tag && components[tag] && typeof node.onDisconnected === 'function') {
        node.onDisconnected(node);
      }

      if (node.exists$) {
        node.exists$.next(false);
      }
    }

    var componentsObserverConfig = {
      childList: true,
      subtree: true
    };
    var componentsObserver = new MutationObserver(function componentsObserverCallback(mutations) {
      ForEach(function mutationsEach(mutation) {
        if (mutation.type === 'childList') {
          ForEach(handleRemovedNode, mutation.removedNodes);
          ForEach(handleAddedNode, mutation.addedNodes);
        }
      }, mutations);
    });
    componentsObserver.observe(document.body, componentsObserverConfig);
  }
};
// CONCATENATED MODULE: ./src/utils/to-filter.js






function ToFilter(predicate) {
  return function (value) {
    var result = TMonad(value);

    if (result.stop) {
      return result;
    }

    function filter(v) {
      v.value = v.value.filter(predicate);
      return v;
    }

    return TMonadUpdate(Pipe(ToArray, StopIfInvalid, filter)(result), 'array', 'Filter');
  };
}
// CONCATENATED MODULE: ./src/utils/component-class-object.js
















function component_class_object_trim(el) {
  return el.trim();
}

function component_class_object_is(el) {
  return !!el;
}

function wcClass(el, newClasses, previousClasses) {
  if (!el) {
    return;
  }

  if (Array.isArray(el)) {
    el = el[0];
  }

  var oldBrowser = !window.DOMTokenList.prototype.replace;
  var newClassArray = Pipe(CommasToArray, IfInvalid([]))(newClasses).value;
  var previousClassArray = Pipe(CommasToArray, IfInvalid([]))(previousClasses).value;

  function previousClassArrayEach(c) {
    el.className = el.className.split(c).map(component_class_object_trim).join('');
  }

  function newClassArrayEach(c) {
    el.className = ''.concat(el.className ? el.className : '', ' ', c);
  }

  if (oldBrowser) {
    if (previousClassArray.length && !!el.className) {
      previousClassArray.forEach(previousClassArrayEach);
    }

    if (newClassArray.length) {
      newClassArray.forEach(newClassArrayEach);
    }

    return;
  }

  if (previousClassArray.length) {
    el.classList.remove.apply(el.classList, previousClassArray);
  }

  if (newClassArray.length) {
    el.classList.add.apply(el.classList, newClassArray);
  }
}

var ComponentClassObject = {
  format: function format(val) {
    return Pipe(ToString, IfInvalid(''), ToSplit(' '), ToMap(component_class_object_trim), ToFilter(component_class_object_is))(val).value;
  },
  onChange: function onChange(val, host) {
    return wcClass(host.elements.root, val, host.state.class.previous);
  }
};
// CONCATENATED MODULE: ./src/utils/set-style-rules.js
function SetStyleRules(styleElement, ruleString) {
  if (!styleElement || ruleString === undefined || ruleString === null || ruleString === 'undefined' || ruleString === 'null') {
    return;
  }

  if (styleElement.styleSheet) {
    // IE
    styleElement.styleSheet.cssText = ''.concat(styleElement.styleSheet.cssText ? styleElement.styleSheet.cssText : '', ruleString);
  } else {
    // the world
    styleElement.innerHTML = '';
    var tt1 = document.createTextNode(ruleString);
    styleElement.appendChild(tt1);
  }
}
// CONCATENATED MODULE: ./src/utils/append-style-element.js


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
  if (!parent || !rulesString) {
    return;
  }
  /** First create and add the style element */


  var style = CreateElement({
    tagName: 'style',
    type: 'text/css',
    style: 'display:none;',
    class: classes,
    name: name
  }, true);
  parent.appendChild(style);
  /** Then set the rules */

  SetStyleRules(style, rulesString);
  return style;
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

  if (type === 'boolean' && value1 !== value2) {
    return false;
  }

  if (type === 'array' && value1.length !== value2.length) {
    return false;
  }

  if (type === 'object' && Object.keys(value1).length !== Object.keys(value2).length) {
    return false;
  }

  if (type === 'object' && value1.constructor !== value2.constructor) {
    return false;
  }

  if (type === 'date') {
    var d = value1 === value2;

    try {
      d = new Date(value1).getTime() === new Date(value2).getTime();
    } catch (error) {}

    return d;
  }

  if (type === 'dom') {
    return value1.isEqualNode(value2);
  } // Start walking


  if (type === 'array') {
    var len = value1.length;

    while (len--) {
      if (!Equals(value1[len], value2[len])) {
        return false;
      }
    }
  }

  if (type === 'object') {
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
// CONCATENATED MODULE: ./src/utils/parse-css.js





/** From https://jsfiddle.net/developit/vzkckrw4/ */
function ParseCss(text) {
  text = text || '';
  var tokenizer = /([\s\S]+?)\{([\s\S]*?)\}/gi,
      rules = [],
      rule,
      token;
  text = text.replace(/\/\*[\s\S]*?\*\//g, '');

  while (token = tokenizer.exec(text)) {
    var style = parseRule(token[2].trim());
    style.cssText = stringifyRule(style);
    rule = {
      selectorText: token[1].trim().replace(/\s*,\s*/, ', '),
      style: style
    };
    rule.cssText = rule.selectorText + ' { ' + rule.style.cssText + ' }';
    rules.push(rule);
  }

  return rules;
}

function parseRule(css) {
  var tokenizer = /\s*([a-z-]+)\s*:\s*((?:[^;]*url\(.*?\)[^;]*|[^;]*)*)\s*(?:;|$)/gi,
      obj = {},
      token;

  while (token = tokenizer.exec(css)) {
    obj[token[1].toLowerCase()] = token[2];
  }

  return obj;
}

function stringifyRule(style) {
  var text = '',
      keys = Object.keys(style).sort();

  for (var i = 0; i < keys.length; i++) {
    text += ' ' + keys[i] + ': ' + style[keys[i]] + ';';
  }

  return text.substring(1);
}
// CONCATENATED MODULE: ./src/utils/transduce.js


function Transduce() {
  var results;
  var piper = Pipe.apply(null, arguments);
  return function (collection, initial, reducer) {
    results = initial || [];
    ForEach(function TransduceInner(item) {
      var result = piper(item, results);

      if (result === undefined) {
        return;
      }

      if (typeof reducer === 'function') {
        results = reducer(results, result);
        return;
      }

      results.push(result);
    }, collection);
    return results;
  };
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
// CONCATENATED MODULE: ./src/utils/filter.js

function Filter(conditionFunction, collection, reverseOrder) {
  var result = [];
  ForEach(function FilterInner(item) {
    if (conditionFunction(item)) {
      result.push(item);
    }
  }, collection, reverseOrder);
  return result;
}
// CONCATENATED MODULE: ./src/utils/mapper.js

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
  var result = [];
  ForEach(function MapInner(item) {
    result.push(mapFunction(item));
  }, collection);
  return result;
}
// CONCATENATED MODULE: ./src/utils/array-from.js

function ArrayFrom(collection) {
  if (!collection || !collection.length) {
    return [];
  }

  return Mapper(function (element) {
    return element;
  }, collection);
}
// CONCATENATED MODULE: ./src/utils/find-first.js
function FindFirst(conditionFn, collection, reverseOrder) {
  if (!collection) {
    return;
  }

  var index = collection.length;
  var count = index;

  while (count && index) {
    var item = collection[reverseOrder ? count - (count - index) : count - index];

    if (conditionFn(item)) {
      return item;
    }

    index = index - 1;
  }
}
// CONCATENATED MODULE: ./src/utils/component-constructor.js

























var componentContents = 'component-contents';
var styleElementsString = '<span class="style-block-theme"></span><span class="style-block-styles"></span>';

function component_constructor_emptyFn() {}

function isUselessText(child) {
  return child.nodeName === '#text' && !/\S/gm.test(child.textContent);
}

function cleanStart(host) {
  var actualChildren = [];
  var children = host.childNodes;
  var index = children.length;

  while (index--) {
    if (!isUselessText(children[index])) {
      actualChildren.push(children[index]);
    } else {
      host.removeChild(children[index]);
    }
  }

  return actualChildren;
}

function attributeMutation(mutation) {
  if (!mutation.target || !mutation.target.parentNode) {
    return;
  }

  mutation.target[mutation.attributeName] = mutation.target.getAttribute(mutation.attributeName);
}

function getSlotName(el, key) {
  try {
    var name = el.getAttribute(key);
    return name === undefined || name === null ? '' : name;
  } catch (error) {
    return '';
  }
}

function getMatchingSlot(host, name) {
  return FindFirst(function (slot) {
    return getSlotName(slot, 'slotname') === name;
  }, host.slots);
}

function assignSlot(host, child) {
  if (!host || !host.slots || !host.slots.length || !child) {
    return false;
  }

  var slotName = getSlotName(child, 'slot');
  var assigned = false;
  ForEach(function assignSlotInner(slot) {
    if (getSlotName(slot, 'slotname') === slotName) {
      if (!child.slotObserver) {
        child.slotObserver = new MutationObserver(function slotObserver() {
          host.slotted$.next(host.slotted$.value);
        });
        child.slotObserver.observe(child, {
          attributes: true,
          attributeFilter: ['slot']
        });
      }

      host.slotted$.next(host.slotted$.value.concat(document.adoptNode(child)));
      assigned = true;
    }
  }, host.slots);
  return assigned;
}

function childMutation(mutation) {
  if (!mutation.target || !mutation.target.parentNode) {
    return;
  }

  ForEach(function tryAssignSlot(child) {
    assignSlot(mutation.target, child);
  }, mutation.addedNodes, true);

  if (mutation.target.children$) {
    mutation.target.children$.next(Filter(function filterChildren(child) {
      return !child.contentFor;
    }, mutation.target.childNodes));
  }
}

function nodeObserverConfig(attributes) {
  return {
    attributes: Array.isArray(attributes) && attributes.length ? true : false,
    attributeFilter: Array.isArray(attributes) ? attributes : [],
    childList: true
  };
}

function setProperty(host, key, formatter, getter, setter) {
  try {
    Object.defineProperty(host, key, {
      get: function get() {
        if (typeof getter === 'function') {
          return getter(host);
        }

        return host.state[key].value;
      },
      set: function set(value) {
        if (!host.state[key]) {
          return;
        }

        if (typeof setter === 'function') {
          return setter(host)(value);
        }

        var formattedValue = formatter(value, host);
        var previous = host.state[key].value;

        if (typeof previous === 'function' && typeof formattedValue === 'function' && formattedValue.toString() !== previous.toString()) {
          return host.state[key].next(formattedValue);
        }

        if (!Equals(host.state[key].value, formattedValue)) {
          host.state[key].next(formattedValue);
          host.trigger(key, formattedValue);
        }
      }
    });
  } catch (error) {}
}

function setStateProperty(host, key, formatter, onChange, getter, setter) {
  OnNextFrame(function setStatePropertyNext() {
    if (typeof formatter !== 'function') {
      return;
    }

    host.state[key] = Observer(formatter(host.getAttribute(key) || host[key], host));
    setProperty(host, key, formatter, getter, setter);

    if (typeof onChange !== 'function') {
      return;
    }

    host.state[key].subscribe(function stateNext(val) {
      return onChange(val, host);
    });
  });
}

function handleInnerStyleChange(host, key, styleString) {
  var styleElement = Get(host, 'elements.' + key);
  var componentId = '#' + host.componentContent.id;

  function getString(cssObj) {
    return componentId + ' ' + cssObj.cssText;
  }

  function combineRules(target, current) {
    return target + current;
  }

  var parsedRules = Transduce(getString)(ParseCss(styleString), '', combineRules);

  if (styleElement && styleString === '') {
    if (styleElement.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
    }

    return host.elements[key] = undefined;
  }

  if (!styleElement && !!parsedRules) {
    return host.elements[key] = AppendStyleElement(parsedRules, host.querySelector('.style-block-' + key), ''.concat(host.tagName.toLowerCase(), '-' + key), key);
  }

  SetStyleRules(styleElement, parsedRules);
}

function createStyleStateObject(key) {
  return {
    format: function format(val) {
      return typeof val === 'string' ? val : '';
    },
    onChange: function onChange(val, host) {
      handleInnerStyleChange(host, key, val);
    }
  };
}

function createElements(host, elements) {
  var elStates = {};
  var state = {};

  function removeOld(el) {
    var parent = Get(el, 'parentNode', Get(el, 'host'));

    if (!parent) {
      return;
    }

    parent.removeChild(el);
  }

  function getEl(key) {
    var els = ArrayFrom(host.querySelectorAll(elements[key].selector));
    state[key] = els.length > 1 ? els : els[0];
    return state[key];
  }

  function elementsEach(key) {
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

    function elStatesEach(newElement) {
      ObserverUnsubscribe(elStates[key].previous);
      removeOld(elStates[key].previous);

      if (typeof elements[key].onChange === 'function') {
        elements[key].onChange(newElement, host);
      }
    }

    elStates[key].subscribe(elStatesEach);
  }

  for (var prop in elements) {
    if (elements[prop]) {
      elementsEach(prop);
    }
  }

  return {
    state: state,
    disconnect: function disconnect() {
      function elStatesEach(key) {
        var el = host.elements[key];
        elStates[key].complete();

        if (el) {
          ObserverUnsubscribe(el);
        }
      }

      for (var _prop in elStates) {
        if (elStates[_prop]) {
          elStatesEach(_prop);
        }
      }

      return;
    }
  };
}

function ComponentConstructor(options) {
  var componentName = options.componentName;
  var computed = options.computed || {};
  var elements = options.elements || {};
  var getters = options.getters || {};
  var methods = options.methods || {};
  var onConnected = options.onConnected || component_constructor_emptyFn;
  var onDisconnected = options.onDisconnected || component_constructor_emptyFn;
  var onReady = options.onReady || component_constructor_emptyFn;
  var properties = options.properties || {};
  var setters = options.setters || {};
  var style = options.style || '';
  var outerStyle = options.outerStyle;
  var template = options.template || '';
  var formElement = options.formElement || false;

  if (!componentName) {
    return;
  }

  var propertyKeys = Object.keys(properties);
  options.observedAttributes = options.observedAttributes || propertyKeys;
  properties['class'] = ComponentClassObject;
  options.observedAttributes.push('class');
  var styleElementKeys = ['styles', 'theme'];
  styleElementKeys.forEach(function setStyleProps(styleKey) {
    properties[styleKey] = createStyleStateObject(styleKey, elements);
    elements[styleKey] = {
      selector: 'style.' + styleKey
    };
    options.observedAttributes.push(styleKey);
  });
  var observedAttributes = options.observedAttributes;

  function ConnectedFn(element) {
    function unsubscribeEvents() {
      return ObserverUnsubscribe(element);
    }

    function computedEach(key) {
      try {
        Object.defineProperty(element, key, computed[key](element));
      } catch (error) {}
    }

    function methodsEach(key) {
      element[key] = methods[key](element);
    }

    function setPropFn(key) {
      return setStateProperty(element, key, properties[key].format, properties[key].onChange, getters[key], setters[key]);
    }

    function finishConnectedFn() {
      onConnected(element);
      element.ready = true;
    }

    element.unsubscribeEvents = unsubscribeEvents;

    for (var prop in computed) {
      if (computed[prop]) {
        computedEach(prop);
      }
    }

    for (var _prop2 in methods) {
      if (methods[_prop2]) {
        methodsEach(_prop2);
      }
    }

    if (elements) {
      var ElementData = createElements(element, elements);
      element.elements = ElementData.state;
      element.disconnectElements = ElementData.disconnect;
    }

    if (!properties.ready) {
      setStateProperty(element, 'ready', function validationFn(val) {
        return Pipe(ToBool, IfInvalid(false))(val).value;
      }, function onReadyChange() {
        onReady(element);
        DispatchEvent(element, 'ready', element);
      }, getters.ready, setters.ready);
    }

    for (var _prop3 in properties) {
      if (properties[_prop3]) {
        setPropFn(_prop3);
      }
    }

    OnNextFrame(finishConnectedFn);
  }

  var node = CreateElement({
    tagName: componentContents,
    innerHTML: template + styleElementsString
  });

  var _nodeObserverConfig = nodeObserverConfig(observedAttributes);

  function CreateComponent(host) {
    if (host.constructed) {
      return;
    }

    var id = ID();
    var existingChildren = cleanStart(host);
    var styleElement = document.head.querySelector('style[name="' + componentName + '"]');

    if (!styleElement) {
      AppendStyleElement(style + outerStyle, document.head, componentName);
    }

    host.constructed = true;
    host.wcID = id;
    host.state = {};
    host.elements = {};
    host.componentContent = node.cloneNode(true);
    host.componentContent.contentFor = host;
    host.componentContent.setAttribute('id', componentName + '-' + host.wcID);
    host.slots = ArrayFrom(host.componentContent.querySelectorAll('[slotname]'));
    host.slotted$ = Observer([], true);
    host.slotted$.subscribe(function (slotted) {
      ForEach(function assign(child) {
        var slotName = getSlotName(child, 'slot');
        var slot = getMatchingSlot(host, slotName);
        slot.appendChild(child);
      }, slotted);
    });

    host.disconnectElements = function () {};

    host.onConnected = function OnConnected() {
      return ConnectedFn(host);
    };

    host.onDisconnected = function OnDisconnected() {
      ObserverUnsubscribe(host);
      return onDisconnected(host);
    };

    if (existingChildren[0]) {
      host.insertBefore(host.componentContent, existingChildren[0]);
    } else {
      host.appendChild(host.componentContent);
    }

    host.children$ = Observer(existingChildren);
    childMutation({
      target: host,
      addedNodes: existingChildren
    });
    var nodeObserver = new MutationObserver(function MutationObserverCallback(mutations) {
      ForEach(function nodeObserverCallbackInner(mutation) {
        if (mutation.type === 'attributes') {
          return attributeMutation(mutation);
        }

        if (mutation.type === 'childList') {
          return childMutation(mutation);
        }
      }, mutations);
    });
    nodeObserver.observe(host, _nodeObserverConfig);
    host.nodeObserver = nodeObserver;
    host.callbacks = {};

    host.on = function (name, callback) {
      if (!host.callbacks[name]) {
        host.callbacks[name] = [];
      }

      host.callbacks[name].push(callback);
    };

    host.trigger = function (name, data) {
      if (!host.callbacks[name]) {
        return;
      }

      ForEach(function (callback) {
        return callback(data);
      }, host.callbacks[name]);
    };

    if (formElement) {
      try {
        host.internals_ = host.attachInternals();
      } catch (error) {}

      Object.defineProperty(host, 'formAssociated', {
        get: function get() {
          return true;
        }
      });
    }

    return host;
  }

  return CreateComponent;
}
// CONCATENATED MODULE: ./src/components/ajax-form/index.js




























var defaultWidth = 240;
var defaultGap = [16, 16];

var ajax_form_template = __webpack_require__(152);

var ajax_form_componentName = 'ajax-form';
var componentRoot = '.' + ajax_form_componentName + '-container';

var ajax_form_outerStyle = __webpack_require__(153).toString();

function setAttribute(host, val, name, elKey) {
  return WhenAvailable(host, 'elements.' + elKey).then(function ElReady(el) {
    return el[val ? 'setAttribute' : 'removeAttribute'](name, val);
  }).catch(function () {});
}

function submitForm(host) {
  return DispatchEvent(host.elements.form, 'submit');
}

function getFormData(host) {
  var newForm = CreateElement({
    tagName: 'form',
    action: host.action,
    method: host.method,
    name: host.name,
    style: 'position:fixed;top:0;left:0;pointer-events:none;opacity:0;'
  });
  ArrayFrom(host.querySelectorAll('input')).forEach(function inputForeach(input) {
    return newForm.appendChild(CreateElement({
      tagName: 'input',
      autocomplete: input.autocomplete,
      value: input.value,
      type: input.type,
      name: input.name || input.autocomplete || input.type
    }));
  });
  document.body.appendChild(newForm);
  var data = {};
  var formData = new FormData(newForm);
  formData.forEach(function formDataForEach(value, key) {
    data[key] = value;
  });
  DispatchEvent(host, 'submitdata', data);
  OnNextFrame(function getFormDataNext() {
    document.body.removeChild(newForm);
  });
}

function removeChild(host, el) {
  if (el.container) {
    var slot = el.slot;
    var item = Filter(function (element) {
      return element.slot === slot;
    }, host.items$.value)[0];
    host.items$.remove(item);
    ObserverUnsubscribe(el);

    if (el.container.parentElement) {
      el.container.parentElement.removeChild(el.container);
    }
  }
}

function wrapChild(host, el) {
  var tagName = Get(el, 'nodeName.toLowerCase()');
  var isInput = /input-/.test(tagName);
  var isBtn = tagName === 'button-element';
  var isSubmit = isBtn && el.type === 'submit';
  var id = ID();
  var wrapper = CreateElement({
    tagName: 'div',
    class: ajax_form_componentName + '-slot-wrapper',
    id: id
  });

  if (!el.eventSubscriptions) {
    el.eventSubscriptions = {};
  }

  if (isSubmit) {
    el.eventSubscriptions = {
      click: ObserveEvent(el, 'click').subscribe(function () {
        return submitForm(host);
      })
    };
  } else if (isInput) {
    el.eventSubscriptions = {
      done: ObserveEvent(el, 'done').subscribe(function () {
        return submitForm(host);
      })
    };
  }

  el.slot = id;
  el.container = wrapper;
  host.removeChild(el);
  setTimeout(function () {
    ObserveExists(el, true).subscribe(function elExistsCallback(exists) {
      if (!exists) {
        removeChild(host, el);
      }
    });
  }, 0);
  return el;
}

var ajax_form_elements = {
  root: {
    selector: componentRoot
  },
  grid: {
    selector: '.' + ajax_form_componentName + '-grid'
  },
  form: {
    selector: '.' + ajax_form_componentName + '-form',
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        submit: ObserveEvent(el, 'submit', {
          preventDefault: true
        }).subscribe(function submitSubscription(e) {
          e.preventDefault();
          getFormData(host);
        })
      };
    }
  }
};
var ajax_form_properties = {
  action: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid('/'))(val).value;
    },
    onChange: function onChange(val, host) {
      return setAttribute(host, val, 'action', 'form');
    }
  },
  method: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid('POST'))(val).value;
    },
    onChange: function onChange(val, host) {
      return setAttribute(host, val, 'method', 'form');
    }
  },
  name: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      return setAttribute(host, val, 'name', 'form');
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
      return Pipe(ToString, IfInvalid('application/json'))(val).value;
    }
  },
  scaletofit: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(val, host) {
      return setAttribute(host, val, 'scaletofit', 'grid');
    }
  },
  columnwidth: {
    format: function format(val) {
      return val === '100%' ? val : Pipe(ToNumber, IfInvalid(defaultWidth))(val).value;
    },
    onChange: function onChange(val, host) {
      return setAttribute(host, val, 'columnwidth', 'grid');
    }
  },
  gap: {
    format: function format(val) {
      return Pipe(CommasToArray, IfInvalid([val, val]), ToMap(function gapMap(v) {
        var tv = ToNumber(v).value;

        if (isNaN(tv)) {
          return defaultGap[0];
        }

        return tv;
      }))(val).value;
    },
    onChange: function onChange(val, host) {
      return setAttribute(host, val, 'gap', 'grid');
    }
  }
};
var AjaxForm = ComponentConstructor({
  componentName: ajax_form_componentName,
  componentRoot: componentRoot,
  template: ajax_form_template,
  outerStyle: ajax_form_outerStyle,
  properties: ajax_form_properties,
  observedAttributes: Object.keys(ajax_form_properties),
  elements: ajax_form_elements,
  methods: {
    addItem: function addItem(host) {
      return function (item) {
        if (!host.items$.has(item)) {
          var newElement = document.adoptNode(wrapChild(host, item));
          host.elements.grid.appendChild(newElement.container);
          newElement.container.appendChild(newElement);
          host.items$.insert(newElement);
        }
      };
    }
  },
  onConnected: function onConnected(host) {
    host.items$ = Observer([], true);
    host.eventSubscriptions = host.eventSubscriptions ? host.eventSubscriptions : {};
    host.eventSubscriptions['children' + ID()] = host.children$.subscribe(function (children) {
      ForEach(host.addItem, children);
    });
  }
});
Components.addComponent(ajax_form_componentName, AjaxForm);

// CONCATENATED MODULE: ./src/components/button-element/index.js












var button_element_componentName = 'button-element';
var button_element_componentRoot = '.' + button_element_componentName + '-container';
var button_element_properties = {
  name: {
    format: function format(val, host) {
      return Pipe(ToString, IfInvalid(host.textContent.trim()))(val).value;
    },
    onChange: function onChange(val, host) {
      return WhenAvailable(host, 'elements.button').then(function btnReady(btn) {
        btn.setAttribute('name', val);
      }).catch(function () {});
    }
  },
  disabled: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      return WhenAvailable(host, 'elements.root').then(function rootReady(root) {
        root.classList[val ? 'add' : 'remove']('disabled');
      }).catch(function () {});
    }
  },
  type: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      return WhenAvailable(host, 'elements.button').then(function btnReady(btn) {
        if (val) {
          btn.setAttribute('type', 'submit');
          btn.appendChild(CreateElement({
            tagName: 'input',
            type: 'submit'
          }));
        } else {
          btn.removeAttribute('type', 'submit');

          try {
            btn.removeChild(btn.querySelector('input[type="submit"]'));
          } catch (error) {}
        }
      }).catch(function () {});
    }
  }
};
var button_element_elements = {
  root: {
    selector: button_element_componentRoot
  },
  button: {
    selector: button_element_componentRoot + ' > button'
  },
  slot: {
    selector: 'slot'
  }
};
var ButtonElement = ComponentConstructor({
  componentName: button_element_componentName,
  componentRoot: button_element_componentRoot,
  template: __webpack_require__(154),
  style: __webpack_require__(155).toString(),
  outerStyle: __webpack_require__(156).toString(),
  observedAttributes: Object.keys(button_element_properties),
  properties: button_element_properties,
  elements: button_element_elements,
  onConnected: function onConnected(host) {
    host.setAttribute('ready', true);
  }
});
Components.addComponent(button_element_componentName, ButtonElement);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__(31);

// CONCATENATED MODULE: ./src/services/icons.js
var iconArrow = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>';
var iconCheck = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';
var iconChevron = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>';
var iconClose = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
var iconDelete = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>';
var iconError = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>';
var iconFilter = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.96 10.29l-2.75 3.54-1.96-2.36L8.5 15h11l-3.54-4.71zM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"/></svg>';
var iconGear = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>';
var iconInfo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></svg>';
var iconHelp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>';
var iconPencil = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
var iconPlay = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
var iconTriangle = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>';
var iconWarning = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';
var Icons = {
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
};
// CONCATENATED MODULE: ./src/components/content-collapse/index.js








/**
 * add ripple and bounce to toggle container
 */











var content_collapse_outerStyle = 'content-collapse{display: block;}';

var content_collapse_style = __webpack_require__(157).toString();

var content_collapse_template = __webpack_require__(158);

var content_collapse_componentName = 'content-collapse';
var content_collapse_componentRoot = ''.concat('.', content_collapse_componentName, '-container');
var content_collapse_properties = {
  expanded: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      host.setAttribute('expanded', val);

      if (host.group && val) {
        var parent = GetParent(host);
        Array.from(parent ? parent.children : []).forEach(function (s) {
          return s !== host && s.group === host.group && s.expanded === true ? s.expanded = false : undefined;
        });
      }

      WhenAvailable(host, 'elements.transition.transition').then(function (transition) {
        transition(val ? 1 : 0);
        host.elements.icon.setAttribute('rotation', val ? 'down' : 'right');
      }).catch(function () {});
    }
  },
  arrow: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(iconChevron))(val).value;
    },
    onChange: function onChange(val, host) {
      WhenAvailable(host, 'elements.icon').then(function (el) {
        el.svg = val;
      }).catch(function () {});
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
      return WhenAvailable(host, 'elements.transition').then(function (transition) {
        transition.speed = val;
      }).catch(function () {});
    }
  }
};
var content_collapse_observedAttributes = Object.keys(content_collapse_properties);
var content_collapse_elements = {
  root: {
    selector: content_collapse_componentRoot
  },
  transition: {
    selector: '.'.concat(content_collapse_componentName, '-transition')
  },
  icon: {
    selector: '.'.concat(content_collapse_componentName, '-toggler-icon')
  },
  toggler: {
    selector: '.'.concat(content_collapse_componentName, '-toggler'),
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        click: ObserveEvent(el, 'click').subscribe(function () {
          host.expanded = !host.expanded;
        }),
        mouseenter: ObserveEvent(el, 'mouseenter').subscribe(function () {
          el.classList.add('hovering');
        }),
        mouseleave: ObserveEvent(el, 'mouseleave').subscribe(function () {
          el.classList.remove('hovering');
        })
      };
    }
  }
};
var ContentCollapse = ComponentConstructor({
  componentName: content_collapse_componentName,
  componentRoot: content_collapse_componentRoot,
  template: content_collapse_template,
  style: content_collapse_style,
  outerStyle: content_collapse_outerStyle,
  observedAttributes: content_collapse_observedAttributes,
  properties: content_collapse_properties,
  elements: content_collapse_elements
});
Components.addComponent(content_collapse_componentName, ContentCollapse);

// CONCATENATED MODULE: ./src/components/content-transition/methods.js










function animator(from, to, speed, stepFn) {
  return new Promise(function (resolve) {
    try {
      Timer(stepFn, EaseInOut([from, to], speed)).then(resolve);
    } catch (error) {
      resolve();
    }
  });
}

function animateHeight(from, to, el, speed) {
  return animator(from, to, speed, function (heightStep) {
    return el.style.height = ''.concat(heightStep, 'px');
  });
}

function animateLeft(from, to, el, speed) {
  return animator(from, to, speed, function (leftStep) {
    return el.style.transform = 'translateZ(0) translateX('.concat(leftStep, '%)');
  });
}

function animateOpacity(from, to, el, speed) {
  return animator(from, to, speed, function (opacityStep) {
    return el.style.opacity = opacityStep;
  });
}

function dispatchTransition(host, from, to, isEnd) {
  return DispatchEvent(host, 'transition'.concat(isEnd ? 'ed' : 'ing'), {
    host: host,
    from: from,
    to: to
  });
}

function elementOpacity(el, defaultOpacity) {
  defaultOpacity = defaultOpacity === undefined ? 1 : defaultOpacity;
  return Get(el, 'style.opacity', defaultOpacity, function (val) {
    return val === '' ? defaultOpacity : parseFloat(val);
  });
}

function getChildren(host) {
  return function () {
    return host.slotted$.value;
  };
}
function getCurrent(host) {
  return function () {
    return Filter(function (slotted) {
      return slotted.slot === 'current';
    }, host.slotted$)[0];
  };
}
function getIndex(host) {
  return function () {
    return host.getChildren().indexOf(host.getCurrent());
  };
}
function start$(host) {
  return function (next, error, complete) {
    error = error ? error : function () {};
    complete = complete ? complete : function () {};
    return host.state.start.subscribe(next, error, complete);
  };
}
function end$(host) {
  return function (next, error, complete) {
    error = error ? error : function () {};
    complete = complete ? complete : function () {};
    return host.state.end.subscribe(next, error, complete);
  };
}

function getTransitionElements(host, indexOrChild) {
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
    current: current,
    hiddenSlot: host.elements.hidden,
    currentSlot: host.elements.current
  };
}

function endTransition(host, old, current, currentContainer, nextContainer) {
  try {
    if (old && old.getAttribute('slot') !== 'hidden') {
      old.setAttribute('slot', 'hidden');
    }

    if (current && current.getAttribute('slot') !== 'current') {
      current.setAttribute('slot', 'current');
    }

    currentContainer.style.removeProperty('transform');
    currentContainer.style.removeProperty('opacity');
    nextContainer.style.removeProperty('transform');
    nextContainer.style.removeProperty('opacity');
    host.elements.root.style.removeProperty('height');
    host.end = {
      current: current,
      index: host.getChildren().indexOf(current)
    };
  } catch (error) {}

  return current;
}

function startTransition(host, current, child) {
  try {
    child.setAttribute('slot', 'next');
    host.start = {
      from: current,
      to: child
    };
    dispatchTransition(host, current, child);
  } catch (error) {}
}

function switchHeights(root, child, speed) {
  return new Promise(function (resolve) {
    var endHeight = Get(child, 'offsetHeight', 0);
    var startHeight = Get(root, 'offsetHeight', endHeight);
    return endHeight === startHeight ? setTimeout(resolve, speed) : animateHeight(startHeight, endHeight, root, speed).then(resolve);
  });
}

function transitionFade(current, next, speed) {
  return Promise.all([animateOpacity(elementOpacity(current), 0, current, speed * 0.75), animateOpacity(elementOpacity(next, 0), 1, next, speed * 1.1)]);
}

function transitionSlide(current, next, speed) {
  return Promise.all([animateOpacity(elementOpacity(current), 0, current, speed * 0.5), animateOpacity(elementOpacity(next, 0), 1, next, speed * 0.7), animateLeft(0, 100, current, speed * 0.8), animateLeft(-100, 0, next, speed)]);
}

var methods_methods = {
  slide: transitionSlide,
  fade: transitionFade
};
function transition(host) {
  return function (index) {
    return new Promise(function (resolve) {
      var maxTries = 1000;

      function run() {
        maxTries = maxTries - 1;

        if (host.speed === undefined) {
          if (!maxTries) {
            return;
          }

          return OnNextFrame(run);
        }

        var elements = getTransitionElements(host, index);

        if (!elements) {
          return resolve();
        }

        startTransition(host, elements.current, elements.child);
        return Promise.all([switchHeights(elements.root, elements.child, host.speed), !methods_methods[host.type] ? Promise.resolve() : methods_methods[host.type](elements.currentContainer, elements.nextContainer, host.speed)]).then(function () {
          return endTransition(host, elements.current, elements.child, elements.currentContainer, elements.nextContainer);
        }).then(function () {
          if (!host.keepchildren) {
            while (host.getChildren().length > 1) {
              var child = host.getChildren()[0];
              host.slotted$.remove(child);

              try {
                child.parentNode.removeChild(child);
              } catch (error) {}
            }
          }

          return elements.child;
        }).then(resolve);
      }

      run();
    });
  };
}
function setCurrent(host) {
  return function (index) {
    var elements = getTransitionElements(host, index);

    if (!elements) {
      return Promise.reject();
    }

    return endTransition(host, elements.current, elements.child, elements.currentContainer, elements.nextContainer);
  };
}
// CONCATENATED MODULE: ./src/components/content-transition/index.js












var content_transition_style = __webpack_require__(159).toString();

var content_transition_outerStyle = __webpack_require__(160).toString();

var content_transition_template = __webpack_require__(161);

var content_transition_componentName = 'content-transition';
var content_transition_componentRoot = ''.concat('.', content_transition_componentName, '-container');
var content_transition_elements = {
  root: {
    selector: '.content-transition-container',
    onChange: function onChange(el, host) {
      el.setAttribute('type', host.type);
    }
  },
  current: {
    selector: '[slotname="current"]'
  },
  next: {
    selector: '[slotname="next"]'
  },
  nextContainer: {
    selector: '.next-slot'
  },
  hidden: {
    selector: '[slotname="hidden"]'
  },
  hiddentContainer: {
    selector: '.hidden-slot'
  },
  currentContainer: {
    selector: '.current-slot'
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
      return ['fade', 'slide', 'height'].indexOf(val) > -1 ? val : 'fade';
    },
    onChange: function onChange(val, host) {
      var root = host.elements.root;

      if (!root) {
        return;
      }

      root.setAttribute('type', val);
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

      root.classList[host.keepchildren ? 'add' : 'remove']('keepchildren');
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
var ContentTransition = ComponentConstructor({
  componentName: content_transition_componentName,
  componentRoot: content_transition_componentRoot,
  template: content_transition_template,
  style: content_transition_style,
  outerStyle: content_transition_outerStyle,
  observedAttributes: Object.keys(content_transition_properties),
  properties: content_transition_properties,
  elements: content_transition_elements,
  methods: {
    transition: transition,
    getIndex: getIndex,
    getCurrent: getCurrent,
    getChildren: getChildren,
    start$: start$,
    end$: end$,
    setCurrent: setCurrent
  }
});
Components.addComponent(content_transition_componentName, ContentTransition);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__(49);

// CONCATENATED MODULE: ./src/utils/observe-visibility.js






function isVisible(e) {
  var instance = e[e.length - 1];
  var isNotDisplayed = instance.target ? window.getComputedStyle(instance.target).display === 'none' : instance.isNotDisplayed;
  return instance.boundingClientRect.width === 0 && instance.boundingClientRect.height === 0 || isNotDisplayed;
}

function IObserver(callback) {
  if ('IntersectionObserver' in window) {
    return new IntersectionObserver(callback);
  }

  var timer;
  var isRunning = false;
  return {
    observe: function observe(element) {
      isRunning = true;
      var history = {
        isNotDisplayed: false,
        boundingClientRect: {
          width: 10000,
          height: 10000
        }
      };

      function runIObserver() {
        if (!isRunning) {
          return;
        }

        var isNotDisplayed = window.getComputedStyle(element).display === 'none';
        var rect = element.getBoundingClientRect();

        if (history.isNotDisplayed !== isNotDisplayed || history.boundingClientRect.width !== rect.width || history.boundingClientRect.height !== rect.height) {
          history.isNotDisplayed = isNotDisplayed;
          history.boundingClientRect.width = rect.width;
          history.boundingClientRect.height = rect.height;

          if (isNotDisplayed || rect.width === 0 || rect.height === 0) {
            callback([{
              isNotDisplayed: isNotDisplayed,
              boundingClientRect: {
                width: rect.width,
                height: rect.height
              }
            }]);
          }
        }

        timer = OnNextFrame(runIObserver);
      }

      runIObserver();
    },
    disconnect: function disconnect() {
      isRunning = false;

      if (timer) {
        timer.cancel();
      }
    }
  };
}

function ObserveVisibility(element) {
  if (!element) {
    return ObserverReturnEmpty();
  }

  var isRunning = false;
  var intersectionObserver;

  function callback(e) {
    return !observer || !observer.subscriptions || Object.keys(observer.subscriptions).length === 0 ? shutDown() : observer.next(isVisible(e));
  }

  function startup() {
    if (isRunning || intersectionObserver) {
      return;
    }

    isRunning = true;
    intersectionObserver = IObserver(callback);
    intersectionObserver.observe(element);
  }

  var observer = Observer(undefined, undefined, startup);

  function shutDown() {
    try {
      intersectionObserver.disconnect();
    } catch (error) {}

    intersectionObserver = undefined;
    isRunning = false;
  }

  function dispose() {
    shutDown();
    observer.complete();

    try {
      exists();
    } catch (error) {}
  }

  function subFn(exists) {
    return exists ? undefined : dispose();
  }

  var exists = ObserveExists(element).subscribe(subFn);
  startup();
  return observer;
}
// CONCATENATED MODULE: ./src/components/grid-layout/index.js























var grid_layout_style = __webpack_require__(163).toString();

var grid_layout_outerStyle = __webpack_require__(164).toString();

var grid_layout_template = __webpack_require__(165);

var grid_layout_componentName = 'grid-layout';
var grid_layout_componentRoot = ''.concat('.', grid_layout_componentName, '-container');
var grid_layout_defaultWidth = 240;
var grid_layout_defaultGap = [16, 16];

function cssSelectorId(host) {
  return '#' + host.componentContent.id;
}

function unsupportedCSS(host, gap, columnwidth) {
  return typeof host.style.grid === 'string' ? '' : cssSelectorId(host) + ' .grid-layout-items{' + 'margin-left:-' + gap, 'px;' + 'margin-right:-', gap, 'px;' + '}' + cssSelectorId(host) + ' .grid-layout-items .grid-layout-item{' + 'max-width:' + columnwidth + 'px;' + 'margin:' + gap + 'px;' + '}';
}

function cancelTimer(host) {
  return host.timer ? host.timer.cancel() : undefined;
}

function setScale(host) {
  return OnNextFrame(function () {
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

    if (columnwidth === '100%') {
      columnwidth = 100;
      gapMedian = 0;
    } else {
      if (columnGapPercent > 50) {
        columnGapPercent = 50;
      }

      columnwidth = columnGapPercent * ratio;
      gapMedian = (columnGapPercent - columnwidth) / 2;
    }

    var thisStyle = '' + cssSelectorId(host) + ' .grid-layout-items{' + 'display:flex;' + 'width:' + (100 + gapMedian * 2) + '%;' + 'margin-left:-' + gapMedian + '%;' + '}' + cssSelectorId(host) + ' .grid-layout-item{' + 'width:' + columnGapPercent + '%;' + 'padding:' + gapMedian / 2 + '% ' + gapMedian + '%;' + '}';
    SetStyleRules(host.elements.innerStyles, thisStyle);
  });
}

function setDimensions(host) {
  return OnNextFrame(function () {
    var gap = host.gap || grid_layout_defaultGap;
    var gapValues = Array.isArray(gap) ? [gap[0], gap[1]] : [gap, gap];
    var gapMedian = gapValues.reduce(function (t, c) {
      t = t + c;
      return t;
    }, 0) / 2;
    var columnwidth = host.columnwidth || grid_layout_defaultWidth;
    var thisStyle = '' + cssSelectorId(host) + ' .grid-layout-items{' + 'grid-row-gap:' + gapValues[0] + 'px;' + 'grid-column-gap:' + gapValues[1] + 'px;' + 'grid-template-columns:repeat(auto-fit, minmax(' + columnwidth + 'px, 0fr));' + '}' + unsupportedCSS(host, gapMedian, columnwidth);
    SetStyleRules(host.elements.innerStyles, thisStyle);
  });
}

var grid_layout_elements = {
  root: {
    selector: grid_layout_componentRoot
  },
  itemsContainer: {
    selector: '.'.concat(grid_layout_componentName, '-items')
  },
  innerStyles: {
    selector: 'style.grid-innerStyles'
  }
};

function runDimensions(host) {
  cancelTimer(host);
  host.timer = setDimensions(host);
}

function runScale(host) {
  cancelTimer(host);
  host.timer = setScale(host);
}

var grid_layout_properties = {
  columnwidth: {
    format: function format(val) {
      return val === '100%' ? val : Pipe(ToNumber, IfInvalid(grid_layout_defaultWidth))(val).value;
    },
    onChange: function onChange(_val, host) {
      host.scaletofit ? runScale(host) : runDimensions(host);
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
      host.scaletofit ? runScale(host) : runDimensions(host);
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
    }
  }
};

function grid_layout_removeChild(host, el) {
  if (el.container) {
    var slot = el.slot;
    var item = Filter(function (element) {
      return element.slot === slot;
    }, host.items$.value)[0];
    host.items$.remove(item);
    ObserverUnsubscribe(el);

    if (el.container.parentElement) {
      el.container.parentElement.removeChild(el.container);
    }
  }
}

function grid_layout_wrapChild(host, el) {
  var id = ID();
  var wrapper = CreateElement({
    tagName: 'div',
    class: grid_layout_componentName + '-slot-wrapper grid-layout-item',
    id: id
  });
  el.slot = id;
  el.container = wrapper;
  el.eventSubscriptions = el.eventSubscriptions ? el.eventSubscriptions : {};

  try {
    host.removeChild(el);
  } catch (error) {}

  setTimeout(function () {
    el.eventSubscriptions.gridLayoutExists = ObserveExists(el, true).subscribe(function elExistsCallback(exists) {
      if (!exists) {
        grid_layout_removeChild(host, el);
      }
    });
    el.eventSubscriptions.visible = ObserveVisibility(el).subscribe(function visibilityCallback(hidden) {
      var currentlyHidden = el.container.classList.contains('hidden');

      if (hidden !== currentlyHidden) {
        el.container.classList[hidden ? 'add' : 'remove']('hidden');
      }
    });
  }, 0);
  return el;
}

var GridLayout = ComponentConstructor({
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
          return host.items$.value;
        }
      };
    }
  },
  methods: {
    clear: function clear(host) {
      return function clearInner() {
        ForEach(function (child) {
          grid_layout_removeChild(host, child);
        }, host.items$.value, true);
      };
    },
    addItem: function addItem(host) {
      return function addItemInner(item) {
        if (!host.items$.has(item)) {
          var newElement = document.adoptNode(grid_layout_wrapChild(host, item));
          host.elements.itemsContainer.appendChild(newElement.container);
          newElement.container.appendChild(newElement);
          host.items$.insert(newElement);
        }
      };
    }
  },
  onConnected: function onConnected(host) {
    host.items$ = Observer([], true);
    host.eventSubscriptions = host.eventSubscriptions ? host.eventSubscriptions : {};
    host.eventSubscriptions['children' + ID()] = host.children$.subscribe(function childrenUpdate(children) {
      ForEach(function addedChildWrap(child) {
        host.addItem(child);
      }, children);
    });
    window.addEventListener('resize', function () {
      return host.scaletofit ? runScale(host) : undefined;
    });

    if (host.scaletofit) {
      runScale(host);
    } else {
      runDimensions(host);
    }

    OnNextFrame(function () {
      return host.setAttribute('viewable', true);
    });
  }
});
Components.addComponent(grid_layout_componentName, GridLayout);

// CONCATENATED MODULE: ./src/components/icon-element/index.js










var icon_element_style = __webpack_require__(166).toString();

var icon_element_outerStyle = 'icon-element { display: inline-flex; align-items: center; justify-content: flex-start; }';
var icon_element_elements = {
  svgContainer: {
    selector: '.svg-container'
  }
};
var attributes = {
  svg: {
    format: function format(val) {
      return typeof val === 'string' ? val : null;
    },
    onChange: function onChange(value, host) {
      if (!value) {
        return;
      }

      if (host.subscription) {
        host.subscription();
      }

      OnNextFrame(function () {
        WhenAvailable(host, 'elements.svgContainer').then(function (el) {
          el.innerHTML = value;
        }).catch(function () {});
        DispatchEvent(host, 'iconloaded', host);
      });
    }
  },
  color: {
    format: function format(val) {
      return typeof val === 'string' ? val : null;
    },
    onChange: function onChange(value, host) {
      OnNextFrame(function () {
        WhenAvailable(host, 'elements.svgContainer').then(function (el) {
          el.style.color = value;
        }).catch(function () {});
      });
    }
  },
  size: {
    format: function format(val) {
      return typeof val === 'string' ? val : '1.5em';
    },
    onChange: function onChange(value, host) {
      OnNextFrame(function () {
        WhenAvailable(host, 'elements.svgContainer').then(function (el) {
          el.style.height = el.style.width = value;
        }).catch(function () {});
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
}, attributes);

var icon_element_template = __webpack_require__(167);

var icon_element_componentName = 'icon-element';
var icon_element_componentRoot = ''.concat('.', icon_element_componentName, '-container');
var IconElement = ComponentConstructor({
  componentName: icon_element_componentName,
  componentRoot: icon_element_componentRoot,
  template: icon_element_template,
  style: icon_element_style,
  outerStyle: icon_element_outerStyle,
  observedAttributes: Object.keys(attributes),
  properties: icon_element_properties,
  elements: icon_element_elements
});
Components.addComponent(icon_element_componentName, IconElement);

// CONCATENATED MODULE: ./src/utils/set-attribute.js




function SetAttribute(element, name, value, asProperty) {
  asProperty = asProperty ? true : false;

  if (!element || !name) {
    return element;
  }

  function set(n, v) {
    if (n === 'accept') {
      return element.setAttribute('accept', v ? Array.isArray(v) ? v.join(', ') : v : undefined);
    }

    var arias = ['disabled', 'required'];

    if (arias.indexOf(n) > -1) {
      set('aria-' + n, v);
    }

    if (!asProperty) {
      return v ? element.setAttribute(n, v) : element.removeAttribute(n);
    }

    return v ? element[n] = v : element[n] = undefined;
  }

  function nameEach(n, i) {
    set(n, value[i]);
  }

  if (Array.isArray(name)) {
    name.forEach(nameEach);
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
// CONCATENATED MODULE: ./src/components/input-shared/definitions.js

var labelPositions = ['top', 'bottom', 'left', 'right', 'inside'];
var resizeOptions = ['true', 'false', 'horizontal', 'vertical', 'auto'];
var boolAttrs = ['aria-labelledby', 'disabled', 'id', 'name', 'readonly', 'required', 'aria-required', 'tabindex', 'value'];
var fieldAttrs = [].concat(boolAttrs, ['autocorrect', 'autocomplete', 'autofocus', 'maxlength', 'placeholder', 'pattern']);
var fileAttrs = [].concat(fieldAttrs, ['accept']);
var InputFieldInputAttributes = {
  field: fieldAttrs,
  bool: boolAttrs,
  file: fileAttrs
};
var supportedInputTypes = ['file', 'email', 'password', 'url', 'text', 'textarea', 'number', 'radio', 'checkbox', 'tel', 'usphone', 'intlphone', 'uszip', 'select'];
function processedNullValue() {
  return {
    original: '',
    sanitized: '',
    valid: true,
    reason: []
  };
}
function processedFileValue(file) {
  return {
    original: file,
    sanitized: file,
    valid: true,
    reason: []
  };
}
// CONCATENATED MODULE: ./src/components/input-shared/set-input-id.js








function inputIdString(host) {
  return ''.concat(host.inputID, '-input_', host.id ? host.id : '', '');
}
function setInputID(host) {
  var id = inputIdString(host);
  var inputID = host.inputID;
  return OnNextFrame(function () {
    return Promise.all([WhenAvailable(host, 'labelelement').then(function (label) {
      return SetAttribute(label, ['id', 'for'], [inputID, id]);
    }).catch(function () {}), WhenAvailable(host, 'input').then(function (input) {
      return SetAttribute(input, ['id', 'aria-labelledby'], [id, inputID]);
    }).catch(function () {})]);
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
  return DispatchEvent(host, type, data ? data : data === false ? false : host.state);
}
// CONCATENATED MODULE: ./src/utils/get-input-value.js


function GetInputValue(input) {
  if (!input) {
    return;
  }

  var type = input.tagName.toLowerCase() === 'select' ? 'select' : input.type;

  if (type === 'checkbox' || type === 'radio') {
    return input.checked;
  }

  if (type === 'select') {
    return input.options[input.selectedIndex].value;
  }

  if (type === 'file') {
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
  WhenAvailable(host, 'input').then(function (input) {
    host.value = GetInputValue(input);
    input.blur();
    dispatch_dispatch(host, 'blur', host);
  }).catch(function () {});
}
// CONCATENATED MODULE: ./src/components/input-shared/on-done.js




function onDone(host) {
  return WhenAvailable(host, 'input').then(function (input) {
    input.blur();
    dispatch_dispatch(host, 'done', host);
    var form = Get(host, 'internals_.form', host.closest('form'));

    if (form) {
      DispatchEvent(form, 'submit');
    }
  }).catch(function () {});
}
// CONCATENATED MODULE: ./src/components/input-shared/on-keydown.js

function onKeyDown(e, host) {
  if (!e) {
    return;
  }

  if (e.key && e.key.toLowerCase() === 'enter' && host.type !== 'textarea') {
    return onDone(host);
  }
}
// CONCATENATED MODULE: ./src/components/input-shared/on-input.js



function onInput(host) {
  return WhenAvailable(host, 'input').then(function (input) {
    host.value = GetInputValue(input);
    var val = host.value;

    if (['checkbox', 'radio'].indexOf(host.type) > -1) {
      return val !== input.checked ? input.checked = val : undefined;
    }

    if (val !== input.value) {
      input.value = val;
    }
  }).catch(function () {});
}
// CONCATENATED MODULE: ./src/utils/svg-tags.js
var svgTags = ['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'audio', 'canvas', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'video', 'view', 'vkern'];
// CONCATENATED MODULE: ./src/utils/html-tags.js
var htmlTags = ['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr'];
// CONCATENATED MODULE: ./src/utils/validate-html.js














function getElements(Doc, selector) {
  return Array.from(Doc.body.querySelectorAll(selector));
}

function ValidateHtml(str, allowedHtmlTags, disallowedHtmlTags) {
  var original = str;
  var converted = Pipe(ToString, FromEntities)(str);
  var val = converted.value;

  if (!str || !str.length || converted.type !== 'string') {
    return {
      original: original,
      valid: false,
      sanitized: val,
      reason: ['no value']
    };
  }

  var doc;

  try {
    doc = new DOMParser().parseFromString(val, 'text/html');
  } catch (error) {
    return {
      original: original,
      valid: true,
      sanitized: val,
      reason: ['no html present']
    };
  }

  var totalElements = getElements(doc, '*');
  var tagsToDestroy = [];
  var elementsToDestroy = [];

  function allowedHtmlTagsEach(tag) {
    var index = tagsToDestroy.indexOf(tag);

    if (index > -1) {
      tagsToDestroy.splice(index, 1);
    }
  }

  function tagsToDestroyEach(tag) {
    elementsToDestroy = [].concat(getElements(doc, tag), elementsToDestroy);
  }

  function elementsToDestroyEach(el) {
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
  }

  if (disallowedHtmlTags && disallowedHtmlTags.length) {
    tagsToDestroy = disallowedHtmlTags.slice(0);
  } else {
    tagsToDestroy = [].concat(svgTags, htmlTags);
  }

  if (allowedHtmlTags && allowedHtmlTags.length) {
    allowedHtmlTags.forEach(allowedHtmlTagsEach);
  }

  tagsToDestroy.forEach(tagsToDestroyEach);
  elementsToDestroy.forEach(elementsToDestroyEach);
  var leftOverElements = getElements(doc, '*');
  var diff = totalElements.length - leftOverElements.length;
  var valid = diff === 0;
  return {
    original: original,
    valid: valid,
    sanitized: valid ? val : !doc.body.innerHTML || !doc.body.innerHTML.length ? '' : doc.body.innerHTML,
    reason: valid ? [] : [''.concat(diff, ' element', diff > 1 ? 's were' : ' was', ' removed')]
  };
}
// CONCATENATED MODULE: ./src/components/input-shared/set-input.js
















function inputAttributeList(host) {
  return ['radio', 'checkbox'].indexOf(host.inputType) > -1 ? InputFieldInputAttributes.bool : host.type === 'file' ? InputFieldInputAttributes.file : InputFieldInputAttributes.field;
}
var asIsTypes = ['checkbox', 'checkbox', 'date', 'email', 'file', 'number', 'password', 'radio', 'tel', 'url'];

function tagType(type) {
  return type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input';
}

function setInputValue(host) {
  return SetAttribute(host.input, 'value', host.processedValue.original);
}

function setInput(host) {
  if (host.setInputTimer) {
    host.setInputTimer.cancel();
  }

  if (host.input) {
    host.input.parentNode.removeChild(host.input);
  }

  WhenAvailable(host, 'elements.container').then(function (container) {
    return SetAttribute(container, 'input-kind', host.type);
  }).catch(function () {});
  var slotSelector = '[inputholder]';
  var tagName = tagType(host.type);
  var type = tagName === 'input' ? asIsTypes.indexOf(host.type) > -1 ? host.type : 'text' : undefined;
  var elData = {
    tagName: tagName,
    class: 'input-field-input'
  };

  if (type) {
    elData.type = type;
  }

  var input = CreateElement(elData);
  host.querySelector(slotSelector).appendChild(input);
  host.input = input;
  inputAttributeList(host).forEach(function (attr) {
    return attr === 'value' ? setInputValue(host) : SetAttribute(input, attr, host[attr]);
  });
  input.name = Get(host, 'name', Get(host, 'label', Get(host, 'placeholder', '')));
  setInputID(host);

  if (host.type === 'select' && Array.isArray(host.options)) {
    if (host.emptyoption !== 'false') {
      input.appendChild(CreateElement({
        tagName: 'option',
        value: Get(host, 'emptyoption.value', ''),
        innerHTML: ValidateHtml(Get(host, 'emptyoption.label', Get(host, 'emptyoption', '')), [], ['script']).sanitized
      }));
    }

    if (Array.isArray(host.options)) {
      host.options.forEach(function (o) {
        return input.appendChild(CreateElement({
          tagName: 'option',
          value: o.value,
          innerHTML: ValidateHtml(o.label, [], ['script']).sanitized
        }));
      });
    }
  }

  input.eventSubscriptions = {
    onFocus: ObserveEvent(input, 'focus').subscribe(function () {
      onFocus(host);
    }),
    onBlur: ObserveEvent(input, 'blur').subscribe(function () {
      onBlur(host);
    }),
    onKeyDown: ObserveEvent(input, 'keydown').subscribe(function (e) {
      onKeyDown(e, host);
    })
  };

  if (['select', 'checkbox', 'radio'].indexOf(host.type) > -1) {
    input.eventSubscriptions.onChange = ObserveEvent(input, 'change', {
      preventDefault: true
    }).subscribe(function () {
      onInput(host);
    });
  } else {
    input.eventSubscriptions.input = ObserveEvent(input, 'input', {
      preventDefault: true
    }).subscribe(function () {
      onInput(host);
    });
  }
}
// CONCATENATED MODULE: ./src/utils/try.js
function Try(fn) {
  return function TryInner() {
    try {
      return fn.apply(null, arguments);
    } catch (error) {}
  };
}
// CONCATENATED MODULE: ./src/components/input-shared/on-label-click.js



function onLabelClick(e, host) {
  return WhenAvailable(host, 'input').then(function (input) {
    input.focus();
    dispatch_dispatch(host, 'labelClick', host);

    if (['checkbox', 'radio'].indexOf(host.type) > -1) {
      input.checked = !input.checked;
    }
  }).catch(function () {});
}
// CONCATENATED MODULE: ./src/components/input-shared/set-label.js









function unsubscribeLabel(input) {
  return ObserverUnsubscribe(input);
}

function setLabel(host) {
  var labelelement = host.labelelement;
  var inputID = host.inputID;
  var labelposition = host.labelposition;
  var slotSelector = '[label-' + labelposition + ']';
  var label = host.label;
  Try(function () {
    host.removeChild(labelelement);
  });
  var element = CreateElement({
    tagName: 'label',
    id: inputID,
    tabIndex: -1,
    for: inputIdString(host),
    class: ''.concat('input-field-', labelposition, '-label'),
    innerHTML: ValidateHtml(label, [], ['script']).sanitized || ''
  });
  host.querySelector(slotSelector).appendChild(element);
  host.labelelement = element;
  element.eventSubscriptions = {
    onLabelClick: ObserveEvent(element, 'click').subscribe(function (e) {
      onLabelClick(e, host);
    })
  };
  ObserveExists(element).subscribe(function () {}, function () {
    return unsubscribeLabel(element);
  }, function () {
    return unsubscribeLabel(element);
  });
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
// CONCATENATED MODULE: ./src/components/input-shared/get-label-position.js


function getDefaultLabelPosition(host) {
  return Get(host, 'state.labelposition.value', ['input-bool'].indexOf(host.tagName.toLowerCase()) === -1 ? 'inside' : 'left');
}
// CONCATENATED MODULE: ./src/components/input-shared/on-invalid.js

function onInvalid(host) {
  return dispatch_dispatch(host, 'invalid', {
    value: host.value,
    error: host.validationMessage
  });
}
// CONCATENATED MODULE: ./src/components/input-shared/properties.js





















function trueOrNull(val) {
  return Pipe(ToBool, IfNot(true, null))(val).value;
}

function stringOrEmpty(val) {
  return Pipe(ToString, IfInvalid(''))(val).value;
}

function addRemoveContainerClass(val, host, clss) {
  return Get(host, 'elements.container.classList', {
    add: function add() {},
    remove: function remove() {}
  })[val ? 'add' : 'remove'](clss);
}

function setInputAttribute(host, name, value) {
  return WhenAvailable(host, 'input').then(function (input) {
    return SetAttribute(input, name, value);
  }).catch(function () {});
}

function defaultType(host) {
  var tag = host.tagName.toLowerCase();
  return tag === 'input-bool' ? 'checkbox' : tag === 'input-select' ? 'select' : 'text';
}

var properties_properties = {
  autofocus: {
    format: trueOrNull,
    onChange: function onChange(val, host) {
      setInputAttribute(host, 'autofocus', val);
    }
  },
  cacheNeedsUpdate: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    }
  },
  cachedValue: {
    format: function format(val) {
      return val;
    },
    onChange: function onChange(_val, host) {
      host.cacheNeedsUpdate = false;
    }
  },
  disabled: {
    format: trueOrNull,
    onChange: function onChange(val, host) {
      setInputAttribute(host, 'disabled', val);
      addRemoveContainerClass(val, host, 'disabled');
    }
  },
  focused: {
    format: trueOrNull,
    onChange: function onChange(val, host) {
      addRemoveContainerClass(val, host, 'focused');
      host.setAttribute('focused', val ? val : 'false');
      host.processValue();
      dispatch_dispatch(host, 'focus', host);
    }
  },
  format: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(_val, host) {
      host.processValue();
    }
  },
  helptext: {
    format: stringOrEmpty,
    onChange: function onChange(val, host) {
      WhenAvailable(host, 'elements.help').then(function (el) {
        return el.innerHTML = ValidateHtml(val, [], ['script']).sanitized || '';
      }).catch(function () {});
    }
  },
  inputID: {
    format: stringOrEmpty,
    onChange: function onChange(_val, host) {
      setInputID(host);
    }
  },
  invalid: {
    format: function format(val) {
      return ToBool(val).value;
    },
    onChange: function onChange(val, host) {
      SetAttribute(host.elements.container, 'valid', val);
      addRemoveContainerClass(val, host, 'invalid');
      WhenAvailable(host, 'elements.error').then(function (el) {
        return el.innerHTML = ValidateHtml(host.validationMessage, [], ['script']).sanitized || '';
      }).catch(function () {});
      onInvalid(host);
    }
  },
  labelposition: {
    format: function format(val, host) {
      return Pipe(IndexOf(labelPositions), IfInvalid(getDefaultLabelPosition(host)))(val).value;
    },
    onChange: function onChange(val, host) {
      WhenAvailable(host, 'elements.container').then(function (container) {
        return SetAttribute(container, 'label-position', val);
      }).catch(function () {});
      WhenAvailable(host, 'labelelement').then(function (label) {
        return label.slot = ''.concat('label-', val, '');
      }).catch(function () {});
    }
  },
  label: {
    format: stringOrEmpty,
    onChange: function onChange(_val, host) {
      setLabel(host);
    }
  },
  matchinput: {
    format: function format(val) {
      return IsElement(val).valid ? val : undefined;
    }
  },
  name: {
    format: stringOrEmpty,
    onChange: function onChange(val, host) {
      return setInputAttribute(host, 'name', val);
    }
  },
  notempty: {
    format: function format(val) {
      return ToBool(val).value;
    },
    onChange: function onChange(val, host) {
      addRemoveContainerClass(val, SetAttribute(host, 'has-value', ''.concat(val)), 'notempty');
    }
  },
  readonly: {
    format: trueOrNull,
    onChange: function onChange(val, host) {
      setInputAttribute(host, 'readonly', val);
    }
  },
  ready: {
    format: trueOrNull,
    onChange: function onChange(val, host) {
      addRemoveContainerClass(val, host, 'ready');
    }
  },
  required: {
    format: trueOrNull,
    onChange: function onChange(val, host) {
      setInputAttribute(host, 'required', val);
      setInputAttribute(host, 'aria-required', val);
    }
  },
  tabindex: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(0))(val).value;
    },
    onChange: function onChange(val, host) {
      setInputAttribute(host, 'tabIndex', val);
    }
  },
  type: {
    format: function format(val, host) {
      return Pipe(IndexOf(supportedInputTypes), IfInvalid(defaultType(host)))(val).value;
    },
    onChange: function onChange(_val, host) {
      setInput(host);
    }
  },
  value: {
    format: function format(val, host) {
      return host.type === 'checkbox' || host.type === 'radio' ? ToBool(val).value : val;
    },
    onChange: function onChange(_val, host) {
      if (!host.eventSubscriptions) {
        host.eventSubscriptions = {};
      }

      if (!host.eventSubscriptions.valuecaching) {
        host.eventSubscriptions.valuecaching = host.state.value.subscribe(function () {
          host.cacheNeedsUpdate = true;
          host.cachedPreProcessValueNeedsUpdate = true;
        });
      }

      host.processValue();
      var val = host.value;
      dispatch_dispatch(host, 'inputchange', val);
      dispatch_dispatch(host, 'input', val);
    }
  }
};
var properties_observedAttributes = Object.keys(properties_properties);
// CONCATENATED MODULE: ./src/components/input-shared/processed-value.js








function isEmpty(value) {
  return value === '' || value === null || value === undefined;
}

function reduceReasons(target, current) {
  if (!!current && target.indexOf(current) === -1) {
    target.push(current);
  }

  return target;
}

function emptyValue() {
  return {
    original: '',
    sanitized: '',
    valid: true,
    reason: []
  };
}

function getValueMetadata(host, value) {
  if (typeof host.preProcessValue !== 'function') {
    var empty = isEmpty(value);
    return {
      original: value === undefined ? '' : value,
      sanitized: value === undefined ? '' : value,
      valid: empty ? true : host.validationMessage === '',
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
  var keysToSkip = ['valid', 'customError', 'message'];
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
      if (!host.cacheNeedsUpdate) {
        return host.cachedValue;
      }

      return getValueMetadata(host, Get(host, 'state.value.value'));
    }
  };
}
// CONCATENATED MODULE: ./src/utils/is-autofilled.js
function IsAutoFilled(input) {
  var nativeMatches = input.matches || input['msMatchesSelector'];

  try {
    return nativeMatches.call(input, ':-webkit-autofill');
  } catch (error) {
    try {
      return nativeMatches.call(input, ':-moz-autofill');
    } catch (error) {
      try {
        return nativeMatches.call(input, ':-ms-autofill');
      } catch (error) {
        try {
          return nativeMatches.call(input, ':-o-autofill');
        } catch (error) {
          try {
            return nativeMatches.call(input, ':autofill');
          } catch (error) {
            return false;
          }
        }
      }
    }
  }
}
// CONCATENATED MODULE: ./src/components/input-shared/process-value.js




var supportsInternals = 'ElementInternals' in window && 'setFormData' in window.ElementInternals;
function processValue(host) {
  return function processingValue() {
    return WhenAvailable(host, 'input').then(function (input) {
      var processed = host.processedValue;
      var sanitized = processed.sanitized;
      var autofilled = IsAutoFilled(input);
      var stringEmpty = (isNaN(sanitized) || typeof sanitized === 'string') && !sanitized.length;
      var empty = stringEmpty && !autofilled;
      var valid = !host.focused && empty ? true : processed.valid;
      var badFormat = Get(host, 'validity.badFormat');

      if (badFormat && processed.reason.length) {
        host.setCustomValidity(processed.reason.join(', '));
        host.invalid = true;
      }

      if (supportsInternals) {
        host.internals_.setFormValue(sanitized);
      }

      host.cachedValue = processed;

      if (typeof host.postProcessValue === 'function') {
        host.postProcessValue({
          input: input,
          valid: valid,
          sanitized: sanitized
        });
      }

      if (host.type === 'select') {
        if (host.emptyoption === 'false' || host.emptyoption === false || host.emptyoption === undefined) {
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
    }).catch(function () {});
  };
}
// CONCATENATED MODULE: ./src/components/input-shared/set-custom-validity.js

function setCustomValidity(host) {
  return function setCustomValidityMessage(error) {
    return WhenAvailable(host, 'input.setCustomValidity', true).then(function () {
      return host.input.setCustomValidity(error);
    }).catch(function () {});
  };
}
// CONCATENATED MODULE: ./src/components/input-shared/match-input-message.js


function matchInputMessage(host) {
  if (!host.matchinput) {
    return '';
  }

  if (host.value === Get(host, 'matchinput.value')) {
    return '';
  }

  var otherInput = host.matchinput;
  return ''.concat('Value does not match', otherInput.label || otherInput.placeholder || otherInput.name || '', '.');
}
// CONCATENATED MODULE: ./src/components/input-shared/validation-message.js


function validationMessage(host) {
  return {
    get: function get() {
      return Get(host, 'input.validationMessage', '', function (message) {
        return message ? message : matchInputMessage(host);
      });
    }
  };
}
// CONCATENATED MODULE: ./src/utils/validate-bool.js
function ValidateBool(val) {
  var original = val;
  var reasons = [];
  var result;

  if (val === true || val === 'on' || val === 'true') {
    result = true;
  }

  if (val === false || val === 'off' || val === 'false') {
    result = false;
  }

  if (result === undefined) {
    result = false;
    reasons.push('not valid');
  }

  return {
    original: original,
    valid: reasons.length === 0,
    sanitized: !!result,
    reason: reasons
  };
}
// CONCATENATED MODULE: ./src/components/input-shared/validity.js



function validity(host) {
  return {
    get: function get() {
      try {
        host.input.setCustomValidity('');
      } catch (error) {}

      return Get(host, 'input.validity', {}, function (values) {
        var value = host.value;
        var valueAsAstring = value !== undefined && value !== null ? ''.concat(value) : value;
        var inputValueAsString = ''.concat(GetInputValue(Get(host, 'input')));
        var notMatchingInput = matchInputMessage(host) !== '';
        var badFormat = valueAsAstring !== inputValueAsString;
        return {
          valueMissing: values.valueMissing,
          typeMismatch: values.typeMismatch,
          patternMismatch: values.patternMismatch,
          tooLong: values.tooLong,
          tooShort: values.tooShort,
          rangeUnderflow: values.rangeUnderflow,
          rangeOverflow: values.rangeOverflow,
          stepMismatch: values.stepMismatch,
          badInput: values.badInput,
          customError: values.customError,
          badFormat: badFormat,
          notMatchingInput: notMatchingInput,
          valid: values.valid && !badFormat && !notMatchingInput
        };
      });
    }
  };
}
// CONCATENATED MODULE: ./src/components/input-shared/check-validity.js

function checkValidity(host) {
  return Get(host, 'validity.valid');
}
// CONCATENATED MODULE: ./src/components/input-bool/index.js

























var input_bool_outerStyle = __webpack_require__(98).toString();

var input_bool_style = __webpack_require__(168).toString();

var input_bool_template = __webpack_require__(169);

var input_bool_componentName = 'input-bool';
var input_bool_componentRoot = ''.concat('.', input_bool_componentName, '-container');
var input_bool_elements = {
  container: {
    selector: '.input-field-container-inner'
  },
  count: {
    selector: '.input-field-character-count'
  },
  error: {
    selector: '.input-field-message-error'
  },
  help: {
    selector: '.input-field-message-help'
  },
  inputContainer: {
    selector: '.input-field-input-container-inner'
  },
  root: {
    selector: '.input-field-container'
  }
};
var inputProperties = Object.assign({}, properties_properties, {
  showicon: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    },
    onChange: function onChange(val, host) {
      WhenAvailable(host, 'elements.container').then(function containerReady(container) {
        container.setAttribute('showicon', val);
      }).catch(function () {});
    }
  }
});
var InputBool = ComponentConstructor({
  componentName: input_bool_componentName,
  componentRoot: input_bool_componentRoot,
  template: input_bool_template,
  style: input_bool_style,
  outerStyle: input_bool_outerStyle,
  observedAttributes: Object.keys(inputProperties),
  properties: inputProperties,
  elements: input_bool_elements,
  methods: {
    processValue: processValue,
    setCustomValidity: setCustomValidity,
    preProcessValue: function preProcessValue(host) {
      return function (value) {
        if (!host.cachedPreProcessValueNeedsUpdate) {
          return host.cachedPreProcessValue;
        }

        return ValidateBool(value);
      };
    },
    postProcessValue: function postProcessValue(host) {
      return function (results) {
        return Promise.all([WhenAvailable(host, 'elements.container').then(function (container) {
          return container.classList[results.sanitized ? 'add' : 'remove']('checked');
        }).catch(function () {}), WhenAvailable(host, 'input').then(function (input) {
          return input.checked = results.sanitized;
        }).catch(function () {})]);
      };
    },
    checkValidity: checkValidity
  },
  computed: {
    processedValue: processedValue,
    validationMessage: validationMessage,
    validity: validity
  },
  getters: {
    value: function value(host) {
      if (!host.cacheNeedsUpdate) {
        return host.cachedValue.sanitized;
      }

      return host.preProcessValue(Get(host, 'state.value.value', false)).sanitized;
    }
  },
  onConnected: function onConnected(host) {
    host.inputID = ID();
  },
  formElement: true
});
Components.addComponent(input_bool_componentName, InputBool);

// CONCATENATED MODULE: ./src/utils/validate-number.js

function ValidateNumber(num) {
  var original = num;
  var reasons = [];
  var formatted = ToNumber(num);

  if (!formatted.valid) {
    reasons.push('not a number');
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

  if (!val || !val.length || converted.type !== 'string') {
    return {
      original: original,
      valid: false,
      sanitized: val,
      reason: ['no value']
    };
  }

  var reasons = [];
  var split = val.split('@');

  if (!split[0] || !split[0].length) {
    reasons.push('missing username');
  }

  if (split.length < 2) {
    reasons.push('missing @ symbol');
    reasons.push('missing domain, i.e. "mail.com"');
  }

  if (split.length > 1) {
    var domain = split[1].split('.');

    if (!domain[0] || !domain[0].length || !domain[1] || !domain[1].length) {
      reasons.push('missing domain, i.e. "mail.com"');
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
  var converted = Pipe(ToString, FromEntities, IfInvalid(''))(val);
  var value = converted.value.replace(/[^\d]+/g, '').slice(0, 10);

  if (value.length < 10) {
    reason.push('needs at least 10 digits');
  }

  return {
    original: original,
    valid: reason.length === 0,
    sanitized: value,
    reason: reason
  };
}
// CONCATENATED MODULE: ./src/utils/validate-intl-phone.js







function ValidateIntlPhone(val) {
  var original = val;
  var reason = [];
  var converted = Pipe(ToString, FromEntities, IfInvalid(''))(val);
  var value = converted.value.replace(/[^\d]+/g, '').slice(0, 15);

  if (value.length < 11) {
    reason.push('needs at least 11 digits');
  }

  return {
    original: original,
    valid: reason.length === 0,
    sanitized: value,
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
      result: '',
      removed: match[0]
    };
    var first = matched.start !== 0 ? result.value.slice(0, matched.start) : '';
    var second = result.value.slice(matched.end);
    matched.result = ''.concat(first, second);
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

  if (result.type !== 'string') {
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
    var joinedValue = result.value[index] || '';

    while (index < result.value.length) {
      result.stringChanges.push({
        start: joinedValue.length,
        end: joinedValue.length + delimeter.length,
        input: result.value[index],
        length: delimeter.length,
        result: '',
        added: delimeter
      });
      joinedValue = ''.concat(joinedValue, delimeter, result.value[index]);
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
    result.valid = typeof result.value === 'string';
    return TMonadUpdate(result, 'string', 'Join');
  };
}
// CONCATENATED MODULE: ./src/utils/to-us-zip.js






function ToUsZip(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  var mapper = ToMap(function mapperInner(val, index) {
    if (index < 5 || index > 5 && index < 9) {
      return val;
    }

    if (index === 5) {
      return ''.concat('-', val);
    }

    return '';
  });
  result = Pipe(ToDigits, ToSplit(''), mapper, ToJoin(''))(result);
  result.valid = typeof result.value === 'string' && (result.value.length === 5 || result.value.length === 10);
  return result;
}
// CONCATENATED MODULE: ./src/utils/validate-us-zip.js

function ValidateUsZip(val) {
  var original = val;
  var reason = [];
  var result = ToUsZip(val);

  if (!result.valid) {
    if (result.value.length < 5) {
      reason.push('minimum of 5 digits');
    }

    if (result.value.length > 5 && result.value.length < 10) {
      reason.push('needs to be 5 or 9 digits');
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

  if (!str || str.length === 0 || converted.type !== 'string') {
    return {
      original: str,
      valid: false,
      sanitized: null,
      reason: ['no value']
    };
  }

  var reasons = [];
  var link = document.createElement('a');
  link.href = val;

  if (!link.protocol) {
    reasons.push('Missing url protocol');
  }

  if (!link.host) {
    reasons.push('Missing url host');
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

  if (!val || !val.length || converted.type !== 'string') {
    return {
      original: original,
      valid: false,
      sanitized: val,
      reason: reasons.concat(['no value'])
    };
  }

  var htmlResults = ValidateHtml(val);
  htmlResults.reason = htmlResults.reason.concat(reasons);
  return htmlResults;
}
// CONCATENATED MODULE: ./src/components/input-field/value-validation.js









function parseNoValue(validated) {
  if (validated && !validated.valid && validated.reason[0] === 'no value') {
    validated.reason.shift();
    validated.valid = true;
  }

  return validated;
}

function valueValidation(val, type, allowhtml, disallowhtml) {
  if (type === 'number' || type === 'month') {
    var validated = ValidateNumber(val);
    validated.sanitized = validated.sanitized === undefined || validated.sanitized === null || validated.sanitized === '' ? validated.sanitized : ''.concat(validated.sanitized);
    return parseNoValue(ValidateNumber(val));
  }

  if (type === 'email') {
    return parseNoValue(ValidateEmail(val));
  }

  if (type === 'tel' || type === 'usphone') {
    return parseNoValue(ValidateUsPhone(val));
  }

  if (type === 'intlphone') {
    return parseNoValue(ValidateIntlPhone(val));
  }

  if (type === 'uszip') {
    return parseNoValue(ValidateUsZip(val));
  }

  if (type === 'url') {
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
  var errorText = '';

  if (value === undefined || value === null) {
    return {
      value: value,
      valid: valid,
      errorText: errorText
    };
  }

  if (host.type === 'number') {
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
      errorText = ''.concat('Must be at least ', host.min, ' characters');
      valid = false;
    }
  }

  return {
    value: value,
    valid: valid,
    errorText: errorText
  };
}
// CONCATENATED MODULE: ./src/utils/match-all.js




function MatchAll(toSearchFor, toSearchIn) {
  function doSearch(search) {
    var matches = [];
    search.replace(ToRegex(toSearchFor).value, function (match) {
      matches.push([].slice.call(arguments, 0));
      return match;
    });
    return matches;
  }

  if (toSearchIn === undefined) {
    return function MatchAllInner(toSearchIn) {
      return doSearch(toSearchIn);
    };
  }

  return doSearch(toSearchIn);
}
// CONCATENATED MODULE: ./src/components/input-field/value-format.js












function valueFormat(pattern, value) {
  if (typeof value !== 'string' || !pattern) {
    return {
      valid: true,
      value: value
    };
  }

  if (pattern.indexOf('=>') > -1) {
    return {
      valid: true,
      value: Mapper(function (i) {
        var splits = i.split('=>');
        splits[0] = ToRegex(splits[0].trim()).value;
        return splits;
      }, pattern.split(',')).reduce(function (target, current) {
        return target.replace(current[0], function (match) {
          if (typeof match[current[1]] === 'function') {
            return match[current[1]]();
          }

          return current[1];
        });
      }, value)
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

  var result = MatchAll(regexp, value).map(function (v) {
    return v[0];
  }).join('');
  return {
    valid: result === value,
    value: result
  };
}
// CONCATENATED MODULE: ./src/components/input-field/index.js






























var input_field_outerStyle = __webpack_require__(98).toString();

var input_field_style = __webpack_require__(170).toString();

var input_field_template = __webpack_require__(171);

var input_field_componentName = 'input-field';
var input_field_componentRoot = ''.concat('.', input_field_componentName, '-container');

function input_field_preProcessValue(host) {
  return function (value) {
    if (!host.cachedPreProcessValueNeedsUpdate) {
      return host.cachedPreProcessValue;
    }

    var validated = valueValidation(value, host.type, host.allowhtml, host.disallowhtml);
    var formatParsed = valueFormat(host.format, validated.sanitized);
    var parsedValue = valueMaxMin(host, formatParsed.value);
    var data = {
      valid: validated.valid && parsedValue.valid && formatParsed.valid,
      reason: [!formatParsed.valid ? 'Value does not match pattern' : undefined, parsedValue.errorText].concat(validated.reason).filter(function (m) {
        return !!m;
      }),
      value: parsedValue.value,
      sanitized: parsedValue.value
    };
    host.cachedPreProcessValue = data;
    return data;
  };
}

function input_field_postProcessValue(host) {
  return function (results) {
    results.input.value = results.sanitized;
    host.count = host.type === 'number' ? results.sanitized : results.sanitized ? results.sanitized.length : 0;
  };
}

var input_field_properties = Object.assign({}, properties_properties, {
  pattern: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      WhenAvailable(host, 'input').then(function (input) {
        return SetAttribute(input, 'pattern', val);
      }).catch(function () {});
    }
  },
  cachedPreProcessValueNeedsUpdate: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(true))(val).value;
    }
  },
  cachedPreProcessValue: {
    format: function format(val) {
      return val;
    },
    onChange: function onChange(_val, host) {
      host.cachedPreProcessValueNeedsUpdate = false;
    }
  },
  resize: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid('none'))(val).value;
    },
    onChange: function onChange(val, host) {
      WhenAvailable(host, 'elements.inputContainer').then(function (inputContainer) {
        inputContainer.setAttribute('resize', val);
      }).catch(function () {});
    }
  },
  max: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(null))(val).value;
    },
    onChange: function onChange(val, host) {
      WhenAvailable(host, 'input').then(function (input) {
        if (host.type === 'number') {
          return SetAttribute(input, 'max', val);
        }

        return SetAttribute(input, 'maxlength', val);
      }).catch(function () {});
    }
  },
  min: {
    onChange: function onChange(val, host) {
      WhenAvailable(host, 'input').then(function (input) {
        if (host.type === 'number') {
          return SetAttribute(input, 'min', val);
        }

        return SetAttribute(input, 'minlength', val);
      }).catch(function () {});
    }
  }
});
var input_field_elements = {
  clearButton: {
    selector: '.input-field-clear'
    /** TODO needs to add back functionality */

  },
  container: {
    selector: '.input-field-container-inner'
  },
  count: {
    selector: '.input-field-character-count'
  },
  error: {
    selector: '.input-field-message-error'
  },
  help: {
    selector: '.input-field-message-help'
  },
  icon: {
    selector: '.input-field-icon',
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        click: ObserveEvent(el, 'click').subscribe(function () {
          DispatchEvent(host, 'iconclick', host);
        })
      };
    }
  },
  inputContainer: {
    selector: '.input-field-input-container-inner'
  },
  max: {
    selector: '.input-field-character-count-max'
  },
  root: {
    selector: '.input-field-container'
  }
};
var InputField = ComponentConstructor({
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
    validationMessage: validationMessage,
    validity: validity
  },
  getters: {
    value: function value(host) {
      if (!host.cacheNeedsUpdate) {
        return host.cachedValue.sanitized;
      }

      return host.preProcessValue(Get(host, 'state.value.value', '')).sanitized;
    }
  },
  onConnected: function onConnected(host) {
    host.inputID = ID();
  },
  formElement: true
});
Components.addComponent(input_field_componentName, InputField);

// CONCATENATED MODULE: ./src/components/input-select/index.js












function input_select_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { input_select_typeof = function _typeof(obj) { return typeof obj; }; } else { input_select_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return input_select_typeof(obj); }




















var input_select_outerStyle = __webpack_require__(98).toString();

var input_select_style = __webpack_require__(172).toString();

var input_select_template = __webpack_require__(173);

var input_select_componentName = 'input-select';
var input_select_componentRoot = ''.concat('.', input_select_componentName, '-container');

function input_select_postProcessValue() {
  return function (results) {
    return results.input.value = results.sanitized;
  };
}

var input_select_properties = Object.assign({}, properties_properties, {
  options: {
    format: function format(val) {
      return Pipe(CommasToArray, IfInvalid([]), ToMap(function (option) {
        if (input_select_typeof(option) !== 'object') {
          option = {
            value: option,
            label: option
          };
        }

        if (!Object.prototype.hasOwnProperty.call(option, 'value')) {
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
    selector: '.input-field-arrow',
    onChange: function onChange(el) {
      el.svg = iconTriangle;
    }
  },
  container: {
    selector: '.input-field-container-inner'
  },
  error: {
    selector: '.input-field-message-error'
  },
  help: {
    selector: '.input-field-message-help'
  },
  inputContainer: {
    selector: '.input-field-input-container-inner'
  },
  root: {
    selector: '.input-field-container'
  }
};
var InputSelect = ComponentConstructor({
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
    validationMessage: validationMessage,
    validity: validity,
    selectedIndex: function selectedIndex(host) {
      return {
        get: function get() {
          return Get(host, 'input.selectedIndex', 0);
        }
      };
    },
    selectedOptions: function selectedOptions(host) {
      return {
        get: function get() {
          return Array.from(Get(host, 'input.selectedOptions', []));
        }
      };
    },
    optionElements: function optionElements(host) {
      return {
        get: function get() {
          return Array.from(Get(host, 'input.options', []));
        }
      };
    }
  },
  getters: {
    value: function value(host) {
      return Get(host, 'state.value.value', '');
    }
  },
  onConnected: function onConnected(host) {
    host.inputID = ID();
    host.processValue();
  },
  formElement: true
});
Components.addComponent(input_select_componentName, InputSelect);

// CONCATENATED MODULE: ./src/components/spinner-element/index.js











var spinner_element_style = __webpack_require__(174).toString();

var spinner_element_outerStyle = __webpack_require__(175).toString();

var spinner_element_template = __webpack_require__(176);

var spinner_element_componentName = 'spinner-element';
var spinner_element_componentRoot = ''.concat('.', spinner_element_componentName, '-container');

function doAllTheThings(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute('type', host.type);
  setRootClass(host, host.page, 'fullpage');
  setRootClass(host, host.scrim, 'showscrim');
  setType(host);
  setScrimColor(host);
  setScrimOpacity(host);
  setBlur(host);
}

function setRootClass(host, condition, clss) {
  OnNextFrame(function () {
    var root = host.elements.root;

    if (!root) {
      return;
    }

    root.classList[condition ? 'add' : 'remove'](clss);
  });
}

function setType(host) {
  OnNextFrame(function () {
    var root = host.elements.root;

    if (!root) {
      return;
    }

    root.setAttribute('type', host.type);
  });
}

function setBlur(host) {
  OnNextFrame(function () {
    var scrim = host.elements.scrim;

    if (!scrim) {
      return;
    }

    scrim.style.backdropFilter = ''.concat('blur(', host.blur, 'px)');
  });
}

function setScrimColor(host) {
  OnNextFrame(function () {
    var scrim = host.elements.scrim;

    if (!scrim) {
      return;
    }

    scrim.style.background = host.scrimcolor;
  });
}

function setScrimOpacity(host) {
  OnNextFrame(function () {
    var scrim = host.elements.scrim;

    if (!scrim) {
      return;
    }

    if (host.scrim) {
      return scrim.style.opacity = host.scrimopacity;
    }

    scrim.style.opacity = 0;
  });
}

function toggleVisibility(host) {
  return OnNextFrame(function () {
    return host.elements.root.classList[host.visible ? 'add' : 'remove']('shown');
  });
}

function onChangeDoThings(_el, host) {
  return doAllTheThings(host);
}

var spinner_element_elements = {
  root: {
    selector: spinner_element_componentRoot,
    onChange: onChangeDoThings
  },
  scrim: {
    selector: '.spinner-element-scrim',
    onChange: onChangeDoThings
  },
  inner: {
    selector: '.spinner-element-inner'
  },
  slot: {
    selector: 'slot'
  }
};
var spinner_element_properties = {
  visible: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(_val, host) {
      toggleVisibility(host);
    }
  },
  page: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: onChangeDoThings
  },
  scrim: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: onChangeDoThings
  },
  blur: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(0))(val).value;
    },
    onChange: onChangeDoThings
  },
  scrimopacity: {
    format: function format(val) {
      return Pipe(ToNumber, IfInvalid(1))(val).value;
    },
    onChange: onChangeDoThings
  },
  type: {
    format: function format(val) {
      return typeof val === 'string' ? val : 'column';
    },
    onChange: onChangeDoThings
  }
};
var SpinnerElement = ComponentConstructor({
  componentName: spinner_element_componentName,
  componentRoot: spinner_element_componentRoot,
  template: spinner_element_template,
  style: spinner_element_style,
  outerStyle: spinner_element_outerStyle,
  observedAttributes: Object.keys(spinner_element_properties),
  properties: spinner_element_properties,
  elements: spinner_element_elements
});
Components.addComponent(spinner_element_componentName, SpinnerElement);

// CONCATENATED MODULE: ./src/utils/event-name.js
var event_name_events = {
  transitionend: {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    msTransition: 'msTransitionEnd'
  },
  transitionstart: {
    transition: 'transitionstart',
    OTransition: 'oTransitionStart',
    MozTransition: 'transitionstart',
    WebkitTransition: 'webkitTransitionStart',
    msTransition: 'msTransitionStart'
  }
};
var event_name_el = document.createElement('fake-element');
function EventName(key) {
  if (!event_name_events[key]) {
    return '';
  }

  var e;

  for (e in event_name_events[key]) {
    if (event_name_el.style[e] !== undefined) {
      return event_name_events[key][e];
    }
  }

  return '';
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



















var snack_bar_style = __webpack_require__(177).toString();

var snack_bar_outerStyle = __webpack_require__(178).toString();

var snack_bar_template = __webpack_require__(179);

var snack_bar_componentName = 'snack-bar';
var snack_bar_componentRoot = ''.concat('.', snack_bar_componentName, '-container');

function setShown(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  var endEventName = EventName('transitionend');

  function dispatch() {
    return DispatchEvent(host, host.shown ? 'opened' : 'closed', host);
  }

  if (endEventName) {
    root.addEventListener(endEventName, function startEvent() {
      root.removeEventListener(endEventName, startEvent);
      OnNextFrame(dispatch);
    });
  } else {
    OnNextFrame(dispatch);
  }

  root.classList[host.shown ? 'add' : 'remove']('shown');
}

function setAlign(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute('align', host.align);
}

function snack_bar_setType(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute('type', host.type);
}

function setIcon(host, key) {
  WhenAvailable(host, 'elements.' + key).then(function (icon) {
    if (!icon) {
      return;
    }

    icon[host[key][0] === '<' ? 'svg' : 'type'] = host[key];
  }).catch(function () {});
}

function showHideClose(el, show) {
  if (!el) {
    return;
  }

  el.classList[show ? 'remove' : 'add']('hide-close-btn');
}

var snack_bar_properties = {
  shown: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(_val, host) {
      OnNextFrame(function () {
        setShown(host);
      });
    }
  },
  align: {
    format: function format(val) {
      return Pipe(ToString, IndexOf(['top', 'bottom', 'none']), IfInvalid('bottom'))(val).value;
    },
    onChange: function onChange(_val, host) {
      OnNextFrame(function () {
        setAlign(host);
      });
    }
  },
  type: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(''))(val).value;
    },
    onChange: function onChange(_val, host) {
      OnNextFrame(function () {
        snack_bar_setType(host);
      });
    }
  },
  infoicon: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(iconInfo), IfEmpty(iconInfo))(val).value;
    },
    onChange: function onChange(_val, host) {
      OnNextFrame(function () {
        setIcon(host, 'infoicon');
      });
    }
  },
  successicon: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(iconCheck), IfEmpty(iconCheck))(val).value;
    },
    onChange: function onChange(_val, host) {
      OnNextFrame(function () {
        setIcon(host, 'successicon');
      });
    }
  },
  erroricon: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(iconError), IfEmpty(iconError))(val).value;
    },
    onChange: function onChange(_val, host) {
      OnNextFrame(function () {
        setIcon(host, 'erroricon');
      });
    }
  },
  warningicon: {
    format: function format(val) {
      return Pipe(ToString, IfInvalid(iconWarning), IfEmpty(iconWarning))(val).value;
    },
    onChange: function onChange(_val, host) {
      OnNextFrame(function () {
        setIcon(host, 'warningicon');
      });
    }
  },
  hideclose: {
    format: function format(val) {
      return Pipe(ToBool, IfInvalid(false))(val).value;
    },
    onChange: function onChange(val, host) {
      OnNextFrame(function () {
        showHideClose(host.elements.root, !val);
      });
    }
  }
};
var snack_bar_observedAttributes = Object.keys(snack_bar_properties);
var snack_bar_elements = {
  root: {
    selector: snack_bar_componentRoot,
    onChange: function onChange(_el, host) {
      return OnNextFrame(function () {
        setAlign(host);
        setShown(host);
      });
    }
  },
  button: {
    selector: '.snack-bar-close',
    onChange: function onChange(el, host) {
      OnNextFrame(function () {
        el.eventListeners = {
          click: ObserveEvent(el, 'click').subscribe(function () {
            host.shown = false;
          })
        };
        showHideClose(host.elements.root, !host.hideclose);
      });
    }
  },
  infoicon: {
    selector: '.infoicon',
    onChange: function onChange(_el, host) {
      OnNextFrame(function () {
        setIcon(host, 'infoicon');
      });
    }
  },
  successicon: {
    selector: '.successicon',
    onChange: function onChange(_el, host) {
      OnNextFrame(function () {
        setIcon(host, 'successicon');
      });
    }
  },
  erroricon: {
    selector: '.erroricon',
    onChange: function onChange(_el, host) {
      OnNextFrame(function () {
        setIcon(host, 'erroricon');
      });
    }
  },
  warningicon: {
    selector: '.warningicon',
    onChange: function onChange(_el, host) {
      OnNextFrame(function () {
        setIcon(host, 'warningicon');
      });
    }
  },
  closeIcon: {
    selector: ''.concat('.', snack_bar_componentName, '-close-icon'),
    onChange: function onChange(el) {
      el.svg = iconClose;
    }
  }
};
var SnackBar = ComponentConstructor({
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
        ForEach(function slottedRemove(slot) {
          host.slotted$.remove(slot);

          try {
            slot.parentElement.removeChild(slot);
          } catch (error) {}
        }, host.slotted$.value, true);
      };
    }
  }
});
Components.addComponent(snack_bar_componentName, SnackBar);

// CONCATENATED MODULE: ./src/services/benches.js





var programs = {};
var Benches = {
  add: function add(key) {
    if (programs[key]) {
      return programs[key];
    }

    var now = performance.now();
    var programObject = {
      started: now,
      ended: now,
      time: 0,
      end: function end() {
        programObject.ended = performance.now();
        programObject.time = programObject.ended - programObject.started;
        return programObject;
      }
    };

    if (programs[key]) {
      return programs[key];
    }

    programs[key] = programObject;
    return programObject;
  },
  end: function end(key) {
    if (programs[key]) {
      programs[key].end();
      return programs[key];
    }
  },
  report: function report() {
    Object.keys(programs).forEach(function (programKey) {
      console.log(programKey, 'Started: ' + programs[programKey].started, 'Duration: ' + programs[programKey].time + 'ms');
    });
  },
  average: function average() {
    var keys = Object.keys(programs).filter(function (k) {
      return programs[k].time !== 0;
    });
    console.log('Average time:', keys.reduce(function (target, programKey) {
      return target + programs[programKey].time;
    }, 0) / keys.length, 'Total:', keys.length);
  }
};
Object.defineProperty(Benches, 'programs', {
  get: function get() {
    return programs;
  }
});
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
// CONCATENATED MODULE: ./src/services/componentStore.js







function getTag(element) {
  return Get(element, 'tagName', '').toLowerCase();
}

var ComponentStore = function ComponentStoreIFEE() {
  var componentStore = {
    components: {},
    themes: {},
    theme: function theme(_theme, element) {
      return Object.keys(_theme).forEach(function (property) {
        element[property] = _theme[property];
      });
    },
    addComponent: function addComponent(element) {
      var tag = getTag(element);

      if (tag === '') {
        return;
      }

      if (!componentStore.components[tag]) {
        componentStore.components[tag] = [];
      }

      componentStore.components[tag].push(element);
      componentStore.triggerTagSubscriptions(tag, element);

      if (componentStore.themes[tag]) {
        Object.keys(componentStore.themes[tag]).forEach(function (property) {
          element[property] = componentStore.themes[tag][property];
        });
      }
    },
    removeComponent: function removeComponent(element) {
      var tag = getTag(element);

      if (tag === '' || !componentStore.components[tag]) {
        return;
      }

      var index = componentStore.components[tag].indexOf(element);

      if (index === -1) {
        return;
      }

      componentStore.components[tag].splice(index, 1);
    },
    addTheme: function addTheme(tag, theme) {
      componentStore.themes[tag] = theme;

      if (!componentStore.components[tag]) {
        return;
      }

      componentStore.components[tag].forEach(function (element) {
        componentStore.theme(componentStore.themes[tag], element);
      });
    },
    tagSubscriptions: {},
    triggerTagSubscriptions: function triggerTagSubscriptions(tag, data) {
      if (!componentStore.tagSubscriptions[tag]) {
        return;
      }

      componentStore.tagSubscriptions[tag].forEach(function (sub) {
        sub(data);
      });
    },
    watchForTag: function watchForTag(tag, cb) {
      if (!componentStore.tagSubscriptions[tag]) {
        componentStore.tagSubscriptions[tag] = [];
      }

      componentStore.tagSubscriptions[tag].push(cb);
      return function () {
        if (!componentStore.tagSubscriptions[tag]) {
          return;
        }

        var indexToRemove;
        var i = componentStore.tagSubscriptions[tag].length;

        while (indexToRemove === undefined && i) {
          i = i - 1;

          if (componentStore.tagSubscriptions[tag][i] === cb) {
            indexToRemove = i;
          }
        }

        componentStore.tagSubscriptions[tag].splice(indexToRemove, 1);
      };
    }
  };
  return componentStore;
}();
// CONCATENATED MODULE: ./src/services/dragDrop.js






function DragDropService(element) {
  var draggables = [];
  var htmlElement = document.firstElementChild;

  function filterElements(elements) {
    return elements.filter(function (el) {
      return !!el.parentNode;
    });
  }

  function handleDataTransfer(dataTransfer) {
    return DispatchEvent(element, 'dropped', dataTransfer);
  }

  function setUserSelect(remove) {
    if (!remove) {
      htmlElement.style.userSelect = 'none';
    } else {
      htmlElement.style.removeProperty('user-select');
    }
  }

  function startDrag(e) {
    var target = e.target;

    if (target && target.getAttribute('draggable') === 'false') {
      return;
    }

    e.preventDefault();
    setUserSelect();
    DispatchEvent(element, 'dragstarted');
  }

  function drop(e) {
    e.preventDefault();
    element.classList.remove('dragging');
    element.classList.remove('dragover');
    setUserSelect(true);
    handleDataTransfer(e.dataTransfer || e.originalEvent.dataTransfer);
  }

  function dragover(e) {
    e.preventDefault();
    element.classList.add('dragover');
  }

  function dragleave(e) {
    e.preventDefault();
    element.classList.remove('dragover');
  }

  function dragend(e) {
    e.preventDefault();
    element.classList.remove('dragging');
    element.classList.remove('dragover');
    setUserSelect(true);
    DispatchEvent(element, 'dragended');
  }

  element.addEventListener('dragstart', startDrag);
  element.addEventListener('dragover', dragover);
  element.addEventListener('drop', drop);
  element.addEventListener('dragleave', dragleave);
  element.addEventListener('dragend', dragend);
  var methods = {
    destroy: function destroy() {
      element.removeEventListener('dragstart', startDrag);
      element.removeEventListener('dragover', dragover);
      element.removeEventListener('drop', drop);
      element.removeEventListener('dragleave', dragleave);
      element.removeEventListener('dragend', dragleave);
      var isDragging = element.classList.contains('dragging');

      if (isDragging) {
        element.classList.remove('dragging');
        document.body.classList.remove('dragging-elements');
      }
    }
  };
  Object.defineProperties(methods, {
    draggables: {
      get: function get() {
        return filterElements(draggables);
      },
      set: function set(elements) {
        draggables = [];
        filterElements(Array.from(elements)).forEach(function (d) {
          draggables.push(d);
        });
      }
    },
    dropZone: {
      get: function get() {
        return element;
      }
    }
  });
  return methods;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__(132);

// CONCATENATED MODULE: ./src/utils/to-json.js


function ToJSON(value) {
  var result = from_json(value);

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
















function observe_worker_emptyFn() {}

function ObserveWorker(func) {
  var value;
  var previous;
  var worker;
  var functionString = ToString(func).value;
  var subscriptions = {};
  var firstBracket = functionString.indexOf('{');
  var beginingSlice = functionString.slice(firstBracket);
  var pendingSubscriptions = [];
  functionString = ''.concat('function webworker()', beginingSlice, 'webworker()');

  function loop(method, data, subs) {
    function loopInner(key) {
      return Get(subs, ''.concat(key, '.', method), observe_worker_emptyFn())(data);
    }

    return Object.keys(subs).forEach(loopInner);
  }

  function shutDown() {
    if (worker) {
      worker.terminate();
    }

    worker = undefined;
    return false;
  }

  function startUp() {
    if (worker) {
      return;
    }

    var blob;

    try {
      blob = window.URL.createObjectURL(new Blob([functionString], {
        type: 'application/javascript'
      }));
    } catch (error) {}

    if (!blob) {
      return;
    }

    worker = new Worker(blob);

    worker.onmessage = function onmessageFn(e) {
      previous = value;
      value = e.data;
      return loop('next', value, subscriptions);
    };

    worker.onerror = function onerrorFn(e) {
      return loop('error', e.message, subscriptions);
    };

    return worker;
  }

  function noShutdown(subs) {
    return Object.keys(subs).length === 0 ? shutDown() : true;
  }

  function unSubscribe(subscriberId) {
    return function unSubscribeInner() {
      subscriptions[subscriberId] = null;
      delete subscriptions[subscriberId];
      noShutdown(subscriptions);
    };
  }

  function completeAll(subs) {
    function completeAllEach(key) {
      subs[key].complete();
      unSubscribe(key);
    }

    return Object.keys(subs).forEach(completeAllEach);
  }

  var methods = {
    dispose: function dispose() {
      completeAll(subscriptions);
    },
    post: function post(msg) {
      var index = pendingSubscriptions.length;
      return new Promise(function postPromise(resolve, reject) {
        function res(e) {
          pendingSubscriptions[index]();
          return resolve(e);
        }

        function rej(e) {
          pendingSubscriptions[index]();
          return reject(e);
        }

        pendingSubscriptions.push(methods.subscribe(res, rej, rej));
        worker.postMessage(ToJSON(msg).value);
      });
    },
    subscribe: function subscribe(next, error, complete) {
      error = error ? error : observe_worker_emptyFn;
      complete = complete ? complete : observe_worker_emptyFn;

      if (typeof next !== 'function') {
        return;
      }

      var subscriber = {
        next: next,
        error: error,
        complete: complete,
        id: ID()
      };
      subscriptions[subscriber.id] = subscriber;

      if (typeof subscriptions[subscriber.id].error !== 'function') {
        subscriptions[subscriber.id].error = unSubscribe(subscriber.id);
      }

      if (typeof subscriptions[subscriber.id].complete !== 'function') {
        subscriptions[subscriber.id].complete = unSubscribe(subscriber.id);
      }

      startUp();
      return unSubscribe(subscriber.id);
    }
  };
  Object.defineProperties(methods, {
    value: {
      get: function get() {
        return value;
      }
    },
    previous: {
      get: function get() {
        return previous;
      }
    },
    functionString: {
      get: function get() {
        return functionString;
      }
    },
    subscriptions: {
      get: function get() {
        return subscriptions;
      }
    },
    pending: {
      get: function get() {
        return pendingSubscriptions;
      }
    }
  });
  return methods;
}
// CONCATENATED MODULE: ./src/services/request.js










function Request(apiBase) {
  return function (reqData) {
    reqData = reqData ? reqData : {};
    var base = apiBase;
    var path = ''.concat(base, ''.concat('/', reqData.path || '').split('//').join('/'));
    var REQ = Object.assign({}, {
      data: undefined,
      headers: {},
      method: 'POST'
    }, reqData, {
      path: path
    });
    var isFormData = REQ.data instanceof FormData;

    if (!isFormData && REQ.data && typeof REQ.data !== 'string') {
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

    return new Promise(function RequestPromise(resolve, reject) {
      var workerSubscription;
      var worker$ = ObserveWorker(function () {
        self.onmessage = function (e) {
          var xhr = new XMLHttpRequest();
          var data = JSON.parse(e.data);
          var formData = data.data;
          var form = new FormData();

          function formDataKeysEach(key) {
            return form.append(key, formData[key]);
          }

          function onloadFn() {
            postMessage({
              status: xhr.status,
              response: xhr.responseText || xhr.statusText
            });
          }

          function onerrorFn() {
            postMessage({
              status: xhr.status,
              response: xhr.statusText
            });
          }

          function headersEach(key) {
            xhr.setRequestHeader(key, data.headers[key]);
          }

          if (data.toForm) {
            Object.keys(formData).forEach(formDataKeysEach);
            formData = form;
          }

          xhr.open(data.method, data.path, false);
          Object.keys(data.headers).forEach(headersEach);
          xhr.onload = onloadFn;
          xhr.onerror = onerrorFn;
          xhr.send(data.data);
        };
      });

      function workerSub(e) {
        workerSubscription();
        var res = e.response;

        try {
          res = JSON.parse(res);
        } catch (error) {}

        if (e.status === 200) {
          return resolve(res);
        } else {
          return reject(e);
        }
      }

      function workerError(e) {
        workerSubscription();
        reject(e);
      }

      workerSubscription = worker$.subscribe(workerSub, workerError);
      worker$.post(REQ);
    });
  };
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__(99);

// CONCATENATED MODULE: ./src/services/router/invalid-query.js



function invalidQuery(searchString) {
  return !searchString || typeof searchString.split !== 'function' || searchString === '';
}

/* harmony default export */ var invalid_query = (invalidQuery);
// CONCATENATED MODULE: ./src/services/router/get-query.js








function getQuery(url) {
  var result = {};
  var searchString = !!url && typeof url === 'string' ? url.slice() : undefined;

  if (!!url && typeof url.search === 'string') {
    searchString = url.search;
  }

  if (invalid_query(searchString)) {
    return result;
  }

  var queryString = searchString.split('?')[1];

  if (invalid_query(queryString)) {
    return result;
  }

  function queryEach(v) {
    if (!v || typeof v.split !== 'function') {
      return;
    }

    result[v.split('=')[0]] = v.split('=')[1];
  }

  queryString.split('&').forEach(queryEach);
  return result;
}

/* harmony default export */ var get_query = (getQuery);
// CONCATENATED MODULE: ./src/services/router/query-object-to-string.js






function queryObjectToString(query) {
  query = query ? query : {};

  if (!Object.keys(query).length) {
    return '';
  }

  var queries = Object.keys(query).map(function (q) {
    return IsEmpty(query[q]) ? false : ''.concat(q, '=', query[q]);
  }).filter(function (v) {
    return !!v;
  }).join('&');

  if (queries) {
    return ''.concat('?', queries);
  }

  return '';
}

/* harmony default export */ var query_object_to_string = (queryObjectToString);
// CONCATENATED MODULE: ./src/services/router/parse-url.js





function parseUrl(url) {
  var validated = typeof url === 'string' ? ValidateHtml(url.split('?')[0]).sanitized // prevent XSS
  : url.pathname ? ValidateHtml(url.pathname).sanitized // prevent XSS
  : '';
  return validated.length > 1 && validated[validated.length - 1] === '/' ? validated.slice(0, validated.length - 1) : validated;
}

/* harmony default export */ var parse_url = (parseUrl);
// CONCATENATED MODULE: ./src/services/router/get-route-by-path.js






function get_route_by_path_getRouteByPath(routes) {
  return function getRouteByPathInner(path) {
    path = parse_url(typeof path === 'string' ? path.toLowerCase() : path);
    var r;
    var i = 0;
    var keys = Object.keys(routes || {});
    var urlParts = typeof path === 'string' ? path.split('/') : [];

    while (i < keys.length && !r) {
      if (routes[keys[i]].pathname === path) {
        return routes[keys[i]];
      }

      if (routes[keys[i]].pathname.indexOf('/*') > -1) {
        var pathParts = routes[keys[i]].pathname.split('/');

        if (pathParts.length > urlParts.length) {
          if (pathParts[urlParts.length - 1] !== '**') {
            i = i + 1;
            continue;
          }
        }

        if (pathParts.length < urlParts.length) {
          if (pathParts[pathParts.length - 1] !== '**') {
            i = i + 1;
            continue;
          }
        }

        var match = false;
        var partsIndex = 0;

        while (partsIndex < pathParts.length) {
          if (urlParts[partsIndex] !== pathParts[partsIndex] && pathParts[partsIndex].indexOf('*') === -1) {
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
}

/* harmony default export */ var get_route_by_path = (get_route_by_path_getRouteByPath);
// CONCATENATED MODULE: ./src/services/router/click-listener.js







function findParentLink(parent) {
  var link;

  try {
    while (!link && parent && parent !== document.body) {
      if (Get(parent, 'tagName').toLowerCase() === 'a') {
        link = parent;
      }

      parent = parent.parentNode;
    }
  } catch (error) {}

  return link;
}

function clickListener(methods) {
  document.documentElement.addEventListener('click', function clickHandler(e) {
    var target = e.target;
    var tag = target.tagName.toLowerCase();
    var link;

    if (tag === 'a') {
      link = target;
    }

    if (!link && Array.isArray(e.path)) {
      var pathIndex = 0;

      while (!link && pathIndex < e.path.length) {
        if (Get(e, ''.concat('path.', pathIndex, '.tagName'), '').toLowerCase() === 'a' && !!Get(e, ''.concat('path.', pathIndex, '.href'))) {
          link = Get(e, ''.concat('path.', pathIndex));
        }

        pathIndex = pathIndex + 1;
      }
    } // Safari


    if (!link && e.composedPath && typeof e.composedPath === 'function') {
      var ePath = e.composedPath();
      var _pathIndex = 0;

      while (!link && _pathIndex < ePath.length) {
        if (Get(ePath, ''.concat(_pathIndex, '.tagName'), '').toLowerCase() === 'a' && !!Get(ePath, ''.concat(_pathIndex, '.href'))) {
          link = ePath[_pathIndex];
        }

        _pathIndex = _pathIndex + 1;
      }
    } // FF and IE


    if (!link && e.originalTarget) {
      link = findParentLink(e.originalTarget);
    }

    if (!link && e.explicitOriginalTarget) {
      link = findParentLink(e.explicitOriginalTarget);
    }

    if (!link) {
      link = findParentLink(e.parentNode);
    }

    if (!link || link.getAttribute('target') === '_blank') {
      return;
    }

    try {
      var url = new URL(link.href);

      if (url.host !== location.host) {
        return;
      }

      if (methods.route(url)) {
        e.preventDefault();
      }
    } catch (error) {}
  }, true);
}

/* harmony default export */ var click_listener = (clickListener);
// CONCATENATED MODULE: ./src/services/router/pop-state-listener.js



function popStateListener(methods) {
  window.addEventListener('popstate', function popstateHandler() {
    methods.route(''.concat(location.pathname, location.search), true);
  }, false);
}

/* harmony default export */ var pop_state_listener = (popStateListener);
// CONCATENATED MODULE: ./src/services/router/get-route.js



function getRoute(routes, url) {
  return get_route_by_path(routes)(parse_url(url));
}

/* harmony default export */ var get_route = (getRoute);
// CONCATENATED MODULE: ./src/services/router/update-state.js


function addLeadingSlash(pathname) {
  return !pathname ? '' : pathname[0] === '/' ? pathname : ''.concat('/', pathname);
}

function joinUrl(pathname, query) {
  return ''.concat(location.protocol, '//', location.host, addLeadingSlash(pathname), query_object_to_string(query));
}

function UpdateState(methods, replace, force) {
  if (!methods.current) {
    return;
  }

  var lastQuery = query_object_to_string(methods.lastState.query);
  var currentQuery = query_object_to_string(methods.current.query);
  var full = joinUrl(methods.current.pathname, methods.current.query);
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
}

/* harmony default export */ var update_state = (UpdateState);
// CONCATENATED MODULE: ./src/services/router/handle-route.js












function handleRoute(methods, url, replace, force) {
  replace = replace ? true : false;
  force = force ? true : false;
  var parsedUrl = parse_url(url).toLowerCase();
  var route = get_route(methods.routes, url);

  if (!route) {
    return replace ? false : methods.route('/');
  }

  if (route.title) {
    document.title = route.title;
  }

  var currentPath = Get(methods.current, 'pathname');
  var routePath = Get(route, 'pathname');
  var currentQuery = query_object_to_string(Get(methods.current, 'query', {}));
  var query = get_query(url);

  if (route.allowedQueries && Array.isArray(route.allowedQueries)) {
    if (route.allowedQueries.length === 0) {
      query = {};
    }

    var allowed = {};
    Object.keys(query).forEach(function queryForEach(queryKey) {
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
}

/* harmony default export */ var handle_route = (handleRoute);
// CONCATENATED MODULE: ./src/services/router/index.js















function getBaseUrl() {
  return ''.concat(location.protocol, '//', location.host, location.port ? ':' + location.port : '');
}

function Router(routes) {
  var _routes = Object.assign({}, routes);

  var getRouteByPath = get_route_by_path(_routes); // internal state

  var lastState = {};
  var current = Object.assign({}, {
    path: location.pathname,
    query: get_query(location.search),
    base: getBaseUrl()
  }, getRouteByPath(location.pathname));
  var initialPath = ''.concat(location.pathname, location.search);
  var initialRoute = Object.assign({}, get_route(_routes, initialPath), current);
  var methods = {
    getRouteByPath: getRouteByPath,
    getQuery: get_query,
    queryObjectToString: query_object_to_string,
    routes: _routes,
    has: function has(url) {
      return !!get_route(_routes, url);
    },
    route: function route(url, force) {
      return handle_route(methods, url, false, force);
    },
    replaceRoute: function replaceRoute(url, force) {
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
        if (typeof query === 'string') {
          methods.current.query[query] = undefined;
          delete methods.current.query[query];
        } else if (Array.isArray(query)) {
          query.forEach(function queryEach(key) {
            methods.current.query[key] = undefined;
            delete methods.current.query[key];
          });
        }
      }

      update_state(methods, true, true);
    }
  };
  Object.defineProperties(methods, {
    current: {
      get: function get() {
        return Object.assign({}, current || {}, {
          path: location.pathname,
          base: getBaseUrl()
        });
      },
      set: function set(cur) {
        current = cur;
      }
    },
    lastState: {
      get: function get() {
        return lastState;
      },
      set: function set(l) {
        lastState = l;
      }
    }
  });
  click_listener(methods);
  pop_state_listener(methods);
  return methods;
}
// CONCATENATED MODULE: ./src/services/timer.js







var timer_subscriptions = {};
var timer_isRunning = false;

function removeSubscription(subscription) {
  if (!subscription || !subscription.id) {
    return;
  }

  var id = subscription.id;

  if (!timer_subscriptions[id] || timer_subscriptions[id].resolved) {
    return;
  }

  timer_subscriptions[id].resolved = true;
  timer_subscriptions[id].resolve();
  OnNextFrame(function removeSubscriptionNext() {
    timer_subscriptions[id] = null;
    delete timer_subscriptions[id];
  });
}

function timer_loop() {
  timer_isRunning = true;
  var subscriptionKeys = Object.keys(timer_subscriptions);

  if (!subscriptionKeys.length) {
    timer_isRunning = false;
    return;
  }

  function subscriptionKeysEach(key) {
    if (!timer_subscriptions[key] || timer_subscriptions[key].resolved) {
      return;
    }

    var subscription = timer_subscriptions[key];
    var index = new Date().getTime() - subscription.started;

    function subStep() {
      return subscription.stepFn(subscription.frameValues[subscription.frameValues.length - 1]);
    }

    function subStepEnd() {
      return subscription.stepFn(subscription.frameValues[index]);
    }

    function subRemove() {
      return removeSubscription(subscription);
    }

    if (index >= subscription.frameValues.length) {
      subscription.end = index;
      OnNextFrame(subStep);
      OnNextFrame(subRemove);
    } else {
      OnNextFrame(subStepEnd);
    }
  }

  subscriptionKeys.forEach(subscriptionKeysEach);
  OnNextFrame(timer_loop);
}

var Timer = function TimerIFEE() {
  return function TimerInner(stepFn, frameValues) {
    if (!Array.isArray(frameValues) || frameValues.length === 0) {
      return;
    }

    if (typeof stepFn !== 'function') {
      return;
    }

    var id = ID();
    var resolve, reject;
    var promise = new Promise(function onNextPromise(res, rej) {
      resolve = res;
      reject = rej;
    });
    timer_subscriptions[id] = {
      id: id,
      stepFn: stepFn,
      frameValues: frameValues,
      resolved: false,
      started: new Date().getTime(),
      cancel: function cancel() {
        return removeSubscription(timer_subscriptions[id]);
      },
      then: function then(fn) {
        return promise.then(fn);
      },
      catch: function _catch(fn) {
        return promise.catch(fn);
      },
      promise: promise,
      resolve: resolve,
      reject: reject
    };

    if (!timer_isRunning) {
      timer_loop();
    }

    return timer_subscriptions[id];
  };
}();
// CONCATENATED MODULE: ./src/utils/to-object.js






function ToObject(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type === 'string') {
    result = Pipe(FromURIComponent, FromEntities, from_json)(result);
  }

  result.valid = Type(result.value) === 'object';
  return result;
}
// CONCATENATED MODULE: ./src/utils/use-if.js

function UseIf(condition, ifNot, value) {
  return TMonad(condition(value) ? value : ifNot(value));
}
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

function uploader_emptyFn() {}

function UploadService(options, file) {
  if (!file) {
    return {
      upload: function upload() {},
      cancel: function cancel() {}
    };
  }

  var Options = Object.assign({}, {
    progressCB: uploader_emptyFn,
    completeCB: uploader_emptyFn,
    errorCB: uploader_emptyFn,
    url: location.href,
    bytesPerChunk: 647212,
    withCredentials: false,
    uploadMethod: 'POST',
    headers: {},
    parallel: false
  }, options);

  function getFile() {
    return file[0] ? file[0] : file;
  }

  function getTotal(file, bytesPerChunk) {
    return !!bytesPerChunk && bytesPerChunk > 0 ? Math.ceil(file.size / bytesPerChunk) : 1;
  }

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

      function headersEach(key) {
        return x.setRequestHeader(key, data.headers[key]);
      }

      Object.keys(data.headers).forEach(headersEach);

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

  function setProgress() {
    return Options.progressCB(UseIf(function progValid(p) {
      return p <= 1;
    }, function elseNot() {
      return 1;
    }, uploadData.total === 1 ? 1 : !completedChunks.length ? 0 : Math.ceil(completedChunks.length / uploadData.total * 100) / 100).value);
  }

  function getHeaders(index, chunkSize, fileSize) {
    return Object.assign({}, {
      'Content-Type': 'application/octet-stream',
      'X-Chunk-Id': index,
      'X-Chunk-Length': chunkSize,
      'X-File-Length': fileSize
    }, uploadData.headers);
  }

  function uploadUrl(index, url) {
    return !Array.isArray(url) ? url : url[index];
  }

  function getChunk(index) {
    return uploadData.total === 1 ? uploadData.fileObject : uploadData.fileObject.slice(index * uploadData.bytesPerChunk, (index + 1) * uploadData.bytesPerChunk);
  }

  function populateData(index) {
    var data = getChunk(index);
    return {
      data: data,
      url: uploadUrl(index, uploadData.url),
      method: uploadData.uploadMethod,
      withCredentials: uploadData.withCredentials,
      headers: getHeaders(index, data.size, uploadData.fileObject.size)
    };
  }

  function onChunkUploaded(e) {
    // If no event, reject
    if (!e) {
      return Promise.reject();
    }

    var data = ToObject(e).value;

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
  }

  function onChunkUploadedAsync(index, e) {
    if (!e) {
      return Promise.reject();
    }

    var data = ToObject(e).value;

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
  }

  function uploadChunk(index) {
    return new Promise(function uploadChunkPromise(resolve, reject) {
      if (stop) {
        return reject('upload was canceled');
      }

      return worker$.post(populateData(index)).then(onChunkUploaded).then(resolve).catch(reject);
    });
  }

  function uploadChunkAsync(index) {
    return new Promise(function uploadChunkAsyncPromise(resolve, reject) {
      if (stop) {
        return reject('upload was canceled');
      }

      return worker$.post(populateData(index)).then(function populateDataResult(res) {
        return onChunkUploadedAsync(index, res);
      }).then(resolve).catch(reject);
    });
  }

  var methods = {
    cancel: function cancel() {
      stop = true;
    },
    upload: function upload() {
      if (!uploadData.size || !uploadData.total) {
        worker$.dispose();
        return Options.errorCB('invalid file');
      }

      if (!uploadData.url) {
        worker$.dispose();
        return Options.errorCB('invalid upload url');
      }

      if (stop) {
        worker$.dispose();
        return Options.errorCB('upload stopped');
      }

      if (!uploadData.parallel) {
        return uploadChunk(chunkIndex).then(Options.completeCB).catch(Options.errorCB);
      }

      var chunkArray = [];
      var index = 0;

      while (index < uploadData.total) {
        chunkArray.push(index);
        index = index + 1;
      }

      function chunkMapper(c) {
        return uploadChunkAsync(c);
      }

      function chunkMapAfter() {
        return Options.completeCB(uploadMessages);
      }

      return Promise.all(chunkArray.map(chunkMapper)).then(chunkMapAfter).catch(Options.errorCB);
    }
  };
  Object.defineProperty(methods, 'currentChunk', {
    get: function get() {
      return chunkIndex;
    }
  });
  return methods;
}
window.UploadService = UploadService;
// CONCATENATED MODULE: ./src/services/unsupported.js










function unsupported_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { unsupported_typeof = function _typeof(obj) { return typeof obj; }; } else { unsupported_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return unsupported_typeof(obj); }


function WCSupportClass() {
  function setUnsupportedClass() {
    return document.body.className = 'wc-unsupported';
  }

  var wc = window.WebComponents;
  var safariVersions = ['Version/9', 'Version/8', 'Version/7'];

  function tryCustomElements() {
    function tryCustomElementsInner() {
      try {
        var t = unsupported_typeof(window.customElements.define);

        if (t !== 'function') {
          setUnsupportedClass();
        }
      } catch (error) {
        setUnsupportedClass();
      }
    }

    OnNextFrame(tryCustomElementsInner);
  }

  function safariReducer(prev, cur) {
    return prev ? true : navigator.userAgent.indexOf(cur) > -1;
  }

  if (navigator.userAgent.indexOf('Safari') > -1 && safariVersions.reduce(safariReducer, false)) {
    setUnsupportedClass();
  }

  if (wc && wc.ready) {
    tryCustomElements();
  } else {
    window.addEventListener('WebComponentsReady', tryCustomElements);
  }
}
// CONCATENATED MODULE: ./src/utils/after-every-nth.js







function AfterEveryNth(nth, insert) {
  return function (value) {
    var result = TMonad(value);
    var pointer = 0;
    var changes = [];

    if (result.stop) {
      return result;
    }

    if (result.type !== 'string') {
      result = ToString(result);
    }

    function mapper(val, index) {
      var mapped = '';

      if ((index + 1) % nth === 0 && index !== 0) {
        mapped = ''.concat(val, insert);
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
    }

    var r = Pipe(ToSplit(''), ToMap(mapper), ToJoin(''))(result);
    r.stringChanges = r.stringChanges.concat(changes);
    r.valid = typeof r.value === 'string' && r.value.length === 14;
    return r;
  };
}
// CONCATENATED MODULE: ./src/utils/animator.js


function animator_emptyFn() {}

function Animator(options) {
  var duration = options.duration ? options.duration : 0;
  var stepFn = options.stepFn ? options.stepFn : animator_emptyFn;
  var frameValues = options.frameValues ? options.frameValues : [];
  var completeFn = options.completeFn ? options.completeFn : animator_emptyFn;

  if (!duration || isNaN(duration) || !Array.isArray(frameValues) || !frameValues.length) {
    return;
  }

  var startTime = Date.now();

  function run() {
    var currentTime = Date.now();
    var currentFrame = frameValues[currentTime - startTime];

    if (currentTime - startTime > duration || currentFrame === undefined) {
      return completeFn();
    }

    OnNextFrame(function runNext() {
      return stepFn(currentFrame);
    });
    OnNextFrame(run);
  }

  run();
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

    if (result.type !== 'string') {
      result = ToString(result);
    }

    function mapper(val, index) {
      var mapped = '';

      if ((index + 1) % nth === 0 && index !== 0) {
        mapped = ''.concat(insert, val);
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
    }

    var r = Pipe(ToSplit(''), ToMap(mapper), ToJoin(''))(result);
    r.stringChanges = r.stringChanges.concat(changes);
    r.valid = typeof r.value === 'string' && r.value.length === 14;
    return r;
  };
}
// CONCATENATED MODULE: ./src/utils/between.js



function Between(start, end, value) {
  var regex = new RegExp(''.concat(start, '([^', end, ']+)', end), 'gm');

  function getAll() {
    var match;
    var matches = [];

    while ((match = regex.exec(value)) !== null) {
      matches.push(match[1]);
    }

    return matches;
  }

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

var isChrome = navigator.userAgent.indexOf('Chrome') > -1;
var isExplorer = navigator.userAgent.indexOf('MSIE') > -1;
var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
var isSafari = navigator.userAgent.indexOf('Safari') > -1;
var isOpera = navigator.userAgent.toLowerCase().indexOf('op') > -1;

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
  which: isSafari ? 'safari' : isChrome ? 'chrome' : isExplorer ? 'ie' : isFirefox ? 'firefox' : isOpera ? 'opera' : undefined
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

  var isDate = result.value !== 'Invalid Date' && !isNaN(result.value) && result.value instanceof Date;
  result.type = isDate ? 'date' : Type(result.value);
  result.valid = result.type === 'date';
  return result;
}
// CONCATENATED MODULE: ./src/utils/date-to-object.js





function DateToObject(value) {
  var result = ToDate(value);

  if (result.stop || !result.valid) {
    return result;
  }

  var hour = parseInt(result.value.toLocaleTimeString(navigator.language, {
    hour: 'numeric',
    hour12: true
  }));
  result.value = {
    year: result.value.getFullYear(),
    yearShort: result.value.toLocaleDateString(navigator.language, {
      year: '2-digit'
    }),
    monthIndex: result.value.getMonth(),
    month: result.value.getMonth() + 1,
    monthDouble: result.value.toLocaleDateString(navigator.language, {
      month: '2-digit'
    }),
    monthName: result.value.toLocaleString(navigator.language, {
      month: 'long'
    }),
    monthNameShort: result.value.toLocaleString(navigator.language, {
      month: 'short'
    }),
    day: result.value.getDate(),
    dayDouble: result.value.toLocaleDateString(navigator.language, {
      day: '2-digit'
    }),
    dayOfWeek: result.value.toLocaleString(navigator.language, {
      weekday: 'long'
    }),
    dayOfWeekShort: result.value.toLocaleString(navigator.language, {
      weekday: 'short'
    }),
    dayIndex: result.value.getDay(),
    hour24: parseInt(result.value.toLocaleTimeString(navigator.language, {
      hour: 'numeric',
      hour12: false
    })),
    hour: hour,
    hourDouble: result.value.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      hour12: true
    }).replace(/[^0-9.]+/g, ''),
    hourDouble24: result.value.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      hour12: false
    }).replace(/[^0-9.]+/g, ''),
    minutes: parseInt(result.value.toLocaleTimeString(navigator.language, {
      minute: 'numeric'
    })),
    minutesDouble: ''.concat('0', result.value.getMinutes()).slice(-2),
    seconds: parseInt(result.value.toLocaleTimeString(navigator.language, {
      second: 'numeric'
    })),
    secondsDouble: ''.concat('0', result.value.getSeconds()).slice(-2),
    milliseconds: result.value.getMilliseconds(),
    ampm: result.value.toLocaleTimeString(navigator.language, {
      hour12: true,
      hour: 'numeric'
    }).replace(/[:\d]/g, '').trim(),
    date: result.value
  };
  return result;
}
// CONCATENATED MODULE: ./src/utils/get-ease.js
function distance(v) {
  return v[1] - v[0];
}

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
function EasePower(stepDecimal, pow) {
  pow = pow === undefined ? 4 : pow;
  return 1 - Math.pow(1 - stepDecimal, pow);
}
// CONCATENATED MODULE: ./src/utils/ease-bounce.js


function EaseBounce(values, duration, pow) {
  pow = pow === undefined ? 4 : pow;

  function fn(index, frames, pow) {
    return EasePower(1 - index / frames, pow);
  }

  return GetEase(values, duration, pow, fn);
}
// CONCATENATED MODULE: ./src/utils/ease-in.js

function EaseIn(values, duration, pow) {
  pow = pow === undefined ? 4 : pow;

  function fn(index, frames) {
    var t = index / frames;
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  return GetEase(values, duration, pow, fn);
}
// CONCATENATED MODULE: ./src/utils/ease-in-out.js


function EaseInOut(values, duration, pow) {
  pow = pow === undefined ? 4 : pow;

  function fn(index, frames, pow) {
    return EasePower(index / frames * (index / frames), pow);
  }

  return GetEase(values, duration, pow, fn);
}
// CONCATENATED MODULE: ./src/utils/ease-out.js


function EaseOut(values, duration, pow) {
  pow = pow === undefined ? 4 : pow;

  function fn(index, frames, pow) {
    return EasePower(index / frames, pow);
  }

  return GetEase(values, duration, pow, fn);
}
// CONCATENATED MODULE: ./src/utils/find-element-in.js
function FindElementIn(parent, selector, all) {
  return !parent ? undefined : parent[all ? 'querySelectorAll' : 'querySelector'](selector);
}
// CONCATENATED MODULE: ./src/utils/first-of-month.js


function FirstOfMonth(value) {
  var result = ToDate(value);

  if (result.stop || !result.valid) {
    return result;
  }

  result.value = DateToObject(new Date(result.value.getFullYear(), result.value.getMonth(), 1)).value;
  return result;
}
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
 * const curried = FunctionToPartial( (a, b, c) => { log(a, b, c) })
 * curried('one') // proxy with argument 'a' populated with 'one'
 * curried('two') // proxy with argument 'b' populated with 'two'
 * curried('three') // 'one two three'
 */

function FunctionToPartial() {
  var argArray = ArrayFrom(arguments);
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
    return FunctionToPartial.apply(null, [fn].concat(argArray, ArrayFrom(arguments)));
  };
}
// CONCATENATED MODULE: ./src/utils/get-curve.js




/** BORROWED HEAVILY FROM: https://stackoverflow.com/a/15528789 */
function GetCurve(points, tension, closedPath, frames) {
  tension = tension === undefined ? 0.5 : tension;
  closedPath = closedPath ? true : false;
  frames = frames === undefined ? 16 : frames;
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

  function ptsMapper(p) {
    return [p, p];
  }

  if (isPairs) {
    pts = pts.concat.apply([], pts);
  } else {
    pts = pts.concat.apply([], pts.map(ptsMapper));
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

  function resMapper(p) {
    return p[0];
  }

  return isPairs ? res : res.map(resMapper);
}
// CONCATENATED MODULE: ./src/utils/has-keys.js




function HasKeys(compare) {
  return function (value) {
    var result = ToObject(value);

    if (result.stop) {
      return result;
    }

    if (!result.valid) {
      return result;
    }

    var keys = Object.keys(result.value);

    function compareFilter(v) {
      return keys.indexOf(v) > -1;
    }

    result.valid = !keys.length && !compare.length ? true : keys.length && !compare.length ? false : compare.filter(compareFilter).length === compare.length;
    return result;
  };
}
// CONCATENATED MODULE: ./src/utils/has-method.js
function HasMethod(obj, method) {
  return !!obj && typeof obj[method] === 'function';
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

    result.valid = Get(result, 'value.tagName', '').toLowerCase() === tag.toLowerCase();
    return result;
  };
}
// CONCATENATED MODULE: ./src/utils/is-mobile.js

function IsMobile() {
  return typeof window.orientation !== 'undefined' || window.navigator.userAgent.indexOf('IEMobile') !== -1;
}
// CONCATENATED MODULE: ./src/utils/last-of-month.js


function LastOfMonth(value) {
  var result = ToDate(value);

  if (result.stop || !result.valid) {
    return result;
  }

  result.value = DateToObject(new Date(result.value.getFullYear(), result.value.getMonth() + 1, 0)).value;
  return result;
}
// CONCATENATED MODULE: ./src/utils/match.js



function Match(toSearchFor, toSearchIn) {
  function doSearch(search) {
    return search.match(ToRegex(toSearchFor).value);
  }

  if (toSearchIn === undefined) {
    return function MatchInner(toSearchIn) {
      return doSearch(toSearchIn);
    };
  }

  return doSearch(toSearchIn);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.weak-map.js
var es_weak_map = __webpack_require__(184);

// CONCATENATED MODULE: ./src/utils/memoize.js






var cache = new WeakMap();
function Memoize(fn) {
  return function MemoizeInner() {
    var obj = {
      fn: fn,
      args: Array.from(arguments).value
    };
    var cached = cache.get(obj);

    if (cached) {
      return cached;
    }

    var result = fn.apply(fn, obj.args);
    cache.set(obj, result);
    return result;
  };
}
// CONCATENATED MODULE: ./src/utils/merge.js








function arrEach(result) {
  return function arrEachInner(value, index) {
    return result[index] = value;
  };
}

function mergeArray(arr1, arr2) {
  var result = arr1.slice(0);

  var _arrEach = arrEach(result);

  arr2.forEach(_arrEach);
  return result;
}

function merge(obj1, obj2) {
  if (!obj1) {
    return Object.assign({}, obj2);
  }

  if (!obj2) {
    return Object.assign({}, obj1);
  }

  var type1 = Type(obj1);
  var type2 = Type(obj2);

  if (type1 !== type2 || ['array', 'object'].indexOf(type1) === -1) {
    return obj2;
  }

  if (type1 === 'array') {
    return mergeArray(obj1, obj2);
  }

  var result = Object.assign({}, obj1);
  Object.keys(obj2).forEach(function (key) {
    if (!obj2[key]) {
      return;
    }

    result[key] = merge(obj1[key], obj2[key]);
  });
  return result;
}

function mutateMergeArray(arr1, arr2) {
  var _arrEach = arrEach(arr1);

  arr2.forEach(_arrEach);
  return arr1;
}

function mutateMerge(obj1, obj2) {
  if (!obj1) {
    return obj2;
  }

  if (!obj2) {
    return obj1;
  }

  var type1 = Type(obj1);
  var type2 = Type(obj2);

  if (type1 !== type2 || ['array', 'object'].indexOf(type1) === -1) {
    return obj2;
  }

  if (type1 === 'array') {
    return mutateMergeArray(obj1, obj2);
  }

  Object.keys(obj2).forEach(function (key) {
    if (!obj2[key]) {
      return;
    }

    obj1[key] = mutateMerge(obj1[key], obj2[key]);
  });
  return obj1;
}

function Merge(obj1, obj2, mutate) {
  mutate = mutate ? true : false;
  return !mutate ? merge(obj1, obj2) : mutateMerge(obj1, obj2);
}
// CONCATENATED MODULE: ./src/utils/merge-stylesheets.js












function merge_stylesheets_exists(thing) {
  return !!thing;
}

function getRules(sheet) {
  return Get(sheet, 'sheet.rules', Get(sheet, 'sheet.cssRules', []));
}

function validRule(rule) {
  return !!rule.selector && rule.cssText;
}

function getSelector(obj) {
  return obj.selector;
}

function getStyleElement(obj) {
  return IsElement(obj).valid ? obj : Get(obj, 'ownerNode', Get(obj, '0.parentStyleSheet.ownerNode'));
}

function mapRuleObject(rule) {
  return {
    selector: Get(rule, 'selectorText'),
    cssText: Get(rule, 'style.cssText')
  };
}

function mapSheets(sheet) {
  return Array.from(getRules(sheet)).map(mapRuleObject).filter(validRule);
}

function MergeStyleSheets() {
  var styleElements = Array.from(arguments).map(getStyleElement).filter(merge_stylesheets_exists);
  var sheets = styleElements.map(mapSheets).filter(merge_stylesheets_exists);
  var styleObject = sheets.shift();
  var styleObjectIndice = styleObject.map(getSelector);
  var styleElement = styleElements.shift();

  if (!styleObject || !styleElement) {
    return;
  }

  function sheetEach(ruleObject) {
    var styleObjectIndex = styleObjectIndice.indexOf(getSelector(ruleObject));

    if (styleObjectIndex > -1) {
      if (styleObject[styleObjectIndex].cssText !== ruleObject.cssText) {
        styleObject[styleObjectIndex].cssText = ''.concat(styleObject[styleObjectIndex].cssText, ruleObject.cssText);
      }

      return;
    }

    styleObject.push(ruleObject);
    styleObjectIndice.push(getSelector(ruleObject));
  }

  function sheetsEach(sheet) {
    return sheet.forEach(sheetEach);
  }

  function styleObjectMap(ruleObject) {
    return ''.concat(ruleObject.selector, '{', ruleObject.cssText, '}');
  }

  sheets.forEach(sheetsEach);
  SetStyleRules(styleElement, styleObject.map(styleObjectMap).join(''));
  return styleElement;
}
// CONCATENATED MODULE: ./src/utils/month-data.js






function MonthData(value) {
  var result = ToDate(value);

  if (result.stop || !result.valid) {
    return result;
  }

  var first = FirstOfMonth(result.value).value;
  var last = LastOfMonth(result.value).value;
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
}
// CONCATENATED MODULE: ./src/utils/observe-slots.js







function ObserveSlots(element, mustHaveSlotAttribute) {
  if (!mustHaveSlotAttribute) {
    mustHaveSlotAttribute = false;
  }

  if (!element) {
    return ObserverReturnEmpty();
  }

  var observer = Observer();
  var exists = ObserveExists(element).subscribe(function ObserveExistsSub(exists) {
    return exists ? undefined : dispose();
  });

  function newSlots(added, removed) {
    added = added ? added : [];
    removed = removed ? removed : [];
    return added.length || removed.length ? observer.next({
      added: added,
      removed: removed
    }) : undefined;
  }

  var slotObserver = new MutationObserver(function slotObserverMutationObs(mutationsList) {
    var added = [];
    var removed = [];
    var list = Array.from(mutationsList);
    var len = list.length;

    function addToArray(el, arrToAddTo) {
      if (mustHaveSlotAttribute && el.getAttribute('slot') || !mustHaveSlotAttribute) {
        arrToAddTo.push(el);
      }
    }

    while (len--) {
      if (list[len].type === 'childList' && (list[len].addedNodes.length || list[len].removedNodes.length)) {
        list[len].addedNodes.forEach(function addedEach(el) {
          addToArray(el, added);
        });
        list[len].removedNodes.forEach(function removedEach(el) {
          addToArray(el, removed);
        });
      }
    }

    newSlots(added, removed);
  });

  function dispose() {
    try {
      exists();
    } catch (error) {}

    observer.complete();
    slotObserver.disconnect();
  }

  slotObserver.observe(element, {
    childList: true
  });
  return observer;
}
// CONCATENATED MODULE: ./src/utils/properties-are.js




function PropertiesAre(compare) {
  return function (value) {
    var result = ToObject(value);

    if (result.stop) {
      return result;
    }

    if (!result.valid) {
      return result;
    }

    var keys = Object.keys(result.value);

    function filter(v) {
      return Type(v) === compare;
    }

    result.valid = keys.length === 0 ? true : keys.filter(filter).length > 0;
    return result;
  };
}
// CONCATENATED MODULE: ./src/utils/random-element.js
function RandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
// CONCATENATED MODULE: ./src/utils/reduce-filter.js

function ReduceFilter(predicateFunction) {
  return function ReduceFilterResult(result, current) {
    return predicateFunction(current) ? result.concat([current]) : result;
  };
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
    return result.concat([mapFunction(current)]);
  };
}
// CONCATENATED MODULE: ./src/utils/replace-element-contents.js


function ReplaceElementContents(element, contents) {
  function respond() {
    return {
      element: element,
      contents: contents
    };
  }

  if (!element) {
    return respond();
  }

  element.innerHTML = '';

  if (typeof contents === 'string') {
    element.innerHTML = contents;
    return respond();
  }

  if (!Array.isArray(contents)) {
    return respond();
  }

  function contentsEach(content) {
    element.appendChild(content);
  }

  contents.forEach(contentsEach);
  return respond();
}
// CONCATENATED MODULE: ./src/utils/scroll-to.js







function scroll_to_animator(from, to, speed, stepFn) {
  return new Promise(function animatorPromise(resolve) {
    return Timer(stepFn, EaseInOut([from, to], speed)).then(resolve);
  });
}

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
  var target = Get(options, 'target');

  if (!target) {
    return;
  }
  /** TODO - handle x */


  var fromY = target.scrollY || target.scrollTop;
  var toY = Get(options, 'y');
  var toX = Get(options, 'x');
  var speed = Get(options, 'speed');

  function scrollTargetY(y) {
    return target.scrollTo(toX, y);
  }

  scroll_to_animator(fromY || 0, toY || 0, speed, scrollTargetY);
}
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

  if (result.type === 'string') {
    result.value = Array.from(parent.querySelectorAll(result.value));
  } else if (isEl.valid) {
    result.value = [result.value];
  }

  function filterValue(e) {
    return IsElement(e).valid;
  }

  result.valid = result.value && result.value.length && result.value.filter(filterValue).length;
  return result;
}
// CONCATENATED MODULE: ./src/utils/selector-array-to-all-elements.js





function SelectorArrayToAllElements(parent, value) {
  var Value = ToArray(value);

  if (Value.stop) {
    return Value;
  }

  if (!Value.valid || Value.type !== 'array') {
    return Value;
  }

  if (!parent) {
    parent = document.firstElementChild;
  }

  function valid(v) {
    return v.valid;
  }

  function valueObj() {
    return {
      value: null
    };
  }

  function valueMapper(el) {
    return UseIf(valid, valueObj, SelectorToElements(null, el)).value;
  }

  function valueFilter(v) {
    return !!v;
  }

  Value.value = Value.value.map(valueMapper).filter(valueFilter);
  Value.valid = Value.value.length;
  return Value;
}
// CONCATENATED MODULE: ./src/utils/selector-to-element.js


function SelectorToElement(parent, value) {
  var Value = TMonad(value);

  if (Value.stop) {
    return Value;
  }

  if (!parent || typeof parent.querySelector !== 'function') {
    parent = document.firstElementChild || document.documentElement.body || document.documentElement.firstElementChild;
  }

  if (Value.type === 'string') {
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

  if (!Value.valid || Value.type !== 'array') {
    return Value;
  }

  if (!parent) {
    parent = document.firstElementChild;
  }

  function valid(v) {
    return v.valid;
  }

  function valueObj() {
    return {
      value: null
    };
  }

  function valueMapper(el) {
    return UseIf(valid, valueObj, SelectorToElement(null, el)).value;
  }

  function valueFilter(v) {
    return !!v;
  }

  Value.value = Value.value.map(valueMapper).filter(valueFilter);
  Value.valid = Value.value.length;
  return Value;
}
// CONCATENATED MODULE: ./src/utils/set.js




function Set(source, path, value) {
  if (path) {
    path = [source].concat(path.split('.'));
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
// CONCATENATED MODULE: ./src/utils/set-caret.js
function SetCaret(input, position, doc) {
  if (!input || !doc || doc.activeElement !== input) {
    return;
  }

  if (input.createTextRange) {
    var range = input.createTextRange();
    range.move('character', position);
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
  args = args ? args : [];
  name = name ? name : fn ? fn.name : '';
  length = length ? length : fn ? fn.length : 0;

  if (!fn) {
    return;
  }
  /** State object, holds observers to subscribe to */


  var state = {
    curried: Observer([FunctionToPartial(fn)]),
    args: Observer(Array.from(arguments)),
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
    // concat the arguments, call the original function and store it's result
    var newArgs = state.args.value.concat(Array.from(arguments)).slice(0, length);
    /** TODO - this is duplicate code, needs to be DRY but not sure how yet */

    var newResult = {};
    newResult[name] = fn.apply(result[name], newArgs);

    if (typeof newResult[name] === 'function' && newResult[name].name === '') {
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

  result[name].pushArgument = function pushArgumentFn(arg) {
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


  result[name].popArgument = function popArgumentFn() {
    if (state.args.value.length === 0) {
      return;
    }

    state.args.next(state.args.value.slice(0, state.args.value.length - 1));
    state.curried.next(state.curried.value.slice(0, state.curried.value.length - 1));
  };
  /** @prototype Returns a copy of the current curried function, adding in any passed arguments */


  result[name].curry = function curryFn() {
    var proxy = result[name].curried;
    Array.from(arguments).forEach(proxy.pushArgument);
    return proxy;
  };
  /** 
   * @prototype Subscribes to a state property observer, if it exists
   * @param {string} property - the property in which to subscribe
   * @param {any} callbacks - Observer callbacks, next, error, complete
   */


  result[name].subscribe = function subFn() {
    var subscribeArguments = Array.from(arguments);
    return !state[subscribeArguments[0]] ? undefined : state[subscribeArguments[0]].subscribe(subscribeArguments[1], subscribeArguments[2], subscribeArguments[3]);
  };

  return result[name];
}


// CONCATENATED MODULE: ./src/utils/throttle.js




function Throttle(fn, wait) {
  wait = wait === undefined ? 33 : wait;
  var timer = null;
  var start = null;
  return function () {
    Get(timer, 'cancel()');
    start = new Date().getTime();

    var _this = this;

    var args = Array.from(arguments);

    function test() {
      var now = new Date().getTime();

      if (now - start >= wait) {
        fn.apply(_this, args);
        Get(timer, 'cancel()');
        start = null;
        timer = null;
        return;
      }

      timer = OnNextFrame(test);
    }

    test();
  };
}
// CONCATENATED MODULE: ./src/utils/to-ascii.js





function ToAscii(string) {
  var result = TMonad(string);

  try {
    result.value = result.value.replace(new RegExp('[^\x00-\x7F]', 'gm'), '');
  } catch (error) {
    result.valid = false;
  }

  return result;
}
// CONCATENATED MODULE: ./src/utils/to-capitalize.js


function ToCapitalize(string) {
  var result = TMonad(string);

  try {
    result.value = ''.concat(result.value.slice(0, 1).toUpperCase(), result.value.slice(1) || '');
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

  if (result.type === 'string' && !!result.value) {
    result.value = result.value.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/`/g, '&apos;');
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

  return TMonadUpdate(result, 'function', 'ToFunction');
}
// CONCATENATED MODULE: ./src/utils/to-phone.js








function ToPhone(value) {
  var result = TMonad(value);
  var pointer = 0;
  var changes = [];

  if (result.stop) {
    return result;
  }

  function mapper(val, index) {
    var length = ''.concat(result.value || '').length;
    var mapped = '';

    if (index === 0) {
      mapped = length ? ''.concat('(', val) : val;
      changes.push({
        start: pointer,
        end: pointer + 1,
        input: val,
        length: 1,
        result: mapped,
        added: '('
      });
      pointer = pointer + 2;
    }

    if (index === 3) {
      mapped = length > 4 ? ''.concat(') ', val) : val;
      changes.push({
        start: pointer,
        end: pointer + 2,
        input: val,
        length: 2,
        result: mapped,
        added: ') '
      });
      pointer = pointer + 3;
    }

    if (index === 6) {
      mapped = length > 9 ? ''.concat('-', val) : val;
      changes.push({
        start: pointer,
        end: pointer + 1,
        input: val,
        length: 1,
        result: mapped,
        added: '-'
      });
      pointer = pointer + 2;
    }

    if ([9, 8, 7, 5, 4, 2, 1].indexOf(index) > -1) {
      mapped = val;
      pointer = pointer + 1;
    }

    if (index > 9) {
      mapped = '';
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
  }

  var r = Pipe(ToDigits, ToSplit(''), ToMap(mapper), ToJoin(''))(result);
  r.stringChanges = r.stringChanges.concat(changes);
  r.valid = typeof r.value === 'string' && r.value.length === 14;
  return r;
}
// CONCATENATED MODULE: ./src/utils/to-intl-phone.js








function ToIntlPhone(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  var parts = result.value.split(' ');
  var countryCode = parts[0].indexOf('+') > -1 ? ''.concat(parts.shift(), ' ') : '';
  var countryCodeMonad = ToDigits(countryCode);
  var r = ToPhone(parts.join(' '));
  result.value = ''.concat('+', countryCodeMonad.value, ' ', r.value).trim();
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






function ToMatchMeta(string, search, justOne) {
  var matches = [];
  var changes = [];
  var value = typeof string === 'string' ? string : ToString(string).value;
  var hasMatched = false;

  function lastMatch() {
    return changes[changes.length - 1];
  }

  value.replace(ToRegex(search).value, function () {
    if (justOne && hasMatched) {
      return;
    }

    hasMatched = true;
    var arr = [].slice.call(arguments, 0);

    if (arr[0] === '') {
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

    if (result.type !== 'string') {
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

    if (result.type !== 'string') {
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








function to_options_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { to_options_typeof = function _typeof(obj) { return typeof obj; }; } else { to_options_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return to_options_typeof(obj); }







function ToOptions(value) {
  var result = TMonad(value);

  if (result.stop) {
    return result;
  }

  function mapper(value) {
    if (to_options_typeof(value) === 'object' && Object.prototype.hasOwnProperty.call(value, 'value')) {
      if (!Object.prototype.hasOwnProperty.call(value, 'label')) {
        value.label = value.value;
      }

      return value;
    }

    return {
      value: value,
      label: value
    };
  }

  return TMonadUpdate(Pipe(CommasToArray, IfInvalid([]), ToMap(mapper))(result), 'array', 'Options');
}
// CONCATENATED MODULE: ./src/utils/to-replacement-pattern.js













function ToReplacementPattern(string) {
  if (!string) {
    return [];
  }

  function matchesMap(match) {
    Pipe(ToDigits, ToNumber)(match).value;
  }

  function extrasEach(extra, index) {
    if (extra === '') {
      if (index === 0 || index === extras.length - 1) {
        var replacement = parsedMatches.shift();
        return result.push({
          index: replacement,
          original: ''.concat('$', replacement)
        });
      }

      return;
    }

    result.push(extra);
  }

  var str = ToString(string).value;
  var matches = str.match(/(\$\d+)+/g) || [];
  var extras = str.split(new RegExp('[' + matches.join(' |') + ']'));
  var parsedMatches = matches ? matches.map(matchesMap) : [];
  var result = [];
  extras.forEach(extrasEach);
  return result;
}
// CONCATENATED MODULE: ./src/utils/to-replace-meta.js







function ToReplaceMeta(string, search, insert) {
  var replacements = ToReplacementPattern(insert);
  var result = {
    value: string.toString(),
    stringChanges: []
  };
  var testString = result.value;
  var match;
  var index = 0;

  function replacementsReducer(previous, current) {
    if (typeof current === 'string') {
      return ''.concat(previous, current);
    }

    return ''.concat(previous, match[current.index] || '');
  }

  function stringChangesReducer(previous, current, i) {
    var added = current.added || '';
    var post = i !== result.stringChanges.length - 1 ? '' : current.post;
    return ''.concat(previous, current.pre, added, post);
  }

  while ((match = ToRegex(search).value.exec(testString)) !== null) {
    var end = match.index + match[0].length;
    var matched = {
      start: match.index,
      end: end,
      input: match.input,
      length: match[0].length,
      result: '',
      removed: match[0],
      pre: '',
      post: '',
      index: index
    };
    matched.pre = matched.start !== 0 ? testString.slice(0, matched.start) : '';
    matched.post = testString.slice(end);
    matched.result = ''.concat(matched.pre, matched.post);

    if (match.length > 1 && replacements.length) {
      matched.added = replacements.reduce(replacementsReducer, '');
      matched.length = matched.added.length;
      matched.end = match.index + matched.length;
      matched.result = ''.concat(matched.pre, matched.added || '', matched.post);
    }

    result.stringChanges.push(matched);
    testString = matched.post;
    index = index + 1;
  }

  if (result.stringChanges.length) {
    result.value = result.stringChanges.reduce(stringChangesReducer, '');
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

    if (result.type !== 'string') {
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

    return TMonadUpdate(result, 'string', 'Replace');
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

      if (typeof v === 'string') {
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
  return function TransduceFilterInner(nextReducer) {
    return function TransduceFilterInnerInner(result, current) {
      return predicateFunction(current) ? nextReducer(result, current) : result;
    };
  };
}
// CONCATENATED MODULE: ./src/utils/transduce-map.js
function TransduceMap(conversionFunction) {
  return function TransduceMapInner(reduceFunction) {
    return function TransduceMapInnerInner(result, current) {
      return reduceFunction(result, conversionFunction(current));
    };
  };
}
// CONCATENATED MODULE: ./src/utils/was-clicked-on.js
function WasClickedOn(element, event) {
  if (!element) {
    return false;
  }

  var isArray = Array.isArray(element);

  function isIt(el, par) {
    var isEqual = el === par;
    var isContained = par instanceof Node && el.contains(par);

    if (isEqual || isContained) {
      return true;
    }

    return false;
  }

  var target = Array.isArray(event.path) ? event.path[0] : event.composedPath && typeof event.composedPath === 'function' && event.composedPath()[0] ? event.composedPath()[0] : event.originalTarget ? event.originalTarget : event.explicitOriginalTarget ? event.explicitOriginalTarget : event.target;

  function cycleUp(parent) {
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
  }

  return cycleUp(target);
}
// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport AjaxForm */__webpack_require__.d(__webpack_exports__, "AjaxForm", function() { return AjaxForm; });
/* concated harmony reexport ButtonElement */__webpack_require__.d(__webpack_exports__, "ButtonElement", function() { return ButtonElement; });
/* concated harmony reexport ContentCollapse */__webpack_require__.d(__webpack_exports__, "ContentCollapse", function() { return ContentCollapse; });
/* concated harmony reexport ContentTransition */__webpack_require__.d(__webpack_exports__, "ContentTransition", function() { return ContentTransition; });
/* concated harmony reexport GridLayout */__webpack_require__.d(__webpack_exports__, "GridLayout", function() { return GridLayout; });
/* concated harmony reexport IconElement */__webpack_require__.d(__webpack_exports__, "IconElement", function() { return IconElement; });
/* concated harmony reexport InputBool */__webpack_require__.d(__webpack_exports__, "InputBool", function() { return InputBool; });
/* concated harmony reexport InputField */__webpack_require__.d(__webpack_exports__, "InputField", function() { return InputField; });
/* concated harmony reexport InputSelect */__webpack_require__.d(__webpack_exports__, "InputSelect", function() { return InputSelect; });
/* concated harmony reexport SpinnerElement */__webpack_require__.d(__webpack_exports__, "SpinnerElement", function() { return SpinnerElement; });
/* concated harmony reexport SnackBar */__webpack_require__.d(__webpack_exports__, "SnackBar", function() { return SnackBar; });
/* concated harmony reexport Benches */__webpack_require__.d(__webpack_exports__, "Benches", function() { return Benches; });
/* concated harmony reexport Components */__webpack_require__.d(__webpack_exports__, "Components", function() { return Components; });
/* concated harmony reexport ComponentStore */__webpack_require__.d(__webpack_exports__, "ComponentStore", function() { return ComponentStore; });
/* concated harmony reexport DragDropService */__webpack_require__.d(__webpack_exports__, "DragDropService", function() { return DragDropService; });
/* concated harmony reexport ID */__webpack_require__.d(__webpack_exports__, "ID", function() { return ID; });
/* concated harmony reexport OnNextFrame */__webpack_require__.d(__webpack_exports__, "OnNextFrame", function() { return OnNextFrame; });
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
/* concated harmony reexport AppendStyleElement */__webpack_require__.d(__webpack_exports__, "AppendStyleElement", function() { return AppendStyleElement; });
/* concated harmony reexport ArrayFrom */__webpack_require__.d(__webpack_exports__, "ArrayFrom", function() { return ArrayFrom; });
/* concated harmony reexport BeforeEveryNth */__webpack_require__.d(__webpack_exports__, "BeforeEveryNth", function() { return BeforeEveryNth; });
/* concated harmony reexport Between */__webpack_require__.d(__webpack_exports__, "Between", function() { return Between; });
/* concated harmony reexport BrowserIs */__webpack_require__.d(__webpack_exports__, "BrowserIs", function() { return BrowserIs; });
/* concated harmony reexport CommasToArray */__webpack_require__.d(__webpack_exports__, "CommasToArray", function() { return CommasToArray; });
/* concated harmony reexport ComponentClassObject */__webpack_require__.d(__webpack_exports__, "ComponentClassObject", function() { return ComponentClassObject; });
/* concated harmony reexport ComponentConstructor */__webpack_require__.d(__webpack_exports__, "ComponentConstructor", function() { return ComponentConstructor; });
/* concated harmony reexport ClearHTML */__webpack_require__.d(__webpack_exports__, "ClearHTML", function() { return ClearHTML; });
/* concated harmony reexport CreateElement */__webpack_require__.d(__webpack_exports__, "CreateElement", function() { return CreateElement; });
/* concated harmony reexport DateToObject */__webpack_require__.d(__webpack_exports__, "DateToObject", function() { return DateToObject; });
/* concated harmony reexport DispatchEvent */__webpack_require__.d(__webpack_exports__, "DispatchEvent", function() { return DispatchEvent; });
/* concated harmony reexport EaseBounce */__webpack_require__.d(__webpack_exports__, "EaseBounce", function() { return EaseBounce; });
/* concated harmony reexport EaseIn */__webpack_require__.d(__webpack_exports__, "EaseIn", function() { return EaseIn; });
/* concated harmony reexport EaseInOut */__webpack_require__.d(__webpack_exports__, "EaseInOut", function() { return EaseInOut; });
/* concated harmony reexport EaseOut */__webpack_require__.d(__webpack_exports__, "EaseOut", function() { return EaseOut; });
/* concated harmony reexport EasePower */__webpack_require__.d(__webpack_exports__, "EasePower", function() { return EasePower; });
/* concated harmony reexport Equals */__webpack_require__.d(__webpack_exports__, "Equals", function() { return Equals; });
/* concated harmony reexport EventName */__webpack_require__.d(__webpack_exports__, "EventName", function() { return EventName; });
/* concated harmony reexport Filter */__webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* concated harmony reexport FindElementIn */__webpack_require__.d(__webpack_exports__, "FindElementIn", function() { return FindElementIn; });
/* concated harmony reexport FindFirst */__webpack_require__.d(__webpack_exports__, "FindFirst", function() { return FindFirst; });
/* concated harmony reexport FirstOfMonth */__webpack_require__.d(__webpack_exports__, "FirstOfMonth", function() { return FirstOfMonth; });
/* concated harmony reexport ForEach */__webpack_require__.d(__webpack_exports__, "ForEach", function() { return ForEach; });
/* concated harmony reexport FromJSON */__webpack_require__.d(__webpack_exports__, "FromJSON", function() { return FromJSON; });
/* concated harmony reexport FromEntities */__webpack_require__.d(__webpack_exports__, "FromEntities", function() { return FromEntities; });
/* concated harmony reexport FromURI */__webpack_require__.d(__webpack_exports__, "FromURI", function() { return FromURI; });
/* concated harmony reexport FromURIComponent */__webpack_require__.d(__webpack_exports__, "FromURIComponent", function() { return FromURIComponent; });
/* concated harmony reexport FunctionToPartial */__webpack_require__.d(__webpack_exports__, "FunctionToPartial", function() { return FunctionToPartial; });
/* concated harmony reexport Get */__webpack_require__.d(__webpack_exports__, "Get", function() { return Get; });
/* concated harmony reexport GetCurve */__webpack_require__.d(__webpack_exports__, "GetCurve", function() { return GetCurve; });
/* concated harmony reexport GetEase */__webpack_require__.d(__webpack_exports__, "GetEase", function() { return GetEase; });
/* concated harmony reexport GetInputValue */__webpack_require__.d(__webpack_exports__, "GetInputValue", function() { return GetInputValue; });
/* concated harmony reexport GetParent */__webpack_require__.d(__webpack_exports__, "GetParent", function() { return GetParent; });
/* concated harmony reexport HasKeys */__webpack_require__.d(__webpack_exports__, "HasKeys", function() { return HasKeys; });
/* concated harmony reexport HasMethod */__webpack_require__.d(__webpack_exports__, "HasMethod", function() { return HasMethod; });
/* concated harmony reexport htmlTags */__webpack_require__.d(__webpack_exports__, "htmlTags", function() { return htmlTags; });
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
/* concated harmony reexport LastOfMonth */__webpack_require__.d(__webpack_exports__, "LastOfMonth", function() { return LastOfMonth; });
/* concated harmony reexport Mapper */__webpack_require__.d(__webpack_exports__, "Mapper", function() { return Mapper; });
/* concated harmony reexport Match */__webpack_require__.d(__webpack_exports__, "Match", function() { return Match; });
/* concated harmony reexport MatchAll */__webpack_require__.d(__webpack_exports__, "MatchAll", function() { return MatchAll; });
/* concated harmony reexport Memoize */__webpack_require__.d(__webpack_exports__, "Memoize", function() { return Memoize; });
/* concated harmony reexport Merge */__webpack_require__.d(__webpack_exports__, "Merge", function() { return Merge; });
/* concated harmony reexport MergeStyleSheets */__webpack_require__.d(__webpack_exports__, "MergeStyleSheets", function() { return MergeStyleSheets; });
/* concated harmony reexport MonthData */__webpack_require__.d(__webpack_exports__, "MonthData", function() { return MonthData; });
/* concated harmony reexport ObserveExists */__webpack_require__.d(__webpack_exports__, "ObserveExists", function() { return ObserveExists; });
/* concated harmony reexport ObserveEvent */__webpack_require__.d(__webpack_exports__, "ObserveEvent", function() { return ObserveEvent; });
/* concated harmony reexport ObserveSlots */__webpack_require__.d(__webpack_exports__, "ObserveSlots", function() { return ObserveSlots; });
/* concated harmony reexport ObserveWorker */__webpack_require__.d(__webpack_exports__, "ObserveWorker", function() { return ObserveWorker; });
/* concated harmony reexport ObserveVisibility */__webpack_require__.d(__webpack_exports__, "ObserveVisibility", function() { return ObserveVisibility; });
/* concated harmony reexport Observer */__webpack_require__.d(__webpack_exports__, "Observer", function() { return Observer; });
/* concated harmony reexport ObserverUnsubscribe */__webpack_require__.d(__webpack_exports__, "ObserverUnsubscribe", function() { return ObserverUnsubscribe; });
/* concated harmony reexport ParseCss */__webpack_require__.d(__webpack_exports__, "ParseCss", function() { return ParseCss; });
/* concated harmony reexport Pipe */__webpack_require__.d(__webpack_exports__, "Pipe", function() { return Pipe; });
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
/* concated harmony reexport ToObject */__webpack_require__.d(__webpack_exports__, "ToObject", function() { return ToObject; });
/* concated harmony reexport ToOptions */__webpack_require__.d(__webpack_exports__, "ToOptions", function() { return ToOptions; });
/* concated harmony reexport ToPhone */__webpack_require__.d(__webpack_exports__, "ToPhone", function() { return ToPhone; });
/* concated harmony reexport ToPlainText */__webpack_require__.d(__webpack_exports__, "ToPlainText", function() { return ToPlainText; });
/* concated harmony reexport ToRegex */__webpack_require__.d(__webpack_exports__, "ToRegex", function() { return ToRegex; });
/* concated harmony reexport ToReplace */__webpack_require__.d(__webpack_exports__, "ToReplace", function() { return ToReplace; });
/* concated harmony reexport ToReplacementPattern */__webpack_require__.d(__webpack_exports__, "ToReplacementPattern", function() { return ToReplacementPattern; });
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
/* concated harmony reexport Transduce */__webpack_require__.d(__webpack_exports__, "Transduce", function() { return Transduce; });
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
/* concated harmony reexport WasClickedOn */__webpack_require__.d(__webpack_exports__, "WasClickedOn", function() { return WasClickedOn; });
/* concated harmony reexport WhenAvailable */__webpack_require__.d(__webpack_exports__, "WhenAvailable", function() { return WhenAvailable; });






/** COMPONENTS */

 // export { CollapseMenu } from './components/collapse-menu/index.js'

 // export { ContentDrawer } from './components/content-drawer/index.js'

 // export { CookieMessage } from './components/cookie-message/index.js'
// export { DropDown } from './components/drop-down/index.js'
// export { EffectBounceZ } from './components/effect-bounce-z/index.js'
// export { EffectFade } from './components/effect-fade/index.js'
// export { EffectRipple } from './components/effect-ripple/index.js'
// export { EffectScale } from './components/effect-scale/index.js'
// export { EffectUnderline } from './components/effect-underline/index.js'

 // export { HorizontalSlider } from './components/horizontal-slider/index.js'

 // export { ImageLoader } from './components/image-loader/index.js'

 // export { InputFile } from './components/input-file/index.js'


 // export { OverlayContent } from './components/overlay-content/index.js'
// export { OverlayMessage } from './components/overlay-message/index.js'
// export { ProgressBar } from './components/progress-bar/index.js'



/** SERVICES */













/** UTILS */




















































































































































/***/ })
/******/ ]);
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var builtjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var builtjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(builtjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_html__WEBPACK_IMPORTED_MODULE_1__);



window.IDs = builtjs__WEBPACK_IMPORTED_MODULE_0__["ID"];
window.Benches = builtjs__WEBPACK_IMPORTED_MODULE_0__["Benches"];
window.Transduce = builtjs__WEBPACK_IMPORTED_MODULE_0__["Transduce"]; // import './components/test-element/index.js'
// import { Router, CreateElement } from 'builtjs'
// const Routes = {
//     home: {
//         pathname: '/',
//         content: 'test-element',
//         title: 'Paramount Pictures Support'
//     }
// }
// export const router = Router(Routes)
// router.route$.subscribe(route => {
//     document.body.setAttribute('page', route.content)
//     document.title = route.title
//     const content = document.getElementById('app')
//     content.innerHTML = ''
//     content.appendChild(CreateElement({ tagName: route.content }))
// })

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<!doctype html> <html dir=ltr lang=en> <head> <meta charset=utf-8 /> <meta name=viewport content=\"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5\"/> <style>html{height:100%}body{font-family:sans-serif;font-size:14px;color:#333;margin:0;padding:2rem;box-sizing:border-box;min-height:100%;background:#ccc}</style> <style type=text/css style=display:none name=button-element-init>button-element{opacity:0}</style> </head> <body> <grid-layout columnwidth=400px scaletofit=true> <input-bool type=checkbox label=Checkbox></input-bool> <input-field label=\"First name <span style='color:#c10005;'>&amp;nbsp;*</span>\" class=\"support-dvd-input static-input\" name=InquirerFirstName id=InquirerFirstName required=true labelposition=top input-element></input-field> <input-field label=\"Last name <span style='color:#c10005;'>&amp;nbsp;*</span>\" class=\"support-dvd-input static-input\" name=InquirerLastName id=InquirerLastName required=true labelposition=top input-element></input-field> <input-field label=\"Email address <span style='color:#c10005;'>&amp;nbsp;*</span>\" class=\"support-dvd-input static-input\" autocomplete=email type=email name=Email id=Email required=true labelposition=top input-element></input-field> <input-field label=\"Phone number\" class=\"support-dvd-input static-input\" autocomplete=phone type=intlphone name=Telephone id=Telephone labelposition=top input-element></input-field> <input-field label=State class=\"support-dvd-input static-input\" autocomplete=state name=state id=state labelposition=top format=\"/[a-z]/g=>toUpperCase, /[^A-Z]/g=>\" max=2 input-element></input-field> </grid-layout> <button-element>Hi</button-element> <input-field label=ho type=tel></input-field> <input-bool type=checkbox label=Checkbox></input-bool> <input-select options=\"one, two, three\" label=Select...></input-select> <ajax-form> <input-select options=\"one, two, three\" label=Options></input-select> <input-field label=\"Email please\" type=email></input-field> <input-bool type=checkbox label=\"Check this\"></input-bool> </ajax-form> <content-collapse group=content-collapse> <div slot=content-collapse-toggler>Toggle 1</div> <div slot=content-collapse-content>Toggle 1 body</div> </content-collapse> <content-collapse group=content-collapse> <div slot=content-collapse-toggler>Toggle 2</div> <div slot=content-collapse-content>Toggle 2 body</div> </content-collapse> <content-collapse> <div slot=content-collapse-toggler>Toggle 3</div> <div slot=content-collapse-content>Toggle 3 body</div> </content-collapse> <snack-bar shown=true type=info> <div slot=body>A snackie poo</div> </snack-bar> <spinner-element></spinner-element> <script src=/dist/app.js></script> <script></script> </body> </html> ";

/***/ })
/******/ ]);