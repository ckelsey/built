const events = {
    transitionend: {
        transition: 'transitionend',
        OTransition: 'oTransitionEnd',
        MozTransition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd',
        msTransition: 'msTransitionEnd',
    },

    transitionstart: {
        transition: 'transitionstart',
        OTransition: 'oTransitionStart',
        MozTransition: 'transitionstart',
        WebkitTransition: 'webkitTransitionStart',
        msTransition: 'msTransitionStart',
    }
}

const el = document.createElement('fake-element')

export function EventName(key) {
    if (!events[key]) { return '' }
    let e

    for (e in events[key]) {
        if (el.style[e] !== undefined) {
            return events[key][e]
        }
    }

    return ''
}