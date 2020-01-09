import {
    observedAttributes, properties, hasTargets, hasTriggers$, hasTriggers, hasStart,
    canLoadTriggers, canStart, canEnd, canRunStart, canRunEnd
} from './properties.js'
import { toggle, open, close, unloadTriggers, loadTriggers } from './methods.js'
import elements from './elements.js'
import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'

const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `effect-fade`
const componentRoot = `.effect-fade-container`
export const EffectFade = WCConstructor({
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

WCDefine(componentName, EffectFade)