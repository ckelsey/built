window.global = window.global || {}

const globalSymbols = Object.getOwnPropertySymbols(global)
const SingletonKey = Symbol.for(`builtjs.Singleton`)

if (globalSymbols.indexOf(SingletonKey) === -1) {
    window.global[SingletonKey] = function Singleton(key, func) {
        const KEY = Symbol.for(`builtjs.${key}`)

        if (globalSymbols.indexOf(KEY) === -1) {
            window.global[KEY] = func
        }

        return Object.freeze(window.global[KEY])
    }
}

export const Singleton = Object.freeze(window.global[SingletonKey])