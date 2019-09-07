module.exports = {
    end: process.env.EFFECTFADE_END || null,
    opacity: process.env.EFFECTFADE_OPACITY || [0, 1],
    speed: process.env.EFFECTFADE_SPEED || 600,
    start: process.env.EFFECTFADE_START || `mousedown`,
    styles: process.env.EFFECTFADE_STYLES || ``,
    sass: {}
}