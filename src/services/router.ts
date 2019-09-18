import { Observe } from '../utils/observe'

const Router = (routes, storeLocally = false) => {
    let current
    const _routes = Object.assign({}, routes)
    const navigated = () => {
        if (!history.state || !history.state.pathname) {
            return methods.route(_routes.home)
        }

        methods.route(history.state)
    }

    const getQuery = search => {
        const result = {}

        if (!search) { return result }

        const q = search.split(`?`)[1]

        if (!q) { return result }

        q
            .split(`&`)
            .forEach(v => {
                result[v.split(`=`)[0]] = v.split(`=`)[1]
            })

        return result
    }

    const joinUrl = (pathname, query) => `${location.protocol}//${location.host}${!pathname ? `` : pathname[0] === `/` ? pathname : `/${pathname}`}${Object.keys(query).length ? `?${Object.keys(query).map(q => `${q}=${query[q]}`).join(`&`)}` : ``}`

    const updateState = (route) => {
        if (history.pushState && route) {
            const full = joinUrl(route.pathname, route.query)
            const state = {
                title: route.title,
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

    const methods = {
        get current() { return current || {} },

        getRouteByPath,

        updateQuery(query) {
            if (!current) { return }

            current = Object.assign({}, current)
            current.query = query

            updateState(current)
        },

        getQuery(str) {
            const result = {}

            if (!str || str === ``) {
                str = location.search

                if (!str || str === ``) {
                    return result
                }
            }

            const str2 = str.split(`?`)[1]

            if (!str2 || str2 === ``) { return result }

            str2.split(`&`).forEach(element => result[element.split(`=`)[0]] = element.split(`=`)[1])

            return result
        },

        route(url) {
            const route = methods.getRouteByPath(typeof url === `string` ? url.split(`?`)[0] : !!url.pathname ? url.pathname : ``)

            if (!route) { return methods.route(`/`) }

            document.title = route.title

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