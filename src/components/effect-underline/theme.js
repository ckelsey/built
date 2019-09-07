module.exports = {
    color: process.env.EFFECTUNDERLINE_COLOR || process.env.ACCENT_COLOR || `#59a2d8`,
    direction: process.env.EFFECTUNDERLINE_DIRECTION || `auto`,
    opacity: process.env.EFFECTUNDERLINE_OPACITY || 0.2,
    speed: process.env.EFFECTUNDERLINE_SPEED || 700,
    spring: process.env.EFFECTUNDERLINE_SPRING || 4,
    end: process.env.EFFECTUNDERLINE_END || null,
    start: process.env.EFFECTUNDERLINE_START || `mousedown`,
    styles: process.env.EFFECTUNDERLINE_STYLES || ``,
    sass: {
        effectunderline_background: process.env.EFFECTUNDERLINE_COLOR || process.env.ACCENT_COLOR || `#59a2d8`,
    }
}