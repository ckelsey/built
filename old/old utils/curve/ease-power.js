export function EasePower(stepDecimal, pow = 4) {
    return 1 - Math.pow(1 - stepDecimal, pow)
}
