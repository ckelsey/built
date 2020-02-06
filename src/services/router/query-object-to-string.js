import { IsEmpty } from '../../utils/is-empty.js'

function queryObjectToString(query) {
    query = query ? query : {}

    if (!Object.keys(query).length) { return '' }

    const queries = Object
        .keys(query)
        .map(function (q) { return IsEmpty(query[q]) ? false : ''.concat(q, '=', query[q]) })
        .filter(function (v) { return !!v })
        .join('&')

    if (queries) { return ''.concat('?', queries) }

    return ''
}

export default queryObjectToString