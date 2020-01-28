import { ValidateHtml } from '../..'

const parseUrl = url => {
    const validated = typeof url === `string`
        ? ValidateHtml(url.split(`?`)[0]).sanitized // prevent XSS
        : url.pathname
            ? ValidateHtml(url.pathname).sanitized // prevent XSS
            : ``

    return validated.length > 1 && validated[validated.length - 1] === `/` ? validated.slice(0, validated.length - 1) : validated
}

export default parseUrl