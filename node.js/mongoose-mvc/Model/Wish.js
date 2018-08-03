const fs = require('fs');
const uuidv1 = require('uuid/v1');
const path = require('path');
const mongoose = require('mongoose');




let getRandom = (min,max)=> {	
	return Math.round(min + (max-min)*Math.random());
};

const colorArr = ['#f10','#ff0','#ff5600','#0f1'];

function mongooseMd(callback){
const User = require('./model.js');

  mongoose.connect('mongodb://localhost:27017/wish',{ useNewUrlParser: true });

const db = mongoose.connection;
  db.on('error',(err)=>{
  throw err;
});

  db.on('open',()=>{

     callback(User);
  });
}

let add = (options,callback)=>{
   options.id = uuidv1();
    options.color = colorArr[getRandom(0,colorArr.length-1)];
    mongooseMd((User)=>{
     
      User.insertMany(options,function(err,doc){
         if (!err) {
             callback(null,doc[0]);
           }else{
              callback(err);
          }
       });
  });
   
};

let get = (callback)=>{

  mongooseMd((User)=>{
    User.find({},function(err,doc){
      if (!err) {
        callback(null,doc);
      }else{
        callback(err);
      }
  });
});
};


let remove = (id,callback)=>{

  mongooseMd((User)=>{
    User.deleteOne({id:id},function(err,result){
      if (!err) {
        callback(null);
      }else{
        callback(err);
      }
    });
  });
};

module.exports = {
	get:get,
	add:add,
	remove:remove
};