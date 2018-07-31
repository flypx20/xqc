const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fzf';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const fzf = client.db(dbName);
  const fzfs = fzf.collection('fzfs');

 /*插入操作 
 fzfs.insertMany([{a:1},{b:2},{c:3}],function(err,result){
  	if (!err) {
  		console.log(result);
  	}else{
  		console.log("insert error::"+err);
  	}
  });*/


  /*查询
  fzfs.find({}).toArray(function(err,result){
  	if (!err) {
  		console.log(result);
  	}else{
  		console.log("find err"+err);
  	}
  });*/

  /*增加
  fzfs.updateOne({a:1},{$set:{name:"飞猪飞"}},function(err,result){
  	if (!err) {
  		console.log(result.result);
  	}else{
  		console.log("update err::"+err);
  	}
  });*/

  /*删除
  fzfs.deleteOne({c:3},function(err,result){
  	if (!err) {
  		console.log(result.result);
  	}else{
  		console.log("remove err::"+err);
  	}
  });*/

  /*创建索引
  fzfs.createIndex({"a":1},{name:"aIndex"},function(err,result){
  	if (!err) {
  		console.log(result);
  	}else{
  		console.log("remove err::"+err);
  	}
  });*/

  client.close();
});