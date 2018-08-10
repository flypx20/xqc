const express = require('express');
var bookRouter = express.Router();
const swig = require('swig');
const wish = require('../model/model.js');
const pagination = require('../model/pagination.js');

bookRouter.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next();
    }else{
        res.send('<h1>请用管理员账号登录</h1>');
    }
});

bookRouter
    .get('/',(req,res)=>{
    	res.render('admin/admin');
	})
    .get('/logout',(req,res)=>{
    	req.session.destroy();
    	res.json({
    		code:0,
    		message:''
    	});
    })
    .get('/userlist',(req,res)=>{
    	pagination({
    		page:req.query.page,
    		model:wish,
    		query:{},
    		projection:'_id,username,isAdmin'
    	})
    	.then((data)=>{
    		res.render('admin/userlist',{
                name:req.userInfo,
    			userlist:data.docs,
    			page:data.page,
    			list:data.list
    		});

    	});
    	

    });
    

module.exports = bookRouter;