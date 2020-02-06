export function Between(start, end, value) {
    const regex = new RegExp(''.concat(start, '([^', end, ']+)', end), 'gm')

    function getAll() {
        let match
        const matches = []

        while ((match = regex.exec(value)) !== null) {
            matches.push(match[1])
        }

        return matches
    }

    return {
        all: function () {
            return getAll()
        },
        first: function () {
            return regex.exec(value)[1]
        },
        last: function () {
            const results = getAll()
            return results[results.length - 1]
        },
        at: function (index) {
            const results = getAll()
            return results[index]
        },
        get: function () {
            return regex.exec(value)
        }
    }
}
