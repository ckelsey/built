import ToDate from "./to_date"
import DateToObject from "./date_to_object"

export const FirstOfMonth = value => {
    let result = ToDate(value)

    if (result.stop || !result.valid) { return result }

    result.value = DateToObject(new Date(result.value.getFullYear(), result.value.getMonth(), 1)).value
    result.instanceof.push(`FirstOfMonth`)
    return result
}

export const LastOfMonth = value => {
    let result = ToDate(value)

    if (result.stop || !result.valid) { return result }

    result.value = DateToObject(new Date(result.value.getFullYear(), result.value.getMonth() + 1, 0)).value
    result.instanceof.push(`LastOfMonth`)
    return result
}

export const MonthData = value => {
    let result = ToDate(value)

    if (result.stop || !result.valid) { return result }

    const first = FirstOfMonth(result.value).value
    const last = LastOfMonth(result.value).value

    let startIndex = first.dayIndex
    const bufferStart = []

    while (startIndex) {
        const d = DateToObject(
            new Date(
                first.year,
                first.monthIndex,
                1 - startIndex
            )
        ).value
        d.outOfRange = true
        bufferStart.push(d)
        startIndex = startIndex - 1
    }

    let endIndex = 6 - last.dayIndex
    const bufferEnd = []

    while (endIndex) {
        const d = DateToObject(
            new Date(
                last.year,
                last.monthIndex,
                last.day + (7 - (endIndex + last.dayIndex))
            )
        ).value
        d.outOfRange = true
        bufferEnd.push(d)
        endIndex = endIndex - 1
    }

    let daysArray = [].concat(bufferStart.slice())
    let dayIndex = 0

    while (dayIndex < last.day) {
        const d = DateToObject(
            new Date(
                first.year,
                first.monthIndex,
                first.day + dayIndex
            )
        ).value
        daysArray.push(d)
        dayIndex = dayIndex + 1
    }

    result.value = daysArray.concat(bufferEnd.slice())
    result.instanceof.push(`MonthData`)
    return result
}