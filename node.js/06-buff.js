// const buf = new Buffer('fzf');
// const buf = new Buffer(10);
// const buf = new Buffer(10,'fzf');error

// const buf = Buffer.from('fzf');
// const buf = Buffer.from('飞猪飞');

// const buf = Buffer.from([10,2,3,4]);
// const buf = Buffer.from('fzf','hex');

const buf = Buffer.alloc(10);

console.log(buf.size);
console.log(buf);