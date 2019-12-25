import { FromEntities, ToString, Pipe, svgTags, htmlTags } from '..'

export function ValidateHtml(str, allowedHtmlTags, disallowedHtmlTags) {
    const original = str
    const converted = Pipe(ToString, FromEntities)(str)
    let val = converted.value

    const getElements = (Doc, selector) => {
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
    let tagsToDestroy = []
    let elementsToDestroy = []

    if (disallowedHtmlTags && disallowedHtmlTags.length) {
        tagsToDestroy = disallowedHtmlTags.slice(0)
    } else {
        tagsToDestroy = [].concat(svgTags, htmlTags)
    }

    if (allowedHtmlTags && allowedHtmlTags.length) {
        allowedHtmlTags.forEach(tag => {
            const index = tagsToDestroy.indexOf(tag)

            if (index > -1) {
                tagsToDestroy.splice(index, 1)
            }
        })
    }

    tagsToDestroy.forEach(tag => {
        elementsToDestroy = [].concat(getElements(doc, tag), elementsToDestroy)
    })

    elementsToDestroy.forEach(el => {
        if (el && el.parentNode) {

            const childrenLength = el.children.length
            let index = 0

            while (index < childrenLength) {
                try {
                    el.parentNode.insertBefore(el.children[index], el)
                } catch (error) { }
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