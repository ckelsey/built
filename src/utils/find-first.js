export function FindFirst(conditionFn, collection, reverseOrder) {
    if (!collection) { return }

    let index = collection.length
    const count = index

    while (count && index) {
        const item = collection[reverseOrder ? count - (count - index) : count - index]
        if (conditionFn(item)) {
            return item
        }

        index = index - 1
    }
}