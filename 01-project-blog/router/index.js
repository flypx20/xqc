const express = require('express');
var bookRouter = express.Router();
const swig = require('swig');
const category = require('../model/category.js');

//显示首页
bookRouter
    .get('/',(req,res)=>{
    	category.find({},'_id name')
    	.sort({order:1})
		.then((categories)=>{
			res.render('index',{
				userInfo:req.userInfo,
				categories:categories
			});		
		});
});
    

module.exports = bookRouter;