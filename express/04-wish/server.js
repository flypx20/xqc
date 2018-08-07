const express = require('express');
const swig = require('swig');

const users = require('./router/use.js');
const blogs = require('./router/index.js');
var bodyParser = require('body-parser');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wish',{ useNewUrlParser: true });

const db = mongoose.connection;
  db.on('error',(err)=>{
  throw err;
});

db.on('open',()=>{
	console.log('do connect ok');
});

var app = express();

app.engine('html',swig.renderFile);

app.set('views','./view');

app.set('view engine','html');


app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
app.use(express.static('static'));

app.use('/wish',users);
app.use('/',blogs);




app.listen(3000,'127.0.0.1',function(){
	console.log("running at http://127.0.0.1");
});