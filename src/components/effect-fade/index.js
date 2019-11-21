import { WCConstructor, WCDefine } from '../..'
import {
    observedAttributes, properties, hasTargets, hasTriggers$, hasTriggers, hasStart,
    canLoadTriggers, canStart, canEnd, canRunStart, canRunEnd
} from './properties'
import { toggle, open, close, unloadTriggers, loadTriggers } from './methods'
import elements from './elements'

import './style.scss'
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `effect-fade`
const componentRoot = `.effect-fade-container`
export const EffectFade = /*#__PURE__*/ WCConstructor({
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