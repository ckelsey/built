const ValidateYear = /*#__PURE__*/ val => {
    const original = val
    const reasons: string[] = []
    const parsedVal = new Date(val).getUTCFullYear()
    const valString = !!val ? val.toString() : ``
    let result = val

    if (!!parsedVal && parsedVal.toString() !== valString) {
        result = undefined
        reasons.push(`invalid year`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: result,
        reason: reasons
    }
}

export default ValidateYear