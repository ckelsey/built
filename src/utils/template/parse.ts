const propRegex = /\{\{\s?([\w.]+)\s?\}\}/gm
const scopeRegex = /SCOPE@?(.*)?@/gm
const attributeBinding = {
    index: 10,
    str: `data-bind-`
}

const eventBinding = {
    index: 8,
    str: `data-on-`
}

const parse = (root) => {
    const bindings = {}
    const ifs = {}
    const fors = {}
    const addBinding = (config) => {
        if (!bindings[config.property]) {
            bindings[config.property] = []
        }

        bindings[config.property].push(config)
    }

    const loop = (el, path) => {
        Array.from(el.childNodes).forEach((child, index) => loop(child, `${path === `` ? `` : `${path}.`}childNodes.${index}`))

        switch (el.nodeType) {
            case 3:
                const hasProps = propRegex.test(el.textContent)

                if (!hasProps) { return }

                // tslint:disable-next-line:variable-name
                const innerHTML = el.textContent.replace(propRegex, (_match, property) => {
                    return `<!-- SCOPE@${property}@ -->`
                })

                const newEl = document.createElement(`span`)
                newEl.innerHTML = innerHTML

                Array.from(newEl.childNodes).forEach((l, i) => {
                    if (l.nodeType !== 8) { return }

                    const dataString = (l as any).textContent

                    if (!dataString) { return }

                    const m = scopeRegex.test(dataString)

                    if (!m) { return }

                    dataString.replace(scopeRegex, (match, str) => {
                        addBinding({
                            type: `text`,
                            property: str.split(`.`)[0],
                            original: str,
                            path: `${path}.childNodes.${i}`
                        })
                        return match
                    })
                })

                el.parentNode.insertBefore(newEl, el)
                el.parentNode.removeChild(el)

                return

            default:
                if (!el.attributes) { return }

                Array.from(el.attributes).forEach((attr) => {
                    const name = (attr as any).name
                    const property = (attr as any).value

                    if (name.substring(0, attributeBinding.index) === attributeBinding.str) {
                        const attribute = name.substring(attributeBinding.index)
                        const binding = {
                            type: `attribute`,
                            attribute,
                            property,
                            original: property,
                            path
                        }

                        switch (attribute) {
                            case `if-equals`:
                            case `if`:

                                binding[`if`] = true
                                binding[`markup`] = el.outerHTML

                                if (attribute === `if-equals`) {
                                    const propertyParts = property.split(`,`).map((s) => s.trim())
                                    binding[`property`] = propertyParts[0]
                                    binding[`original`] = propertyParts[0]
                                    binding[`equals`] = propertyParts[1]
                                }

                                ifs[path] = binding
                                break

                            case `for`:

                                const parts = property.split(`,`).map((s) => s.trim())
                                binding[`for`] = true
                                binding[`markup`] = el.outerHTML
                                binding[`original`] = binding[`property`] = parts.shift()
                                binding[`vars`] = parts

                                fors[path] = binding
                                break

                            case `html`:
                                binding[`html`] = true
                                break

                            case `attrs`:
                                binding[`attrs`] = true
                                break

                            case `class`:
                                binding[`class`] = true
                                break
                        }

                        return addBinding(binding)
                    }

                    if (name.substring(0, eventBinding.index) === eventBinding.str) {
                        const event = name.substring(eventBinding.index)

                        return addBinding({
                            type: `event`,
                            event,
                            property,
                            original: property,
                            path
                        })
                    }
                })
        }
    }

    loop(root, ``)

    return {
        bindings,
        ifs,
        fors,
        innerHTML: root.innerHTML
    }
}

export default parse
