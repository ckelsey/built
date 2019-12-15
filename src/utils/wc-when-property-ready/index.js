import { Get } from "../get"
import { OnNextFrame } from "../../services/on-next-frame"

export function WCwhenPropertyReady(host, path) {
    let max = 1000
    return new Promise((resolve, reject) => {
        const test = () => {
            max = max - 1

            const val = Get(host, path)

            if (!max) { return reject(val) }

            if (val === undefined) { return OnNextFrame(test) }

            return resolve(val)
        }

        test()
    })
}