export function WCCSSRulesFromSelector(selector) {
    const sheets = Array.from(document.body.ownerDocument.styleSheets)
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