// infer可以在【extends的条件语句】中推断待推断的类型
// 1、仅仅可在extends条件语句中使用
// 2、T extends (infer R)[] ? R : T 的意思是，如果T是某个待推断类型的数组，则返回推断的类型，否则返回T

// e.g.1:  推断函数的返回值类型
type ReturnType2<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

type funcNumber = () => number;
type funcString = () => string;

type funcRetureType1 = ReturnType2<funcNumber>; // type funcRetureType = number
type funcRetureType2 = ReturnType2<funcString>; // type funcRetureType = string

// e.g.2: infer解包 （推断数组中元素的类型）
type Unpacked<T> = T extends Array<infer R> ? R : any;
// 或者
type Unpacked2<T> = T extends (infer R)[] ? R : any;

// 这里 T extends (infer R)[] ? R : T 的意思是，如果T是某个待推断类型的数组，则返回推断的类型，否则返回T

type arr1 = Unpacked<[string, number, boolean]>; // type arr1 = string | number | boolean
type arr2 = Unpacked2<number[]>; // type arr1 = number

// e.g.3: 想要获取一个Promise<xxx>类型中的xxx类型，
type PromiseType<T extends Promise<any>> = T extends Promise<infer R> ? R : any;

type Response1 = Promise<number[]>;
type pro = PromiseType<Response1>; // type pro = number[]

// 上面的还不够完美，如果promise的返回值是一个promise类型，则需要进一步获取
type PromiseType2<T> = T extends Promise<infer R> ? PromiseType2<R> : T;

// e.g.4:
// 实现一个Foo 推断联合类型
// type T10 = Foo<{ a: string; b: string }>; // T10类型为 string
// type T11 = Foo<{ a: string; b: number }>; // T11类型为 string | number
type Foo<T> = T extends { [K in keyof T]: infer R } ? R : never;
type T10 = Foo<{ a: string; b: string }>; // type T10 = string
type T11 = Foo<{ a: string; b: number }>; // type T11 = string | number

// 同一个类型变量在推断的值有多种情况的时候会推断为联合类型
// 如 把元组转换为联合类型
type UnionType<T> = T extends (infer R)[] ? R : never; // 这里的 R 在推断时，值可能为多种情况，所以会被推断为联合类型

type TTuple = [string, number];
type Union = UnionType<TTuple>; // Union 类型为 string | number

// e.g.5: 实现react的useReducer声明，React这里通过reducer函数的类型来判断state的类型
// const reducer = (x: number) => x + 1;
// const [state, dispatch] = useReducer(reducer, ''); // error: ""不能赋值给number类型

// 1、定义reduce
type Reducer<T, K> = (prevState: T, action: K) => T;

// 2、获取reduce的参数类型
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any>
  ? S
  : never;

// 3、useReducer的返回值是一个数组， 且数组第一个元素的类型需要是Reducer的参数类型
function useReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I,
  initializer: (arg: I & ReducerState<R>) => ReducerState<R>
): [ReducerState<R>, any];

// e.g.6: 实现pop

// 取数组中的类型就利用元组。 判断参数是否为元组类型， 并利用可变元组的特性使用 ... 把前面的取到
type Pop<T extends any[]> = T extends [...infer Rest, infer R]
  ? [...Rest]
  : never;

type res = Pop<[1, 2, 3]>; // type res = [1, 2]

// e.g.6: 实现shift

// [...Rest] 和 Rest是一样的，Rest本身是一个类型的数组

type Shift<T extends any[]> = T extends [infer R, ...infer Rest] ? Rest : never;

type res1 = Shift<[1, 2, 3]>; // type res1 = [2, 3]

// 也可以这样
type First<T extends any[]> = T[0];

// 实现concat
type Concat<T extends any[], U extends any[]> = [...T, ...U];
type Result = Concat<[1], [2]>; // [1, 2]

// or
type Concat2<T, U> = T extends [...infer R]
  ? U extends [...infer K]
    ? [...R, ...K]
    : R
  : never;

// 实现 Includes
type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">; // expected to be `false`

type Includes<T extends any[], U> = T extends [infer F, ...infer R]
  ? F extends U
    ? true
    : Includes<R, U>
  : false;

// 实现 push

type Resul1t = Push<[1, 2], "3">; // [1, 2, '3']

type Push<T extends any[], U> = [...T, U];

// 实现 unshift
type Re2sult = Unshift<[1, 2], 0>; // [0, 1, 2,]

type Unshift<T extends any[], U> = [U, ...T];

// e.g.7: 实现trim

// 取字面量类型的就使用模版字符串, 如果有空格就返回去掉空格后的类型，如果没有空格就返回原始类型

// 1、 trimLeft

// ' ' | '\t' | '\n' 只能代表一个空格或者一次tab或者一次回车，但是可能前面有很多个空格，所以需要递归
type TrimLeftWithoutRecursion<T extends string> = T extends `${
  | " "
  | "\t"
  | "\n"}${infer R}`
  ? R
  : T;

type left1 = TrimLeftWithoutRecursion<"    abc">; // type left1 = "   abc"

type TrimLeftWithRecursion<T extends string> = T extends `${
  | " "
  | "\t"
  | "\n"}${infer R}`
  ? TrimLeftWithRecursion<R>
  : T;

type left2 = TrimLeftWithRecursion<"    abc">; //type left2 = "abc"

// 2、实现trimRight

type TrimRight<T extends string> = T extends `${infer R}${" " | "\t" | "\n"}`
  ? TrimRight<R>
  : T;

type right = TrimRight<"abc    ">; //type right = "abc"

// 3、合并两个方法
type Trim<T extends string> = TrimLeftWithRecursion<TrimRight<T>>;

type trimRes = Trim<"   abc   ">; // type trimRes = "abc"

// e.g.8: 实现replace
// 期待的结果如下： Replace<'我是一个可爱的人', '可爱', '勇猛'> => 我是一个勇猛的人

// 1、我们可以把字符串理解为三部分，要替换的字符左边的部分，要替换的字符， 要替换的字符右边的部分
type Replace<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Left}${From}${infer Right}`
  ? `${Left}${To}${Right}`
  : Str;

type replaceRes = Replace<"我是一个可爱的人", "可爱", "勇猛">; // type replaceRes = "我是一个勇猛的人"

// 延伸 实现 replaceAll
type replaceAll = ReplaceAll<"t y p e s", " ", "">; // 期望是 'types'

type ReplaceAll<
  T extends string,
  From extends string,
  To extends string
> = From extends ""
  ? T
  : T extends `${infer L}${From}${infer R}`
  ? ReplaceAll<`${L}${To}${R}`, From, To>
  : T;

// e.g.9: 实现获取函数的参数类型

type ParamsType<T extends (...args: any) => any> = T extends (
  ...args: infer R
) => any
  ? R
  : any;

type paramT = ParamsType<(a: string, b: boolean) => void>; // type paramT = [a: string, b: boolean]

// e.g.9.1 获取函数的某一个参数类型
type GetParamType<T extends (...args: any) => any> = T extends (
  a: infer R,
  ...args: any
) => any
  ? R
  : any;

type paramT1 = GetParamType<(a: string, b: boolean) => void>; // type paramT1 = string

// e.g.10: 将 type path = 'a.b.c' 修改为 type path = 'a ｜ b ｜ c'
//
type path = "a.b.c";

type Split<T extends string> = T extends `${infer U}.${infer Rest}`
  ? U | Split<Rest>
  : T;

type test = Split<path>; // type test =  a  |  b  |  c

export {};
