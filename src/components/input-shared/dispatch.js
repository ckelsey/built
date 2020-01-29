export function dispatch(host, type, data) {
    return host.dispatchEvent(
        new CustomEvent(type, { detail: data ? data : data === false ? false : host.state })
    )
}