!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.builtjs=t():e.builtjs=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3);t.isTMonad=function(e){return!!e&&e.hasOwnProperty("valid")&&"boolean"===r.Type(e.valid)&&e.hasOwnProperty("instanceof")&&"array"===r.Type(e.instanceof)&&e.hasOwnProperty("type")&&"string"===r.Type(e.type)&&e.hasOwnProperty("value")},t.Tmonad=function(e){return t.isTMonad(e)?{valid:e.valid,value:e.value,type:r.Type(e.value),stringChanges:e.stringChanges,instanceof:e.instanceof,stop:e.stop}:{valid:!0,value:e,type:r.Type(e),stringChanges:[],instanceof:[],stop:!1}},t.finishTMonad=function(e,t,n){return e.type=r.Type(e.value),e.valid="?"===t||e.type===t,e.instanceof.push(n),e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(2),u=n(14),o=n(5),i=n(15),l=n(4),s=n(8),c=n(6);t.Trim=function(e){if(i.default(e,"stop",!1))return r.Tmonad(e);var t=r.Tmonad(e);try{t.value=t.value.trim()}catch(e){}return t.instanceof.push("Trim"),t},t.ToPlainText=function(e){var n=r.Tmonad(e);return n.stop?n:(n="string"!==n.type?a.default(t.ToString,l.StopIfInvalid,u.DecodeUriComponent,o.FromEntities)(n):a.default(u.DecodeUriComponent,o.FromEntities)(n),r.finishTMonad(n,"string","ToPlainText"))},t.ToString=function(e){if(i.default(e,"stop",!1))return r.Tmonad(e);var t=r.Tmonad(e);try{t.value=t.value.toString()}catch(e){}return t.valid="string"==typeof t.value,t.instanceof.push("ToString"),t},t.Split=function(e){return function(n){var a=r.Tmonad(n);if(a.stop)return a;"string"!==a.type&&(a=t.ToString(a));try{var u=s.SplitMeta(a.value,e);if("string"==typeof u.value)throw new Error("not array");a.stringChanges=a.stringChanges.concat(u.stringChanges),a.value=u.value}catch(e){a.valid=!1}return r.finishTMonad(a,"array","Split")}},t.Replace=function(e,n){return function(a){var u=r.Tmonad(a);if(u.stop)return u;"string"!==u.type&&(u=t.ToString(u));try{var o=s.ReplaceMeta(u.value,e,n);u.value=o.value,u.valid=!0,u.stringChanges=u.stringChanges.concat(o.stringChanges)}catch(e){u.valid=!1}return r.finishTMonad(u,"string","Replace")}},t.AfterEveryNth=function(e,n){return function(u){var o=r.Tmonad(u),i=0,l=[];if(o.stop)return o;"string"!==o.type&&(o=t.ToString(o));var s=c.Map(function(t,r){var a="";return(r+1)%e==0&&0!==r?(a=""+t+n,l.push({start:i,end:i+(1+n.length),input:t,length:1+n.length,result:a,added:n}),i+=n.length):(a=t,i+=1),a}),f=a.default(t.Split(""),s,c.Join(""))(o);return f.stringChanges=f.stringChanges.concat(l),f.valid="string"==typeof f.value&&14===f.value.length,f.instanceof.push("AfterEveryNth"),f}},t.BeforeEveryNth=function(e,n){return function(u){var o=r.Tmonad(u),i=0,l=[];if(o.stop)return o;"string"!==o.type&&(o=t.ToString(o));var s=c.Map(function(t,r){var a="";return(r+1)%e==0&&0!==r?(a=""+n+t,l.push({start:i,end:i+(1+n.length),input:t,length:1+n.length,result:a,added:n}),i+=n.length):(a=t,i+=1),a}),f=a.default(t.Split(""),s,c.Join(""))(o);return f.stringChanges=f.stringChanges.concat(l),f.valid="string"==typeof f.value&&14===f.value.length,f.instanceof.push("BeforeEveryNth"),f}},t.Match=function(e){return function(n){var a=r.Tmonad(n);if(a.stop)return a;"string"!==a.type&&(a=t.ToString(a));var u=s.MatchMeta(a.value,e,!0);return a.value=u.value,a.valid=1===a.value.length,a.stringChanges=a.stringChanges.concat(u.stringChanges),a.instanceof.push("Match"),a}},t.MatchAll=function(e){return function(n){var a=r.Tmonad(n);if(a.stop)return a;"string"!==a.type&&(a=t.ToString(a));var u=s.MatchMeta(a.value,e);return a.value=u.value,a.valid=a.value.length>0,a.stringChanges=a.stringChanges.concat(u.stringChanges),a.instanceof.push("MatchAll"),a}},t.UpperCase=function(e){var t=e;try{t.value=t.value.toUpperCase()}catch(e){t.valid=!1}return t.instanceof.push("UpperCase"),t},t.Capitalize=function(e){var t=e;try{t.value=""+t.value.slice(0,1).toUpperCase()+(t.value.slice(1)||"")}catch(e){t.valid=!1}return t.instanceof.push("Capitalize"),t},t.LowerCase=function(e){var t=e;try{t.value=t.value.toLowerCase()}catch(e){t.valid=!1}return t.instanceof.push("LowerCase"),t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t){return e.reduce(function(e,t){return"function"!=typeof t?e:t(e)},t)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(19);t.isAnyEmpty=r.default;var a=n(10);t.isDate=a.default;var u=n(9);t.isDom=u.default;var o=n(13);t.isEmpty=o.default;var i=n(12);t.Type=i.default;var l=n(11);t.isObject=l.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(3);t.IfInvalid=function(e){return function(t){var n=r.Tmonad(t);return n.stop||n.valid?n:(n.instanceof.push("IfInvalid"),Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])}))}},t.IfValid=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfValid"),n.stop||!n.valid?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.IfEmpty=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfEmpty"),n.stop||a.isEmpty(n.value)?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.IfNotEmpty=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfNotEmpty"),n.stop||!a.isEmpty(n.value)?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.StopIfInvalid=function(e){var t=r.Tmonad(e);return t.valid||(t.stop=!0),t.instanceof.push("StopIfInvalid"),t},t.StopIfValid=function(e){var t=r.Tmonad(e);return t.valid&&(t.stop=!0),t.instanceof.push("StopIfValid"),t},t.StopIfEmpty=function(e){var t=r.Tmonad(e);return a.isEmpty(t.value)&&(t.stop=!0),t.instanceof.push("StopIfEmpty"),t},t.IfNot=function(e,t){return function(n){var a=r.Tmonad(n);if(e=r.Tmonad(e),a.valid=a.value===e.value,!a.valid){var u=r.Tmonad(t);return u.instanceof.push("IfNot"),u}return a.instanceof.push("IfNot"),a}},t.IfIs=function(e,t){return function(n){var a=r.Tmonad(n);return e=r.Tmonad(e),a.valid=a.value===e.value,a.value===e.value&&(a.value=r.Tmonad(t).value,a=r.Tmonad(a.value)),a.instanceof.push("IfIs"),a}},t.UseIf=function(e,t,n){return r.Tmonad(e(n)?n:t(n))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.ToEntities=function(e){var t=r.Tmonad(e);return t.stop?t:("string"===t.type?(t.value=t.value.replace(/\&/g,"&amp;").replace(/\>/g,"&gt;").replace(/\</g,"&lt;").replace(/"/g,"&quot;").replace(/`/g,"&apos;"),t.valid=!0):t.valid=!1,t.instanceof.push("ToEntities"),t)},t.FromEntities=function(e){var t=r.Tmonad(e);return t.stop?t:("string"===t.type?(t.value=t.value.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g,'"').replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g,"'"),t.valid=!0):t.valid=!1,t.instanceof.push("FromEntities"),t)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(2),u=n(18),o=n(1),i=n(4),l=n(3),s=n(8);t.ToArray=function(e){var t=r.Tmonad(e);if(t.stop)return e;var n=Array.isArray(t.value)?t:i.UseIf(function(e){return"array"===e.type},function(e){return e},a.default(o.ToPlainText,u.FromJSON)(e));return n.type=l.Type(n.value),n.valid="array"===n.type,n.instanceof.push("ToArray"),n},t.ForceToArray=function(e){var n=t.ToArray(e);if(n.stop)return n;var r=i.UseIf(function(e){return!(Array.isArray(e)&&e.length)},function(e){return void 0===e?void 0:[e]},n.value).value;return n.value=r,n.instanceof.push("ForceToArray"),n.valid=Array.isArray(n.value),n},t.Join=function(e){return function(t){var n=r.Tmonad(t);if(n.stop)return n;var a=s.JoinMeta(n.value,e);return n.value=a.value,n.stringChanges=n.stringChanges.concat(a.stringChanges),n.valid="string"==typeof n.value,r.finishTMonad(n,"string","Join")}},t.Map=function(e){return function(n){var u=r.Tmonad(n);if(u.stop)return u;return r.finishTMonad(a.default(t.ToArray,i.StopIfInvalid,function(t){return"array"!==l.Type(t.value)?(t.valid=!1,t):(t.value=t.value.map(e),t)})(u),"array","Map")}},t.Filter=function(e){return function(n){var u=r.Tmonad(n);if(u.stop)return u;return r.finishTMonad(a.default(t.ToArray,i.StopIfInvalid,function(t){return t.value=t.value.filter(e),t})(u),"array","Filter")}},t.IndexOf=function(e){return function(n){var a=r.Tmonad(n);if(a.stop)return a;var u=t.ToArray(e);return u.valid?(a.valid=u.value.indexOf(a.value)>-1,a.instanceof.push("IndexOf"),a):(a.valid=!1,a)}},t.Slice=function(e,t){return function(n){var a=r.Tmonad(n);if(a.stop)return a;try{var u=a.value.slice();a.value=u.slice(e,t),"string"==typeof u&&(0!==e&&a.stringChanges.push({start:0,end:e,input:u,length:e,result:u.slice(0,e),removed:u.slice(0,e)}),t<u.length&&a.stringChanges.push({start:t,end:u.length,input:u,length:u.length-t,result:u.slice(t),removed:u.slice(t)}))}catch(e){a.valid=!1}return a.instanceof.push("Slice"),a}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(3),u=n(8),o=n(1);t.ToNumber=function(e){var t=r.Tmonad(e);return t.stop?t:("string"!==t.type||a.isEmpty(t.value)||(t.value=parseFloat(t.value)),t.type=a.Type(t.value),t.instanceof.push("ToNumber"),t.valid=!isNaN(t.value),t)},t.ToDigits=function(e){var t=r.Tmonad(e);if(t.stop)return t;"string"!==t.type&&(t=o.ToString(t));try{var n=u.RemoveMeta(t.value,/[^\d]+/g);t.stringChanges=t.stringChanges.concat(n.stringChanges),t.value=n.value.toString(),t.valid=!!t.value}catch(e){t.valid=!1}return t.type=a.Type(t.value),t.instanceof.push("ToDigits"),t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(24),a=n(1);t.MatchMeta=function(e,t,n){void 0===n&&(n=!1);var u=[],o=[],i="string"==typeof e?e:a.ToString(e).value,l=function(){return o[o.length-1]},s=!1;i.replace(r.ToRegex(t).value,function(){if(!n||!s){s=!0;var e=[].slice.call(arguments,0);if(""!==e[0]){var t=e.splice(-2);e.index=t[0],e.input=t[1];var r=l(),a=e[0].length,i={start:e.index,end:e.index+a,input:e.input,length:a,result:e[0],removed:void 0};i.start&&r&&r.end!==i.start?i.removed=i.input.slice(r.end,i.start):delete i.removed,u.push(i.result),o.push(i)}}});var c=l();if(c.end<i.length){var f=i.slice(c.end);o.push({start:c.end,end:i.length,input:i,length:i.length-c.end,result:f,removed:f})}return{value:u,stringChanges:o}},t.ReplaceMeta=function(e,t,n){for(var a,u=r.ReplacementPattern(n),o={value:e.toString(),stringChanges:[]},i=o.value,l=0;null!==(a=r.ToRegex(t).value.exec(i));){var s=a.index+a[0].length,c={start:a.index,end:s,input:a.input,length:a[0].length,result:"",removed:a[0],pre:"",post:"",index:l};c.pre=0!==c.start?i.slice(0,c.start):"",c.post=i.slice(s),c.result=""+c.pre+c.post,a.length>1&&u.length&&(c.added=u.reduce(function(e,t){return"string"==typeof t?""+e+t:""+e+(a[t.index]||"")},""),c.length=c.added.length,c.end=a.index+c.length,c.result=""+c.pre+(c.added||"")+c.post),o.stringChanges.push(c),i=c.post,l+=1}return o.stringChanges.length&&(o.value=o.stringChanges.reduce(function(e,t,n){var r=t.added||"",a=n!==o.stringChanges.length-1?"":t.post;return""+e+t.pre+r+a},"")),o},t.RemoveMeta=function(e,t){for(var n,a={value:e.toString(),stringChanges:[]};null!==(n=r.ToRegex(t).value.exec(a.value));){var u={start:n.index,end:n.index+n[0].length,input:n.input,length:n[0].length,result:"",removed:n[0]},o=0!==u.start?a.value.slice(0,u.start):"",i=a.value.slice(u.end);u.result=""+o+i,a.stringChanges.push(u),a.value=u.result}return a},t.SplitMeta=function(e,t){var n;void 0===t&&(t="");var a=[],u={value:e,stringChanges:[]};try{if(!e||!t&&""!==t)return u;t=r.ToRegex(t).value;var o=u.value.toString();if("/(?:)/"===t.toString())return{value:o.split(""),stringChanges:[]};for(;null!==(n=r.ToRegex(t).value.exec(o));){var i=n.toString().length,l={start:n.index,end:n.index+i,input:n.input,length:i,result:[],removed:n[0]},s=0!==l.start?o.slice(0,l.start):"",c=o.slice(l.end);l.result=[s,c],u.stringChanges.push(l),a.push(s),o=c}a.push(o),u.value=a.filter(function(e){return!!e})}catch(e){}return u},t.JoinMeta=function(e,t){var n={value:e,stringChanges:[]};if(!t)return n.value=n.value.join(t),n;try{for(var r=1,a=n.value[r]||"";r<n.value.length;)n.stringChanges.push({start:a.length,end:a.length+t.length,input:n.value[r],length:t.length,result:"",added:t}),a=""+a+t+n.value[r],r+=1;n.value=a}catch(e){}return n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return e instanceof Element||e instanceof Node}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e;try{t=new Date(Date.parse(e))}catch(e){return!1}return"Invalid Date"!==t&&!isNaN(t)&&t instanceof Date}},function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return r(e).indexOf("object")>-1}},function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0});var a=["string","number","null","undefined","function"],u=n(9),o=n(10),i=n(11);t.default=function(e){return null===e?null:(t=e,a.indexOf(r(t))>-1?r(e):u.default(e)?"dom":Array.isArray(e)?"array":o.default(e)?"date":i.default(e)?"object":r(e));var t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(12);t.default=function(e){var t=r.default(e);return""===e||"undefined"===t||null==t||"array"===t&&0===e.length||"object"===t&&0===Object.keys(e).length}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(3);t.doURI=function(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);var u=r.Tmonad(e);if(u.stop)return u;try{u.value=t?n?encodeURIComponent(u.value):encodeURI(u.value):n?decodeURIComponent(u.value):decodeURI(u.value)}catch(e){u.valid=!1}return u.type=a.Type(u.value),u.instanceof.push(t?"encodeUri":"decodeUri"),u},t.EncodeUri=function(e){return t.doURI(e,!0)},t.DecodeUri=function(e){return t.doURI(e)},t.EncodeUriComponent=function(e){return t.doURI(e,!0,!0)},t.DecodeUriComponent=function(e){return t.doURI(e,!1,!0)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t,n){if(void 0===e&&(e={}),void 0===t&&(t=""),void 0===n&&(n=void 0),!e)return n;var r=[e];t&&t.toString().split&&(r=[e].concat(t.toString().split(".")));var a=r.reduce(function(e,t){if(void 0===e)return n;if(-1===t.indexOf(".")&&t.indexOf("(")>-1){var r=/\((.*?)\)/g.exec(t),a=(r?r[1]:"").split(",").map(function(e){return e.trim()}),u=t.split("(")[0];if("function"==typeof e[u])return e[u].apply(e,a)}return null!=e&&t?e[t]:e});return void 0===a?n:a}},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(3),u=n(14);t.FromJSON=function(e){var t=r.Tmonad(e);if(t.stop)return t;try{t.value=JSON.parse(u.DecodeUriComponent(t.value).value),t.valid=!0}catch(e){t.valid=!1}return t.type=a.Type(t.value),t.instanceof.push("FromJSON"),["object","array"].indexOf(t.type)>-1&&(t.valid=!0),t},t.ToJSON=function(e){var n=t.FromJSON(e);if(n.stop)return n;try{n.value=JSON.stringify(n.value),n.valid=!0}catch(e){n.valid=!1}return n.type=a.Type(n.value),n.instanceof.push("ToJSON"),n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(13);t.default=function(e){return r.default(e)||"false"===e||"undefined"===e||"null"===e}},,,,,function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),u=n(1),o=n(7),i=n(2);t.ReplacementPattern=function(e){if(!e)return[];var t=u.ToString(e).value,n=t.match(/(\$\d+)+/g)||[],r=t.split(new RegExp("["+n.join("|")+"]")),a=n?n.map(function(e){return i.default(o.ToDigits,o.ToNumber)(e).value}):[],l=[];return r.forEach(function(e,t){if(""!==e)l.push(e);else if(0===t||t===r.length-1){var n=a.shift();return l.push({index:n,original:"$"+n})}}),l},t.ToRegex=function(e){var t=a.Tmonad(e);if(t.value){if("function"!=typeof t.value.split&&"object"===r(t.value))t.value=new RegExp(t.value);else if("string"==typeof t.value)if(0===t.value.indexOf("/")){var n=t.value.split("/").filter(function(e){return!!e}),u=n.pop();u.match(/[^gmisuy]/)&&(n.push(u),u=void 0),t.value=new RegExp(n.join("/"),u)}else t.value=new RegExp(t.value)}else t.value=new RegExp("");return t.valid=!0,t.instanceof.push("ToRegex"),t.type="object",t}}])});