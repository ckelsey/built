webpackHotUpdatebuiltjs(0,{

/***/ "./src/utils/get/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Get; });
/**
 * Searches any type of item down a provided path, returning an emptyVal if provided. Also has the ability to perform a function on the end result
 * @function Get
 * 
 * @param {any} obj - The item to search. Can really be anything, as Get will call methods if provided
 * 
 * @param {string} path - The path chain to follow. Must be dot(.) seperated. Array indice should be dot as well. 
 * Can have methods, but arguments can only be strings, numbers, or booleans.
 * 
 * @param {any} emptyVal - If nothing resulted in the search, return this
 * 
 * @param {function()} modifyFn - A function that will be run to modify the returned result
 * 
 * @return {any} Either the found item or the emptyVal if provided
 * 
 * @example 
 * const obj = {
 *      a:{
 *          b:[
 *              `C`
 *          ]
 *      }
 * }
 * 
 * Get(obj, `a.b.0.toLowerCase()`) // `c`
 */
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
        arg = arg.trim();

        if (["\"", "'", "`"].indexOf(arg.charAt(0))) {
          console.log("yesah");
          return arg;
        }

        try {
          return JSON.parse(arg);
        } catch (error) {
          console.log(error);
          return arg;
        }
      });
      var functionName = currentValue.split("(")[0];

      if (typeof accumulator[functionName] === "function") {
        args;
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

/***/ })

})