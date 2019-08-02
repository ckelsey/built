import template from './index.min.html'
import style from './style.min.html'
import TemplateRender from '../../utils/template'
import Subject from '../../utils/subject'

const Render = new TemplateRender(`${style}${template}`)
const Properties = {}
const Operations = {}

class BoilerElement extends HTMLElement {
    public state: { [key: string]: Subject } = {}
    public Template
    public $container

    static get observedAttributes(): string[] { return Object.keys(Properties) }

    constructor() {
        super()

        Object.keys(Properties).forEach((attrKey) => {
            this.state[attrKey] = new Subject(Properties[attrKey]())

            Object.defineProperty(this, attrKey, {
                get() { return this.state[attrKey].value },
                set(attrValue) {
                    if (!this.state[attrKey]) { return }

                    const formattedValue = Properties[attrKey](attrValue)

                    if (this.state[attrKey].value !== formattedValue) {
                        this.state[attrKey].next(formattedValue)
                    }
                }
            })
        })
    }

    public attributeChangedCallback(attrName: string, oldValue: any, newValue: any) {
        if (newValue !== oldValue) {
            this[attrName] = newValue
        }
    }

    public connectedCallback() {
        this.onSomething = this.onSomething.bind(this)

        if (!this.shadowRoot) {
            // const Template = document.createElement(`template`)
            // Template.innerHTML = `${style}${template}`

            // const clone = document.importNode(Template.content, true)
            // this.attachShadow({ mode: 'open' }).appendChild(clone)

            const Template = document.createElement(`template`)
            Template.innerHTML = Render.innerHTML

            const clone = document.importNode(Template.content, true)
            this.attachShadow({ mode: 'open' }).appendChild(clone)
            this.Template = Render.clone(this)
            this.Template.init(this)

            this.setElements()

            Object.keys(Properties)
                .forEach(attrKey => {
                    if (!Operations[attrKey]) { return }

                    this.state[attrKey].subscribe(
                        val => Operations[attrKey](this, val)
                    )
                })

            requestAnimationFrame(() => {
                this[`ready`] = true
            })
        }
    }

    public setElements() {
        this.$container = this.shadowRoot.querySelector(`.container`)
    }

    public dispatch(type, e: Event) {
        console.log(type, e)
    }

    public onSomething(e: Event) {
        this.dispatch(`something`, e)
    }
}

window.customElements.define(`boiler-element`, BoilerElement)

export default BoilerElement
