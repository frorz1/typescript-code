// js的const只限制不能修改arr，但是不限制修改arr[i]
const arr = [10, 20, 30]
arr[1] = 50

// ts const:   const arr2: readonly [10, 20, 30]
const arr2 = [10, 20, 30] as const

// error: 无法分配到 "0" ，因为它是只读属性。
arr2[0] = 50 

function showArr (arr: readonly any[]) {
  arr[0] = 100
}

showArr(arr2)



/*
const obj: {
  readonly name: "fet";
}
*/
const obj = {
  name: 'fet'
} as const


// 无法分配到 "name" ，因为它是只读属性
obj.name = 'test'

export {}