import { ObserveWorker } from '..'

export function Request(apiBase) {
    return function (reqData) {
        const base = apiBase
        const path = `${base}${`/${reqData.path || ``}`.split(`//`).join(`/`)}`
        const REQ = Object.assign({}, {
            data: undefined,
            headers: {},
            method: `POST`
        },
            reqData,
            { path }
        )

        const isFormData = REQ.data instanceof FormData

        if (!isFormData && REQ.data && typeof REQ.data !== `string`) {
            REQ.data = JSON.stringify(REQ.data)
        }

        if (isFormData) {
            REQ.toForm = true

            const jsonData = {}
            REQ.data.forEach(function (value, key) {
                jsonData[key] = value
            })

            REQ.data = JSON.stringify(REQ.data)
        }

        return new Promise((resolve, reject) => {
            const worker$ = ObserveWorker(
                function () {
                    self.onmessage = function (e) {
                        var xhr = new XMLHttpRequest()
                        var data = JSON.parse(e.data)
                        var formData = data.data

                        if (data.toForm) {
                            const form = new FormData()
                            Object.keys(formData).forEach(key => form.append(key, formData[key]))
                            formData = form
                        }

                        xhr.open(data.method, data.path, false)
                        Object.keys(data.headers).forEach(key => xhr.setRequestHeader(key, data.headers[key]))
                        xhr.onload = () => postMessage({ status: xhr.status, response: xhr.responseText || xhr.statusText })
                        xhr.onerror = () => postMessage({ status: xhr.status, response: xhr.statusText })
                        xhr.send(data.data)
                    }
                }
            )

            const workerSubscription = worker$.subscribe(
                e => {
                    workerSubscription()
                    let res = e.response
                    // eslint-disable-next-line no-empty
                    try { res = JSON.parse(res) } catch (error) { }

                    if (e.status === 200) {
                        return resolve(res)
                    } else {
                        return reject(e)
                    }
                },
                e => {
                    workerSubscription()
                    reject(e)
                }
            )

            worker$.post(REQ)
        })
    }
}