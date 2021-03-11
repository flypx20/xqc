// var Student = {
//     name:'010',
//     height:1.2,
//     run:function(){
//         console.log(this.name+' is running!')
//     }
// }

var xiaoming = {
    name:'xiaoming',

}

xiaoming.__proto__ = Student;//xiaoming原型指向Student,请不要直接使用
// xiaoming.run();
function Student(props){
    this.name = props.name || 'unName'
}
Student.prototype.hello = function(){
    console.log(`hello,${this.name}`)
}
function PrimaryStudent(props){
    Student.call(this,props);
    this.grade = props.grade || 1;
}
// console.log(PrimaryStudent.hello)

function f(){

}
f.prototype = Student.prototype;

PrimaryStudent.prototype = new f();

PrimaryStudent.prototype.constructor === PrimaryStudent

console.log(PrimaryStudent.prototype.__proto__  == Student.prototype)