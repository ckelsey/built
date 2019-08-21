!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.builtjs=t():e.builtjs=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=25)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);t.isTMonad=function(e){return!!e&&e.hasOwnProperty("valid")&&"boolean"===r.getType(e.valid)&&e.hasOwnProperty("instanceof")&&"array"===r.getType(e.instanceof)&&e.hasOwnProperty("type")&&"string"===r.getType(e.type)&&e.hasOwnProperty("value")},t.Tmonad=function(e){return t.isTMonad(e)?{valid:e.valid,value:e.value,type:r.getType(e.value),stringChanges:e.stringChanges,instanceof:e.instanceof,stop:e.stop}:{valid:!0,value:e,type:r.getType(e),stringChanges:[],instanceof:[],stop:!1}},t.finishTMonad=function(e,t,n){return e.type=r.getType(e.value),e.valid="?"===t||e.type===t,e.instanceof.push(n),e}},function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.primitives=["string","number","null","undefined","function"],t.isDom=function(e){return e instanceof Element||e instanceof Node},t.isString=function(e){return"string"==typeof e},t.isPrimitive=function(e){return t.primitives.indexOf(r(e))>-1},t.isArray=function(e){return Array.isArray(e)},t.isDate=function(e){var t=e;try{t=new Date(Date.parse(e))}catch(e){return!1}return"Invalid Date"!==t&&!isNaN(t)&&t instanceof Date},t.isObject=function(e){return r(e).indexOf("object")>-1},t.empty=function(e){var n=t.getType(e);return""===e||"undefined"===n||null==n||"array"===n&&0===e.length||"object"===n&&0===Object.keys(e).length},t.anyEmpty=function(e){return t.empty(e)||"false"===e||"undefined"===e||"null"===e},t.getType=function(e){return null===e?null:t.isPrimitive(e)?r(e):t.isDom(e)?"dom":t.isArray(e)?"array":t.isDate(e)?"date":t.isObject(e)?"object":r(e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t){return e.reduce(function(e,t){return"function"!=typeof t?e:t(e)},t)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(2),a=n(8),i=n(12),u=n(10),s=n(4),c=n(6),l=n(5);t.Trim=function(e){if(u.default(e,"stop",!1))return r.Tmonad(e);var t=r.Tmonad(e);try{t.value=t.value.trim()}catch(e){}return t.instanceof.push("Trim"),t},t.ToPlainText=function(e){var n=r.Tmonad(e);return n.stop?n:(n="string"!==n.type?o.default(t.ToString,s.StopIfInvalid,a.DecodeUriComponent,i.FromEntities)(n):o.default(a.DecodeUriComponent,i.FromEntities)(n),r.finishTMonad(n,"string","ToPlainText"))},t.ToString=function(e){if(u.default(e,"stop",!1))return r.Tmonad(e);var t=r.Tmonad(e);try{t.value=t.value.toString()}catch(e){}return t.valid="string"==typeof t.value,t.instanceof.push("ToString"),t},t.Split=function(e){return function(n){var o=r.Tmonad(n);if(o.stop)return o;"string"!==o.type&&(o=t.ToString(o));try{var a=c.SplitMeta(o.value,e);if("string"==typeof a.value)throw new Error("not array");o.stringChanges=o.stringChanges.concat(a.stringChanges),o.value=a.value}catch(e){o.valid=!1}return r.finishTMonad(o,"array","Split")}},t.Replace=function(e,n){return function(o){var a=r.Tmonad(o);if(a.stop)return a;"string"!==a.type&&(a=t.ToString(a));try{var i=c.ReplaceMeta(a.value,e,n);a.value=i.value,a.valid=!0,a.stringChanges=a.stringChanges.concat(i.stringChanges)}catch(e){a.valid=!1}return r.finishTMonad(a,"string","Replace")}},t.AfterEveryNth=function(e,n){return function(a){var i=r.Tmonad(a),u=0,s=[];if(i.stop)return i;"string"!==i.type&&(i=t.ToString(i));var c=l.Map(function(t,r){var o="";return(r+1)%e==0&&0!==r?(o=""+t+n,s.push({start:u,end:u+(1+n.length),input:t,length:1+n.length,result:o,added:n}),u+=n.length):(o=t,u+=1),o}),f=o.default(t.Split(""),c,l.Join(""))(i);return f.stringChanges=f.stringChanges.concat(s),f.valid="string"==typeof f.value&&14===f.value.length,f.instanceof.push("AfterEveryNth"),f}},t.BeforeEveryNth=function(e,n){return function(a){var i=r.Tmonad(a),u=0,s=[];if(i.stop)return i;"string"!==i.type&&(i=t.ToString(i));var c=l.Map(function(t,r){var o="";return(r+1)%e==0&&0!==r?(o=""+n+t,s.push({start:u,end:u+(1+n.length),input:t,length:1+n.length,result:o,added:n}),u+=n.length):(o=t,u+=1),o}),f=o.default(t.Split(""),c,l.Join(""))(i);return f.stringChanges=f.stringChanges.concat(s),f.valid="string"==typeof f.value&&14===f.value.length,f.instanceof.push("BeforeEveryNth"),f}},t.Match=function(e){return function(n){var o=r.Tmonad(n);if(o.stop)return o;"string"!==o.type&&(o=t.ToString(o));var a=c.MatchMeta(o.value,e,!0);return o.value=a.value,o.valid=1===o.value.length,o.stringChanges=o.stringChanges.concat(a.stringChanges),o.instanceof.push("Match"),o}},t.MatchAll=function(e){return function(n){var o=r.Tmonad(n);if(o.stop)return o;"string"!==o.type&&(o=t.ToString(o));var a=c.MatchMeta(o.value,e);return o.value=a.value,o.valid=o.value.length>0,o.stringChanges=o.stringChanges.concat(a.stringChanges),o.instanceof.push("MatchAll"),o}},t.UpperCase=function(e){var t=e;try{t.value=t.value.toUpperCase()}catch(e){t.valid=!1}return t.instanceof.push("UpperCase"),t},t.Capitalize=function(e){var t=e;try{t.value=""+t.value.slice(0,1).toUpperCase()+(t.value.slice(1)||"")}catch(e){t.valid=!1}return t.instanceof.push("Capitalize"),t},t.LowerCase=function(e){var t=e;try{t.value=t.value.toLowerCase()}catch(e){t.valid=!1}return t.instanceof.push("LowerCase"),t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(1);t.IfInvalid=function(e){return function(t){var n=r.Tmonad(t);return n.stop||n.valid?n:(n.instanceof.push("IfInvalid"),Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])}))}},t.IfValid=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfValid"),n.stop||!n.valid?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.IfEmpty=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfEmpty"),n.stop||o.empty(n.value)?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.IfNotEmpty=function(e){return function(t){var n=r.Tmonad(t);return n.instanceof.push("IfNotEmpty"),n.stop||!o.empty(n.value)?n:Object.assign({},r.Tmonad(e),{instanceof:n.instanceof.concat(["T"])})}},t.StopIfInvalid=function(e){var t=r.Tmonad(e);return t.valid||(t.stop=!0),t.instanceof.push("StopIfInvalid"),t},t.StopIfValid=function(e){var t=r.Tmonad(e);return t.valid&&(t.stop=!0),t.instanceof.push("StopIfValid"),t},t.StopIfEmpty=function(e){var t=r.Tmonad(e);return o.empty(t.value)&&(t.stop=!0),t.instanceof.push("StopIfEmpty"),t},t.IfNot=function(e,t){return function(n){var o=r.Tmonad(n);if(e=r.Tmonad(e),o.valid=o.value===e.value,!o.valid){var a=r.Tmonad(t);return a.instanceof.push("IfNot"),a}return o.instanceof.push("IfNot"),o}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(2),a=n(14),i=n(3),u=n(4),s=n(1),c=n(6);t.ToArray=function(e){var t=r.Tmonad(e),n={};return t.stop?t:(n="string"===t.type?o.default(i.ToPlainText,a.FromJSON)(t):t,r.finishTMonad(n,"array","ToArray"))},t.Join=function(e){return function(t){var n=r.Tmonad(t);if(n.stop)return n;var o=c.JoinMeta(n.value,e);return n.value=o.value,n.stringChanges=n.stringChanges.concat(o.stringChanges),n.valid="string"==typeof n.value,r.finishTMonad(n,"string","Join")}},t.Map=function(e){return function(n){var a=r.Tmonad(n);if(a.stop)return a;return r.finishTMonad(o.default(t.ToArray,u.StopIfInvalid,function(t){return"array"!==s.getType(t.value)?(t.valid=!1,t):(t.value=t.value.map(e),t)})(a),"array","Map")}},t.Filter=function(e){return function(n){var a=r.Tmonad(n);if(a.stop)return a;return r.finishTMonad(o.default(t.ToArray,u.StopIfInvalid,function(t){return t.value=t.value.filter(e),t})(a),"array","Filter")}},t.IndexOf=function(e){return function(n){var o=r.Tmonad(n);if(o.stop)return o;var a=t.ToArray(e);return a.valid?(o.valid=a.value.indexOf(o.value)>-1,o.instanceof.push("IndexOf"),o):(o.valid=!1,o)}},t.Slice=function(e,t){return function(n){var o=r.Tmonad(n);if(o.stop)return o;try{var a=o.value.slice();o.value=a.slice(e,t),"string"==typeof a&&(0!==e&&o.stringChanges.push({start:0,end:e,input:a,length:e,result:a.slice(0,e),removed:a.slice(0,e)}),t<a.length&&o.stringChanges.push({start:t,end:a.length,input:a,length:a.length-t,result:a.slice(t),removed:a.slice(t)}))}catch(e){o.valid=!1}return o.instanceof.push("Slice"),o}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(16),o=n(3);t.MatchMeta=function(e,t,n){void 0===n&&(n=!1);var a=[],i=[],u="string"==typeof e?e:o.ToString(e).value,s=function(){return i[i.length-1]},c=!1;u.replace(r.ToRegex(t).value,function(){if(!n||!c){c=!0;var e=[].slice.call(arguments,0);if(""!==e[0]){var t=e.splice(-2);e.index=t[0],e.input=t[1];var r=s(),o=e[0].length,u={start:e.index,end:e.index+o,input:e.input,length:o,result:e[0],removed:void 0};u.start&&r&&r.end!==u.start?u.removed=u.input.slice(r.end,u.start):delete u.removed,a.push(u.result),i.push(u)}}});var l=s();if(l.end<u.length){var f=u.slice(l.end);i.push({start:l.end,end:u.length,input:u,length:u.length-l.end,result:f,removed:f})}return{value:a,stringChanges:i}},t.ReplaceMeta=function(e,t,n){for(var o,a=r.ReplacementPattern(n),i={value:e.toString(),stringChanges:[]},u=i.value,s=0;null!==(o=r.ToRegex(t).value.exec(u));){var c=o.index+o[0].length,l={start:o.index,end:c,input:o.input,length:o[0].length,result:"",removed:o[0],pre:"",post:"",index:s};l.pre=0!==l.start?u.slice(0,l.start):"",l.post=u.slice(c),l.result=""+l.pre+l.post,o.length>1&&a.length&&(l.added=a.reduce(function(e,t){return"string"==typeof t?""+e+t:""+e+(o[t.index]||"")},""),l.length=l.added.length,l.end=o.index+l.length,l.result=""+l.pre+(l.added||"")+l.post),i.stringChanges.push(l),u=l.post,s+=1}return i.stringChanges.length&&(i.value=i.stringChanges.reduce(function(e,t,n){var r=t.added||"",o=n!==i.stringChanges.length-1?"":t.post;return""+e+t.pre+r+o},"")),i},t.RemoveMeta=function(e,t){for(var n,o={value:e.toString(),stringChanges:[]};null!==(n=r.ToRegex(t).value.exec(o.value));){var a={start:n.index,end:n.index+n[0].length,input:n.input,length:n[0].length,result:"",removed:n[0]},i=0!==a.start?o.value.slice(0,a.start):"",u=o.value.slice(a.end);a.result=""+i+u,o.stringChanges.push(a),o.value=a.result}return o},t.SplitMeta=function(e,t){var n;void 0===t&&(t="");var o=[],a={value:e,stringChanges:[]};try{if(!e||!t&&""!==t)return a;t=r.ToRegex(t).value;var i=a.value.toString();if("/(?:)/"===t.toString())return{value:i.split(""),stringChanges:[]};for(;null!==(n=r.ToRegex(t).value.exec(i));){var u=n.toString().length,s={start:n.index,end:n.index+u,input:n.input,length:u,result:[],removed:n[0]},c=0!==s.start?i.slice(0,s.start):"",l=i.slice(s.end);s.result=[c,l],a.stringChanges.push(s),o.push(c),i=l}o.push(i),a.value=o.filter(function(e){return!!e})}catch(e){}return a},t.JoinMeta=function(e,t){var n={value:e,stringChanges:[]};if(!t)return n.value=n.value.join(t),n;try{for(var r=1,o=n.value[r]||"";r<n.value.length;)n.stringChanges.push({start:o.length,end:o.length+t.length,input:n.value[r],length:t.length,result:"",added:t}),o=""+o+t+n.value[r],r+=1;n.value=o}catch(e){}return n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(1),a=n(6),i=n(3);t.ToNumber=function(e){var t=r.Tmonad(e);return t.stop?t:("string"!==t.type||o.empty(t.value)||(t.value=parseFloat(t.value)),t.type=o.getType(t.value),t.instanceof.push("ToNumber"),t.valid=!isNaN(t.value),t)},t.ToDigits=function(e){var t=r.Tmonad(e);if(t.stop)return t;"string"!==t.type&&(t=i.ToString(t));try{var n=a.RemoveMeta(t.value,/[^\d]+/g);t.stringChanges=t.stringChanges.concat(n.stringChanges),t.value=n.value.toString(),t.valid=!!t.value}catch(e){t.valid=!1}return t.type=o.getType(t.value),t.instanceof.push("ToDigits"),t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(1);t.doURI=function(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);var a=r.Tmonad(e);if(a.stop)return a;try{a.value=t?n?encodeURIComponent(a.value):encodeURI(a.value):n?decodeURIComponent(a.value):decodeURI(a.value)}catch(e){a.valid=!1}return a.type=o.getType(a.value),a.instanceof.push(t?"encodeUri":"decodeUri"),a},t.EncodeUri=function(e){return t.doURI(e,!0)},t.DecodeUri=function(e){return t.doURI(e)},t.EncodeUriComponent=function(e){return t.doURI(e,!0,!0)},t.DecodeUriComponent=function(e){return t.doURI(e,!1,!0)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return void 0===e&&(e=""),(""+e+((new Date).getTime()/1e3|0).toString(16)+"xxxxxxxxxxxxxxxx").replace(/[x]/g,function(){return(16*Math.random()|0).toString(16)}).toLowerCase()}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t,n){if(void 0===e&&(e={}),void 0===t&&(t=""),void 0===n&&(n=void 0),!e)return n;var r=[e];t&&t.toString().split&&(r=[e].concat(t.toString().split(".")));var o=r.reduce(function(e,t){if(void 0===e)return n;if(-1===t.indexOf(".")&&t.indexOf("(")>-1){var r=/\((.*?)\)/g.exec(t),o=(r?r[1]:"").split(",").map(function(e){return e.trim()}),a=t.split("(")[0];if("function"==typeof e[a])return e[a].apply(e,o)}return t?e[t]:e});return void 0===o?n:o}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.eventNames=["focus","blur","error","load","animationstart","animationend","animationiteration","transitionstart","transitioncancel","transitionend","transitionrun","reset","submit","resize","scroll","keydown","keypress","keyup","click","dblclick","mouseenter","mouseover","mouseout","mouseleave","mousedown","mousemove","mouseup","select","wheel","drag","dragend","dragstart","dragenter","dragover","dragleave","drop","play","pause","change","input","visibilitychange","touchcancel","touchstart","touchend","touchmove","touchenter","touchleave"],t.inputTypes=["button","checkbox","color","date","date-local","email","file","hidden","image","month","number","password","radio","range","reset","search","select","submit","tel","text","textarea","time","url","week"],t.svgTags=["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","audio","canvas","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","video","view","vkern"],t.htmlTags=["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"],t.setInputCaret=function(e,t,n){if(e&&n&&n.activeElement===e){if(e.createTextRange){var r=e.createTextRange();r.move("character",t),r.select()}else e.selectionStart&&e.setSelectionRange(t,t);return e}},t.getCSSFromSelector=function(e){var t=Array.from(document.body.ownerDocument.styleSheets),n=[];return t.forEach(function(t){return Array.from(t.rules).forEach(function(t){return t.cssText.split("{")[0].trim().indexOf(e)>-1?n.push(t.cssText):void 0})}),n},t.getCSS=function(e){if(!e||!e.ownerDocument||!e.ownerDocument.styleSheets)return[];var t=Array.from(e.ownerDocument.styleSheets),n=[];return e.matches||(e.matches=e.matchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;--n>=0&&t.item(n)!==this;);return n>-1}),t.forEach(function(t){return Array.from(t.rules).forEach(function(t){return e.matches(t.cssText.split("{")[0].trim())?n.push(t.cssText):void 0})}),n},t.webComponentTemplate=function(e,n,r,o,a){var i=a?t.getCSSFromSelector(a).join(" "):"",u=""+t.extractStyleRules(o)+i,s=document.createElement("template");s.innerHTML=n,t.appendStyleElement(t.extractStyleRules(u),s.content);var c=document.importNode(s.content,!0);r.attachShadow({mode:"open"}).appendChild(c),"registerElement"in document||document.head.querySelector('style[name="'+e+'"]')||t.appendStyleElement(t.extractStyleRules(u),document.head,e)},t.appendStyleElement=function(e,t,n){void 0===n&&(n="");var r=document.createElement("style");if(r.setAttribute("type","text/css"),r.setAttribute("name",n),r.style.display="none",t.appendChild(r),r.styleSheet)r.styleSheet.cssText=e;else{var o=document.createTextNode(e);r.appendChild(o)}},t.extractStyleRules=function(e){return e?e.replace("<style>","").replace("</style>",""):""},t.getValue=function(e){var t=e.type;if("checkbox"===t||"radio"===t)return e.checked;if("select"===t&&e.selectedOptions){var n=Array.from(e.selectedOptions).map(function(e){return e.value});return n.length<2?n[0]:n}return e.value},t.getInvalidMessage=function(e){var t;try{t=""===e.validationMessage?void 0:e.validationMessage}catch(e){}return t&&"."===t[t.length-1]&&(t=t.substring(0,t.length-1)),t},t.isAutoFilled=function(e){var t=e.matches||e.msMatchesSelector;try{return t.call(e,":-webkit-autofill")}catch(n){try{return t.call(e,":-moz-autofill")}catch(n){try{return t.call(e,":-ms-autofill")}catch(n){try{return t.call(e,":-o-autofill")}catch(n){try{return t.call(e,":autofill")}catch(e){return!1}}}}}},t.isFocused=function(e){if(e.focused)return!0;var t=e.matches||e.msMatchesSelector;try{return t.call(e,":focus")}catch(e){return!1}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.ToEntities=function(e){var t=r.Tmonad(e);return t.stop?t:("string"===t.type?(t.value=t.value.replace(/\&/g,"&amp;").replace(/\>/g,"&gt;").replace(/\</g,"&lt;").replace(/"/g,"&quot;").replace(/`/g,"&apos;"),t.valid=!0):t.valid=!1,t.instanceof.push("ToEntities"),t)},t.FromEntities=function(e){var t=r.Tmonad(e);return t.stop?t:("string"===t.type?(t.value=t.value.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g,'"').replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g,"'"),t.valid=!0):t.valid=!1,t.instanceof.push("FromEntities"),t)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(1);t.ToBool=function(e){var t=r.Tmonad(e);if(t.stop)return t;switch(t.value){case"0":case 0:case"off":case"false":case!1:t.value=!1,t.valid=!0;break;case"1":case 1:case"on":case"true":case!0:t.value=!0,t.valid=!0;break;default:t.value=!1,t.valid=!1}return t.type=o.getType(t.value),t.instanceof.push("ToBool"),t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(1),a=n(8);t.FromJSON=function(e){var t=r.Tmonad(e);if(t.stop)return t;try{t.value=JSON.parse(a.DecodeUriComponent(t.value).value),t.valid=!0}catch(e){t.valid=!1}return t.type=o.getType(t.value),t.instanceof.push("FromJSON"),["object","array"].indexOf(t.type)>-1&&(t.valid=!0),t},t.ToJSON=function(e){var n=t.FromJSON(e);if(n.stop)return n;try{n.value=JSON.stringify(n.value),n.valid=!0}catch(e){n.valid=!1}return n.type=o.getType(n.value),n.instanceof.push("ToJSON"),n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(9);t.Observe=function(e,t){void 0===t&&(t=!1);var n=Object.assign({},{value:e,previousValue:void 0,updated:(new Date).getTime()}),o={},a={},i=function(e,t,n){void 0===n&&(n={}),Object.keys(o).forEach(function(r){var a=o[r][e];a&&"function"==typeof a&&a(t,n)}),Object.keys(a).forEach(function(r){"function"==typeof a[r]&&a[r](e,t,o,n)})};return{get value(){return n.value},get previous(){return n.previousValue},next:function(e){n=Object.assign({},{value:e,previousValue:n.value,updated:(new Date).getTime()}),i("next",n.value,n)},error:function(e){i("error",e,n)},complete:function(){i("complete",n)},tap:function(e){a[r.default()]=e},subscribe:function(e,i,u){var s=Object.assign({},{next:e,error:i,complete:u,id:r.default()});return o[s.id]=s,t||void 0===n.value||"function"!=typeof s.next||s.next(n.value,n),function(e){return function(){o[e.id]=null,delete o[e.id],Object.keys(a).forEach(function(t){"function"==typeof a[t]&&a[t]("unsubscribe",e,o,n)})}}(s)}}}},function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=n(3),i=n(7),u=n(2);t.ReplacementPattern=function(e){if(!e)return[];var t=a.ToString(e).value,n=t.match(/(\$\d+)+/g)||[],r=t.split(new RegExp("["+n.join("|")+"]")),o=n?n.map(function(e){return u.default(i.ToDigits,i.ToNumber)(e).value}):[],s=[];return r.forEach(function(e,t){if(""!==e)s.push(e);else if(0===t||t===r.length-1){var n=o.shift();return s.push({index:n,original:"$"+n})}}),s},t.ToRegex=function(e){var t=o.Tmonad(e);if(t.value){if("function"!=typeof t.value.split&&"object"===r(t.value))t.value=new RegExp(t.value);else if("string"==typeof t.value)if(0===t.value.indexOf("/")){var n=t.value.split("/").filter(function(e){return!!e}),a=n.pop();a.match(/[^gmisuy]/)&&(n.push(a),a=void 0),t.value=new RegExp(n.join("/"),a)}else t.value=new RegExp(t.value)}else t.value=new RegExp("");return t.valid=!0,t.instanceof.push("ToRegex"),t.type="object",t}},function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var a=n(22),i=n(23),u=n(15);t.Constructor=function(e){var t=e.componentName,n=e.observedAttributes||[],r=e.template||"<slot></slot>",s=e.style||"",c=e.componentRoot,l=e.properties,f=e.elements,d=e.methods,p=e.computed,v=e.getters,h=e.setters,g=e.onConnected,m=e.onDisconnected;if(t)return function(e){function y(){var t=e.call(this)||this;return t.state={},t.elements={},t.disconnectElements=function(){},t}return o(y,e),Object.defineProperty(y,"observedAttributes",{get:function(){return n},enumerable:!0,configurable:!0}),y.prototype.attributeChangedCallback=function(e,t,n){n!==t&&(this[e]=n)},y.prototype.connectedCallback=function(){var e=this;if(this.shadowRoot||a.Template(t,this,r,s,c),p&&Object.keys(p).forEach(function(t){Object.defineProperty(e,t,p[t](e))}),d&&Object.keys(d).forEach(function(t){return e[t]=d[t](e)}),f){var n=i.Elements(this,f);this.elements=n.state,this.disconnectElements=n.disconnect}l&&Object.keys(l).forEach(function(t){if("function"==typeof l[t].format){e.state[t]=u.Observe(l[t].format(e[t],e));try{Object.defineProperty(e,t,{get:function(){return v&&v[t]?v[t](this):this.state[t].value},set:function(e){if(this.state[t]){if(h&&h[t])return h[t](this)(e);var n=l[t].format(e,this);this.state[t].value!==n&&this.state[t].next(n)}}})}catch(e){}"function"==typeof l[t].onChange&&e.state[t].subscribe(function(n){l[t].onChange(n,e)})}}),g&&g(this)},y.prototype.disconnectedCallback=function(){var e=this;this.state&&Object.keys(this.state).forEach(function(t){e.state[t].complete()}),this.disconnectElements(),m&&m(this)},y}(HTMLElement)},t.Define=function(e,t){var n=window.WebComponents;n&&n.ready?window.customElements.get(e)||window.customElements.define(e,t):window.addEventListener("WebComponentsReady",function(){window.customElements.get(e)||window.customElements.define(e,t)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t,n){if(void 0===n&&(n={}),n=Object.assign({},{preventDefault:!1,stopPropagation:!1,useCapture:!1},n),e&&t){var r,o,a={},i=function(e){if(0===Object.keys(a).length)return u();var t,i;n.preventDefault&&e.preventDefault(),n.stopPropagation&&e.stopPropagation(),o=r,r=e,t="next",i=e,Object.keys(a).forEach(function(e){return a[e][t](i)})},u=function(){e.removeEventListener(t,i,n.useCapture)},s=function(e){return function(){a[e]=null,delete a[e],0===Object.keys(a).length&&u()}},c={get value(){return r},get previous(){return o},dispose:function(){u(),Object.keys(a).forEach(function(e){a[e].complete(),s(e)})},subscribe:function(r,o,u){if(void 0===o&&(o=function(){}),void 0===u&&(u=function(){}),"function"==typeof r||"function"==typeof o||"function"==typeof u){var c=Object.assign({},{next:r,error:o,complete:u},{id:(new Date).getTime()+"_"+Object.keys(a).length+"_"+Math.round(1e4*Math.random())});return a[c.id]=c,e.removeEventListener(t,i,n.useCapture),e.addEventListener(t,i,n.useCapture),s(c.id)}}};return new MutationObserver(function(t){t.forEach(function(t){Array.from(t.removedNodes).forEach(function(t){t===e&&c.dispose()})})}).observe(e.parentNode,{childList:!0}),c}}},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CSSRulesFromSelector=function(e){var t=Array.from(document.body.ownerDocument.styleSheets),n=[];return t.forEach(function(t){return Array.from(t.rules).forEach(function(t){return t.cssText.split("{")[0].trim().indexOf(e)>-1?n.push(t.cssText):void 0})}),n},t.AppendStyle=function(e,t,n){void 0===n&&(n="");var r=document.createElement("style");if(r.setAttribute("type","text/css"),r.setAttribute("name",n),r.style.display="none",t.appendChild(r),r.styleSheet)r.styleSheet.cssText=e;else{var o=document.createTextNode(e);r.appendChild(o)}},t.StyleRules=function(e){return e?e.replace("<style>","").replace("</style>",""):""}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(21);t.Template=function(e,t,n,o,a){var i=a?r.CSSRulesFromSelector(a).join(" "):"",u=""+r.StyleRules(o)+i,s=document.createElement("template");s.innerHTML=n,r.AppendStyle(u,s.content);var c=document.importNode(s.content,!0);t.attachShadow({mode:"open"}).appendChild(c),"registerElement"in document||document.head.querySelector('style[name="'+e+'"]')||r.AppendStyle(u,document.head,e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(15);t.unsubscribeEvents=function(e){e&&e.eventSubscriptions&&Object.keys(e.eventSubscriptions).forEach(function(t){e.eventSubscriptions[t]()})};t.Elements=function(e,n){var o={},a={};return Object.keys(n).forEach(function(i){o[i]=r.Observe(function(t){var r=e.shadowRoot.querySelectorAll(n[t].selector);return r.length>1?Array.from(r):r[0]}(i)),Object.defineProperty(a,i,{get:function(){return o[i].value},set:function(e){e!==o[i].value&&o[i].next(e)}}),o[i].subscribe(function(r){var a;t.unsubscribeEvents(o[i].previous),(a=o[i].previous)&&a.parentNode&&a.parentNode.removeChild(a),n[i].onChange(r,e)})}),{state:a,disconnect:function(){return Object.keys(o).forEach(function(e){o[e].complete()})}}}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(17),o=n(9),a=n(37),i=n(28),u=n(38),s=n(39),c=n(40),l=r.Constructor({componentName:"effect-bounce-z",componentRoot:".effect-push-container",template:s,style:c,observedAttributes:a.observedAttributes,properties:a.properties,elements:u.default,methods:{trigger:i.trigger},onConnected:function(e){return e.inputID=o.default("effect-bounce-z")},onDisconnected:function(e){return i.unloadTargets(e)}});r.Define("effect-bounce-z",l),t.default=l},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(18),o=n(29),a=function(e){var t=Math.max(e.offsetWidth,e.offsetHeight),n=Math.min(e.offsetWidth,e.offsetHeight);return(t-n)/2+n},i=function(e){return function(){e.targets&&(e.on=!1,e.targets.forEach(function(t){var n=e.amount,r=a(t),i=(r-n)/r,u=o.GetCurve([i,1]),s=o.GetCurve([0,e.speed/u.length]);!function n(){if(!e.on){var r=u.shift(),o=s[u.length];t.style.transform="scale("+r+")",u.length&&setTimeout(function(){return n()},o)}}()}))}},u=function(e){return function(){e.on||e.targets&&(e.on=!0,e.targets.forEach(function(t,n){var r=e.amount,u=a(t),s=(u-r)/u,c=o.GetCurve([1,1-1.125*(1-s),s]),l=o.GetCurve([0,r.speed/c.length]);!function r(){if(e.on){var o=c.shift(),a=l[c.length];t.style.transform="scale("+o+")",c.length?setTimeout(function(){return r()},a):n===e.targets.length-1&&i(e)()}}()}))}};t.trigger=function(e){return u(e)},t.unloadTargets=function(e){e.targets$&&e.targets$.forEach(function(e){return e()})},t.loadTargets=function(e){e.targets&&e.start&&e.targets$&&e.targets.forEach(function(t){var n=r.default(t,e.start,{useCapture:!1}).subscribe(u(e),function(){return n()},function(){return n()});if(e.targets$.push(n),e.end){var o=r.default(t,e.end,{useCapture:!1}).subscribe(function(e){return i(e)}(e),function(){return o()},function(){return o()});e.targets$.push(o)}})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GetCurve=function(e,t,n,r){void 0===t&&(t=.5),void 0===n&&(n=!1),void 0===r&&(r=16);var o,a,i,u,s,c,l,f,d,p,v,h,g,m=Array.isArray(e[0]),y=[],b=e.slice(0),T=b.slice(0);for(T=(b=m?b.concat.apply([],b):b.concat.apply([],b.map(function(e){return[e,e]}))).slice(0),n?(b.unshift(T[T.length-1]),b.unshift(T[T.length-2]),b.unshift(T[T.length-1]),b.unshift(T[T.length-2]),b.push(T[0]),b.push(T[1])):(b.unshift(T[1]),b.unshift(T[0]),b.push(b[T.length-2]),b.push(b[T.length-1])),g=2;g<b.length-4;g+=2)for(h=0;h<=r;h++)i=(b[g+2]-b[g-2])*t,u=(b[g+4]-b[g])*t,s=(b[g+3]-b[g-1])*t,c=(b[g+5]-b[g+1])*t,v=h/r,l=2*Math.pow(v,3)-3*Math.pow(v,2)+1,f=-2*Math.pow(v,3)+3*Math.pow(v,2),d=Math.pow(v,3)-2*Math.pow(v,2)+v,p=Math.pow(v,3)-Math.pow(v,2),o=l*b[g]+f*b[g+2]+d*i+p*u,a=l*b[g+1]+f*b[g+3]+d*s+p*c,y.push([o,a]);return m?y:y.map(function(e){return e[0]})}},,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(13),o=n(2),a=n(5),i=n(4),u=n(11),s=n(7),c=n(28),l=n(3),f=function(e){c.unloadTargets(e),c.loadTargets(e)},d=function(){},p={end:{format:function(e){return o.default(a.IndexOf(u.eventNames),i.IfInvalid(null))(e).value},onChange:function(e,t){return f(t)}},amount:{format:function(e){return o.default(s.ToNumber,i.IfInvalid(0))(e).value},onChange:d},speed:{format:function(e){return o.default(s.ToNumber,i.IfInvalid(333))(e).value},onChange:d},start:{format:function(e){return o.default(a.IndexOf(u.eventNames),i.IfInvalid("mousedown"))(e).value},onChange:function(e,t){return f(t)}},targets:{format:function(e){return o.default(a.ToArray,i.IfInvalid(o.default(i.IfEmpty([]))([e])))(e).value},onChange:function(e,t){return f(t)}},class:{format:function(e){return o.default(l.ToString,i.IfInvalid(""),l.Split(" "),a.Map(function(e){return e.trim()}),a.Filter(function(e){return!!e}))(e).value},onChange:function(e,t){t.state.class.previous&&t.state.class.previous.length&&t.elements.root.classList.remove(t.state.class.previous),e&&e.length&&t.elements.root.classList.add(e)}}};t.properties=Object.assign({on:{format:function(e){return o.default(r.ToBool,i.IfInvalid(!1))(e).value},onChange:d},targets$:{format:function(e){return o.default(a.ToArray,i.IfInvalid([]))(e).value},onChange:d}},p),t.observedAttributes=Object.keys(p)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.elementSelectors={root:".effect-push-container"};var r={};Object.keys(t.elementSelectors).forEach(function(e){r[e]={selector:t.elementSelectors[e],onChange:function(){}}}),t.default=r},function(e,t){e.exports="<div class=effect-push-container></div> "},function(e,t){e.exports=""}])});