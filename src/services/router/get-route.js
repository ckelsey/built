import getRouteByPath from './get-route-by-path.js'
import parseUrl from './parse-url.js'

function getRoute(routes, url) { return getRouteByPath(routes)(parseUrl(url)) }

export default getRoute