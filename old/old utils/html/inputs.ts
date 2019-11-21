

export function getInvalidMessage(input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
    let message

    try {
        message = input.validationMessage === `` ? undefined : input.validationMessage
    } catch (error) { }

    if (message && message[message.length - 1] === `.`) {
        message = message.substring(0, message.length - 1)
    }

    return message
}



export function isFocused(input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): boolean {
    if (input[`focused`]) {
        return true
    }

    const nativeMatches = (input.matches || input[`msMatchesSelector`])

    try {
        return nativeMatches.call(input, `:focus`)
    } catch (error) {
        return false
    }
}

