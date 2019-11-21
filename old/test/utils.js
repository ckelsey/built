import Get from '../src/utils/get/index.ts'

const rootSelector = `#root`

const Utils = {
    find(selector, all = false) {
        return document.body[all ? `querySelectorAll` : `querySelector`](selector)
    },
    findIn(el, selector, all = false) {
        console.log(el, selector, all)
        return Get(el, `${all ? `querySelectorAll` : `querySelector`}(${selector})`)
    },
    async whenReady(el) {
        return new Promise((resolve, reject) => {
            let max = 1000

            const isReady = () => {
                if (!max) { return reject() }

                if (el.ready) {
                    if (el.shadowRoot) {
                        return resolve(el)
                    }
                }

                max = max - 1

                return requestAnimationFrame(isReady)
            }

            return isReady()
        })
    },

    async getShadow(el) {
        try {
            const readiedEl = await Utils.whenReady(el)
            return readiedEl.shadowRoot
        } catch (error) {
            throw new Error(error)
        }
    }

}

Object.defineProperty(Utils, `root`, {
    get() {
        return Utils.find(rootSelector)
    }
})

export default Utils