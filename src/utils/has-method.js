export function HasMethod(obj, method) {
    return !!obj && typeof obj[method] === `function`
}