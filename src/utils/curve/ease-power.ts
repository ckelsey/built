const EasePower = (stepDecimal, pow = 4) => 1 - Math.pow(1 - stepDecimal, pow)
export default EasePower
