export function ForIn(fn, collection, skipInherited) {
    if (!collection) { return }

    fn.breakloop = false

    for (let prop in collection) {
        if (fn.breakloop) { return collection }

        if (skipInherited) {
            if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                fn(collection[prop], prop, collection)
            }
        } else {
            fn(collection[prop], prop, collection)
        }

    }

    return collection
}