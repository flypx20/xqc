const path = require('path');
const mime = require('./js/mime.json');
const http = require('http');
const fs = require('fs');
const mode = require('./js/model.js');
const url = require('url');
const querystring = require('querystring');
const swig = require('swig');

let server = http.createServer((req,res)=>{
	let filePath = req.url;
	let reqUrl = url.parse(filePath,true);
	let pathName = reqUrl.pathname;
	if (pathName === '/index.html' || pathName === '/') {

		mode.get ((err,data)=>{
			if (!err) {
				/*let html = `<!DOCTYPE html>
						<html lang="en">
						<head>
							<meta charset="UTF-8">
							<title>20-许愿墙</title>
							<link rel="stylesheet" type="text/css" href="css/index.css">
						</head>
						<body>
							<div class="wall">`;
					data.forEach((val) => {
                        html+=`<div class="wish" style="background: ${val.color}">
									<a href="javascript:;" class="close" data-id="${val.id}"></a>
									${val.content}
								</div>`;
					});		
					html+=`</div>
							<div class="form-box">
								<div>
									<textarea name="content" id="content" cols="30" rows="20"></textarea>
								</div>
								<div>
									<a href="javascript:;" class="sub-btn">许下心愿</a>
								</div>
							</div>
							</body>
							<script type="text/javascript" src="./js/jquery-1.12.4.min.js"></script>
							<script type="text/javascript" src="./js/jquery.pep.js"></script>
							<script type="text/javascript" src="./js/wish.js"></script>
							</html>`;*/
				let html1 = swig.compileFile(__dirname+'/index.html');
				let html = html1({
					data:data
				});
				res.setHeader('Content-Type','text/html;charset=UTF-8');
                res.end(html);  
			}else{
				console.log(err);
			}
			
		});
	}else if (pathName === '/add' || req.method.toUpperCase() === 'POST') {
		let body = '';
		req.on('data',(chunk)=>{
			body+=chunk;
		});
		req.on('end',()=>{
			let obj = querystring.parse(body);
			mode.add(obj,(err,data)=>{
				let result = {};
				if (!err) {
					result = {
						status:10,//success
						data:data
					};
				}else{
					result = {
						status:0,
						message:'failed'
					};
				}
				let resultion = JSON.stringify(result);
				res.end(resultion);
			});
		});
	}else if (pathName === '/del') {
		mode.remove(reqUrl.query.id,(err)=>{
			if (!err) {
				let resultion = JSON.stringify({
					status:0
				});
				res.end(resultion);
			console.log('aa');
				
			}
		});
	}
	else{
		if (filePath.lastIndexOf('.') ==-1) {
		filePath = filePath+'/index.html';
		}
		let filename = path.normalize(__dirname+filePath);
		let extname = path.extname(filename);
		let mimeType = mime[extname] || 'text/html';
		fs.readFile(filename,(err,data)=>{
			if (!err) {
				res.setHeader('Content-Type',mimeType+';charset=UTF-8');
				res.end(data);
			}else{
				res.statusCode = 404;
				fs.readFile('./img/1.jpg',(err,data1)=>{
					res.setHeader('Content-Type','image/jpeg;charset=UTF-8');
						// res.write('<h1>hello,飞猪飞</h1>');
					res.end(data1);
				});
			}
		});
		}

	
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('running at http://127.0.0.1:3000');
});