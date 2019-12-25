export function ClearHTML(el) {
    if (el) {
        while (el.firstChild) { el.removeChild(el.firstChild) }
    }

    return el
}