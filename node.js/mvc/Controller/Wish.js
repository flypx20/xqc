const wish = require('../Model/Wish.js');
const swig = require('swig');
const querystring = require('querystring');

class Wish{

	//显示许愿墙页面
	index(req,res,...args){
		wish.get((err,data)=>{
			if(!err){
				let template = swig.compileFile(__dirname+'/../View/Wish/index.html');
				let html = template({
				   data:data
				});
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.end(html);	
			}else{
				console.log(err);
			}
		});	
	}

	del(req,res,...args){
		console.log(args[0]);
		wish.remove(args[0],(err)=>{
			if (!err) {
				let resultion = JSON.stringify({
					status:0
				});
				res.end(resultion);
				
			}
		});
	}
	
	add(req,res,...args){
		console.log(Date().now);
		let body = '';
		req.on('data',(chunk)=>{
			body+=chunk;
		});
		req.on('end',()=>{
			let obj = querystring.parse(body);
			wish.add(obj,(err,data)=>{
				let result = {};
				if (!err) {
					result = {
						status:0,//success
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
				console.log(Date().now);
			});
		});
	}
}	

module.exports = new Wish();