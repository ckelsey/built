/** TODO 
 * give human readable errors 
 * Called way too many times
 * */

import { ToRegex } from '../../utils/to-regex.js'

export function valueFormat(pattern, value) {
    if (typeof value !== `string` || !pattern) {
        return {
            valid: true,
            value
        }
    }

    const regex = ToRegex(pattern)
    const regexp = regex.value

    if (!regex.valid) {
        return {
            valid: true,
            value
        }
    }

    const matches = value.matchAll(regexp)
    const results = []

    for (const match of matches) { results.push(match[0]) }

    const result = results.join(``)

    return {
        valid: result === value,
        value: result
    }
}