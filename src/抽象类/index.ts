// 定义
// 1、不能被实例化
// 2、可以包含抽象方法
// 3、只能通过子类实现抽象类来实例化

// 好处
// 1、提供统一的抽象方法，提高方法的可读性和维护性
// 2、防止实例化一个毫无意义的类

// 场景
// 实例化后没有任何意义的类就应该被定义为抽象类， 如People, Vechile, Flower 等并不是某个具体的对象

abstract class People2 {
  constructor () {
    // 可以包含构造器
  }
  abstract eat (): void // 抽象方法不能有方法体,因为不需要具体实现
  step () {
    // 抽象类可以有非抽象方法
    console.log('双腿走路')
  }
}

const a = new People2() // error: 无法创建抽象类的实例

class Korea extends People2 {

  // 子类必须实现抽象类方法
  eat () {
    console.log('韩国人吃泡菜')
  }
}

const kor = new Korea() // ok



export {}