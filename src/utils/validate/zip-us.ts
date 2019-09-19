import { ToUsZip } from '../convert/postal'
const ValidateUsZip = val => {
    const original = val
    const reason: string[] = []

    const result = ToUsZip(val)

    if (!result.valid) {
        if (result.value.length < 5) {
            reason.push(`minimum of 5 digits`)
        }

        if (result.value.length > 5 && result.value.length < 10) {
            reason.push(`needs to be 5 or 9 digits`)
        }
    }

    return {
        original,
        valid: result.valid,
        sanitized: original,
        reason
    }
}

export default ValidateUsZip