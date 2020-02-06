export function valueMaxMin(host, value) {
    let valid = true
    let errorText = ''

    if (value === undefined || value === null) {
        return { value: value, valid: valid, errorText: errorText }
    }

    if (host.type === 'number') {
        if (!!host.max && host.max < value) {
            value = host.max
        }

        if (!!host.min && host.min > value) {
            value = host.min
        }
    } else {
        if (!!host.max && host.max < value.length) {
            value = value.slice(0, host.max)
        }

        if (!!host.min && !!value && host.min > value.length && !host.focused) {
            errorText = ''.concat('Must be at least ', host.min, ' characters')
            valid = false
        }
    }

    return { value: value, valid: valid, errorText: errorText }
}