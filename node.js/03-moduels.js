let str = '飞猪飞';

let obj1 = {name:'飞猪飞',age:18};

let fn = ()=>{
	console.log('sleep...');
};

console.log(module.exports);

// module.exports.obj1 = obj1;
exports.obj1 = obj1;
// module.exports.fn = fn;
exports.fn = fn;
// module.exports.str = str;
// exports.str = str;
// console.log(str);
// global.str = str;
// console.log(global);
module.exports = {
	str:str,
	fn:fn
};
console.log(exports==module.exports);


console.log(exports);