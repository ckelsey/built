import { WhenAvailable } from '../../utils/when-available.js'
import { SetAttribute } from '../../utils/set-attribute.js'
import { CreateElement } from '../../utils/create-element.js'
import { Get } from '../../utils/get.js'
import { InputFieldInputAttributes } from './definitions.js'
import { setInputID } from './set-input-id.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { onFocus } from './on-focus.js'
import { onBlur } from './on-blur.js'
import { onKeyDown } from './on-keydown.js'
import { onInput } from './on-input.js'
import { ValidateHtml } from '../../utils/validate-html.js'

export function inputAttributeList(host) {
    return ['radio', 'checkbox'].indexOf(host.inputType) > -1
        ? InputFieldInputAttributes.bool :
        host.type === 'file' ?
            InputFieldInputAttributes.file
            : InputFieldInputAttributes.field
}
const asIsTypes = [
    'checkbox',
    'checkbox',
    'date',
    'email',
    'file',
    'number',
    'password',
    'radio',
    'tel',
    'url'
]

function tagType(type) {
    return type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input'
}

function setInputValue(host) {
    return SetAttribute(host.input, 'value', host.processedValue.original)
}

export function setInput(host) {
    if (host.setInputTimer) {
        host.setInputTimer.cancel()
    }

    if (host.input) { host.input.parentNode.removeChild(host.input) }

    WhenAvailable(host, 'elements.container')
        .then(function (container) {
            return SetAttribute(container, 'input-kind', host.type)
        })

    const slotSelector = '[inputholder]'
    const tagName = tagType(host.type)
    const type = tagName === 'input' ? asIsTypes.indexOf(host.type) > -1 ? host.type : 'text' : undefined
    const elData = {
        tagName: tagName,
        class: 'input-field-input',
    }

    if (type) { elData.type = type }

    const input = CreateElement(elData)

    host.querySelector(slotSelector).appendChild(input)
    host.input = input

    inputAttributeList(host).forEach(function (attr) {
        return attr === 'value' ? setInputValue(host) : SetAttribute(input, attr, host[attr])
    })

    input.name = Get(host, 'name', Get(host, 'label', Get(host, 'placeholder', '')))

    setInputID(host)

    if (host.type === 'select' && Array.isArray(host.options)) {
        if (host.emptyoption !== 'false') {
            input.appendChild(
                CreateElement({
                    tagName: 'option',
                    value: Get(host, 'emptyoption.value', ''),
                    innerHTML: ValidateHtml(Get(host, 'emptyoption.label', Get(host, 'emptyoption', '')), [], ['script']).sanitized
                })
            )
        }

        if (Array.isArray(host.options)) {
            host.options.forEach(function (o) {
                return input.appendChild(
                    CreateElement({
                        tagName: 'option',
                        value: o.value,
                        innerHTML: ValidateHtml(o.label, [], ['script']).sanitized
                    })
                )
            })

        }
    }

    input.eventSubscriptions = {
        onFocus: ObserveEvent(input, 'focus').subscribe(function () {
            onFocus(host)
        }),
        onBlur: ObserveEvent(input, 'blur').subscribe(function () {
            onBlur(host)
        }),
        onKeyDown: ObserveEvent(input, 'keydown').subscribe(function (e) {
            onKeyDown(e, host)
        }),
    }

    if (['select', 'checkbox', 'radio'].indexOf(host.type) > -1) {
        input.eventSubscriptions.onChange = ObserveEvent(input, 'change', { preventDefault: true }).subscribe(function () {
            onInput(host)
        })
    } else {
        input.eventSubscriptions.input = ObserveEvent(input, 'input', { preventDefault: true }).subscribe(function () {
            onInput(host)
        })
    }

}