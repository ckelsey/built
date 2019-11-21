import { doURI } from "../do-uri"

export function ToURIComponent(value) { return doURI(value, true, true) }