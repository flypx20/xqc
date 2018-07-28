const fs = require('fs');
const uuidv1 = require('uuid/v1');
const filePath = './data.json';

function getrandom(min,max){
	return Math.ceil(max+Math.random()*(min-max+1));
}

let add = (options,callBack)=>{
	let colorArray = ['skyblue','gold','pink','red','purple','gray'];
	fs.readFile(filePath,(err,data)=>{
		// console.log(data);
		if (!err) {
			let obj = JSON.parse(data);//从字符串中解析出json对象

			options.id = uuidv1();
			options.color = colorArray[getrandom(0,colorArray.length-1)];
			obj.push(options);

			let str = JSON.stringify(obj);//从json对象中解析出字符串
			fs.writeFile(filePath,str,(err)=>{
				if (!err) {
					callBack(null,options);
				}else{
					callBack(err);
				}
			});
		}else{
			callBack(err);
		}
		
	});
};

let get = (callBack)=>{
	fs.readFile(filePath,(err,data)=>{
		if (!err){
			let obj = JSON.parse(data);
			
			callBack(null,obj);

		}else{
			callBack(err);
		}
	});
};


let remove = (id,callBack)=>{
	fs.readFile(filePath,(err,data)=>{
		if (!err) {
			let obj = JSON.parse(data);
			let str1 = obj.filter(function(val) {
				console.log(id);
				console.log(val.id);
				return val['id'] != id;
			});
			console.log(str1);
			console.log(id);
			let str2 = JSON.stringify(str1);
			fs.writeFile(filePath,str2,(err)=>{
				if (!err) {
					callBack(null);
				}else{
					callBack(err);
				}
			});
		}else{
			callBack(err);
		}
	});
};

module.exports = {
	get:get,
	add:add,
	remove:remove
};
