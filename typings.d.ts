import Observable from "./src/utils/observable"

export interface GenericObjects {
    [key: string]: any
}

export interface HTMLModel {
    element: any
    create: (attributes: GenericObjects, tag: string) => HTMLModel
    createAndAppend: (attributes: GenericObjects, tag: string) => HTMLModel
    append: (element: HTMLElement | HTMLModel) => HTMLModel
    insert: (element: HTMLElement, index: number) => HTMLModel
    appendTo: (Parent: HTMLElement) => HTMLModel
    insertIn: (Parent: HTMLElement, index: number) => HTMLModel
    remove: (element: HTMLElement | HTMLModel) => HTMLModel
    clear: () => HTMLModel
    getAttribute: (attrName: string) => any
    setAttribute: (attrName: string, value: any) => HTMLModel
    removeAttribute: (attrName: string) => HTMLModel
    elementSelector: () => string
    parent: () => HTMLModel
    find: (selector: string) => HTMLModel
    findAll: (selector: string) => HTMLModel[]
    findAt: (selector: string, index: number) => HTMLModel
    children: () => HTMLModel[]
    equals: (element: any) => boolean
    style: (styles: GenericObjects) => HTMLModel
    addClass: (clss: string) => HTMLModel
    removeClass: (clss: string) => HTMLModel
    classArray: () => string[]
    setText: (text: string) => HTMLModel
    setHtml: (html: string) => HTMLModel
    doIf: (fn: GenericFunction, condition: () => boolean | boolean) => HTMLModel
    addEvent: (name: string, fn: GenericFunction, bubble?: boolean) => HTMLModel
    removeEvent: (name: string, fn: GenericFunction, bubble?: boolean) => HTMLModel
    isDom: (el: any) => boolean
    instanceof: string
    isFocused: () => boolean
    isAutoFilled: () => boolean
    isValid: () => boolean,
    getInvalidMessage: () => string | undefined,
    getDimensions: () => {
        left: number
        right: number
        top: number
        bottom: number
        x: number
        y: number
        width: number
        height: number
    }
    svgTags: readonly string[]
    svgAttributes: readonly string[]
    htmlTags: readonly string[]
    htmlAttributes: readonly string[]
    xmlAttributes: readonly string[]
    events: readonly string[]
    value: () => any
    inputTypes: string[]
    updateAttribute: (name: string, val: any) => HTMLModel
}

export type ConvertData = {
    decodeUri: () => ConvertData
    encodeUri: () => ConvertData
    entities: () => ConvertData
    plainText: () => ConvertData
    jsoParse: () => ConvertData
    jsonString: () => ConvertData
    bind: (v: any) => ConvertData
    value: any
    jsonParse: () => ConvertData
    boolean: ConvertData
    array: ConvertData
    object: ConvertData
    number: ConvertData
    function: ConvertData
    ifEmpty: (v: any) => ConvertData
    ifInvalid: (v: any) => ConvertData
    ifNot: (c: any, v: any) => ConvertData
    valid: boolean
    date: () => ConvertData
}

export type ConvertFn = (data: any) => ConvertData

export type Partial = (func: GenericFunction, Args: any[]) => {
    args: any
    func: GenericFunction
    length: number
    set: (arg: any, index?: number) => Partial
    tap: () => Partial
    pipe: (x?: any) => Partial
    curry: (x?: any) => Partial
    bind: (x?: any) => Partial
}

export type Curry = (func: GenericFunction, cachedArgs: any[]) => any

export type Pipe = (...Function) => GenericFunction

export type Get = (obj: any, path: string, defaultValue: any) => any

export type ObserverNext = (newValue: any) => any
export type ObserverError = (error: any) => any
export type ObserverComplete = GenericFunction

export interface SubjectObject {
    state: any
    next: ObserverNext
    error: ObserverError
    complete: ObserverComplete
    subscribe: Subscribe
}

export type Subscriptions = { [key: string]: ObserverObject }
export type Subscribe = (ObserverNext, ObserverError, ObserverComplete) => () => Subscriptions

export interface SubscriptionObject {
    subscriptions: { [key: string]: ObserverObject }
    _subscribe: Subscribe
    _unsubscribe: (observer: ObserverClass) => () => Subscriptions
}

export interface ObserverObject {
    next: ObserverNext
    error: ObserverError
    complete: ObserverComplete
}

export interface ObserverClass extends ObserverObject {
    handler: ObserverObject
    isUnsubscribed: boolean
    id: string
    unsubscribe: () => void
}

export interface ObservableObject extends SubscriptionObject {
    isSharing: boolean
    fn: GenericFunction
    subscribe: Subscribe
    share: () => ObservableObject
    fromEvent: (element: HTMLElement, eventName: string, preventDefault?: boolean, stopPropagation?: boolean) => Observable
}

export interface TimeOutData {
    fn: GenericFunction
    time: number
}

export interface QueueClass {
    fn: GenericFunction
    queue: any[]
    add: (el: any) => void
    run: () => void
}

export type GenericFunction = (...v: any) => any

export interface Timers {
    triggerEvent: (eventName: string, data: any) => void
    subscribe: (eventName: string, data: GenericFunction | TimeOutData) => any
    unsubscribe: (This: any, eventName: string, index: number) => void
    closeTimer: (eventName: string) => void
    initTimer: (eventName: string, index?: number) => any
    cancelFrame: () => void
    runFrame: () => void
    cancelTimeout: (timer: any) => void
    runTimeout: (fn: any, time: number) => void
}

export interface ValidateResponse {
    original: any
    valid: boolean
    sanitized: any
    reason?: string[]
}

export interface Validate {
    email: (str: string, allowedHtmlTags?: string[], disallowedHtmlTags?: string[]) => ValidateResponse
    text: (str: string, allowedHtmlTags?: string[], disallowedHtmlTags?: string[]) => ValidateResponse
    html: (str: string, allowedHtmlTags?: string[], disallowedHtmlTags?: string[]) => ValidateResponse
}

export interface IntegralElementConfig {
    tag: string
    template: string
    style?: string
    shadow?: boolean
}

export interface Type {
    get: (val: any) => string
    primitives: string[]
    isPrimitive: (val: any) => boolean
    isArray: (val: any) => boolean
    isDate: (val: any) => boolean
    isObject: (val: any) => boolean
    empty: (val: any) => boolean
    anyEmpty: (val: any) => boolean
}