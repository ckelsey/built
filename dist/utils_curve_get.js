!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.builtjs=e():t.builtjs=e()}(window,function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=73)}({73:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=function(t,e,n,o){void 0===e&&(e=.5),void 0===n&&(n=!1),void 0===o&&(o=16);var r,u,i,f,p,l,a,c,s,d,h,y,b,M=Math.round(.3295*o),g=Array.isArray(t[0]),j=[],v=t.slice(0),m=v.slice(0);for(m=(v=g?v.concat.apply([],v):v.concat.apply([],v.map(function(t){return[t,t]}))).slice(0),n?(v.unshift(m[m.length-1]),v.unshift(m[m.length-2]),v.unshift(m[m.length-1]),v.unshift(m[m.length-2]),v.push(m[0]),v.push(m[1])):(v.unshift(m[1]),v.unshift(m[0]),v.push(v[m.length-2]),v.push(v[m.length-1])),b=2;b<v.length-4;b+=2)for(y=0;y<=M;y++)i=(v[b+2]-v[b-2])*e,f=(v[b+4]-v[b])*e,p=(v[b+3]-v[b-1])*e,l=(v[b+5]-v[b+1])*e,h=y/M,a=2*Math.pow(h,3)-3*Math.pow(h,2)+1,c=-2*Math.pow(h,3)+3*Math.pow(h,2),s=Math.pow(h,3)-2*Math.pow(h,2)+h,d=Math.pow(h,3)-Math.pow(h,2),r=a*v[b]+c*v[b+2]+s*i+d*f,u=a*v[b+1]+c*v[b+3]+s*p+d*l,j.push([r,u]);return g?j:j.map(function(t){return t[0]})}}})});