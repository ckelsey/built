export function IsMobile() {
    return (typeof window.orientation !== 'undefined') || (window.navigator.userAgent.indexOf('IEMobile') !== -1)
}
