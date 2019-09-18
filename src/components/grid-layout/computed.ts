// const getAssignedElements = slot => {

//     if (!slot) { return [] }

//     if (typeof slot.assignedElements === `function`) {
//         return Array.from(slot.assignedElements())
//     }

//     // let nodes = [...(slot.childNodes.length ? slot.childNodes : [])]

//     // nodes = nodes.filter(
//     //     node => node.slot === '' || node.slot === null
//     // )

//     // return nodes

//     return []
// }

// export const slotItemElements = host => ({
//     get() {
//         return Array
//             .from(host.shadowRoot.querySelectorAll(`slot:not([name="content-drawer"])`))
//             .reduce(
//                 (target: [], current: any) => target.concat(getAssignedElements(current) as any),
//                 []
//             )
//     }
// })

const getFilteredKeywords = (element, filter) => {
    if (!element) { return [] }
    const keywordAttr = element.getAttribute(`keywords`)
    const keywordProp = element.keywords
    const keywords = !!keywordProp
        ? keywordProp
        : !!keywordAttr
            ? keywordAttr
            : ``

    const filterArray = arr => arr
        .map(v => v.trim().toLowerCase())
        .filter(v => !!v && v.indexOf(filter) > -1)

    if (keywords === ``) { return [] }

    if (Array.isArray(keywords)) { return filterArray(keywords) }

    if (typeof keywords.split !== `function`) { return [] }

    return filterArray(keywords.split(`,`))
}

export const itemElements = host => ({
    get() {
        return Array
            .from(host.children)
            .filter(
                (el: HTMLElement) =>
                    el.getAttribute(`slot`) !== `content-drawer`
            )
    }
})

export const itemsData = host => ({
    get() {

        if (!host.itemElements) { return [] }

        return host.itemElements
            .filter(element => {
                const returnTrue = () => {
                    element.classList.remove(`grid-layout-filtered-out`)
                    return true
                }

                if (!host.filter || host.filter === ``) { return returnTrue() }

                const filter = host.filter.toLowerCase()
                const keywords = getFilteredKeywords(element, filter)

                if (keywords.length === 0) {
                    element.classList.add(`grid-layout-filtered-out`)
                    return false
                }

                return returnTrue()
            })
            .map((element, index) => {

                if (!element) { return false }

                element.setAttribute(`gridindex`, `${index}`)
                element.gridindex = index

                return {
                    index,
                    element,
                    images: Array.from(element.querySelectorAll(`img`))
                }
            })
            .filter(v => !!v)
    }
})