const replaceElementContents = (element, contents) => {
    const respond = () => ({ element, contents })

    if (!element) { return respond() }

    element.innerHTML = ``

    if (typeof contents === `string`) {
        element.innerHTML = contents
        return respond()
    }

    if (!Array.isArray(contents)) { return respond() }

    contents.forEach(content => element.appendChild(content))

    return respond()
}

export default replaceElementContents