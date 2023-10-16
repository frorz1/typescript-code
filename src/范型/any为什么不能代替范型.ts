// 1、原因一：编译期间 any 无法进行类型安全检查，而泛型在编译期间可以进行类型安全检查

// 2、any 类型可以获取任意数据类型的任何属性和任意方法而不会出现编译错误导致潜在错误风险，而泛型却有效的避免了此类问题发生

// 3、 any 类型数据获取属性和方法时无自动提示，泛型有自动提示


// 但是有个场景any却非常有用
class Customer {
  constructor (public username: string) {

  }
}

// 这里如果data声明为unknown或者其他类型，则data.username时会报错
function isCustomer (data: any): data is Customer {
  return Boolean(data && data.username)
}

let stuOne = { stuname: "王五", age: 23, address: "beijing" }
const customer = new Customer('张三')

console.log('测试stu', isCustomer(stuOne) ? stuOne.username : false)
console.log('测试customer', isCustomer(customer) ? customer.username : false)



