import ObserveEvent from '../../utils/observeEvent'
import { filter, toggleOptions, setUnselectedOption, setSelectedOption } from './methods'
import { findIn } from '../../utils/html/query'
import Get from '../../utils/get'
import ValidateHtml from '../../utils/validate/html'
import replaceElementContents from '../../utils/html/replace-element-contents'
import SetStyleRules from '../../utils/html/set-style-rules'

export const elements = {
    root: {
        selector: `.dropdown-select-container`,
        onChange: (el, host) => {
            el.eventSubscriptions = {
                blur: ObserveEvent(el, `blur`).subscribe(() => requestAnimationFrame(host.elements.overlay.hide))
            }
        }
    },
    input: { selector: `select.dropdown-select-input`, },
    filter: {
        selector: `input.dropdown-select-filter`,
        onChange: (el, host) => {
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
                    requestAnimationFrame(overlay.hide)
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
        }
    },
    overlay: {
        selector: `overlay-content`,
        onChange: (el, host) => {
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
        }
    },
    label: {
        selector: `.dropdown-select-label`,
        onChange: (el, host) => {
            el.eventSubscriptions = el.eventSubscriptions ? el.eventSubscriptions : {}
            el.eventSubscriptions.click = ObserveEvent(el, `click`).subscribe(() => toggleOptions(host, true))
        }
    },
    arrow: {
        selector: `.dropdown-select-arrow`,
        onChange: (el, host) => {
            el.eventSubscriptions = {
                click: ObserveEvent(el, `click`).subscribe(() => toggleOptions(host, true))
            }
        }
    },
    injectedStyles: {
        selector: `style.injectedStyles`,
        onChange: (_el, host) => setStyles(host)
    }
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

export default elements