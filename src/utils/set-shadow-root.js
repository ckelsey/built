import { AppendStyleElement } from './append-style-element.js'

export function SetShadowRoot(options) {
    options = options ? options : {}
    const componentName = options.componentName
    const element = options.element
    const template = options.template
    const style = options.style

    const Template = document.createElement('template')
    Template.innerHTML = template

    const clone = document.importNode(Template.content, true)
    element.attachShadow({ mode: 'open' }).appendChild(clone)

    AppendStyleElement(style, element.shadowRoot, ''.concat(componentName, '-componentStyle'), 'componentStyle')
    AppendStyleElement(' ', element.shadowRoot, ''.concat(componentName, '-themeStyles'), 'themeStyles')
    AppendStyleElement(' ', element.shadowRoot, ''.concat(componentName, '-injectedStyles'), 'injectedStyles')

    if (!('registerElement' in document) && !document.head.querySelector(''.concat('style[name="', componentName, '"]'))) {
        AppendStyleElement(style, document.head, componentName)
    }
}