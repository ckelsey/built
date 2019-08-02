import Subject from '../subject'

const Workers = (fn) => {
    const fnString = `self.onmessage = ${fn.toString()}`
    const blobURL = window.URL.createObjectURL(new Blob([fnString]))
    // tslint:disable-next-line
    const worker = new Worker(blobURL)
    const subject = new Subject(null)
    const subscriptions = []

    worker.onmessage = (e) => {
        subject.next(e.data)
    }

    worker.onerror = (e) => {
        subject.error(e)
    }

    const post = (data) => {
        worker.postMessage(data)
    }

    const subscribe = (next, err?, complete?) => {
        const s = subject.subscribe(next, err, complete)
        subscriptions.push(s)
        return s
    }

    const unsubscribe = (s) => {
        const index = subscriptions.indexOf(s)
        subscriptions.splice(index, 1)
        s()

        if (subscriptions.length === 0) {
            worker.terminate()
        }
    }

    window.URL.revokeObjectURL(blobURL)

    return {
        post,
        subscribe,
        unsubscribe
    }
}

export default Workers
