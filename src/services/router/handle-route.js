import queryObjectToString from './query-object-to-string.js'
import parseUrl from './parse-url.js'
import getRoute from './get-route.js'
import { Get } from '../../utils/get.js'
import getQuery from './get-query.js'
import UpdateState from './update-state.js'

function handleRoute(methods, url, replace, force) {
    replace = replace ? true : false
    force = force ? true : false

    const parsedUrl = parseUrl(url).toLowerCase()
    const route = getRoute(methods.routes, url)

    if (!route) { return replace ? false : methods.route('/') }

    if (route.title) { document.title = route.title }

    const currentPath = Get(methods.current, 'pathname')
    const routePath = Get(route, 'pathname')
    const currentQuery = queryObjectToString(Get(methods.current, 'query', {}))
    let query = getQuery(url)

    if (route.allowedQueries && Array.isArray(route.allowedQueries)) {
        if (route.allowedQueries.length === 0) { query = {} }

        const allowed = {}

        Object.keys(query).forEach(
            function queryForEach(queryKey) {
                return route.allowedQueries.indexOf(queryKey) > -1 ?
                    allowed[queryKey] = query[queryKey] :
                    undefined
            }
        )

        query = allowed
    }

    const routeQuery = queryObjectToString(query)

    if (routePath === currentPath && currentQuery === routeQuery && !force) { return true }

    methods.current = Object.assign({}, route, { query: query, pathname: parsedUrl })

    if (replace) {
        UpdateState(methods, true, force)
    } else {
        UpdateState(methods, false, force)
    }

    methods.route$.next(methods.current)

    return true
}

export default handleRoute