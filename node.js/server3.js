const http = require('http');

const querystring = require('querystring');

const url = require('url');

let server = http.createServer((req,res)=>{
	let body = '';
	if (req.method.toUpperCase() === 'POST') {
		
		req.on('data',(chunk)=>{
			body +=chunk;
		});
		req.on('end',()=>{
			console.log(body);
			// console.log(querystring.parse(body));
		});
	}
	let array = url.parse(body,true);
	console.log(array.query);
	
	res.setHeader('Content-Type','text/html;charset=UTF-8');
	res.end('ok');
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('running as http://127.0.0.1:3000');
});