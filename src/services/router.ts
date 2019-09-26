import Observe from '../utils/observe'

const Router = /*#__PURE__*/ (routes, storeLocally = false) => {
    let current
    const _routes = Object.assign({}, routes)
    const navigated = () => {
        if (!history.state || !history.state.pathname) {
            return methods.route(_routes.home)
        }

        methods.route(history.state)
    }

    const invalidQuery = searchString => !searchString || typeof searchString.split !== `function` || searchString === ``

    const getQuery = search => {
        const result = {}
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

    const formatQuery = query => {
        if (!Object.keys(query).length) { return `` }

        const queries = Object
            .keys(query)
            .map(q => !!query[q] ? `${q}=${query[q]}` : false)
            .filter(v => !!v)
            .join(`&`)

        if (!!queries) { return `?${queries}` }

        return ``
    }
    const addLeadingSlash = pathname => !pathname ? `` : pathname[0] === `/` ? pathname : `/${pathname}`
    const joinUrl = (pathname, query) => `${location.protocol}//${location.host}${addLeadingSlash(pathname)}${formatQuery(query)}`

    const updateState = (route) => {
        if (history.pushState && route) {
            const full = joinUrl(route.pathname, route.query)
            const state = {
                title: route.title || document.title,
                pathname: route.pathname,
                full
            }
            history.pushState(state, document.title, full)

            if (storeLocally) {
                localStorage.setItem(`route`, JSON.stringify(state))
            }
        }
    }

    const getRouteByPath = path => {
        let r
        let i = 0
        const keys = Object.keys(_routes)

        while (i < keys.length && !r) {
            if (_routes[keys[i]].pathname === path) { return _routes[keys[i]] }
            i = i + 1
        }

        return {}
    }

    const parseUrl = url => typeof url === `string`
        ? url.split(`?`)[0]
        : !!url.pathname
            ? url.pathname
            : ``

    const methods = {
        get current() { return current || {} },

        getRouteByPath,
        getQuery,
        routes: _routes,

        updateQuery(query) {
            if (!current) { return }

            current = Object.assign({}, current)
            current.query = query

            updateState(current)
        },

        route(url) {
            const route = methods.getRouteByPath(parseUrl(url))

            if (!route) { return methods.route(`/`) }

            if (!!route.title) { document.title = route.title }

            if (current && route.pathname === current.pathname) { return true }

            current = Object.assign({}, route)
            current.query = getQuery(url)

            updateState(current)

            methods.route$.next(current)

            return true
        },

        route$: Observe(undefined)
    }

    methods.route(`${location.pathname}${location.search}`)

    window.document.body.addEventListener(`click`, e => {
        let link
        const path = (e as any).path
        const target = e.target as any
        const tag = target.tagName.toLowerCase()

        if (path && Array.isArray(path)) {
            for (let i = 0; i < path.length; i++) {
                if (path[i] && path[i].tagName && path[i].tagName.toLowerCase() === `a`) {
                    link = path[i]
                    break
                }
            }
        }

        if (!link && tag !== `a`) { return }

        const url = new URL(link ? link.href : target.href)

        if (url.host !== location.host) { return }
        if (methods.route(url)) { e.preventDefault() }

    }, true)

    window.addEventListener('popstate', navigated, false)

    return methods
}

export default Router