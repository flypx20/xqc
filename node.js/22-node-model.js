const mongoose = require('mongoose');

const fzfSchema = mongoose.Schema({
		name:{type:String,
			required:[true,"must be entered"],
			minlength:[2,"最少两个字符"],
			maxlength:[4,'输入的名字太长了']
		},
		age:{type:Number,default:10,
			min:[0,'请注意身体'],
			max:[150,"大哥，您好"]
			},
		sex:{type:String,
			enum:["male","female"]},
		locked:{type:Boolean,default:false},
		updated:{type:Date,default:Date.now},
		phone:{type:String}
	});
//模拟实例方法
fzfSchema.methods.findMyBlog = function(callback){
	this.model('fzf').find({author:this._id},(err,doc)=>{
		callback(err,doc);
	});
};

//模拟静态方法
fzfSchema.statics.findByPhone = function(phone,callback){
	console.log(this.model('people') === this);//true
	this.model('people').findOne({phone:phone},(err,doc)=>{
		callback(err,doc);
	});
};

const UserModle = mongoose.model('people',fzfSchema);

module.exports = UserModle;