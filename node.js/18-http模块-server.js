const http = require('http');
const fs = require('fs');

let server = http.createServer((req,res)=>{
	//req可读流

	//res可写流

	let pathFile = req.url;
	console.log(pathFile);
	if (pathFile === '/index.html') {
		fs.readFile('./index.html',(err,data)=>{
			if (!err) {
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				// res.write('<h1>hello,飞猪飞</h1>');
				res.end(data);
			}else{
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.statusCode = 404;
				res.end('<img src="../img/timg.jpg">');
			}
		});
	}else if (pathFile === '/img.css') {
		fs.readFile('./img.css',(err,data)=>{
			if (!err) {
				res.setHeader('Content-Type','text/css;charset=UTF-8');
				// res.write('<h1>hello,飞猪飞</h1>');
				res.end(data);
			}else{
				res.setHeader('Content-Type','text/css;charset=UTF-8');
				res.statusCode = 404;
				res.end(data);
			}
		});
	}
	else if (pathFile === '/list.html') {
		fs.readFile('./list.html',(err,data)=>{
			if (!err) {
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				// res.write('<h1>hello,飞猪飞</h1>');
				res.end(data);
			}else{
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.statusCode = 404;
				res.end('<img src="../img/timg.jpg">');
			}
		});
	}else if (pathFile === '/img/1.jpg') {
		console.log('aaa');
		fs.readFile('./img/11.jpg',(err,data)=>{
			if (!err) {
				res.setHeader('Content-Type','image/jpeg;charset=UTF-8');
				// res.write('<h1>hello,飞猪飞</h1>');
				res.end(data);
			}else{
				res.setHeader('Content-Type','image/jpeg;charset=UTF-8');
				res.statusCode = 404;
				res.end(data);
			}
		});
	}else{
		res.statusCode = 404;
		fs.readFile('./img/1.jpg',(err,data)=>{
				res.setHeader('Content-Type','image/jpeg;charset=UTF-8');
				// res.write('<h1>hello,飞猪飞</h1>');
				console.log('bbbb');
				console.log(data);
				res.end(data);
		});
		 
		}
	
});



server.listen(3000,'127.0.0.1',()=>{
	console.log('running at http://127.0.0.1');
});