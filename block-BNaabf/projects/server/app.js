const path = require('path');
const http = require('http');

const relativePath = '../client/index.js'

console.log(relativePath);
console.log(path.join(__dirname,'client/index.js'))