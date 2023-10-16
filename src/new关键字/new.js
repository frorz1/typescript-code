// new的时候发生了什么

function Person (name) {
  this.name = name
}

Person.prototype.say = function () {
  console.log('say')
}

const person = new Person('zhangsan')
console.log('person1: ', person)

// new 即创造一个对象，并且对象可以访问Person的实例属性和原型属性

// 根据定义
function newFn () {
  // 1、创造一个对象
  const obj = {}

  // 2、允许对象访问Person的原型属性
  obj.__proto__ = Person.prototype

  // 3、允许对象访问Person的实例属性，这里需要用到借用构造函数
  Person.apply(obj, arguments)

  // 4、返回这个对象
  return obj
}

console.log('person2: ', newFn('lisi'))