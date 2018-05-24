/*分析Node.js 的 HTTP 服务器：
第一行请求（require）Node.js 自带的 http 模块，并且把它赋值给 http 变量。
接下来我们调用 http 模块提供的函数： createServer 。
这个函数会返回 一个对象，这个对象有一个叫做 listen 的方法，
这个方法有一个数值参数， 指定这个 HTTP 服务器监听的端口号。
*/
var http = require('http');//用require方法创建HTTP模块
var server = http.createServer(function(req,res){
	res.end("hello,node.js");
});//http.createServer来创建服务器；require，response参数来请求和响应数据
server.listen(2000,'127.0.0.1',function(){
	console.log("running at http://127.0.0.1:2000");
});//服务器的server的listen方法绑定端口2000