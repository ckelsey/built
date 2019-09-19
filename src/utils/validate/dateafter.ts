const ValidateDateAfter = (after: Date, val: Date) => {
    const original = val
    const reasons: string[] = []
    const parsedAfter = Date.parse(!!after ? after.toString() : ``)
    const parsedVal = Date.parse(!!val ? val.toString() : ``)
    let result = val

    if (isNaN(parsedAfter)) {
        result = null
        reasons.push(`invalid after date`)
    }

    if (isNaN(parsedVal)) {
        result = null
        reasons.push(`invalid date`)
    }

    if (parsedAfter >= parsedVal) {
        result = null
        reasons.push(`date is out of range`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: result,
        reason: reasons
    }
}

export default ValidateDateAfter