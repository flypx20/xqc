
// var xiaoming = {
//     name: '小明',
//     birth: 1990,
//     age: function () {
//         var that = this;
//         function getAgeFromBirth() {
//             var y = new Date().getFullYear();
//             return y - that.birth;
//         }
//         return getAgeFromBirth();
//     }
// };


var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};
var fn = xiaoming.age
console.log(fn())
// console.log(xiaoming.age())