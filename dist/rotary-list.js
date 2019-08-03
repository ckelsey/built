!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=25)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);e.isTMonad=function(t){return!!t&&t.hasOwnProperty("valid")&&"boolean"===i.getType(t.valid)&&t.hasOwnProperty("instanceof")&&"array"===i.getType(t.instanceof)&&t.hasOwnProperty("type")&&"string"===i.getType(t.type)&&t.hasOwnProperty("value")},e.Tmonad=function(t){return Object.assign({},e.isTMonad(t)?t:{},e.isTMonad(t)?{valid:t.valid,value:t.value,type:i.getType(t.value),instanceof:t.instanceof}:{valid:!0,value:t,type:i.getType(t),instanceof:[]})},e.finishTMonad=function(t,e,n){return t.type=i.getType(t.value),t.valid="?"===e||t.type===e,t.instanceof.push(n),t}},function(t,e,n){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.primitives=["string","number","null","undefined","function"],e.isDom=function(t){return t instanceof Element||t instanceof Node},e.isString=function(t){return"string"==typeof t},e.isPrimitive=function(t){return e.primitives.indexOf(i(t))>-1},e.isArray=function(t){return Array.isArray(t)},e.isDate=function(t){var e=t;try{e=new Date(Date.parse(t))}catch(t){return!1}return"Invalid Date"!==e&&!isNaN(e)&&e instanceof Date},e.isObject=function(t){return i(t).indexOf("object")>-1},e.empty=function(t){var n=e.getType(t);return""===t||"undefined"===n||null==n||"array"===n&&0===t.length||"object"===n&&0===Object.keys(t).length},e.anyEmpty=function(t){return e.empty(t)||"false"===t||"undefined"===t||"null"===t},e.getType=function(t){return null===t?null:e.isPrimitive(t)?i(t):e.isArray(t)?"array":e.isDate(t)?"date":e.isObject(t)?"object":i(t)}},function(t,e,n){"use strict";var i,o=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var r=n(6),s=function(t,e,n){Object.keys(t).forEach(function(i){(0,t[i][e])(n)})},a=function(t){function e(e,n){var i=t.call(this)||this;return i.state=e,i.noInit=n,i}return o(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this.state},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"previous",{get:function(){return this.previousState},enumerable:!0,configurable:!0}),e.prototype.next=function(t){if("function"==typeof this.state)return s(this.subscriptions,"next",this.state);"function"==typeof t&&(t=t(this.state)),this.previousState=this.state,this.state=t,s(this.subscriptions,"next",this.state)},e.prototype.error=function(t){s(this.subscriptions,"error",t)},e.prototype.complete=function(){s(this.subscriptions,"complete",void 0)},e.prototype.subscribe=function(e,n,i){return this.noInit||e(this.value),t.prototype._subscribe.call(this,e,n,i)},e}(r.default);e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return function(e){return t.reduce(function(t,e){return"function"!=typeof e?t:e(t)},e)}}},,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),o=n(1);e.IfInvalid=function(t){return function(e){var n=i.Tmonad(e);return n.stop||n.valid?n:(n.instanceof.push("IfInvalid"),Object.assign({},i.Tmonad(t),{instanceof:n.instanceof.concat(["T"])}))}},e.IfValid=function(t){return function(e){var n=i.Tmonad(e);return n.instanceof.push("IfValid"),n.stop||!n.valid?n:Object.assign({},i.Tmonad(t),{instanceof:n.instanceof.concat(["T"])})}},e.IfEmpty=function(t){return function(e){var n=i.Tmonad(e);return n.instanceof.push("IfEmpty"),n.stop||!o.empty(n.value)?n:Object.assign({},i.Tmonad(t),{instanceof:n.instanceof.concat(["T"])})}},e.StopIfInvalid=function(t){var e=i.Tmonad(t);return e.valid||(e.stop=!0),e.instanceof.push("StopIfInvalid"),e},e.StopIfValid=function(t){var e=i.Tmonad(t);return e.valid&&(e.stop=!0),e.instanceof.push("StopIfValid"),e},e.StopIfEmpty=function(t){var e=i.Tmonad(t);return o.empty(e.value)&&(e.stop=!0),e.instanceof.push("StopIfEmpty"),e}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(8),o=function(){function t(){this.subscriptions={}}return t.prototype._subscribe=function(t,e,n){var o=new i.default("function"==typeof t?{next:t,error:e,complete:n}:t),r=(new Date).getTime()+"_"+Object.keys(this.subscriptions).length+"_"+Math.round(1e4*Math.random());return o.id=r,this.subscriptions[r]=o,this._unsubscribe(o)},t.prototype._unsubscribe=function(t){var e=this;return function(){return t.unsubscribe(),e.subscriptions[t.id]=null,delete e.subscriptions[t.id],e.subscriptions}},t}();e.default=o},,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t){this.handler=t,this.next=this.next.bind(this),this.error=this.error.bind(this),this.complete=this.complete.bind(this),this.unsubscribe=this.unsubscribe.bind(this),this.isUnsubscribed=!1}return t.prototype.next=function(t){this.handler.next&&!this.isUnsubscribed&&this.handler.next(t)},t.prototype.error=function(t){this.isUnsubscribed||(this.handler.error&&this.handler.error(t),this.unsubscribe())},t.prototype.complete=function(){this.isUnsubscribed||(this.handler.complete&&this.handler.complete(),this.unsubscribe())},t.prototype.unsubscribe=function(){this.isUnsubscribed=!0},t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),o=n(3),r=n(10),s=n(14),a=n(12),u=n(5);e.ToPlainText=function(t){var n=i.Tmonad(t);return n.stop?n:(n="string"!==n.type?o.default(e.ToString,u.StopIfInvalid,r.DecodeUriComponent,s.FromEntities)(n):o.default(r.DecodeUriComponent,s.FromEntities)(n),i.finishTMonad(n,"string","ToPlainText"))},e.ToString=function(t){if(a.default(t,"stop",!1))return i.Tmonad(t);var e=i.Tmonad(t);try{e.value=e.value.toString()}catch(t){}return i.finishTMonad(e,"string","ToString")},e.Split=function(t){return function(n){var o=i.Tmonad(n);if(o.stop)return o;"string"!==o.type&&(o=e.ToString(o));try{o.value=o.value.split(t).map(function(t){return t.trim()}).filter(function(t){return!!t})}catch(t){}return i.finishTMonad(o,"array","Split")}},e.Replace=function(t,e){return void 0===e&&(e=!0),function(n){var o=Object.keys(t).map(function(e){return[e,t[e]]}),r=i.Tmonad(n);try{o.reduce(function(t,n){return t.replace(new RegExp(n[0],"g"+(e?"i":"")),n[1])},r.value)}catch(t){r.valid=!1}return i.finishTMonad(r,"string","Replace")}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),o=n(1);e.doURI=function(t,e,n){void 0===e&&(e=!1),void 0===n&&(n=!1);var r=i.Tmonad(t);if(r.stop)return r;try{r.value=e?n?encodeURIComponent(r.value):encodeURI(r.value):n?decodeURIComponent(r.value):decodeURI(r.value)}catch(t){r.valid=!1}return r.type=o.getType(r.value),r.instanceof.push(e?"encodeUri":"decodeUri"),r},e.EncodeUri=function(t){return e.doURI(t,!0)},e.DecodeUri=function(t){return e.doURI(t)},e.EncodeUriComponent=function(t){return e.doURI(t,!0,!0)},e.DecodeUriComponent=function(t){return e.doURI(t,!1,!0)}},,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=function(t,e,n){void 0===t&&(t={}),void 0===e&&(e=""),void 0===n&&(n=void 0);var i=[t];e&&e.toString().split&&(i=[t].concat(e.toString().split(".")));var o=i.reduce(function(t,e){if(void 0===t)return n;if(-1===e.indexOf(".")&&e.indexOf("(")>-1){var i=/\((.*?)\)/g.exec(e),o=(i?i[1]:"").split(",").map(function(t){return t.trim()}),r=e.split("(")[0];if("function"==typeof t[r])return t[r].apply(t,o)}return e?t[e]:t});return void 0===o?n:o}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),o=n(3),r=n(15),s=n(9),a=n(5);e.ToArray=function(t){var e=i.Tmonad(t),n={};return e.stop?e:(n="string"===e.type?o.default(s.ToPlainText,r.FromJSON)(e):e,i.finishTMonad(n,"array","ToArray"))},e.Join=function(t){return function(e){var n=i.Tmonad(e);return n.stop?n:i.finishTMonad(n.value.join(t),"string","Join")}},e.Map=function(t){return function(n){var r=i.Tmonad(n);if(r.stop)return r;return i.finishTMonad(o.default(e.ToArray,a.StopIfInvalid,function(e){return e.value=e.value.map(t),e})(r),"array","Map")}},e.Filter=function(t){return function(n){var r=i.Tmonad(n);if(r.stop)return r;return i.finishTMonad(o.default(e.ToArray,a.StopIfInvalid,function(e){return e.value=e.value.filter(t),e})(r),"array","Filter")}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0);e.ToEntities=function(t){var e=i.Tmonad(t);return e.stop?e:("string"===e.type?(e.value=e.value.replace(/\&/g,"&amp;").replace(/\>/g,"&gt;").replace(/\</g,"&lt;").replace(/"/g,"&quot;").replace(/`/g,"&apos;"),e.valid=!0):e.valid=!1,e.instanceof.push("ToEntities"),e)},e.FromEntities=function(t){var e=i.Tmonad(t);return e.stop?e:("string"===e.type?(e.value=e.value.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g,'"').replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g,"'"),e.valid=!0):e.valid=!1,e.instanceof.push("FromEntities"),e)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),o=n(1),r=n(10);e.FromJSON=function(t){var e=i.Tmonad(t);if(e.stop)return e;try{e.value=JSON.parse(r.DecodeUriComponent(e.value).value),e.valid=!0}catch(t){e.valid=!1}return e.type=o.getType(e.value),e.instanceof.push("FromJSON"),["object","array"].indexOf(e.type)>-1&&(e.valid=!0),e},e.ToJSON=function(t){var n=e.FromJSON(t);if(n.stop)return n;try{n.value=JSON.stringify(n.value),n.valid=!0}catch(t){n.valid=!1}return n.type=o.getType(n.value),n.instanceof.push("ToJSON"),n}},,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),o=n(3),r=n(9),s=n(5),a=n(13);e.CommasToArray=function(t){var e=i.Tmonad(t);return e.stop?e:i.finishTMonad(o.default(a.ToArray,s.IfInvalid(o.default(r.ToPlainText,r.Split(","))(e)))(e),"array","CommasToArray")}},function(t,e,n){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=n(3),s=n(13),a=n(5),u=n(18);e.Options=function(t){var e=o.Tmonad(t);if(e.stop)return e;var n=s.Map(function(t){return"object"===i(t)&&t.hasOwnProperty("value")?(t.hasOwnProperty("label")||(t.label=t.value),t):{value:t,label:t}});return o.finishTMonad(r.default(u.CommasToArray,a.IfInvalid([]),n)(e),"array","Options")}},,,,,,function(t,e,n){"use strict";var i,o=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var r=n(39),s=n(40),a=n(2),u=n(19),c=n(9),l=n(3),p=n(5),f=n(41),d=n(42),h=n(12),v={lines:function(t){return l.default(d.ToNumber,p.IfInvalid(5))(t).value},value:function(t,e){var n=void 0===e.value&&void 0===e.filteredOptions[0]&&e.options?e.options[0]:e.filteredOptions[0],i=n?n.value:void 0;return void 0===t?i:0===e.filteredOptions.filter(function(e){return t.toString()===e.value.toString()}).length?i:t},options:function(t,e){var n=u.Options(t);return n.valid?n.value:e.options&&e.options.length?e.options:[]},filter:function(t){return l.default(c.ToString,p.IfInvalid(""))(t).value},spacing:function(t){return l.default(d.ToNumber,p.IfInvalid(1.5))(t).value}},y=function(t){function e(){var e=t.call(this)||this;return e.state={},e.lineHeights=[],e.filteredOptions=[],Object.keys(v).forEach(function(t){e.state[t]=new a.default(v[t](e[t],e)),Object.defineProperty(e,t,{get:function(){return"value"===t&&this.filteredOptions.length?this.Value:this.state[t].value},set:function(e){if(this.state[t]){var n=v[t](e,this);return this.state[t].value!==n?this.state[t].next(n):void 0}}})}),e}return o(e,t),Object.defineProperty(e.prototype,"selectedIndex",{get:function(){for(var t=0,e=0;e<this.filteredOptions.length;e++)if(this.filteredOptions[e].value===this.state.value.value){t=e;break}return t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"Value",{get:function(){return h.default(this,"filteredOptions."+this.selectedIndex+".value",void 0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"values",{get:function(){return this.state.options?this.state.options.value.map(function(t){return t.value}):[]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"observedAttributes",{get:function(){return Object.keys(v)},enumerable:!0,configurable:!0}),e.prototype.attributeChangedCallback=function(t,e,n){n!==e&&(this[t]=n)},e.prototype.connectedCallback=function(){var t=this;if(!this.shadowRoot){var e,n=(e=this,{value:function(){e.setOptionsClasses(),e.onValueChange()},options:function(){e.setOptions(),e.onOptionsChange()},lines:function(){e.setOptions(),e.onLinesChange()},filter:function(){e.setOptions(),e.onFilterChange()},spacing:function(){e.setOptions(),e.onSpaceChange()}}),i=document.createElement("template");i.innerHTML=""+s.default+r.default;var o=document.importNode(i.content,!0);this.attachShadow({mode:"open"}).appendChild(o),this.setElements(),this.setOptions(),Object.keys(v).forEach(function(e){n[e]&&t.state[e].subscribe(function(t){return n[e](t)})});var a=0;this.$list.addEventListener("mousewheel",function(e){e.preventDefault(),(a+=e.deltaY/15)<=-1?(t.previous(),a=0):a>=1&&(t.next(),a=0)},!1),this.$list.onkeydown=function(e){38===e.which?(e.preventDefault(),t.previous()):40===e.which&&(e.preventDefault(),t.next())},requestAnimationFrame(function(){t.ready=!0})}},e.prototype.move=function(t){this.value=this.filteredOptions[this.selectedIndex+t]?this.filteredOptions[this.selectedIndex+t].value:this.value},e.prototype.next=function(){this.move(1)},e.prototype.previous=function(){this.move(-1)},e.prototype.setElements=function(){this.$list=this.shadowRoot.querySelector(".rotary-list-inner"),this.$optionStyles=this.shadowRoot.querySelector("#option-styles"),this.$heightIndicator=this.shadowRoot.querySelector(".rotary-list-height")},e.prototype.filterOptions=function(){var t=this;this.filteredOptions=this.filter?this.options.filter(function(e){return e.value.toString().startsWith(t.filter.toString())}):this.options.slice()},e.prototype.getOptionClassCount=function(){return Math.round(Math.min(this.lines,this.filteredOptions.length)/2)},e.prototype.setLines=function(){var t=[],e=this.getOptionClassCount(),n=1/e,i=0;for(this.lineHeights=[];i<e+1;){var o=i+1,r=i===e?0:(1-i*n)*(100*this.spacing),s=i===e?0:1-i*n,a=i===e?0:1-i*(1/(1.25*e));t.push(".rotary-list-option.option"+o+"{line-height: "+r+"%; transform: scale(1, "+s+"); opacity: "+a+";}"),this.lineHeights.push(r),i&&this.lineHeights.push(r),i+=1}this.$optionStyles.innerHTML=t.join(" ")},e.prototype.setOptions=function(){var t=this;this.$list.classList.add("no-transition"),this.filterOptions(),this.setLines();var e=this.getOptionClassCount();this.$list.innerHTML="",this.filteredOptions.forEach(function(e){var n=t.$list.children.length,i=document.createElement("div");i.textContent=e.label,i.setAttribute("value",e.value),i.className="rotary-list-option",t.$list.appendChild(i),i.addEventListener("click",function(){return t.value=t.values[n]})});for(var n=0;n<=e;){var i=document.createElement("div"),o=document.createElement("div");i.className="rotary-list-option",o.className="rotary-list-option",i.innerHTML="&nbsp;",o.innerHTML="&nbsp;",i.setAttribute("empty-option","1"),o.setAttribute("empty-option","1"),this.$list.appendChild(i),this.$list.insertBefore(o,this.$list.children[0]),n+=1}this.setOptionsClasses()},e.prototype.setOptionsClasses=function(){var t=this;cancelAnimationFrame(this.optionsTimer),this.$heightIndicator.style.lineHeight=100*this.spacing+"%";var e=this.$heightIndicator.clientHeight,n=0;this.lineHeights.forEach(function(i){return n+=i/100*(e/t.spacing)}),this.$list.style.height=Math.ceil(n)-this.getOptionClassCount()+"px",this.$list.style.overflow="hidden",this.optionsTimer=requestAnimationFrame(function(){var e=t.$list.querySelectorAll("[empty-option]").length/2,n=t.getOptionClassCount()+1,i=Array.from(t.$list.children),o=t.selectedIndex+e;clearTimeout(t.transitionTimer);for(var r=1;i[o-r];){i[o-r].className="rotary-list-option option"+(r<n?r+1:n),r+=1}for(var s=1;i[o+s];){i[o+s].className="rotary-list-option option"+(s<n?s+1:n),s+=1}var a=function(){i[o].removeEventListener(f.EventName("transitionend"),u,!0)},u=function(){clearTimeout(t.transitionTimer),t.transitionTimer=setTimeout(function(){a()},200)};if(t.$list.classList.remove("no-transition"),i[o]){if(i[o].classList.contains("option1"))return a();i[o].addEventListener(f.EventName("transitionend"),u,!0),i[o].className="rotary-list-option option1"}})},e.prototype.dispatch=function(t,e){var n=new CustomEvent(t,{detail:e});this.dispatchEvent(n)},e.prototype.onSpaceChange=function(){this.dispatch("spacechange",this.spacing)},e.prototype.onValueChange=function(){this.dispatch("valuechange",this.value)},e.prototype.onOptionsChange=function(){this.dispatch("optionschange",this.options)},e.prototype.onLinesChange=function(){this.dispatch("lineschange",this.lines)},e.prototype.onFilterChange=function(){this.dispatch("filterchange",this.filter)},e}(HTMLElement);e.RotaryList=y,window.customElements.get("rotary-list")||window.customElements.define("rotary-list",y)},,,,,,,,,,,,,,function(t,e,n){"use strict";n.r(e),e.default='<div class="rotary-list-container"><style id="option-styles"></style><div class="rotary-list-height">&nbsp;</div><div class="rotary-list-inner"tabindex="-1"></div></div>'},function(t,e,n){"use strict";n.r(e),e.default="<style>:host,:root,rotary-list{display:block;width:100%;max-width:100%;position:relative}.rotary-list-container{height:100%}.rotary-list-inner{text-align:center;outline:0!important;min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .2s ease-in-out}.rotary-list-inner.transitioning{opacity:.5}.rotary-list-height{opacity:0;position:absolute;pointer-events:none;line-height:100%}.rotary-list-option{white-space:nowrap;display:flex;align-items:center;justify-content:center;width:100%;font-family:inherit;line-height:inherit;font-size:inherit;font-weight:inherit;cursor:pointer;transform-origin:center center;transition:transform .1s,line-height .1s,opacity .1s,color .1s}.rotary-list-option.option1{color:#59a2d8}.rotary-list-inner.no-transition{opacity:0;transition:none}.rotary-list-inner.no-transition .rotary-list-option{transition:none}</style>"},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={transitionend:{transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"}},o=document.createElement("fakeelement");e.EventName=function(t){if(!i[t])return"";var e;if(t.indexOf("transition")>-1)for(e in i[t])if(void 0!==o.style[e])return i[t][e];return""}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),o=n(1);e.ToNumber=function(t){var e=i.Tmonad(t);return e.stop?e:("string"!==e.type||o.empty(e.value)||(e.value=parseFloat(e.value.replace(/[^0-9,.]+/g,""))),e.type=o.getType(e.value),e.instanceof.push("ToNumber"),e.valid=!isNaN(e.value),e)}}]);