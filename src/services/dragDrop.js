export function DragDropService(element) {
    let draggables = []
    const htmlElement = document.firstElementChild
    const filterElements = elements => elements.filter(el => el.parentNode)
    const handleDataTransfer = dataTransfer => element.dispatchEvent(new CustomEvent(`dropped`, { detail: dataTransfer }))

    const setUserSelect = (remove = false) => {
        if (!remove) {
            htmlElement.style.userSelect = `none`
        } else {
            htmlElement.style.removeProperty(`user-select`)
        }
    }

    const startDrag = e => {
        const target = e.target

        if (target && target.getAttribute(`draggable`) === `false`) { return }

        e.preventDefault()
        setUserSelect()
        element.dispatchEvent(new CustomEvent(`dragstarted`))
    }

    const drop = e => {
        e.preventDefault()
        element.classList.remove(`dragging`)
        element.classList.remove(`dragover`)
        setUserSelect(true)
        handleDataTransfer(e.dataTransfer || e.originalEvent.dataTransfer)
    }

    const dragover = e => {
        e.preventDefault()
        element.classList.add(`dragover`)
    }

    const dragleave = e => {
        e.preventDefault()
        element.classList.remove(`dragover`)
    }

    const dragend = e => {
        e.preventDefault()
        element.classList.remove(`dragging`)
        element.classList.remove(`dragover`)
        setUserSelect(true)
        element.dispatchEvent(new CustomEvent(`dragended`))
    }

    element.addEventListener(`dragstart`, startDrag)
    element.addEventListener(`dragover`, dragover)
    element.addEventListener(`drop`, drop)
    element.addEventListener(`dragleave`, dragleave)
    element.addEventListener(`dragend`, dragend)

    const methods = {
        get draggables() { return filterElements(draggables) },

        set draggables(elements) {
            draggables = []

            filterElements(Array.from(elements)).forEach(d => {
                draggables.push(d)
            })
        },

        get dropZone() { return element },

        destroy() {
            element.removeEventListener(`dragstart`, startDrag)
            element.removeEventListener(`dragover`, dragover)
            element.removeEventListener(`drop`, drop)
            element.removeEventListener(`dragleave`, dragleave)
            element.removeEventListener(`dragend`, dragleave)

            const isDragging = element.classList.contains(`dragging`)

            if (isDragging) {
                element.classList.remove(`dragging`)
                document.body.classList.remove(`dragging-elements`)
            }
        }
    }

    return methods
}