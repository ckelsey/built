!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.builtjs=t():e.builtjs=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);t.isTMonad=function(e){return!!e&&e.hasOwnProperty("valid")&&"boolean"===r.getType(e.valid)&&e.hasOwnProperty("instanceof")&&"array"===r.getType(e.instanceof)&&e.hasOwnProperty("type")&&"string"===r.getType(e.type)&&e.hasOwnProperty("value")},t.Tmonad=function(e){return t.isTMonad(e)?{valid:e.valid,value:e.value,type:r.getType(e.value),stringChanges:e.stringChanges,instanceof:e.instanceof,stop:e.stop}:{valid:!0,value:e,type:r.getType(e),stringChanges:[],instanceof:[],stop:!1}},t.finishTMonad=function(e,t,n){return e.type=r.getType(e.value),e.valid="?"===t||e.type===t,e.instanceof.push(n),e}},function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.primitives=["string","number","null","undefined","function"],t.isDom=function(e){return e instanceof Element||e instanceof Node},t.isString=function(e){return"string"==typeof e},t.isPrimitive=function(e){return t.primitives.indexOf(r(e))>-1},t.isArray=function(e){return Array.isArray(e)},t.isDate=function(e){var t=e;try{t=new Date(Date.parse(e))}catch(e){return!1}return"Invalid Date"!==t&&!isNaN(t)&&t instanceof Date},t.isObject=function(e){return r(e).indexOf("object")>-1},t.empty=function(e){var n=t.getType(e);return""===e||"undefined"===n||null==n||"array"===n&&0===e.length||"object"===n&&0===Object.keys(e).length},t.anyEmpty=function(e){return t.empty(e)||"false"===e||"undefined"===e||"null"===e},t.getType=function(e){return null===e?null:t.isPrimitive(e)?r(e):t.isDom(e)?"dom":t.isArray(e)?"array":t.isDate(e)?"date":t.isObject(e)?"object":r(e)}}])});