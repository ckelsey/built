const path = require(`path`)
const fs = require(`fs`)
const root = path.join(__dirname, `..`)
const utils = path.join(root, `src`, `utils`)

fs.readdirSync(utils)
    .forEach(file => {
        const filePath = path.join(utils, file)

        if (fs.lstatSync(filePath).isDirectory()) {
            const index = path.join(filePath, `index.js`)
            const newIndex = path.resolve(`${filePath}.js`)
            // console.log(index, newIndex)
            // if (dirFiles.indexOf(`.DS_Store`) !== -1) {
            //     fs.unlinkSync(path.join(filePath, `.DS_Store`))
            // }

            // if (dirFiles.length > 1) {
            //     console.log(file, dirFiles)
            // }


            fs.renameSync(index, newIndex)
            fs
        }
    })