import getRouteByPath from './get-route-by-path.js'
import parseUrl from './parse-url.js'

const getRoute = (routes, url) => getRouteByPath(routes)(parseUrl(url))

export default getRoute