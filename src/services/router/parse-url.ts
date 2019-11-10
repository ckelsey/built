import ValidateHtml from '../../utils/validate/html'

const parseUrl = url => typeof url === `string`
    ? ValidateHtml(url.split(`?`)[0]).sanitized // prevent XSS
    : !!url.pathname
        ? ValidateHtml(url.pathname).sanitized // prevent XSS
        : ``

export default parseUrl