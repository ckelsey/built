export function AppendChildren(el, children) {
    const documentFragment = document.createDocumentFragment()
    const len = children.length
    let i = len

    while (i) {
        documentFragment.appendChild(children[len - i])
        i = i - 1
    }

    el.appendChild(documentFragment)

    return el
}