const relativePath = './index.js';
const path = require('path');

console.log(relativePath);

console.log(__dirname);

console.log(__dirname + '/index.js');

console.log(path.join(__dirname,'index.js'));
