const express = require('express');
const swig = require('swig');

swig.setDefaults({
	cache:false
});
const app = express();

app.engine('html',swig.renderFile);

app.set('views','./views');

app.set('view engine','html');

app.get('/data',(req,res)=>{
	res.render('index',{
		title:'飞猪飞',
		content:'我的前端能力1233,2333',
		obj:{
			name:'飞猪飞M',
			age:12
		},
		array:['飞猪飞1','飞猪飞2','飞猪飞3','飞猪飞4']
	});
});
app.get('/',(req,res)=>{
	res.render('first');
});
app.get('/second',(req,res)=>{
	res.render('second');
});

app.get('/layout',(req,res)=>{
	res.render('layout');
});

app.listen(3000,()=>{
	console.log('running as 127.0.0.1:3000');
});