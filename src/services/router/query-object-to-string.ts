import isEmpty from '../../utils/type/empty'

const queryObjectToString = (query = {}) => {
    if (!Object.keys(query).length) { return `` }

    const queries = Object
        .keys(query)
        .map(q => isEmpty(query[q]) ? false : `${q}=${query[q]}`)
        .filter(v => !!v)
        .join(`&`)

    if (!!queries) { return `?${queries}` }

    return ``
}

export default queryObjectToString