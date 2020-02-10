import { DispatchEvent } from '../utils/dispatch-event'

export function DragDropService(element) {
    let draggables = []
    const htmlElement = document.firstElementChild

    function filterElements(elements) {
        return elements.filter(function (el) { return !!el.parentNode })
    }

    function handleDataTransfer(dataTransfer) {
        return DispatchEvent(element, 'dropped', dataTransfer)
    }

    function setUserSelect(remove) {
        if (!remove) {
            htmlElement.style.userSelect = 'none'
        } else {
            htmlElement.style.removeProperty('user-select')
        }
    }

    function startDrag(e) {
        const target = e.target

        if (target && target.getAttribute('draggable') === 'false') { return }

        e.preventDefault()
        setUserSelect()
        DispatchEvent(element, 'dragstarted')
    }

    function drop(e) {
        e.preventDefault()
        element.classList.remove('dragging')
        element.classList.remove('dragover')
        setUserSelect(true)
        handleDataTransfer(e.dataTransfer || e.originalEvent.dataTransfer)
    }

    function dragover(e) {
        e.preventDefault()
        element.classList.add('dragover')
    }

    function dragleave(e) {
        e.preventDefault()
        element.classList.remove('dragover')
    }

    function dragend(e) {
        e.preventDefault()
        element.classList.remove('dragging')
        element.classList.remove('dragover')
        setUserSelect(true)
        DispatchEvent(element, 'dragended')
    }

    element.addEventListener('dragstart', startDrag)
    element.addEventListener('dragover', dragover)
    element.addEventListener('drop', drop)
    element.addEventListener('dragleave', dragleave)
    element.addEventListener('dragend', dragend)

    const methods = {
        destroy: function () {
            element.removeEventListener('dragstart', startDrag)
            element.removeEventListener('dragover', dragover)
            element.removeEventListener('drop', drop)
            element.removeEventListener('dragleave', dragleave)
            element.removeEventListener('dragend', dragleave)

            const isDragging = element.classList.contains('dragging')

            if (isDragging) {
                element.classList.remove('dragging')
                document.body.classList.remove('dragging-elements')
            }
        }
    }

    Object.defineProperties(methods, {
        draggables: {
            get: function () {
                return filterElements(draggables)
            },
            set: function (elements) {
                draggables = []

                filterElements(Array.from(elements)).forEach(function (d) {
                    draggables.push(d)
                })
            }
        },
        dropZone: {
            get: function () {
                return element
            }
        }
    })

    return methods
}