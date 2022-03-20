// Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>

// Q. Follow above question with form data containing fields i.e name and email. 
// - Parse form-data using `querystring` module
// - respond with HTML page containing only email from data in H2 tag.

// #### Note:- 
// Make sure to convert objects into strings using `JSON.stringify` before passing the data through response.

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
            let parsedFormData = qs.parse(store)
            let html = `<h1>${parsedFormData.name}</h1>
            <h2>${parsedFormData.age}</h2>`
            res.setHeader('Content-type','text/html')
            res.end(html)
    })
}

server.listen(9001,() => {
    console.log('Server is listening on 9001');
})