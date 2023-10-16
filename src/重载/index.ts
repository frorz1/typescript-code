// 当一个函数需要不同的参数类型并且返回不同的返回值的时候，就可以使用重载

// 如，根据message的id和type返回消息
type Message = {
  id: number
  type: 'text' | 'image' | 'audio',
  sendMsg: string
}

const messages: Message[] = [
  {
    id: 1,
    type: 'text',
    sendMsg: '11111111111'
  },
  {
    id: 2,
    type: 'image',
    sendMsg: 'this is image 22222'
  },
  {
    id: 3,
    type: 'image',
    sendMsg: 'this is image 33333'
  },
  {
    id: 4,
    type: 'audio',
    sendMsg: 'this is audio 44444'
  },
  {
    id: 5,
    type: 'audio',
    sendMsg: 'this is audio 55555'
  }
]

function getMessage (id: number, count: number):  Message // 重载函数签名 = 函数名 + 函数参数 + 参数类型 + 返回值类型
function getMessage (type: string): Message[] // 重载签名
// 实现签名： 永远不能调用实现签名函数，因为外部看不到，它只是给所有重载签名编写的实现
// 实现签名中如果没有用到重载签名中的某个参数，可以不声明，即 实现签名的参数个数可以少于重载签名
function getMessage (key: number | string): Message | Message[] | undefined {
  if (typeof key === 'number') {
    return messages.find(item => item.id === key)
  } else {
    return messages.filter(item => item.type === key)
  }
}

console.log(getMessage('image')) // function getMessage(type: string): Message[] (+1 overload)

// 如果不使用重载的话，则无法知道传入参数类型对应的返回值类型
// 结构不分明，可读性差，可维护性差
function getMessage2 (key: number | string): Message | Message[] | undefined {
  if (typeof key === 'number') {
    return messages.find(item => item.id === key)
  } else {
    return messages.filter(item => item.type === key)
  }
}

getMessage2(1) // function getMessage2(key: number | string): Message | Message[] | undefined

export {
  getMessage
}
