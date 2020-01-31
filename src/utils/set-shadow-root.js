import { AppendStyleElement } from '..'

export function SetShadowRoot(options) {
    const {
        componentName,
        element,
        template,
        style
    } = options

    const Template = document.createElement(`template`)
    Template.innerHTML = template

    const clone = document.importNode(Template.content, true)
    element.attachShadow({ mode: `open` }).appendChild(clone)

    AppendStyleElement(style, element.shadowRoot, `${componentName}-componentStyle`, `componentStyle`)
    AppendStyleElement(` `, element.shadowRoot, `${componentName}-themeStyles`, `themeStyles`)
    AppendStyleElement(` `, element.shadowRoot, `${componentName}-injectedStyles`, `injectedStyles`)

    if (!(`registerElement` in document) && !document.head.querySelector(`style[name="${componentName}"]`)) {
        AppendStyleElement(style, document.head, componentName)
    }
}