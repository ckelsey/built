import { AppendStyleElement } from '../utils/append-style-element.js'

export function SetShadowRoot(host, name, template, shadowStyle, outerStyle) {
    const Template = document.createElement('template')
    Template.innerHTML = template

    const clone = document.importNode(Template.content, true)
    host.attachShadow({ mode: 'open' }).appendChild(clone)
    AppendStyleElement(shadowStyle, host.shadowRoot, name + '-theme', 'theme')
    AppendStyleElement(outerStyle, host, name + '-outerStyle', 'outertheme')
}