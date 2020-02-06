import { Get } from '../../utils/get.js'
import { matchInputMessage } from './match-input-message.js'

export function validationMessage(host) {
    return {
        get: function () {
            return Get(
                host,
                'input.validationMessage',
                '',
                function (message) {
                    return message ? message : matchInputMessage(host)
                })
        }
    }
}