const fs = require('fs');


fs.open('./001-txt','a',(err,fd)=>{
	if (!err) {
		fs.write(fd,'ccc',(err)=>{
			if (!err) {
				console.log('write success');
				fs.close(fd,(err)=>{
					if (!err) {
						console.log('close success');
					}else{
						console.log('close failed');	
					}
				});
			}else{
				console.log('write failed');
			}
		});
	}else{
		console.log('open failed');
	}
});