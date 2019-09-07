module.exports = {
    align: process.env.OVERLAYCONTENT_ALIGN || `center`,
    from: process.env.OVERLAYCONTENT_FROM || `center`,
    widthbasis: process.env.OVERLAYCONTENT_WIDTHBASIS || `content`,
    speed: process.env.OVERLAYCONTENT_SPEED || 333,
    spring: process.env.OVERLAYCONTENT_SPRING || 4,
    end: process.env.OVERLAYCONTENT_END || null,
    start: process.env.OVERLAYCONTENT_START || `mousedown`,
    styles: process.env.OVERLAYCONTENT_STYLES || ``,
    sass: {}
}