!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.builtjs=t():e.builtjs=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=19)}({11:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return void 0===e&&(e=""),(""+e+((new Date).getTime()/1e3|0).toString(16)+"xxxxxxxxxxxxxxxx").replace(/[x]/g,function(){return(16*Math.random()|0).toString(16)}).toLowerCase()}},19:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(11);t.default=function(e,t){void 0===t&&(t=!1);var n=Object.assign({},{value:e,previousValue:void 0,updated:(new Date).getTime(),subscriptions:{}}),o=function(e,t,r){void 0===r&&(r={}),Object.keys(n.subscriptions).forEach(function(o){var u=n.subscriptions[o][e];u&&"function"==typeof u&&u(t,r,o)})},u=function(e){return function(){n.subscriptions[e.id]=null,delete n.subscriptions[e.id]}};return{get value(){return n.value},get previous(){return n.previousValue},next:function(e){n=Object.assign({},{value:e,previousValue:n.value,updated:(new Date).getTime(),subscriptions:n.subscriptions}),o("next",n.value,n)},error:function(e){o("error",e,n)},complete:function(){o("complete",n)},subscribe:function(e,o,i){void 0===o&&(o=function(e){}),void 0===i&&(i=function(){});var c=Object.assign({},{next:e,error:o,complete:i,id:r.default()});return c.unsubscribe=u(c),n.subscriptions[c.id]=c,t||void 0===n.value||"function"!=typeof c.next||c.next(n.value,n,c.id),u(c)},unsubscribe:function(e){if(e&&e.id&&n.subscriptions[e.id])return u(e)}}}}})});