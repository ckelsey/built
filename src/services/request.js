import { ObserveWorker } from '../utils/observe-worker.js'
import { ObjectAssign } from '../utils/object-assign.js'

export function Request(apiBase) {
    return function (reqData) {
        reqData = reqData ? reqData : {}

        const base = apiBase
        const path = ''.concat(base, ''.concat('/', reqData.path || '').split('//').join('/'))

        const REQ = ObjectAssign(
            {},
            {
                data: undefined,
                headers: {},
                method: 'POST'
            },
            reqData,
            { path: path }
        )

        const isFormData = REQ.data instanceof FormData

        if (!isFormData && REQ.data && typeof REQ.data !== 'string') {
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

        return new Promise(
            function RequestPromise(resolve, reject) {
                let workerSubscription

                const worker$ = ObserveWorker(
                    function () {
                        self.onmessage = function (e) {
                            var xhr = new XMLHttpRequest()
                            var data = JSON.parse(e.data)
                            var formData = data.data
                            var form = new FormData()

                            function formDataKeysEach(key) {
                                return form.append(key, formData[key])
                            }

                            function onloadFn() {
                                postMessage({ status: xhr.status, response: xhr.responseText || xhr.statusText })
                            }

                            function onerrorFn() {
                                postMessage({ status: xhr.status, response: xhr.statusText })
                            }

                            function headersEach(key) {
                                xhr.setRequestHeader(key, data.headers[key])
                            }

                            if (data.toForm) {
                                Object.keys(formData).forEach(formDataKeysEach)
                                formData = form
                            }

                            xhr.open(data.method, data.path, false)
                            Object.keys(data.headers).forEach(headersEach)
                            xhr.onload = onloadFn
                            xhr.onerror = onerrorFn
                            xhr.send(data.data)
                        }
                    }
                )

                function workerSub(e) {
                    workerSubscription()
                    let res = e.response
                    try { res = JSON.parse(res) } catch (error) { }

                    if (e.status === 200) {
                        return resolve(res)
                    } else {
                        return reject(e)
                    }
                }

                function workerError(e) {
                    workerSubscription()
                    reject(e)
                }

                workerSubscription = worker$.subscribe(workerSub, workerError)

                worker$.post(REQ)
            }
        )
    }
}