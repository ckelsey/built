import { Get } from '../../utils/get.js'

function isEmpty(value) {
    return value === '' || value === null || value === undefined
}

function reduceReasons(target, current) {
    if (!!current && target.indexOf(current) === -1) { target.push(current) }
    return target
}

function emptyValue() { return { original: '', sanitized: '', valid: true, reason: [] } }

function getValueMetadata(host, value) {
    if (typeof host.preProcessValue !== 'function') {
        const empty = isEmpty(value)

        return {
            original: value === undefined ? '' : value,
            sanitized: value === undefined ? '' : value,
            valid: empty ? true : host.validationMessage === '',
            reason: empty ? [] : [host.validationMessage].reduce(reduceReasons, [])
        }
    }

    if (isEmpty(value)) { return emptyValue() }

    const preProccessed = host.preProcessValue(value)

    if (isEmpty(preProccessed.sanitized)) { return emptyValue() }

    const validity = host.validity
    const invalids = []
    const keysToSkip = ['valid', 'customError', 'message']

    Object.keys(validity).forEach(function (key) {
        return keysToSkip.indexOf(key) === -1 && validity[key] === true ?
            invalids.push(key) :
            undefined
    })

    return {
        original: value,
        sanitized: preProccessed.sanitized,
        valid: invalids.length === 0 && validity.valid,
        reason: [host.validationMessage].concat(preProccessed.reason).reduce(reduceReasons, []),
        validity: validity
    }
}

export function processedValue(host) {
    return {
        get: function () {
            if (!host.cacheNeedsUpdate) { return host.cachedValue }
            return getValueMetadata(host, Get(host, 'state.value.value'))
        }
    }
}