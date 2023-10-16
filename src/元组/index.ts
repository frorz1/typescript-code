// 数组: 仅能约束内部成员的数据类型而不能约束内部成员每一项的数据类型
const a1: Array<number> = [123]
const a2: number[] = [123]
// 数组类型越界时只能添加约束的类型
// error
a1.push('ad')
// ok
a1.push(1)

// 元组，类型个数和数组中元素的个数要完全一样
const a3: [number, string] = [2, 'test']

// error: 不能将类型“[number, string, string]”分配给类型“[number, string]”。源具有 3 个元素，但目标仅允许 2 个。
const a4: [number, string] = [2, 'test', 'jest']

// 当添加的元组越界的时候，越界的类型会被限制为元组类型中每个类型的联合类型
// 这个例子也就是相当于 [number, string, number | string]
a3.push(444)
a3.push('aaa')



export {}