// 最佳继承方式

// 寄生组合式继承
//  1、

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

// 1、创造一个寄生构造函数
function jishengFn () {
  this.count = 123
}
jishengFn.prototype = Parent.prototype

// 2、创建一个寄生新创建的构造函数对象
const jishengObj = new jishengFn()

// 3、修改原型
Son.prototype = jishengObj
Son.prototype.constructor = Son
let son = new Son('章三', 22, 'man')
console.log('son: ', son)

// 优化
//  1、上面的寄生构造函数过于单一，如果要换一个类进行继承，则又要重新写一个寄生构造函数，然后创建寄生对象等等

// 目标： 构建一个通用的寄生组合继承函数
function createNewPrototypeObj (child, parent) {
  // 创造寄生构造函数
  function Middle () {
    // 该步骤等于 child.prototype.constructor = child
    this.constructor = child
  }
  Middle.prototype = parent.prototype
  const obj = new Middle()

  // 进行原型链继承
  child.prototype = obj
  // child.prototype.constructor = child
}

function People (name, age) {
  this.name = name
  this.age = age
  console.log('this: ', this.name)
}

People.prototype.eat = function () {
  console.log(this.name + 'eat')
}

function Chinese (name, age, sex) {
  // 借用父类构造函数
  People.call(this, name, age)
  this.sex = sex
}

createNewPrototypeObj(Chinese, People)

const chin = new Chinese('李四', 20, 'women')
console.log('chinese: ', chin)


// 最终版本
function _extends (child, parent) {
  // 该步骤相当于把 prototype.__proto__ 指向parent.prototype， 也就等于prototype.constructor.prototype指向parent.prototype, 
  // 因为 prototype.__protp__ === prototype.constructor.prototype
  const prototype = Object.create(parent.prototype)

  child.prototype = prototype
  child.prototype.constructor = child
}
