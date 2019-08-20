import { Constructor, Define } from '../../utils/webcomponent/constructor'
import ID from '../../utils/id'
import { observedAttributes, properties } from './properties'
import { trigger, unloadTargets } from './methods'
import elements from './elements'

const template = require('./index.html')
const style = require('./style.html')
const componentName = `effect-underline`
const componentRoot = `.effect-underline-container`
const EffectUnderline = Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    methods: { trigger },
    onConnected: host => host.inputID = ID(componentName),
    onDisconnected: host => unloadTargets(host)
})

Define(componentName, EffectUnderline)

export default EffectUnderline