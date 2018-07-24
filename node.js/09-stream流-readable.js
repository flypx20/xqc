let {Readable} = require('stream');

class myRead extends Readable{
	constructor(){
		super();
		this.index = 0;
	}

	_read(){
		this.index ++;
	
	if (this.index>5) {
			 this.push(null);
		}else{
			let str = ''+this.index;
			let buf = Buffer.from(str);
			this.push(buf);
		}
	}
}

let reader = new myRead();
var body = '';
reader.on('data', (chunk)=>{
	body+=chunk.toString();
	console.log('start'+chunk.toString());
});
reader.on('end',()=>{
	console.log(body);
	 console.log('There will be no more data.');
});