import Observe from '../utils/observe'
import Get from './../utils/get'
import { ValidateHtml, isEmpty } from '..'

const Router = routes => {
    let current: any = {}
    let lastState: any = {}
    const _routes = Object.assign({}, routes)
    const invalidQuery = searchString => !searchString || typeof searchString.split !== `function` || searchString === ``

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

    const queryObjectToString = query => {
        if (!Object.keys(query).length) { return `` }

        const queries = Object
            .keys(query)
            .map(q => isEmpty(query[q]) ? false : `${q}=${query[q]}`)
            .filter(v => !!v)
            .join(`&`)

        if (!!queries) { return `?${queries}` }

        return ``
    }

    const addLeadingSlash = pathname => !pathname ? `` : pathname[0] === `/` ? pathname : `/${pathname}`
    const joinUrl = (pathname, query) => `${location.protocol}//${location.host}${addLeadingSlash(pathname)}${queryObjectToString(query)}`

    const updateState = (route, replace = false, force = false) => {
        if (!route) { return }

        const lastQuery = queryObjectToString(getQuery(`?${lastState.query}`))
        const currentQuery = queryObjectToString(route.query)
        const full = joinUrl(route.pathname, route.query)
        const state = {
            title: route.title || document.title,
            pathname: route.pathname,
            full,
            query: route.query || {}
        }

        if (route.pathname === lastState.pathname && lastQuery === currentQuery && !force) { return }

        if ((replace || force) && history.replaceState) {
            history.replaceState(state, document.title, full)
        }

        if (!replace && !force && history.pushState) {
            history.pushState(state, document.title, full)
        }

        if (lastQuery !== currentQuery || force) {
            methods.query$.next(route.query)
        }

        lastState = Object.assign({}, state)
    }

    const getRouteByPath = path => {
        let r
        let i = 0
        const keys = Object.keys(_routes)
        const urlParts = typeof path === `string` ? path.split(`/`) : []

        while (i < keys.length && !r) {
            if (_routes[keys[i]].pathname === path) { return _routes[keys[i]] }

            if (_routes[keys[i]].pathname.indexOf(`/*`) > -1) {
                const pathParts = _routes[keys[i]].pathname.split(`/`)

                if (pathParts.length > urlParts.length) {
                    if (pathParts[urlParts.length - 1] !== `**`) {
                        i = i + 1
                        continue
                    }
                }

                if (pathParts.length < urlParts.length) {
                    if (pathParts[pathParts.length - 1] !== `**`) {
                        i = i + 1
                        continue
                    }
                }

                let match = false

                let partsIndex = 0

                while (partsIndex < pathParts.length) {
                    if (urlParts[partsIndex] !== pathParts[partsIndex] && pathParts[partsIndex].indexOf(`*`) === -1) {
                        match = false
                        break
                    }

                    match = true
                    partsIndex = partsIndex + 1
                }

                if (match) {
                    return _routes[keys[i]]
                }
            }

            i = i + 1
        }

        return {}
    }

    const getRoute = url => getRouteByPath(parseUrl(url))

    const parseUrl = url => typeof url === `string`
        ? ValidateHtml(url.split(`?`)[0]).sanitized // prevent XSS
        : !!url.pathname
            ? ValidateHtml(url.pathname).sanitized // prevent XSS
            : ``

    const handleRoute = (url, replace = false, force = false) => {
        const parsedUrl = parseUrl(url)
        const route = getRoute(url)

        methods.logs.push({ data: { parsedUrl, route, current: Object.assign({}, current) }, arg: url, log: `route${replace ? `replace` : ``}` })

        if (!route) { return replace ? false : methods.route(`/`) }

        if (!!route.title) { document.title = route.title }

        const currentPath = Get(current, `pathname`)
        const routePath = Get(route, `pathname`)
        const currentQuery = queryObjectToString(Get(current, `query`, {}))
        const routeQuery = queryObjectToString(getQuery(url))

        if (routePath === currentPath && currentQuery === routeQuery && !force) { return true }

        current = Object.assign({}, route)
        current.query = getQuery(url)
        current.pathname = parsedUrl

        if (replace) {
            updateState(current, true, force)
        } else {
            updateState(current, false, force)
        }

        methods.route$.next(current)

        return true
    }

    current = Object.assign({}, {
        path: location.pathname,
        query: getQuery(location.search),
        base: `${location.protocol}//${location.host}${!!location.port ? `:${location.port}` : ``}`
    }, getRouteByPath(location.pathname))

    const methods = {
        get current() {
            return Object.assign(
                {},
                current || {},
                {
                    path: location.pathname,
                    base: `${location.protocol}//${location.host}${!!location.port ? `:${location.port}` : ``}`
                })
        },

        getRouteByPath,
        getQuery,
        queryObjectToString,
        routes: _routes,
        logs: [],
        has: url => !!getRoute(url),

        updateQuery(query) {
            if (!current) { return }

            current = Object.assign({}, current, { query })

            methods.logs.push({ data: Object.assign({}, current), arg: Object.assign({}, query), log: `updateQuery` })

            updateState(current)
        },

        addQuery(query) {
            if (!current) { return }

            current = Object.assign({}, current)
            current.query = Object.assign({}, current.query, query)

            methods.logs.push({ data: Object.assign({}, current), arg: Object.assign({}, query), log: `addQuery` })

            updateState(current)
        },

        replaceQuery(query) {
            if (!current) { return }

            current = Object.assign({}, current)
            current.query = query

            methods.logs.push({ data: Object.assign({}, current), arg: Object.assign({}, query), log: `replaceQuery` })

            updateState(current, true)
        },

        route: (url, force = false) => handleRoute(url, false, force),

        replaceRoute: (url, force = false) => handleRoute(url, true, force),

        route$: Observe(undefined),
        query$: Observe(undefined)
    }

    methods.route(`${location.pathname}${location.search}`)

    window.document.body.addEventListener(`click`, (e: any) => {
        const target = e.target as any
        const tag = target.tagName.toLowerCase()
        let link

        if (tag === `a`) {
            link = target
        }

        if (Array.isArray(e.path)) {
            let pathIndex = 0

            while (!link && pathIndex < e.path.length) {
                if (Get(e, `path.${pathIndex}.tagName`, ``).toLowerCase() === `a` && !!Get(e, `path.${pathIndex}.href`)) {
                    link = Get(e, `path.${pathIndex}`)
                }

                pathIndex = pathIndex + 1
            }
        }

        if (!link) {
            let parent = target.parentElement

            while (!link && parent && parent !== document.body) {
                if (Get(parent, `tagName`).toLowerCase() === `a`) {
                    link = parent
                }

                parent = parent.parentElement
            }
        }

        if (!link) { return }

        try {
            const url = new URL(link.href)
            if (url.host !== location.host) { return }
            if (methods.route(url)) { e.preventDefault() }
        } catch (error) { }
    }, true)

    window.addEventListener('popstate', () => methods.route(`${location.pathname}${location.search}`, true), false)

    return methods
}

export default Router