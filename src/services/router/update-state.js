import queryObjectToString from './query-object-to-string'

const addLeadingSlash = pathname => !pathname ? `` : pathname[0] === `/` ? pathname : `/${pathname}`
const joinUrl = (pathname, query) => `${location.protocol}//${location.host}${addLeadingSlash(pathname)}${queryObjectToString(query)}`

const UpdateState = (methods, replace = false, force = false) => {
    if (!methods.current) { return }

    const lastQuery = queryObjectToString(methods.lastState.query)
    const currentQuery = queryObjectToString(methods.current.query)
    const full = joinUrl(methods.current.pathname, methods.current.query)
    const state = {
        title: methods.current.title || document.title,
        pathname: methods.current.pathname,
        full,
        query: methods.current.query || {}
    }

    if (methods.current.pathname === methods.lastState.pathname && lastQuery === currentQuery && !force) { return }

    if ((replace || force) && history.replaceState) {
        history.replaceState(state, document.title, full)
    }

    if (!replace && !force && history.pushState) {
        history.pushState(state, document.title, full)
    }

    if (lastQuery !== currentQuery || force) {
        methods.query$.next(methods.current.query)
    }

    methods.lastState = state
}

export default UpdateState