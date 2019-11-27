export function WasClickedOn(element, event) {
    if (!element) { return false }
    const target = Array.isArray(event.path) ?
        event.path[0] :
        event.composedPath && typeof event.composedPath === `function` && event.composedPath()[0] ?
            event.composedPath()[0] :
            event.originalTarget ?
                event.originalTarget :
                event.explicitOriginalTarget ?
                    event.explicitOriginalTarget :
                    event.target

    const cycleUp = parent => {
        while (parent && parent !== document.body) {
            const isEqual = element === parent
            const isContained = parent instanceof Node && element.contains(parent)
            if (isEqual || isContained) { return true }
            parent = parent.parentNode || parent.host
        }

        return false
    }

    return cycleUp(target)
}