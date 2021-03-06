import { Get } from './../../utils/get.js'

function findParentLink(parent) {
    let link

    try {
        while (!link && parent && parent !== document.body) {
            if (Get(parent, 'tagName').toLowerCase() === 'a') {
                link = parent
            }

            parent = parent.parentNode
        }
    } catch (error) { }

    return link
}

function clickListener(methods) {
    document.documentElement.addEventListener('click', function clickHandler(e) {
        const target = e.target
        const tag = target.tagName.toLowerCase()
        let link

        if (tag === 'a') { link = target }

        if (!link && Array.isArray(e.path)) {
            let pathIndex = 0

            while (!link && pathIndex < e.path.length) {

                if (Get(e, ''.concat('path.', pathIndex, '.tagName'), '').toLowerCase() === 'a' && !!Get(e, ''.concat('path.', pathIndex, '.href'))) {
                    link = Get(e, ''.concat('path.', pathIndex))
                }

                pathIndex = pathIndex + 1
            }
        }

        // Safari
        if (!link && e.composedPath && typeof e.composedPath === 'function') {
            const ePath = e.composedPath()
            let pathIndex = 0

            while (!link && pathIndex < ePath.length) {
                if (Get(ePath, ''.concat(pathIndex, '.tagName'), '').toLowerCase() === 'a' && !!Get(ePath, ''.concat(pathIndex, '.href'))) {
                    link = ePath[pathIndex]
                }

                pathIndex = pathIndex + 1
            }
        }

        // FF and IE
        if (!link && e.originalTarget) {
            link = findParentLink(e.originalTarget)
        }

        if (!link && e.explicitOriginalTarget) {
            link = findParentLink(e.explicitOriginalTarget)
        }

        if (!link) {
            link = findParentLink(e.parentNode)
        }

        if (!link || link.getAttribute('target') === '_blank') { return }

        try {
            const url = new URL(link.href)
            if (url.host !== location.host) { return }
            if (methods.route(url)) { e.preventDefault() }
        } catch (error) { }
    }, true)
}

export default clickListener