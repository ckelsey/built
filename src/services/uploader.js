import { ToObject } from '../utils/to-object.js'
import { ObserveWorker } from '../utils/observe-worker.js'
import { UseIf } from '../utils/use-if.js'

// TODO pako is not so great, minimal size savings. Is there anything else?
// const pako = require('../lib/pako/dist/pako.min.js')
// var reader = new FileReader();
// reader.onload = function () {
//     var compressed_file = pako.deflate(this.result, { level: 5 });
//     var myBlob = new Blob([compressed_file], { type: 'application/x-gzip' })
//     // Pass it back to the main thread
// }
// reader.readAsArrayBuffer(fileObject)

// TODO API get urls
// TODO API save to disc
// TODO API stitch
// TODO check is there has been progress already, resume

// TODO pre upload chunk function?
// TODO pre upload function?

function emptyFn() { }

export function UploadService(options, file) {

    if (!file) {
        return {
            upload: function () { },
            cancel: function () { }
        }
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
        return file[0] ? file[0] : file
    }

    function getTotal(file, bytesPerChunk) {
        return !!bytesPerChunk && bytesPerChunk > 0 ? Math.ceil(file.size / bytesPerChunk) : 1
    }

    const uploadMessages = []
    const completedChunks = []
    const fileObject = getFile()
    const size = fileObject.size
    const total = getTotal(fileObject, Options.bytesPerChunk)
    const uploadData = Object.assign({},
        Options,
        { size: size, total: total, fileObject: fileObject }
    )

    let stop = false
    let chunkIndex = 0

    const worker$ = ObserveWorker(function workerFunction() {
        self.onmessage = function (e) {
            const data = JSON.parse(e.data)
            const x = new XMLHttpRequest()

            x.open(data.method, data.url, true)
            x.withCredentials = data.withCredentials

            function headersEach(key) {
                return x.setRequestHeader(key, data.headers[key])
            }

            Object.keys(data.headers).forEach(headersEach)

            x.onloadend = function () {
                self.postMessage(JSON.stringify({
                    response: x.response,
                    statusText: x.statusText,
                    status: x.status
                }))
            }

            x.send(data.data)
        }
    })

    function setProgress() {

        return Options.progressCB(
            UseIf(
                function progValid(p) { return p <= 1 },
                function elseNot() { return 1 },
                uploadData.total === 1
                    ? 1
                    : !completedChunks.length
                        ? 0
                        : Math.ceil((completedChunks.length / uploadData.total) * 100) / 100
            ).value
        )
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
        return uploadData.total === 1 ?
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
        // If no event, reject
        if (!e) { return Promise.reject() }

        const data = ToObject(e).value

        if (data.status !== 200) { return Promise.reject(data.statusText) }

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
        if (!e) { return Promise.reject() }

        const data = ToObject(e).value

        if (data.status !== 200) { return Promise.reject(data.statusText) }

        completedChunks.push(index)
        uploadMessages.push({ chunk: index, data: data })

        // update progress
        setProgress()

        return Promise.resolve()
    }

    function uploadChunk(index) {
        return new Promise(
            function uploadChunkPromise(resolve, reject) {
                if (stop) { return reject('upload was canceled') }

                return worker$.post(populateData(index))
                    .then(onChunkUploaded)
                    .then(resolve)
                    .catch(reject)
            }
        )
    }

    function uploadChunkAsync(index) {
        return new Promise(
            function uploadChunkAsyncPromise(resolve, reject) {
                if (stop) { return reject('upload was canceled') }

                return worker$.post(populateData(index))
                    .then(function populateDataResult(res) {
                        return onChunkUploadedAsync(index, res)
                    })
                    .then(resolve)
                    .catch(reject)
            }
        )
    }

    const methods = {
        cancel: function () { stop = true },

        upload: function () {
            if (!uploadData.size || !uploadData.total) {
                worker$.dispose()
                return Options.errorCB('invalid file')
            }

            if (!uploadData.url) {
                worker$.dispose()
                return Options.errorCB('invalid upload url')
            }

            if (stop) {
                worker$.dispose()
                return Options.errorCB('upload stopped')
            }

            if (!uploadData.parallel) {
                return uploadChunk(chunkIndex)
                    .then(Options.completeCB)
                    .catch(Options.errorCB)
            }

            const chunkArray = []
            let index = 0

            while (index < uploadData.total) {
                chunkArray.push(index)
                index = index + 1
            }

            function chunkMapper(c) {
                return uploadChunkAsync(c)
            }

            function chunkMapAfter() {
                return Options.completeCB(uploadMessages)
            }

            return Promise.all(chunkArray.map(chunkMapper))
                .then(chunkMapAfter)
                .catch(Options.errorCB)

        }
    }

    Object.defineProperty(methods, 'currentChunk', {
        get: function () {
            return chunkIndex
        }
    })

    return methods
}

window.UploadService = UploadService