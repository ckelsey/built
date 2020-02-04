import { IsElement } from './is-element.js'
import { Get } from './get.js'
import { SetStyleRules } from './set-style-rules.js'

function exists(thing) { return !!thing }
function getRules(sheet) { return Get(sheet, `sheet.rules`, Get(sheet, `sheet.cssRules`, [])) }
function validRule(rule) { return !!rule.selector && rule.cssText }
function getSelector(obj) { return obj.selector }
function getStyleElement(obj) { return IsElement(obj).valid ? obj : Get(obj, `ownerNode`, Get(obj, `0.parentStyleSheet.ownerNode`)) }

function mapRuleObject(rule) {
    return {
        selector: Get(rule, `selectorText`),
        cssText: Get(rule, `style.cssText`)
    }
}

function mapSheets(sheet) {
    return Array.from(getRules(sheet))
        .map(mapRuleObject)
        .filter(validRule)
}

export function MergeStyleSheets() {
    const styleElements = [...arguments].map(getStyleElement).filter(exists)
    const sheets = styleElements.map(mapSheets).filter(exists)
    const styleObject = sheets.shift()
    const styleObjectIndice = styleObject.map(getSelector)
    const styleElement = styleElements.shift()

    if (!styleObject || !styleElement) { return }

    sheets.forEach(sheet =>
        sheet.forEach(ruleObject => {
            const styleObjectIndex = styleObjectIndice.indexOf(getSelector(ruleObject))

            if (styleObjectIndex > -1) {
                if (styleObject[styleObjectIndex].cssText !== ruleObject.cssText) {
                    styleObject[styleObjectIndex].cssText = `${styleObject[styleObjectIndex].cssText}${ruleObject.cssText}`
                }

                return
            }

            styleObject.push(ruleObject)
            styleObjectIndice.push(getSelector(ruleObject))
        })
    )

    const ruleString = styleObject.map(ruleObject => `${ruleObject.selector}{${ruleObject.cssText}}`).join(``)

    SetStyleRules(styleElement, ruleString)

    return styleElement
}