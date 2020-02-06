import invalidQuery from './invalid-query.js'

function getQuery(url) {
    const result = {}
    let searchString = !!url && typeof url === 'string' ? url.slice() : undefined

    if (!!url && typeof url.search === 'string') {
        searchString = url.search
    }

    if (invalidQuery(searchString)) {
        return result
    }

    const queryString = searchString.split('?')[1]

    if (invalidQuery(queryString)) { return result }

    function queryEach(v) {
        if (!v || typeof v.split !== 'function') { return }
        result[v.split('=')[0]] = v.split('=')[1]
    }

    queryString.split('&').forEach(queryEach)

    return result
}

export default getQuery