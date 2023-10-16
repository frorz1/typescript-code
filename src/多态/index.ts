// 定义
// 父类的对象变量可以接受任何一个子类对象
// 从而这个父类的对象可以调用子类中重写的方法从而输出不通的结果

// 多态产生条件
// 1、多态必须有继承
// 2、必须有方法重写。即一个方法能呈现多种表现形态

class People {
  public name!: string
  public gender!: string
  // public age!: number
  constructor(name: string){
    this.name = name
  }
  eat() {
    console.log('父类eat')
  }
}

class American extends People {
  eat () {
    console.log('用叉子吃饭')
  }
  playFootball () {
    console.log('美国人踢足球')
  }
}

class Chinese extends People {
  eat () {
    console.log('用筷子吃饭')
  }
  playPingpang () {
    console.log('中国人打乒乓球')
  }
}

let people: People = new American('美国人')
people.eat()

people = new Chinese('中国人')
people.eat() 

// 还有一种场景，就是多态可以代替联合类型

class Sport {
  // order (people: American | Chinese) {
  //   if (people instanceof American) {
  //     people.playFootball()
  //   } else if (people instanceof Chinese) {
  //     people.playPingpang()
  //   }
  // }
  order (people: People) {
    if (people instanceof American) {
      people.playFootball()
    } else if (people instanceof Chinese) {
      people.playPingpang()
    }
    // 多态的好处，可以直接调用重写的方法，较少对参数类型的修改，更易于扩展
    people.eat()
  }
}

const sp = new Sport()

// 父类对象接受子类对象
const peo: People = new American('美国人')
sp.order(peo)


export {}