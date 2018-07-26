const path = require('path');
const mime = require('../mime.json');
const http = require('http');
const fs = require('fs');

let server = http.createServer((req,res)=>{
	let filePath = req.url;
	if (filePath.lastIndexOf('.') ==-1) {
		filePath = filePath+'/lib.html';
	}
	let filename = path.normalize(__dirname+filePath);
	let extname = path.extname(filename);
	let mimeType = mime[extname] || 'text/html';
	console.log(filename);
	fs.readFile(filename,(err,data)=>{
		if (!err) {
			res.setHeader('Content-Type',mimeType+';charset=UTF-8');
			res.end(data);
		}else{
			res.statusCode = 404;
			fs.readFile('../img/1.jpg',(err,data1)=>{
				console.log('aaa');
				res.setHeader('Content-Type','image/jpeg;charset=UTF-8');
					// res.write('<h1>hello,飞猪飞</h1>');
					console.log(data1);
				res.end(data1);
			});
		}
	});
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('running at http://127.0.0.1:3000');
});