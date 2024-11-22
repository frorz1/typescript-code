type A = {
  foo: number;
  bar: number;
};

type B = {
  [p in keyof A as `${p}ID`]: number;
};


type Ress = {
  user_name: string
  user_age: number
}

type CamelCase<T extends string> = T extends `${infer F}_${infer R}`
  ? `${F}${Capitalize<R>}`
  : T

type CamelCaseObj<T> = {
  [key in keyof T as CamelCase<string & key>]: T[key]
}

type CamelCaseRes = CamelCaseObj<Ress>


type SS = {
  kind: 'square',
  x: number,
  y: number,
};

type CC = {
  kind: 'circle',
  radius: number,
};

type MyEvents<Events extends { kind: string }> = {
  [E in Events as E['kind']]: (event: E) => void; // E in Events 等于 E in SS | CC, 所以 E 是个对象
}

type Config = MyEvents<SS|CC>;


type User = { name: string, man: boolean }

// 1、
type PickByValueType<T extends Record<string, unknown>, U> = {
  // 键名重映射
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}

type res = PickByValueType<User, boolean>

// 2、
type OmitByKey<T extends Record<string, unknown>, U> = {
  [K in keyof T as K extends U ? never : K]: T[K]
}

type res1 = OmitByKey<User, 'man'>

// 3、
type PartialByKey<T extends Record<string, unknown>, U extends keyof T> = Partial<Pick<T, U>> & Omit<T, U>

type res2 = PartialByKey<User, 'man'>


// 4、请求参数解析
const queryStr = 'a=1&b=2&c=3'

type MergeObj<T extends Record<string, unknown>, U extends Record<string, unknown>> = {
  [K in (keyof T | keyof U)]: 
  K extends keyof T ? T[K] : K extends keyof U ? U[K] : never
}

type ParseSingleParam<S extends string> = 
  S extends `${infer Q}=${infer V}`
    ? {
      [K in Q]: V
    }
    : never

type ParseQuery<T extends string> = 
  T extends `${infer L}&${infer R}`
  ? MergeObj<ParseSingleParam<L>, ParseQuery<R>>
  : ParseSingleParam<T>

type parseResult = ParseQuery<typeof queryStr>
