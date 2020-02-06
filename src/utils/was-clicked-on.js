export function WasClickedOn(element, event) {
    if (!element) { return false }

    const isArray = Array.isArray(element)

    function isIt(el, par) {
        const isEqual = el === par
        const isContained = par instanceof Node && el.contains(par)
        if (isEqual || isContained) { return true }
        return false
    }

    const target = Array.isArray(event.path) ?
        event.path[0] :
        event.composedPath && typeof event.composedPath === 'function' && event.composedPath()[0] ?
            event.composedPath()[0] :
            event.originalTarget ?
                event.originalTarget :
                event.explicitOriginalTarget ?
                    event.explicitOriginalTarget :
                    event.target

    function cycleUp(parent) {
        while (parent && parent !== document.body) {
            if (isArray) {
                if (element.length == 1) {
                    if (isIt(element[0], parent)) {
                        return true
                    }
                } else {
                    let len = element.length
                    while (len) {
                        len = len - 1
                        if (isIt(element[len], parent)) {
                            return true
                        }
                    }
                }
            } else {
                if (isIt(element, parent)) {
                    return true
                }
            }

            parent = parent.parentNode || parent.host
        }

        return false
    }

    return cycleUp(target)
}