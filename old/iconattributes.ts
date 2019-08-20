import Subject from '../src/utils/subject'

const AvailableIcons = {}

const getIcon = (path) => {
    if (!path) {
        if (!AvailableIcons[path]) {
            AvailableIcons[path] = new Subject(``)
        }

        AvailableIcons[path].next(``)
        return Promise.resolve(AvailableIcons[path])
    }

    return new Promise((resolve) => {
        if (path.slice(0, 5) === `<svg`) {
            return resolve(new Subject(path))
        }

        if (path.indexOf(`https://`) === -1 && path.indexOf(`http://`) === -1) {
            path = `${location.protocol}//${location.host}${path[0] === `/` ? path : `/${path}`}`
        }

        if (AvailableIcons[path]) {
            return resolve(AvailableIcons[path])
        }

        AvailableIcons[path] = new Subject(``)
        resolve(AvailableIcons[path])

        const fnString = `
        self.onmessage = function(e){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', e.data, false);
            xhr.onload = () => postMessage({ status: xhr.status, svg: xhr.responseText });
            xhr.send();
        }`
        const blobURL = window.URL.createObjectURL(new Blob([fnString]))
        const worker = new Worker(blobURL)

        worker.onmessage = (e) => {
            if (e.data.status === 200) {
                AvailableIcons[path].next(e.data.svg)
            } else {
                AvailableIcons[path].error(e.data.status)
            }
        }

        worker.postMessage(path)
    })
}

const stringOrNull = (val: any) => typeof val === `string` ? val : null

export const IconElementAttributes = {
    type: stringOrNull,
    svg: stringOrNull,
    color: stringOrNull,
    size: stringOrNull,
    class: val => val
}

export const IconElementAttributeOperations = {
    color: (that, value) => that.$svgContainer.style.color = value,
    size: (that, value) => that.$svgContainer.style.height = that.$svgContainer.style.width = value,
    type: (that: any, value: any) => {
        if (!value) { return }
        if (that.subscription) {
            that.subscription()
        }
        return getIcon(value)
            .then((subject: any) => {
                that.subscription = subject.subscribe(icon => {
                    that.$svgContainer.innerHTML = icon
                })
            })
    },
    svg: (that: any, value: any) => {
        if (!value) { return }
        if (that.subscription) {
            that.subscription()
        }

        that.$svgContainer.innerHTML = value
    },
    class: (that, val) => {
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
}
