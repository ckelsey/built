import { TMonad } from './t-monad.js'

export function UseIf(condition, ifNot, value) { return TMonad(condition(value) ? value : ifNot(value)) }