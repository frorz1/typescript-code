// 编写一个类型，用来获取接口中的key
interface Stu {
  name: string;
  nest: {
    a: {
      b: number,
    },
    tt: {
      c: boolean,
    },
  };
  info: {
    score: number,
    grade: string,
  };
}

type a = keyof Stu

// output
// 'name' |
//   'nest' |
//   'nest.a' |
//   'nest.a.b' |
//   'nest.tt' |
//   'nest.tt.c' |
//   'info' |
//   'info.score' |
//   'info.grade';

type DeepKey<T> = T extends Record<string, any> ? {
  [k in keyof T]: k extends string ? k | `${k}.${DeepKey<T[k]>}` : never
}[keyof T] : never

type res = DeepKey<Stu>



// 逐步分析
// 1、T extends Record<string, any> 取保范型T是接口类型

// 2、构建 newInterface
/*
interfeace newInterface {
  [k in keyof T]: k extends string ? k | `${k}.${DeepKey<T[k]>}` : never
}
*/
// 2.1、生成新接口 为 interface newInterface { name: name | name.xxx, nest: nest | nest.xxx | nest.xxx }形式
// 2.2、将新接口的key全部变成联合类型 可以使用 【keyof newInterface】 或者 newInterface[keyof newInterface]
// 经过以上两步就会得到结果 name | name.xxx | nest | nest.xxx | nest.xxx

// k extends string ? k | `${k}.${DeepKey<T[k]>}` 的意思是，如果k是string，那么会返回 k | `${k}.${DeepKey<T[k]>`
// 以name来举例， 则会返回 name | `${name}.${DeepKey<T[name]>`, 那么在newInterface中的表现形式为

/*
{
  name: 'name' | `${name}.${DeepKey<T[name]>`
}
*/

// 而 DeepKey<T[name]>的结果为never， 因为T[name]为string, 并不是Record<string, any>， 那么newInterface最终为

/*
{
  name: 'name' | `${name}.{never}`
}

等价于

{
  name: 'name' | never
}

又等价于
等价于

{
  name: 'name'
}
*/

// 3、获取生成的 newInterface 的key, 也就是keyof
/*
{
  name: 'name'
}[keyof T]

相当于
{
  name: 'name'
}['name' | 'nest' | 'info']

根据联合类型的分布规则，又相当于
type temp = {
  name: 'name'
}

temp['name'] | temp['nest'] | temp['info']

所以得到最终结果

‘name’

*/


// 其他属性 nest 和 info类似，所以最终得到的 newInterface 为
/*
interface newInterface {
  name: 'name',
  nest: 'nest' | 'nest.a' | 'nest.a.b' | 'nest.tt' | 'nest.tt.c',
  info: 'info' | 'info.score' | 'info.grade'
}
*/

// 然后再对最终的 interface 取 newInterface[keyof T] 得到最后的联合类型



