import SetStyleRules from '../html/set-style-rules'

const AppendStyle = /*#__PURE__*/ (rulesString, parent, name = ``) => {
    var style = document.createElement(`style`) as any
    style.setAttribute(`type`, `text/css`)
    style.setAttribute(`name`, name)
    style.style.display = `none`
    parent.appendChild(style)
    SetStyleRules(style, rulesString)
}

export default AppendStyle