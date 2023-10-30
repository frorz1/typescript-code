// 约束 extends

// A extends B 即要求 A里面必需有B里面的所有属性，但可以拥有其他属性
type A = {
  name: string
  age: number
}

type B = A extends { name: string } ? A : never // A
type C = A extends { gender: string } ? A : never // never

// 1、比较两个数的length, 这就限制了必需有length属性
function longest<T extends { length: number }>(a: T, b: T) {
  if (a.length >= b.length) {
    return a
  } else {
    return b
  }
}

const longerArray = longest([1], [1,2])
const longerString = longest("alice", "bob");

// 类型“number”的参数不能赋给类型“{ length: number; }”的参数。
// const notOK = longest(10, 100);

console.log(longerArray, longerString)

