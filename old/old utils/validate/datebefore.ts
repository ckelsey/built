const ValidateDateBefore = /*#__PURE__*/ (before: Date, val: Date) => {
    const original = val
    const reasons: string[] = []
    const parsedBefore = Date.parse(!!before ? before.toString() : ``)
    const parsedVal = Date.parse(!!val ? val.toString() : ``)
    let result = val

    if (isNaN(parsedBefore)) {
        result = null
        reasons.push(`invalid before date`)
    }

    if (isNaN(parsedVal)) {
        result = null
        reasons.push(`invalid date`)
    }

    if (parsedBefore <= parsedVal) {
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

export default ValidateDateBefore