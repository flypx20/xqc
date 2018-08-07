const express = require('express');
var bookRouter = express.Router();
const wish = require('../Model/model.js');
const swig = require('swig');

//显示首页
bookRouter
    .get('/',(req,res)=>{
        wish.find({},function(err,doc){
           if(!err){
                res.render('index',{
                    data:doc[0]
                });
            }else{
                console.log(err);
            }
         });
});
    

module.exports = bookRouter;