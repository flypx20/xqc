const http  = require('http');
const URL = require('url');
const querystring = require('querystring');

let server = http.createServer((req,res)=>{
	// console.log(req.method);
/*const myURL =
  new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
	console.log(myURL.searchParams.get('query'));
*/

let myurl = req.url;
// console.log(myurl.searchParams);


 let array = URL.parse(myurl);
// console.log(array.query);
// console.log(array);



console.log(querystring.parse(array.query));
	res.setHeader('Content-Type','text/html;charset=UTF-8');
	res.end('ok');
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('running at http://127.0.0.1:3000');
});