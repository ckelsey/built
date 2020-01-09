import {
    observedAttributes,
    properties,
    hasTargets,
    hasTargets$,
    hasStart,
    canLoadTargets,
    canStart,
    nonAutoOrigin
} from './properties.js'
import { trigger, unloadTargets } from './methods.js'
import elements from './elements.js'
import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'

const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `effect-ripple`
const componentRoot = `.effect-ripple-container`
export const EffectRipple = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    methods: { trigger },
    computed: {
        hasTargets,
        hasTargets$,
        hasStart,
        canLoadTargets,
        canStart,
        nonAutoOrigin,
    },
    onDisconnected: host => unloadTargets(host)
})

WCDefine(componentName, EffectRipple)