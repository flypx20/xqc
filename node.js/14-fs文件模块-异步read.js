const fs = require('fs');

fs.open('./001-txt','r',(err,fd)=>{
	let buf = Buffer.alloc(20);
	console.log(buf);
	if (!err) {
		fs.read(fd,buf,0,20,0,(err)=>{
			console.log(buf);
			if (!err) {
				console.log('read success');
				fs.close(fd,(err)=>{
					if (!err) {
						console.log('close success');
					}else{
						console.log('close failed');
					}
				});
			}else{
				console.log('read failed');
			}
		});
	}else{
		console.log('open faied');
	}
	
});

console.log('something to do....');