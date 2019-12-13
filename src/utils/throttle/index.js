export function Throttle(fn, wait = 33) {
    let timer = null
    let start = null

    return function (...args) {
        cancelAnimationFrame(timer)
        start = new Date().getTime()
        const _this = this

        const test = () => {
            const now = new Date().getTime()

            if (now - start >= wait) {
                fn.apply(_this, args)
                cancelAnimationFrame(timer)
                start = null
                timer = null
                return
            }

            timer = requestAnimationFrame(test)
        }

        test()
    }
}