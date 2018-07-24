const fs = require('fs');

let ws = fs.createWriteStream('./ws.txt',{flag:'r+'});
let rs = fs.createReadStream('./rs.txt');

/*ws.on('open',()=>{
	console.log('will be working');
});

ws.on('close',()=>{
	console.log('after finished');
});

ws.on('finish',()=>{
	console.log('this has been finished');
});
ws.write('aaaa');
ws.write('bbbb');
ws.end();*/
/*let body = '';
rs.on('data',(chunk)=>{
	body +=chunk;
	console.log(chunk);
});
rs.on('end',()=>{
	console.log(body);
	console.log('closed...');
});*/

rs.pipe(ws);