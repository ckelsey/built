import { ValidateHtml } from '../..'

const getRegex = r => new RegExp(r, `igm`)
const getBegining = (m, t) => m.index !== 0 ? t.slice(0, m.index) : ``
const getEnd = (m, t) => t.slice(m.index + m[0].length)
const r = /\$(.*?)\$/

export function WCRenderMarkup(templateStr, values, regex = r) {
    const template = document.createElement(`template`)
    let match

    while ((match = getRegex(regex).exec(templateStr)) !== null) {
        templateStr = `${getBegining(match, templateStr)}${values[match[1]]}${getEnd(match, templateStr)}`
    }

    template.innerHTML = ValidateHtml(templateStr, [], [`script`]).sanitized

    return document.importNode(template.content, true)
}