const ValidateOneOf = /*#__PURE__*/ (options, val) => {
    const original = val
    const reasons: string[] = []
    let result = val

    if (options.indexOf(val) === -1) {
        result = undefined
        reasons.push(`invalid`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: result,
        reason: reasons
    }
}

export default ValidateOneOf