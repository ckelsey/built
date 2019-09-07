module.exports = {
    color: process.env.EFFECTRIPPLE_COLOR || process.env.ACCENT_COLOR || `#59a2d8`,
    opacity: process.env.EFFECTRIPPLE_OPACITY || 0.2,
    speed: process.env.EFFECTRIPPLE_SPEED || 600,
    start: process.env.EFFECTRIPPLE_START || `mousedown`,
    styles: process.env.EFFECTRIPPLE_STYLES || ``,
    sass: {
        effectripple_background: process.env.EFFECTRIPPLE_COLOR || process.env.ACCENT_COLOR || `#59a2d8`,
    }
}