const express = require('express');
var bookRouter = express.Router();
const wish = require('../Model/model.js');
const swig = require('swig');
const uuidv1 = require('uuid/v1');
let getRandom = (min,max)=> {   
    return Math.round(min + (max-min)*Math.random());
};

const colorArr = ['#f10','#ff0','#ff5600','#0f1'];

bookRouter
    //删除许愿卡 
    .get('/:id',function (req, res) {
        wish.deleteOne({id:req.params.id},function(err,result){
        if (!err) {
            let resultion = JSON.stringify({
                status:0
            });
            res.end(resultion);
         }
        });
    })
    //添加许愿卡
    .post('/',function (req, res) {
        let obj = req.body;
        obj.id = uuidv1();
        obj.color = colorArr[getRandom(0,colorArr.length-1)];
        wish.insertMany(obj,function(err,doc){
            let result = {};
            if (!err) {
                result = {
                    status:0,//success
                    data:doc[0]
                };
            }else{
                result = {
                    status:10,
                    message:'failed'
                };
            }
            let resultion = JSON.stringify(result);
            res.end(resultion);
       });
    });
    

module.exports = bookRouter;