import { ToDate } from './to-date.js'
import { DateToObject } from './date-to-object.js'

export const LastOfMonth = value => {
    let result = ToDate(value)

    if (result.stop || !result.valid) { return result }

    result.value = DateToObject(new Date(result.value.getFullYear(), result.value.getMonth() + 1, 0)).value
    return result
}
