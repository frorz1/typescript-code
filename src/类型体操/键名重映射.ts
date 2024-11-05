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
