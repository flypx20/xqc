const fs = require('fs');
const uuidv1 = require('uuid/v1');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fzf';

const filePath = path.normalize(__dirname + '/../data/wish.json');

let getRandom = (min,max)=> {	
	return Math.round(min + (max-min)*Math.random());
};

const colorArr = ['#f10','#ff0','#ff5600','#0f1'];

let add = (options,callback)=>{
	MongoClient.connect(url, function(err, client) {
 	assert.equal(null, err);
  	console.log("Connected successfully to server");

  	const fzf = client.db(dbName);
  	const fzfs = fzf.collection('data');
  	options.id = uuidv1();
	options.color = colorArr[getRandom(0,colorArr.length-1)];
  	fzfs.insertOne(options,function(err,result){
  		if (!err) {
  			callback(null,options);
  		}else{
  			callback(err);
  		}
  	});
  	client.close();
	});
};

let get = (callback)=>{
	MongoClient.connect(url, function(err, client) {
 	assert.equal(null, err);
  	console.log("Connected successfully to server");

  	const fzf = client.db(dbName);
  	const fzfs = fzf.collection('data');
  	fzfs.find({}).toArray(function(err,result){
  		if (!err) {
        console.log(typeof result);
  			callback(null,result);
  		}else{
  			callback(err);
  		}
  		});
  	client.close();
	});
};

let remove = (id,callback)=>{
	MongoClient.connect(url, function(err, client) {
 	assert.equal(null, err);
  	console.log("Connected successfully to server");

  	const fzf = client.db(dbName);
  	const fzfs = fzf.collection('data');
  	fzfs.deleteOne({id:id},function(err,result){
  		if (!err) {
  			callback(null);
  		}else{
  			callback(err);
  		}
  	});
  	client.close();
	});
};

module.exports = {
	get:get,
	add:add,
	remove:remove
};