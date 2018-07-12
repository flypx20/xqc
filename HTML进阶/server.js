var http = require("http");
var fs = require("fs");
var url  = require('url');
var querystring = require('querystring');
var server = http.createServer(function(req,res){
	//异步函数代码块，边读取文件边执行代码，利用回调函数中的传参
		res.setHeader("Content-Type","text/html;charset=UTF-8");
		//res.setHeader("Access-Control-Allow-Origin","http://www.fzf.com:2000");
		var urlStr = req.url;
		console.log("req url:::",urlStr);
		console.log(req.headers.cookie);
		if(urlStr == '/favicon.ico'){
			res.statusCode = 404;
			res.end();
		}
		console.log(req.method);
		var filepath = './'+urlStr;
		if (urlStr.search(/\?/) != -1) {
			filepath = "./"+urlStr.slice(0,urlStr.search(/\?/));
		}
	
		
		fs.readFile(filepath,function(err,data){
			if(err){
				res.statusCode=404;
				console.log('error:::'+err);
				res.end("file is escaped");
			}else{
				res.statusCode = 200;
				res.setHeader('set-cookie',['fzf=no.1']);
				res.end(data);
			}
		});
	//res.setHeader("Content-Type","text/html;charset=UTF-8");
	//res.end("<h1>你好，我是徐清成<h1>");
});
server.listen("2000","127.0.0.1",function(){
	console.log("running at http://127.0.0.1");
});
