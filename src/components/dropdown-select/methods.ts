import { findIn } from '../../utils/html/query'
import { setInput, setLabel } from './elements'
import replaceElementContents from '../../utils/html/replace-element-contents'
import ValidateHtml from '../../utils/validate/html'
import ObserveEvent from '../../utils/observeEvent'

export const dispatch = (host, type) => host.dispatchEvent(new CustomEvent(type, { detail: host }))

export const initInput = host => {
    setSelectOptions(host)
    setInput(host)
    setLabel(host)
}

const setOptions = (input, options, emptySelect, optionTag = `option`) => {
    if (!input || !options) { return }

    const optionElements = []

    const createOption = option => {
        const optionElement = document.createElement(optionTag)
        optionElement.className = `select-option${!!option.class ? ` ${option.class}` : ``}`
        optionElement[`value`] = option.value
        optionElement.innerHTML = ValidateHtml(option.label, [], [`script`]).sanitized || ``
        optionElements.push(optionElement)
    }

    if (emptySelect !== false) {
        createOption({
            value: ``,
            label: emptySelect,
            class: 'blank'
        })
    }

    options.forEach(option => createOption(option))

    replaceElementContents(input, optionElements)

    if (optionTag !== `option`) {
        optionElements.forEach(optionElement => {
            const link = !!optionElement.href ? optionElement : optionElement.querySelector(`a`)

            optionElement.eventSubscriptions = {
                mousedown: ObserveEvent(optionElement, `mousedown`).subscribe(() => {
                    optionElements.forEach(o => o.classList.remove(`selected`))
                    optionElement.classList.add(`selected`)
                    input.value = optionElement.value
                    input.dispatchEvent(new Event(`input`))
                    optionElement.dispatchEvent(new Event(`click`))

                    if (link) { link.click() }
                })
            }
        })
    }

    return {
        input,
        options,
        optionElements
    }
}

export const scrollToSelectedOption = (overlay, option) => {
    if (!overlay || !option) { return }

    const optionBox = option.getBoundingClientRect()
    const containerPosition = overlay.position
    const optionTop = optionBox.top - containerPosition.top
    const optionBottom = optionBox.height + optionTop

    if (optionBottom > containerPosition.height) {
        overlay.scrollContent(0, containerPosition.scrollTop + (optionBottom - containerPosition.height))
    }

    if (optionTop < 0) {
        overlay.scrollContent(0, containerPosition.scrollTop + optionTop)
    }
}

export const setSelectedOption = (host, option) => {
    option.classList.add(`selected`)
    scrollToSelectedOption(host.elements.overlay, option)
}

export const setUnselectedOption = (option) => {
    option.classList.remove(`selected`)
}

export const toggleOptions = (host, show) => {
    const overlay = host.elements.overlay
    const root = host.elements.root

    if (!root || !overlay) { return }
    if (show && overlay.showing) { return }

    const options = Array.from(findIn(overlay, `.select-option`, true))
    let selectedOption

    options.forEach((option: any) => {
        option.classList.remove(`filtered-out`)

        if (host.value === option.value) {
            selectedOption = option
            setSelectedOption(host, option)
        } else {
            setUnselectedOption(option)
        }
    })

    root.classList[show ? `add` : `remove`](`hidden-label`)

    overlay[show ? `show` : `hide`]()
        .then(() => {
            scrollToSelectedOption(overlay, selectedOption)
        })

    if (!show) {
        root.classList.remove(`opened`)
        host.elements.filter.blur()
    } else {
        root.classList.add(`opened`)
        host.elements.filter.focus()
    }

    host.dispatchEvent(new CustomEvent(show ? `selectopen` : `selectclose`, { detail: host }))
}

export const filter = (host, value) => {
    const filterValue = (value || ``).toLowerCase()
    const options = Array.from(findIn(host.elements.overlay, `.select-option`, true))
    const emptyFilter = filterValue === ``

    options.forEach((o: any) => {
        const label = o.textContent.toLowerCase()

        if (!emptyFilter) {
            if (label === filterValue || label.indexOf(filterValue) > -1) {
                o.classList.remove('filtered-out')
            } else {
                o.classList.add('filtered-out')
            }

        } else {
            o.classList.remove('filtered-out')
        }
    })
}

export const setSelectOptions = host => {
    if (!host.ready) { return }

    const overlay = host.elements.overlay
    const options = host.options.map(o => {
        return {
            value: host.formatvalue(o),
            label: host.formatlabel(o)
        }
    })

    setOptions(
        host.elements.input,
        options,
        host.emptyoption
    )

    setOptions(
        overlay,
        options,
        host.emptyoption,
        `div`
    )
}

export const focus = host => () => host.native ? host.elements.input.focus() : host.elements.filter.focus()
export const blur = host => () => host.native ? host.elements.input.blur() : host.elements.filter.blur()