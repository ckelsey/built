module.exports = {
    amount: process.env.EFFECTSCALE_AMOUNT || -1,
    speed: process.env.EFFECTSCALE_SPEED || 333,
    end: process.env.EFFECTSCALE_END || null,
    start: process.env.EFFECTSCALE_START || `mousedown`,
    scaled: process.env.EFFECTSCALE_SCALED || null,
    spring: process.env.EFFECTSCALE_SPRING || 4,
    startfrom: process.env.EFFECTSCALE_STARTFROM || `center`,
    x: process.env.EFFECTSCALE_X || false,
    y: process.env.EFFECTSCALE_Y || false,
    sass: {}
}