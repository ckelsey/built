import { AppendStyleElement } from '../index.js'
import { GetShadowParent } from './get-shadow-parent.js'
import { MergeStyleSheets } from './merge-stylesheets.js'
import { CreateElement } from './create-element.js'

export function WCOuterStyle(componentName, element, outerStyle, key = `outerStyle`) {
    if (!outerStyle || outerStyle === `` || !element || !componentName) { return }

    const parent = GetShadowParent(element)

    if (!parent) { return }

    const existing = parent.querySelector(`style[name="${componentName}-${key}"]`)

    if (existing) {
        const temp = CreateElement({ tagName: `div` })
        const newStyle = AppendStyleElement(outerStyle, temp, `${componentName}-${key}`, `${componentName}-${key}`)

        return MergeStyleSheets(existing, newStyle)
    }

    return AppendStyleElement(outerStyle, parent, `${componentName}-${key}`, `${componentName}-${key}`)
}