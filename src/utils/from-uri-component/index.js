import { doURI } from "../do-uri"

export function FromURIComponent(value) { return doURI(value, false, true) }
