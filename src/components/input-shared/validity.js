import { Get } from '../../utils/get.js'
import { matchInputMessage } from './match-input-message.js'

export const validity = host => ({
    get() {
        try { host.input.setCustomValidity(``) } catch (error) { }

        return Get(host, `input.validity`, {},
            ({
                valueMissing,
                typeMismatch,
                patternMismatch,
                tooLong,
                tooShort,
                rangeUnderflow,
                rangeOverflow,
                stepMismatch,
                badInput,
                customError,
                valid
            }) => {

                const value = host.value
                const valueAsAstring = value !== undefined && value !== null ? `${value}` : value
                const notMatchingInput = matchInputMessage(host) !== ``
                const badFormat = valueAsAstring !== Get(host, `input.value`)

                return {
                    valueMissing, typeMismatch, patternMismatch, tooLong, tooShort, rangeUnderflow, rangeOverflow, stepMismatch, badInput, customError,
                    badFormat,
                    notMatchingInput,
                    valid: valid && !badFormat && !notMatchingInput
                }
            }
        )
    }
})