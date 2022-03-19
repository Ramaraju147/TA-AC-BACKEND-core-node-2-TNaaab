const http = require('http');
const qs = require('querystring')

const server = http.createServer(handleRequests)

function writeResponse(req,res,data){
    let store = ''
    req.on('data', (chunk) => {
        store += chunk
    })
    if(data == 'json'){
        req.on('end', () => {
            console.log(store);
            res.end(store)
        })
    }else if (data == 'form'){
        req.on('end', () => {
            console.log(store);
            let parsedFormData = JSON.stringify(qs.parse(store))
            console.log(parsedFormData)
            res.end(parsedFormData)
        })
    }


}


function handleRequests(req,res){

    if(req.url === '/json'){
        writeResponse(req,res,'json')
    }

    if(req.url === '/form'){
        writeResponse(req,res,'form')
    }
}

server.listen(7000, () => {
    console.log('Server is running on port 7000')
})