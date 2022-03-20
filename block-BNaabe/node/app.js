const http = require('http');

const server = http.createServer(handleRequests);

function handleRequests(req,res){
    let store = ''
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        res.statusCode = 201;
        let captain = JSON.parse(store).captain
        res.end(captain)
    })
}

server.listen(3000,() => {
    console.log('Server is listening on 3000');
})