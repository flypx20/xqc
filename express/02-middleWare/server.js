//模拟中间件

const http  = require('http');

function express(){
	let fn = [];
	let app = function(req,res){
		let i = 0;
		function next(){
			
			let oFn = fn[i++];
			if (!oFn) {
				return;
			}
			oFn(req,res,next);
		}
		next();
	};
	app.use = function(oFn){
		fn.push(oFn);
	};
	return app;
}

const app = express();

app.use((req,res,next)=>{
	console.log('1A');
	next();
	console.log('2A');
});

app.use((req,res,next)=>{
	console.log('1B');
	next();
	console.log('2B');
});

app.use((req,res,next)=>{
	console.log('1C');
	next();
	console.log('2C');
});

let server = http.createServer(app());

server.listen(3000,'127.0.0.1',()=>{
	console.log('running at 127.0.0.1:3000');
});

