export function Try(fn) {
    return function TryInner() {
        try {
            return fn.apply(null, arguments)
        } catch (error) { }
    }
}