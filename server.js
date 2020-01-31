const fs = require(`fs`)
const https = require(`https`)
const port = 3000
const options = {
    key: fs.readFileSync(`ssl.key`, `utf8`),
    cert: fs.readFileSync(`ssl.crt`, `utf8`),
}

const requestHandler = (request, response) => {
    let payload = ``

    if (request.url === `/`) {
        payload = Buffer.from(fs.readFileSync(`lambda.html`, `utf8`)).toString()
    } else {
        try {
            payload = Buffer.from(fs.readFileSync(request.url)).toString()
        } catch (error) {
        }
    }

    response.setHeader(`Access-Control-Allow-Origin`, `*`)
    response.setHeader(`Access-Control-Request-Method`, `*`)
    response.setHeader(`Access-Control-Allow-Methods`, `OPTIONS, GET`)
    response.setHeader(`Access-Control-Allow-Headers`, `*`)
    response.writeHead(200)
    response.end(payload)
}

const server = https.createServer(options, requestHandler)

server.listen(port, (err) => {
    if (err) { return console.log(`something bad happened`, err) }
    console.log(`server is listening on ${port}`)
})