import { ToNumber } from './to-number'

export function ValidateNumber(num) {
    const original = num
    const reasons = []
    const formatted = ToNumber(num)

    if (!formatted.valid) {
        reasons.push(`not a number`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: formatted.value,
        reason: reasons
    }
}