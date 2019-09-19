/**
 * dropdown-select doesn't work on mobile
 * box-shadow property
 * mutation observer for elements
 */

import { Define, Constructor } from '../../utils/webcomponent/constructor'
import './style.scss'
import elements from './elements'
import { observedAttributes, properties } from './properties'
import { refresh } from './methods'
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
    methods: { refresh },
    computed: { itemElements, itemsData },
    onConnected: host => setHostEvents(host),
    appendStylesToHead: true
})

Define(componentName, GridLayout)

export default GridLayout