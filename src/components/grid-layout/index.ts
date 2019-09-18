/**
 * hide before ready(refresh a bunch of times) - opacity doesn't seem to work?
 * box-shadow
 * mutation observer for elements
 * when adding items synchronously, shouldn't need to explicitly call refresh()
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
    onReady: host => host.setAttribute(`ready`, `true`),
    appendStylesToHead: true
})

Define(componentName, GridLayout)

export default GridLayout