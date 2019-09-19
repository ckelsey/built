import { FromEntities } from '../convert/entities'
import { ToString } from '../convert/string'
import pipe from '../pipe'
import { svgTags, htmlTags } from '../html'

const ValidateHtml = (str: any, allowedHtmlTags?: string[], disallowedHtmlTags?: string[]) => {
    const original = str
    const converted = pipe(ToString, FromEntities)(str)
    let val = converted.value

    const getElements = (Doc: Document, selector: string): HTMLElement[] => {
        return Array.from(Doc.body.querySelectorAll(selector))
    }

    if (!str || !str.length || converted.type !== `string`) {
        return {
            original,
            valid: false,
            sanitized: val,
            reason: [`no value`]
        }
    }

    let doc

    try {
        doc = new DOMParser().parseFromString(val, `text/html`)
    } catch (error) {
        return {
            original,
            valid: true,
            sanitized: val,
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
        sanitized: valid ? val : !doc.body.innerHTML || !doc.body.innerHTML.length ? `` : doc.body.innerHTML,
        reason: valid ? [] : [`${diff} element${diff > 1 ? `s were` : ` was`} removed`]
    }
}

export default ValidateHtml