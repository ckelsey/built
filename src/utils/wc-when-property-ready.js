import { OnNextFrame } from '../services/on-next-frame.js'
import { Get } from './get.js'

export function WCWhenPropertyReady(host, path, isMethod) {
    let max = 1000
    return new Promise(function WCWhenPropertyReadyPromise(resolve, reject) {
        if (!host || (!host.parentNode && !host.parentElement)) {
            return reject({
                host: host,
                path: path
            })
        }

        function test() {
            max = max - 1

            const val = Get(host, path)

            if (!max) {
                return reject({
                    host: host,
                    path: path
                })
            }

            if (val === undefined || (isMethod && typeof val !== 'function')) { return OnNextFrame(test) }

            return resolve(val)
        }

        test()
    })
}