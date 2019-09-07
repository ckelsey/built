import { Constructor, Define } from '../../utils/webcomponent/constructor'
import { observedAttributes, properties, hasTargets, hasTriggers$, hasTriggers, hasStart, canLoadTriggers, canStart, canEnd, canRunStart, canRunEnd } from './properties'
import { toggle, open, close, unloadTriggers, loadTriggers } from './methods'
import elements from './elements'

import './style.scss'
const style = require('./style.scss').toString()

const template = require('./index.html')
const componentName = `effect-fade`
const componentRoot = `.effect-fade-container`
const EffectFade = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    methods: { toggle, open, close },
    computed: {
        hasTargets,
        hasTriggers,
        hasTriggers$,
        hasStart,
        canLoadTriggers,
        canStart,
        canEnd,
        canRunStart,
        canRunEnd,
    },
    onReady: host => {
        unloadTriggers(host)
        loadTriggers(host)
    },
    onDisconnected: unloadTriggers
})

Define(componentName, EffectFade)

export default EffectFade