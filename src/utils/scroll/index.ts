import Timer from "../../services/timer"
import EaseInOut from "../curve/ease-in-out"
import Get from "../get"

const animator = (from, to, speed, stepFn) => new Promise(resolve =>
    Timer(
        speed,
        stepFn,
        EaseInOut([from, to], speed),
        resolve
    )
)

const ScrollTo = options => {
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

    const target = Get(options, `target`)

    if (!target) { return }

    /** TODO - handle x */

    const fromY = target.scrollY || target.scrollTop
    const toY = Get(options, `y`)
    const toX = Get(options, `x`)
    const speed = Get(options, `speed`)

    animator(fromY || 0, toY || 0, speed, y => target.scrollTo(toX, y))
}

export default ScrollTo