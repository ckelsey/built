import { Tmonad } from './t-monad'
import { getType } from '../type'

export const ToDate = value => {
    let result = Tmonad(value)

    if (result.stop) { return result }

    if (result.instanceof[result.instanceof.length] === `DateToObject`) {
        result.value = result.value.date
    }

    try {
        result.value = new Date(Date.parse(result.value))
    } catch (error) { }

    const isDate = (
        result.value !== `Invalid Date`
        && !isNaN(result.value)
        && result.value instanceof Date
    )

    result.type = isDate ? `date` : getType(result.value)
    result.valid = result.type === `date`
    result.instanceof.push(`ToDate`)

    return result
}

export const DateToObject = value => {
    let result = ToDate(value)

    if (result.stop || !result.valid) { return result }

    const hour = parseInt(result.value.toLocaleTimeString(navigator.language, { hour: `numeric`, hour12: true }))
    result.value = {
        year: result.value.getFullYear(),
        yearShort: result.value.toLocaleDateString(navigator.language, { year: `2-digit` }),
        monthIndex: result.value.getMonth(),
        month: result.value.getMonth() + 1,
        monthDouble: result.value.toLocaleDateString(navigator.language, { month: `2-digit` }),
        monthName: result.value.toLocaleString(navigator.language, { month: 'long' }),
        monthNameShort: result.value.toLocaleString(navigator.language, { month: 'short' }),
        day: result.value.getDate(),
        dayDouble: result.value.toLocaleDateString(navigator.language, { day: `2-digit` }),
        dayOfWeek: result.value.toLocaleString(navigator.language, { weekday: 'long' }),
        dayOfWeekShort: result.value.toLocaleString(navigator.language, { weekday: 'short' }),
        dayIndex: result.value.getDay(),
        hour24: parseInt(result.value.toLocaleTimeString(navigator.language, { hour: `numeric`, hour12: false })),
        hour,
        hourDouble: result.value.toLocaleTimeString(navigator.language, { hour: `2-digit`, hour12: true }).replace(/[^0-9\.]+/g, ``),
        hourDouble24: result.value.toLocaleTimeString(navigator.language, { hour: `2-digit`, hour12: false }).replace(/[^0-9\.]+/g, ``),
        minutes: parseInt(result.value.toLocaleTimeString(navigator.language, { minute: `numeric` })),
        minutesDouble: `0${result.value.getMinutes()}`.slice(-2),
        seconds: parseInt(result.value.toLocaleTimeString(navigator.language, { second: `numeric` })),
        secondsDouble: `0${result.value.getSeconds()}`.slice(-2),
        milliseconds: result.value.getMilliseconds(),
        ampm: result.value.toLocaleTimeString(navigator.language, { hour12: true, hour: `numeric` }).replace(/[:\d]/g, ``).trim(), //result.value.getHours() > 11 ? `PM` : `AM`,
        date: result.value
    }

    result.instanceof.push(`DateToObject`)
    return result
}

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