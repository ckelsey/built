import { ValidateResponse } from '../../../typings'
import { svgTags, htmlTags } from '../html'

export const ValidateUrl = (str: string): ValidateResponse => {
    const original = str

    if (!str || str.length === 0) {
        return {
            original: str,
            valid: false,
            sanitized: null,
            reason: [`no value`]
        }
    }

    if (typeof str !== `string` && str !== undefined) {
        str = (str as any).toString()
    }

    const reasons: string[] = []
    const link = document.createElement('a')
    link.href = str

    if (!link.protocol) {
        reasons.push(`Missing url protocol`)
    }

    if (!link.host) {
        reasons.push(`Missing url host`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: link.href,
        reason: reasons
    }
}

export const ValidateUsZipCode = (val: string): ValidateResponse => {
    const original = val
    const reasons: string[] = []
    let result = val

    if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(val)) {
        result = undefined
        reasons.push(`invalid`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: result,
        reason: reasons
    }
}

export const ValidateOneOf = (options: any[], val: string): ValidateResponse => {
    const original = val
    const reasons: string[] = []
    let result = val

    if (options.indexOf(val) === -1) {
        result = undefined
        reasons.push(`invalid`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: result,
        reason: reasons
    }
}

export const ValidateDate = (val: Date): ValidateResponse => {
    const original = val
    const reasons: string[] = []
    let result = val

    if (isNaN(Date.parse(!!val ? val.toString() : ``))) {
        result = null
        reasons.push(`invalid date`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: result,
        reason: reasons
    }
}

export const ValidateDateBefore = (before: Date, val: Date): ValidateResponse => {
    const original = val
    const reasons: string[] = []
    const parsedBefore = Date.parse(!!before ? before.toString() : ``)
    const parsedVal = Date.parse(!!val ? val.toString() : ``)
    let result = val

    if (isNaN(parsedBefore)) {
        result = null
        reasons.push(`invalid before date`)
    }

    if (isNaN(parsedVal)) {
        result = null
        reasons.push(`invalid date`)
    }

    if (parsedBefore <= parsedVal) {
        result = null
        reasons.push(`date is out of range`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: result,
        reason: reasons
    }
}

export const ValidateDateAfter = (after: Date, val: Date): ValidateResponse => {
    const original = val
    const reasons: string[] = []
    const parsedAfter = Date.parse(!!after ? after.toString() : ``)
    const parsedVal = Date.parse(!!val ? val.toString() : ``)
    let result = val

    if (isNaN(parsedAfter)) {
        result = null
        reasons.push(`invalid after date`)
    }

    if (isNaN(parsedVal)) {
        result = null
        reasons.push(`invalid date`)
    }

    if (parsedAfter >= parsedVal) {
        result = null
        reasons.push(`date is out of range`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: result,
        reason: reasons
    }
}

export const ValidateYear = (val: Date): ValidateResponse => {
    const original = val
    const reasons: string[] = []
    const parsedVal = new Date(val).getUTCFullYear()
    const valString = !!val ? val.toString() : ``
    let result = val

    if (!!parsedVal && parsedVal.toString() !== valString) {
        result = undefined
        reasons.push(`invalid year`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: result,
        reason: reasons
    }
}

export const ValidatePhone = (val: string | number): ValidateResponse => {
    const original = val
    const reasons: string[] = []
    let result = null

    if (val && typeof val === `number`) {
        val = `${val}`
    }

    if (val && typeof val === `string`) {
        const numberREGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        result = val.replace(/\D/g, '')

        if (result.length === 10) {
            result = `1${result}`
        }

        const length = result.length

        if (!numberREGEX.test(result)) {
            reasons.push(`invalid characters`)
        }

        if (length < 11) {
            reasons.push(`not enough digits`)
        }
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: result,
        reason: reasons
    }
}

export const ValidateBool = (val: any): ValidateResponse => {
    const original = val
    const reasons: string[] = []
    let result

    if (val === true || val === `on` || val === `true`) {
        result = true
    }

    if (val === false || val === `off` || val === `false`) {
        result = false
    }

    if (result === undefined) {
        result = false
        reasons.push(`not valid`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: !!result,
        reason: reasons
    }
}

export const ValidateNumber = (num: any): ValidateResponse => {
    const original = num
    const reasons = []
    let parsed = typeof num === `string` && num !== `` ? parseFloat(num as any) : num

    if (isNaN(parsed)) {
        parsed = null
        reasons.push(`not a number`)
    }

    return {
        original,
        valid: reasons.length === 0,
        sanitized: parsed,
        reason: reasons
    }
}

export const ValidateEmail = (str: any): ValidateResponse => {
    const original = str

    if (!str || !str.length) {
        return {
            original,
            valid: false,
            sanitized: str,
            reason: [`no value`]
        }
    }

    if (typeof str !== `string`) {
        str = `${str}`
    }

    const reasons = []
    const split = str.split(`@`)

    if (!split[0] || !split[0].length) {
        reasons.push(`missing username`)
    }

    if (split.length < 2) {
        reasons.push(`missing @ symbol`)
        reasons.push(`missing domain, i.e. "mail.com"`)
    }

    if (split.length > 1) {
        const domain = split[1].split(`.`)

        if (!domain[0] || !domain[0].length || !domain[1] || !domain[1].length) {
            reasons.push(`missing domain, i.e. "mail.com"`)
        }
    }

    if (reasons.length) {
        return {
            original,
            valid: false,
            sanitized: str,
            reason: reasons
        }
    }

    return ValidateHtml(str)
}

export const ValidateText = (str: any): ValidateResponse => {
    const original = str
    const reasons = []

    if (!str || !str.length) {
        return {
            original,
            valid: false,
            sanitized: str,
            reason: reasons.concat([`no value`])
        }
    }

    const type = typeof str

    if (type !== `string`) {
        return {
            original,
            valid: false,
            sanitized: str,
            reason: reasons.concat([`not text`])
        }
    }

    const htmlResults = ValidateHtml(str)

    htmlResults.reason = htmlResults.reason.concat(reasons)

    return htmlResults
}

export const ValidateHtml = (str: any, allowedHtmlTags?: string[], disallowedHtmlTags?: string[]): ValidateResponse => {
    const original = str
    const getElements = (Doc: Document, selector: string): HTMLElement[] => {
        return Array.from(Doc.body.querySelectorAll(selector))
    }

    if (!str || !str.length) {
        return {
            original,
            valid: false,
            sanitized: str,
            reason: [`no value`]
        }
    }

    const type = typeof str

    if (type !== `string`) {
        return {
            original,
            valid: false,
            sanitized: str,
            reason: [`not text, is ${type}`]
        }
    }

    let doc

    try {
        doc = new DOMParser().parseFromString(str, `text/html`)
    } catch (error) {
        return {
            original,
            valid: true,
            sanitized: str,
            reason: [`no html present`],
        }
    }

    const totalElements = getElements(doc, `*`)
    let tagsToDestroy: string[] = []
    let elementsToDestroy: HTMLElement[] = []

    if (disallowedHtmlTags && disallowedHtmlTags.length) {
        tagsToDestroy = disallowedHtmlTags.slice(0)
    } else {
        tagsToDestroy = [].concat(svgTags, htmlTags)
    }

    if (allowedHtmlTags && allowedHtmlTags.length) {
        allowedHtmlTags.forEach((tag: string) => {
            const index = tagsToDestroy.indexOf(tag)

            if (index > -1) {
                tagsToDestroy.splice(index, 1)
            }
        })
    }

    tagsToDestroy.forEach((tag: string) => {
        elementsToDestroy = [].concat(getElements(doc, tag), elementsToDestroy)
    })

    elementsToDestroy.forEach((el: HTMLElement) => {
        if (el && el.parentNode) {

            const childrenLength = el.children.length
            let index = 0

            while (index < childrenLength) {
                el.parentNode.insertBefore(el.children[index], el)
                index = index + 1
            }

            el.parentNode.removeChild(el)
        }
    })

    const leftOverElements = getElements(doc, `*`)
    const diff = totalElements.length - leftOverElements.length
    const valid = diff === 0

    return {
        original,
        valid,
        sanitized: valid ? str : !doc.body.innerHTML || !doc.body.innerHTML.length ? `` : doc.body.innerHTML,
        reason: valid ? [] : [`${diff} element${diff > 1 ? `s were` : ` was`} removed`]
    }
}
