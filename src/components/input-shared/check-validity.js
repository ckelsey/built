import { Get } from '../../utils/get.js'

export function checkValidity(host) {
    return Get(host, 'validity.valid')
}