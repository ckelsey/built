import { Observe } from '../utils/observe'

const Router = routes => {
    let current
    const _routes = Object.assign({}, routes)
    const navigated = () => {
        if (!history.state || !history.state.pathname) {
            return methods.route(_routes.home)
        }

        methods.route(history.state)
    }

    const joinUrl = pathname => `${location.protocol}//${location.host}${pathname}${location.search}`

    const updateState = (route) => {
        if (history.pushState) {
            const state = {
                title: route.title,
                pathname: route.pathname,
                full: joinUrl(route.pathname)
            }
            history.pushState(state, document.title, joinUrl(route.pathname))
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

    const initial = getRouteByPath(location.pathname) || {}

    const methods = {
        get current() { return current || {} },

        getRouteByPath,

        route(url) {
            const route = methods.getRouteByPath(typeof url === `string` ? url : !!url.pathname ? url.pathname : ``)

            if (!route) { return methods.route(`/`) }

            document.title = route.title

            if (current && route.pathname === current.pathname) { return true }

            current = Object.assign({}, route)

            updateState(route)

            methods.route$.next(route)

            return true
        },

        route$: Observe(undefined)
    }

    if (initial) {
        document.title = initial.title
    }

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

    }, true);

    window.addEventListener('popstate', navigated, false)

    return methods
}

export default Router