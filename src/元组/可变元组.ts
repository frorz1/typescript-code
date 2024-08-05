// 可变元组
let [username, no, ...rest]: [string, number, ...any[]] = [
  "fet",
  123,
  "man",
  "190cm",
  "senior",
];
console.log("rest", rest);

// 给每个类型添加标签
let [user, id, ...rest1]: [user_: string, id_: number, ...rest: any[]] = [
  "fet",
  123,
  "man",
  "190cm",
  "senior",
];
console.log("rest1", rest1);

// 限制元组的前两个和最后一个类型，其余可变
let [user1, id1, ...rest2]: [
  user_: string,
  id_: number,
  ...rest: any[],
  last_: string
] = ["fet", 123, "man", "190cm", "senior", "lastone"];
console.log("rest2", rest2);

// 获取元组长度

type tesla = ["tesla", "model 3", "model X", "model Y"];
type spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT"
];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5

type Length<T extends readonly any[]> = T["length"];

// 获取第一个元素

type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3

type First<T extends any[]> = T[0];

// 将元组转换为对象
const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type result = TupleToObject<typeof tuple>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [K in T[number]]: K;
};

// 实现泛型TupleToUnion<T>，它返回元组所有值的合集。

// 例如

type Arr = ["1", "2", "3"];

type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'

type TupleToUnion<T extends readonly any[]> = T[number];

// 解释一下， 这里的number可能的值为 0 , 1, 2, 所以 T[number] === T[0|1|2] === T[0] | T[1] | T[2]

// 元组是可以遍历的
type Tuple2 = ["a", "b", 2];
type NewTuple<T extends any[]> = {
  [K in keyof T]: K;
};
type C = NewTuple<Tuple2>; // type C = ["0", "1", "2"]
// 上面的例子等于 { 0: 0, 1: 1, 2: 2 }最终会被转为元组

// 如果使用 T[number]， 则最终结果为 { a: a, b: b, c: c }, 结果为对象形式
type NewTuple2<T extends any[]> = {
  [K in T[number]]: K;
};

type D = NewTuple2<Tuple2>;

// 所以 [K in keyof T] 和 [K in T[number]]是不同的，一个是取下标，一个是取值

// 联合类型转元组
type Union = "a" | "b" | "c";

type Res = UnionToTurple<Union>; // ['a', 'b', 'c']

type UnionToIntersection<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer I) => void
  ? I
  : never;

type Intersection = UnionToIntersection<"a" | "b">;

type UnionToTurple<T, U = T> = T extends never
  ? [1]
  : U extends U
  ? [U, UnionToTurple<T>]
  : [];

export {};
