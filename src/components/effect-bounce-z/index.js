import { observedAttributes, properties } from './properties.js'
import { trigger, unloadTargets } from './methods.js'
import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `effect-bounce-z`
const componentRoot = `.effect-push-container`
export const EffectBounceZ = WCConstructor({
    componentName,
    componentRoot,
    template,
    observedAttributes,
    properties,
    methods: { trigger },
    onDisconnected: host => unloadTargets(host)
})

WCDefine(componentName, EffectBounceZ)