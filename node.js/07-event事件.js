const EeventEmitter = require('events');

class MyEmitter extends EeventEmitter{

}

const myEmitter = new MyEmitter();

// myEmitter.setMaxListeners(1);设置最大的监听事件数量
// 只处理一次，所以不会无限循环
/*myEmitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    // 在开头插入一个新的监听器
    myEmitter.on('event', () => {
      console.log('B');
    });
  }
});
myEmitter.on('event', () => {
  console.log('A');
});*/

let fn1 = ()=>{
	console.log('我是测试1');
};
let fn2 = ()=>{
	console.log('我是测试2');
};

myEmitter.on('newListener', (event, listener) => {
  console.log(event,listener);
});


myEmitter.emit('newListener',fn1);
/*myEmitter.on('newListener',('test',fn1,fn2));
myEmitter.emit('newListener');*/
/*myEmitter.on('test',fn1);
myEmitter.on('test',fn2);
myEmitter.addListener('test',fn3);

myEmitter.once('test',()=>{
	console.log('just test2');//打印一次
});


console.log(myEmitter.listeners('test'));
myEmitter.removeListener('test',fn1);
// myEmitter.off('test',fn2);//node.js 10以上版本与removeListener相等
console.log(myEmitter.listeners('test'));*/

