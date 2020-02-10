import { AppendStyleElement } from './append-style-element.js'

export function SetShadowRoot(options) {
    options = options ? options : {}
    const componentName = options.componentName
    const element = options.element
    const template = options.template
    const style = options.style

    const Template = document.createElement('template')
    Template.innerHTML = template + '<span class="style-block-theme"></span><span class="style-block-styles"></span>'

    const clone = document.importNode(Template.content, true)
    element.attachShadow({ mode: 'open' }).appendChild(clone)

    if (style && style !== '') {
        AppendStyleElement(style, element.shadowRoot, ''.concat(componentName, '-componentStyle'), 'componentStyle')
    }
}