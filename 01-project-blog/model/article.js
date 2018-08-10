const mongoose = require('mongoose');

const fzfSchema = mongoose.Schema({
	category:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'category'
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'blog'
	},
	 title:{
		type:String,
	},
	intro:{
		type:String,
	},
	content:{
		type:String,
	}, 
	click:{
		type:Number,
		default:0
	},
	createdAt:{
		type:Date,
		default:Date.now
	}    
});

const articleModle = mongoose.model('article',fzfSchema);

module.exports = articleModle;