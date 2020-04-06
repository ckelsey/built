import { ObserveWorker } from '../utils/observe-worker'

// TODO API get urls
// TODO API stitch
// TODO resume

function emptyFn() { }

function parse(data) {
    let result = data
    try { result = JSON.parse(data) } catch (error) { }
    return result
}

export default function Uploader(options, file) {
    const methods = {}

    const rejectedUpload = (status, error) => {
        methods.cancel = () => { }
        methods.upload = () => Promise.reject({ error, status })
        return methods
    }

    const Options = Object.assign({}, {
        progressCB: emptyFn,
        completeCB: emptyFn,
        errorCB: emptyFn,
        url: location.href,
        bytesPerChunk: 647212,
        withCredentials: false,
        uploadMethod: 'POST',
        headers: {},
        parallel: false
    }, options)

    function getFile() {
        if (file instanceof Blob || file instanceof File) {
            return file
        }

        if (file instanceof FileList) {
            return file[0]
        }
    }

    function getTotal(file, bytesPerChunk) {
        return !!bytesPerChunk && bytesPerChunk > 0 ? Math.ceil(file.size / bytesPerChunk) : 1
    }

    const uploadMessages = []
    const completedChunks = []
    const fileObject = getFile()
    const size = fileObject ? fileObject.size : 0
    const total = fileObject ? getTotal(fileObject, Options.bytesPerChunk) : 0
    const uploadData = Object.assign({},
        Options,
        { size: size, total: total, fileObject: fileObject }
    )

    /** TEMP */
    // uploadData.total = 5
    // uploadData.size = uploadData.total * uploadData.bytesPerChunk
    // uploadData.fileObject = 'hey'
    // uploadData.url = 'hey'
    /** END TEMP */

    let stop = false
    let chunkIndex = 0

    Object.defineProperty(methods, 'currentChunk', {
        get: function () {
            return chunkIndex
        }
    })

    Object.defineProperty(methods, 'data', {
        get: function () {
            return uploadData
        }
    })

    if (!uploadData.fileObject || !uploadData.size || !uploadData.total) {
        uploadData.errorCB('invalid file')
        return rejectedUpload(-1, 'Invalid file')
    }

    if (!uploadData.url) {
        uploadData.errorCB('Invalid upload url')
        return rejectedUpload(-1, 'Invalid upload url')
    }

    const worker$ = ObserveWorker(function workerFunction() {
        self.onmessage = function (e) {
            let data = e.data

            try {
                data = JSON.parse(e.data)
            } catch (error) { }

            const x = new XMLHttpRequest()

            x.open(data.method, data.url, true)
            x.withCredentials = data.withCredentials

            function headersEach(key) {
                return x.setRequestHeader(key, data.headers[key])
            }

            Object.keys(data.headers).forEach(headersEach)

            x.onloadend = function () {
                let response = ''

                try {
                    response = JSON.stringify({
                        response: x.response,
                        statusText: x.statusText,
                        status: x.status
                    })
                } catch (error) { }

                self.postMessage(response)
            }

            x.send(data.data)
        }
    })

    function setProgress() {
        const currentProgress = uploadData.total == 1 ?
            1 :
            !completedChunks.length ?
                0 :
                Math.ceil((completedChunks.length / uploadData.total) * 100) / 100

        return uploadData.progressCB(currentProgress <= 1 ? currentProgress : 1)
    }

    function getHeaders(index, chunkSize, fileSize) {
        return Object.assign({}, {
            'Content-Type': 'application/octet-stream',
            'X-Chunk-Id': index,
            'X-Chunk-Length': chunkSize,
            'X-File-Length': fileSize
        }, uploadData.headers)
    }

    function uploadUrl(index, url) {
        return !Array.isArray(url) ? url : url[index]
    }

    function getChunk(index) {
        return uploadData.total == 1 ?
            uploadData.fileObject :
            uploadData.fileObject.slice(index * uploadData.bytesPerChunk, (index + 1) * uploadData.bytesPerChunk)
    }

    function populateData(index) {
        const data = getChunk(index)
        return {
            data: data,
            url: uploadUrl(index, uploadData.url),
            method: uploadData.uploadMethod,
            withCredentials: uploadData.withCredentials,
            headers: getHeaders(index, data.size, uploadData.fileObject.size),
        }
    }

    function onChunkUploaded(e) {
        if (!e) { return Promise.reject({ status: 500, error: 'An error occured during upload, please try again' }) }

        const data = parse(e)

        if (data.status !== 200) { return Promise.reject({ status: data.status, error: 'An error occured during upload, please try again' }) }

        completedChunks.push(chunkIndex)
        uploadMessages.push({ chunk: chunkIndex, data: data })

        // increment current chunk index
        chunkIndex = chunkIndex + 1

        // update progress
        setProgress()

        // if more chunks to upload
        if (chunkIndex < uploadData.total) {
            return uploadChunk(chunkIndex)
        } else {
            worker$.dispose()
            return Promise.resolve()
        }
    }

    function onChunkUploadedAsync(index, e) {
        if (!e) { return Promise.reject({ status: 500, error: 'An error occured during upload, please try again' }) }

        const data = parse(e)

        if (data.status !== 200) { return Promise.reject({ status: data.status, error: 'An error occured during upload, please try again' }) }

        completedChunks.push(index)
        uploadMessages.push({ chunk: index, data: data })

        setProgress()

        return Promise.resolve()
    }

    function uploadChunk(index) {
        return new Promise(
            function uploadChunkPromise(resolve, reject) {
                if (stop) { return reject({ status: 1000, error: 'Upload was canceled' }) }

                const toSend = populateData(index)

                return worker$.post(toSend)
                    .then(onChunkUploaded)
                    .then(resolve)
                    .catch(reject)
            }
        )
    }

    function uploadChunkAsync(index) {
        return new Promise(
            function uploadChunkAsyncPromise(resolve, reject) {
                if (stop) { return reject({ status: 1000, error: 'Upload was canceled' }) }

                const toSend = populateData(index)

                return worker$.post(toSend)
                    .then(function populateDataResult(res) {
                        return onChunkUploadedAsync(index, res)
                    })
                    .then(resolve)
                    .catch(reject)
            }
        )
    }

    function upload() {
        if (stop) {
            worker$.dispose()
            uploadData.errorCB('Upload was canceled')
            return Promise.reject({ status: 1000, error: 'Upload was canceled' })
        }

        uploadData.progressCB(0)

        if (!uploadData.parallel) {
            return uploadChunk(chunkIndex)
                .then(res => uploadData.completeCB(res))
                .catch(res => uploadData.errorCB(res))
        }

        const chunkArray = []
        let index = 0

        while (index < uploadData.total) {
            chunkArray.push(index)
            index = index + 1
        }

        return Promise.all(chunkArray.map(c => uploadChunkAsync(c)))
            .then(uploadMessages => uploadData.completeCB(uploadMessages))
            .catch(res => uploadData.errorCB(res))
    }

    methods.cancel = () => stop = true
    methods.upload = upload

    // function fakeUpload(totalModifier) {
    //     return new Promise((resolve, reject) => {
    //         uploadData.progressCB(0)

    //         let i = 0
    //         const run = () => {
    //             if (stop) {
    //                 uploadData.errorCB('Upload was canceled')
    //                 return reject({ status: 1000, error: 'Upload was canceled' })
    //             }

    //             if (i == (uploadData.total + (totalModifier || 0))) {
    //                 uploadData.completeCB('fakeUpload done')
    //                 return resolve('fakeUpload done')
    //             }

    //             i = i + 1

    //             uploadData.progressCB(Math.round((i / uploadData.total) * 100))

    //             setTimeout(run, 1234)
    //         }

    //         run()
    //     })
    // }
    // methods.upload = fakeUpload

    // function fakeUploadThenError() {
    //     return new Promise((_resolve, reject) => {
    //         return fakeUpload(-2)
    //             .then(() => { throw new Error() })
    //             .catch(() => reject({ status: 500, error: 'Oops, aww shucks' }))
    //     })
    // }
    // methods.upload = fakeUploadThenError

    return methods
}