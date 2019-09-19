const ValidateBool = val => {
    const original = val
    const reasons: string[] = []
    let result

    if (val === true || val === `on` || val === `true`) {
        result = true
    }

    if (val === false || val === `off` || val === `false`) {
        result = false
    }

    if (result === undefined) {
        result = false
        reasons.push(`not valid`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: !!result,
        reason: reasons
    }
}

export default ValidateBool