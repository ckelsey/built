export const Tap = value => {
    console.log(`TAP value: ${value.value}, LAST instanceof:${value.instanceof[value.instanceof.length - 1]}, TYPE:${value.type}, VALID:${value.valid}, CHANGES:${value.stringChanges.length}`)
    return value
}