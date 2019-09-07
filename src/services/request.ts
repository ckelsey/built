import ObserveWorker from '../utils/observeWorker'

const Request = apiBase => reqData => {
    const base = apiBase
    const path = `${base}/${reqData.path || ''}`
    const REQ = Object.assign({}, {
        data: undefined,
        headers: {},
        method: `POST`
    },
        reqData, { path }
    )

    if (REQ.data && typeof REQ.data !== `string`) {
        REQ.data = JSON.stringify(REQ.data)
    }

    return new Promise((resolve, reject) => {
        const worker$ = ObserveWorker(
            function () {
                self.onmessage = function (e) {
                    var xhr = new XMLHttpRequest();
                    var data = JSON.parse(e.data)
                    xhr.open(data.method, data.path, false);
                    Object.keys(data.headers).forEach(key => xhr.setRequestHeader(key, data.headers[key]))
                    xhr.onload = () => postMessage({ status: xhr.status, response: xhr.responseText || xhr.statusText });
                    xhr.onerror = () => postMessage({ status: xhr.status, response: xhr.statusText });
                    xhr.send(data.data);
                }
            }
        )

        const workerSubscription = worker$.subscribe(
            e => {
                workerSubscription()
                let res = e.response
                try { res = JSON.parse(res) } catch (error) { }

                if (e.status === 200) {
                    return resolve(res)
                } else {
                    return reject(e)
                }
            },
            (e: any) => {
                workerSubscription()
                reject(e)
            }
        )

        worker$.post(REQ)
    })
}

export default Request