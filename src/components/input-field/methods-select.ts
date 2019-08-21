import ObserveEvent from '../../utils/observeEvent'
import { typesWithOptions } from './definitions'
import { isMobile } from '../../utils/platform'
import { ValidateHtml } from '../../utils/validate'
import { setAttribute } from './methods-elements'
import { dispatch } from './methods-events';

export const filterSelect = (value, host) => {
    const filter = value.toLowerCase()
    const options = host.optionElements
    const emptyFilter = filter === ``
    const selected = host.selected.label
    const filtering = filter !== (selected && typeof selected === `string` ? selected.toLowerCase() : ``)

    options.forEach(o => {
        const label = o.textContent.toLowerCase()

        if (!emptyFilter && filtering) {
            if (label === filter || label.indexOf(filter) > -1) {
                o.classList.remove('filtered-out')
            } else {
                o.classList.add('filtered-out')
            }
        } else {
            o.classList.remove('filtered-out')
        }
    })

    setSelectSelected(options, host.processedValue.sanitized)
}

export const setSelectSelected = (options, value) => {
    if (!options.length) { return }

    options.forEach(o => {
        if (o.value === value) {
            o.classList.add('selected')
        } else {
            o.classList.remove('selected')
        }
    })
}

export const setNativeOptions = (options, host) => {
    const input = host.elements.input

    if (!input || !options || !options.length) { return }

    input.innerHTML = ``

    const createOption = option => {
        const optionElement = document.createElement(`option`)
        optionElement[`value`] = option.value
        optionElement.textContent = option.label
        input.appendChild(optionElement)
    }

    if (host.emptySelect !== false) {
        createOption({
            value: ``,
            label: host.emptySelect
        })
    }

    options.forEach(option => createOption(option))
}

export const setOptions = (options, host) => {
    if (typesWithOptions.indexOf(host.type) === -1) { return }

    host.elements.options.innerHTML = ``

    if (!options || !options.length) { return }

    if (host.type === `select` && isMobile) { return host.setNativeOptions(options) }

    if (host.type === `rotary` && host.elements.rotary) {
        host.elements.rotary.options = options
        host.elements.rotary.value = host.value
        return
    }

    const createOption = option => {
        const optionElement = document.createElement(`div`)
        optionElement.className = `input-field-option${!!option.class ? ` ${option.class}` : ``}`
        optionElement[`value`] = option.value
        optionElement.innerHTML = ValidateHtml(option.label, [], [`script`]).sanitized || ``
        host.elements.options.appendChild(optionElement)

        ObserveEvent(optionElement, `mousedown`).subscribe(() => {
            host.optionElements.forEach(o => o.classList.remove(`selected`))
            optionElement.classList.add(`selected`)
            host.value = option.value
            dispatch(host, `input`, host.value)
        })

        if (host.value === option.value) {
            optionElement.dispatchEvent(new Event(`mousedown`))
        }
    }

    if (host.emptySelect !== false) {
        createOption({
            value: ``,
            label: host.emptySelect,
            class: 'blank'
        })
    }

    options.forEach(option => createOption(option))
}

export const setSelectInputValue = (input, host) => {
    const val = host.processedValue.original
    let i = host.options.length

    while (i--) {
        if (host.options[i].value === val && !host.options[i].classList.contains(`.blank`)) {
            setAttribute(input, `value`, host.options[i].label)
            i = 0
        }
    }

    return input
}