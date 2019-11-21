import UseIf from './use_if'
import ToArray from './to_array'

const ForceToArray = value => {
    let res = ToArray(value)

    if (res.stop) { return res }

    const newValue = UseIf(v => !(Array.isArray(v) && v.length), v => v === undefined ? undefined : [v], res.value).value

    res.value = newValue
    res.instanceof.push(`ForceToArray`)
    res.valid = Array.isArray(res.value)
    return res
}

export default ForceToArray