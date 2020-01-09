import {
    observedAttributes, properties, hasTargets, hasTargets$, hasStart, canLoadTargets,
    canStart, canEnd, canRunStart, canRunEnd, nonAutoOrigin
} from './properties.js'
import { toggle, unloadTargets, open, close } from './methods.js'
import elements from './elements.js'
import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'

const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `effect-underline`
const componentRoot = `.effect-underline-container`
export const EffectUnderline = WCConstructor({
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
        hasTargets$,
        hasStart,
        canLoadTargets,
        canStart,
        canEnd,
        canRunStart,
        canRunEnd,
        nonAutoOrigin,
    },
    onDisconnected: host => unloadTargets(host)
})

WCDefine(componentName, EffectUnderline)