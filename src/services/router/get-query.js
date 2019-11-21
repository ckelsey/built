import invalidQuery from './invalid-query'

const getQuery = url => {
    const result = {}
    let searchString = !!url && typeof url === `string` ? url.slice() : undefined

    if (!!url && typeof url.search === `string`) {
        searchString = url.search
    }

    if (invalidQuery(searchString)) {
        return result
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