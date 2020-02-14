export function ForEach(fn, collection, reverseOrder) {
    if (!collection) { return }

    let index = collection.length

    function getIValue() {
        return reverseOrder ?
            function () { return index - 1 } :
            function () { return collection.length - index }
    }

    const iValue = getIValue()

    function apply(i) { fn(collection[i], i, collection) }

    while (index) {
        apply(iValue())
        index = index - 1
    }

    return collection
}