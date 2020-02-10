import { Timer } from '../services/timer.js'
import { EaseInOut } from './ease-in-out.js'
import { Get } from './get.js'

function animator(from, to, speed, stepFn) {
    return new Promise(
        function animatorPromise(resolve) {
            return Timer(
                stepFn,
                EaseInOut([from, to], speed)
            ).then(resolve)
        }
    )
}

export function ScrollTo(options) {
    if (!options) { return }

    if (options.element) {
        const box = options.element.getBoundingClientRect()
        options.x = box.left
        options.y = box.top
    }

    options = Object.assign(
        {},
        {
            speed: 300,
            x: 0,
            y: 0,
            target: window
        },
        options
    )

    const target = Get(options, 'target')

    if (!target) { return }

    /** TODO - handle x */

    const fromY = target.scrollY || target.scrollTop
    const toY = Get(options, 'y')
    const toX = Get(options, 'x')
    const speed = Get(options, 'speed')

    function scrollTargetY(y) {
        return target.scrollTo(toX, y)
    }

    animator(fromY || 0, toY || 0, speed, scrollTargetY)
}