// 给定一个字符串，求他的长度
// type Len = StrLength<'abcd'> // expected to 4

// 先将字符串转为数组
type StrArr<T extends string> = T extends `${infer F}${infer Rest}` ? [F, ...StrArr<Rest>] : []

// 访问length属性
type StrLength<T extends string> = StrArr<T>

type Len = StrLength<'abcd'> // 4




// 也可以将两个功能合并。当一个参数不能合并两个类型时，考虑使用两个参数，第二个参数给定默认值
type StrLength2<S, Arr extends string[] = []> = S extends `${infer F}${infer Rest}` ? StrLength2<Rest, [F, ...Arr]> : Arr['length']
type Len2 = StrLength2<'abcd'> // 4

export {}