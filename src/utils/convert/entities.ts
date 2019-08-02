import { TMonad } from '.'
import { Tmonad } from './t-monad'

export const ToEntities: (v: any) => TMonad = value => {
    const result = Tmonad(value)

    if(result.stop){ return result }

    if (result.type === `string`) {
        result.value = result.value
            .replace(/\&/g, `&amp;`)
            .replace(/\>/g, `&gt;`)
            .replace(/\</g, `&lt;`)
            .replace(/"/g, `&quot;`)
            .replace(/`/g, `&apos;`)
        result.valid = true
    } else {
        result.valid = false
    }

    result.instanceof.push(`ToEntities`)

    return result
}

export const FromEntities: (v: any) => TMonad = value => {
    const result = Tmonad(value)

    if(result.stop){ return result }

    if (result.type === `string`) {

        result.value = result.value
            .replace(/&amp;/g, `&`)
            .replace(/&lt;/g, `<`)
            .replace(/&gt;/g, `>`)
            .replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g, `"`)
            .replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g, `'`)

        result.valid = true
    } else {
        result.valid = false
    }

    result.instanceof.push(`FromEntities`)

    return result
}