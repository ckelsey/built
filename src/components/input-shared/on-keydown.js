import { onDone } from "./on-done"

export function onKeyDown(e, host) {
    if (!e) { return }

    if (e.key && e.key.toLowerCase() === `enter` && host.type !== `textarea`) {
        return onDone(host)
    }
}