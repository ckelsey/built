import { ObserveEvent, UseIf, DragDropService } from '../..'

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
        host.processValue()
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