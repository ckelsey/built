import { SetStyleRules } from './set-style-rules.js'
import { AppendStyleElement } from './append-style-element.js'
import { ParseCss } from './parse-css.js'
import { Transduce } from './transduce.js'
import { Get } from './get.js'

function handleInnerStyleChange(host, key, styleString) {
    const styleElement = Get(host, 'elements.' + key)
    const componentId = '#' + host.componentContent.id

    function getString(cssObj) {
        return componentId + ' ' + cssObj.cssText
    }

    function combineRules(target, current) {
        return target + current
    }

    const parsedRules = Transduce(getString)(ParseCss(styleString), '', combineRules)

    if (styleElement && styleString === '') {
        if (styleElement.parentNode) {
            styleElement.parentNode.removeChild(styleElement)
        }

        return host.elements[key] = undefined
    }

    if (!styleElement && !!parsedRules) {
        return host.elements[key] = AppendStyleElement(parsedRules, host.querySelector('.style-block-' + key), ''.concat(host.tagName.toLowerCase(), '-' + key), key)
    }

    SetStyleRules(styleElement, parsedRules)
}

export function ComponentStyles(key) {
    return {
        format: function (val) {
            return typeof val === 'string' ? val : ''
        },
        onChange: function (val, host) {
            handleInnerStyleChange(host, key, val)
        }
    }
}