import ToDate from "./to_date"

const DateToObject = value => {
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

export default DateToObject