export function BuiltReadyEvent() {
    if (typeof (Event) === 'function') {
        return new CustomEvent('builtready')
    }

    const event = document.createEvent('Event')
    event.initEvent('builtready', true, true)
    return event
}