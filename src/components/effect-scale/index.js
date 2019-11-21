import { WCConstructor, WCDefine } from '../..'
import { observedAttributes, properties } from './properties'
import { dispose, run } from './methods'
import elements from './elements'

import './style.scss'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const style = require(`./style.scss`).toString()
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
const template = require(`./index.html`)
const componentName = `effect-scale`
const componentRoot = `.effect-scale-container`
export const EffectScale = WCConstructor({
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

WCDefine(componentName, EffectScale)
