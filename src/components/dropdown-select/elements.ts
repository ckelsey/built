import ObserveEvent from '../../utils/observeEvent'
import { filter, toggleOptions, setUnselectedOption, setSelectedOption } from './methods'
import { findIn } from '../../utils/html/query'
import Get from '../../utils/get'
import ValidateHtml from '../../utils/validate/html'
import { replaceElementContents } from '../../utils/html/markup'
import SetStyleRules from '../../utils/html/set-style-rules'

export const elementSelectors = {
    root: `.dropdown-select-container`,
    input: `select.dropdown-select-input`,
    filter: `input.dropdown-select-filter`,
    overlay: `overlay-content`,
    label: `.dropdown-select-label`,
    arrow: `.dropdown-select-arrow`,
    injectedStyles: `style.injectedStyles`
}

export const setInput = host => {
    const filter = host.elements.filter
    const overlay = host.elements.overlay

    if (filter && overlay) {
        overlay.target = host.elements.root
    }
}

export const setLabel = host => {
    if (!!host.statictext) {
        return replaceElementContents(host.elements.label, ValidateHtml(host.statictext, [], [`script`]).sanitized || ``)
    }

    const formatFunction = host.formatvaluelabel && typeof host.formatvaluelabel === `function`
        ? host.formatvaluelabel
        : o => o.label

    const emptyOption = host.emptyoption
        ? host.emptyoption
        : ``

    const option = !host.options
        ? { value: ``, label: emptyOption }
        : host.options[host.selectedIndex]

    const label = option
        ? formatFunction(option)
        : host.showempty
            ? emptyOption
            : ``

    replaceElementContents(host.elements.label, ValidateHtml(label, [], [`script`]).sanitized || ``)
}

export const setStyles = host => {
    const el = host.elements.injectedStyles

    if (!el) { return }

    const labelSize = `.dropdown-select-container .dropdown-select-label{font-size:${host.labelsize};}`
    const optionColors = `.dropdown-select-container overlay-content .select-option{font-size:${host.optionsize};color:${host.optioncolor};background-color:${host.optionbackground};}`
    const optionSelectedColors = `.dropdown-select-container overlay-content .select-option.selected,.dropdown-select-container overlay-content .select-option:hover{color:${host.optionselectedcolor};background-color:${host.optionselectedbackground};}`
    const styles = `${host.styles}${optionColors}${optionSelectedColors}${labelSize}`

    SetStyleRules(el, styles)
}

const elements = {}

const methods = {
    filter: (el, host) => {
        el.eventSubscriptions = {
            focus: ObserveEvent(el, `focus`).subscribe(() => {
                if (host.native) { return }
                el.value = ``
                toggleOptions(host, true)
            }),
            blur: ObserveEvent(el, `blur`).subscribe(() => {
                if (host.native) { return }
                const overlay = host.elements.overlay
                const selectedOption = findIn(overlay, `.select-option.selected`)
                host.value = selectedOption ? selectedOption.value : ``
                setLabel(host)
                overlay.hide()
            }),
            keydown: ObserveEvent(el, `keydown`).subscribe(e => {
                if (host.native) { return }

                const overlay = host.elements.overlay
                const key = Get(e, `key`, ``).toLowerCase()

                const newSelection = option => {
                    setSelectedOption(host, option)
                }

                if ([`arrowup`, `arrowdown`].indexOf(key) > -1) {
                    e.preventDefault()
                    const $options = findIn(overlay, `.select-option:not(.filtered-out)`, true)
                    let $previous
                    let $next
                    let $newSelected

                    for (let i = 0; i < $options.length; i++) {
                        const $option = $options[i] as any
                        const isSelected = $option.classList.contains(`selected`)

                        setUnselectedOption($option)

                        if (isSelected) {
                            $previous = $options[i - 1] ? $options[i - 1] : $options[i]
                            $next = $options[i + 1] ? $options[i + 1] : $options[i]
                            break
                        }
                    }

                    if (!$previous && !$next) { $previous = $next = $options[0] }

                    if (key === `arrowup`) {
                        $newSelected = $previous
                    } else if (key === `arrowdown`) {
                        $newSelected = $next
                    }

                    if ($newSelected && !$newSelected.classList.contains(`selected`)) {
                        newSelection($newSelected)
                    }
                }

                if (key === `enter`) {
                    const visibleOptions = findIn(overlay, `.select-option:not(.filtered-out)`, true)

                    if (visibleOptions.length === 1) { newSelection(visibleOptions[0]) }

                    el.blur()
                }

                if (key === `escape`) {

                    Array.from(findIn(overlay, `.select-option.selected`, true)).forEach((o: any) => o.classList.remove(`selected`))

                    const selected = host.selectedOptionElement

                    if (selected) {
                        selected.classList.add(`selected`)
                    }

                    el.blur()
                }
            }),

            input: ObserveEvent(el, `input`).subscribe(() => { host.native ? undefined : filter(host, el.value) })
        }
    },
    overlay: (el, host) => {
        const filter = host.elements.filter

        if (filter) {
            el.target = host.elements.filter
        }

        const loop = () => {
            if (!el || !el.parentNode) { return }

            if (el.state && el.state.showing) {
                return el.state.showing.subscribe(e => {
                    toggleOptions(host, e)
                })
            }

            requestAnimationFrame(loop)
        }

        loop()
    },

    root: (el, host) => {
        el.eventSubscriptions = {
            blur: ObserveEvent(el, `blur`).subscribe(() => {
                host.elements.overlay.hide()
            })
        }
    },
    arrow: (el, host) => {
        el.eventSubscriptions = {
            click: ObserveEvent(el, `click`).subscribe(() => toggleOptions(host, true))
        }
    },
    injectedStyles: (_el, host) => setStyles(host),

    label: (el, host) => {
        el.eventSubscriptions = el.eventSubscriptions ? el.eventSubscriptions : {}
        el.eventSubscriptions.click = ObserveEvent(el, `click`).subscribe(() => toggleOptions(host, true))
    }
}

Object.keys(elementSelectors).forEach(key => {
    elements[key] = {
        selector: elementSelectors[key],
        onChange: methods[key] ? methods[key] : () => { }
    }
})

export default elements