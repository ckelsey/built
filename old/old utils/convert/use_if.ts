import { Tmonad } from "./t-monad";

const UseIf = (condition, ifNot, value) => Tmonad(condition(value) ? value : ifNot(value))
export default UseIf