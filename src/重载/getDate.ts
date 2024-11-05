function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
makeDate(12345678);
makeDate(5, 5, 5);

// 因为重载签名为前两个，第三个为实现，用来兼容前两个重载签名
// 用于编写函数体的签名不能从外部“看到，所以对于使用者来说只有两个函数签名
// 没有需要 2 参数的重载，但存在需要 1 或 3 参数的重载
const d3 = makeDate(1, 2);

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

len(""); // OK
len([0]); // OK
// we can’t invoke it with a value that might be a string or an array, 
// because TypeScript can only resolve a function call to a single overload:
len(Math.random() > 0.5 ? "hello" : [0]);

function len2(x: string | any[]) {
  return x.length
}
// ok, 能用联合类型时，就不要使用函数重载
len2(Math.random() > 0.5 ? "hello" : [0])