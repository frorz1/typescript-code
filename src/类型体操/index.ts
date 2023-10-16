// 实现将部分属性改为只读属性
interface Todo {
  title: string
  description: string
  completed: boolean
}

type MyReadonly2<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>


const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK






// 实现深度 Readonly

type X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = { 
  readonly x: { 
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey' 
}

type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>
}

type DR = DeepReadonly<X> // should be same as `Expected`