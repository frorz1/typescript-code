// 如ts内置的Exclude

type MyExclude<T, K> = T extends K ? never : T

type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'

// 这就相当于执行了三次
// 1、'a' extends 'c' ? never : 'a'
// 1、'b' extends 'c' ? never : 'b'
// 1、'c' extends 'c' ? never : 'c'



// 如果想让联合类型的分配率失效，可以使用[]包裹

type ToArray<T> = T extends any ? T[] : never
type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]


// 组织分配
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never
type StrArrOrNumArr2 = ToArrayNonDist<string | number>; //  (string | number)[]


// never
// 需要注意的是never是一个特殊的联合类型，他不具备任何成员，当在范型中使用时，因为没有任何成员所以不需要分配，会直接返回never

type isNever<T> = T extends never ? true : false
type Res = isNever<never> // never

// 解决这个问题，则是让分配失效即可，不作为联合类型处理
type isNever2<T> = [T] extends [never] ? true : false
type Res2 = isNever2<never> // true




// 根据以上的结论，我们可以看一个题目
// 实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。
type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']

type Permutation<T, U = T> = [T] extends [never] ? [] : U extends U ? [U, ...Permutation<Exclude<T, U>>] : []

// [T] extends [never] 就是递归的结束条件，当T只有一个元素时，Exclude<T, U> === never