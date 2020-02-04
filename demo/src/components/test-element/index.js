import { WCConstructor, WCDefine } from 'builtjs'
const outerStyle = require(`./outer.scss`).toString()
const style = require(`./style.scss`).toString()
const template = require(`./index.html`)
const componentName = `test-element`
const componentRoot = `.${componentName}-container`
const elements = { root: { selector: `${componentRoot}` } }

export const TestElement = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
    elements,
    onConnected(host) {
        console.log(`connected yo`, host)
    }
})

WCDefine(componentName, TestElement)

export default TestElement