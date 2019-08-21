!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.builtjs=t():e.builtjs=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);t.isTMonad=function(e){return!!e&&e.hasOwnProperty("valid")&&"boolean"===r.getType(e.valid)&&e.hasOwnProperty("instanceof")&&"array"===r.getType(e.instanceof)&&e.hasOwnProperty("type")&&"string"===r.getType(e.type)&&e.hasOwnProperty("value")},t.Tmonad=function(e){return t.isTMonad(e)?{valid:e.valid,value:e.value,type:r.getType(e.value),stringChanges:e.stringChanges,instanceof:e.instanceof,stop:e.stop}:{valid:!0,value:e,type:r.getType(e),stringChanges:[],instanceof:[],stop:!1}},t.finishTMonad=function(e,t,n){return e.type=r.getType(e.value),e.valid="?"===t||e.type===t,e.instanceof.push(n),e}},function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.primitives=["string","number","null","undefined","function"],t.isDom=function(e){return e instanceof Element||e instanceof Node},t.isString=function(e){return"string"==typeof e},t.isPrimitive=function(e){return t.primitives.indexOf(r(e))>-1},t.isArray=function(e){return Array.isArray(e)},t.isDate=function(e){var t=e;try{t=new Date(Date.parse(e))}catch(e){return!1}return"Invalid Date"!==t&&!isNaN(t)&&t instanceof Date},t.isObject=function(e){return r(e).indexOf("object")>-1},t.empty=function(e){var n=t.getType(e);return""===e||"undefined"===n||null==n||"array"===n&&0===e.length||"object"===n&&0===Object.keys(e).length},t.anyEmpty=function(e){return t.empty(e)||"false"===e||"undefined"===e||"null"===e},t.getType=function(e){return null===e?null:t.isPrimitive(e)?r(e):t.isDom(e)?"dom":t.isArray(e)?"array":t.isDate(e)?"date":t.isObject(e)?"object":r(e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t){return e.reduce(function(e,t){return"function"!=typeof t?e:t(e)},t)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(2),i=n(8),o=n(12),u=n(10),s=n(4),l=n(6),c=n(5);t.Trim=function(e){if(u.default(e,"stop",!1))return r.Tmonad(e);var t=r.Tmonad(e);try{t.value=t.value.trim()}catch(e){}return t.instanceof.push("Trim"),t},t.ToPlainText=function(e){var n=r.Tmonad(e);return n.stop?n:(n="string"!==n.type?a.default(t.ToString,s.StopIfInvalid,i.DecodeUriComponent,o.FromEntities)(n):a.default(i.DecodeUriComponent,o.FromEntities)(n),r.finishTMonad(n,"string","ToPlainText"))},t.ToString=function(e){if(u.default(e,"stop",!1))return r.Tmonad(e);var t=r.Tmonad(e);try{t.value=t.value.toString()}catch(e){}return t.valid="string"==typeof t.value,t.instanceof.push("ToString"),t},t.Split=function(e){return function(n){var a=r.Tmonad(n);if(a.stop)return a;"string"!==a.type&&(a=t.ToString(a));try{var i=l.SplitMeta(a.value,e);if("string"==typeof i.value)throw new Error("not array");a.stringChanges=a.stringChanges.concat(i.stringChanges),a.value=i.value}catch(e){a.valid=!1}return r.finishTMonad(a,"array","Split")}},t.Replace=function(e,n){return function(a){var i=r.Tmonad(a);if(i.stop)return i;"string"!==i.type&&(i=t.ToString(i));try{var o=l.ReplaceMeta(i.value,e,n);i.value=o.value,i.valid=!0,i.stringChanges=i.stringChanges.concat(o.stringChanges)}catch(e){i.valid=!1}return r.finishTMonad(i,"string","Replace")}},t.AfterEveryNth=function(e,n){return function(i){var o=r.Tmonad(i),u=0,s=[];if(o.stop)return o;"string"!==o.type&&(o=t.ToString(o));var l=c.Map(function(t,r){var a="";return(r+1)%e==0&&0!==r?(a=""+t+n,s.push({start:u,end:u+(1+n.length),input:t,length:1+n.length,result:a,added:n}),u+=n.length):(a=t,u+=1),a}),f=a.default(t.Split(""),l,c.Join(""))(o);return f.stringChanges=f.stringChanges.concat(s),f.valid="string"==typeof f.value&&14===f.value.length,f.instanceof.push("AfterEveryNth"),f}},t.BeforeEveryNth=function(e,n){return function(i){var o=r.Tmonad(i),u=0,s=[];if(o.stop)return o;"string"!==o.type&&(o=t.ToString(o));var l=c.Map(function(t,r){var a="";return(r+1)%e==0&&0!==r?(a=""+n+t,s.push({start:u,end:u+(1+n.length),input:t,length:1+n.length,result:a,added:n}),u+=n.length):(a=t,u+=1),a}),f=a.default(t.Split(""),l,c.Join(""))(o);return f.stringChanges=f.stringChanges.concat(s),f.valid="string"==typeof f.value&&14===f.value.length,f.instanceof.push("BeforeEveryNth"),f}},t.Match=function(e){return function(n){var a=r.Tmonad(n);if(a.stop)return a;"string"!==a.type&&(a=t.ToString(a));var i=l.MatchMeta(a.value,e,!0);return a.value=i.value,a.valid=1===a.value.length,a.stringChanges=a.stringChanges.concat(i.stringChanges),a.instanceof.push("Match"),a}},t.MatchAll=function(e){return function(n){var a=r.Tmonad(n);if(a.stop)return a;"string"!==a.type&&(a=t.ToString(a));var i=l.MatchMeta(a.value,e);return a.value=i.value,a.valid=a.value.length>0,a.stringChanges=a.stringChanges.concat(i.stringChanges),a.instanceof.push("MatchAll"),a}},t.UpperCase=function(e){var t=e;try{t.value=t.value.toUpperCase()}catch(e){t.valid=!1}return t.instanceof.push("UpperCase"),t},t.Capitalize=function(e){var t=e;try{t.value=""+t.value.slice(0,1).toUpperCase()+(t.value.slice(1)||"")}catch(e){t.valid=!1}return t.instanceof.push("Capitalize"),t},t.LowerCase=function(e){var t=e;try{t.value=t.value.toLowerCase()}catch(e){t.valid=!1}return t.instanceof.push("LowerCase"),t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(1);t.IfInvalid=function(e){return function(t){var n=r.Tmonad(t);return n.stop||n.valid?n:(n.instanceof.push("IfInvalid"),Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])}))}},t.IfValid=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfValid"),n.stop||!n.valid?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.IfEmpty=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfEmpty"),n.stop||a.empty(n.value)?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.IfNotEmpty=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfNotEmpty"),n.stop||!a.empty(n.value)?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.StopIfInvalid=function(e){var t=r.Tmonad(e);return t.valid||(t.stop=!0),t.instanceof.push("StopIfInvalid"),t},t.StopIfValid=function(e){var t=r.Tmonad(e);return t.valid&&(t.stop=!0),t.instanceof.push("StopIfValid"),t},t.StopIfEmpty=function(e){var t=r.Tmonad(e);return a.empty(t.value)&&(t.stop=!0),t.instanceof.push("StopIfEmpty"),t},t.IfNot=function(e,t){return function(n){var a=r.Tmonad(n);if(e=r.Tmonad(e),a.valid=a.value===e.value,!a.valid){var i=r.Tmonad(t);return i.instanceof.push("IfNot"),i}return a.instanceof.push("IfNot"),a}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(2),i=n(14),o=n(3),u=n(4),s=n(1),l=n(6);t.ToArray=function(e){var t=r.Tmonad(e),n={};return t.stop?t:(n="string"===t.type?a.default(o.ToPlainText,i.FromJSON)(t):t,r.finishTMonad(n,"array","ToArray"))},t.Join=function(e){return function(t){var n=r.Tmonad(t);if(n.stop)return n;var a=l.JoinMeta(n.value,e);return n.value=a.value,n.stringChanges=n.stringChanges.concat(a.stringChanges),n.valid="string"==typeof n.value,r.finishTMonad(n,"string","Join")}},t.Map=function(e){return function(n){var i=r.Tmonad(n);if(i.stop)return i;return r.finishTMonad(a.default(t.ToArray,u.StopIfInvalid,function(t){return"array"!==s.getType(t.value)?(t.valid=!1,t):(t.value=t.value.map(e),t)})(i),"array","Map")}},t.Filter=function(e){return function(n){var i=r.Tmonad(n);if(i.stop)return i;return r.finishTMonad(a.default(t.ToArray,u.StopIfInvalid,function(t){return t.value=t.value.filter(e),t})(i),"array","Filter")}},t.IndexOf=function(e){return function(n){var a=r.Tmonad(n);if(a.stop)return a;var i=t.ToArray(e);return i.valid?(a.valid=i.value.indexOf(a.value)>-1,a.instanceof.push("IndexOf"),a):(a.valid=!1,a)}},t.Slice=function(e,t){return function(n){var a=r.Tmonad(n);if(a.stop)return a;try{var i=a.value.slice();a.value=i.slice(e,t),"string"==typeof i&&(0!==e&&a.stringChanges.push({start:0,end:e,input:i,length:e,result:i.slice(0,e),removed:i.slice(0,e)}),t<i.length&&a.stringChanges.push({start:t,end:i.length,input:i,length:i.length-t,result:i.slice(t),removed:i.slice(t)}))}catch(e){a.valid=!1}return a.instanceof.push("Slice"),a}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(16),a=n(3);t.MatchMeta=function(e,t,n){void 0===n&&(n=!1);var i=[],o=[],u="string"==typeof e?e:a.ToString(e).value,s=function(){return o[o.length-1]},l=!1;u.replace(r.ToRegex(t).value,function(){if(!n||!l){l=!0;var e=[].slice.call(arguments,0);if(""!==e[0]){var t=e.splice(-2);e.index=t[0],e.input=t[1];var r=s(),a=e[0].length,u={start:e.index,end:e.index+a,input:e.input,length:a,result:e[0],removed:void 0};u.start&&r&&r.end!==u.start?u.removed=u.input.slice(r.end,u.start):delete u.removed,i.push(u.result),o.push(u)}}});var c=s();if(c.end<u.length){var f=u.slice(c.end);o.push({start:c.end,end:u.length,input:u,length:u.length-c.end,result:f,removed:f})}return{value:i,stringChanges:o}},t.ReplaceMeta=function(e,t,n){for(var a,i=r.ReplacementPattern(n),o={value:e.toString(),stringChanges:[]},u=o.value,s=0;null!==(a=r.ToRegex(t).value.exec(u));){var l=a.index+a[0].length,c={start:a.index,end:l,input:a.input,length:a[0].length,result:"",removed:a[0],pre:"",post:"",index:s};c.pre=0!==c.start?u.slice(0,c.start):"",c.post=u.slice(l),c.result=""+c.pre+c.post,a.length>1&&i.length&&(c.added=i.reduce(function(e,t){return"string"==typeof t?""+e+t:""+e+(a[t.index]||"")},""),c.length=c.added.length,c.end=a.index+c.length,c.result=""+c.pre+(c.added||"")+c.post),o.stringChanges.push(c),u=c.post,s+=1}return o.stringChanges.length&&(o.value=o.stringChanges.reduce(function(e,t,n){var r=t.added||"",a=n!==o.stringChanges.length-1?"":t.post;return""+e+t.pre+r+a},"")),o},t.RemoveMeta=function(e,t){for(var n,a={value:e.toString(),stringChanges:[]};null!==(n=r.ToRegex(t).value.exec(a.value));){var i={start:n.index,end:n.index+n[0].length,input:n.input,length:n[0].length,result:"",removed:n[0]},o=0!==i.start?a.value.slice(0,i.start):"",u=a.value.slice(i.end);i.result=""+o+u,a.stringChanges.push(i),a.value=i.result}return a},t.SplitMeta=function(e,t){var n;void 0===t&&(t="");var a=[],i={value:e,stringChanges:[]};try{if(!e||!t&&""!==t)return i;t=r.ToRegex(t).value;var o=i.value.toString();if("/(?:)/"===t.toString())return{value:o.split(""),stringChanges:[]};for(;null!==(n=r.ToRegex(t).value.exec(o));){var u=n.toString().length,s={start:n.index,end:n.index+u,input:n.input,length:u,result:[],removed:n[0]},l=0!==s.start?o.slice(0,s.start):"",c=o.slice(s.end);s.result=[l,c],i.stringChanges.push(s),a.push(l),o=c}a.push(o),i.value=a.filter(function(e){return!!e})}catch(e){}return i},t.JoinMeta=function(e,t){var n={value:e,stringChanges:[]};if(!t)return n.value=n.value.join(t),n;try{for(var r=1,a=n.value[r]||"";r<n.value.length;)n.stringChanges.push({start:a.length,end:a.length+t.length,input:n.value[r],length:t.length,result:"",added:t}),a=""+a+t+n.value[r],r+=1;n.value=a}catch(e){}return n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(1),i=n(6),o=n(3);t.ToNumber=function(e){var t=r.Tmonad(e);return t.stop?t:("string"!==t.type||a.empty(t.value)||(t.value=parseFloat(t.value)),t.type=a.getType(t.value),t.instanceof.push("ToNumber"),t.valid=!isNaN(t.value),t)},t.ToDigits=function(e){var t=r.Tmonad(e);if(t.stop)return t;"string"!==t.type&&(t=o.ToString(t));try{var n=i.RemoveMeta(t.value,/[^\d]+/g);t.stringChanges=t.stringChanges.concat(n.stringChanges),t.value=n.value.toString(),t.valid=!!t.value}catch(e){t.valid=!1}return t.type=a.getType(t.value),t.instanceof.push("ToDigits"),t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(1);t.doURI=function(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);var i=r.Tmonad(e);if(i.stop)return i;try{i.value=t?n?encodeURIComponent(i.value):encodeURI(i.value):n?decodeURIComponent(i.value):decodeURI(i.value)}catch(e){i.valid=!1}return i.type=a.getType(i.value),i.instanceof.push(t?"encodeUri":"decodeUri"),i},t.EncodeUri=function(e){return t.doURI(e,!0)},t.DecodeUri=function(e){return t.doURI(e)},t.EncodeUriComponent=function(e){return t.doURI(e,!0,!0)},t.DecodeUriComponent=function(e){return t.doURI(e,!1,!0)}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t,n){if(void 0===e&&(e={}),void 0===t&&(t=""),void 0===n&&(n=void 0),!e)return n;var r=[e];t&&t.toString().split&&(r=[e].concat(t.toString().split(".")));var a=r.reduce(function(e,t){if(void 0===e)return n;if(-1===t.indexOf(".")&&t.indexOf("(")>-1){var r=/\((.*?)\)/g.exec(t),a=(r?r[1]:"").split(",").map(function(e){return e.trim()}),i=t.split("(")[0];if("function"==typeof e[i])return e[i].apply(e,a)}return t?e[t]:e});return void 0===a?n:a}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.ToEntities=function(e){var t=r.Tmonad(e);return t.stop?t:("string"===t.type?(t.value=t.value.replace(/\&/g,"&amp;").replace(/\>/g,"&gt;").replace(/\</g,"&lt;").replace(/"/g,"&quot;").replace(/`/g,"&apos;"),t.valid=!0):t.valid=!1,t.instanceof.push("ToEntities"),t)},t.FromEntities=function(e){var t=r.Tmonad(e);return t.stop?t:("string"===t.type?(t.value=t.value.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g,'"').replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g,"'"),t.valid=!0):t.valid=!1,t.instanceof.push("FromEntities"),t)}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(1),i=n(8);t.FromJSON=function(e){var t=r.Tmonad(e);if(t.stop)return t;try{t.value=JSON.parse(i.DecodeUriComponent(t.value).value),t.valid=!0}catch(e){t.valid=!1}return t.type=a.getType(t.value),t.instanceof.push("FromJSON"),["object","array"].indexOf(t.type)>-1&&(t.valid=!0),t},t.ToJSON=function(e){var n=t.FromJSON(e);if(n.stop)return n;try{n.value=JSON.stringify(n.value),n.valid=!0}catch(e){n.valid=!1}return n.type=a.getType(n.value),n.instanceof.push("ToJSON"),n}},,function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),i=n(3),o=n(7),u=n(2);t.ReplacementPattern=function(e){if(!e)return[];var t=i.ToString(e).value,n=t.match(/(\$\d+)+/g)||[],r=t.split(new RegExp("["+n.join("|")+"]")),a=n?n.map(function(e){return u.default(o.ToDigits,o.ToNumber)(e).value}):[],s=[];return r.forEach(function(e,t){if(""!==e)s.push(e);else if(0===t||t===r.length-1){var n=a.shift();return s.push({index:n,original:"$"+n})}}),s},t.ToRegex=function(e){var t=a.Tmonad(e);if(t.value){if("function"!=typeof t.value.split&&"object"===r(t.value))t.value=new RegExp(t.value);else if("string"==typeof t.value)if(0===t.value.indexOf("/")){var n=t.value.split("/").filter(function(e){return!!e}),i=n.pop();i.match(/[^gmisuy]/)&&(n.push(i),i=void 0),t.value=new RegExp(n.join("/"),i)}else t.value=new RegExp(t.value)}else t.value=new RegExp("");return t.valid=!0,t.instanceof.push("ToRegex"),t.type="object",t}}])});