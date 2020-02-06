import { ArrayFrom } from './array-from.js'

export function Throttle(fn, wait) {
    wait = wait === undefined ? 33 : wait
    let timer = null
    let start = null

    return function () {
        cancelAnimationFrame(timer)
        start = new Date().getTime()
        const _this = this
        const args = ArrayFrom(arguments)

        function test() {
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