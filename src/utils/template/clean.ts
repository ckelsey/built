const emptyTextNode = (el) => !/\S/.test(el.nodeValue)
const clean = (el) => {
    Array.from(el.childNodes).forEach((child) => clean(child))

    if (el.nodeType === 3) {
        el.textContent = el.textContent.trim().split(/(\n|\r|\t)/gm).map((s) => s.trim()).join(``)

        if (emptyTextNode(el)) {
            el.parentNode.removeChild(el)
            return
        }
    }
}

export default clean
