export function SetStyleRules(styleElement, ruleString) {
    if (!styleElement || ruleString === undefined || ruleString === null || ruleString === 'undefined' || ruleString === 'null') { return }

    if (styleElement.styleSheet) {   // IE
        styleElement.styleSheet.cssText = ''.concat(styleElement.styleSheet.cssText ? styleElement.styleSheet.cssText : '', ruleString)
    } else {                // the world
        styleElement.innerHTML = ''
        var tt1 = document.createTextNode(ruleString)
        styleElement.appendChild(tt1)
    }
}