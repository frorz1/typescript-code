// typeof检测范围
// string,number,bigint,boolean,symbol,undefined,object,function
// typeof null === object, 但null也是一种数据类型，所以这个地方是有问题的
// tyoeof Array === object, 依然不准确

// 代替方案
// Object.prototype.toString.call([]) => [object Array]


// 局限性
// Object.prototype.toString.call依然无法解决非底层对象的类型判断，如Object.prototype.toString.call(Person) === [object Object]

interface A {
  name: string
  age: number
  eat: () => void
}
const a: A = {
  name: 'zha ng san',
  age: 12,
  eat: function () {
    console.log('name: ', this.name)
  }
}

type b = keyof A

let value
Object.keys(a).forEach((key) => {
  value = a[key]
  if (typeof value === 'string') {
    // 使用typeof守卫进行类型缩小为字符串类型，在语句快中使用
    value = value.replace(/\s+/g, '')
  }
})

export {}