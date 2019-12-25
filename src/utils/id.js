/**
 * Generates a runtime unique ID
 * @generator
 * @yields { string }
 */

function* idGenerator() {
    let index = 0
    const objectIds = []
    const doHash = () => `${(new Date().getTime() / 1000 | 0).toString(16)} xxxxxxxxxxxxxxxx`.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16))
    const doId = indx => `${indx} ${doHash().toLowerCase()}`.split(` `).join(``)

    while (true) {
        index = index + 1
        const objectId = doId(index)
        objectIds.push(objectId)
        yield objectId
    }
}

let idIterator

/**
 * Returns a runtime unique ID
 * @function ID
 * @return { string }
 */

export function ID() {
    if (!idIterator) { idIterator = idGenerator() }

    return idIterator.next().value
}