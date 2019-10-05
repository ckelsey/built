function* idGenerator() {
    let index = 0
    const objectIds = []
    const doId = i => `${i}${(new Date().getTime() / 1000 | 0).toString(16)}xxxxxxxxxxxxxxxx`.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16)).toLowerCase()

    while (true) {
        index = index + 1
        let objectId = doId(index)
        while (objectIds.indexOf(doId(index)) > -1) { objectId = doId(index) }

        yield objectId
    }
}

const idIterator = idGenerator()

const ID = (): any => idIterator.next().value

export default ID