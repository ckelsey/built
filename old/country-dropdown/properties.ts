import pipe from '../../utils/pipe'
import { IfInvalid, IfIs, IfNot } from '../../utils/convert/if'
import { countryOptions } from './definitions'
import { ToObject, HasKeys } from '../../utils/convert/object'
import Get from '../../utils/get'
import { ToBool } from '../../utils/convert/bool'
import { wcClassObject } from '../../utils/html/attr'
import { setSelectValue } from './elements'
import { ToString } from '../../utils/convert/string'
import { IndexOf } from '../../utils/convert/array'
import { isMobile } from '../../utils/platform'

const trueOrNull = val => pipe(ToBool, IfNot(true, null))(val).value

const setSelectAttribute = (host, name, value) => {
    const select = host.elements.select

    if (select) {
        select.setAttribute(name, value)
    }
}

const attributes = {
    arrow: {
        format: val => pipe(ToString, IndexOf([`right`, `left`, `true`, `false`]), IfInvalid(`true`), IfIs(`true`, `right`))(val).value,
        onChange: (val, host) => setSelectAttribute(host, `arrow`, val)
    },

    class: wcClassObject,

    disabled: {
        format: trueOrNull,
        onChange: (val, host) => setSelectAttribute(host, `disabled`, val)
    },

    disablefilter: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => setSelectAttribute(host, `disablefilter`, val)
    },

    native: {
        format: val => pipe(ToBool, IfInvalid(isMobile))(val).value,
        onChange: (val, host) => setSelectAttribute(host, `native`, val)
    },

    dropdownphone: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (val, host) => {
            host.elements.select.classList[val ? `add` : `remove`](`showdropdownphone`)
        }
    },

    labelphone: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (val, host) => {
            host.elements.select.classList[val ? `add` : `remove`](`showlabelphone`)
        }
    },

    phone: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (val, host) => {
            host.labelphone = host.getAttribute(`labelphone`) || val
            host.dropdownphone = host.getAttribute(`dropdownphone`) || val
        }
    },

    dropdowncountry: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (val, host) => {
            host.elements.select.classList[val ? `add` : `remove`](`showdropdowncountry`)
        }
    },

    labelcountry: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (val, host) => {
            host.elements.select.classList[val ? `add` : `remove`](`showlabelcountry`)
        }
    },

    country: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (val, host) => {
            host.labelcountry = host.getAttribute(`labelcountry`) || val
            host.dropdowncountry = host.getAttribute(`dropdowncountry`) || val
        }
    },

    dropdowncode: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => {
            host.elements.select.classList[val ? `add` : `remove`](`showdropdowncode`)
        }
    },

    labelcode: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => {
            host.elements.select.classList[val ? `add` : `remove`](`showlabelcode`)
        }
    },

    code: {
        format: val => pipe(ToBool, IfInvalid(false))(val).value,
        onChange: (val, host) => {
            host.labelcode = host.getAttribute(`labelcode`) || val
            host.dropdowncode = host.getAttribute(`dropdowncode`) || val
        }
    },

    dropdownflag: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (val, host) => {
            host.elements.select.classList[val ? `add` : `remove`](`showdropdownflag`)
        }
    },

    labelflag: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (val, host) => {
            host.elements.select.classList[val ? `add` : `remove`](`showlabelflag`)
        }
    },

    flag: {
        format: val => pipe(ToBool, IfInvalid(true))(val).value,
        onChange: (val, host) => {
            host.labelflag = host.getAttribute(`labelflag`) || val
            host.dropdownflag = host.getAttribute(`dropdownflag`) || val
        }
    },

    value: {
        format: val => pipe(ToObject, HasKeys([`name`, `phone`, `code`]), IfInvalid(null))(val).value,
        onChange: (val, host) => val ? setSelectValue(host) : undefined
    },
}

export const properties = Object.assign({}, attributes)

export const observedAttributes = Object.keys(attributes)

export const selectedIndex = host => ({
    get() {
        const code = Get(host, `value.code`)

        if (!code) { return 0 }

        let i = -1
        let option


        while (!option && i < countryOptions.length) {
            i = i + 1
            if (countryOptions[i].value.code === code) {
                option = countryOptions[i]
            }
        }

        return i ? i : 0
    }
})

export const selected = host => ({
    get() {
        let i = host.selectedIndex
        return countryOptions[i] ? countryOptions[i] : countryOptions[0]
    }
})

export const language = () => ({
    get() {
        const code = Get(navigator, `languages.0`, ``)
        const len = countryOptions.length
        const possible = []
        const highly = []
        let i = 0

        while (i < len) {
            const index = countryOptions[i].value.languages.indexOf(code)
            if (index > 0) {
                possible.push(countryOptions[i])

            }
            if (index === 0) {
                highly.push(countryOptions[i])
            }

            i = i + 1
        }

        highly.sort((a, b) => a.value.languages.length < b.value.languages.length ? 1 : -1)
        possible.sort((a, b) => a.value.languages.length < b.value.languages.length ? 1 : -1)

        return highly[0] || possible[0]
    }
})

export const options = () => ({
    get() {
        return countryOptions
    }
})