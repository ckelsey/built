/**
 * Generates a runtime unique ID
 * @generator
 * @yields { string }
 */

const IDKey = Symbol.for(`builtjs.IDKey`)
const hasID = (Object.getOwnPropertySymbols(global).indexOf(IDKey) > -1)

const doHash = () => `${(new Date().getTime() / 1000 | 0).toString(16)} xxxxxxxxxxxxxxxx`.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16))
const doId = indx => `${indx} ${doHash().toLowerCase()}`.split(` `).join(``)

function* idGenerator() {
    let index = 0
    const objectIds = new WeakSet()

    while (true) {
        index = index + 1
        let objectId
        do { objectId = [doId(index)] } while (objectIds.has(objectId))
        objectIds.add(objectId)
        yield objectId
    }
}

let idIterator

/**
 * Returns a runtime unique ID
 * @function ID
 * @return { string }
 */

if (!hasID) {
    global[IDKey] = function _ID() {
        if (!idIterator) { idIterator = idGenerator() }
        return idIterator.next().value
    }
}

export const ID = Object.freeze(global[IDKey])