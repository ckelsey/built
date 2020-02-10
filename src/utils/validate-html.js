import { FromEntities } from './from-entities.js'
import { ToString } from './to-string.js'
import { Pipe } from './pipe.js'
import { svgTags } from './svg-tags.js'
import { htmlTags } from './html-tags.js'

function getElements(Doc, selector) {
    return Array.from(Doc.body.querySelectorAll(selector))
}

export function ValidateHtml(str, allowedHtmlTags, disallowedHtmlTags) {
    const original = str
    const converted = Pipe(ToString, FromEntities)(str)
    let val = converted.value

    if (!str || !str.length || converted.type !== 'string') {
        return {
            original: original,
            valid: false,
            sanitized: val,
            reason: ['no value']
        }
    }

    let doc

    try {
        doc = new DOMParser().parseFromString(val, 'text/html')
    } catch (error) {
        return {
            original: original,
            valid: true,
            sanitized: val,
            reason: ['no html present'],
        }
    }

    const totalElements = getElements(doc, '*')
    let tagsToDestroy = []
    let elementsToDestroy = []

    function allowedHtmlTagsEach(tag) {
        const index = tagsToDestroy.indexOf(tag)

        if (index > -1) {
            tagsToDestroy.splice(index, 1)
        }
    }

    function tagsToDestroyEach(tag) {
        elementsToDestroy = [].concat(getElements(doc, tag), elementsToDestroy)
    }

    function elementsToDestroyEach(el) {
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
    }

    if (disallowedHtmlTags && disallowedHtmlTags.length) {
        tagsToDestroy = disallowedHtmlTags.slice(0)
    } else {
        tagsToDestroy = [].concat(svgTags, htmlTags)
    }

    if (allowedHtmlTags && allowedHtmlTags.length) {
        allowedHtmlTags.forEach(allowedHtmlTagsEach)
    }

    tagsToDestroy.forEach(tagsToDestroyEach)

    elementsToDestroy.forEach(elementsToDestroyEach)

    const leftOverElements = getElements(doc, '*')
    const diff = totalElements.length - leftOverElements.length
    const valid = diff === 0

    return {
        original: original,
        valid: valid,
        sanitized: valid ? val : !doc.body.innerHTML || !doc.body.innerHTML.length ? '' : doc.body.innerHTML,
        reason: valid ? [] : [''.concat(diff, ' element', diff > 1 ? 's were' : ' was', ' removed')]
    }
}