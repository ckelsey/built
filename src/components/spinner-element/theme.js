module.exports = {
    page: process.env.SPINNERELEMENT_PAGE || false,
    scrim: process.env.SPINNERELEMENT_SCRIM || false,
    blur: process.env.SPINNERELEMENT_BLUR || 0,
    color: process.env.SPINNERELEMENT_COLOR || process.env.ACCENT_COLOR || `#fff`,
    scrimcolor: process.env.SPINNERELEMENT_SCRIMCOLOR || `rgba(0,0,0,0.62)`,
    scrimopacity: process.env.SPINNERELEMENT_SCRIMOPACITY || 1,
    speed: process.env.SPINNERELEMENT_SPEED || 1000,
    styles: process.env.SPINNERELEMENT_STYLES || ``,
    visible: process.env.SPINNERELEMENT_VISIBLE || false,
    type: process.env.SPINNERELEMENT_TYPE || `column`,
    sass: {}
}