import { Try } from '../../utils/try.js'
import { ObserveExists } from '../../utils/observe-exists.js'
import { ObserverUnsubscribe } from '../../utils/observer-unsubscribe.js'
import { ValidateHtml } from '../../utils/validate-html.js'
import { CreateElement } from '../../utils/create-element.js'
import { inputIdString } from './set-input-id.js'
// import { ObserveEvent } from '../../utils/observe-event.js'

const unsubscribeLabel = input => ObserverUnsubscribe(input)

export function setLabel(host) {
    const { labelelement, inputID, labelposition, label } = host

    Try(() => host.removeChild(labelelement))

    const element = CreateElement({
        tagName: `label`,
        id: inputID,
        tabIndex: -1,
        for: inputIdString(host),
        class: `input-field-${labelposition}-label`,
        slot: `label-${labelposition}`,
        innerHTML: ValidateHtml(label, [], [`script`]).sanitized || ``
    })

    host.appendChild(element)
    host.labelelement = element

    ObserveExists(element).subscribe(
        () => { },
        () => unsubscribeLabel(element),
        () => unsubscribeLabel(element)
    )



    // host.labelelement.eventSubscriptions = {
    //     click: ObserveEvent(host.labelelement, `click`).subscribe(e => onLabelClick(e, host))
    // }
}