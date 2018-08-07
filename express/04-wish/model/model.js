const mongoose = require('mongoose');

const fzfSchema = mongoose.Schema({
		content:String,
		id:String,
		color:String
});

const UserModle = mongoose.model('cart',fzfSchema);

module.exports = UserModle;