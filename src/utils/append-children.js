export function AppendChildren(el, children) {
    let i = children.length
    while (i) {
        i = i - 1
        el.appendChild(children[i])
    }

    return el
}