const wish = require('../Model/model.js');
const swig = require('swig');
const uuidv1 = require('uuid/v1');
const querystring = require('querystring');
const mongoose = require('mongoose');


let getRandom = (min,max)=> {	
	return Math.round(min + (max-min)*Math.random());
};

const colorArr = ['#f10','#ff0','#ff5600','#0f1'];


class Wish{

	//显示许愿墙页面
	index(req,res,...args){
		/*wish.get((err,data)=>{
			if(!err){
				let template = swig.compileFile(__dirname+'/../View/Wish/index.html');
				let html = template({
				   data:data
				});
				res.end(html);
			}else{
				console.log(err);
			}
		});	*/

	wish.find({},function(err,doc){
      if(!err){
				let template = swig.compileFile(__dirname+'/../View/Wish/index.html');
				let html = template({
				   data:doc[0]
				});
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.end(html);
			}else{
				console.log(err);
			}
  });


	}

	del(req,res,...args){
		/*wish.remove(args[0],(err)=>{
			console.log('del:::');
			if (!err) {
				let resultion = JSON.stringify({
					status:0
				});
				res.end(resultion);
			}
		});*/
	wish.deleteOne({id:args[0]},function(err,result){
      if (!err) {
				let resultion = JSON.stringify({
					status:0
				});
				res.end(resultion);
			}
    });
	}
	
	add(req,res,...args){
		let body = '';
		req.on('data',(chunk)=>{
			body+=chunk;
		});
		req.on('end',()=>{
			let obj = querystring.parse(body);
			obj.id = uuidv1();
    		obj.color = colorArr[getRandom(0,colorArr.length-1)];
			/*let isTrue = false;
			if (isTrue == false) {
					wish.add(obj,(err,data)=>{
					console.log('ad::::');
					
						let result = {};
						if (!err) {
							result = {
								status:0,//success
								data:data
							};
						}else{
							result = {
								status:10,
								message:'failed'
							};
						}
						let resultion = JSON.stringify(result);
						res.end(resultion);
						isTrue = true;
	
				
			});
					isTrue = true;
			}*/
		wish.insertMany(obj,function(err,doc){
       		let result = {};
			if (!err) {
				result = {
					status:0,//success
					data:doc[0]
				};
			}else{
				result = {
					status:10,
					message:'failed'
				};
			}
			let resultion = JSON.stringify(result);
			res.end(resultion);
       });
		});
	}
}	

module.exports = new Wish();