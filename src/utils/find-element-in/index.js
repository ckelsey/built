export function FindElementIn(parent, selector, all = false) {
    return !parent
        ? undefined
        : parent[all ? `querySelectorAll` : `querySelector`](selector)
}