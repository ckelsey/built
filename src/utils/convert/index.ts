import { getType } from '../type'
import { Set } from '../set/set'

export interface TMonad {
    value: any,
    valid: boolean,
    type: string,
    instanceof: string[],
    stop?: boolean
}

export const T = (data: any, valid?: boolean) =>
    data.instanceof && data.instanceof.indexOf(`T`) > -1
        ? Set(data, `instanceof.${data.instanceof.length}`, `T`)
        : ({
            value: data,
            valid: valid === undefined ? true : valid,
            type: getType(data),
            instanceof: [`T`]
        })

const empty = (val: any): boolean => {
    return (
        val === ``
        || val === undefined
        || val === null
        || (Array.isArray(val) && val.length === 0)
        || (typeof val === `object` && Object.keys(val).length === 0)
    ) && (!(val instanceof Element) && !(val instanceof Node))
}

const Convert = (data: any, valid: boolean = true): any => {
    const decodeUri = (d) => Convert(decodeURI(d), typeof d === `string`)
    const encodeUri = (d) => Convert(encodeURI(d), typeof d === `string`)
    const htmlEntities = (d) => Convert(
        (typeof d !== `string` ? `` : d)
            .replace(/&amp;/g, '<')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
            .replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g, '\''),
        typeof d === `string`
    )

    const JsonParse = (d) => {
        if ([`object`, `array`].indexOf(getType(d)) > -1) {
            return Convert(d, true)
        }

        let validity = true

        try {
            d = JSON.parse(d)
        } catch (error) {
            validity = false
        }

        return Convert(d, validity)
    }

    const JsonString = (d) => {
        if (getType(d) === `string`) {
            d = JsonParse(d).value
        }

        let validity = true

        try {
            d = JSON.stringify(d)
        } catch (error) {
            validity = false
        }

        return Convert(d, validity)
    }

    const bool = (d: any) => {
        if (d === `undefined`) { d = false }
        if (d === `null`) { d = false }
        if (d === `0`) { d = false }
        if (d === `false`) { d = false }
        return Convert(!!d, true)
    }

    const array = (d: any) => {
        if (typeof d === `string`) {
            d = JsonParse(htmlEntities(decodeUri(data).value).value).value
        }

        return Convert(d, Array.isArray(d))
    }

    const object = (d: any) => {
        if (typeof d === `string`) {
            d = JsonParse(htmlEntities(decodeUri(d).value).value).value
        }

        return Convert(d, typeof d === `object`)
    }

    const aNumber = (d: any) => {
        if (typeof d === `string` && d !== ``) {
            d = d.replace(/[^0-9,.]+/g, ``)
            d = parseFloat(d)
            return Convert(d, !isNaN(d))
        }

        return Convert(d, !isNaN(d))
    }

    const aFunction = (d: any) => Convert(d, typeof d === `function`)

    const commasToArray = (d: any) => {
        if (Array.isArray(d)) {
            return Convert(d, true)
        }

        if (typeof d !== `string`) {
            return Convert(d, false)
        }

        return Convert(d)
            .indexOf(`,`)
            // .stopInvalid()
            .split(`,`)
            .map(v => v.trim())
            .filter(v => !empty(v))
    }

    const split = (d, delimiter) => {
        return Convert(
            Convert(d)
                .string()
                // .stopInvalid()
                .value
                .split(delimiter)
        )
            .array()
    }

    const map = (d, fn) => {
        return Convert(
            Convert(d)
                .array()
                // .stopInvalid()
                .value
                .map(fn)
        )
            .array()
    }

    const filter = (d, fn) => {
        return Convert(
            Convert(d)
                .array()
                // .stopInvalid()
                .value
                .filter(fn)
        )
            .array()
    }

    const replace = (find, replacement, d) => {
        const r = Convert(d).value
        r.replace(find, replacement)
        return Convert(r, true)
    }

    const date = (d) => {
        d = new Date(d)
        return Convert(d, (d !== `Invalid Date`) && !isNaN(d))
    }

    const phone = (d) => {
        const str = `${Convert(d).number().ifInvalid(``).value}`
            .split(``)

        return Convert(
            str.map((val, index) => {
                switch (index) {
                    case 0:
                        return str.length > 0 ? `+${val}` : val
                    case 1:
                        return str.length > 1 ? ` (${val}` : val
                    case 3:
                        return str.length > 4 ? `${val}) ` : val
                    case 6:
                        return str.length > 7 ? `${val}-` : val
                    case 2:
                    case 4:
                    case 5:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        return val
                    default:
                        return ``
                }
            }).join(``)
        )
    }

    const formatOptions = val => {
        if (!val) { return Convert(null, false) }

        return Convert(val)
            .array()
            .ifInvalid(
                Convert(val)
                    .commasToArray()
                    .ifInvalid([])
                    .value
            )


        // const json = Convert(val)
        //     .plainText()
        //     .jsonParse()
        //     .array()
        //     .ifInvalid(null)
        //     .value

        // const commas = Convert(val)
        //     .plainText()
        //     .jsonParse()
        //     .commasToArray()
        //     .array()
        //     .ifInvalid(null)
        //     .value

        // if (json) { val = json }

        // if (commas) { val = commas }

        // if (val && Array.isArray(val)) {
        //     val = val
        //         .map(option => {
        //             if (typeof option === `string`) {
        //                 option = Convert(option)
        //                     .plainText()
        //                     .jsonParse()
        //                     .ifInvalid(option)
        //                     .value
        //             }

        //             if (typeof option === `string`) {
        //                 option = {
        //                     label: option,
        //                     value: option
        //                 }
        //             }

        //             if (option.label === undefined || option.value === undefined) {
        //                 return undefined
        //             }

        //             return option
        //         })
        //         .filter(option => !!option)

        //     return Convert(val, val.length > 0)
        // }

        // return Convert(val, false)
    }

    const ifTest = (fn: (current: any) => boolean, v: any) => {
        const result = fn(data)
        return Convert(!!result ? v : data, !!result)
    }

    const matchTypes = sample => {
        if (sample === undefined || sample === null) {
            return Convert(sample, data === undefined || data === null)
        }

        if (typeof sample === `string`) {
            return Convert(data).string()
        }

        if (typeof sample === `number`) {
            return Convert(data).number()
        }

        if (typeof sample === `function`) {
            return Convert(data).function()
        }

        if (Array.isArray(sample)) {
            return Convert(data).array()
        }

        if (typeof sample === `object`) {
            return Convert(data).object()
        }

        return Convert(data)
    }

    const methods = {
        match: matchTypes,
        options: () => formatOptions(data),
        array: () => array(data),
        bind: (This) => Convert(data.bind(This)),
        boolean: () => bool(data),
        commasToArray: () => commasToArray(data),
        decodeUri: () => decodeUri(data),
        encodeUri: () => encodeUri(data),
        entities: () => htmlEntities(data),
        function: () => aFunction(data),
        ifEmpty: (v: any) => Convert(empty(methods.value) ? v : methods.value),
        ifInvalid: (v: any) => Convert(methods.valid ? methods.value : v, methods.valid),
        ifNot: (toCompare, v) => Convert(toCompare === methods.value ? methods.value : v),
        indexOf: (arr: any[]) => Convert(data, arr.indexOf(data) > -1),
        if: ifTest,
        jsonParse: () => JsonParse(data),
        jsonString: () => JsonString(data),
        number: () => aNumber(data),
        object: () => object(data),
        plainText: () => htmlEntities(decodeUri(data).value),
        replace: (find, replacement) => replace(find, replacement, data),
        value: data,
        valid,
        date: () => date(data),
        phone: () => phone(data),
        string: () => {
            if (data === undefined || data === null) {
                return Convert(data, false)
            }

            const str = Convert(data).jsonString().ifInvalid(`${data}`).value
            return Convert(str, str.indexOf(`[object`) === 0)
        },
        split: delimiter => split(data, delimiter),
        map: fn => map(data, fn),
        filter: fn => filter(data, fn)
    }

    for (const key in methods) {
        if (typeof methods[key] === 'function') {
            methods[key] = methods[key].bind(methods)
        }
    }

    return methods
}

(window as any).Convert = Convert

export default Convert
