import { TMonad } from '../..'
export function UseIf(condition, ifNot, value) { return TMonad(condition(value) ? value : ifNot(value)) }