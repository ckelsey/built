import { Get } from './get.js'

export function GetShadowParent(element) {
    let parent = element
    let found = false

    function getParent(el) {
        return Get(el, 'parentNode',
            Get(el, 'host',
                Get(el, '__shady_parent.host')
            )
        )
    }

    while (parent && parent !== document.body && !found) {
        if (parent.nodeName === '#document-fragment' && !!parent.host) {
            found = true
            break
        }

        parent = getParent(parent)
    }

    return parent
}