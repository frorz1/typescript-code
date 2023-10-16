// 借用构造函数
//  1、思想就是在子类中利用call 和 apply方法调用并传参给父类

// 缺点
//  1、会调用两次父类的构造函数
//  2、new Parent('wangwu', 24)这次赋值毫无意义，浪费内存空间，复制效率低。所以需要寄生构造函数代替new Parent()

function Parent (name, age) {
  this.name = name
  this.age = age
  console.log('this: ', this.name)
}

Parent.prototype.friends = ['zhangsan', 'zhaosi']
Parent.prototype.eat = function () {
  console.log(this.name + 'eat')
}

function Son (name, age, sex) {
  // 借用父类构造函数
  Parent.call(this, name, age)
  this.sex = sex
}

let parent = new Parent('wangwu', 24)
console.log('parent: ', parent)

Son.prototype = parent
Son.prototype.constructor = Son
let son = new Son('章三', 22, 'man')
console.log('son: ', son)