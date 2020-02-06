export function FindElementIn(parent, selector, all) {
    return !parent
        ? undefined
        : parent[all ? 'querySelectorAll' : 'querySelector'](selector)
}