TS 中的顶层类型有两种 any 和 unknown, 也就是说，是所有类型的父类型。底层类型只有 never

## any 和 unknown

相同点：任何类型的值都可以赋值给 any 和 unknown 类型的变量，即子类型变量可以直接赋值给父类型变量

```ts
const str = '123'
const a0: unknown = str // ok
const b0: any = str // ok
```

不同点：any 可以赋值给任意类型的变量，但是 unknown 只能赋值给 any 或 unknown 类型的变量

如果使用了 any, TS 会关闭类型检查，随便你怎么写。

```ts
const a: any = 1
const b: string = a // ok
```

但这显然不符合实际情况，因为 a 的值是 number。这就造成了变量的污染，为了解决这个问题，TS 3.0 引入了 unknown

```ts
const a1: unknown = 1
const b1: string = a1 // error, Type 'unknown' is not assignable to type 'string'.
```


## never

never 即访问不到的，不存在类型，它是所有类型的自集，因此可以赋值给任何类型

```ts
function foo (param: number | string) {
  if (typeof param === 'number') {
    //
  } else if (typeof param === 'string') {
    //
  } else {
    const a = param // const a: never
  }
}
```

