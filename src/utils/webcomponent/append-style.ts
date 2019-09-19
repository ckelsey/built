import { setStyleRules } from '../html/markup'

const AppendStyle = /*#__PURE__*/ (rulesString, parent, name = ``) => {
    var style = document.createElement(`style`) as any
    style.setAttribute(`type`, `text/css`)
    style.setAttribute(`name`, name)
    style.style.display = `none`
    parent.appendChild(style)
    setStyleRules(style, rulesString)
}

export default AppendStyle