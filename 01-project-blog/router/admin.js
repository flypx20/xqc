const express = require('express');
var bookRouter = express.Router();
const swig = require('swig');
const wish = require('../model/model.js');
const pagination = require('../model/pagination.js');
const hmac = require('../hmac/hmac.js');
const fs = require('fs');
const path = require('path');
bookRouter.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next();
    }else{
        console.log('aaa');
        
        res.send('<h1>请用管理员账号登录</h1>');
    }
});

bookRouter
    .get('/',(req,res)=>{
    	res.render('admin/admin',{
             name:req.userInfo
        });
	})
    .get('/logout',(req,res)=>{
        console.log('aaa');
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
    })
    .get('/site',(req,res)=>{
        let filePath = path.normalize(__dirname+'/../site.json');
        fs.readFile(filePath,(err,result)=>{
            if (!err) {
                //转换格式buffer  => json
                let site = JSON.parse(result);
                res.render('admin/site',{
                    name:req.userInfo,
                    site:site
                });
            }else{
                console.log(err);
            }
        });
    })
    .post('/site',(req,res)=>{
        let body = req.body;
        let site = {};
    })
    .get('/password',(req,res)=>{
        res.render('admin/update',{
            name:req.userInfo
        });
    })
    .post('/password',(req,res)=>{
        let body = req.body;

        req.session.destroy();
        wish.findOneAndUpdate({username:body.username},{$set:{password:hmac(body.newpassword)}})
        .then(doc=>{
            if (doc) {
                res.json({
                    code:10,
                    message:''
                }); 
            }else{
                res.json({
                    code:0,
                    message:'您输入的用户名或密码错误'
                });
            }
           
        });
        
    });
module.exports = bookRouter;