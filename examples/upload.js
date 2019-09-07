const http = require('http')
const url = require('url')
const server = http.createServer().listen(1234)

server.on("request", (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Chunk-Id, X-Chunk-Length, X-File-Length')
    res.setHeader("Access-Control-Allow-Origin", "*")

    if (req.method.toLowerCase() === `options`) {
        res.statusCode = 200
        res.end()
        return
    }

    const buffers = []

    req
        .on('data', (chunk) => buffers.push(chunk))
        .on('end', () => {
            res.statusCode = 200
            res.write(JSON.stringify(req.headers))
            res.end()
        })
})