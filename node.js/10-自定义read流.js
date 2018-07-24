let EventEmiter = require('events');

class Myemitter extends EventEmiter{
	constructor(data,offsetLength){
		super();
		this.data = data;
		this.offsetLength = offsetLength;

		this.on('newListener',(eventName)=>{
			if (eventName === 'data') {
				setImmediate(()=>{

					this._disPath();
					console.log(this.listeners('data'));
				});
			}
		});
		
	}
	_disPath(){
		let totalLength = this.data.length;

		let realLength = totalLength;

		while(realLength>0){
			let start = totalLength-realLength;
			let end = start+this.offsetLength;
			let tmp=this.data.slice(start,end);

			let buf = Buffer.from(tmp);
			this.emit('data',buf);
			realLength -= this.offsetLength;

		}
		this.emit('end');
	}
}


let data = 'aaaaaaaaabbbbbbbbbb';
let myRead = new Myemitter(data,10);
let count = 0;
myRead.on('data',(chunk)=>{
	console.log(count++,'::',chunk.toString());
});
myRead.on('end',()=>{
	console.log('that is nothing');
});
