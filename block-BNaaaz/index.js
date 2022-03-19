const http = require('http');
const fs = require('fs');

const server = http.createServer(handleRequests);

function handleRequests(req,res){
   const stream =  fs.createReadStream("reame.txt");
   stream.on('open',() => {
       stream.pipe(res)
   })

   stream.on('error', () => {
       stream.pipe(err);
   })
}

server.listen(4000,() => {
    console.log('Server is listening on port 4000');
})