import { WCConstructor } from '../../utils/wc-constructor.js'
import { WCDefine } from '../../utils/wc-define.js'
import { observedAttributes, properties } from './properties.js'
import { dispose, run } from './methods.js'

const elements = { root: { selector: `.effect-scale-container` } }
const style = require(`./style.scss`).toString()
const outerStyle = require(`./outer.scss`).toString()
const template = require(`./index.html`)
const componentName = `effect-scale`
const componentRoot = `.${componentName}-container`

export const EffectScale = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
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

WCDefine(componentName, EffectScale)
