const http = require('http');
const formidable = require('formidable');
const  util = require('util');
const fs = require('fs');
const path = require('path');


let server = http.createServer((req,res)=>{
	 if (req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = "./img";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
    	let oldPath = './'+files.image.path;
    	let extname = path.extname(oldPath);
    	let d = new Date();
    	let newPath = './img/'+d.getFullYear()+'-0'+Math.ceil(Math.random())+extname;
    	fs.rename(oldPath,newPath,(err)=>{
    		if (!err) {
    			res.writeHead(200, {'content-type': 'text/plain'});
      			res.write('received upload:\n\n');
   				res.end(util.inspect({fields: fields, files: files}));
    		}else{
    			console.log('rename failed');
    		}
    	});
     
    });

    return;
}
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('running at http://127.0.0.1:3000');
});