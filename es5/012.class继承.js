class Student{
    constructor(name){
        this.name = name;
    }
    hello(){
        console.log(`hello, ${this.name}!`)
    }
}
var xiaoming = new Student('xiaoming');
var xiaohong = new Student('xiaohong');
xiaoming.hello()
xiaohong.hello()
console.log(xiaoming.hello === xiaohong.hello)

//原型链继承
class PrimaryStudent extends Student{
    constructor(name,grade){
        super(name);
        this.grade = grade;

    }
    mayGrade(){
        console.log(`my grade is ${this.grade}`);
    }
}