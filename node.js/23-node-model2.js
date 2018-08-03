const mongoose = require('mongoose');

const fzfSchema = mongoose.Schema({
		author:{type:mongoose.Schema.Types.ObjectId,
				ref:'people'},
		title:{type:String},
		content:{type:String}
	});
/*fzfSchema.statics.findMyBlog = function(query={},callback){
	this.find(query)
	.populate('author')
	.then((docs)=>{
		callback(null,docs);
	})
	.catch((err)=>{
		callback(err);
	});
};*/

fzfSchema.statics.findMyBlog = function(query={}){
	let promise = new Promise((resolve,reject)=>{
		this.find(query)
		.populate('author')
		.then((docs)=>{
			resolve(docs);
		})
		.catch((e)=>{
			reject(e);
		});
	});
	return promise;
};

const BlogModle = mongoose.model('fzf',fzfSchema);

module.exports = BlogModle;