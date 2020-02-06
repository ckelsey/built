export function ReplaceElementContents(element, contents) {
    function respond() { return { element: element, contents: contents } }

    if (!element) { return respond() }

    element.innerHTML = ''

    if (typeof contents === 'string') {
        element.innerHTML = contents
        return respond()
    }

    if (!Array.isArray(contents)) { return respond() }

    function contentsEach(content) {
        element.appendChild(content)
    }

    contents.forEach(contentsEach)

    return respond()
}