import empty from './empty'

export default (val: any) => empty(val) || val === `false` || val === `undefined` || val === `null`
