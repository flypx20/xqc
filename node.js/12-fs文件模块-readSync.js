const fs = require('fs');

let fd = fs.openSync('./001-txt','r');

let buf = Buffer.alloc(10);

console.log(buf);

fs.readSync(fd,buf,0,10,0);

fs.closeSync(fd);

console.log(buf);
