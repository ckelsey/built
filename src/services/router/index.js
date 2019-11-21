import { Observer } from '../..'
import getQuery from './get-query'
import queryObjectToString from './query-object-to-string'
import GetRouteByPath from './get-route-by-path'
import clickListener from './click-listener'
import popStateListener from './pop-state-listener'
import getRoute from './get-route'
import handleRoute from './handle-route'
import UpdateState from './update-state'

export function Router(routes) {
    let current = {}
    let lastState = {}
    const _routes = Object.assign({}, routes)
    const getRouteByPath = GetRouteByPath(_routes)

    current = Object.assign({}, {
        path: location.pathname,
        query: getQuery(location.search),
        base: `${location.protocol}//${location.host}${location.port ? `:${location.port}` : ``}`
    }, getRouteByPath(location.pathname))

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
        route$: Observer(undefined),
        query$: Observer(undefined),

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

    methods.route(`${location.pathname}${location.search}`)

    clickListener(methods)
    popStateListener(methods)

    return methods
}