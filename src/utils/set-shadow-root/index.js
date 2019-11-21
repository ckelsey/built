import { AppendStyleElement } from '../..'

export function SetShadowRoot(tagname, element, templateString, styleString, notWebComponent = false, appendStylesToHead = false) {

    if (notWebComponent) {
        element.shadowRoot = element
        return element.innerHTML = `${templateString}<style type="text/css">${styleString}</style>`
    }

    const Template = document.createElement(`template`)
    Template.innerHTML = templateString
    AppendStyleElement(styleString, Template.content)

    const clone = document.importNode(Template.content, true)
    element.attachShadow({ mode: `open` }).appendChild(clone)

    if ((!(`registerElement` in document) || appendStylesToHead) && !document.head.querySelector(`style[name="${tagname}"]`)) {
        AppendStyleElement(styleString, document.head, tagname)
    }
}