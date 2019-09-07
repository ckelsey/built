module.exports = {
    arrow: process.env.DROPDOWNSELECT_ARROW || `right`,
    disabled: process.env.DROPDOWNSELECT_DISABLED || null,
    disablefilter: process.env.DROPDOWNSELECT_DISABLE_FILTER !== undefined ? process.env.DROPDOWNSELECT_DISABLE_FILTER : false,
    emptyoption: process.env.DROPDOWNSELECT_EMPTYOPTION || `Select...`,
    formatlabel: process.env.DROPDOWNSELECT_FORMAT_LABEL || function (v) { return v.label },
    formatvaluelabel: process.env.DROPDOWNSELECT_FORMAT_VALUE_LABEL || function (v) { return v.label },
    formatvalue: process.env.DROPDOWNSELECT_FORMAT_VALUE || function (v) { return v.value },
    hideonfilter: process.env.DROPDOWNSELECT_HIDE_ON_FILTER !== undefined ? process.env.DROPDOWNSELECT_HIDE_ON_FILTER : true,
    multiple: process.env.DROPDOWNSELECT_MULTIPLE !== undefined ? process.env.DROPDOWNSELECT_MULTIPLE : false,
    name: process.env.DROPDOWNSELECT_NAME || null,
    native: process.env.DROPDOWNSELECT_NATIVE !== undefined ? process.env.DROPDOWNSELECT_NATIVE : false,
    options: process.env.DROPDOWNSELECT_OPTIONS || [],
    readonly: process.env.DROPDOWNSELECT_READONLY || null,
    required: process.env.DROPDOWNSELECT_REQUIRED || null,
    styles: process.env.DROPDOWNSELECT_STYLES || ``,
    tabindex: process.env.DROPDOWNSELECT_TABINDEX || null,
    value: process.env.DROPDOWNSELECT_FORMAT || ``,

    // SASS VARS
    sass: {
        dropdownselect_accent_color: process.env.DROPDOWNSELECT_ACCENT_COLOR || process.env.ACCENT_COLOR || `#59a2d8`,
        dropdownselect_disabled_opacity: process.env.DROPDOWNSELECT_DISABLED_OPACITY || `0.25`,
        dropdownselect_option_background_color: process.env.DROPDOWNSELECT_OPTION_BACKGROUND_COLOR || process.env.PRIMARY_BACKGROUND_COLOR || `#fafafa`,
        dropdownselect_option_color: process.env.DROPDOWNSELECT_OPTION_COLOR || process.env.PRIMARY_COLOR || `inherit`,
        dropdownselect_option_hover_background_color: process.env.DROPDOWNSELECT_OPTION_HOVER_BACKGROUND_COLOR || process.env.DROPDOWNSELECT_ACCENT_COLOR || process.env.ACCENT_COLOR || `#59a2d8`,
        dropdownselect_option_hover_color: process.env.DROPDOWNSELECT_OPTION_HOVER_COLOR || process.env.ACCENT_OFFSET_COLOR || `#fff`,
        dropdownselect_option_active_background_color: process.env.DROPDOWNSELECT_OPTION_ACTIVE_BACKGROUND_COLOR || process.env.DROPDOWNSELECT_ACCENT_COLOR || process.env.ACCENT_COLOR || `#59a2d8`,
        dropdownselect_option_active_color: process.env.DROPDOWNSELECT_OPTION_ACTIVE_COLOR || process.env.ACCENT_OFFSET_COLOR || `#fff`,
    }
}