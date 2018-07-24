var http = require("http");
var fs = require("fs");
var url  = require('url');
var querystring = require('querystring');
var server = http.createServer(function(req,res){
	//异步函数代码块，边读取文件边执行代码，利用回调函数中的传参
		res.setHeader("Content-Type","text/html;Charset=UTF-8");
		res.setHeader("Access-Control-Allow-Origin","http://www.fzf.com:2000");
		var urlStr = req.url;
		console.log("req url:::",urlStr);
		if(urlStr == '/favicon.ico'){
			res.statusCode = 404;
			res.end();
		}
		console.log(req.method);
		if (req.method == "POST") {
			var body = '';
			req.on('data',function(chunk){
				body += chunk;
			});
			req.on('end',function(){
				console.log(body);
				var bodyObj = querystring.parse(body);
				var strBody = JSON.stringify(bodyObj);
				res.statusCode = 200;
				res.end(strBody);
			});
		}else{
			//如果请求中有数据，把参数返回给前端页面
			if (urlStr.search(/\?/) != -1) {
				var parms = url.parse(urlStr,true).query;
				var parmsStr = JSON.stringify(parms);
				res.statusCode = 200;
				res.end(parmsStr);
			}
		}
		var filepath = '../jquery'+urlStr;
		fs.readFile(filepath,function(err,data){
			if(err){
				res.statusCode=404;
				console.log('error:::'+err);
				res.end("file is escaped");
			}else{
				res.statusCode = 200;
				res.end(data);
				//setTimeout(function(){
					//console.log('请求超时');
					//res.end(data);
				//},3000);
				
			}
		});
	//res.setHeader("Content-Type","text/html;charset=UTF-8");
	//res.end("<h1>你好，我是徐清成<h1>");
});
server.listen("2000","127.0.0.1",function(){
	console.log("running at http://127.0.0.1");
});
