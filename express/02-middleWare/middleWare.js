const express = require('express');

const app = express();

app.use((req,res,next)=>{
	console.log('A');
	next();
	console.log('1A');
});
app.use((req,res,next)=>{
	console.log('B');
	next();
	console.log('1B');
});
app.use((req,res,next)=>{
	console.log('C');
	next();
	console.log('1C');
});
app.listen(3000,'127.0.0.1',()=>{
	console.log('running at 127.0.0.1:3000');
});