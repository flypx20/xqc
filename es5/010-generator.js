function* next_id() {
    var a = 1;
    while( a >=0){
        yield a;
        a++;
    }
    return;
  }
  
  // 测试:
  var
      x,
      pass = true,
      g = next_id();
  for (x = 1; x < 100; x ++) {
      if (g.next().value !== x) {
          pass = false;
          console.log('测试失败!');
          break;
      }
  }
  if (pass) {
      console.log('测试通过!');
  }
// function* fib(max) {
//     var
//         t,
//         a = 0,
//         b = 1,
//         n = 0;
//     while (n < max) {
//         yield a;
//         [a, b] = [b, a + b];
//         n ++;
//     }
//     return;
// }
// for (var x of fib(10)) {
//     console.log(x); // 依次输出0, 1, 1, 2, 3, ...
// }
