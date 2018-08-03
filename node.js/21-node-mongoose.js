const mongoose = require('mongoose');
const moment = require('moment');
const UserModle = require('./22-node-model');
const BlogModel = require('./23-node-model2.js');
mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true });
const db = mongoose.connection;

db.on('error',(err)=>{
	throw err;
});
db.on('open',()=>{
	console.log('do connect ok');


	// console.log(UserModle);
	// const fzf = new UserModle({name:'fzf2',age:27,sex:"male"});

	//model.prototype.save()
	/*fzf.save(function(err,doc){
		if (!err) {
			console.log(doc.toString());
		}else{
			console.log('failed::',err);
		}
	});*/

	/*let promise = fzf.save();

	promise
	.then((doc)=>{
		console.log(doc);
	})
	.catch((e)=>{
		console.log('save err '+err);
	});*/

	/*new UserModle({name:'fzf3',age:28,sex:"male"})
	.save()
	.then((doc)=>{
		console.log(doc);
	})
	.catch((e)=>{
		console.log('save err '+err);
	});*/


	//model.insertMany

	/*UserModle.insertMany({name:"飞猪飞",sex:"male",age:15,phone:"13567945623"},(err,docs)=>{
		if (!err) {
			// console.log(docs.updated);
			// console.log(moment(docs.updated).format('YYYY-MM-DD HH:mm:ss hA'));
		}else{
			console.log('failed::',err.message);
		}
	});*/

	/*UserModle.findByPhone('13567945623',(err,doc)=>{
		if (!err) {
			console.log(doc);
		}else{
			console.log(err);
		}
	});*/
/*
	BlogModel.findOne({title:'test1'},(err,blog)=>{
		if (!err) {
			console.log(blog);
			UserModle.findById(blog.author,(err,user)=>{
				if (!err) {
					blog.author  = user;
					console.log(blog);
				}else{
					console.log(err);
				}
			});
		}else{
			console.log(err);
		}
	});*/
/*
	BlogModel.find({})
	.populate('author')
	.then((doc)=>{
		console.log(doc);
	});
*/
	/*BlogModel.findMyBlog((err,doc)=>{
		if (!err) {
			console.log(doc);
		}else{
			console.log(err);
		}
	});*/
	BlogModel.findMyBlog({})
	.then((docs)=>{
		console.log(docs);
	})
	.catch((e)=>{
		console.log(e);
	});
	/*BlogModel.insertMany([{author:'5b62ce89f29e482abc973a0a',title:'test1',content:"firstTest"},{author:'5b62ce89f29e482abc973a0a',title:'test2',content:"secondTest"}],function(err,docs){
		if (!err) {
			console.log(moment(docs.updated).format('YYYY-MM-DD HH:mm:ss hA'));
		}else{
			console.log('failed::',err.message);
		}
	});*/

	/*UserModle.findById('5b62ce89f29e482abc973a0a',function(err,doc){
		doc.findMyBlog((err,docs)=>{
			if (!err) {
				console.log(docs);
			}else{
				console.log('failed::',err.message);
			}
		});
	});*/
	/*let promise = UserModle.insertMany([{name:'fzf5',age:28,sex:"male"},{name:'fzf6',age:28,sex:"male"}]);

	promise
	.then((doc)=>{
		console.log(doc);
	})
	.catch((e)=>{
		console.log('save err '+err);
	});*/

	//model.create()

	/*UserModle.create({name:'fzf5',age:28,sex:"male"},(err,doc)=>{
		if (!err) {
			console.log(doc.toString());
		}else{
			console.log('failed::',err);
		}
	});*/
	/*UserModle.create({name:'fzf5',age:28,sex:"male"},{name:'fzf6',age:28,sex:"male"},(err,doc)=>{
		if (!err) {
			console.log(doc.toString());
		}else{
			console.log('failed::',err);
		}
	});*/

	/*UserModle.create([{name:'fzf',age:28,sex:"male"},{name:'fzf3',age:28,sex:"male"}],(err,doc)=>{
		if (!err) {
			console.log(doc.toString());
		}else{
			console.log('failed::',err);
		}
	});*/

	//model.find()
/*
	UserModle.findById({_id:"5b62b4d34452b9102ce47336"},(err,doc)=>{
		if (!err) {
			// console.log(typeof doc.toString());
			console.log(doc.updated);
			console.log(moment(doc.updated).format('YYYY-MM-DD HH:mm:ss hA'));
		}else{
			console.log('failed::',err);
		}
	});*/



	/*UserModle.find({},null,{skip:1},(err,doc)=>{
		if (!err) {
			console.log(doc);
		}else{
			console.log('failed::',err);
		}
	});*/

	/*UserModle.find({name:'fzf5',age:'28'},'name -_id',{skip:1},(err,doc)=>{
		if (!err) {
			console.log(doc);
		}else{
			console.log('failed::',err);
		}
	});*/

	/*UserModle.findById('5b626b47a67baf19cc0e3e7c',(err,doc)=>{
		if (!err) {
			console.log(doc);
		}else{
			console.log('failed::',err);
		}
		});*/

	/*UserModle.findOne({name:'fzf5'},'name -_id age',(err,doc)=>{
		if (!err) {
			console.log(doc);
		}else{
			console.log('failed::',err);
		}
	});*/
/*
	UserModle.update({name:'fzf'},{age:30},(err,result)=>{
		if (!err) {
			console.log(result);
		}else{
			console.log('failed::',err);
		}
	});*/
/*
UserModle.update({name:'fzf5'},{age:33},(err,result)=>{
		if (!err) {
			console.log(result);
		}else{
			console.log('failed::',err);
		}
	});*/

/*UserModle.update({name:'fzf5'},{age:42})
.then((result)=>{
	console.log(result);
});*/

/*UserModle.updateMany({name:'fzf5'},{age:55},(err,result)=>{
		if (!err) {
			console.log(result);
		}else{
			console.log('failed::',err);
		}
	});
*/

/*UserModle.deleteOne({name:'fzf5'},(err,result)=>{
	if (!err) {
			console.log(result);
		}else{
			console.log('failed::',err);
		}
});
*/
	/*UserModle.deleteMany({name:'fzf5'},(err,result)=>{
	if (!err) {
			console.log(result);
		}else{
			console.log('failed::',err);
		}
});*/

/*UserModle.remove({name:'fzf5'})
.setOptions({single:true})
.then((result)=>{
	console.log(result);
});
*/
/*UserModle.remove({name:'fzf5'},(err,result)=>{
	if (!err) {
			console.log(result);
		}else{
			console.log('failed::',err);
		}
});
*/



	//查找
	/*User.find({name:'fzf'},function(err,result){
		if (!err) {
			console.log(result);
		}else{
			console.log(err);
		}
	});*/

	//增加
	/*User.update({_id:"5b60289cb3e7fd14dcf1e566"},{ $set: { size: 'large' }},function(err,result){
		if (!err) {
			console.log(result);
		}else{
			console.log(err);
		}
	});*/

	//删除
	/*User.remove({name:'fzf'},function(err,result){
		if (!err) {
			console.log(result);
		}else{
			console.log(err);
		}
	});*/

	/*UserModle.distinct('name',(err,result)=>{
		if (!err) {
			console.log(result);
		}else{
			console.log(err);
		}
	});*/
});