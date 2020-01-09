import { AppendStyleElement } from './append-style-element.js'

/* un-pure - modifies component element */

export function SetShadowRoot(options) {
    const {
        componentName,
        element,
        template,
        style
    } = options

    const Template = document.createElement(`template`)
    Template.innerHTML = template

    AppendStyleElement(style, Template.content, `${componentName}-innerstyles`)

    const clone = document.importNode(Template.content, true)
    element.attachShadow({ mode: `open` }).appendChild(clone)

    if (!(`registerElement` in document) && !document.head.querySelector(`style[name="${componentName}"]`)) {
        AppendStyleElement(style, document.head, componentName)
    }
}