import { processValue, getFileValue } from './methods-value'
import { ObserveEvent, GetInputValue, UseIf, DragDropService, Get } from '../..'

export const dispatch = (host, type, data) =>
    host.dispatchEvent(
        new CustomEvent(type, { detail: data ? data : data === false ? false : host.state })
    )

export const onInput = host => {
    const input = host.input
    let value = GetInputValue(input)

    if (host.type === `file`) {
        value = UseIf(v => v.length, () => ``, getFileValue(input)).value
    }

    host.value = value
    dispatch(host, `inputchange`, host.value)
}

export const onFocus = host => {
    if (host.focused) { return }

    host.focused = true
    host.setAttribute(`focused`, `true`)
    processValue(host)
    dispatch(host, `focus`, host)
}

export const onBlur = host => {
    if (!host.focused) { return }

    host.focused = false
    host.setAttribute(`focused`, `false`)

    dispatch(host, `blur`, host)
    host.input.blur()
    processValue(host)
}

export const onKeyDown = (e, host) => {
    if (!e) { return }

    if (e.key && e.key.toLowerCase() === `enter` && host.type !== `textarea`) {
        return onDone(host)
    }
}

export const onLabelClick = (e, host) => {
    const input = host.input
    if (!input) { return }

    dispatch(host, `labelClick`, host)

    if ([`checkbox`, `radio`].indexOf(host.type) === -1) {
        const bounceZ = host.elements.bounceZ
        const ripple = host.elements.ripple

        if (bounceZ) { bounceZ.trigger() }

        if (ripple) { ripple.trigger(e) }

    } else {
        input.focus()
    }
}

export const onDone = host => {
    const input = host.input

    if (!input) { return }

    input.blur()

    const valid = host.valid
    const error = host.validationMessage.join(`, `)

    if (!valid && error) {
        return host.setError(error)
    }

    dispatch(host, `done`, {
        processedValue: host.processedValue,
        value: host.value,
        valid,
        error
    })

    const form = Get(host, `internals_.form`)

    if (form) {
        form.dispatchEvent(new Event(`submit`))
        // const domEvent = document.createEvent(`Event`)
        // domEvent.initEvent(`submit`, false, true)
        // form.dispatchEvent(domEvent)

        // const event = new InputEvent(``)

        //     , {
        //     view: window,
        //     bubbles: true,
        //     cancelable: true
        // });
        // var cb = document.getElementById('checkbox');
        // var cancelled = !cb.dispatchEvent(event);
        // if (cancelled) {
        //     // A handler called preventDefault.
        //     alert("cancelled");
        // } else {
        //     // None of the handlers called preventDefault.
        //     alert("not cancelled");
        // }
    }
}

export const onInvalid = host => dispatch(host, `invalid`, {
    processedValue: host.processedValue,
    value: host.value,
    error: host.validationMessage.join(`, `)
})

export const setDroppable = host => {
    const input = host.input
    const container = host.elements.container

    function drop(e) {
        host.value = UseIf(
            v => v.length > 0,
            () => ``,
            !host.accept
                ? Array.from(e.detail.files)
                : Array.from(e.detail.files)
                    .filter(file =>
                        host.accept.indexOf(file.type) > -1
                    )

        ).value
        processValue(host)
        dispatch(host, `input`, host.value)
    }

    if (!input || !container) { return }
    if (container.dragDrop && typeof container.dragDrop.destroy === `function`) { container.dragDrop.destroy() }
    if (container.drop$ && typeof container.drop$ === `function`) { container.drop$() }
    if (container.dragended$ && typeof container.dragended$ === `function`) { container.dragended$() }
    if (container.dragstarted$ && typeof container.dragstarted$ === `function`) { container.dragstarted$() }
    if (!host.droppable) { return }


    container.dragDrop = DragDropService(container)
    container.drop$ = ObserveEvent(container, `dropped`).subscribe(drop)
    container.dragended$ = ObserveEvent(container, `dragended`).subscribe(() => document.body.classList.remove(`dragging-elements`))
    container.dragstarted$ = ObserveEvent(container, `dragstarted`).subscribe(() => document.body.classList.add(`dragging-elements`))
}