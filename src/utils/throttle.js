import { Get } from './get.js'
import { OnNextFrame } from '../services/on-next-frame.js'

export function Throttle(fn, wait) {
    wait = wait === undefined ? 33 : wait
    let timer = null
    let start = null

    return function () {
        Get(timer, 'cancel()')
        start = new Date().getTime()
        const _this = this
        const args = Array.from(arguments)

        function test() {
            const now = new Date().getTime()

            if (now - start >= wait) {
                fn.apply(_this, args)
                Get(timer, 'cancel()')
                start = null
                timer = null
                return
            }

            timer = OnNextFrame(test)
        }

        test()
    }
}