import { Try } from '../../utils/try.js'
import { ObserveExists } from '../../utils/observe-exists.js'
import { ObserverUnsubscribe } from '../../utils/observer-unsubscribe.js'
import { ValidateHtml } from '../../utils/validate-html.js'
import { CreateElement } from '../../utils/create-element.js'
import { inputIdString } from './set-input-id.js'
import { ObserveEvent } from '../../utils/observe-event.js'
import { onLabelClick } from './on-label-click.js'

function unsubscribeLabel(input) {
    return ObserverUnsubscribe(input)
}

export function setLabel(host) {
    const labelelement = host.labelelement
    const inputID = host.inputID
    const labelposition = host.labelposition
    const slotSelector = '[label-' + labelposition + ']'
    const label = host.label

    Try(function () { host.removeChild(labelelement) })

    const element = CreateElement({
        tagName: 'label',
        id: inputID,
        tabIndex: -1,
        for: inputIdString(host),
        class: ''.concat('input-field-', labelposition, '-label'),
        innerHTML: ValidateHtml(label, [], ['script']).sanitized || ''
    })

    host.querySelector(slotSelector).appendChild(element)
    host.labelelement = element

    element.eventSubscriptions = {
        onLabelClick: ObserveEvent(element, 'click').subscribe(function (e) {
            onLabelClick(e, host)
        })
    }

    ObserveExists(element).subscribe(
        function () { },
        function () { return unsubscribeLabel(element) },
        function () { return unsubscribeLabel(element) }
    )
}