const express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'static/uploads' });
const swig = require('swig');
const Cookies = require('cookies');


var bodyParser = require('body-parser');
const session = require('express-session');

const users = require('./router/use.js');
const blogs = require('./router/index.js');
const admin = require('./router/admin.js');
const category  = require('./router/category.js');
const article  = require('./router/article.js');
const Comment = require('./router/comment.js');
const people = require('./router/home.js');


const mongoose = require('mongoose');
const MongoStore = require("connect-mongo")(session);
mongoose.connect('mongodb://localhost:27017/blog',{ useNewUrlParser: true });



const db = mongoose.connection;
db.on('error',(err)=>{
  throw err;
});

db.on('open',()=>{
	console.log('do connect ok');
});
swig.setDefaults({
	cache:false
});

var app = express();
app.engine('html',swig.renderFile);

app.set('views','./view');

app.set('view engine','html');
app.use(express.static('static'));

/*//设置cookie的中间件
app.use((req,res,next)=>{
	req.cookies = new Cookies(req,res);
	req.userInfo = {};
	let userInfo = req.cookies.get('userInfo');
	if (userInfo) {
		try{
			req.userInfo = JSON.parse(userInfo);
		}catch(e){

		}
	}

	next();

});*/

app.use(session({
	//设置cookie名称
    name:'blid',
    //用它来对session cookie签名，防止篡改
    secret:'dsjfkdfd',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},    
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })  
}));
app.use((req,res,next)=>{
	req.userInfo = req.session.userInfo || {};
	next();
});




//处理post请求的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/home',people);

app.use('/admin',admin);
app.use('/user',users);
app.use('/',blogs);
app.use('/category',category);
app.use('/article',article);
app.use('/commend',Comment);








app.listen(3000,'127.0.0.1',function(){
	console.log("running at http://127.0.0.1");
});