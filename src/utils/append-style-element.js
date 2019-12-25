import { SetStyleRules, CreateElement } from '..'

/**
 * Appends a style element with the provided rules to a provided element
 * @function AppendStyleElement
 * @param {string} rulesString - The rules to add to the style element
 * @param {HTMLElement} parent - The element to append to
 * @param {string} name - Optional. A name to give the style element
 * @example
 * AppendStyleElement(`.selector { color: black;}`, document.head, `dark-text-n-stuff`)
 */


export function AppendStyleElement(rulesString, parent, name) {
    if (!parent || !rulesString) { return }

    /** First create and add the style element */
    const style = CreateElement({
        tagName: `style`,
        type: `text/css`,
        style: `display:none;`,
        name
    }, true)

    parent.appendChild(style)

    /** Then set the rules */
    SetStyleRules(style, rulesString)

    return style
}