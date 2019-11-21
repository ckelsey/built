export function IsAutoFilled(input) {
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