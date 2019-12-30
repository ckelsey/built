import { OnNextFrame } from '..'

export function PolyfillMutationObserver(w) {
    (function () {
        if (w.MutationObserver !== null && w.MutationObserver !== undefined) {
            return
        }

        w.MutationObserver = function (cb) {
            this.callBack = cb
            return this
        }

        w.MutationObserver.prototype.observe = function (element) {
            const cb = this.callBack
            let oldHtml

            const func = () => {
                const html = element.innerHTML

                if (html !== oldHtml) {
                    oldHtml = html
                    return cb.apply(null)
                }

                this.interval = OnNextFrame(func)
            }

            func()
        }

        w.MutationObserver.prototype.disconnect = function () {
            return this.interval.cancel()
        }

    }).call(this)
}