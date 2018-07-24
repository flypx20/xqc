var {Writable} = require('stream');
// console.log(Writes)

class writes extends Writable{
	constructor(){
		super();
	}

	_write(chunk,encoding,callBack){
		console.log(chunk.toString());
		callBack();
	}
}

const wri = new writes();

/*wri.write('aa','UTF-8',()=>{
	console.log('我是第一个');
});

wri.write('bb','UTF-8',()=>{
	console.log('我是第二个');
});
wri.end('不可以NO','UTF-8',()=>{
	console.log('finish.....');
});*/

process.stdin.pipe(wri);
