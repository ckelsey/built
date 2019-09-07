module.exports = {
    accentcolor: process.env.BUTTONELEMENT_ACCENT_COLOR || process.env.ACCENT_COLOR || `#59a2d8`,
    bounce: process.env.BUTTONELEMENT_BOUNCE !== undefined ? process.env.BUTTONELEMENT_BOUNCE : true,
    ripple: process.env.BUTTONELEMENT_RIPPLE !== undefined ? process.env.BUTTONELEMENT_RIPPLE : true,
    styles: process.env.BUTTONELEMENT_STYLES || ``,

    // SASS VARS
    sass: {
        buttonelement_border_radius: process.env.BUTTONELEMENT_BORDER_RADIUS || process.env.BORDER_RADIUS || `2px`,
        buttonelement_color: process.env.BUTTONELEMENT_COLOR || process.env.ACCENT_OFFSET_COLOR || `inherit`,
        buttonelement_background_color: process.env.BUTTONELEMENT_BACKGROUND_COLOR || process.env.ACCENT_COLOR || `#fafafa`,
        buttonelement_hover_background_color: process.env.BUTTONELEMENT_HOVER_BACKGROUND_COLOR || process.env.PRIMARY_COLOR || `#fff`,
        buttonelement_hover_color: process.env.BUTTONELEMENT_HOVER_COLOR || process.env.PRIMARY_BACKGROUND_COLOR || `inherit`,
        buttonelement_box_shadow: process.env.BUTTONELEMENT_BOX_SHADOW || `inset 0px -2px 0px rgba(0,0,0,0.13), inset 0px 0px 0px 1px rgba(0,0,0,0.25)`,
        buttonelement_hover_box_shadow: process.env.BUTTONELEMENT_HOVER_BOX_SHADOW || `inset 0px -2px 0px rgba(0,0,0,0.13), inset 0px 0px 0px 1px rgba(0,0,0,0.25), 0px 10px 9px -6px rgba(0,0,0,0.2)`,
    }
}