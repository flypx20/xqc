
function sum (num){
   var count = num;

   return function(){
   count+=1;

       num+=count;
       console.log(num)
   }
}
var f1 = sum(1);
var f2 = sum(1);
var f3 = sum(1);
f1()
f2()
f3()