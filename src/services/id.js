/**
 * Generates a runtime unique ID
 * @generator
 * @yields { string }
 */

function doId(indx) {
    return ''.concat(indx, ' ', doHash().toLowerCase()).split(' ').join('')
}

function doHash() {
    return ''.concat(
        (new Date().getTime() / 1000 | 0).toString(16),
        'xxxxxxxxxxxxxxxx'
    )
        .replace(
            /[x]/g,
            function () {
                return (Math.random() * 16 | 0).toString(16)
            }
        )
}

export const ID = (function idIFEE() {
    let index = 0
    const ids = []

    return function IDInner() {
        index = index + 1
        let id
        do { id = [doId(index)] } while (ids.indexOf(id) > -1)
        ids.push(id)

        return id
    }
})()