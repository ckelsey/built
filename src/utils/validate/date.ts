const ValidateDate = val => {
    const original = val
    const reasons: string[] = []
    let result = val

    if (isNaN(Date.parse(!!val ? val.toString() : ``))) {
        result = null
        reasons.push(`invalid date`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: result,
        reason: reasons
    }
}

export default ValidateDate