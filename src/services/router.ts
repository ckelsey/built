import Observe from '../utils/observe'
import ValidateHtml from '../utils/validate/html'
import Get from './../utils/get'
import FromJSON from '../utils/convert/from_json'

const Router = routes => {
    let current
    const localStorageKey = `routestate`
    const _routes = Object.assign({}, routes)
    const navigated = () => {
        if (!!Get(history, `state.pathname`)) { methods.route(history.state) }
    }

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
            .map(q => !!query[q] ? `${q}=${query[q]}` : false)
            .filter(v => !!v)
            .join(`&`)

        if (!!queries) { return `?${queries}` }

        return ``
    }

    const addLeadingSlash = pathname => !pathname ? `` : pathname[0] === `/` ? pathname : `/${pathname}`
    const joinUrl = (pathname, query) => `${location.protocol}//${location.host}${addLeadingSlash(pathname)}${queryObjectToString(query)}`
    const getStorage = () => {
        let val = { query: ``, pathname: `` }
        try { val = FromJSON(localStorage.getItem(localStorageKey)).value || {} } catch (error) { }
        return val
    }

    const setStorage = state => {
        try {
            localStorage.setItem(localStorageKey, JSON.stringify(state))
        } catch (error) { }
    }

    const updateState = route => {
        if (!route) { return }

        const lastState = getStorage()
        const lastQuery = queryObjectToString(getQuery(`?${lastState.query}`))
        const currentQuery = queryObjectToString(route.query)
        const full = joinUrl(route.pathname, route.query)
        const state = {
            title: route.title || document.title,
            pathname: route.pathname,
            full,
            query: route.query || {}
        }

        if (route.pathname === lastState.pathname && lastQuery === currentQuery) { return }

        if (history.pushState) {
            history.pushState(state, document.title, full)
        }

        setStorage(state)

        if (lastQuery !== currentQuery) {
            methods.query$.next(route.query)
        }
    }

    const replaceState = route => {
        if (!route) { return }

        const lastState = getStorage()
        const lastQuery = queryObjectToString(getQuery(`?${lastState.query}`))
        const currentQuery = queryObjectToString(route.query)
        const full = joinUrl(route.pathname, route.query)
        const state = {
            title: route.title || document.title,
            pathname: route.pathname,
            full,
            query: route.query || {}
        }

        if (route.pathname === lastState.pathname && lastQuery === currentQuery) { return }

        if (history.replaceState) {
            history.replaceState(state, document.title, full)
        }

        setStorage(state)
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

    const parseUrl = url => typeof url === `string`
        ? ValidateHtml(url.split(`?`)[0]).sanitized // prevent XSS
        : !!url.pathname
            ? ValidateHtml(url.pathname).sanitized // prevent XSS
            : ``

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

            replaceState(current)
        },

        route(url) {
            const parsedUrl = parseUrl(url)
            const route = methods.getRouteByPath(parsedUrl)

            methods.logs.push({ data: { parsedUrl, route, current: Object.assign({}, current) }, arg: url, log: `route` })

            if (!route) { return methods.route(`/`) }

            if (!!route.title) { document.title = route.title }

            if (current && route.pathname === current.pathname && queryObjectToString(current.query) === queryObjectToString(getQuery(url))) { return true }

            current = Object.assign({}, route)
            current.query = getQuery(url)
            current.pathname = parsedUrl

            updateState(current)

            methods.route$.next(current)

            return true
        },

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
    }, false)

    window.addEventListener('popstate', navigated, false)

    return methods
}

export default Router