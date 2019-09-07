const countries = require('../../data/countries_basic.json')
const getPhoneCode = c => c.phone.split(`,`)[0].trim()
const label = c => `<span class="country-dropdown-option-label"><span class="country-dropdown-option-label-svg" style="background-image:url(data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(c.svg)))})"></span><span class="country-dropdown-option-label-name">${c.name}</span><span class="country-dropdown-option-label-code">${c.code}</span><span class="country-dropdown-option-label-phone">+${getPhoneCode(c)}</span></span>`

export const countryOptionsFormatter = (valueFn, labelFn) => Object.keys(countries)
    .map(c => ({
        value: valueFn(countries[c]),
        label: labelFn(countries[c])
    }))
    .filter(c => !!c.value && !!c.label)
    .sort((a, b) => a.value.name > b.value.name ? 1 : -1)

export const countryOptions = countryOptionsFormatter(c => c, label)

export const css = `.country-dropdown-option-label { display: flex; flex-wrap: nowrap; align-items: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } 
.country-dropdown-option-label>* { padding: 0em 0.25em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex-shrink: 1; } 
.country-dropdown-option-label-svg { display: flex; align-items: center; position:relative; height: 1.3em; margin-right:0.25em; width: 1.5em; background-repeat: no-repeat; background-size: cover; background-position: left 50%;} 
.country-dropdown-option-label-code { text-transform: uppercase; display: none; } 
.country-dropdown-option-label-phone { flex-shrink: 0; flex-grow: 1; } 
.country-dropdown-option-label-svg, .country-dropdown-option-label-name, .country-dropdown-option-label-phone { display: none; } 
.showcode .country-dropdown-option-label-code, .showlabelcode .country-dropdown-option-label-code, .showdropdowncode overlay-content .country-dropdown-option-label-code, .showcountry .country-dropdown-option-label-name, .showlabelcountry .country-dropdown-option-label-name, .showdropdowncountry overlay-content .country-dropdown-option-label-name, .showphone .country-dropdown-option-label-phone, .showlabelphone .country-dropdown-option-label-phone, .showdropdownphone overlay-content .country-dropdown-option-label-phone { display: block; } 
.showflag .country-dropdown-option-label-svg, .showlabelflag .country-dropdown-option-label-svg, .showdropdownflag overlay-content .country-dropdown-option-label-svg { display: flex; }`