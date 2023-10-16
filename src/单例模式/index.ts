// 使用场景
//    1、如vuex, redux等单个store的情况。如果多实例会引起逻辑错误
//    2、日志功能如果实例化多个对象，会对空间造成浪费

// 构建单例设计模式【懒汉式，即延迟使用，等到需要使用对象时才创建】
//    1、讲构造器设置为私有，即不允许使用new生成实例
//    2、至少提供一个外部可以访问的方法或者属性用来获取到一个实例，并且设置为静态的

// 静态成员
//    1、使用static描述
//    2、static是约束外部怎么调用该属性本身的，而不是该属性如何引用别的对象
//    3、静态方法中的this可以访问其他静态成员，不可以访问实例属性或方法, 同样非静态方法中的this也不能访问静态属性和方法
//    4、静态成员如何分配空间
//        4.1 无论是否创建对象，创建多少对象，是否调用静态成员，ts都会为静态成员分配内容空间
//        4.2 一旦为静态成员分配好内存空间，就会一直保存在内容中，并且一个静态成员只会分配一个内容空间，直到服务器重启或者控制台程序执行结束才会释放

class MyLocalStorage {

  // static是约束外部怎么调用该属性本身的，而不是该属性如何引用别的对象
  static storage: MyLocalStorage
  
  // 设置为私有的，外部就不可以访问构造器
  private constructor () {
    console.log('调用构造函数')
  }

  public static getInstance () {
    // 静态方法中的this可以访问其他静态成员，不可以访问实例属性或方法, 同样非静态方法中的this也不能访问静态属性和方法
    if (!this.storage) {
      this.storage = new MyLocalStorage()
    }
    return this.storage
  }

  setItem (key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getItem (key: string) {
    const value = localStorage.getItem(key)
    return value !== null ? JSON.parse(value) : null
  }
}

// const storage = new MyLocalStorage() // 类“MyLocalStorage”的构造函数是私有的，仅可在类声明中访问。
MyLocalStorage.getInstance()


// 构建单例设计模式【饿汉式，即提前创建】
//    1、讲构造器设置为私有，即不允许使用new生成实例
//    2、提供一个静态的引用属性，并且赋初始值

class MyLocalStorage2 {

  // 立即创建
  static storage: MyLocalStorage2 = new MyLocalStorage2('13')
  // 设置为私有的，外部就不可以访问构造器
  private constructor (public username: string) {
    console.log('调用构造函数2')
  }
  
  public static getInstance () {
    return this.storage
  }

  setItem (key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getItem (key: string) {
    const value = localStorage.getItem(key)
    return value !== null ? JSON.parse(value) : null
  }
}

// const storage = new MyLocalStorage() // 类“MyLocalStorage”的构造函数是私有的，仅可在类声明中访问。
console.log(MyLocalStorage2.getInstance().username)



export {}