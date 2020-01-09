/* eslint-disable tree-shaking/no-side-effects-in-initialization */
import { ToObject } from '../utils/to-object.js'
import { ObserveWorker } from '../utils/observe-worker.js'
import { UseIf } from '../utils/use-if.js'
// TODO pako is not so great, minimal size savings. Is there anything else?
// const pako = require('../lib/pako/dist/pako.min.js')
// var reader = new FileReader();
// reader.onload = function () {
//     var compressed_file = pako.deflate(this.result, { level: 5 });
//     var myBlob = new Blob([compressed_file], { type: `application/x-gzip` })
//     // Pass it back to the main thread
// }
// reader.readAsArrayBuffer(fileObject)

// TODO API get urls
// TODO API save to disc
// TODO API stitch
// TODO check is there has been progress already, resume

// TODO pre upload chunk function?
// TODO pre upload function?

export function UploadService(options, file) {

    if (!file) { return { upload() { }, cancel() { } } }

    const Options = Object.assign({}, {
        progressCB: () => { },
        completeCB: () => { },
        errorCB: () => { },
        url: location.href,
        bytesPerChunk: 647212,
        withCredentials: false,
        uploadMethod: `POST`,
        headers: {},
        parallel: false
    }, options)

    const getFile = () => file[0] ? file[0] : file
    const getTotal = (file, bytesPerChunk) => !!bytesPerChunk && bytesPerChunk > 0 ? Math.ceil(file.size / bytesPerChunk) : 1
    const uploadMessages = []
    const completedChunks = []
    const fileObject = getFile()
    const size = fileObject.size
    const total = getTotal(fileObject, Options.bytesPerChunk)
    const uploadData = Object.assign({},
        Options,
        { size, total, fileObject }
    )

    let stop = false
    let chunkIndex = 0

    const worker$ = ObserveWorker(function workerFunction() {
        self.onmessage = function (e) {
            const data = JSON.parse(e.data)
            const x = new XMLHttpRequest()

            x.open(data.method, data.url, true)
            x.withCredentials = data.withCredentials

            Object.keys(data.headers).forEach(key => x.setRequestHeader(key, data.headers[key]))

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

    const setProgress = () => Options.progressCB(
        UseIf(
            p => p <= 1,
            () => 1,
            uploadData.total === 1
                ? 1
                : !completedChunks.length
                    ? 0
                    : Math.ceil((completedChunks.length / uploadData.total) * 100) / 100
        ).value
    )

    const getHeaders = (index, chunkSize, fileSize) => {
        return Object.assign({}, {
            'Content-Type': `application/octet-stream`,
            'X-Chunk-Id': index,
            'X-Chunk-Length': chunkSize,
            'X-File-Length': fileSize
        }, uploadData.headers)
    }

    const uploadUrl = (index, url) => !Array.isArray(url) ? url : url[index]

    const getChunk = index => uploadData.total === 1 ? uploadData.fileObject : uploadData.fileObject.slice(index * uploadData.bytesPerChunk, (index + 1) * uploadData.bytesPerChunk)

    const populateData = index => {
        const data = getChunk(index)
        return {
            data,
            url: uploadUrl(index, uploadData.url),
            method: uploadData.uploadMethod,
            withCredentials: uploadData.withCredentials,
            headers: getHeaders(index, data.size, uploadData.fileObject.size),
        }
    }

    const onChunkUploaded = e => {
        // If no event, reject
        if (!e) { return Promise.reject() }

        const data = ToObject(e).value

        if (data.status !== 200) { return Promise.reject(data.statusText) }

        completedChunks.push(chunkIndex)
        uploadMessages.push({ chunk: chunkIndex, data })

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

    const onChunkUploadedAsync = (index, e) => {
        if (!e) { return Promise.reject() }

        const data = ToObject(e).value

        if (data.status !== 200) { return Promise.reject(data.statusText) }

        completedChunks.push(index)
        uploadMessages.push({ chunk: index, data })

        // update progress
        setProgress()

        return Promise.resolve()
    }

    const uploadChunk = index => new Promise((resolve, reject) => {
        if (stop) { return reject(`upload was canceled`) }

        return worker$.post(populateData(index))
            .then(onChunkUploaded)
            .then(resolve)
            .catch(reject)
    })

    const uploadChunkAsync = index => new Promise((resolve, reject) => {
        if (stop) { return reject(`upload was canceled`) }

        return worker$.post(populateData(index))
            .then(res => onChunkUploadedAsync(index, res))
            .then(resolve)
            .catch(reject)
    })

    const methods = {
        get currentChunk() { return chunkIndex },

        cancel() { stop = true },

        upload() {
            if (!uploadData.size || !uploadData.total) {
                worker$.dispose()
                return Options.errorCB(`invalid file`)
            }

            if (!uploadData.url) {
                worker$.dispose()
                return Options.errorCB(`invalid upload url`)
            }

            if (stop) {
                worker$.dispose()
                return Options.errorCB(`upload stopped`)
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

            return Promise.all(chunkArray.map(c => uploadChunkAsync(c)))
                .then(() => Options.completeCB(uploadMessages))
                .catch(Options.errorCB)

        }
    }

    return methods
}

window.UploadService = UploadService