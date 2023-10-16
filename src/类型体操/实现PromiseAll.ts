const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const)


type PromiseAllReturn<T extends unknown[]> = {
  [K in keyof T]: Awaited<T[K]>
}


// 这里需要注意，T并非只读的，是PromiseAll的参数为只读的，因为 [promise1, promise2, promise3] as const 等同于将 T as readonly再赋值给参数
// 所以不能写成 PromiseAll<T extends readonly unknown[]>(arr: T)
// [...T]的原因也是如此，如果是 【readonly T】则就说明参数是一个只读的T类型， 而参数只是需要一个只读的数组，不需要将T 转为只读
declare function PromiseAll<T extends unknown[]>(arr: readonly [...T]): Promise<PromiseAllReturn<T>>