const express = require('express');
var bookRouter = express.Router();
const swig = require('swig');

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
    	res.render('admin/userList');
    });
    

module.exports = bookRouter;