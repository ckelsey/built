import { WCConstructor, WCDefine, ObserveEvent, CreateElement } from 'builtjs'
const outerStyle = require('./outer.scss').toString()
const style = require('./style.scss').toString()
const template = require('./index.html')
const componentName = 'test-element'
const componentRoot = `.${componentName}-container`
const elements = {
    root: { selector: `${componentRoot}` },
    transition: { selector: '#transition' },
    transitionBtn1: {
        selector: '#transition-content1',
        onChange(el, host) {
            el.eventSubscriptions = {
                click: ObserveEvent(el, 'click').subscribe(() => {
                    host.elements.transition.transition(CreateElement({
                        tagName: 'div',
                        textContent: 'Heyoooooo!'
                    }))
                })
            }
        }
    },
    transitionBtn2: {
        selector: '#transition-content2',
        onChange(el, host) {
            el.eventSubscriptions = {
                click: ObserveEvent(el, 'click').subscribe(() => {
                    host.elements.transition.transition(CreateElement({
                        tagName: 'div',
                        textContent: 'Heyaaaaa!'
                    }))
                })
            }
        }
    }
}

export const TestElement = WCConstructor({
    componentName,
    componentRoot,
    template,
    style,
    outerStyle,
    elements
})

WCDefine(componentName, TestElement)

export default TestElement