import { Get } from '../../utils/get.js'
import { GetInputValue } from '../../utils/get-input-value.js'
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
                const inputValueAsString = `${GetInputValue(Get(host, `input`))}`
                const notMatchingInput = matchInputMessage(host) !== ``
                const badFormat = valueAsAstring !== inputValueAsString

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