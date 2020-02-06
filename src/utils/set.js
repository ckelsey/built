export function Set(source, path, value) {
    if (path) {
        path = [source].concat(path.split('.'))
    } else {
        path = [source]
    }

    path.reduce(function (accumulator, currentValue) {
        if (!accumulator) {
            accumulator = {}
        }

        if (!accumulator[currentValue]) {
            accumulator[currentValue] = {}
        }

        if (currentValue) {
            if (currentValue === path[path.length - 1]) {
                accumulator[currentValue] = value
            }

            return accumulator[currentValue]
        } else {
            accumulator[currentValue] = null
            return accumulator
        }
    })

    return source
}