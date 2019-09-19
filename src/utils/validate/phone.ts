const ValidatePhone = val => {
    const original = val
    const reasons: string[] = []
    let result = null

    if (val && typeof val === `number`) {
        val = `${val}`
    }

    if (val && typeof val === `string`) {
        const numberREGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        result = val.replace(/\D/g, '')

        const length = result.length

        if (!numberREGEX.test(result)) {
            reasons.push(`invalid characters`)
        }

        if (length < 10) {
            reasons.push(`not enough digits`)
        }
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: result,
        reason: reasons
    }
}

export default ValidatePhone