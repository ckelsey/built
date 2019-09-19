import { GenericFunction, QueueClass } from '../../../typings'

class Queue implements QueueClass {
    public fn
    public queue = []

    constructor(fn: GenericFunction) {
        this.fn = fn
    }

    public add(item: any) {
        this.queue.push(item)
        this.run()
    }

    public run() {
        if (this.queue.length) {
            this.fn(this.queue.shift())
            this.run()
        }
    }
}

export default Queue
