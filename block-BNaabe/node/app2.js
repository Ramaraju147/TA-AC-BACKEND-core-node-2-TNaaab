const http = require('http');
const qs = require('querystring')

const server = http.createServer(handleRequests);

function handleRequests(req,res){
    let store = ''
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        let headers = req.headers['content-type']
        if(headers === 'application/json'){
        res.statusCode = 201;
        res.end(store)
        }else if(headers === 'application/x-www-form-urlencoded'){
            let parsedFormData = qs.parse(store)
            res.end(JSON.stringify(parsedFormData))
        }
    })
}

server.listen(9000,() => {
    console.log('Server is listening on 9000');
})