import parseUrl from './parse-url.js'

function getRouteByPath(routes) {
    return function getRouteByPathInner(path) {
        path = parseUrl(typeof path === 'string' ? path.toLowerCase() : path)

        let r
        let i = 0
        const keys = Object.keys(routes || {})
        const urlParts = typeof path === 'string' ? path.split('/') : []

        while (i < keys.length && !r) {
            if (routes[keys[i]].pathname === path) { return routes[keys[i]] }

            if (routes[keys[i]].pathname.indexOf('/*') > -1) {
                const pathParts = routes[keys[i]].pathname.split('/')

                if (pathParts.length > urlParts.length) {
                    if (pathParts[urlParts.length - 1] !== '**') {
                        i = i + 1
                        continue
                    }
                }

                if (pathParts.length < urlParts.length) {
                    if (pathParts[pathParts.length - 1] !== '**') {
                        i = i + 1
                        continue
                    }
                }

                let match = false

                let partsIndex = 0

                while (partsIndex < pathParts.length) {
                    if (urlParts[partsIndex] !== pathParts[partsIndex] && pathParts[partsIndex].indexOf('*') === -1) {
                        match = false
                        break
                    }

                    match = true
                    partsIndex = partsIndex + 1
                }

                if (match) {
                    return routes[keys[i]]
                }
            }

            i = i + 1
        }

        return {}
    }
}

export default getRouteByPath