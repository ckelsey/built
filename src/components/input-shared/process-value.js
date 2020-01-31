import { WCWhenPropertyReady } from '../../utils/wc-when-property-ready.js'
import { IsAutoFilled } from '../../utils/is-autofilled.js'
import { Get } from '../../utils/get.js'

const supportsInternals = `ElementInternals` in window && `setFormData` in window.ElementInternals

export function processValue(host) {
    return function processingValue() {
        return WCWhenPropertyReady(host, `input`)
            .then(input => {
                const processed = host.processedValue
                const sanitized = processed.sanitized
                const autofilled = IsAutoFilled(input)
                const stringEmpty = (isNaN(sanitized) || typeof sanitized === `string`) && !sanitized.length
                const empty = stringEmpty && !autofilled
                const valid = !host.focused && empty ? true : processed.valid
                const badFormat = Get(processed, `validity.badFormat`)

                if (badFormat && processed.reason.length) {
                    host.setCustomValidity(processed.reason.join(`, `))
                    host.invalid = true
                }

                if (supportsInternals) {
                    host.internals_.setFormValue(sanitized)
                }

                host.cachedValue = processed

                if (typeof host.postProcessValue === `function`) {
                    host.postProcessValue({
                        input,
                        valid,
                        sanitized
                    })
                }

                if (host.type === `select`) {
                    if (host.emptyoption === `false` || host.emptyoption === false || host.emptyoption === undefined) {
                        host.notempty = !empty
                    } else {
                        host.notempty = true
                    }
                } else {
                    host.notempty = !empty
                }

                if (valid) { return host.invalid = false }
                if (empty) { return host.invalid = false }
                if (!host.focused) { return host.invalid = true }
            })
            .catch(console.error)
    }
}







//     if (!host.input) { return }

//     const processed = host.processedValue
//     const sanitized = processed.sanitized

//     host.setCustomValidity(processed.reason.join(`, `))

//     const errors = host.validationMessage
//     const valid = (errors.length ? false : processed.valid) || (!host.focused && host.valid)
//     const autofilled = IsAutoFilled(input)
//     const stringEmpty = (isNaN(sanitized) || typeof sanitized === `string`) && !sanitized.length
//     const empty = stringEmpty && !autofilled

//     host.count = host.type === `number` ? sanitized : sanitized ? sanitized.length : 0
//     host.elements.container.classList[sanitized ? `add` : `remove`](`checked`)

//     if (host.type === `file`) {

//         const files = getDroppedFiles(sanitized) || getFileValue(input)
//         const filenames = !files ? [] : files.map(f => f.name)
//         SetAttribute(host.elements.inputContainer, `title`, filenames.join(`, `))

//         try {
//             input.files = (new ClipboardEvent(``).clipboardData || new DataTransfer).files
//         } catch (error) { }

//         if (!filenames.length && host.pathvalue) {
//             host.notempty = true
//             return
//         } else if (filenames.length) {
//             host.pathvalue = ``
//         }

//         if (supportsInternals) {
//             host.internals_.setFormValue(input.files)
//         }

//     } else {
//         try {
//             const selectionEnd = input.selectionEnd
//             let cursorPosition = selectionEnd

//             // masker(input, sanitized, [input.selectionStart, input.selectionEnd], countries)

//             const formatted = InputFieldFormatValue(sanitized, host.format || host.type)
//             const newValue = formatted.value || ``
//             const current = input.value

//             if (formatted.stringChanges && formatted.stringChanges.length) {
//                 formatted.stringChanges.forEach(change => {
//                     if (!!change.added && !!change.removed && change.start < cursorPosition) {
//                         return cursorPosition = cursorPosition + (change.added.length - change.removed.length)
//                     }

//                     if (!!change.removed && change.start < cursorPosition) {
//                         return cursorPosition = cursorPosition - change.removed.length
//                     }

//                     if (!!change.added && change.start < cursorPosition) {
//                         return cursorPosition = cursorPosition + change.added.length
//                     }
//                 })
//             }

//             input.cursorPosition = cursorPosition

//             if (current !== newValue || host.type === `intlphone`) {
//                 input.value = newValue

//                 if (formatted.stringChanges && formatted.stringChanges.length) {
//                     SetCaret(input, cursorPosition, host.shadowRoot)
//                 }

//                 if (supportsInternals) {
//                     host.internals_.setFormValue(newValue)
//                 }
//             } else {
//                 if (supportsInternals) {
//                     host.internals_.setFormValue(current)
//                 }
//             }

//         } catch (error) { }
//     }

//     textareaHeight(host.resize, input)

//     host.notempty = !empty

//     if (valid) { return host.invalid = false }
//     if (empty) { return host.invalid = false }
//     if (!host.focused) { return host.invalid = true }
// }