!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.builtjs=t():e.builtjs=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=190)}({0:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3);t.isTMonad=function(e){return!!e&&e.hasOwnProperty("valid")&&"boolean"===r.Type(e.valid)&&e.hasOwnProperty("instanceof")&&"array"===r.Type(e.instanceof)&&e.hasOwnProperty("type")&&"string"===r.Type(e.type)&&e.hasOwnProperty("value")},t.Tmonad=function(e){return t.isTMonad(e)?{valid:e.valid,value:e.value,type:r.Type(e.value),stringChanges:e.stringChanges,instanceof:e.instanceof,stop:e.stop}:{valid:!0,value:e,type:r.Type(e),stringChanges:[],instanceof:[],stop:!1}},t.finishTMonad=function(e,t,n){return e.type=r.Type(e.value),e.valid="?"===t||e.type===t,e.instanceof.push(n),e}},1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(2),o=n(14),u=n(5),i=n(15),s=n(4),l=n(8),c=n(6);t.Trim=function(e){if(i.default(e,"stop",!1))return r.Tmonad(e);var t=r.Tmonad(e);try{t.value=t.value.trim()}catch(e){}return t.instanceof.push("Trim"),t},t.ToPlainText=function(e){var n=r.Tmonad(e);return n.stop?n:(n="string"!==n.type?a.default(t.ToString,s.StopIfInvalid,o.DecodeUriComponent,u.FromEntities)(n):a.default(o.DecodeUriComponent,u.FromEntities)(n),r.finishTMonad(n,"string","ToPlainText"))},t.ToString=function(e){if(i.default(e,"stop",!1))return r.Tmonad(e);var t=r.Tmonad(e);try{t.value=t.value.toString()}catch(e){}return t.valid="string"==typeof t.value,t.instanceof.push("ToString"),t},t.Split=function(e){return function(n){var a=r.Tmonad(n);if(a.stop)return a;"string"!==a.type&&(a=t.ToString(a));try{var o=l.SplitMeta(a.value,e);if("string"==typeof o.value)throw new Error("not array");a.stringChanges=a.stringChanges.concat(o.stringChanges),a.value=o.value}catch(e){a.valid=!1}return r.finishTMonad(a,"array","Split")}},t.Replace=function(e,n){return function(a){var o=r.Tmonad(a);if(o.stop)return o;"string"!==o.type&&(o=t.ToString(o));try{var u=l.ReplaceMeta(o.value,e,n);o.value=u.value,o.valid=!0,o.stringChanges=o.stringChanges.concat(u.stringChanges)}catch(e){o.valid=!1}return r.finishTMonad(o,"string","Replace")}},t.AfterEveryNth=function(e,n){return function(o){var u=r.Tmonad(o),i=0,s=[];if(u.stop)return u;"string"!==u.type&&(u=t.ToString(u));var l=c.Map(function(t,r){var a="";return(r+1)%e==0&&0!==r?(a=""+t+n,s.push({start:i,end:i+(1+n.length),input:t,length:1+n.length,result:a,added:n}),i+=n.length):(a=t,i+=1),a}),f=a.default(t.Split(""),l,c.Join(""))(u);return f.stringChanges=f.stringChanges.concat(s),f.valid="string"==typeof f.value&&14===f.value.length,f.instanceof.push("AfterEveryNth"),f}},t.BeforeEveryNth=function(e,n){return function(o){var u=r.Tmonad(o),i=0,s=[];if(u.stop)return u;"string"!==u.type&&(u=t.ToString(u));var l=c.Map(function(t,r){var a="";return(r+1)%e==0&&0!==r?(a=""+n+t,s.push({start:i,end:i+(1+n.length),input:t,length:1+n.length,result:a,added:n}),i+=n.length):(a=t,i+=1),a}),f=a.default(t.Split(""),l,c.Join(""))(u);return f.stringChanges=f.stringChanges.concat(s),f.valid="string"==typeof f.value&&14===f.value.length,f.instanceof.push("BeforeEveryNth"),f}},t.Match=function(e){return function(n){var a=r.Tmonad(n);if(a.stop)return a;"string"!==a.type&&(a=t.ToString(a));var o=l.MatchMeta(a.value,e,!0);return a.value=o.value,a.valid=1===a.value.length,a.stringChanges=a.stringChanges.concat(o.stringChanges),a.instanceof.push("Match"),a}},t.MatchAll=function(e){return function(n){var a=r.Tmonad(n);if(a.stop)return a;"string"!==a.type&&(a=t.ToString(a));var o=l.MatchMeta(a.value,e);return a.value=o.value,a.valid=a.value.length>0,a.stringChanges=a.stringChanges.concat(o.stringChanges),a.instanceof.push("MatchAll"),a}},t.UpperCase=function(e){var t=e;try{t.value=t.value.toUpperCase()}catch(e){t.valid=!1}return t.instanceof.push("UpperCase"),t},t.Capitalize=function(e){var t=e;try{t.value=""+t.value.slice(0,1).toUpperCase()+(t.value.slice(1)||"")}catch(e){t.valid=!1}return t.instanceof.push("Capitalize"),t},t.LowerCase=function(e){var t=e;try{t.value=t.value.toLowerCase()}catch(e){t.valid=!1}return t.instanceof.push("LowerCase"),t}},10:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e;try{t=new Date(Date.parse(e))}catch(e){return!1}return"Invalid Date"!==t&&!isNaN(t)&&t instanceof Date}},11:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return r(e).indexOf("object")>-1}},111:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t=[],n=document.firstElementChild,r=function(e){return e.filter(function(e){return e.parentNode})},a=function(e){void 0===e&&(e=!1),e?n.style.removeProperty("user-select"):n.style.userSelect="none"},o=function(t){var n=t.target;n&&"false"===n.getAttribute("draggable")||(t.preventDefault(),a(),e.dispatchEvent(new CustomEvent("dragstarted")))},u=function(t){var n;t.preventDefault(),e.classList.remove("dragging"),e.classList.remove("dragover"),a(!0),n=t.dataTransfer||t.originalEvent.dataTransfer,e.dispatchEvent(new CustomEvent("dropped",{detail:n}))},i=function(t){t.preventDefault(),e.classList.add("dragover")},s=function(t){t.preventDefault(),e.classList.remove("dragover")};return e.addEventListener("dragstart",o),e.addEventListener("dragover",i),e.addEventListener("drop",u),e.addEventListener("dragleave",s),e.addEventListener("dragend",function(t){t.preventDefault(),e.classList.remove("dragging"),e.classList.remove("dragover"),a(!0),e.dispatchEvent(new CustomEvent("dragended"))}),{get draggables(){return r(t)},set draggables(e){t=[],r(Array.from(e)).forEach(function(e){t.push(e)})},get dropZone(){return e},destroy:function(){e.removeEventListener("dragstart",o),e.removeEventListener("dragover",i),e.removeEventListener("drop",u),e.removeEventListener("dragleave",s),e.removeEventListener("dragend",s),e.classList.contains("dragging")&&(e.classList.remove("dragging"),document.body.classList.remove("dragging-elements"))}}}},12:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0});var a=["string","number","null","undefined","function"],o=n(9),u=n(10),i=n(11);t.default=function(e){return null===e?null:(t=e,a.indexOf(r(t))>-1?r(e):o.default(e)?"dom":Array.isArray(e)?"array":u.default(e)?"date":i.default(e)?"object":r(e));var t}},13:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(12);t.default=function(e){var t=r.default(e);return""===e||"undefined"===t||null==t||"array"===t&&0===e.length||"object"===t&&0===Object.keys(e).length}},14:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(3);t.doURI=function(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);var o=r.Tmonad(e);if(o.stop)return o;try{o.value=t?n?encodeURIComponent(o.value):encodeURI(o.value):n?decodeURIComponent(o.value):decodeURI(o.value)}catch(e){o.valid=!1}return o.type=a.Type(o.value),o.instanceof.push(t?"encodeUri":"decodeUri"),o},t.EncodeUri=function(e){return t.doURI(e,!0)},t.DecodeUri=function(e){return t.doURI(e)},t.EncodeUriComponent=function(e){return t.doURI(e,!0,!0)},t.DecodeUriComponent=function(e){return t.doURI(e,!1,!0)}},15:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t,n){if(void 0===e&&(e={}),void 0===t&&(t=""),void 0===n&&(n=void 0),!e)return n;var r=[e];t&&t.toString().split&&(r=[e].concat(t.toString().split(".")));var a=r.reduce(function(e,t){if(void 0===e)return n;if(-1===t.indexOf(".")&&t.indexOf("(")>-1){var r=/\((.*?)\)/g.exec(t),a=(r?r[1]:"").split(",").map(function(e){return e.trim()}),o=t.split("(")[0];if("function"==typeof e[o])return e[o].apply(e,a)}return null!=e&&t?e[t]:e});return void 0===a?n:a}},18:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(3),o=n(14);t.FromJSON=function(e){var t=r.Tmonad(e);if(t.stop)return t;try{t.value=JSON.parse(o.DecodeUriComponent(t.value).value),t.valid=!0}catch(e){t.valid=!1}return t.type=a.Type(t.value),t.instanceof.push("FromJSON"),["object","array"].indexOf(t.type)>-1&&(t.valid=!0),t},t.ToJSON=function(e){var n=t.FromJSON(e);if(n.stop)return n;try{n.value=JSON.stringify(n.value),n.valid=!0}catch(e){n.valid=!1}return n.type=a.Type(n.value),n.instanceof.push("ToJSON"),n}},180:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(69);t.default=function(e){return function(t){var n=e+"/"+(t.path||""),a=Object.assign({},{data:void 0,headers:{},method:"POST"},t,{path:n});return a.data&&"string"!=typeof a.data&&(a.data=JSON.stringify(a.data)),new Promise(function(e,t){var n=r.default(function(){self.onmessage=function(e){var t=new XMLHttpRequest,n=JSON.parse(e.data);t.open(n.method,n.path,!1),Object.keys(n.headers).forEach(function(e){return t.setRequestHeader(e,n.headers[e])}),t.onload=function(){return postMessage({status:t.status,response:t.responseText||t.statusText})},t.onerror=function(){return postMessage({status:t.status,response:t.statusText})},t.send(n.data)}}),o=n.subscribe(function(n){o();var r=n.response;try{r=JSON.parse(r)}catch(e){}return 200===n.status?e(r):t(n)},function(e){o(),t(e)});n.post(a)})}}},181:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(30);t.default=function(e,t){var n;void 0===t&&(t=!1);var a=Object.assign({},e),o=function(e,t){return location.protocol+"//"+location.host+function(e){return e?"/"===e[0]?e:"/"+e:""}(e)+function(e){if(!Object.keys(e).length)return"";var t=Object.keys(e).map(function(t){return!!e[t]&&t+"="+e[t]}).filter(function(e){return!!e}).join("&");return t?"?"+t:""}(t)},u=function(e){if(history.pushState&&e){var n=o(e.pathname,e.query),r={title:e.title,pathname:e.pathname,full:n};history.pushState(r,document.title,n),t&&localStorage.setItem("route",JSON.stringify(r))}},i={get current(){return n||{}},getRouteByPath:function(e){for(var t=0,n=Object.keys(a);t<n.length;){if(a[n[t]].pathname===e)return a[n[t]];t+=1}return{}},updateQuery:function(e){n&&((n=Object.assign({},n)).query=e,u(n))},getQuery:function(e){var t={};if(!(e&&""!==e||(e=location.search)&&""!==e))return t;var n=e.split("?")[1];return n&&""!==n?(n.split("&").forEach(function(e){return t[e.split("=")[0]]=e.split("=")[1]}),t):t},route:function(e){var t=i.getRouteByPath("string"==typeof e?e.split("?")[0]:e.pathname?e.pathname:"");return t?(document.title=t.title,!(!n||t.pathname!==n.pathname)||((n=Object.assign({},t)).query=function(e){var t={};if(!e)return t;var n=e.split("?")[1];return n?(n.split("&").forEach(function(e){t[e.split("=")[0]]=e.split("=")[1]}),t):t}(e),u(n),i.route$.next(n),!0)):i.route("/")},route$:r.default(void 0)};return i.route(""+location.pathname+location.search),window.document.body.addEventListener("click",function(e){var t,n=e.path,r=e.target,a=r.tagName.toLowerCase();if(n&&Array.isArray(n))for(var o=0;o<n.length;o++)if(n[o]&&n[o].tagName&&"a"===n[o].tagName.toLowerCase()){t=n[o];break}if(t||"a"===a){var u=new URL(t?t.href:r.href);u.host===location.host&&i.route(u)&&e.preventDefault()}},!0),window.addEventListener("popstate",function(){if(!history.state||!history.state.pathname)return i.route(a.home);i.route(history.state)},!1),i}},182:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e=function(){return document.body.className="wc-unsupported"},t=window.WebComponents,n=function(){requestAnimationFrame(function(){try{"function"!==r(window.customElements.define)&&e()}catch(t){e()}})};navigator.userAgent.indexOf("Safari")>-1&&["Version/9","Version/8","Version/7"].reduce(function(e,t){return!!e||navigator.userAgent.indexOf(t)>-1},!1)&&e(),t&&t.ready?n():window.addEventListener("WebComponentsReady",n)}},183:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(69),a=n(76),o=n(4),u=function(e,t){if(!t)return{upload:function(){},cancel:function(){}};var n=Object.assign({},{progressCB:function(){},completeCB:function(){},errorCB:function(){},url:location.href,bytesPerChunk:647212,withCredentials:!1,uploadMethod:"POST",headers:{},parallel:!1},e),u=[],i=[],s=t[0]?t[0]:t,l=s.size,c=function(e,t){return t&&t>0?Math.ceil(e.size/t):1}(s,n.bytesPerChunk),f=Object.assign({},n,{size:l,total:c,fileObject:s}),d=!1,v=0,p=r.default(function(){self.onmessage=function(e){var t=JSON.parse(e.data),n=new XMLHttpRequest;n.open(t.method,t.url,!0),n.withCredentials=t.withCredentials,Object.keys(t.headers).forEach(function(e){return n.setRequestHeader(e,t.headers[e])}),n.onloadend=function(){self.postMessage(JSON.stringify({response:n.response,statusText:n.statusText,status:n.status}))},n.send(t.data)}}),g=function(){return n.progressCB(o.UseIf(function(e){return e<=1},function(){return 1},1===f.total?1:i.length?Math.ceil(i.length/f.total*100)/100:0).value)},h=function(e,t,n){return Object.assign({},{"Content-Type":"application/octet-stream","X-Chunk-Id":e,"X-Chunk-Length":t,"X-File-Length":n},f.headers)},y=function(e,t){return Array.isArray(t)?t[e]:t},m=function(e){var t=function(e){return 1===f.total?f.fileObject:f.fileObject.slice(e*f.bytesPerChunk,(e+1)*f.bytesPerChunk)}(e);return{data:t,url:y(e,f.url),method:f.uploadMethod,withCredentials:f.withCredentials,headers:h(e,t.size,f.fileObject.size)}},b=function(e){if(!e)return Promise.reject();var t=a.ToObject(e).value;return 200!==t.status?Promise.reject(t.statusText):(i.push(v),u.push({chunk:v,data:t}),v+=1,g(),v<f.total?T(v):(p.dispose(),Promise.resolve()))},T=function(e){return new Promise(function(t,n){return d?n("upload was canceled"):p.post(m(e)).then(b).then(t).catch(n)})},O=function(e){return new Promise(function(t,n){return d?n("upload was canceled"):p.post(m(e)).then(function(t){return function(e,t){if(!t)return Promise.reject();var n=a.ToObject(t).value;return 200!==n.status?Promise.reject(n.statusText):(i.push(e),u.push({chunk:e,data:n}),g(),Promise.resolve())}(e,t)}).then(t).catch(n)})};return{get currentChunk(){return v},cancel:function(){d=!0},upload:function(){if(!f.size||!f.total)return p.dispose(),n.errorCB("invalid file");if(!f.url)return p.dispose(),n.errorCB("invalid upload url");if(d)return p.dispose(),n.errorCB("upload stopped");if(!f.parallel)return T(v).then(n.completeCB).catch(n.errorCB);for(var e=[],t=0;t<f.total;)e.push(t),t+=1;return Promise.all(e.map(function(e){return O(e)})).then(function(){return n.completeCB(u)}).catch(n.errorCB)}}};window.UploadService=u,t.default=u},19:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(13);t.default=function(e){return r.default(e)||"false"===e||"undefined"===e||"null"===e}},190:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(111);t.DragDropService=r.default;var a=n(180);t.Request=a.default;var o=n(181);t.Router=o.default;var u=n(31);t.Timer=u.default;var i=n(182);t.WCSupportClass=i.default;var s=n(183);t.UploadService=s.default},2:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t){return e.reduce(function(e,t){return"function"!=typeof t?e:t(e)},t)}}},20:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return void 0===e&&(e=""),(""+e+((new Date).getTime()/1e3|0).toString(16)+"xxxxxxxxxxxxxxxx").replace(/[x]/g,function(){return(16*Math.random()|0).toString(16)}).toLowerCase()}},24:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),o=n(1),u=n(7),i=n(2);t.ReplacementPattern=function(e){if(!e)return[];var t=o.ToString(e).value,n=t.match(/(\$\d+)+/g)||[],r=t.split(new RegExp("["+n.join("|")+"]")),a=n?n.map(function(e){return i.default(u.ToDigits,u.ToNumber)(e).value}):[],s=[];return r.forEach(function(e,t){if(""!==e)s.push(e);else if(0===t||t===r.length-1){var n=a.shift();return s.push({index:n,original:"$"+n})}}),s},t.ToRegex=function(e){var t=a.Tmonad(e);if(t.value){if("function"!=typeof t.value.split&&"object"===r(t.value))t.value=new RegExp(t.value);else if("string"==typeof t.value)if(0===t.value.indexOf("/")){var n=t.value.split("/").filter(function(e){return!!e}),o=n.pop();o.match(/[^gmisuy]/)&&(n.push(o),o=void 0),t.value=new RegExp(n.join("/"),o)}else t.value=new RegExp(t.value)}else t.value=new RegExp("");return t.valid=!0,t.instanceof.push("ToRegex"),t.type="object",t}},3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(19);t.isAnyEmpty=r.default;var a=n(10);t.isDate=a.default;var o=n(9);t.isDom=o.default;var u=n(13);t.isEmpty=u.default;var i=n(12);t.Type=i.default;var s=n(11);t.isObject=s.default},30:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(20);t.default=function(e,t){void 0===t&&(t=!1);var n=Object.assign({},{value:e,previousValue:void 0,updated:(new Date).getTime(),subscriptions:{}}),a=function(e,t,r){void 0===r&&(r={}),Object.keys(n.subscriptions).forEach(function(a){var o=n.subscriptions[a][e];o&&"function"==typeof o&&o(t,r,a)})},o=function(e){return function(){n.subscriptions[e.id]=null,delete n.subscriptions[e.id]}};return{get value(){return n.value},get previous(){return n.previousValue},next:function(e){n=Object.assign({},{value:e,previousValue:n.value,updated:(new Date).getTime(),subscriptions:n.subscriptions}),a("next",n.value,n)},error:function(e){a("error",e,n)},complete:function(){a("complete",n)},subscribe:function(e,a,u){void 0===a&&(a=function(e){}),void 0===u&&(u=function(){});var i=Object.assign({},{next:e,error:a,complete:u,id:r.default()});return i.unsubscribe=o(i),n.subscriptions[i.id]=i,t||void 0===n.value||"function"!=typeof i.next||i.next(n.value,n,i.id),o(i)},unsubscribe:function(e){if(e&&e.id&&n.subscriptions[e.id])return o(e)}}}},31:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(20),a={},o=!1;t.default=function(e,t,n,u){if(void 0===n&&(n=void 0),void 0===u&&(u=function(){}),e||0===e){var i=r.default("timer");return a[i]={id:i,duration:e,complete:"function"!=typeof u?function(){}:u,fn:"function"!=typeof t?function(){}:t,frames:n?n.slice():e?Array(e).fill(0):[],cancel:function(){a[i].complete(),a[i]=null,delete a[i]},started:(new Date).getTime()},o||function e(){o=!0;var t=Object.keys(a);t.length?(t.forEach(function(e){var t=a[e],n=(new Date).getTime()-t.started;if(t.duration&&void 0===t.frames[n])return a[e].cancel();t.fn(t.frames[n])}),requestAnimationFrame(e)):o=!1}(),a[i]}}},4:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(3);t.IfInvalid=function(e){return function(t){var n=r.Tmonad(t);return n.stop||n.valid?n:(n.instanceof.push("IfInvalid"),Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])}))}},t.IfValid=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfValid"),n.stop||!n.valid?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.IfEmpty=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfEmpty"),n.stop||a.isEmpty(n.value)?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.IfNotEmpty=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfNotEmpty"),n.stop||!a.isEmpty(n.value)?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.StopIfInvalid=function(e){var t=r.Tmonad(e);return t.valid||(t.stop=!0),t.instanceof.push("StopIfInvalid"),t},t.StopIfValid=function(e){var t=r.Tmonad(e);return t.valid&&(t.stop=!0),t.instanceof.push("StopIfValid"),t},t.StopIfEmpty=function(e){var t=r.Tmonad(e);return a.isEmpty(t.value)&&(t.stop=!0),t.instanceof.push("StopIfEmpty"),t},t.IfNot=function(e,t){return function(n){var a=r.Tmonad(n);if(e=r.Tmonad(e),a.valid=a.value===e.value,!a.valid){var o=r.Tmonad(t);return o.instanceof.push("IfNot"),o}return a.instanceof.push("IfNot"),a}},t.IfIs=function(e,t){return function(n){var a=r.Tmonad(n);return e=r.Tmonad(e),a.valid=a.value===e.value,a.value===e.value&&(a.value=r.Tmonad(t).value,a=r.Tmonad(a.value)),a.instanceof.push("IfIs"),a}},t.UseIf=function(e,t,n){return r.Tmonad(e(n)?n:t(n))}},5:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.ToEntities=function(e){var t=r.Tmonad(e);return t.stop?t:("string"===t.type?(t.value=t.value.replace(/\&/g,"&amp;").replace(/\>/g,"&gt;").replace(/\</g,"&lt;").replace(/"/g,"&quot;").replace(/`/g,"&apos;"),t.valid=!0):t.valid=!1,t.instanceof.push("ToEntities"),t)},t.FromEntities=function(e){var t=r.Tmonad(e);return t.stop?t:("string"===t.type?(t.value=t.value.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g,'"').replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g,"'"),t.valid=!0):t.valid=!1,t.instanceof.push("FromEntities"),t)}},6:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(2),o=n(18),u=n(1),i=n(4),s=n(3),l=n(8);t.ToArray=function(e){var t=r.Tmonad(e);if(t.stop)return e;var n=Array.isArray(t.value)?t:i.UseIf(function(e){return"array"===e.type},function(e){return e},a.default(u.ToPlainText,o.FromJSON)(e));return n.type=s.Type(n.value),n.valid="array"===n.type,n.instanceof.push("ToArray"),n},t.ForceToArray=function(e){var n=t.ToArray(e);if(n.stop)return n;var r=i.UseIf(function(e){return!(Array.isArray(e)&&e.length)},function(e){return void 0===e?void 0:[e]},n.value).value;return n.value=r,n.instanceof.push("ForceToArray"),n.valid=Array.isArray(n.value),n},t.Join=function(e){return function(t){var n=r.Tmonad(t);if(n.stop)return n;var a=l.JoinMeta(n.value,e);return n.value=a.value,n.stringChanges=n.stringChanges.concat(a.stringChanges),n.valid="string"==typeof n.value,r.finishTMonad(n,"string","Join")}},t.Map=function(e){return function(n){var o=r.Tmonad(n);if(o.stop)return o;return r.finishTMonad(a.default(t.ToArray,i.StopIfInvalid,function(t){return"array"!==s.Type(t.value)?(t.valid=!1,t):(t.value=t.value.map(e),t)})(o),"array","Map")}},t.Filter=function(e){return function(n){var o=r.Tmonad(n);if(o.stop)return o;return r.finishTMonad(a.default(t.ToArray,i.StopIfInvalid,function(t){return t.value=t.value.filter(e),t})(o),"array","Filter")}},t.IndexOf=function(e){return function(n){var a=r.Tmonad(n);if(a.stop)return a;var o=t.ToArray(e);return o.valid?(a.valid=o.value.indexOf(a.value)>-1,a.instanceof.push("IndexOf"),a):(a.valid=!1,a)}},t.Slice=function(e,t){return function(n){var a=r.Tmonad(n);if(a.stop)return a;try{var o=a.value.slice();a.value=o.slice(e,t),"string"==typeof o&&(0!==e&&a.stringChanges.push({start:0,end:e,input:o,length:e,result:o.slice(0,e),removed:o.slice(0,e)}),t<o.length&&a.stringChanges.push({start:t,end:o.length,input:o,length:o.length-t,result:o.slice(t),removed:o.slice(t)}))}catch(e){a.valid=!1}return a.instanceof.push("Slice"),a}}},69:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(15),o=n(20),u=n(18),i=function(e){var t,n,i,s=r.ToString(e).value,l={},c=s.indexOf("{"),f=s.slice(c),d=[];s="function webworker()"+f+"webworker()";var v=function(e,t,n){return Object.keys(n).forEach(function(r){return a.default(n,r+"."+e,function(){})(t)})},p=function(e){return 0!==Object.keys(e).length||(i&&i.terminate(),i=void 0,!1)},g=function(e){return function(){l[e]=null,delete l[e],p(l)}},h={get value(){return t},get previous(){return n},get functionString(){return s},get subscriptions(){return l},get pending(){return d},dispose:function(){var e;e=l,Object.keys(e).forEach(function(t){e[t].complete(),g(t)})},post:function(e){var t=d.length;return new Promise(function(n,r){var a=function(e){return d[t](),r(e)};d.push(h.subscribe(function(e){return d[t](),n(e)},a,a)),i.postMessage(u.ToJSON(e).value)})},subscribe:function(e,r,a){if("function"==typeof e||"function"==typeof r||"function"==typeof a){var u={next:e,error:r,complete:a,id:o.default("observeWorker")};return l[u.id]=u,"function"!=typeof l[u.id].error&&(l[u.id].error=g(u.id)),"function"!=typeof l[u.id].complete&&(l[u.id].complete=g(u.id)),function(){if(!i){var e;try{e=window.URL.createObjectURL(new Blob([s],{type:"application/javascript"}))}catch(e){}if(e)(i=new Worker(e)).onmessage=function(e){return n=t,t=e.data,v("next",t,l)},i.onerror=function(e){return v("error",e.message,l)}}}(),g(u.id)}}};return h};window.ObserveWorker=i,t.default=i},7:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(3),o=n(8),u=n(1);t.ToNumber=function(e){var t=r.Tmonad(e);return t.stop?t:("string"!==t.type||a.isEmpty(t.value)||(t.value=parseFloat(t.value)),t.type=a.Type(t.value),t.instanceof.push("ToNumber"),t.valid=!isNaN(t.value),t)},t.ToDigits=function(e){var t=r.Tmonad(e);if(t.stop)return t;"string"!==t.type&&(t=u.ToString(t));try{var n=o.RemoveMeta(t.value,/[^\d]+/g);t.stringChanges=t.stringChanges.concat(n.stringChanges),t.value=n.value.toString(),t.valid=!!t.value}catch(e){t.valid=!1}return t.type=a.Type(t.value),t.instanceof.push("ToDigits"),t}},76:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(2),o=n(14),u=n(5),i=n(18),s=n(3);t.ToObject=function(e){var t=r.Tmonad(e);return t.stop?t:("string"===t.type&&(t=a.default(o.DecodeUriComponent,u.FromEntities,i.FromJSON)(t)),t.valid="object"===s.Type(t.value),t.instanceof.push("ToObject"),t)},t.KeysAre=function(e){return function(n){var r=t.ToObject(n);if(r.stop)return r;if(r.instanceof.push("KeysAre"),!r.valid)return r;var a=Object.keys(r.value);return r.valid=0===a.length||a.filter(function(t){return s.Type(t)===e}).length>0,r}},t.HasKeys=function(e){return function(n){var r=t.ToObject(n);if(r.stop)return r;if(r.instanceof.push("HasKeys"),!r.valid)return r;var a=Object.keys(r.value);return r.valid=!a.length&&!e.length||!(a.length&&!e.length)&&a.filter(function(t){return e.indexOf(t)>-1}).length>0,r}}},8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(24),a=n(1);t.MatchMeta=function(e,t,n){void 0===n&&(n=!1);var o=[],u=[],i="string"==typeof e?e:a.ToString(e).value,s=function(){return u[u.length-1]},l=!1;i.replace(r.ToRegex(t).value,function(){if(!n||!l){l=!0;var e=[].slice.call(arguments,0);if(""!==e[0]){var t=e.splice(-2);e.index=t[0],e.input=t[1];var r=s(),a=e[0].length,i={start:e.index,end:e.index+a,input:e.input,length:a,result:e[0],removed:void 0};i.start&&r&&r.end!==i.start?i.removed=i.input.slice(r.end,i.start):delete i.removed,o.push(i.result),u.push(i)}}});var c=s();if(c.end<i.length){var f=i.slice(c.end);u.push({start:c.end,end:i.length,input:i,length:i.length-c.end,result:f,removed:f})}return{value:o,stringChanges:u}},t.ReplaceMeta=function(e,t,n){for(var a,o=r.ReplacementPattern(n),u={value:e.toString(),stringChanges:[]},i=u.value,s=0;null!==(a=r.ToRegex(t).value.exec(i));){var l=a.index+a[0].length,c={start:a.index,end:l,input:a.input,length:a[0].length,result:"",removed:a[0],pre:"",post:"",index:s};c.pre=0!==c.start?i.slice(0,c.start):"",c.post=i.slice(l),c.result=""+c.pre+c.post,a.length>1&&o.length&&(c.added=o.reduce(function(e,t){return"string"==typeof t?""+e+t:""+e+(a[t.index]||"")},""),c.length=c.added.length,c.end=a.index+c.length,c.result=""+c.pre+(c.added||"")+c.post),u.stringChanges.push(c),i=c.post,s+=1}return u.stringChanges.length&&(u.value=u.stringChanges.reduce(function(e,t,n){var r=t.added||"",a=n!==u.stringChanges.length-1?"":t.post;return""+e+t.pre+r+a},"")),u},t.RemoveMeta=function(e,t){for(var n,a={value:e.toString(),stringChanges:[]};null!==(n=r.ToRegex(t).value.exec(a.value));){var o={start:n.index,end:n.index+n[0].length,input:n.input,length:n[0].length,result:"",removed:n[0]},u=0!==o.start?a.value.slice(0,o.start):"",i=a.value.slice(o.end);o.result=""+u+i,a.stringChanges.push(o),a.value=o.result}return a},t.SplitMeta=function(e,t){var n;void 0===t&&(t="");var a=[],o={value:e,stringChanges:[]};try{if(!e||!t&&""!==t)return o;t=r.ToRegex(t).value;var u=o.value.toString();if("/(?:)/"===t.toString())return{value:u.split(""),stringChanges:[]};for(;null!==(n=r.ToRegex(t).value.exec(u));){var i=n.toString().length,s={start:n.index,end:n.index+i,input:n.input,length:i,result:[],removed:n[0]},l=0!==s.start?u.slice(0,s.start):"",c=u.slice(s.end);s.result=[l,c],o.stringChanges.push(s),a.push(l),u=c}a.push(u),o.value=a.filter(function(e){return!!e})}catch(e){}return o},t.JoinMeta=function(e,t){var n={value:e,stringChanges:[]};if(!t)return n.value=n.value.join(t),n;try{for(var r=1,a=n.value[r]||"";r<n.value.length;)n.stringChanges.push({start:a.length,end:a.length+t.length,input:n.value[r],length:t.length,result:"",added:t}),a=""+a+t+n.value[r],r+=1;n.value=a}catch(e){}return n}},9:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return e instanceof Element||e instanceof Node}}})});