!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.builtjs=t():e.builtjs=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}({21:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return e instanceof Element||e instanceof Node}},22:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e;try{t=new Date(Date.parse(e))}catch(e){return!1}return"Invalid Date"!==t&&!isNaN(t)&&t instanceof Date}},23:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return r(e).indexOf("object")>-1}},24:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0});var o=["string","number","null","undefined","function"],u=n(21),f=n(22),i=n(23);t.default=function(e){return null===e?null:(t=e,o.indexOf(r(t))>-1?r(e):u.default(e)?"dom":Array.isArray(e)?"array":f.default(e)?"date":i.default(e)?"object":r(e));var t}},25:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(24);t.default=function(e){var t=r.default(e);return""===e||"undefined"===t||null==t||"array"===t&&0===e.length||"object"===t&&0===Object.keys(e).length}},3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(50);t.isAnyEmpty=r.default;var o=n(22);t.isDate=o.default;var u=n(21);t.isDom=u.default;var f=n(25);t.isEmpty=f.default;var i=n(24);t.Type=i.default;var l=n(23);t.isObject=l.default},50:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(25);t.default=function(e){return r.default(e)||"false"===e||"undefined"===e||"null"===e}}})});