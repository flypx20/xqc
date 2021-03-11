var arr = [10, 20, 1, 2];
arr.sort((x, y) => {
    if(x<y){ return 1; } 
    if(x>y){ return -1; }
    return 0;
});
console.log(arr); 

var a={

    day:123,
    day2:{
        xx:111,
        zz:this
    },
    getday:()=>{
      
          console.log(this)

    }

}
a.getday()