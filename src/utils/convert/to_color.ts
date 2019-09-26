import ToString from './to_string'

const ToColor = value => {
    const result = ToString(value)

    if (result.stop) { return result }

    if (result.valid) {
        const el = document.createElement(`option`)
        el.style.color = result.value
        console.log(`ToColor`, result.value, el.style.color)
        result.valid = el.style.color === result.value
    }

    result.instanceof.push(`ToColor`)
    return result
}

export default ToColor