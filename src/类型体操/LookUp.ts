
// 有时，您可能希望根据某个属性在联合类型中查找类型。

// 在此挑战中，我们想通过在联合类型Cat | Dog中搜索公共type字段来获取相应的类型。换句话说，在以下示例中，我们期望LookUp<Dog | Cat, 'dog'>获得Dog，LookUp<Dog | Cat, 'cat'>获得Cat。

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type MyDog = LookUp<Cat | Dog, 'cat'> // expected to be `Dog`

type LookUp<T, V> = T extends { type: V } ? T : never



// 这个问题就跟 给定一组联合类型和一个值，返回命中的一个 LookUp<1|2|3, 3> 返回3一样，非常简单
// 同样是联合类型的分配率

type LookUp2<T, V> = T extends V ? T : never
type aa = LookUp2<1|2|3, 3>


type TrimLeft<T> = T extends `${'\n' | '\t' | '\s'}${infer R}` ? TrimLeft<R> : T

export {}