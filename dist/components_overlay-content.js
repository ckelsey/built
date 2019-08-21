!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.builtjs=t():e.builtjs=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=61)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);t.isTMonad=function(e){return!!e&&e.hasOwnProperty("valid")&&"boolean"===r.getType(e.valid)&&e.hasOwnProperty("instanceof")&&"array"===r.getType(e.instanceof)&&e.hasOwnProperty("type")&&"string"===r.getType(e.type)&&e.hasOwnProperty("value")},t.Tmonad=function(e){return t.isTMonad(e)?{valid:e.valid,value:e.value,type:r.getType(e.value),stringChanges:e.stringChanges,instanceof:e.instanceof,stop:e.stop}:{valid:!0,value:e,type:r.getType(e),stringChanges:[],instanceof:[],stop:!1}},t.finishTMonad=function(e,t,n){return e.type=r.getType(e.value),e.valid="?"===t||e.type===t,e.instanceof.push(n),e}},function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.primitives=["string","number","null","undefined","function"],t.isDom=function(e){return e instanceof Element||e instanceof Node},t.isString=function(e){return"string"==typeof e},t.isPrimitive=function(e){return t.primitives.indexOf(r(e))>-1},t.isArray=function(e){return Array.isArray(e)},t.isDate=function(e){var t=e;try{t=new Date(Date.parse(e))}catch(e){return!1}return"Invalid Date"!==t&&!isNaN(t)&&t instanceof Date},t.isObject=function(e){return r(e).indexOf("object")>-1},t.empty=function(e){var n=t.getType(e);return""===e||"undefined"===n||null==n||"array"===n&&0===e.length||"object"===n&&0===Object.keys(e).length},t.anyEmpty=function(e){return t.empty(e)||"false"===e||"undefined"===e||"null"===e},t.getType=function(e){return null===e?null:t.isPrimitive(e)?r(e):t.isDom(e)?"dom":t.isArray(e)?"array":t.isDate(e)?"date":t.isObject(e)?"object":r(e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t){return e.reduce(function(e,t){return"function"!=typeof t?e:t(e)},t)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(2),i=n(8),a=n(12),u=n(10),s=n(4),c=n(6),l=n(5);t.Trim=function(e){if(u.default(e,"stop",!1))return r.Tmonad(e);var t=r.Tmonad(e);try{t.value=t.value.trim()}catch(e){}return t.instanceof.push("Trim"),t},t.ToPlainText=function(e){var n=r.Tmonad(e);return n.stop?n:(n="string"!==n.type?o.default(t.ToString,s.StopIfInvalid,i.DecodeUriComponent,a.FromEntities)(n):o.default(i.DecodeUriComponent,a.FromEntities)(n),r.finishTMonad(n,"string","ToPlainText"))},t.ToString=function(e){if(u.default(e,"stop",!1))return r.Tmonad(e);var t=r.Tmonad(e);try{t.value=t.value.toString()}catch(e){}return t.valid="string"==typeof t.value,t.instanceof.push("ToString"),t},t.Split=function(e){return function(n){var o=r.Tmonad(n);if(o.stop)return o;"string"!==o.type&&(o=t.ToString(o));try{var i=c.SplitMeta(o.value,e);if("string"==typeof i.value)throw new Error("not array");o.stringChanges=o.stringChanges.concat(i.stringChanges),o.value=i.value}catch(e){o.valid=!1}return r.finishTMonad(o,"array","Split")}},t.Replace=function(e,n){return function(o){var i=r.Tmonad(o);if(i.stop)return i;"string"!==i.type&&(i=t.ToString(i));try{var a=c.ReplaceMeta(i.value,e,n);i.value=a.value,i.valid=!0,i.stringChanges=i.stringChanges.concat(a.stringChanges)}catch(e){i.valid=!1}return r.finishTMonad(i,"string","Replace")}},t.AfterEveryNth=function(e,n){return function(i){var a=r.Tmonad(i),u=0,s=[];if(a.stop)return a;"string"!==a.type&&(a=t.ToString(a));var c=l.Map(function(t,r){var o="";return(r+1)%e==0&&0!==r?(o=""+t+n,s.push({start:u,end:u+(1+n.length),input:t,length:1+n.length,result:o,added:n}),u+=n.length):(o=t,u+=1),o}),f=o.default(t.Split(""),c,l.Join(""))(a);return f.stringChanges=f.stringChanges.concat(s),f.valid="string"==typeof f.value&&14===f.value.length,f.instanceof.push("AfterEveryNth"),f}},t.BeforeEveryNth=function(e,n){return function(i){var a=r.Tmonad(i),u=0,s=[];if(a.stop)return a;"string"!==a.type&&(a=t.ToString(a));var c=l.Map(function(t,r){var o="";return(r+1)%e==0&&0!==r?(o=""+n+t,s.push({start:u,end:u+(1+n.length),input:t,length:1+n.length,result:o,added:n}),u+=n.length):(o=t,u+=1),o}),f=o.default(t.Split(""),c,l.Join(""))(a);return f.stringChanges=f.stringChanges.concat(s),f.valid="string"==typeof f.value&&14===f.value.length,f.instanceof.push("BeforeEveryNth"),f}},t.Match=function(e){return function(n){var o=r.Tmonad(n);if(o.stop)return o;"string"!==o.type&&(o=t.ToString(o));var i=c.MatchMeta(o.value,e,!0);return o.value=i.value,o.valid=1===o.value.length,o.stringChanges=o.stringChanges.concat(i.stringChanges),o.instanceof.push("Match"),o}},t.MatchAll=function(e){return function(n){var o=r.Tmonad(n);if(o.stop)return o;"string"!==o.type&&(o=t.ToString(o));var i=c.MatchMeta(o.value,e);return o.value=i.value,o.valid=o.value.length>0,o.stringChanges=o.stringChanges.concat(i.stringChanges),o.instanceof.push("MatchAll"),o}},t.UpperCase=function(e){var t=e;try{t.value=t.value.toUpperCase()}catch(e){t.valid=!1}return t.instanceof.push("UpperCase"),t},t.Capitalize=function(e){var t=e;try{t.value=""+t.value.slice(0,1).toUpperCase()+(t.value.slice(1)||"")}catch(e){t.valid=!1}return t.instanceof.push("Capitalize"),t},t.LowerCase=function(e){var t=e;try{t.value=t.value.toLowerCase()}catch(e){t.valid=!1}return t.instanceof.push("LowerCase"),t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(1);t.IfInvalid=function(e){return function(t){var n=r.Tmonad(t);return n.stop||n.valid?n:(n.instanceof.push("IfInvalid"),Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])}))}},t.IfValid=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfValid"),n.stop||!n.valid?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.IfEmpty=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfEmpty"),n.stop||o.empty(n.value)?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.IfNotEmpty=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfNotEmpty"),n.stop||!o.empty(n.value)?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.StopIfInvalid=function(e){var t=r.Tmonad(e);return t.valid||(t.stop=!0),t.instanceof.push("StopIfInvalid"),t},t.StopIfValid=function(e){var t=r.Tmonad(e);return t.valid&&(t.stop=!0),t.instanceof.push("StopIfValid"),t},t.StopIfEmpty=function(e){var t=r.Tmonad(e);return o.empty(t.value)&&(t.stop=!0),t.instanceof.push("StopIfEmpty"),t},t.IfNot=function(e,t){return function(n){var o=r.Tmonad(n);if(e=r.Tmonad(e),o.valid=o.value===e.value,!o.valid){var i=r.Tmonad(t);return i.instanceof.push("IfNot"),i}return o.instanceof.push("IfNot"),o}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(2),i=n(14),a=n(3),u=n(4),s=n(1),c=n(6);t.ToArray=function(e){var t=r.Tmonad(e),n={};return t.stop?t:(n="string"===t.type?o.default(a.ToPlainText,i.FromJSON)(t):t,r.finishTMonad(n,"array","ToArray"))},t.Join=function(e){return function(t){var n=r.Tmonad(t);if(n.stop)return n;var o=c.JoinMeta(n.value,e);return n.value=o.value,n.stringChanges=n.stringChanges.concat(o.stringChanges),n.valid="string"==typeof n.value,r.finishTMonad(n,"string","Join")}},t.Map=function(e){return function(n){var i=r.Tmonad(n);if(i.stop)return i;return r.finishTMonad(o.default(t.ToArray,u.StopIfInvalid,function(t){return"array"!==s.getType(t.value)?(t.valid=!1,t):(t.value=t.value.map(e),t)})(i),"array","Map")}},t.Filter=function(e){return function(n){var i=r.Tmonad(n);if(i.stop)return i;return r.finishTMonad(o.default(t.ToArray,u.StopIfInvalid,function(t){return t.value=t.value.filter(e),t})(i),"array","Filter")}},t.IndexOf=function(e){return function(n){var o=r.Tmonad(n);if(o.stop)return o;var i=t.ToArray(e);return i.valid?(o.valid=i.value.indexOf(o.value)>-1,o.instanceof.push("IndexOf"),o):(o.valid=!1,o)}},t.Slice=function(e,t){return function(n){var o=r.Tmonad(n);if(o.stop)return o;try{var i=o.value.slice();o.value=i.slice(e,t),"string"==typeof i&&(0!==e&&o.stringChanges.push({start:0,end:e,input:i,length:e,result:i.slice(0,e),removed:i.slice(0,e)}),t<i.length&&o.stringChanges.push({start:t,end:i.length,input:i,length:i.length-t,result:i.slice(t),removed:i.slice(t)}))}catch(e){o.valid=!1}return o.instanceof.push("Slice"),o}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(16),o=n(3);t.MatchMeta=function(e,t,n){void 0===n&&(n=!1);var i=[],a=[],u="string"==typeof e?e:o.ToString(e).value,s=function(){return a[a.length-1]},c=!1;u.replace(r.ToRegex(t).value,function(){if(!n||!c){c=!0;var e=[].slice.call(arguments,0);if(""!==e[0]){var t=e.splice(-2);e.index=t[0],e.input=t[1];var r=s(),o=e[0].length,u={start:e.index,end:e.index+o,input:e.input,length:o,result:e[0],removed:void 0};u.start&&r&&r.end!==u.start?u.removed=u.input.slice(r.end,u.start):delete u.removed,i.push(u.result),a.push(u)}}});var l=s();if(l.end<u.length){var f=u.slice(l.end);a.push({start:l.end,end:u.length,input:u,length:u.length-l.end,result:f,removed:f})}return{value:i,stringChanges:a}},t.ReplaceMeta=function(e,t,n){for(var o,i=r.ReplacementPattern(n),a={value:e.toString(),stringChanges:[]},u=a.value,s=0;null!==(o=r.ToRegex(t).value.exec(u));){var c=o.index+o[0].length,l={start:o.index,end:c,input:o.input,length:o[0].length,result:"",removed:o[0],pre:"",post:"",index:s};l.pre=0!==l.start?u.slice(0,l.start):"",l.post=u.slice(c),l.result=""+l.pre+l.post,o.length>1&&i.length&&(l.added=i.reduce(function(e,t){return"string"==typeof t?""+e+t:""+e+(o[t.index]||"")},""),l.length=l.added.length,l.end=o.index+l.length,l.result=""+l.pre+(l.added||"")+l.post),a.stringChanges.push(l),u=l.post,s+=1}return a.stringChanges.length&&(a.value=a.stringChanges.reduce(function(e,t,n){var r=t.added||"",o=n!==a.stringChanges.length-1?"":t.post;return""+e+t.pre+r+o},"")),a},t.RemoveMeta=function(e,t){for(var n,o={value:e.toString(),stringChanges:[]};null!==(n=r.ToRegex(t).value.exec(o.value));){var i={start:n.index,end:n.index+n[0].length,input:n.input,length:n[0].length,result:"",removed:n[0]},a=0!==i.start?o.value.slice(0,i.start):"",u=o.value.slice(i.end);i.result=""+a+u,o.stringChanges.push(i),o.value=i.result}return o},t.SplitMeta=function(e,t){var n;void 0===t&&(t="");var o=[],i={value:e,stringChanges:[]};try{if(!e||!t&&""!==t)return i;t=r.ToRegex(t).value;var a=i.value.toString();if("/(?:)/"===t.toString())return{value:a.split(""),stringChanges:[]};for(;null!==(n=r.ToRegex(t).value.exec(a));){var u=n.toString().length,s={start:n.index,end:n.index+u,input:n.input,length:u,result:[],removed:n[0]},c=0!==s.start?a.slice(0,s.start):"",l=a.slice(s.end);s.result=[c,l],i.stringChanges.push(s),o.push(c),a=l}o.push(a),i.value=o.filter(function(e){return!!e})}catch(e){}return i},t.JoinMeta=function(e,t){var n={value:e,stringChanges:[]};if(!t)return n.value=n.value.join(t),n;try{for(var r=1,o=n.value[r]||"";r<n.value.length;)n.stringChanges.push({start:o.length,end:o.length+t.length,input:n.value[r],length:t.length,result:"",added:t}),o=""+o+t+n.value[r],r+=1;n.value=o}catch(e){}return n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(1),i=n(6),a=n(3);t.ToNumber=function(e){var t=r.Tmonad(e);return t.stop?t:("string"!==t.type||o.empty(t.value)||(t.value=parseFloat(t.value)),t.type=o.getType(t.value),t.instanceof.push("ToNumber"),t.valid=!isNaN(t.value),t)},t.ToDigits=function(e){var t=r.Tmonad(e);if(t.stop)return t;"string"!==t.type&&(t=a.ToString(t));try{var n=i.RemoveMeta(t.value,/[^\d]+/g);t.stringChanges=t.stringChanges.concat(n.stringChanges),t.value=n.value.toString(),t.valid=!!t.value}catch(e){t.valid=!1}return t.type=o.getType(t.value),t.instanceof.push("ToDigits"),t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(1);t.doURI=function(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);var i=r.Tmonad(e);if(i.stop)return i;try{i.value=t?n?encodeURIComponent(i.value):encodeURI(i.value):n?decodeURIComponent(i.value):decodeURI(i.value)}catch(e){i.valid=!1}return i.type=o.getType(i.value),i.instanceof.push(t?"encodeUri":"decodeUri"),i},t.EncodeUri=function(e){return t.doURI(e,!0)},t.DecodeUri=function(e){return t.doURI(e)},t.EncodeUriComponent=function(e){return t.doURI(e,!0,!0)},t.DecodeUriComponent=function(e){return t.doURI(e,!1,!0)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return void 0===e&&(e=""),(""+e+((new Date).getTime()/1e3|0).toString(16)+"xxxxxxxxxxxxxxxx").replace(/[x]/g,function(){return(16*Math.random()|0).toString(16)}).toLowerCase()}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t,n){if(void 0===e&&(e={}),void 0===t&&(t=""),void 0===n&&(n=void 0),!e)return n;var r=[e];t&&t.toString().split&&(r=[e].concat(t.toString().split(".")));var o=r.reduce(function(e,t){if(void 0===e)return n;if(-1===t.indexOf(".")&&t.indexOf("(")>-1){var r=/\((.*?)\)/g.exec(t),o=(r?r[1]:"").split(",").map(function(e){return e.trim()}),i=t.split("(")[0];if("function"==typeof e[i])return e[i].apply(e,o)}return t?e[t]:e});return void 0===o?n:o}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.ToEntities=function(e){var t=r.Tmonad(e);return t.stop?t:("string"===t.type?(t.value=t.value.replace(/\&/g,"&amp;").replace(/\>/g,"&gt;").replace(/\</g,"&lt;").replace(/"/g,"&quot;").replace(/`/g,"&apos;"),t.valid=!0):t.valid=!1,t.instanceof.push("ToEntities"),t)},t.FromEntities=function(e){var t=r.Tmonad(e);return t.stop?t:("string"===t.type?(t.value=t.value.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g,'"').replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g,"'"),t.valid=!0):t.valid=!1,t.instanceof.push("FromEntities"),t)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(1);t.ToBool=function(e){var t=r.Tmonad(e);if(t.stop)return t;switch(t.value){case"0":case 0:case"off":case"false":case!1:t.value=!1,t.valid=!0;break;case"1":case 1:case"on":case"true":case!0:t.value=!0,t.valid=!0;break;default:t.value=!1,t.valid=!1}return t.type=o.getType(t.value),t.instanceof.push("ToBool"),t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(1),i=n(8);t.FromJSON=function(e){var t=r.Tmonad(e);if(t.stop)return t;try{t.value=JSON.parse(i.DecodeUriComponent(t.value).value),t.valid=!0}catch(e){t.valid=!1}return t.type=o.getType(t.value),t.instanceof.push("FromJSON"),["object","array"].indexOf(t.type)>-1&&(t.valid=!0),t},t.ToJSON=function(e){var n=t.FromJSON(e);if(n.stop)return n;try{n.value=JSON.stringify(n.value),n.valid=!0}catch(e){n.valid=!1}return n.type=o.getType(n.value),n.instanceof.push("ToJSON"),n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(9);t.Observe=function(e,t){void 0===t&&(t=!1);var n=Object.assign({},{value:e,previousValue:void 0,updated:(new Date).getTime()}),o={},i={},a=function(e,t,n){void 0===n&&(n={}),Object.keys(o).forEach(function(r){var i=o[r][e];i&&"function"==typeof i&&i(t,n)}),Object.keys(i).forEach(function(r){"function"==typeof i[r]&&i[r](e,t,o,n)})};return{get value(){return n.value},get previous(){return n.previousValue},next:function(e){n=Object.assign({},{value:e,previousValue:n.value,updated:(new Date).getTime()}),a("next",n.value,n)},error:function(e){a("error",e,n)},complete:function(){a("complete",n)},tap:function(e){i[r.default()]=e},subscribe:function(e,a,u){var s=Object.assign({},{next:e,error:a,complete:u,id:r.default()});return o[s.id]=s,t||void 0===n.value||"function"!=typeof s.next||s.next(n.value,n),function(e){return function(){o[e.id]=null,delete o[e.id],Object.keys(i).forEach(function(t){"function"==typeof i[t]&&i[t]("unsubscribe",e,o,n)})}}(s)}}}},function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=n(3),a=n(7),u=n(2);t.ReplacementPattern=function(e){if(!e)return[];var t=i.ToString(e).value,n=t.match(/(\$\d+)+/g)||[],r=t.split(new RegExp("["+n.join("|")+"]")),o=n?n.map(function(e){return u.default(a.ToDigits,a.ToNumber)(e).value}):[],s=[];return r.forEach(function(e,t){if(""!==e)s.push(e);else if(0===t||t===r.length-1){var n=o.shift();return s.push({index:n,original:"$"+n})}}),s},t.ToRegex=function(e){var t=o.Tmonad(e);if(t.value){if("function"!=typeof t.value.split&&"object"===r(t.value))t.value=new RegExp(t.value);else if("string"==typeof t.value)if(0===t.value.indexOf("/")){var n=t.value.split("/").filter(function(e){return!!e}),i=n.pop();i.match(/[^gmisuy]/)&&(n.push(i),i=void 0),t.value=new RegExp(n.join("/"),i)}else t.value=new RegExp(t.value)}else t.value=new RegExp("");return t.valid=!0,t.instanceof.push("ToRegex"),t.type="object",t}},function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var i=n(22),a=n(23),u=n(15);t.Constructor=function(e){var t=e.componentName,n=e.observedAttributes||[],r=e.template||"<slot></slot>",s=e.style||"",c=e.componentRoot,l=e.properties,f=e.elements,p=e.methods,v=e.computed,d=e.getters,h=e.setters,g=e.onConnected,y=e.onDisconnected;if(t)return function(e){function m(){var t=e.call(this)||this;return t.state={},t.elements={},t.disconnectElements=function(){},t}return o(m,e),Object.defineProperty(m,"observedAttributes",{get:function(){return n},enumerable:!0,configurable:!0}),m.prototype.attributeChangedCallback=function(e,t,n){n!==t&&(this[e]=n)},m.prototype.connectedCallback=function(){var e=this;if(this.shadowRoot||i.Template(t,this,r,s,c),v&&Object.keys(v).forEach(function(t){Object.defineProperty(e,t,v[t](e))}),p&&Object.keys(p).forEach(function(t){return e[t]=p[t](e)}),f){var n=a.Elements(this,f);this.elements=n.state,this.disconnectElements=n.disconnect}l&&Object.keys(l).forEach(function(t){if("function"==typeof l[t].format){e.state[t]=u.Observe(l[t].format(e[t],e));try{Object.defineProperty(e,t,{get:function(){return d&&d[t]?d[t](this):this.state[t].value},set:function(e){if(this.state[t]){if(h&&h[t])return h[t](this)(e);var n=l[t].format(e,this);this.state[t].value!==n&&this.state[t].next(n)}}})}catch(e){}"function"==typeof l[t].onChange&&e.state[t].subscribe(function(n){l[t].onChange(n,e)})}}),g&&g(this)},m.prototype.disconnectedCallback=function(){var e=this;this.state&&Object.keys(this.state).forEach(function(t){e.state[t].complete()}),this.disconnectElements(),y&&y(this)},m}(HTMLElement)},t.Define=function(e,t){var n=window.WebComponents;n&&n.ready?window.customElements.get(e)||window.customElements.define(e,t):window.addEventListener("WebComponentsReady",function(){window.customElements.get(e)||window.customElements.define(e,t)})}},,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CSSRulesFromSelector=function(e){var t=Array.from(document.body.ownerDocument.styleSheets),n=[];return t.forEach(function(t){return Array.from(t.rules).forEach(function(t){return t.cssText.split("{")[0].trim().indexOf(e)>-1?n.push(t.cssText):void 0})}),n},t.AppendStyle=function(e,t,n){void 0===n&&(n="");var r=document.createElement("style");if(r.setAttribute("type","text/css"),r.setAttribute("name",n),r.style.display="none",t.appendChild(r),r.styleSheet)r.styleSheet.cssText=e;else{var o=document.createTextNode(e);r.appendChild(o)}},t.StyleRules=function(e){return e?e.replace("<style>","").replace("</style>",""):""}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(21);t.Template=function(e,t,n,o,i){var a=i?r.CSSRulesFromSelector(i).join(" "):"",u=""+r.StyleRules(o)+a,s=document.createElement("template");s.innerHTML=n,r.AppendStyle(u,s.content);var c=document.importNode(s.content,!0);t.attachShadow({mode:"open"}).appendChild(c),"registerElement"in document||document.head.querySelector('style[name="'+e+'"]')||r.AppendStyle(u,document.head,e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(15);t.unsubscribeEvents=function(e){e&&e.eventSubscriptions&&Object.keys(e.eventSubscriptions).forEach(function(t){e.eventSubscriptions[t]()})};t.Elements=function(e,n){var o={},i={};return Object.keys(n).forEach(function(a){o[a]=r.Observe(function(t){var r=e.shadowRoot.querySelectorAll(n[t].selector);return r.length>1?Array.from(r):r[0]}(a)),Object.defineProperty(i,a,{get:function(){return o[a].value},set:function(e){e!==o[a].value&&o[a].next(e)}}),o[a].subscribe(function(r){var i;t.unsubscribeEvents(o[a].previous),(i=o[a].previous)&&i.parentNode&&i.parentNode.removeChild(i),n[a].onChange(r,e)})}),{state:i,disconnect:function(){return Object.keys(o).forEach(function(e){o[e].complete()})}}}},,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GetCurve=function(e,t,n,r){void 0===t&&(t=.5),void 0===n&&(n=!1),void 0===r&&(r=16);var o,i,a,u,s,c,l,f,p,v,d,h,g,y=Array.isArray(e[0]),m=[],b=e.slice(0),T=b.slice(0);for(T=(b=y?b.concat.apply([],b):b.concat.apply([],b.map(function(e){return[e,e]}))).slice(0),n?(b.unshift(T[T.length-1]),b.unshift(T[T.length-2]),b.unshift(T[T.length-1]),b.unshift(T[T.length-2]),b.push(T[0]),b.push(T[1])):(b.unshift(T[1]),b.unshift(T[0]),b.push(b[T.length-2]),b.push(b[T.length-1])),g=2;g<b.length-4;g+=2)for(h=0;h<=r;h++)a=(b[g+2]-b[g-2])*t,u=(b[g+4]-b[g])*t,s=(b[g+3]-b[g-1])*t,c=(b[g+5]-b[g+1])*t,d=h/r,l=2*Math.pow(d,3)-3*Math.pow(d,2)+1,f=-2*Math.pow(d,3)+3*Math.pow(d,2),p=Math.pow(d,3)-2*Math.pow(d,2)+d,v=Math.pow(d,3)-Math.pow(d,2),o=l*b[g]+f*b[g+2]+p*a+v*u,i=l*b[g+1]+f*b[g+3]+p*s+v*c,m.push([o,i]);return y?m:m.map(function(e){return e[0]})}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),o=n(13),i=n(4),a=n(5),u=n(7),s=n(17),c=n(9),l=n(29),f=["center","left","right","top","bottom","center center","center top","center bottom","left center","left top","left bottom","right center","right top","right bottom"],p=n(76),v=n(77),d={},h=function(){},g={root:".overlay-content-container",contentContainer:".overlay-content-content-container",contentInner:".overlay-content-content-inner",inner:".overlay-content-container-inner"};Object.keys(g).forEach(function(e){d[e]={selector:g[e],onChange:function(){}}});var y={scrim:{format:function(e){return r.default(o.ToBool,i.IfInvalid(!1))(e).value}},target:{format:function(e){return e instanceof HTMLElement?e:null}},align:{format:function(e){return r.default(a.IndexOf(f),i.IfInvalid("center"))(e).value}},from:{format:function(e){return r.default(a.IndexOf(f),i.IfInvalid("center"))(e).value}},speed:{format:function(e){return r.default(u.ToNumber,i.IfInvalid(333))(e).value}},class:{format:function(e){return e}}},m=s.Constructor({componentName:"overlay-content",componentRoot:".overlay-content-container",template:p,style:v,observedAttributes:Object.keys(y),properties:Object.assign({positionTimer:{format:function(e){return e},onChange:h},showing:{format:function(e){return o.ToBool(e).value},onChange:h}},y),computed:{height:function(e){return{get:function(){return(e.isOnTop?e.spaceAbove:e.spaceBelow)-40}}},isOnTop:function(e){return{get:function(){return e.spaceAbove>e.spaceBelow}}},spaceAbove:function(e){return{get:function(){return e.target?e.target.getBoundingClientRect().top:0}}},spaceBelow:function(e){return{get:function(){return window.innerHeight-(e.spaceAbove+(e.target?e.target.getBoundingClientRect().height:0))}}},position:function(e){return{get:function(){if(!e.elements.contentContainer)return{top:0,y:0,bottom:0,left:0,x:0,right:0,width:0,height:0,scrollTop:0,scrollLeft:0};var t=e.elements.contentContainer.getBoundingClientRect();return{top:t.top,y:t.y,bottom:t.bottom,left:t.left,x:t.x,right:t.right,width:t.width,height:t.height,scrollTop:e.elements.contentContainer.scrollTop,scrollLeft:e.elements.contentContainer.scrollLeft}}}}},methods:{scrollContent:function(e){return function(t,n){e.elements.contentContainer.scrollTop=n,e.elements.contentContainer.scrollLeft=t}},show:function(e){return function(){if(!e.showing){e.showing=!0,function e(t){return function(){cancelAnimationFrame(t.positionTimer);var n=t.target;if(t.showing&&n){var r=n.getBoundingClientRect(),o=t.isOnTop;if(r.top-10>window.innerHeight||r.bottom+10<0)return t.hide();t.elements.contentContainer.style.width=r.width+"px",t.elements.contentContainer.style.height=t.height+"px",t.elements.contentContainer.style.left=r.left+"px",t.elements.contentContainer.style.top=(o?r.top-t.elements.contentContainer.offsetHeight:t.spaceAbove+r.height)+"px";var i="center "+(o?"bottom":"top");t.elements.contentContainer.style.transformOrigin=""+i,t.elements.contentInner.classList.contains("bottom")&&o&&t.elements.contentInner.classList.remove("bottom"),t.elements.contentInner.classList.contains("bottom")||o||t.elements.contentInner.classList.add("bottom"),t.positionTimer=requestAnimationFrame(function(){e(t)()})}}}(e)();var t=l.GetCurve([0,1.02,.99,1]),n=l.GetCurve([0,e.speed/t.length]);e.target&&(e.elements.contentContainer.style.width=e.target.offsetWidth+"px");!function r(){if(e.showing){var o=t.shift(),i=n[t.length];e.elements.contentContainer.style.transform="scale(1, "+o+")",t.length?setTimeout(function(){return r()},i):e.elements.root.classList.add("active")}}()}}},hide:function(e){return function(){if(e.showing){e.showing=!1;var t=l.GetCurve([1,0]),n=l.GetCurve([0,e.speed/t.length]);!function r(){if(!e.showing){var o=t.shift(),i=n[o.length];e.elements.contentContainer.style.transform="scale(1, "+o+")",t.length?setTimeout(function(){return r()},i):e.elements.root.classList.remove("active")}}(),e.dispatchEvent(new CustomEvent("hidden"))}}}},elements:d,onConnected:function(e){return e.inputID=c.default("overlay-content")}});s.Define("overlay-content",m),t.default=m},,,,,,,,,,,,,,,function(e,t){e.exports="<div class=overlay-content-container> <div class=overlay-content-container-inner> <div class=overlay-content-content-container> <div class=overlay-content-content-inner> <slot></slot> </div> </div> </div> </div> "},function(e,t){e.exports="<style>.overlay-content-container,:host,overlay-content{display:block;position:fixed;height:0;width:0;top:0;left:0;z-index:99999;overflow:visible;pointer-events:none}.overlay-content-container-inner{position:fixed;width:100%;height:100%;top:0;left:0;pointer-events:none;overflow:hidden}.overlay-content-content-container{max-height:80vh;max-width:80vw;overflow:auto;position:relative;width:100%;transform-origin:center center;transform:scale(1,0);pointer-events:none;opacity:0;transition:opacity .2s ease-in-out}.overlay-content-container.active .overlay-content-content-container{pointer-events:all;opacity:1}.overlay-content-content-inner{display:flex;flex-direction:column;justify-content:flex-end;min-height:100%}.overlay-content-content-inner.bottom{justify-content:flex-start}</style> "}])});