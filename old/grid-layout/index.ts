/**
 * dropdown-select doesn't work on mobile
 * box-shadow property
 * mutation observer for elements
 */

import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import './style.scss'
import elements from './elements'
import { observedAttributes, properties } from './properties'
import { refresh, getComponentStyles } from './methods'
import { itemElements, itemsData } from './computed'
import { setHostEvents } from './events'

const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = `grid-layout`
const componentRoot = `.${componentName}-container`

const GridLayout = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    methods: { refresh, getComponentStyles },
    computed: { itemElements, itemsData },
    onConnected: host => {
        setHostEvents(host)

        host.slotObserver = new MutationObserver(mutationsList => {
            let refresh = false
            let i = 0

            while (!refresh && i < mutationsList.length) {
                if (mutationsList[i].type === `childList`) {
                    refresh = true
                    break
                }

                i = i++
            }

            if (refresh) {
                return host.refresh()
            }
        })

        host.slotObserver.observe(host, { childList: true })
    },
    onDisconnected: host => {
        host.slotObserver.disconnect()
    },
    appendStylesToHead: true,
    // appendStylesToParent: true
})

Define(componentName, GridLayout)

export default GridLayout