import getRouteByPath from './get-route-by-path'
import parseUrl from './parse-url'

const getRoute = (routes, url) => getRouteByPath(routes)(parseUrl(url))

export default getRoute