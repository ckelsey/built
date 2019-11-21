import { Timer } from '../..'

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

            this.interval = Timer(0, () => {
                const html = element.innerHTML

                if (html !== oldHtml) {
                    oldHtml = html
                    return cb.apply(null)
                }
            })
        }

        w.MutationObserver.prototype.disconnect = function () {
            return this.interval.cancel()
        }

    }).call(this)
}