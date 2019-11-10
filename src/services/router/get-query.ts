import invalidQuery from './invalid-query'

const getQuery = search => {
    const result = {}

    if (!!search && !!search.search) {
        search = search.search
    }

    let searchString = search

    if (invalidQuery(searchString)) {
        searchString = location.search

        if (invalidQuery(searchString)) {
            return result
        }
    }

    const queryString = searchString.split(`?`)[1]

    if (invalidQuery(queryString)) { return result }

    queryString
        .split(`&`)
        .forEach(v => {
            if (!v || typeof v.split !== `function`) { return }
            result[v.split(`=`)[0]] = v.split(`=`)[1]
        })

    return result
}

export default getQuery