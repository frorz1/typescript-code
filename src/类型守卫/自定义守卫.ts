

// 自定义类型守卫

// 格式
/**
 * function 函数名 (形参: 参数类型): 形参 is A类型 = boolean + 类型守卫能力 {
 *   return true or false
 * }
 */

// 意义
// 可以在编码时展示其具体意义

// 应用
// vue3 的 unref 方法

interface Ref<T = any> {
  value: T
}

export function isRef(r: any): r is Ref {
  return Boolean(r && r.__v_isRef === true)
}

export function unref (ref: any) {
  return isRef(ref) ? (ref.value as any) : ref
}

/**
 * 无自定义守卫，只有在执行阶段才能完成守卫
 */
function isString (str: unknown): boolean {
  return typeof str === 'string'
}

/**
 * 有自定义守卫。在编码阶段就可以守卫
 */
function isStringGuard (str: unknown): str is string {
  // 当函数返回true时， str就会被ts认为是字符串的
  // 当使用 if (isStringGuard(value)) { value.trim() } 时，这个if表达式就默认了【isStringGuard】返回值为true
  // 所以if的语法块内，value就是string类型，完成了类型守卫（收窄）的功能
  // 也可以用【三元运算符】 isStringGuard(value) ? value.trim() : value.toString()
  return typeof str === 'string'
}


interface A {
  name: string
  age: number
  eat: () => void
}
const b: A = {
  name: 'zha ng san',
  age: 12,
  eat: function () {
    console.log('name: ', this.name)
  }
}

let val: unknown

// way1: 使用typeof守卫
Object.keys(b).forEach((key: keyof A) => {
  val = b[key]
  if (typeof val === 'string') {
    // ok val已经被缩小为string, 所以val.可以提示所有的字符串方法
    val = val.replace(/\s+/g, '')
  }
})

// way2: 运行时守卫
Object.keys(b).forEach((key) => {
  val = b[key]
  if (isString(val)) {
    // error:  val.并不能提示string的方法，ts的提示为 let val: unknown
    // 因为只有等isString执行的时候，才能对类型进行守卫（收窄）, 所以这里没有起到类型守卫的效果
    val = val.replace(/\s+/g, '')
  }
})

// way3: 使用自定义守卫
Object.keys(b).forEach((key) => {
  val = b[key]
  if (isStringGuard(val)) {
    // ok , let val: string
    val = val.replace(/\s+/g, '')
  }
})


export {}