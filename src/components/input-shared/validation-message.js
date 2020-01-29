import { Get } from '../../utils/get.js'
import { matchInputMessage } from './match-input-message.js'

export const validationMessage = host => ({
    get() { return Get(host, `input.validationMessage`, ``, message => message ? message : matchInputMessage(host)) }
})