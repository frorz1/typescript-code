// 范型
// 定义时不明确，使用时必须明确

// 命名规则
// 1、必须是大写
// 2、A-Z的某一个字母 或 语义化的单词


// 范型默认值
// ArrayList<T = any> 和js参数的默认值是一样的

class ArrayList<T> {
  // Array<T> 范型的传递
  public element: Array<T>
  constructor() {
    this.element = [];
  }
  public index: number = 0;
  // 往数组中添加元素
  public add(ele: T) {
    this.checkIndex();
    this.element[this.index++] = ele;
  }
  public checkIndex() {
    if (this.index < 0) {
      throw new Error("数组下标不能为零");
    }
  }
  // 第二步：根据索引来查询数组中指定元素
  get(index: number): T {
    return this.element[index]
  }

  // 第三步: 显示方法
  show() {
    this.element.forEach((ele) => {
      console.log(ele);
    })
  }

  remove(value: number): number
  remove(value: T): T
  remove(value: any): any {
    this.element = this.element.filter((ele, index) => {
      //如果是根据数字【元素索引】去删除元素，remove方法返回的是一个数字
      if (typeof value === "number") {
        return value !== index
      } else {
        // 如果是根据对象去删除元素，remove方法返回的是一个对象
        return value !== ele
      }
    })
    return value;
  }

}

let stuOne = { stuname: "wnagwu", age: 23 }
let stuTwo = { stuname: "lisi", age: 39 }
let stuThree = { stuname: "liuqi", age: 31 }

//let arrayList = new ArrayList([stuOne, stuTwo, stuThree]);
let arrayList = new ArrayList<{ stuname: string; age: number }>();
arrayList.add(stuOne);
arrayList.add(stuTwo);
arrayList.add(stuThree);
const a = arrayList.get(0)

console.log(arrayList.get(1));


let arrayList5 = new ArrayList();//泛型如果在使用时没有具体化的类型,那么就会默认为unknown数据类型
arrayList5.add(3);
arrayList5.add("abc");
arrayList5.add(stuOne);

const b = arrayList5.get(0) // const b: unknown

// T = any 就是范型默认值，和js参数的默认值是一样的
class ArrayList2<T = any> {

}

export {}