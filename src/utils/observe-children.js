import { Observer } from './observer.js'
import { ObserverReturnEmpty } from './observer-empty.js'
import { ArrayFrom } from './array-from.js'
import { ForEach } from './for-each.js'
import { Filter } from './filter.js'

function notEmptyText(child) { return !(child.nodeName === '#text' && !(/\S/gm.test(child.textContent))) }

export function ObserveChildren(element, ignoreEmptyText) {
    if (!element) { return ObserverReturnEmpty() }

    function removedNodes(nodes) {
        if (!nodes.length) { return }
        children$.removeElements(nodes)
        children$.trigger('removedNodes', nodes)
    }

    function addedNodes(nodes) {
        if (!nodes.length) { return }
        children$.insertAll(nodes)
        children$.trigger('addedNodes', nodes)
    }

    function childMutation(mutation) {
        if (ignoreEmptyText) {
            removedNodes(Filter(notEmptyText, mutation.removedNodes))
            addedNodes(Filter(notEmptyText, mutation.addedNodes))
            return
        }

        removedNodes(ArrayFrom(mutation.removedNodes))
        addedNodes(ArrayFrom(mutation.addedNodes))
    }

    function childMutations(mutations) {
        return ForEach(childMutation, mutations)
    }

    const childObserver = new MutationObserver(childMutations)
    const children$ = Observer([])

    childMutation({ addedNodes: element.childNodes })

    childObserver.observe(element, { childList: true })

    children$.subscribe(
        function () { },
        function () { },
        function () { childObserver.disconnect() }
    )

    return children$
}