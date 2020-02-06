import { AppendStyleElement } from '../index.js'
import { GetShadowParent } from './get-shadow-parent.js'
import { MergeStyleSheets } from './merge-stylesheets.js'
import { CreateElement } from './create-element.js'

export function WCOuterStyle(componentName, element, outerStyle, key) {
    key = key ? key : 'outerStyle'

    if (!outerStyle || outerStyle === '' || !element || !componentName) { return }

    const parent = GetShadowParent(element)

    if (!parent) { return }

    const existing = parent.querySelector(''.concat('style[name="', componentName, '-', key, '"]'))

    if (existing) {
        const temp = CreateElement({ tagName: 'div' })
        const newStyle = AppendStyleElement(outerStyle, temp, ''.concat(componentName, '-', key))

        return MergeStyleSheets(existing, newStyle)
    }

    return AppendStyleElement(outerStyle, parent, ''.concat(componentName, '-', key), ''.concat(componentName, '-', key))
}