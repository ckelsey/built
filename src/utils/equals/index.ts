import GetType from '../type/get'
import isPrimitive from '../type/primitives'

const Equals = (value1, value2) => {
    const type = GetType(value1)

    if (GetType(value2) !== type) { return false }

    if (isPrimitive(value1)) {
        return value2 === value1
    }

    if (type === `boolean` && value1 !== value2) {
        return false
    }

    if (type === `array` && value1.length !== value2.length) {
        return false
    }

    if (type === `object` && Object.keys(value1).length !== Object.keys(value2).length) {
        return false
    }

    if (type === `date`) {
        let d = value1 === value2

        try {
            d = new Date(value1).getTime() === new Date(value2).getTime()
        } catch (error) { }
        return d
    }

    if (type === `dom`) {
        return value1.isEqualNode(value2)
    }

    if (type === `array`) {
        let len = value1.length

        while (len--) {
            if (!Equals(value1[len], value2[len])) {
                return false
            }
        }
    }

    if (type === `object`) {
        const keys = Object.keys(value1)
        let len = keys.length

        while (len--) {
            if (!Equals(value1[keys[len]], value2[keys[len]])) {
                return false
            }
        }
    }

    return true
}

export default Equals