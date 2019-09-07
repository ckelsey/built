export const findIn = (parent, selector, all = false) => !parent
    ? undefined
    : parent[all ? `querySelectorAll` : `querySelector`](selector)