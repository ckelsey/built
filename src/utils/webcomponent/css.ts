import { setStyleRules } from "../html/markup";

export const CSSRulesFromSelector = selector => {
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

export const AppendStyle = (rulesString, parent, name = ``) => {
    var style = document.createElement(`style`) as any
    style.setAttribute(`type`, `text/css`)
    style.setAttribute(`name`, name)
    style.style.display = `none`
    parent.appendChild(style)
    setStyleRules(style, rulesString)
}

// TODO - needs to be better than just removing style tags(may have attributes)
export const StyleRules = string => !string ? `` : string.replace(`<style>`, ``).replace(`</style>`, ``)