const events = {
    transitionend: {
        "transition": "transitionend",
        "OTransition": "oTransitionEnd",
        "MozTransition": "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    }

}

const el = document.createElement("fakeelement")

export const EventName = key => {
    if (!events[key]) { return `` }
    let e

    if (key.indexOf(`transition`) > -1) {
        for (e in events[key]) {
            if (el.style[e] !== undefined) {
                return events[key][e]
            }
        }
    }

    return ``
}