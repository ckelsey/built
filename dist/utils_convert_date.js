!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.builtjs=t():e.builtjs=t()}(window,function(){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=90)}({0:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(3);t.isTMonad=function(e){return!!e&&e.hasOwnProperty("valid")&&"boolean"===a.Type(e.valid)&&e.hasOwnProperty("instanceof")&&"array"===a.Type(e.instanceof)&&e.hasOwnProperty("type")&&"string"===a.Type(e.type)&&e.hasOwnProperty("value")},t.Tmonad=function(e){return t.isTMonad(e)?{valid:e.valid,value:e.value,type:a.Type(e.value),stringChanges:e.stringChanges,instanceof:e.instanceof,stop:e.stop}:{valid:!0,value:e,type:a.Type(e),stringChanges:[],instanceof:[],stop:!1}},t.finishTMonad=function(e,t,n){return e.type=a.Type(e.value),e.valid="?"===t||e.type===t,e.instanceof.push(n),e}},21:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return e instanceof Element||e instanceof Node}},22:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e;try{t=new Date(Date.parse(e))}catch(e){return!1}return"Invalid Date"!==t&&!isNaN(t)&&t instanceof Date}},23:function(e,t,n){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return a(e).indexOf("object")>-1}},24:function(e,t,n){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0});var o=["string","number","null","undefined","function"],r=n(21),u=n(22),l=n(23);t.default=function(e){return null===e?null:(t=e,o.indexOf(a(t))>-1?a(e):r.default(e)?"dom":Array.isArray(e)?"array":u.default(e)?"date":l.default(e)?"object":a(e));var t}},25:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(24);t.default=function(e){var t=a.default(e);return""===e||"undefined"===t||null==t||"array"===t&&0===e.length||"object"===t&&0===Object.keys(e).length}},3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(50);t.isAnyEmpty=a.default;var o=n(22);t.isDate=o.default;var r=n(21);t.isDom=r.default;var u=n(25);t.isEmpty=u.default;var l=n(24);t.Type=l.default;var i=n(23);t.isObject=i.default},50:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(25);t.default=function(e){return a.default(e)||"false"===e||"undefined"===e||"null"===e}},90:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),o=n(3);t.ToDate=function(e){var t=a.Tmonad(e);if(t.stop)return t;"DateToObject"===t.instanceof[t.instanceof.length]&&(t.value=t.value.date);try{t.value=new Date(Date.parse(t.value))}catch(e){}var n="Invalid Date"!==t.value&&!isNaN(t.value)&&t.value instanceof Date;return t.type=n?"date":o.Type(t.value),t.valid="date"===t.type,t.instanceof.push("ToDate"),t},t.DateToObject=function(e){var n=t.ToDate(e);if(n.stop||!n.valid)return n;var a=parseInt(n.value.toLocaleTimeString(navigator.language,{hour:"numeric",hour12:!0}));return n.value={year:n.value.getFullYear(),yearShort:n.value.toLocaleDateString(navigator.language,{year:"2-digit"}),monthIndex:n.value.getMonth(),month:n.value.getMonth()+1,monthDouble:n.value.toLocaleDateString(navigator.language,{month:"2-digit"}),monthName:n.value.toLocaleString(navigator.language,{month:"long"}),monthNameShort:n.value.toLocaleString(navigator.language,{month:"short"}),day:n.value.getDate(),dayDouble:n.value.toLocaleDateString(navigator.language,{day:"2-digit"}),dayOfWeek:n.value.toLocaleString(navigator.language,{weekday:"long"}),dayOfWeekShort:n.value.toLocaleString(navigator.language,{weekday:"short"}),dayIndex:n.value.getDay(),hour24:parseInt(n.value.toLocaleTimeString(navigator.language,{hour:"numeric",hour12:!1})),hour:a,hourDouble:n.value.toLocaleTimeString(navigator.language,{hour:"2-digit",hour12:!0}).replace(/[^0-9\.]+/g,""),hourDouble24:n.value.toLocaleTimeString(navigator.language,{hour:"2-digit",hour12:!1}).replace(/[^0-9\.]+/g,""),minutes:parseInt(n.value.toLocaleTimeString(navigator.language,{minute:"numeric"})),minutesDouble:("0"+n.value.getMinutes()).slice(-2),seconds:parseInt(n.value.toLocaleTimeString(navigator.language,{second:"numeric"})),secondsDouble:("0"+n.value.getSeconds()).slice(-2),milliseconds:n.value.getMilliseconds(),ampm:n.value.toLocaleTimeString(navigator.language,{hour12:!0,hour:"numeric"}).replace(/[:\d]/g,"").trim(),date:n.value},n.instanceof.push("DateToObject"),n},t.FirstOfMonth=function(e){var n=t.ToDate(e);return n.stop||!n.valid?n:(n.value=t.DateToObject(new Date(n.value.getFullYear(),n.value.getMonth(),1)).value,n.instanceof.push("FirstOfMonth"),n)},t.LastOfMonth=function(e){var n=t.ToDate(e);return n.stop||!n.valid?n:(n.value=t.DateToObject(new Date(n.value.getFullYear(),n.value.getMonth()+1,0)).value,n.instanceof.push("LastOfMonth"),n)},t.MonthData=function(e){var n=t.ToDate(e);if(n.stop||!n.valid)return n;for(var a=t.FirstOfMonth(n.value).value,o=t.LastOfMonth(n.value).value,r=a.dayIndex,u=[];r;){(s=t.DateToObject(new Date(a.year,a.monthIndex,1-r)).value).outOfRange=!0,u.push(s),r-=1}for(var l=6-o.dayIndex,i=[];l;){(s=t.DateToObject(new Date(o.year,o.monthIndex,o.day+(7-(l+o.dayIndex)))).value).outOfRange=!0,i.push(s),l-=1}for(var c=[].concat(u.slice()),f=0;f<o.day;){var s=t.DateToObject(new Date(a.year,a.monthIndex,a.day+f)).value;c.push(s),f+=1}return n.value=c.concat(i.slice()),n.instanceof.push("MonthData"),n}}})});