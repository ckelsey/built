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
        const headers = REQ.headers ? Object.keys(REQ.headers).map(key => `xhr.setRequestHeader(${key}, ${REQ.headers[key]});`) : ``
        const fnString = `
        self.onmessage = function(){
            var xhr = new XMLHttpRequest();
            xhr.open('${REQ.method}', ${REQ.path}, false);
            ${ headers}
            xhr.onload = () => postMessage({ status: xhr.status, response: xhr.responseText });
            xhr.onerror = () => postMessage({ status: xhr.status, response: xhr.responseText });
            xhr.send(e.data);
        }`
        const blobURL = window.URL.createObjectURL(new Blob([fnString]))
        const worker = new Worker(blobURL)

        worker.onmessage = (e) => {
            let res = e.data.response
            try { res = JSON.parse(res) } catch (error) { }

            if (e.data.status === 200) {
                return resolve(res)
            } else {
                return reject(res)
            }
        }

        worker.postMessage(REQ.data)
    })
}

export default Request