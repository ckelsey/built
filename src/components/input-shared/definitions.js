export const labelPositions = ['top', 'bottom', 'left', 'right', 'inside']
export const resizeOptions = ['true', 'false', 'horizontal', 'vertical', 'auto']

const boolAttrs = ['aria-labelledby', 'disabled', 'id', 'name', 'readonly', 'required', 'aria-required', 'tabindex', 'value']
const fieldAttrs = [].concat(boolAttrs, ['autocorrect', 'autocomplete', 'autofocus', 'maxlength', 'placeholder', 'pattern'])
const fileAttrs = [].concat(fieldAttrs, ['accept'])
export const InputFieldInputAttributes = {
    field: fieldAttrs,
    bool: boolAttrs,
    file: fileAttrs
}

export const supportedInputTypes = [
    'file',
    'email',
    'password',
    'url',
    'text',
    'textarea',
    'number',
    'radio',
    'checkbox',
    'tel',
    'usphone',
    'intlphone',
    'uszip',
    'select'
]

export function processedNullValue() {
    return {
        original: '',
        sanitized: '',
        valid: true,
        reason: []
    }
}

export function processedFileValue(file) {
    return {
        original: file,
        sanitized: file,
        valid: true,
        reason: []
    }
}