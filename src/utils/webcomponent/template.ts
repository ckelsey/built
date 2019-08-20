import { CSSRulesFromSelector, StyleRules, AppendStyle } from './css'

export const Template = (tagname, element, templateString, cssString, rootElementSelector) => {
    const css = !rootElementSelector ? `` : CSSRulesFromSelector(rootElementSelector).join(` `)
    const styles = `${StyleRules(cssString)}${css}`
    const Template = document.createElement(`template`)
    Template.innerHTML = templateString
    AppendStyle(styles, Template.content)

    const clone = document.importNode(Template.content, true)
    element.attachShadow({ mode: 'open' }).appendChild(clone)

    if (!('registerElement' in document) && !document.head.querySelector(`style[name="${tagname}"]`)) {
        AppendStyle(styles, document.head, tagname)
    }
}