export function getValue(input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
    const type = input.type

    if (type === `checkbox` || type === `radio`) {
        return input[`checked`]
    }

    if (type === `select` && input[`selectedOptions`]) {
        const value = Array.from(input[`selectedOptions`])
            .map((o: HTMLOptionElement) => o.value)

        if (value.length < 2) {
            return value[0]
        }

        return value
    }

    return input.value
}

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

export function isAutoFilled(input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): boolean {
    const nativeMatches = (input.matches || input[`msMatchesSelector`])

    try {
        return nativeMatches.call(input, `:-webkit-autofill`)
    } catch (error) {
        try {
            return nativeMatches.call(input, `:-moz-autofill`)
        } catch (error) {
            try {
                return nativeMatches.call(input, `:-ms-autofill`)
            } catch (error) {
                try {
                    return nativeMatches.call(input, `:-o-autofill`)
                } catch (error) {
                    try {
                        return nativeMatches.call(input, `:autofill`)
                    } catch (error) {
                        return false
                    }
                }
            }
        }
    }
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

export const setInputCaret = (input, position, doc) => {
    if (!input || !doc || doc.activeElement !== input) { return }

    if (input.createTextRange) {
        var range = input.createTextRange()
        range.move('character', position)
        range.select()
    } else if (input.selectionStart) {
        input.setSelectionRange(position, position)
    }

    return input
}