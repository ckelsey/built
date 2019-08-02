import { GenericObjects, HTMLModel, Type, Validate, Pipe, Partial, Curry, Get, ObservableObject, SubjectObject } from './typings'
import Queue from './src/utils/queue'
import Convert from './src/utils/convert'
import Minify from './src/utils/minify'
import Worker from './src/utils/web-worker'
import Subject from './src/utils/subject'
import Observable from './src/utils/observable'

declare global {
    interface Window {
        IntegralUtils: {
            HTML: (elem?: any, tag?: string) => any
            Type: any
            Validate
            Timers
            Pipe
            Partial
            Curry
            Get
            Subject,
            Observable,
            Queue,
            Convert,
            Minify,
            Worker
        }
    }
}