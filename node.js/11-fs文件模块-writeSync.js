const fs = require('fs');


let fd = fs.openSync('./001-txt','w');

fs.writeSync(fd,'aaa');

fs.closeSync(fd);