// object为什么不能代替范型
// 1、编译期间object无法进行准确的类型检查，比如可以传递Student类型，也可以传递Person类型。
// 2、object数据类型无法接受非object数据类型，而范型都可以
// 3、object类型数据获取【属性】和【方法】时没有自动提示


// 使用范型
class ArrayList<T> {
  public element: Array<T>
  public index: number = 0;
  constructor() {
    this.element = [];
  }
  public add(ele: T) {
    this.element[this.index++] = ele;
  }
  get(index: number): T {
    return this.element[index]
  }
  show() {
    this.element.forEach((ele) => {
      console.log(ele);
    })
  }
}

interface Student {
  stuname: string
  age: number
}

let stuOne = { stuname: "wnagwu", age: 23 }
let stuTwo = { stuname: "lisi", age: 39 }
let stuThree = { stuname: "liuqi", age: 31 }

let teacher = { teacherName: '张三' }

//let arrayList = new ArrayList([stuOne, stuTwo, stuThree]);
let arrayList = new ArrayList<Student>();
arrayList.add(stuOne);
arrayList.add(stuTwo);
arrayList.add(stuThree);

const res1 = arrayList.get(0)
// 有提示
res1.age

// 类型校验失败
arrayList.add(teacher)





// 不使用范型
class ArrayList2 {
  public element: Array<object>
  public index: number = 0;
  constructor() {
    this.element = [];
  }
  public add(ele: object) {
    this.element[this.index++] = ele;
  }
  get(index: number): object {
    return this.element[index]
  }
  show() {
    this.element.forEach((ele) => {
      console.log(ele);
    })
  }
}

interface Student {
  stuname: string
  age: number
}

let stu1 = { stuname: "wnagwu", age: 23 }

//let arrayList = new ArrayList([stuOne, stuTwo, stuThree]);
let arrayList2 = new ArrayList2();
arrayList2.add(stu1);

const res = arrayList2.get(0)
// 无提示，且类型校验失败
res.age

export {}