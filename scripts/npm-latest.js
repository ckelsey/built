const fs = require(`fs`)
const path = `${__dirname}/../package.json`
const Package = JSON.parse(fs.readFileSync(path))
const populate = type => {
    Object.keys(Package[type]).forEach(key => {
        Package[type][key] = `latest`
    })
}

populate(`devDependencies`)
populate(`dependencies`)

fs.writeFileSync(path, JSON.stringify(Package))
process.exit(0)