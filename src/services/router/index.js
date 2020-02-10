import { Observer } from '../../utils/observer.js'
import getQuery from './get-query.js'
import queryObjectToString from './query-object-to-string.js'
import GetRouteByPath from './get-route-by-path.js'
import clickListener from './click-listener.js'
import popStateListener from './pop-state-listener.js'
import getRoute from './get-route.js'
import handleRoute from './handle-route.js'
import UpdateState from './update-state.js'

function getBaseUrl() {
    return ''.concat(location.protocol, '//', location.host, location.port ? ':' + location.port : '')
}

export function Router(routes) {
    const _routes = Object.assign({}, routes)
    const getRouteByPath = GetRouteByPath(_routes)

    // internal state
    let lastState = {}
    let current = Object.assign({}, {
        path: location.pathname,
        query: getQuery(location.search),
        base: getBaseUrl()
    }, getRouteByPath(location.pathname))

    const initialPath = ''.concat(location.pathname, location.search)
    const initialRoute = Object.assign({}, getRoute(_routes, initialPath), current)

    const methods = {
        getRouteByPath: getRouteByPath,
        getQuery: getQuery,
        queryObjectToString: queryObjectToString,
        routes: _routes,
        has: function (url) { return !!getRoute(_routes, url) },
        route: function (url, force) { return handleRoute(methods, url, false, force) },
        replaceRoute: function (url, force) { return handleRoute(methods, url, true, force) },
        route$: Observer(initialRoute),
        query$: Observer(initialRoute.query),

        updateQuery: function (query) {
            if (!methods.current) { return }
            methods.current = Object.assign({}, methods.current, { query: query })
            UpdateState(methods)
        },

        addQuery: function (query) {
            if (!methods.current) { return }
            methods.current = Object.assign({}, methods.current, { query: Object.assign({}, methods.current.query, query) })
            UpdateState(methods)
        },

        replaceQuery: function (query) {
            if (!methods.current) { return }
            methods.current = Object.assign({}, methods.current)
            methods.current.query = query
            UpdateState(methods, true)
        },

        removeQuery: function (query) {
            if (!methods.current) { return }

            if (!query || (Array.isArray(query) && !query.length)) {
                methods.current.query = {}
            } else {
                if (typeof query === 'string') {
                    methods.current.query[query] = undefined
                    delete methods.current.query[query]
                } else if (Array.isArray(query)) {
                    query.forEach(function queryEach(key) {
                        methods.current.query[key] = undefined
                        delete methods.current.query[key]
                    })
                }
            }

            UpdateState(methods, true, true)
        }
    }

    Object.defineProperties(methods, {
        current: {
            get: function () {
                return Object.assign(
                    {},
                    current || {},
                    {
                        path: location.pathname,
                        base: getBaseUrl()
                    })
            },
            set: function (cur) {
                current = cur
            }
        },
        lastState: {
            get: function () {
                return lastState
            },
            set: function (l) {
                lastState = l
            }
        }
    })

    clickListener(methods)
    popStateListener(methods)

    return methods
}