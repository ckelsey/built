export const labelPositions = [`top`, `bottom`, `left`, `right`, `inside`]
export const resizeOptions = [`true`, `false`, `horizontal`, `vertical`, `auto`]
export const typesWithOptions = [`select`, `rotary`]
export const typesWithOverlay = [`select`, `datetime`]

export const InputFieldInputAttributes = {
    all: [`accept`, `aria-describedby`, `aria-labelledby`, `autocomplete`, `autofocus`, `disabled`, `id`, `maxlength`, `multiple`, `name`, `placeholder`, `readonly`, `required`, `tabindex`, `value`,],
    bool: [`aria-describedby`, `aria-labelledby`, `disabled`, `id`, `name`, `readonly`, `required`, `tabindex`, `value`]
}

export const supportedInputTypes = [
    `file`,
    `email`,
    `password`,
    `url`,
    `text`,
    `textarea`,
    `number`,
    `radio`,
    `checkbox`,
    // `select`,
    `tel`,
    `usphone`,
    `intlphone`,
    `uszip`,
]

export const processedNullValue = () => ({
    original: ``,
    sanitized: ``,
    valid: true,
    reason: []
})

export const processedFileValue = file => ({
    original: file,
    sanitized: file,
    valid: true,
    reason: []
})