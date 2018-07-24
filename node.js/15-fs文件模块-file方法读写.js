const fs = require('fs');

// fs.writeFileSync('./001-txt','\nzzz',{flag:'a'});//同步


// let path = fs.readFileSync('./001-txt',{flag:'r'});

// console.log(path);

/*fs.writeFile('./001-txt','node.js',{flag:'w'},(err)=>{
	if (!err) {
		console.log('write file success');
	}else{
		console.log('write file failed');
	}
});*///异步

fs.readFile('./001-txt',(err,data)=>{
	if (!err) {
		console.log('read file success');
		console.log(data);
	}else{
		console.log('read file failed');
	}
});
