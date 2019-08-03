import template from './index.min.html'
import style from './style.min.html'
import Subject from '../../utils/subject'
import { Options } from '../../utils/convert/options'
import { ToString } from '../../utils/convert/string'
import pipe from '../../utils/pipe';
import { IfInvalid } from '../../utils/convert/if'
import { EventName } from '../../utils/html/events'
import { ToNumber } from '../../utils/convert/number'
import Get from '../../utils/get'

const Properties = {
    lines: val => pipe(ToNumber, IfInvalid(5))(val).value,
    value: (val, that) => {
        const current = that.value === undefined
            ? that.filteredOptions[0] === undefined
                ? that.options
                    ? that.options[0]
                    : that.filteredOptions[0]
                : that.filteredOptions[0]
            : that.filteredOptions[0]

        const currentValue = current ? current.value : undefined
        const newVal = val === undefined
            ? currentValue
            : that.filteredOptions.filter(o => val.toString() === o.value.toString()).length === 0
                ? currentValue
                : val
        return newVal
    },
    options: (val, that) => {
        const res = Options(val)
        return res.valid ? res.value : !!that.options && that.options.length ? that.options : []
    },
    filter: val => pipe(ToString, IfInvalid(``))(val).value,
    spacing: val => pipe(ToNumber, IfInvalid(1.5))(val).value
}

const operations = that => ({
    value: () => {
        that.setOptionsClasses()
        that.onValueChange()
    },
    options: () => {
        that.setOptions()
        that.onOptionsChange()
    },
    lines: () => {
        that.setOptions()
        that.onLinesChange()
    },
    filter: () => {
        that.setOptions()
        that.onFilterChange()
    },
    spacing: () => {
        that.setOptions()
        that.onSpaceChange()
    }
})

export class RotaryList extends HTMLElement {
    public state: { [key: string]: Subject } = {}
    public $list
    public $optionStyles
    public $heightIndicator
    public optionsTimer
    public transitionTimer
    public lineHeights = []
    public filteredOptions = []

    public get selectedIndex() {
        let index = 0
        for (let i = 0; i < this.filteredOptions.length; i++) {
            if (this.filteredOptions[i].value === this.state.value.value) {
                index = i
                break
            }
        }
        return index
    }

    public get Value() {
        return Get(this, `filteredOptions.${this.selectedIndex}.value`, undefined)
    }

    public get values() {
        return this.state.options ? this.state.options.value.map(o => o.value) : []
    }

    static get observedAttributes(): string[] { return Object.keys(Properties) }

    constructor() {
        super()

        Object.keys(Properties).forEach((attrKey) => {
            this.state[attrKey] = new Subject(Properties[attrKey](this[attrKey], this))

            Object.defineProperty(this, attrKey, {
                get() {
                    if (attrKey === `value` && this.filteredOptions.length) {
                        return this.Value
                    }

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
        const Template = document.createElement(`template`)
        Template.innerHTML = `${style}${template}`

        const clone = document.importNode(Template.content, true)
        this.attachShadow({ mode: 'open' }).appendChild(clone)

        this.setElements()
        this.setOptions()

        Object.keys(Properties)
            .forEach(attrKey => {
                if (!Operations[attrKey]) { return }

                this.state[attrKey].subscribe(
                    val => Operations[attrKey](val)
                )
            })

        let wheelMoved = 0
        this.$list.addEventListener(`mousewheel`, e => {
            e.preventDefault()
            wheelMoved = wheelMoved + (e.deltaY / 15)

            if (wheelMoved <= -1) {
                this.previous()
                wheelMoved = 0
            } else if (wheelMoved >= 1) {
                this.next()
                wheelMoved = 0
            }
        }, false)

        this.$list.onkeydown = e => {
            if (e.which === 38) {
                e.preventDefault()
                this.previous()
            } else if (e.which === 40) {
                e.preventDefault()
                this.next()
            }
        }

        requestAnimationFrame(() => {
            this[`ready`] = true
        })
    }

    public move(direction) {
        this[`value`] = this.filteredOptions[this.selectedIndex + direction] ? this.filteredOptions[this.selectedIndex + direction].value : this[`value`]
    }

    public next() {
        this.move(1)
    }

    public previous() {
        this.move(-1)
    }

    public setElements() {
        this.$list = this.shadowRoot.querySelector(`.rotary-list-inner`)
        this.$optionStyles = this.shadowRoot.querySelector(`#option-styles`)
        this.$heightIndicator = this.shadowRoot.querySelector(`.rotary-list-height`)
    }

    public filterOptions() {
        this.filteredOptions = !!this[`filter`]
            ? this[`options`].filter(o => o.value.toString().startsWith(this[`filter`].toString()))
            : this[`options`].slice()
    }

    public getOptionClassCount() {
        return Math.round(Math.min(this[`lines`], this.filteredOptions.length) / 2)
    }

    public setLines() {
        const styles = []
        const rules = this.getOptionClassCount()
        const inc = 1 / rules
        let index = 0
        this.lineHeights = []

        while (index < rules + 1) {
            const i = index + 1
            const lineHeight = index === rules ? 0 : (1 - (index * inc)) * (100 * this[`spacing`])
            const scale = index === rules ? 0 : 1 - (index * inc)
            const opacity = index === rules ? 0 : 1 - (index * (1 / (rules * 1.25)))
            styles.push(`.rotary-list-option.option${i}{line-height: ${lineHeight}%; transform: scale(1, ${scale}); opacity: ${opacity};}`)
            this.lineHeights.push(lineHeight)

            if (index) {
                this.lineHeights.push(lineHeight)
            }
            index = index + 1
        }

        this.$optionStyles.innerHTML = styles.join(` `)
    }

    public setOptions() {
        this.$list.classList.add(`no-transition`)
        this.filterOptions()
        this.setLines()

        const ruleCount = this.getOptionClassCount()

        this.$list.innerHTML = ``
        this.filteredOptions.forEach(optionData => {
            const optionIndex = this.$list.children.length
            const option = document.createElement(`div`)
            option.textContent = optionData.label
            option.setAttribute(`value`, optionData.value)
            option.className = `rotary-list-option`
            this.$list.appendChild(option)
            option.addEventListener(`click`, () => this[`value`] = this.values[optionIndex])
        })

        let emptyIndex = 0
        while (emptyIndex <= ruleCount) {
            const emptyOption = document.createElement(`div`)
            const emptyOption2 = document.createElement(`div`)
            emptyOption.className = `rotary-list-option`
            emptyOption2.className = `rotary-list-option`
            emptyOption.innerHTML = `&nbsp;`
            emptyOption2.innerHTML = `&nbsp;`
            emptyOption.setAttribute(`empty-option`, `1`)
            emptyOption2.setAttribute(`empty-option`, `1`)
            this.$list.appendChild(emptyOption)
            this.$list.insertBefore(emptyOption2, this.$list.children[0])
            emptyIndex = emptyIndex + 1
        }

        this.setOptionsClasses()
    }

    public setOptionsClasses() {
        cancelAnimationFrame(this.optionsTimer)
        this.$heightIndicator.style.lineHeight = `${this['spacing'] * 100}%`

        const lineHeight = this.$heightIndicator.clientHeight
        let minHeight = 0

        this.lineHeights.forEach(h => minHeight = minHeight + ((h / 100) * (lineHeight / this[`spacing`])))
        this.$list.style.height = `${Math.ceil(minHeight) - this.getOptionClassCount()}px`
        this.$list.style.overflow = `hidden`

        this.optionsTimer = requestAnimationFrame(() => {
            const emptyCount = this.$list.querySelectorAll(`[empty-option]`).length / 2
            const ruleCount = this.getOptionClassCount() + 1
            const options: HTMLDivElement[] = Array.from(this.$list.children)
            const selectedIndex = this.selectedIndex + emptyCount
            clearTimeout(this.transitionTimer)

            let up = 1
            while (!!options[selectedIndex - up]) {
                const o = options[selectedIndex - up]
                o.className = `rotary-list-option option${up < ruleCount ? up + 1 : ruleCount}`
                up = up + 1
            }

            let down = 1
            while (!!options[selectedIndex + down]) {
                const o = options[selectedIndex + down]
                o.className = `rotary-list-option option${down < ruleCount ? down + 1 : ruleCount}`
                down = down + 1
            }

            // on scroll, the container jiggles in height
            const reset = () => {
                options[selectedIndex].removeEventListener(EventName(`transitionend`), removeStyles, true)
                // this.$list.style.removeProperty(`height`)
                // this.$list.style.removeProperty(`overflow`)
            }
            const removeStyles = () => {
                clearTimeout(this.transitionTimer)
                this.transitionTimer = setTimeout(() => {
                    reset()
                }, 200)
            }

            this.$list.classList.remove(`no-transition`)

            if (!!options[selectedIndex]) {
                if (options[selectedIndex].classList.contains(`option1`)) {
                    return reset()
                }
                options[selectedIndex].addEventListener(EventName(`transitionend`), removeStyles, true)
                options[selectedIndex].className = `rotary-list-option option1`
            }
        })
    }

    public dispatch(type, data) {
        const event = new CustomEvent(type, { detail: data })
        this.dispatchEvent(event)
    }

    public onSpaceChange() {
        this.dispatch(`spacechange`, this[`spacing`])
    }

    public onValueChange() {
        this.dispatch(`valuechange`, this[`value`])
    }

    public onOptionsChange() {
        this.dispatch(`optionschange`, this[`options`])
    }

    public onLinesChange() {
        this.dispatch(`lineschange`, this[`lines`])
    }

    public onFilterChange() {
        this.dispatch(`filterchange`, this[`filter`])
    }
}

if (!window.customElements.get(`rotary-list`)) {
    window.customElements.define(`rotary-list`, RotaryList)
}