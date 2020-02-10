import { DispatchEvent } from '../../utils/dispatch-event.js'

export function dispatch(host, type, data) {
    return DispatchEvent(host, type, data ? data : data === false ? false : host.state)
}