import Timer from '../../services/timer'
import { EaseInOut } from '../../utils/curve'

const removeAtAllCosts = el => {
    try { el.parentNode.removeChild(el) } catch (error) { }
}

const animator = (from, to, speed, stepFn) => new Promise(resolve =>
    Timer(
        speed,
        stepFn,
        EaseInOut([from, to], speed),
        resolve
    )
)

const animateHeight = (from, to, el, speed) => animator(from, to, speed, heightStep => el.style.height = `${heightStep}px`)
const animateOpacity = (from, to, el, speed) => animator(from, to, speed, opacityStep => el.style.opacity = opacityStep)

export const transitionChild = host => child => new Promise(resolve => {
    const nextContainer = host.elements.nextContainer
    const currentContainer = host.elements.currentContainer
    const root = host.elements.root

    if (!root || !nextContainer || !currentContainer) { return }

    const startHeight = root.offsetHeight
    root.style.height = `${startHeight}px`

    child.setAttribute(`slot`, `next`)

    host.appendChild(child)

    animateOpacity(1, 0, currentContainer, host.speed * 0.75)
    animateOpacity(0, 1, nextContainer, host.speed)

    animateHeight(startHeight, child.offsetHeight, root, host.speed)
        .then(() => {
            while (host.children.length > 1) {
                removeAtAllCosts(host.children[0])
            }

            child.removeAttribute(`slot`)
            currentContainer.style.removeProperty(`opacity`)


            requestAnimationFrame(() => {
                root.style.removeProperty(`height`)
                return resolve(host.children[0])
            })
        })
})