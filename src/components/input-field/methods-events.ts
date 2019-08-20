import { getValue } from '../../utils/html'
import { isMobile } from '../../utils/platform'
import { setSelectSelected } from './methods-select'
import { typesWithOverlay } from './definitions'
import Get from '../../utils/get'

export const dispatch = host => (type, data) => host.dispatchEvent(
    new CustomEvent(type, { detail: data || host.state })
)

export const onInput = host => () => {
    const value = getValue(host.elements.input)

    if (host.type === `select` && !isMobile) {
        return host.filterSelect(value)
    }

    host.value = value
    host.dispatch(`input`, host.value)
}

export const onFocus = host => () => {
    if (host.focused) { return }

    host.focused = true

    if (host.type === `select` && !isMobile) {
        host.elements.input.value = ``
        host.filterSelect(``)
        setSelectSelected(host.optionElements, host.processedValue.sanitized)
    }
    if (typesWithOverlay.indexOf(host.type) !== -1) { host.elements.options.show() }

    host.dispatch(`focus`)
}

export const onBlur = host => () => {
    if (!host.focused) { return }

    if (host.type === `select` && !isMobile) {
        const selected = host.selected

        if (selected.element) {
            if (selected.element.classList.contains(`blank`)) {
                host.elements.input.value = ``
            } else {
                host.elements.input.value = selected.label || ``
            }

            selected.element.dispatchEvent(new Event(`mousedown`))
            selected.element.click()
        } else {
            host.elements.input.value = selected.label || ``
        }
    }

    if (host.type === `rotary` && host.elements.rotary) {
        host.elements.input.value = host.elements.rotary.value
    }

    host.focused = false
    host.elements.options.hide()
    host.dispatch(`blur`)
    host.elements.input.blur()
    host.processValue()
}

export const onKeyDown = host => e => {
    if (!e) { return }

    const key = Get(e, `key`, ``).toLowerCase()

    if (host.type === `select` && [`arrowup`, `arrowdown`].indexOf(key) > -1) {
        e.preventDefault()
        const $options = host.optionElements.filter(o => !o.classList.contains(`filtered-out`))
        let $previous
        let $next
        let $newSelected

        for (let i = 0; i < $options.length; i++) {
            const $option = $options[i] as any
            const isSelected = $option.classList.contains(`selected`)
            $option.classList.remove(`selected`)

            if (isSelected) {
                $previous = $options[i - 1] ? $options[i - 1] : $options[i]
                $next = $options[i + 1] ? $options[i + 1] : $options[i]
                break
            }
        }

        if (!$previous && !$next) { $previous = $next = $options[0] }

        if (key.toLowerCase() === `arrowup`) {
            $newSelected = $previous
        } else if (key.toLowerCase() === `arrowdown`) {
            $newSelected = $next
        }

        if ($newSelected && !$newSelected.classList.contains(`selected`)) {
            $newSelected.classList.add(`selected`)
            const optionBox = $newSelected.getBoundingClientRect()
            const containerPosition = host.elements.options.position
            const optionTop = optionBox.top - containerPosition.top
            const optionBottom = optionBox.height + optionTop

            if (optionBottom > containerPosition.height) {
                host.elements.options.scrollContent(0, containerPosition.scrollTop + (optionBottom - containerPosition.height))
            }

            if (optionTop < 0) {
                host.elements.options.scrollContent(0, containerPosition.scrollTop + optionTop)
            }
        }
    }

    if (e.key && e.key.toLowerCase() === `enter` && host.type !== `textarea`) {
        if (host.type === `select` && !isMobile) {
            host.elements.input.value = host.selected.label || ``

            return requestAnimationFrame(() => host.elements.input.blur())
        }
        return host.onDone()
    }
}

export const onLabelClick = host => e => {
    const input = host.elements.input
    if (!input) { return }

    host.dispatch(`labelClick`)

    if ([`checkbox`, `radio`].indexOf(host.type) > -1) {
        const bounceZ = host.elements.bounceZ
        const ripple = host.elements.ripple
        if (bounceZ) { bounceZ.trigger() }
        if (ripple) { ripple.trigger(e) }
    } else {
        input.focus()
    }
}

export const onDone = host => () => {
    const input = host.elements.input

    if (!input) { return }

    input.blur()

    host.dispatch(`done`, {
        processedValue: host.processedValue,
        value: host.value,
        valid: !host.invalid,
        errortext: host.errortext
    })
}

export const onInvalid = host => () => {
    if (!host.elements.input) { return }

    host.dispatch(`invalid`, {
        processedValue: host.processedValue,
        value: host.value,
        errortext: host.errortext
    })
}