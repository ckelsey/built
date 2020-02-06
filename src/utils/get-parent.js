import { Get } from './get.js'

function modifier(p) {
    return !!p && p.nodeName === '#document-fragment' ?
        Get(p, 'host', p) :
        !!p && p.assignedSlot ?
            Get(p, 'assignedSlot.parentNode', p) :
            p
}

export function GetParent(element) {
    return Get(element, 'parentNode',
        Get(element, 'host',
            Get(element, '__shady_parent.host')
        ),
        modifier
    )
}