module.exports = {
    buttonaccent: process.env.COOKIEMESSAGE_BUTTON_ACCENT_COLOR || process.env.ACCENT_COLOR || `#59a2d8`,
    styles: process.env.COOKIEMESSAGE_STYLES || ``,
    buttontext: process.env.COOKIEMESSAGE_BUTTON_TEXT || `Continue`,
    buttonbounce: process.env.COOKIEMESSAGE_BUTTON_BOUNCE || true,
    buttonripple: process.env.COOKIEMESSAGE_BUTTON_RIPPLE || true,
    message: process.env.COOKIEMESSAGE_MESSAGE || `By clicking "${process.env.COOKIEMESSAGE_BUTTON_TEXT || `Continue`}" or continuing to use our site, you acknowledge that you accept our use of cookies, which are used to provide you with the best possible experience and no personal information is stored.`,

    // SASS VARS
    sass: {
        cookiemessage_border_radius: process.env.COOKIEMESSAGE_BORDER_RADIUS || process.env.BORDER_RADIUS || `2px`,
        cookiemessage_color: process.env.COOKIEMESSAGE_COLOR || process.env.PRIMARY_BACKGROUND_COLOR || `#fff`,
        cookiemessage_background_color: process.env.COOKIEMESSAGE_BACKGROUND_COLOR || process.env.PRIMARY_COLOR || `#333`,
        cookiemessage_box_shadow: process.env.COOKIEMESSAGE_BOX_SHADOW || `inset 0px -2px 0px rgba(0,0,0,0.13), inset 0px 0px 0px 1px rgba(0,0,0,0.25)`,
    }
}