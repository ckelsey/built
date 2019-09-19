import Constructor from '../../utils/webcomponent/constructor'
import Define from '../../utils/webcomponent/define'
import { observedAttributes, properties } from './properties'
import { dispose, run } from './methods'
import elements from './elements'

import './style.scss'
const style = require('./style.scss').toString()

const template = require('./index.html')
const componentName = `effect-scale`
const componentRoot = `.effect-scale-container`
const EffectScale = /*#__PURE__*/ Constructor({
    componentName,
    componentRoot,
    template,
    style,
    observedAttributes,
    properties,
    elements,
    computed: {
        hasTargets: host => ({
            get() {
                return !!host.targets && host.targets.length && typeof host.targets.forEach === `function`
            }
        }),
        hasTriggers: host => ({
            get() {
                return !!host.triggers && host.triggers.length && typeof host.triggers.forEach === `function`
            }
        }),
        hasScale: host => ({
            get() {
                return host.isScaling || host.isScaled
            }
        })
    },
    onReady: host => {
        run(host.scaled, host, true)
    },
    onDisconnected: host => dispose(host),
})

Define(componentName, EffectScale)

export default EffectScale
