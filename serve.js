const https = require(`https`)
const fs = require(`fs`)
const path = require(`path`)

const options = {
    key: fs.readFileSync(`selfsigned.key`),
    cert: fs.readFileSync(`selfsigned.crt`)
}

const indexHTML = fs.readFileSync(`./index.html`).toString()

https.createServer(options, (req, res) => {
    let filePath = `.${req.url === `/` ? `/index.html` : req.url}`
    let extname = String(path.extname(filePath)).toLowerCase()

    const mimeTypes = {
        '.html': `text/html`,
        '.js': `text/javascript`,
        '.css': `text/css`,
        '.json': `application/json`,
        '.ico': `image/x-icon`,
        '.png': `image/png`,
        '.jpg': `image/jpg`,
        '.gif': `image/gif`,
        '.svg': `image/svg+xml`,
        '.wav': `audio/wav`,
        '.mp4': `video/mp4`,
        '.woff': `application/font-woff`,
        '.ttf': `application/font-ttf`,
        '.eot': `application/vnd.ms-fontobject`,
        '.otf': `application/font-otf`,
        '.wasm': `application/wasm`
    }

    const contentType = mimeTypes[extname]

    if (filePath === `./index.html`) {
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(indexHTML, `utf-8`)
        return
    }

    fs.readFile(filePath, (error, content) => {

        if (typeof content === `object` && [
            `image/x-icon`,
            `image/png`,
            `image/jpg`,
            `image/gif`,
            `image/svg+xml`,
            `audio/wav`,
            `video/mp4`
        ].indexOf(contentType) === -1) {
            content = Buffer.from(content).toString()
        }

        if (error) {
            if (error.code == `ENOENT`) {
                res.writeHead(200, { 'Content-Type': contentType })
                res.end(indexHTML, `utf-8`)
                return
            } else {
                res.writeHead(500)
                res.end(JSON.stringify(error))
                return
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(content, `utf-8`)
        }
    })

}).listen(3000)