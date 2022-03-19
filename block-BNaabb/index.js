
const http = require('http');

const server = http.createServer(handleRequests)

function handleRequests(req,res){
    req.on('data', (chunk) => {
        res.write(chunk)
    })

    req.on('end', () => {
        res.end()
    })
}

server.listen("4000", () => {
    console.log(`Server is listening on port 4000`)
})
