const http = require('http');

let server = http.createServer((req,res)=>{
	//req可读流
	//res可写流
	res.setHeader('Content-Type','text/plain;charset=UTF-8');
	// res.write('<h1>hello,飞猪飞</h1>');
	res.end('<h1>hello,飞猪飞</h1>');
});



server.listen(3000,'127.0.0.1',()=>{
	console.log('running at http://127.0.0.1');
});