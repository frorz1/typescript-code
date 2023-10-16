// 断言方式
// 1、A as B
// 2、<B>A

// 类和类/接口/type进行断言时，
// 1、没有继承关系，只要两个类型完全一致，或者一个是另一个的子集，则允许断言
// 2、有继承关系，则可以直接断言, 因为父类就是子类的子集

class People {
  public name!: string
  public gender!: string
  // public age!: number
  constructor(){}
}

class American extends People {
  public age: number
  public height!: string
  constructor(name: string, age: number) {
    super()
    this.age = age
  } 
}

const people = new People()
const res = <American>people // ok


const americon = new American('zhangsan', 123)
const americon2 = <People>americon// ok

class Japan {
  public age: number
  public height!: string
  constructor(name: string, age: number) {
    this.age = age
  } 
}

const res2 = <Japan>people // error, 类型“People”缺少类型“Japan”中的以下属性: age, height


const japan = new Japan('zhangsan', 123)
const japan2 = <People>japan// error, 类型“Japan”缺少类型“People”中的以下属性: name, gender


export {}