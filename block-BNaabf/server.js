const http = require('http');
const fs = require('fs');
const qs = require('querystring')

const server = http.createServer(handleRequests);

function handleRequests(req,res){
    if(req.method == 'GET'){
        res.setHeader('Content-type','text/html');
        fs.createReadStream('./form.html').pipe(res)
    }else if(req.method == 'POST'){
        let store = ''
        req.on('data', (chunk) => {
            store+= chunk;
        })
        req.on('end', () => {
            let parsedData = qs.parse(store)
            res.end(JSON.stringify(parsedData))
        })
    }

}

server.listen(4000,() => {
    console.log('Server is listening on port 4000')
})