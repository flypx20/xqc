var http = require("http");
var fs = require("fs");
var server = http.createServer(function(req,res){
	//异步函数代码块，边读取文件边执行代码，利用回调函数中的传参
		res.setHeader("Content-Type","text/html;charset=UTF-8");
		console.log(req.url);
		var filepath = '../JavaScript'+req.url;
		fs.readFile(filepath,function(err,data){
			if(err){
				res.statusCode=404;
				console.log('error:::'+err);
				res.end("file is escaped");
			}else{
				res.statusCode = 200;
				res.end(data);
			}
		});
	res.setHeader("Content-Type","text/html;charset=UTF-8");
	//res.end("<h1>你好，我是徐清成<h1>");
});
server.listen("2000","127.0.0.1",function(){
	console.log("running at http://127.0.0.1");
});
