const path = require('path')
const fs = require('fs')
const svgo = require('svgo')
// const iconDir = path.resolve('./icons/flags')
const iconDir = path.resolve('./icons/flags2')
const countries = {}

require('../src/data/countries.json')
    .map(c => ({
        name: c.Country_Name,
        phone: c.Dial,
        code: (c.ISO3166_1_Alpha_2 || c.MARC || c.FIPS || ``).toLowerCase(),
        languages: (c.Languages || ``).split(`,`).map(c => c.trim()).filter(c => !!c)
    }))
    .filter(c => !!c.name && !!c.code)
    .forEach(c => {
        // countries[c.code] = c
        countries[c.name.toLowerCase().split(` `).join(`-`).split(`.`).join(``)] = c
    })

const moreCountries = require('../src/data/more_countries.json')
Object.keys(moreCountries)
    .forEach(Key => {
        const key = Key.toLowerCase()
        const arr = Object.keys(countries)
        const len = arr.length
        let i = 0
        while (i < len)
        {
            if (key === countries[arr[i]].code)
            {
                return countries[arr[i]].native = moreCountries[Key].native
            }
            i = i + 1
        }

        console.log(key)
    })


Promise.all(fs.readdirSync(iconDir).map(file => {
    // const code = file.split(`.`)[0]
    const name = file
        .split(`.`)[0]
        .replace(/\d+/g, '')
        .split(``)
        .map((c, i) => !i && c === `-` ? `` : c)
        .join(``)
        .trim()

    // if (countries[code])
    if (countries[name])
    {
        return new svgo({
            plugins: [{
                cleanupAttrs: true,
            }, {
                removeDoctype: true,
            }, {
                removeXMLProcInst: true,
            }, {
                removeComments: true,
            }, {
                removeMetadata: true,
            }, {
                removeTitle: true,
            }, {
                removeDesc: true,
            }, {
                removeUselessDefs: true,
            }, {
                removeEditorsNSData: true,
            }, {
                removeEmptyAttrs: true,
            }, {
                removeHiddenElems: true,
            }, {
                removeEmptyText: true,
            }, {
                removeEmptyContainers: true,
            }, {
                removeViewBox: false,
            }, {
                cleanupEnableBackground: true,
            }, {
                convertStyleToAttrs: true,
            }, {
                convertColors: true,
            }, {
                convertPathData: true,
            }, {
                convertTransform: true,
            }, {
                removeUnknownsAndDefaults: true,
            }, {
                removeNonInheritableGroupAttrs: true,
            }, {
                removeUselessStrokeAndFill: true,
            }, {
                removeUnusedNS: true,
            }, {
                cleanupIDs: true,
            }, {
                cleanupNumericValues: true,
            }, {
                moveElemsAttrsToGroup: true,
            }, {
                moveGroupAttrsToElems: true,
            }, {
                collapseGroups: true,
            }, {
                removeRasterImages: false,
            }, {
                mergePaths: true,
            }, {
                convertShapeToPath: true,
            }, {
                sortAttrs: true,
            }, {
                removeDimensions: true,
            }]
        }).optimize(fs.readFileSync(path.join(iconDir, file)))
            .then(svg => {
                // countries[code].svg = svg.data
                countries[name].svg = svg.data
            })
    } else
    {
        return Promise.resolve()
    }
}))
    .then(() => {
        const parsed = {}
        Object.keys(countries)
            .filter(c => !!countries[c].svg)
            .forEach(c => parsed[countries[c].code] = countries[c])
        fs.writeFileSync(path.resolve(`./src/data/countries_basic.json`), JSON.stringify(parsed))
        console.log(Object.keys(parsed).length)
    })
