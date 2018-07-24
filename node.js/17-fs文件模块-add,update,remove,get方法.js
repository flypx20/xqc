const fs = require('fs');

let filePath = './data.JSON';

let add = (id,name,callBack)=>{
	fs.readFile(filePath,(err,data)=>{
		// console.log(data);
		if (!err) {
			let obj = JSON.parse(data);//从字符串中解析出json对象
			obj.push({
				"id":id,
				"name":name
			});
			
			let str = JSON.stringify(obj);//从json对象中解析出字符串
			fs.writeFile(filePath,str,(err)=>{
				if (!err) {
					callBack(null,str);
				}else{
					callBack(err);
				}
			});
		}else{
			callBack(err);
		}
		
	});
};

let get = (id,callBack)=>{
	fs.readFile(filePath,(err,data)=>{
		if (!err){
			let obj = JSON.parse(data);
			let result = {};
			/*for(key in obj){
				if (obj[key]['id']==id) {

					result = obj[key];
					break;
				}
				console.log('in:::',obj[key]);
				
			}*/

			obj.some((val)=>{
				if (val['id']== id) {
					result = val;
					return true;
				}
					console.log('in::',val);

			});
			callBack(null,result);

		}else{
			callBack(err);
		}
	});
};

let update = (id,name,callBack)=>{
	fs.readFile(filePath,(err,data)=>{
		if (!err) {
		let obj = JSON.parse(data);
		for(key in obj){
			if (obj[key]['id']==id) {
				obj[key]['name'] = name;
				break;
			}
		}
		let str = JSON.stringify(obj);
		fs.writeFile(filePath,str,(err)=>{
				if (!err) {
					callBack(null,str);
				}else{
					callBack(err);
				}
			});
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
				return val['id'] != id;
			});
			console.log(str1);
			let str2 = JSON.stringify(str1);
			fs.writeFile(filePath,str2,(err)=>{
				if (!err) {
					callBack(null,str2);
				}else{
					callBack(err);
				}
			});
		}else{
			callBack(err);
		}
	});
};
/*get(2,(err,data)=>{
	if (!err) {
		console.log(data);
	}else{	
		console.log('read file failed');
	}
});*/
/*add(1,'fzf',(err,data)=>{
	if (!err) {
		console.log(data);
	}else{
		console.log('write file failed');
	}
});	*/
/*update(1,'飞猪飞',(err,data)=>{
	if (!err) {
		console.log(data);
	}else{	
		console.log('update file failed');
	}
});*/
remove(2,(err,data)=>{
	if (!err) {
		console.log(data);
	}else{	
		console.log('update file failed');
	}
});