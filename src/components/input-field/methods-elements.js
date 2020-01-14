import { InputFieldInputAttributes } from './definitions'
import { ValidateHtml, CreateElement, SetAttribute, AddRemoveAttribute, OnNextFrame, ObserveEvent } from '../..'
import { setDroppable, onInput, dispatch, onFocus, onBlur, onKeyDown, onLabelClick } from './methods-events'
import { setStyles } from './elements'
import { ObserverUnsubscribe } from '../../utils/observer-unsubscribe'

const inputStyle = require(`./input-style.scss`)
const asIsTypes = [
    `checkbox`,
    `checkbox`,
    `date`,
    `email`,
    `file`,
    `number`,
    `password`,
    `radio`,
    `tel`,
    `url`
]

export const setDefaultLabelPosition = host => [`checkbox`, `radio`].indexOf(host.type) === -1 ? `inside` : `left`

const tagType = type => type === `textarea` ? `textarea` : `input`
const getInputType = (tag, type) => tag === `input` ? asIsTypes.indexOf(type) > -1 ? type : `text` : false
const inputId = host => `${host.inputID}-input_${host.id || ``}`

export const setInputValue = (input, host) => {
    SetAttribute(input, `value`, host.processedValue.original)
    return input
}

export const setInput = host => {
    OnNextFrame(() => {
        if (!host.inputStyle) {
            host.inputStyle = CreateElement({ tagName: `style`, class: `input-style`, style: `display:none;` })
            host.appendChild(host.inputStyle)
        }

        setStyles(host.inputStyle, inputStyle)

        try {
            ObserverUnsubscribe(host.input)
            host.input.dispose()
            host.removeChild(host.input)

            host.elements.filePathInput.style.display = host.type !== `file` ? `none` : `block`
        } catch (error) { }

        SetAttribute(host.elements.container, `input-kind`, host.type)

        const tagName = tagType(host.type)
        const input = CreateElement({
            tagName,
            type: getInputType(tagName, host.type),
            class: `input-field-input`,
            slot: `input`
        })

        host.appendChild(input)
        host.input = input

        inputAttributeList(host).forEach(attr => attr === `value` ?
            setInputValue(input, host) :
            AddRemoveAttribute(input, attr, host[attr])
        )

        input.eventSubscriptions = {
            onFocus: ObserveEvent(input, `focus`).subscribe(() => onFocus(host)),
            onBlur: ObserveEvent(input, `blur`).subscribe(() => onBlur(host)),
            onKeyDown: ObserveEvent(input, `keydown`).subscribe(e => onKeyDown(e, host))
        }

        if ([`checkbox`, `radio`].indexOf(host.type) > -1) {
            input.eventSubscriptions.inputContainerClick = ObserveEvent(host.elements.inputContainer, `click`, { stopPropagation: true, preventDefault: true }).subscribe(() => {
                host.value = !host.value
                dispatch(host, `input`, host.value)
                dispatch(host, `inputchange`, host.value)
            })

        } else if (host.type === `intlphone`) {
            input.eventSubscriptions.onInput = ObserveEvent(input, `inputchange`).subscribe((e) => host.value = e.detail)
        } else {
            input.eventSubscriptions.onInput = ObserveEvent(input, `input`).subscribe(() => onInput(host))
        }

        setInputID(host, host.inputID)
        setDroppable(host)
    })
}

export const setInputID = (host, value) => {
    OnNextFrame(() => {
        SetAttribute(host.labelelement, [`id`, `for`], [value, inputId(host)])
        setInputAttribute(host, [`id`, `aria-labelledby`], [inputId(host), value])
    })
}

export const inputAttributeList = host => [`radio`, `checkbox`].indexOf(host.inputType) > -1
    ? InputFieldInputAttributes.bool
    : InputFieldInputAttributes.all

export const setInputAttribute = (host, name, value) => {
    OnNextFrame(() => {
        const input = host.input
        const attrs = inputAttributeList(host)
        const updateAttr = (n, v) => attrs.indexOf(n) === -1
            ? undefined
            : name === `value`
                ? setInputValue(input, host)
                : AddRemoveAttribute(input, n, v)

        if (Array.isArray(name)) {
            name.forEach((n, i) => updateAttr(n, value[i]))
        } else {
            updateAttr(name, value)
        }
    })
}

export const setLabel = (value, labelposition, host) => {
    try {
        ObserverUnsubscribe(host.labelelement)
        host.removeChild(host.labelelement)
    } catch (error) { }

    const label = CreateElement({
        tagName: `label`,
        id: host.inputID,
        tabIndex: -1,
        for: inputId(host),
        class: `input-field-${labelposition}-label`,
        slot: `label-${labelposition}`,
        innerHTML: ValidateHtml(value, [], [`script`]).sanitized || ``
    })

    host.appendChild(label)
    host.labelelement = label
    host.labelelement.eventSubscriptions = { click: ObserveEvent(host.labelelement, `click`).subscribe(e => onLabelClick(e, host)) }
}


export const textareaHeight = (resize, input) => {
    OnNextFrame(() => {
        if (input.tagName.toLowerCase() !== `textarea` || resize !== `auto`) { return }

        input.style.overflow = `hidden`
        input.style.height = `inherit`
        input.style.height = `${input.scrollHeight}px`
    })
}