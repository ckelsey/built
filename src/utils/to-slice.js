import { TMonad } from './t-monad.js'

export function ToSlice(start, end) {
    return function (value) {
        let result = TMonad(value)

        if (result.stop) { return result }

        try {
            const v = result.value.slice()
            result.value = v.slice(start, end)

            if (typeof v === 'string') {
                if (start !== 0) {
                    result.stringChanges.push({
                        start: 0,
                        end: start,
                        input: v,
                        length: start,
                        result: v.slice(0, start),
                        removed: v.slice(0, start)
                    })
                }

                if (end < v.length) {
                    result.stringChanges.push({
                        start: end,
                        end: v.length,
                        input: v,
                        length: v.length - end,
                        result: v.slice(end),
                        removed: v.slice(end)
                    })
                }
            }
        } catch (error) {
            result.valid = false
        }

        return result
    }
}