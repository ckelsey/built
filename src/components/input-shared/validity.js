import { Get } from '../../utils/get.js'
import { GetInputValue } from '../../utils/get-input-value.js'
import { matchInputMessage } from './match-input-message.js'

export function validity(host) {
    return {
        get: function () {
            try { host.input.setCustomValidity('') } catch (error) { }

            return Get(host, 'input.validity', {},
                function (values) {
                    const value = host.value
                    const valueAsAstring = value !== undefined && value !== null ? ''.concat(value) : value
                    const inputValueAsString = ''.concat(GetInputValue(Get(host, 'input')))
                    const notMatchingInput = matchInputMessage(host) !== ''
                    const badFormat = valueAsAstring !== inputValueAsString

                    return {
                        valueMissing: values.valueMissing,
                        typeMismatch: values.typeMismatch,
                        patternMismatch: values.patternMismatch,
                        tooLong: values.tooLong,
                        tooShort: values.tooShort,
                        rangeUnderflow: values.rangeUnderflow,
                        rangeOverflow: values.rangeOverflow,
                        stepMismatch: values.stepMismatch,
                        badInput: values.badInput,
                        customError: values.customError,
                        badFormat: badFormat,
                        notMatchingInput: notMatchingInput,
                        valid: values.valid && !badFormat && !notMatchingInput
                    }
                }
            )
        }
    }
}