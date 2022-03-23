const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const qs = require('querystring')

console.log(path.join(__dirname + '/users'))
const dirName = path.join(__dirname + '/users/');

const server = http.createServer(handleRequests)

function handleRequests(req,res){
let parsedData = url.parse(req.url,true)
if(req.method == 'POST' && parsedData.pathname == '/users'){
    let store = ''
    req.on('data', (chunk) => {
        store+=chunk;
    })
    req.on('end', () => {
        store =  qs.parse(store)
        let username = store.username;
        fs.open(dirName + username + ".json", "wx", (err, fd) => {
           if(fd){
            fs.writeFile(fd, JSON.stringify(store),(err) => {
              fs.close(fd, (err) => {
                res.end(`${username} successfully created`);
              });
            });
            }else{
                    res.end(`${username} already exists`);
            }
          });
    })
}else if (parsedData.pathname === "/users" && req.method === "GET") {
        fs.readFile(dirName + parsedData.query.username + ".json",'utf-8', (err, user) => {
            res.end(user)
          });
}else if(parsedData.pathname === "/users" && req.method === "DELETE"){
    console.log(dirName + parsedData.query.username + ".json")
    fs.unlink(dirName + parsedData.query.username + ".json",(err) => {
        if(err){
            console.log(err)
        }else{
            res.end("file deleted Successfully")
        }
    })
}else if(parsedData.pathname === "/users" && req.method === "PUT"){
    let store = ''
    req.on('data', (chunk) => {
        store+=chunk;
    })
    req.on('end', () => {
        store =  qs.parse(store)
        let username = store.username;
        fs.open(dirName + username + ".json", "r+", (err, fd) => {
           if(fd){
            fs.truncate(fd,0,() =>  {
                console.log("file Deleted Successfully")
                fs.writeFile(fd, JSON.stringify(store),(err) => {
                    fs.close(fd, (err) => {
                      res.end(`${username} successfully created`);
                    });
                  });
            })
            }else{
                    res.end(`${username} already exists`);
            }
          });
    })
}
}

server.listen(4000, () => {
    console.log("Server is Listening on port 4000")
})