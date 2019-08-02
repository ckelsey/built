import Subject from '../subject'

export const CreateShadow = that => template => {
    const Template = document.createElement(`template`)
    Template.innerHTML = template

    const clone = document.importNode(Template.content, true)
    that.attachShadow({ mode: 'open' }).appendChild(clone)
}

export const AttributeChangedCallback = that => (attrName: string, oldValue: any, newValue: any) => {
    console.log(attrName, newValue, oldValue, that)
    if (newValue !== oldValue) {
        that[attrName] = newValue
    }
}

export const CreateComponentState = that => (Properties, Methods) => {
    Object.keys(Properties).forEach((attrKey) => {
        that.state[attrKey] = new Subject(Properties[attrKey]())

        Object.defineProperty(that, attrKey, {
            get() { return that.state[attrKey].value },
            set(attrValue) {
                if (!that.state[attrKey]) { return }

                const formattedValue = Properties[attrKey](attrValue)

                if (that.state[attrKey].value !== formattedValue) {
                    that.state[attrKey].next(formattedValue)
                }
            }
        })

        if (Methods[attrKey]) {
            that.state[attrKey].subscribe(val => {
                Methods[attrKey](val)
            })
        }
    })
}
