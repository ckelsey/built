export function ForEach(fn, collection, reverseOrder) {
    if (!collection) { return }

    let index = collection.length
    const count = index

    while (count && index) {
        fn(collection[reverseOrder ? index - 1 : count - index])

        index = index - 1
    }

    return collection
}