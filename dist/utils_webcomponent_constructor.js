!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.builtjs=t():e.builtjs=t()}(window,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=36)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(3);t.isTMonad=function(e){return!!e&&e.hasOwnProperty("valid")&&"boolean"===o.Type(e.valid)&&e.hasOwnProperty("instanceof")&&"array"===o.Type(e.instanceof)&&e.hasOwnProperty("type")&&"string"===o.Type(e.type)&&e.hasOwnProperty("value")},t.Tmonad=function(e){return t.isTMonad(e)?{valid:e.valid,value:e.value,type:o.Type(e.value),stringChanges:e.stringChanges,instanceof:e.instanceof,stop:e.stop}:{valid:!0,value:e,type:o.Type(e),stringChanges:[],instanceof:[],stop:!1}},t.finishTMonad=function(e,t,n){return e.type=o.Type(e.value),e.valid="?"===t||e.type===t,e.instanceof.push(n),e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t){return e.reduce(function(e,t){return"function"!=typeof t?e:t(e)},t)}}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(52);t.isAnyEmpty=o.default;var r=n(22);t.isDate=r.default;var u=n(21);t.isDom=u.default;var i=n(25);t.isEmpty=i.default;var c=n(24);t.Type=c.default;var a=n(23);t.isObject=a.default},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0);t.default=function(e){return function(t){var n=o.Tmonad(t);return n.stop||n.valid?n:(n.instanceof.push("IfInvalid"),Object.assign({},o.Tmonad(e),{instanceof:n.instanceof.concat(["T"])}))}}},,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t,n,o){if(void 0===e&&(e={}),void 0===t&&(t=""),void 0===n&&(n=void 0),void 0===o&&(o=function(e){return e}),!e)return n;var r=[e];t&&t.toString().split&&(r=[e].concat(t.toString().split(".")));var u=r.reduce(function(e,t){if(null==e)return n;if(-1===t.indexOf(".")&&t.indexOf("(")>-1){var o=/\((.*?)\)/g.exec(t),r=(o?o[1]:"").split(",").map(function(e){return e.trim()}),u=t.split("(")[0];if("function"==typeof e[u])return e[u].apply(e,r)}return null!=e&&t?e[t]:e});return null==u?n:o(u)}},function(e,t,n){"use strict";var o=this&&this.__generator||function(e,t){var n,o,r,u,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return u={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function c(u){return function(c){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,o&&(r=2&u[0]?o.return:u[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,u[1])).done)return r;switch(o=0,r&&(u=[2&u[0],r.value]),u[0]){case 0:case 1:r=u;break;case 4:return i.label++,{value:u[1],done:!1};case 5:i.label++,o=u[1],u=[0];continue;case 7:u=i.ops.pop(),i.trys.pop();continue;default:if(!(r=(r=i.trys).length>0&&r[r.length-1])&&(6===u[0]||2===u[0])){i=0;continue}if(3===u[0]&&(!r||u[1]>r[0]&&u[1]<r[3])){i.label=u[1];break}if(6===u[0]&&i.label<r[1]){i.label=r[1],r=u;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(u);break}r[2]&&i.ops.pop(),i.trys.pop();continue}u=t.call(e,i)}catch(e){u=[6,e],o=0}finally{n=r=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,c])}}};Object.defineProperty(t,"__esModule",{value:!0});var r=function(){var e,t,n,r;return o(this,function(o){switch(o.label){case 0:e=0,t=[],n=function(e){return(""+e+((new Date).getTime()/1e3|0).toString(16)+"xxxxxxxxxxxxxxxx").replace(/[x]/g,function(){return(16*Math.random()|0).toString(16)}).toLowerCase()},o.label=1;case 1:for(0,r=n(e+=1);t.indexOf(n(e))>-1;)r=n(e);return[4,r];case 2:return o.sent(),[3,1];case 3:return[2]}})}();t.default=function(){return r.next().value}},,,,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return e instanceof Element||e instanceof Node}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e;try{t=new Date(Date.parse(e))}catch(e){return!1}return"Invalid Date"!==t&&!isNaN(t)&&t instanceof Date}},function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return o(e).indexOf("object")>-1}},function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0});var r=["string","number","null","undefined","function"],u=n(21),i=n(22),c=n(23);t.default=function(e){return null===e?null:(t=e,r.indexOf(o(t))>-1?o(e):u.default(e)?"dom":Array.isArray(e)?"array":i.default(e)?"date":c.default(e)?"object":o(e));var t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(24);t.default=function(e){var t=o.default(e);return""===e||"undefined"===t||null==t||"array"===t&&0===e.length||"object"===t&&0===Object.keys(e).length}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(11);t.default=function(e,t){void 0===t&&(t=!1);var n=Object.assign({},{value:e,previousValue:void 0,updated:(new Date).getTime(),subscriptions:{}}),r=function(e,t,o){void 0===o&&(o={}),Object.keys(n.subscriptions).forEach(function(r){var u=n.subscriptions[r][e];u&&"function"==typeof u&&u(t,o,r)})},u=function(e){return function(){n.subscriptions[e.id]=null,delete n.subscriptions[e.id]}};return{get value(){return n.value},get previous(){return n.previousValue},next:function(e){n=Object.assign({},{value:e,previousValue:n.value,updated:(new Date).getTime(),subscriptions:n.subscriptions}),r("next",n.value,n)},error:function(e){r("error",e,n)},complete:function(){r("complete",n)},subscribe:function(e,r,i){void 0===r&&(r=function(e){}),void 0===i&&(i=function(){});var c=Object.assign({},{next:e,error:r,complete:i,id:o.default()});return c.unsubscribe=u(c),n.subscriptions[c.id]=c,t||void 0===n.value||"function"!=typeof c.next||c.next(n.value,n,c.id),u(c)},unsubscribe:function(e){if(e&&e.id&&n.subscriptions[e.id])return u(e)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(31);t.default=function(e,t,n){void 0===n&&(n="");var r=document.createElement("style");r.setAttribute("type","text/css"),r.setAttribute("name",n),r.style.display="none",t.appendChild(r),o.default(r,e)}},,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t){if(e&&t&&"undefined"!==t&&"null"!==t)if(e.styleSheet)e.styleSheet.cssText=""+(e.styleSheet.cssText?e.styleSheet.cssText:"")+t;else{e.innerHTML="";var n=document.createTextNode(t);e.appendChild(n)}}},,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=n(3);t.default=function(e){var t=o.Tmonad(e);if(t.stop)return t;switch(t.value){case"0":case 0:case"off":case"false":case!1:t.value=!1,t.valid=!0;break;case"1":case 1:case"on":case"true":case!0:t.value=!0,t.valid=!0;break;default:t.value=!1,t.valid=!1}return t.type=r.Type(t.value),t.instanceof.push("ToBool"),t}},function(e,t,n){"use strict";var o,r=this&&this.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var u=n(43),i=n(44),c=n(26),a=n(35),s=n(11),f=n(6),l=n(1),d=n(10),p=n(40),y=n(27),v=n(65),b=function(e,t,n){return l.default(p.ToFunction,f.default(function(){}))(d.default(e,t+"."+n)).value()},m=function(e,t){void 0===t&&(t="eventSubscriptions"),e&&e[t]&&Object.keys(e[t]).forEach(function(n){return b(e,t,n)})},h=function(e,t,n){void 0===n&&(n="eventSubscriptions"),e&&e[n]&&b(e,n,t)},O=function(e,t,n,o,r,u){"function"==typeof n&&(e.state[t]=c.default(n(e[t],e)),function(e,t,n,o,r){try{Object.defineProperty(e,t,{get:function(){return"function"==typeof o?o(e):e.state[t].value},set:function(o){if(e.state[t]){if("function"==typeof r)return r(e)(o);var u=n(o,e),i=e.state[t].value;if("function"==typeof i&&"function"==typeof u&&u.toString()!==i.toString())return e.state[t].next(u);e.state[t].value!==u&&e.state[t].next(u)}}})}catch(e){}}(e,t,n,r,u),"function"==typeof o&&e.state[t].subscribe(function(t){return o(t,e)}))};t.default=function(e){var t=e.componentName,n=e.observedAttributes||[],o=e.template||"<slot></slot>",c=e.style||"",d=e.properties||{},p=e.elements||{},b=e.methods,j=e.computed,_=e.getters||{},g=e.setters||{},x=e.onConnected,P=e.onDisconnected,T=e.onReady;if(t){var S=function(n){if(e.appendStylesToParent&&y.default(c,n.parentElement,t),n.wcID=s.default(),n.unsubscribeEvent=h,n.unsubscribeEvents=m,j&&Object.keys(j).forEach(function(e){try{Object.defineProperty(n,e,j[e](n))}catch(e){}}),b&&Object.keys(b).forEach(function(e){return n[e]=b[e](n)}),p){var o=i.default(n,p);n.elements=o.state,n.disconnectElements=o.disconnect}d&&!d.ready&&O(n,"ready",function(e){return l.default(a.default,f.default(!1))(e).value},function(){},_.ready,g.ready),d&&Object.keys(d).forEach(function(e){return O(n,e,d[e].format,d[e].onChange,_[e],g[e])}),x&&x(n),n.state.ready&&n.state.ready.subscribe(function(){return n.dispatchEvent(new CustomEvent("ready",{detail:n}))}),n.ready=!0,T&&T(n),n.dispatchEvent(new CustomEvent("ready",{detail:n}))};return{object:function(r){return r.observedAttributes=n.slice(),r.state={},r.elements={},r.disconnectElements=function(){},r.attributeChangedCallback=function(){},r.disconnectedCallback=function(){},u.default(t,r,o,c,!0,e.appendStylesToHead),S(r),r},component:function(i){function a(){var n=i.call(this)||this;return n.state={},n.elements={},n.disconnectElements=function(){},u.default(t,n,o,c,!1,e.appendStylesToHead),n}return r(a,i),Object.defineProperty(a,"observedAttributes",{get:function(){return n},enumerable:!0,configurable:!0}),a.prototype.attributeChangedCallback=function(e,t,n){n!==t&&(this[e]=n)},a.prototype.connectedCallback=function(){v.default.addComponent(this),S(this)},a.prototype.disconnectedCallback=function(){var e=this;v.default.removeComponent(this),this.state&&Object.keys(this.state).forEach(function(t){e.state[t].complete()}),this.disconnectElements(),P&&P(this)},a}(HTMLElement)}}}},,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0);t.ToFunction=function(e){var t=o.Tmonad(e);return t.stop?t:("function"!==t.type&&(t.valid=!1),t.instanceof.push("ToFunction"),t)},t.PartialFunction=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return e.slice()[0]?e.slice()[0].length===e.slice().length-1?e.slice()[0].apply(null,e.slice().slice(1)):function(){for(var n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];return t.PartialFunction.apply(void 0,e.concat(n))}:void 0}},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(27);t.default=function(e,t,n,r,u,i){if(void 0===u&&(u=!1),void 0===i&&(i=!1),u)return t.shadowRoot=t,t.innerHTML=n+'<style type="text/css">'+r+"</style>";var c=document.createElement("template");c.innerHTML=n,o.default(r,c.content);var a=document.importNode(c.content,!0);t.attachShadow({mode:"open"}).appendChild(a),"registerElement"in document&&!i||document.head.querySelector('style[name="'+e+'"]')||o.default(r,document.head,e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(26);t.default=function(e,t){var n={},r={};return Object.keys(t).sort().forEach(function(u){n[u]=o.default(function(n){var o=e.shadowRoot.querySelectorAll(t[n].selector);return o.length>1?Array.from(o):o[0]}(u)),Object.defineProperty(r,u,{get:function(){return n[u].value},set:function(e){e!==n[u].value&&n[u].next(e)}}),n[u].subscribe(function(o){var r;e.unsubscribeEvents(n[u].previous),(r=n[u].previous)&&r.parentNode&&r.parentNode.removeChild(r),"function"==typeof t[u].onChange&&t[u].onChange(o,e)})}),{state:r,disconnect:function(){return Object.keys(n).forEach(function(e){n[e].complete()})}}}},,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(25);t.default=function(e){return o.default(e)||"false"===e||"undefined"===e||"null"===e}},,,,,,,,,,,,,function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var o=n(10),r=Symbol.for("builtjs.ComponentStore"),u=Object.getOwnPropertySymbols(e).indexOf(r)>-1,i=function(e){return o.default(e,"tagName","").toLowerCase()};u||(e[r]={components:{},themes:{},theme:function(e,t){return Object.keys(e).forEach(function(n){return t[n]=e[n]})},addComponent:function(t){var n=i(t);""!==n&&(e[r].components[n]||(e[r].components[n]=[]),e[r].components[n].push(t),e[r].themes[n]&&Object.keys(e[r].themes[n]).forEach(function(o){return t[o]=e[r].themes[n][o]}))},removeComponent:function(t){var n=i(t);if(""!==n&&e[r].components[n]){var o=e[r].components[n].indexOf(t);-1!==o&&e[r].components[n].splice(o,1)}},addTheme:function(t,n){e[r].themes[t]=n,e[r].components[t]&&e[r].components[t].forEach(function(n){return e[r].theme(e[r].themes[t],n)})}});var c=e[r];Object.freeze(c),t.default=c}).call(this,n(74))},,,,,,,,,function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n}])});