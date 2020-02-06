/** TODO 
 * give human readable errors 
 * Called way too many times
 * */

import { ToRegex } from '../../utils/to-regex.js'
import { MatchAll } from '../../utils/match-all.js'

export function valueFormat(pattern, value) {
    if (typeof value !== 'string' || !pattern) {
        return {
            valid: true,
            value: value
        }
    }

    const regex = ToRegex(pattern)
    const regexp = regex.value

    if (!regex.valid) {
        return {
            valid: true,
            value: value
        }
    }

    const result = MatchAll(regexp, value).map(function (v) { return v[0] }).join('')

    return {
        valid: result === value,
        value: result
    }
}