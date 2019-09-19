import ObserveEvent from '../../utils/observeEvent'
import { countryOptions, css } from './definitions'

export const elementSelectors = {
    root: `.country-dropdown-container`,
    select: `dropdown-select`
}

export const setSelectValue = host => {
    const select = host.elements.select

    if (!select) { return }

    select.value = host.value
}

const elements = {}

const methods = {
    select: (el, host) => {
        el.options = countryOptions

        el.eventSubscriptions = {
            input: ObserveEvent(el, `input`, { useCapture: true }).subscribe(() => {
                host.value = el.value
                host.dispatchEvent(new Event(`input`))
            }),
            selectopen: ObserveEvent(el, `selectopen`).subscribe(() => host.dispatchEvent(new CustomEvent(`selectopen`, { detail: host }))),
            selectclose: ObserveEvent(el, `selectclose`).subscribe(() => host.dispatchEvent(new CustomEvent(`selectclose`, { detail: host }))),
            focus: ObserveEvent(el, `focus`, { useCapture: true }).subscribe(() => host.dispatchEvent(new CustomEvent(`shown`, { detail: host }))),
            blur: ObserveEvent(el, `blur`, { useCapture: true }).subscribe(() => host.dispatchEvent(new CustomEvent(`hidded`, { detail: host })))
        }

        el.styles = `${css}${host.styles}`
        setSelectValue(host)

        const attrs = [
            `arrow`,
            `disabled`,
            `disablefilter`,
            `hideonfilter`,
            `native`,
            `readonly`,
        ]

        attrs.forEach(key => {
            el[key] = host[key]
        })
    }
}

Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: methods[key] ? methods[key] : () => { }
    }
})

export default elements