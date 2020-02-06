import { DoURI } from './do-uri.js'

export function FromURIComponent(value) { return DoURI(value, false, true) }
