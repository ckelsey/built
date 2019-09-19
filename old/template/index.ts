import Get from '../get'
import clean from './clean'
import parse from './parse'

class TemplateRender {
    public doc
    public innerHTML = ``
    public bindings = {}
    public ifs = {}
    public fors = {}

    constructor(htmlString) {

        const parser = new DOMParser()
        this.doc = parser.parseFromString(`<body>${htmlString}</body>`, `text/html`)

        clean(this.doc.body)

        const parsed = parse(this.doc.body)
        this.innerHTML = parsed.innerHTML
        this.ifs = parsed.ifs
        this.fors = parsed.fors
        this.bindings = parsed.bindings
    }

    public clone(This) {
        const addRemoveAttribute = (t, b, l) => {
            const val = t[b.property]

            if (b.html) {
                l.innerHTML = val
                return
            }

            if (!l || typeof l.setAttribute !== `function`) {
                return
            }

            if (!!val) {
                l.setAttribute(b.attribute, val)
            } else {
                l.removeAttribute(b.attribute)
            }
        }

        const addRemoveElement = (add, l, b, v, t) => {
            let newElement

            if (add && l.nodeType !== 8) {
                return
            }

            if (!add && l.nodeType === 8) {
                return
            }

            if (add) {
                newElement = document.createElement(`span`)
                newElement.innerHTML = b.markup

                const firstChild = newElement.firstChild

                l.parentNode.insertBefore(firstChild, l)
                l.parentNode.removeChild(l)

                newInstance.render(b.path, t)

            } else {
                newElement = document.createComment(`SCOPE@${v}@`)
                l.parentNode.insertBefore(newElement, l)
                l.parentNode.removeChild(l)
            }
        }

        const addRemoveText = (l, b, v) => {
            let newElement = document.createComment(`SCOPE@${b.property}@`)

            if (v) {
                newElement = document.createTextNode(v)
            }

            l.parentNode.insertBefore(newElement, l)
            l.parentNode.removeChild(l)
        }

        const bulkAddRemoveAttributes = (t, b, l, isClass) => {
            if (typeof l.setAttribute !== `function` || !l.classList) { return }

            const obj = t[b.property]

            Object.keys(obj).forEach((key) => {
                const val = obj[key]

                if (!!val) {
                    if (isClass) {
                        l.classList.add(key)
                    } else {
                        l.setAttribute(key, obj[key])
                    }
                } else {
                    if (isClass) {
                        l.classList.remove(key)
                    } else {
                        l.removeAttribute(key)
                    }
                }
            })
        }

        const handleAttributes = (t, b, l) => {
            if (b.attrs || b.class) {
                return bulkAddRemoveAttributes(t, b, l, b.class)
            }

            return addRemoveAttribute(t, b, l)
        }

        const addEvent = (t, b, l) => {
            if (!l || typeof l.addEventListener !== `function`) { return }

            l.removeEventListener(b.event, t[b.original], false)
            l.addEventListener(b.event, t[b.original], false)
        }

        const handleBinding = (t, b) => {
            const element = Get(t.shadowRoot, b.path)
            const value = Get(t, b.original, undefined)

            if (!element) { return }

            switch (b.type) {
                case `text`:
                    return addRemoveText(element, b, value)

                case `attribute`:

                    if (b.if) {
                        const equals =
                            b.hasOwnProperty(`equals`) ?
                                b.equals === value : !!value

                        return addRemoveElement(equals, element, b, value, t)
                    }

                    return handleAttributes(t, b, element)

                case `event`:
                    return addEvent(t, b, element)
            }
        }

        const render = (path, t) => {
            const keys = Object.keys(newInstance.elements)
            const toUpdate = []

            keys.forEach((key) => {
                if (key.indexOf(path) === 0) {
                    toUpdate.push(newInstance.elements[key])
                }
            })

            toUpdate.sort().forEach((updateArr) => {
                updateArr
                    .sort((a) => {
                        return a.if ? 1 : -1
                    })
                    .forEach((bind) => handleBinding(t, bind))
            })
        }

        const update = (property, t) => {
            const bindings = newInstance.bindings[property]

            if (!bindings || !bindings.length) {
                return
            }

            bindings.forEach((bind) => handleBinding(t, bind))
        }

        const updateElement = (path, t) => {
            newInstance.elements[path]
                .sort((a) => {
                    return a.if ? -1 : 1
                })
                .forEach((b) => {
                    handleBinding(t, b)
                })
        }

        const init = (t) => {
            Object.keys(newInstance.elements).sort().forEach((path) => updateElement(path, t))
        }

        const newInstance = {
            bindings: {},
            elements: {},
            update,
            render,
            init
        }

        Object.keys(this.bindings).forEach((key) => {
            newInstance.bindings[key] = []

            this.bindings[key].forEach((bind) => {
                const element = Get(
                    This.shadowRoot,
                    bind.path
                )

                const data = Object.assign(
                    {},
                    bind,
                    { element }
                )

                if (!newInstance.elements[bind.path]) {
                    newInstance.elements[bind.path] = []
                }

                newInstance.bindings[key].push(data)
                newInstance.elements[bind.path].push(data)
            })
        })

        Object.keys(this.ifs).forEach((path) => {
            const El = Get(This.shadowRoot, path)

            if (!El) { return }

            const comment = document.createComment(`SCOPE@${this.ifs[path].property}@`)
            El.parentNode.insertBefore(comment, El)
            El.parentNode.removeChild(El)
        })

        Object.keys(this.fors).forEach((path) => {
            const El = Get(This.shadowRoot, path)

            if (!El) { return }

            const comment = document.createComment(`SCOPE@${this.fors[path].property}@`)
            El.parentNode.insertBefore(comment, El)
            El.parentNode.removeChild(El)
        })

        return newInstance
    }
}

export default TemplateRender
