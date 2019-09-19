import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import { observedAttributes, properties } from './properties'
import { trigger, unloadTargets } from './methods'

const template = require('./index.html')
const componentName = `effect-bounce-z`
const componentRoot = `.effect-push-container`
const EffectBounceZ = /*#__PURE__*/ Constructor({
    componentName,
    componentRoot,
    template,
    observedAttributes,
    properties,
    methods: { trigger },
    onDisconnected: host => unloadTargets(host)
})

Define(componentName, EffectBounceZ)

export default EffectBounceZ