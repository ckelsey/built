import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import {
    observedAttributes,
    properties,
    hasTargets,
    hasTargets$,
    hasStart,
    canLoadTargets,
    canStart,
    canEnd,
    canRunStart,
    canRunEnd,
    nonAutoOrigin
} from './properties.js'
import { toggle, unloadTargets, open, close } from './methods.js'

const elements = {
    root: { selector: `.effect-underline-container` },
    underline: { selector: `.underline` }
}

const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `effect-underline`
const componentRoot = `.effect-underline-container`
export const EffectUnderline = /*#__PURE__*/ WCConstructor({
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