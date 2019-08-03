import template from './index.min.html'
import style from './style.min.html'
import Subject from '../../utils/subject'
import { IconElementAttributes, IconElementAttributeOperations } from './attributes'

export class IconElement extends HTMLElement {
    public subscription
    public state = {}

    public get $svgContainer() {
        return this.shadowRoot.querySelector(`.svg-container`)
    }

    public static get observedAttributes(): string[] {
        return Object.keys(IconElementAttributes)
    }

    constructor() {
        super()

        Object.keys(IconElementAttributes).forEach((attrKey) => {
            this.state[attrKey] = new Subject(IconElementAttributes[attrKey]())

            Object.defineProperty(this, attrKey, {
                get() { return this.state[attrKey].value },
                set(attrValue) {
                    if (!this.state[attrKey]) { return }

                    const formattedValue = IconElementAttributes[attrKey](attrValue)

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
        if (!this.shadowRoot) {
            const Template = document.createElement(`template`)
            Template.innerHTML = `${style}${template}`

            const clone = document.importNode(Template.content, true)
            this.attachShadow({ mode: 'open' }).appendChild(clone)

            Object.keys(IconElementAttributes)
                .forEach(attrKey => {
                    if (!IconElementAttributeOperations[attrKey]) { return }

                    this.state[attrKey].subscribe(
                        val => IconElementAttributeOperations[attrKey](this, val)
                    )
                })
        }
    }
}

if (!window.customElements.get(`icon-element`)) {
    window.customElements.define(`icon-element`, IconElement)
}
