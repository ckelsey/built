import { SetStyleRules } from '../set-style-rules'

export function AppendStyleElement(rulesString, parent, name = ``) {
    var style = document.createElement(`style`)
    style.setAttribute(`type`, `text/css`)
    style.setAttribute(`name`, name)
    style.style.display = `none`
    parent.appendChild(style)
    SetStyleRules(style, rulesString)
}