!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.builtjs=t():e.builtjs=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=86)}({1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t){return e.reduce(function(e,t){return"function"!=typeof t?e:t(e)},t)}}},86:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);t.default=function e(t,n){void 0===n&&(n=[]);var o=function(e){for(var t=[],n=0;n<e.length;)t.push(e[n]),n+=1;return t},u={set:function(r,u){var f;return void 0===u?f=o(n).concat(r):(f=o(n).slice(0))[u]=r,e(t,f)},tap:function(t){return e(t(r.default.apply(this,o(n))))},pipe:function(e){var t=r.default.apply(this,o(n));return"function"==typeof t?t(e):t},curry:function(e){for(var r,u=o(n).slice(0),f=u.length,i=0;i<f;){var c=u[i];if("function"!=typeof(r=void 0===r?t(c):r(c)))return r;i+=1}return"function"!=typeof r?r:r(e)},bind:function(r){return e(t.bind(r),n)}};return Object.defineProperties(u,{func:{get:function(){return t}},args:{get:function(){return o(n)}},length:{get:function(){return o(n).length}}})}}})});