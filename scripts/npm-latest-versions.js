const fs = require(`fs`)
const spawn = require(`child_process`).spawn

const Package = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`))
const devDependencies = Object.keys(Package.devDependencies)
const dependencies = Object.keys(Package.dependencies)



const run = (keys, type, done) => {
    console.log(keys)
    console.log(type)
    const args = [`i`, type].concat(keys)
    console.log(args)
    const child = spawn(`npm`, args)
    child.stdout.on(`data`, function (data) { process.stdout.write(data.toString()) })
    child.stdout.on(`err`, function (data) { process.stdout.write(data.toString()) })
    child.on(`close`, function () {
        console.log(`done with`, type)
        if (done) {
            done()
        }
    })
}

const doDev = () => run(devDependencies, `--save-dev`, () => process.exit(0))

run(dependencies, `--save`, doDev)