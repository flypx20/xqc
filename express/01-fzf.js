const express = require('express');

const users = require('./public/js/use.js');
const blogs = require('./public/js/blog.js');

var app = express();
app.use(express.static('public'));

app.use('/users',users);
app.use('/blogs',blogs);


app.listen(3000,'127.0.0.1',function(){
	console.log("running at http://127.0.0.1");
});