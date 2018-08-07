const express = require('express');
var bookRouter = express.Router();
const swig = require('swig');

//显示首页
bookRouter
    .get('/',(req,res)=>{

        res.render('index',{
        	userInfo:req.userInfo
        });
});
    

module.exports = bookRouter;