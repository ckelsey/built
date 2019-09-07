
/*
const Properties = {
    class: val => val
}
const operations = that => ({
    class: val => {
        const newClasses = !!val && typeof val === `string` ? val.split(` `).map(c => c.trim()) : []
        const clss = that.$container.className.split(` `).map(c => c.trim())
        const prev = !!that.state.class.previous && typeof that.state.class.previous === `string` ? that.state.class.previous.split(` `).map(c => c.trim()) : []

        prev.forEach(c => {
            const indexInClss = clss.indexOf(c)
            if (newClasses.indexOf(c) === -1 && indexInClss > -1) {
                clss.splice(indexInClss, 1)
            }
        })

        newClasses.forEach(c => {
            if (clss.indexOf(c) === -1) {
                clss.push(c)
            }
        })

        that.$container.className = clss.map(c => c.trim()).filter(c => !!c).join(` `)
    }
})

export class ButtonElement extends HTMLElement {
    public state: { [key: string]: Subject } = {}
    public $container
    public $button
    public $bounce
    public $ripple

    static get observedAttributes(): string[] { return Object.keys(Properties) }

    constructor() {
        super()

        Object.keys(Properties).forEach((attrKey) => {
            this.state[attrKey] = new Subject(Properties[attrKey](this[attrKey], this))

            Object.defineProperty(this, attrKey, {
                get() {
                    return this.state[attrKey].value
                },
                set(attrValue) {
                    if (!this.state[attrKey]) { return }

                    const formattedValue = Properties[attrKey](attrValue, this)

                    if (this.state[attrKey].value !== formattedValue) {
                        return this.state[attrKey].next(formattedValue)
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
        if (this.shadowRoot) { return }

        const Operations = operations(this)

        webComponentTemplate(componentName, template, this, style, componentRoot)

        this.$container = this.shadowRoot.querySelector(`.button-element`)
        this.$button = this.shadowRoot.querySelector(`button`)
        this.$bounce = this.shadowRoot.querySelector(`effect-bounce-z`)
        this.$ripple = this.shadowRoot.querySelector(`effect-ripple`)

        this.$bounce.targets = [this.$button]
        this.$ripple.targets = [this.$button]

        Object.keys(Properties)
            .forEach(attrKey => {
                if (!Operations[attrKey]) { return }

                this.state[attrKey].subscribe(
                    val => Operations[attrKey](val)
                )
            })

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.$button.classList.add(`ready`)
            })
        })
    }
}

if (!window.customElements.get(componentName)) {
    window.customElements.define(componentName, ButtonElement);
}
*/