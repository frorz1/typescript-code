// 既然typeof和Object.prototype.toString.call都无法判断非底层对象的类型，那么就需要用instaceof

// instanceof可以看成是对继承规则的判断

class Animal {
  constructor(public name: string) {
  }
}

const dog = new Animal('dog')

console.log(dog instanceof Animal)

function instanceofFn (child, parent) {
  // 首先需要知道的是 child 是通过new创造出来的对象，那么底层就是通过继承组合式继承实现的，有一个中间对象， parent 为构造函数
  // function createNewPrototypeObj (child, parent) {
  //   // 创造寄生构造函数
  //   function Middle () {
  //     // 该步骤等于 child.prototype.constructor = child
  //     this.constructor = child
  //   }
  //   Middle.prototype = parent.prototype
  //   const middle = new Middle()
  
  //   // 进行原型链继承
  //   child.prototype = middle
  //   // child.prototype.constructor = child
  // }

  // instanceof 的实现就是通过原型链一直寻找，知道找到等于 parent.prototype

  // step1、child.__proto__ === child.prototype === middle
  // step2、child.__proto__.__proto__ === middle.__proto__ === Middle.prototype
  // step3、因为 Middle.prototype === parent.prototype 所以 child.__proto__.__proto__ === parent.prototype
  // step4、因此，child instanceof parent === true

  if (child.__proto__ === parent.prototype) {
    // 有继承关系
    return true
  } else {
    if (child.__proto__.__proto__ !== null) {
      instanceofFn(child.__proto__, parent)
    }
    return false
  }
}


export {}