import getQuery from './get-query.js'
import queryObjectToString from './query-object-to-string.js'
import GetRouteByPath from './get-route-by-path.js'
import clickListener from './click-listener.js'
import popStateListener from './pop-state-listener.js'
import getRoute from './get-route.js'
import handleRoute from './handle-route.js'
import UpdateState from './update-state.js'
import { Observer } from '../../utils/observer.js'

export function Router(routes) {
    const _routes = Object.assign({}, routes)
    const getRouteByPath = GetRouteByPath(_routes)

    // internal state
    let lastState = {}
    let current = Object.assign({}, {
        path: location.pathname,
        query: getQuery(location.search),
        base: `${location.protocol}//${location.host}${location.port ? `:${location.port}` : ``}`
    }, getRouteByPath(location.pathname))

    const initialPath = `${location.pathname}${location.search}`
    const initialRoute = Object.assign({}, getRoute(_routes, initialPath), current)

    const methods = {
        get current() {
            return Object.assign(
                {},
                current || {},
                {
                    path: location.pathname,
                    base: `${location.protocol}//${location.host}${location.port ? `:${location.port}` : ``}`
                })
        },

        // TODO should not be accesible but handle-route needs it, refactor later
        set current(cur) { current = cur },
        get lastState() { return lastState },
        set lastState(l) { lastState = l },

        getRouteByPath,
        getQuery,
        queryObjectToString,
        routes: _routes,
        has: url => !!getRoute(_routes, url),
        route: (url, force = false) => handleRoute(methods, url, false, force),
        replaceRoute: (url, force = false) => handleRoute(methods, url, true, force),
        route$: Observer(initialRoute),
        query$: Observer(initialRoute.query),

        updateQuery(query) {
            if (!methods.current) { return }
            methods.current = Object.assign({}, methods.current, { query })
            UpdateState(methods)
        },

        addQuery(query) {
            if (!methods.current) { return }
            methods.current = Object.assign({}, methods.current, { query: Object.assign({}, methods.current.query, query) })
            UpdateState(methods)
        },

        replaceQuery(query) {
            if (!methods.current) { return }
            methods.current = Object.assign({}, methods.current)
            methods.current.query = query
            UpdateState(methods, true)
        },

        removeQuery(query) {
            if (!methods.current) { return }

            if (!query || (Array.isArray(query) && !query.length)) {
                methods.current.query = {}
            } else {
                if (typeof query === `string`) {
                    methods.current.query[query] = undefined
                    delete methods.current.query[query]
                } else if (Array.isArray(query)) {
                    query.forEach(key => {
                        methods.current.query[key] = undefined
                        delete methods.current.query[key]
                    })
                }
            }

            UpdateState(methods, true, true)
        },
    }

    clickListener(methods)
    popStateListener(methods)

    return methods
}