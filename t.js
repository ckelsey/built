const http = require(`http`)
const port = 3000

const requestHandler = (request, response) => {
    console.log(request.url)
    const chunks = []

    request.on(`data`, c => chunks.push(c))
    request.on(`end`, () => {
        const body = Buffer.from(chunks.join(``)).toString()
        console.log(` `)
        console.log(`========================`)
        console.log(body)
        console.log(`========================`)
        console.log(` `)
        response.setHeader(`Access-Control-Allow-Origin`, `*`)
        response.setHeader(`Access-Control-Request-Method`, `*`)
        response.setHeader(`Access-Control-Allow-Methods`, `OPTIONS, GET`)
        response.setHeader(`Access-Control-Allow-Headers`, `*`)
        response.writeHead(200)
        response.end(`Hello Node.js Server!`)
    })
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log(`something bad happened`, err)
    }

    console.log(`server is listening on ${port}`)
})