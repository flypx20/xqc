const mongoose = require('mongoose');

const fzfSchema = mongoose.Schema({
		username:String,
		password:String,
		isAdmin:{
			type:Boolean,
			default:false
		}
});

const UserModle = mongoose.model('blog',fzfSchema);

module.exports = UserModle;