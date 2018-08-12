const express = require('express');
var bookRouter = express.Router();
const swig = require('swig');
const category = require('../model/category.js');
const article = require('../model/article.js');
const pagination = require('../model/pagination.js');

//显示首页
bookRouter
    .get('/',(req,res)=>{
    	category.find({},'_id name')
		.then((categories)=>{
            article.find({})
            .sort({click:-1})
            .limit(10)
            .then((topArticles)=>{
               article.findPagination(req)
                .then((data)=>{
                    res.render('index',{
                        userInfo:req.userInfo,
                        articleList:data.docs,
                        page:data.page,
                        list:data.list,
                        categories:categories,
                        topArticles:topArticles
                    });
                });
            }); 
        });
        		
	})
    .get('/list/:id',(req,res)=>{
        let id = req.params.id;
        category.find({},'_id name')
        .then((categories)=>{
            article.find({})
            .sort({click:-1})
            .limit(10)
            .then((topArticles)=>{
               article.findPagination(req,{category:id})
                .then((data)=>{
                    res.render('index',{
                        userInfo:req.userInfo,
                        articleList:data.docs,
                        page:data.page,
                        list:data.list,
                        categories:categories,
                        topArticles:topArticles,
                        cate:id
                    });
                });
            }); 
        });

    })
	.get('/articles',(req,res)=>{
        console.log(req.body);
		article.findPagination(req)
		.then((data)=>{
			res.json({
				code:0,
				userInfo:req.userInfo,
	            articleList:data.docs,
	            page:data.page,
	            list:data.list
        	});
			
		});
	})
    .get('/view/:id',(req,res)=>{
        let id = req.params.id;
        article.findByIdAndUpdate(id,{$inc:{click:1}},{new:true})
        .then(()=>{
        category.find({},'_id name')
        .sort({order:1})
        .then((categories)=>{
            article.find({})
           
            .sort({click:-1})
            .limit(10)
             .then((topArticles)=>{
                article.findById(id)
                .populate({path:'category',select:'name'})
                .then((article)=>{
                    res.render('detail',{
                        userInfo:req.userInfo,
                        article:article,
                        categories:categories,
                        topArticles:topArticles,
                        cate:article.category._id.toString()
                    });
                });
                    
            }); 
        });
        });

    });
    

module.exports = bookRouter;