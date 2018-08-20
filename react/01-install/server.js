const express = require('express');
const app = express();

app.use('/app/data',(req,res)=>{
	
});


app.listen(3000,'127.0.0.1',()=>{
	console.log('running at 127.0.0.1');
});