// 原型链继承
//  1、子类可以访问父类的实例属性和方法
//  2、子类对象可以访问弗雷原型的属性和方法

// 局限性
// 1、不能通过子类构造函数向父类构造函数传递参数。 比如下面的例子，每个子对象的姓名和年龄都是唯一的，所以没办法共用父类的name和age,需要在new Son的时候需要传递参数到父类对象。
// 而原型继承则需要每个son都自己处理一遍name和age。 如 new Son('zhangsan', 23, 'man')，并且son构造函数中需要this.name=name。 如果有多个son则就比较麻烦.
// 这时就需要使用【借用构造函数】

function Parent (name, age) {
  this.name = name
  this.age = age
}

Parent.prototype.friends = ['zhangsan', 'zhaosi']
Parent.prototype.eat = function () {
  console.log(this.name + 'eat')
}

function Son (sex) {
  this.sex = sex
}

let parent = new Parent('wangwu', 24)
console.log('parent: ', parent)
let son = new Son('man')
console.log('son: ', son)


// 继承环节
// 如果写为Son.prototype = Parent.prototype, 则子类无法单独扩展原型方法，会污染父类原型，因为他们指向同一个内存地址
Son.prototype = new Parent('wangliu', 25)

// 修正constructor的指向, 为了防止显式调用的时候出错。比如我想利用一个对象构建一个新的对象，const obj2 = new son.__proto__.constructor()
Son.prototype.constructor = Son

Son.prototype.run = function () {
  console.log(this.name + 'run')
}

console.log('son prototype: ', Son.prototype, Parent.prototype)

let son2 = new Son('man')

console.log('son2: ', son2)
