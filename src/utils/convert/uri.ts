import { TMonad } from '.'
import { Tmonad } from './t-monad'
import { getType } from '../type'

export const doURI: (v: any, e?: boolean, c?: boolean) => TMonad = (value, encode = false, component = false) => {
    const result = Tmonad(value)

    if (result.stop) { return result }

    try {
        if (encode) {
            if(component){
                result.value = encodeURIComponent(result.value)
            }else{
                result.value = encodeURI(result.value)
            }
        } else {
            if(component){
                result.value = decodeURIComponent(result.value)
            }else{
                result.value = decodeURI(result.value)
            }
        }
    } catch (error) {
        result.valid = false
    }

    result.type = getType(result.value)
    result.instanceof.push(encode ? `encodeUri` : `decodeUri`)

    return result
}

export const EncodeUri = value => doURI(value, true)
export const DecodeUri = value => doURI(value)
export const EncodeUriComponent = value => doURI(value, true, true)
export const DecodeUriComponent = value => doURI(value, false, true)