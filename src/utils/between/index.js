export function Between(start, end, value) {
    const regex = new RegExp(`${start}([^${end}]+)${end}`, `gm`)

    const getAll = () => {
        let match
        const matches = []

        while ((match = regex.exec(value)) !== null) {
            matches.push(match[1])
        }

        return matches
    }

    return {
        all() {
            return getAll()
        },
        first() {
            return regex.exec(value)[1]
        },
        last() {
            const results = getAll()
            return results[results.length - 1]
        },
        at(index) {
            const results = getAll()
            return results[index]
        },
        get() {
            return regex.exec(value)
        }
    }
}
