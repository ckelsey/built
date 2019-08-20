export const eventNames = [
    `focus`,
    `blur`,
    `error`,
    `load`,
    `animationstart`,
    `animationend`,
    `animationiteration`,
    `transitionstart`,
    `transitioncancel`,
    `transitionend`,
    `transitionrun`,
    `reset`,
    `submit`,
    `resize`,
    `scroll`,
    `keydown`,
    `keypress`,
    `keyup`,
    `click`,
    `dblclick`,
    `mouseenter`,
    `mouseover`,
    `mouseout`,
    `mouseleave`,
    `mousedown`,
    `mousemove`,
    `mouseup`,
    `select`,
    `wheel`,
    `drag`,
    `dragend`,
    `dragstart`,
    `dragenter`,
    `dragover`,
    `dragleave`,
    `drop`,
    `play`,
    `pause`,
    `change`,
    `input`,
    `visibilitychange`,
    `touchcancel`,
    `touchstart`,
    `touchend`,
    `touchmove`,
    `touchenter`,
    `touchleave`
]

export const inputTypes = [
    `button`,
    `checkbox`,
    `color`,
    `date`,
    `date-local`,
    `email`,
    `file`,
    `hidden`,
    `image`,
    `month`,
    `number`,
    `password`,
    `radio`,
    `range`,
    `reset`,
    `search`,
    `select`,
    `submit`,
    `tel`,
    `text`,
    `textarea`,
    `time`,
    `url`,
    `week`
]

export const svgTags = [
    'svg',
    'a',
    'altglyph',
    'altglyphdef',
    'altglyphitem',
    'animatecolor',
    'animatemotion',
    'animatetransform',
    'audio',
    'canvas',
    'circle',
    'clippath',
    'defs',
    'desc',
    'ellipse',
    'filter',
    'font',
    'g',
    'glyph',
    'glyphref',
    'hkern',
    'image',
    'line',
    'lineargradient',
    'marker',
    'mask',
    'metadata',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialgradient',
    'rect',
    'stop',
    'style',
    'switch',
    'symbol',
    'text',
    'textpath',
    'title',
    'tref',
    'tspan',
    'video',
    'view',
    'vkern',
]

export const htmlTags = [
    'a',
    'abbr',
    'acronym',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'bdi',
    'bdo',
    'big',
    'blink',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'center',
    'cite',
    'code',
    'col',
    'colgroup',
    'content',
    'data',
    'datalist',
    'dd',
    'decorator',
    'del',
    'details',
    'dfn',
    'dir',
    'div',
    'dl',
    'dt',
    'element',
    'em',
    'fieldset',
    'figcaption',
    'figure',
    'font',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'main',
    'map',
    'mark',
    'marquee',
    'menu',
    'menuitem',
    'meter',
    'nav',
    'nobr',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'section',
    'select',
    'shadow',
    'small',
    'source',
    'spacer',
    'span',
    'strike',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'template',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'tr',
    'track',
    'tt',
    'u',
    'ul',
    'var',
    'video',
    'wbr',
]

export const setInputCaret = (input, position, doc) => {
    if (!input || !doc || doc.activeElement !== input) { return }

    if (input.createTextRange) {
        var range = input.createTextRange()
        range.move('character', position)
        range.select()
    } else if (input.selectionStart) {
        input.setSelectionRange(position, position)
    }

    return input
}

export const getCSSFromSelector = selector => {
    const sheets = Array.from(document.body.ownerDocument.styleSheets) as CSSStyleSheet[]
    const rules = []

    sheets.forEach(
        sheet => Array.from(sheet.rules)
            .forEach(
                rule => rule.cssText.split(`{`)[0].trim().indexOf(selector) > -1
                    ? rules.push(rule.cssText)
                    : undefined
            )
    )

    return rules
}

export const getCSS = el => {
    if (!el || !el.ownerDocument || !el.ownerDocument.styleSheets) { return [] }

    const sheets = Array.from(el.ownerDocument.styleSheets) as CSSStyleSheet[]
    const rules = []

    if (!el.matches) {
        el.matches =
            el.matchesSelector ||
            el.mozMatchesSelector ||
            el.msMatchesSelector ||
            el.oMatchesSelector ||
            el.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) { }
                return i > -1;
            }
    }

    sheets.forEach(
        sheet => Array.from(sheet.rules)
            .forEach(
                rule => el.matches(rule.cssText.split(`{`)[0].trim())
                    ? rules.push(rule.cssText)
                    : undefined
            )
    )

    return rules
}

export const webComponentTemplate = (name, html, root, cssText, rootElementSelector) => {
    const css = !rootElementSelector ? `` : getCSSFromSelector(rootElementSelector).join(` `)
    const styles = `${extractStyleRules(cssText)}${css}`
    const Template = document.createElement(`template`)
    Template.innerHTML = html
    appendStyleElement(extractStyleRules(styles), Template.content)

    const clone = document.importNode(Template.content, true)
    root.attachShadow({ mode: 'open' }).appendChild(clone)

    if (!('registerElement' in document) && !document.head.querySelector(`style[name="${name}"]`)) {
        appendStyleElement(extractStyleRules(styles), document.head, name)
    }
}

export const appendStyleElement = (ruleText, parent, name = ``) => {
    var ss1 = document.createElement(`style`) as any
    ss1.setAttribute(`type`, `text/css`)
    ss1.setAttribute(`name`, name)
    ss1.style.display = `none`
    parent.appendChild(ss1);
    if (ss1.styleSheet) {   // IE
        ss1.styleSheet.cssText = ruleText
    } else {                // the world
        var tt1 = document.createTextNode(ruleText)
        ss1.appendChild(tt1);
    }
}

export const extractStyleRules = string => {
    return !string ? `` : string.replace(`<style>`, ``).replace(`</style>`, ``)
}

export function getValue(input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
    const type = input.type

    if (type === `checkbox` || type === `radio`) {
        return input[`checked`]
    }

    if (type === `select` && input[`selectedOptions`]) {
        const value = Array.from(input[`selectedOptions`])
            .map((o: HTMLOptionElement) => o.value)

        if (value.length < 2) {
            return value[0]
        }

        return value
    }

    return input.value
}

export function getInvalidMessage(input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
    let message

    try {
        message = input.validationMessage === `` ? undefined : input.validationMessage
    } catch (error) { }

    if (message && message[message.length - 1] === `.`) {
        message = message.substring(0, message.length - 1)
    }

    return message
}

export function isAutoFilled(input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): boolean {
    const nativeMatches = (input.matches || input[`msMatchesSelector`])

    try {
        return nativeMatches.call(input, `:-webkit-autofill`)
    } catch (error) {
        try {
            return nativeMatches.call(input, `:-moz-autofill`)
        } catch (error) {
            try {
                return nativeMatches.call(input, `:-ms-autofill`)
            } catch (error) {
                try {
                    return nativeMatches.call(input, `:-o-autofill`)
                } catch (error) {
                    try {
                        return nativeMatches.call(input, `:autofill`)
                    } catch (error) {
                        return false
                    }
                }
            }
        }
    }
}

export function isFocused(input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): boolean {
    if (input[`focused`]) {
        return true
    }

    const nativeMatches = (input.matches || input[`msMatchesSelector`])

    try {
        return nativeMatches.call(input, `:focus`)
    } catch (error) {
        return false
    }
}

// const ns = `http://www.w3.org/2000/svg`
// const xmlNs = `http://www.w3.org/2000/xmlns/`
// const xmlAttributes = Object.freeze([
//     'xlink:href',
//     'xml:id',
//     'xlink:title',
//     'xml:space',
//     'xmlns:xlink',
// ])
// const svgAttributes = Object.freeze([
//     'accent-height',
//     'accumulate',
//     'additive',
//     'alignment-baseline',
//     'ascent',
//     'attributename',
//     'attributetype',
//     'azimuth',
//     'basefrequency',
//     'baseline-shift',
//     'begin',
//     'bias',
//     'by',
//     'class',
//     'clip',
//     'clip-path',
//     'clip-rule',
//     'color',
//     'color-interpolation',
//     'color-interpolation-filters',
//     'color-profile',
//     'color-rendering',
//     'cx',
//     'cy',
//     'd',
//     'dx',
//     'dy',
//     'diffuseconstant',
//     'direction',
//     'display',
//     'divisor',
//     'dur',
//     'edgemode',
//     'elevation',
//     'end',
//     'fill',
//     'fill-opacity',
//     'fill-rule',
//     'filter',
//     'flood-color',
//     'flood-opacity',
//     'font-family',
//     'font-size',
//     'font-size-adjust',
//     'font-stretch',
//     'font-style',
//     'font-variant',
//     'font-weight',
//     'fx',
//     'fy',
//     'g1',
//     'g2',
//     'glyph-name',
//     'glyphref',
//     'gradientunits',
//     'gradienttransform',
//     'height',
//     'href',
//     'id',
//     'image-rendering',
//     'in',
//     'in2',
//     'k',
//     'k1',
//     'k2',
//     'k3',
//     'k4',
//     'kerning',
//     'keypoints',
//     'keysplines',
//     'keytimes',
//     'lang',
//     'lengthadjust',
//     'letter-spacing',
//     'kernelmatrix',
//     'kernelunitlength',
//     'lighting-color',
//     'local',
//     'marker-end',
//     'marker-mid',
//     'marker-start',
//     'markerheight',
//     'markerunits',
//     'markerwidth',
//     'maskcontentunits',
//     'maskunits',
//     'max',
//     'mask',
//     'media',
//     'method',
//     'mode',
//     'min',
//     'name',
//     'numoctaves',
//     'offset',
//     'operator',
//     'opacity',
//     'order',
//     'orient',
//     'orientation',
//     'origin',
//     'overflow',
//     'paint-order',
//     'path',
//     'pathlength',
//     'patterncontentunits',
//     'patterntransform',
//     'patternunits',
//     'points',
//     'preservealpha',
//     'preserveaspectratio',
//     'r',
//     'rx',
//     'ry',
//     'radius',
//     'refx',
//     'refy',
//     'repeatcount',
//     'repeatdur',
//     'restart',
//     'result',
//     'rotate',
//     'scale',
//     'seed',
//     'shape-rendering',
//     'specularconstant',
//     'specularexponent',
//     'spreadmethod',
//     'stddeviation',
//     'stitchtiles',
//     'stop-color',
//     'stop-opacity',
//     'stroke-dasharray',
//     'stroke-dashoffset',
//     'stroke-linecap',
//     'stroke-linejoin',
//     'stroke-miterlimit',
//     'stroke-opacity',
//     'stroke',
//     'stroke-width',
//     'style',
//     'surfacescale',
//     'tabindex',
//     'targetx',
//     'targety',
//     'transform',
//     'text-anchor',
//     'text-decoration',
//     'text-rendering',
//     'textlength',
//     'type',
//     'u1',
//     'u2',
//     'unicode',
//     'values',
//     'viewbox',
//     'visibility',
//     'version',
//     'vert-adv-y',
//     'vert-origin-x',
//     'vert-origin-y',
//     'width',
//     'word-spacing',
//     'wrap',
//     'writing-mode',
//     'xchannelselector',
//     'ychannelselector',
//     'x',
//     'x1',
//     'x2',
//     'xmlns',
//     'y',
//     'y1',
//     'y2',
//     'z',
//     'zoomandpan',
// ])
// const htmlAttributes = Object.freeze([
//     'accept',
//     'action',
//     'align',
//     'alt',
//     'autocomplete',
//     'background',
//     'bgcolor',
//     'border',
//     'cellpadding',
//     'cellspacing',
//     'checked',
//     'cite',
//     'class',
//     'clear',
//     'color',
//     'cols',
//     'colspan',
//     'coords',
//     'crossorigin',
//     'datetime',
//     'default',
//     'dir',
//     'disabled',
//     'download',
//     'enctype',
//     'face',
//     'for',
//     'headers',
//     'height',
//     'hidden',
//     'high',
//     'href',
//     'hreflang',
//     'id',
//     'integrity',
//     'ismap',
//     'label',
//     'lang',
//     'list',
//     'loop',
//     'low',
//     'max',
//     'maxlength',
//     'media',
//     'method',
//     'min',
//     'multiple',
//     'name',
//     'noshade',
//     'novalidate',
//     'nowrap',
//     'open',
//     'optimum',
//     'pattern',
//     'placeholder',
//     'poster',
//     'preload',
//     'pubdate',
//     'radiogroup',
//     'readonly',
//     'rel',
//     'required',
//     'rev',
//     'reversed',
//     'role',
//     'rows',
//     'rowspan',
//     'script',
//     'spellcheck',
//     'scope',
//     'selected',
//     'shape',
//     'size',
//     'sizes',
//     'span',
//     'srclang',
//     'start',
//     'src',
//     'srcset',
//     'step',
//     'style',
//     'summary',
//     'tabindex',
//     'title',
//     'type',
//     'usemap',
//     'valign',
//     'value',
//     'width',
//     'xmlns',
// ])

// const primitives = [
//     `string`,
//     `number`,
//     `null`,
//     `undefined`,
//     `function`
// ]
// const isPrimitive = (s: any) => primitives.indexOf(typeof s) > -1
// const isNull = (val: any) => val === undefined || val === null || val === ``
// const emptyObject = (val: any) => typeof val === `object` && Object.keys(val).length === 0
// const emptyArray = (val: any) => Array.isArray(val) && val.length === 0
// const isEmpty = (val: any) => isNull(val) || emptyArray(val) || emptyObject(val)

// function getDimensions(): {
//     left: number
//     right: number
//     top: number
//     bottom: number
//     x: number
//     y: number
//     width: number
//     height: number
// } {
//     return this.element.getBoundingClientRect()
// }

// function isValid(): boolean {
//     const nativeMatches = (this.element.matches || this.element.msMatchesSelector)

//     try {
//         return nativeMatches.call(this.element, `:valid`)
//     } catch (error) {
//         return false
//     }
// }



// function insert(element: HTMLElement, index: number = 0) {
//     this.element.insertBefore(getElement(element), this.element.children[index])
//     return this
// }

// function indexOf(child: HTMLElement, selector: string = `:scope > *`): number {
//     child = getElement(child)
//     let index: any = 0

//     const i = (el: any) => {
//         return Array.from(el.querySelectorAll(selector)).indexOf(child)
//     }

//     index = i(this.element)

//     return index
// }

// function addClass(clss: string) {
//     const add = (el) => el.classList.add(clss)

//     if (Array.isArray(this.element)) {
//         this.element.forEach(add)
//     } else {
//         add(this.element)
//     }

//     return this
// }

// function removeClass(clss: string) {
//     this.element.classList.remove(clss)
//     return this
// }

// function style(styles) {
//     for (const v in styles) {
//         if (styles[v]) {
//             this.element.style[v] = styles[v]
//         }
//     }

//     return this
// }

// function elementSelector(): string {
//     const clssArray = this.classArray()
//     const classes = `${clssArray.length ? `.` : ``}${clssArray.join(` .`)}`
//     return this.element.id ? `#${this.element.id}${classes}` : `${classes}`
// }

// function find(selector: string) {
//     const el = this.element.querySelector(selector)
//     return el ? HTML(el) : el
// }

// function findAll(selector: string) {
//     return Array.from(this.element.querySelectorAll(selector).map(HTML))
// }

// function findAt(selector: string, index: number = 0) {
//     return HTML(this.element.querySelectorAll(selector)[index])
// }

// function children() {
//     return Array.from(this.element.children)
//         .map((child: HTMLElement) => HTML(child))
// }

// function remove(element: any) {
//     element = getElement(element)
//     this.element.removeChild(element)
//     return this
// }

// function parent() {
//     const parents = [
//         `parentNode`,
//         `parentElement`,
//         `parent`,
//         `host`
//     ]

//     const length = parents.length
//     let index = 0
//     let p

//     while ((!p || (p && typeof p.appendChild !== `function`)) && index < length) {
//         p = this.element[parents[index]]
//         index = index + 1
//     }

//     if (!p || typeof p.appendChild !== `function`) {
//         return
//     }

//     return HTML(p)
// }

// function getAttribute(attrName: string, asValue = false): any {
//     return asValue ? this.element[attrName] : this.element.getAttribute(attrName)
// }

// function removeAttribute(attrName: string): any {
//     this.element.removeAttribute(attrName)
//     return this
// }

// function setAttribute(attrName: string, value: any) {
//     SetAttribute(this.element, attrName, value)

//     return this
// }

// function updateAttribute(attrName: string, value: any) {
//     if (isEmpty(value)) {
//         this.removeAttribute(attrName)
//     } else {
//         this.setAttribute(attrName, value)
//     }

//     return this
// }

// function SetProperty(element, key, value) {
//     return element[key] = value
// }

// function SetAttribute(element, key, value) {
//     if (isEmpty(value) || !element) {
//         return
//     }

//     const isSvg = isSvgTag(element.tagName)
//     const primitive = isPrimitive(value)
//     const keySplit = key.split(`on`)

//     if (keySplit.length > 1 && typeof value === `function`) {
//         const eventName = keySplit[1].toLowerCase().trim()
//         return element.addEventListener(eventName, value, false)
//     }

//     if (!primitive || typeof value === `boolean`) {
//         return SetProperty(element, key, value)
//     }

//     if (isSvg) {
//         try {
//             element.setAttributeNS(xmlNs, key, value)
//             return
//         } catch (error) { }
//     }

//     element.setAttribute(key, value)
// }

// function getElement(el: any): HTMLElement {
//     if (isInstance(el)) { el = el.element }
//     return el
// }

// function append(element: any) {
//     element = getElement(element)
//     this.element.appendChild(element)
//     return this
// }

// function appendTo(Parent: HTMLElement) {
//     Parent = getElement(Parent)
//     Parent.appendChild(this.element)
//     return this
// }

// function insertIn(Parent: HTMLElement, index: number = 0) {
//     Parent.insertBefore(this.element, Parent.children[index])
//     return this
// }

// function create(attributes: any, tag: string) {
//     const isSvg = isSvgTag(tag)
//     const element = isSvg ? document.createElementNS(ns, tag) : document.createElement(tag)

//     if (attributes) {
//         Object.keys(attributes).forEach((key: string) => {
//             SetAttribute(element, key, attributes[key])
//         })
//     }

//     return HTML(element)
// }

// function createAndAppend(attributes: any, tag: string) {
//     this.element.appendChild(this.create(attributes, tag).element)
//     return this
// }

// function setText(text: string) {
//     this.element.textContent = validString(text)
//     return this
// }

// function setHtml(html: string) {
//     this.element.innerHTML = validString(html)
//     return this
// }

// function doIf(fn: () => any, condition: () => boolean | boolean) {
//     if (typeof condition === `function` ? condition() : condition) {
//         fn = fn.bind(this)
//         fn()
//     }
//     return this
// }

// function clear() {
//     this.element.innerHTML = ``
//     return this
// }

// function addEvent(name: string, fn: () => any, bubble: boolean) {
//     this.element.addEventListener(name, fn, bubble)
//     return this
// }

// function removeEvent(name: string, fn: () => any, bubble: boolean) {
//     this.element.removeEventListener(name, fn, bubble)
//     return this
// }

// function equals(element: any): boolean { return this.element === getElement(element) }

// function isInstance(el: any) { return el && el.instanceof === `HTML` }

// function isDom(el: any) { return el instanceof HTMLElement }

// function classArray(): string[] { return Array.from(this.element.classList) }

// function validString(str: string) { return isEmpty(str) ? `` : str }

// function isSvgTag(tag: string): boolean { return svgTags.indexOf(tag) > -1 }



// export function HTML(
//     elem?: any,
//     tag = `div`
// ) {

//     if (elem === undefined) {
//         elem = document.body
//     }

//     const e = elem as any

//     if (e) {
//         if (e && e.instanceof === `HTML`) { return e }
//         if (!isDom(e)) {
//             return HTML(undefined).create(e, tag)
//         }
//     }

//     const methods = {
//         get element(): HTMLElement { return elem as HTMLElement },
//         create,
//         createAndAppend,
//         append,
//         insert,
//         appendTo,
//         insertIn,
//         remove,
//         clear,
//         getAttribute,
//         setAttribute,
//         updateAttribute,
//         removeAttribute,
//         value: getValue,
//         elementSelector,
//         parent,
//         find,
//         findAll,
//         findAt,
//         children,
//         indexOf,
//         equals,
//         style,
//         getDimensions,
//         addClass,
//         removeClass,
//         classArray,
//         setText,
//         setHtml,
//         doIf,
//         addEvent,
//         removeEvent,
//         isDom,
//         isAutoFilled,
//         isValid,
//         getInvalidMessage,
//         isFocused,
//         svgTags,
//         svgAttributes,
//         htmlTags,
//         htmlAttributes,
//         xmlAttributes,
//         events,
//         instanceof: `HTML`,
//         inputTypes
//     }

//     for (const key in methods) {
//         if (typeof methods[key] === 'function') {
//             methods[key] = methods[key].bind(methods)
//         }
//     }

//     return methods
// }
