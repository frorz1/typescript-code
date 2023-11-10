// Promise
// 格式： new Promise((resolve, reject) => {})

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function runMicroTask (task) {
  // setTimeout(task, 0) 这并不是微任务，但也能实现
  if (process && process.nextTick) {
    // node环境的微队列
    process.nextTick(task)
  } else if (queueMicrotask) {
    // 浏览器环境微队列
    queueMicrotask(task)
  } else if (MutationObserver) {
    // queueMicrotask的降级方案。 MutationObserver 观察一个元素，会将回调加入微队列
    const p = document.createElement('p')
    const observer = new MutationObserver(task)
    observer.observe(p, {
        childList: true // 当childlist 发生变化时调用task
    })
    p.innerHTML = 1
  } else {
    // 低版本，或者不知道什么环境的兜底
    setTimeout(task, 0)
  }
}

function isPromise (obj) {
  // 按PromiseA+规范来操作，而不是判断 instanceof， 因为promise大家都可以随便写
  // 比如 new MyPromise((resolve) => resolve(1)).then((data) => new Promise((resolve) => resolve(2))).then((data) => console.log(data) // 2)
  // promise之间可以互相操作，是互通的
  return !!(obj && typeof obj === 'object' && typeof obj.then === 'function')
}

class MyPromise {
  
  /**
  * @param { function } executor 任务执行器，立即执行
  */
  constructor (executor) {
    this.status = PENDING
    this.value = undefined
    this.onFulfilledCallback = []
    this.onRejectedCallback = []
    this.handlers = []
    // 调用resolve的时候是直接 resolve()，而没有使用promise的实例进行 p.resolve()
    // 所以resolve中的this会指向全局，这里bind一下是为了让this指向实例
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      // 当 new Promise(exector) 的执行器执行报错时，要自动调用reject来捕获错误
      this.reject(err)
    }
  }

  /**
  * 私有函数，不希望被外部调用，则用_, ts可以使用private关键字
  */
  resolve (value) {
    this.changeState(FULFILLED, value)
  }
  
  reject (reason) {
    this.changeState(REJECTED, reason)
  }

  changeState (status, value) {
    // 状态一经变更不可再更改
    if (this.status !== PENDING) {
      return
    }
    this.status = status
    this.value = value
    
    // 状态发生变更，执行.then的回调
    this.runHandlers()
  }

  /**
   * 状态变化时，我们需要执行.then注册的回调
   */
   runHandlers () {
    if (this.status === PENDING) {
      return
    }
    // 一边遍历一边删除
    while (this.handlers[0]) {
      // 执行单个回调
      this.runOneHandler(this.handlers[0])
      // 删除
      this.handlers.shift()
    }
  }

  /**
   * 
   * @param {*} param0 
   */
  runOneHandler ({ callback, status, resolve, reject }) {
    runMicroTask(() => {
      // 根据状态执行callbacks中的回调
      if (this.status !== status) {
        return
      }
      if (typeof callback !== 'function') {
        // 如果没传相应的回调，则状态要进行穿透。
        // 如 const pro = new Promise((resolve) => resolve(1)); const pro2 = pro.then(null, (err) => cosole.log(err))
        // 因为pro没有处理成功的回调，所以这个成功状态会传递给 pro2。 反之如果pro是失败的，且没处理失败回调，一样需要传递到pro2
        this.status === FULFILLED ? resolve(this.value) : reject(this.value)
      }
      try {
        // callback接收当前promise的值并执行
        const res = callback(this.value)

        // 将callback的返回值（一定是返回值）传递给.then返回的新promise, 暂且叫 pro2

        // 返回值可能是任意值，当然就可能包括promise对象。如果callback返回了新的promise对象，暂且叫pro3，那么pro2的状态和值与pro3保持一致
        if (isPromise(res)) {
          // 调用pro3的then方法，让pro3成功时帮忙调用pro2的resolve, pro3失败时帮忙调用pro2的reject, 那么他们的状态就保持一致了，同时值也传递了过去
          res.then(resolve, reject)
          // 这样写也好理解
          // res.then((data) => resolve(data), (err) => reject(err))
        } else {
          resolve(res)
        }
      } catch (error) {
        // 如果callback（无论是 onFulfilled还是onRejected）在执行过程中报错了，那么pro2的状态就是失败。如
        // const pro = new MyPromise((resolve, reject) => {resolve(1)})
        // const pro2 = pro.then(() => {
        //   throw 123
        // })
        // setTimeout(() => {
        //   // pro为fulfilled, pro2为rejected
        //   console.log(pro, pro2)
        // }, 1000)
        reject(error)
      }      
    })
  }

  /**
   * 
   * @param {*} callback 
   * @param {*} status 
   * @param {*} resolve 让.then返回的新的promise状态变为成功
   * @param {*} reject 让.then返回的新的promise状态变为失败
   */
   pushHandlers (callback, status, resolve, reject) {
    this.handlers.push({
      callback,
      status,
      resolve,
      reject
    })
  }
  
  /**
   * onFulfilled, onRejected均为注册事件，不会立即执行, 也不是马上放到微队列中，而是等到状态变更后再放到微队列中
   * 如果直接放到微队列，则主线程空闲了就会立即执行。
   * @param {*} onFulfilled 可能为null或undefined, 如果不传，则状态会传递给返回的promise。如果传了，则执行结果决定了返回的新promise的状态(不报错就是成功)
   * @param {*} onRejected 可能为null或undefined, 如果不传，则状态会传递给返回的promise。如果传了，则执行结果决定了返回的新promise的状态(不报错就是成功)
   * @returns 
   */
  then (onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.pushHandlers(onFulfilled, FULFILLED, resolve, reject)
      this.pushHandlers(onRejected, REJECTED, resolve, reject)

      // 如果new Promise((resolve) => resolve(1)) 直接更改状态，则then在执行时，状态已经确定了，所以也需要直接执行回调
      this.runHandlers()
      // 如果是异步的，如new Promise((resolve) => setTimeout(resolve, 1000)), 则会在this.resolve中执行回调
    })
  }

  /**
   * 仅处理失败的情况，且也返回一个新的promise。因为没有传成功的回调，所以如果上一个promise是成功的，则catch调用后会透传给新的promise
   * @param {*} onRejected
   */
  catch (onRejected) {
    return this.then(null, onRejected)
  }

  /**
   * pro.finally 无论pro成功或者失败都会执行，并返回一个新的promise。pro2
   * pro2状态和值跟pro一致，等于透传，即onSettled返回值无用。
   * 如果onSettled函数抛出错误， 则返回的promise的状态为reject，值为抛出的错误
   * @param {*} onSettled
   */
  finally (onSettled) {
    // pro.finally(...) 这里 pro === this
    // this的状态是已决的，只需要根据this的状态去执行onFulfilled或onRejected即可
    return this.then((data) => {
      onSettled()
      // 透传上一个data
      return data
    }, (reason) => {
      onSettled()
      throw reason
    })
  }

  /**
   * 
   * @param {*} value 
   * 1、如果是当前promise的实例，则直接返回
   * 2、如果是符合PromiseA+规范的值，则返回的promise状态与该值的状态保持一致
   * 3、如果不是1或2，则直接返回一个状态是完成的promise，且值为value
   * @returns promise
   */
  static resolve (value) {
    if (value instanceof MyPromise) {
      return value
    }
    return new MyPromise((resolve, reject) => {
      if (isPromise(value)) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }

  /**
   * 直接reject，这就是规矩，我的规矩就是规矩
   * @param {*} value 
   * @returns promise
   */
  static reject (value) {
    return new MyPromise((resolve, reject) => {
      reject(value)
    })
  }

  /**
   * 如果values中的值不是promise，则用Promise.resolve(item)让其变为promise
   * @param {iterable} promises 参数可能是迭代器，没有下标所以不能用for循环，可以用for...of
   */
  static all (promises) {
    return new Promise((resolve, reject) => {
      let fulfilledCount = 0
      let count = 0 // 迭代器是没有length可用的
      const result = []
      for (const pro of promises) {
        // 块级作用域存储下标, 不能用var
        let i = count
        count++
        MyPromise.resolve(pro).then((data) => {
          // 不能使用 result[fulfilledCount]， 因为fulfilledCount只是成功的个数，并不对应promises中的顺序
          result[i] = data
          fulfilledCount++
          // promise.then是微任务，所以运行的时候，for..of已经遍历完了，count已统计完成
          if (fulfilledCount === count) {
            resolve(result)
          }
        }, reject)
      }
      // 很容易忽略这种情况，如果没处理，则promise会一直pending
      if (count === 0) {
        resolve(result)
      }
    })
  }

  /**
   * 如果values中的值不是promise，则用Promise.resolve(item)让其变为promise
   * @param {iterable} promises 参数可能是迭代器，没有下标所以不能用for循环，可以用for...of
   */
   static allSettled (promises) {
    // 方法一， 纯手写
    // return new Promise((resolve, reject) => {
    //   let settledCount = 0
    //   let count = 0 // 迭代器是没有length可用的
    //   const result = []
    //   for (const pro of promises) {
    //     // 块级作用域存储下标, 不能用var
    //     let i = count
    //     count++
    //     MyPromise.resolve(pro).then((data) => {
    //       // 不能使用 result[settledCount]， 因为settledCount只是成功的个数，并不对应promises中的顺序
    //       result[i] = {
    //         value: data,
    //         status: FULFILLED
    //       }
    //       settledCount++
    //       // promise.then是微任务，所以运行的时候，for..of已经遍历完了，count已统计完成
    //       if (settledCount === count) {
    //         resolve(result)
    //       }
    //     }, (err) => {
    //       result[i] = {
    //         reason: err,
    //         status: REJECTED
    //       }
    //       settledCount++
    //       if (settledCount === count) {
    //         resolve(result)
    //       }
    //     })
    //   }
    //   // 很容易忽略这种情况，如果没处理，则promise会一直pending
    //   if (count === 0) {
    //     resolve(result)
    //   }
    // })

    // 方法二，使用all，只要保证所有promise不会reject即可
    const proms = []
    for (const p of promises) {
      proms.push(
        // 因为 then方法的两个回调都返回对象，所以then返回的promise状态永远是成功,不会失败
        MyPromise.resolve(p).then((data) => ({
            status: FULFILLED,
            value: data
          }), (err) => ({
            status: REJECTED,
            reason: err
          })
        )
      )
    }
    return MyPromise.all(proms)
  }

  /**
   * 如果values中的值不是promise，则用Promise.resolve(item)让其变为promise
   * @param {iterable} promises 参数可能是迭代器，没有下标所以不能用for循环，可以用for...of
   */
  static race (promises) {
    return new MyPromise((resolve, reject) => {
      for (const p of promises) {
        MyPromise.resolve(p).then(resolve, reject)
      }
    })
  }
}


const pro = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(1)
  }, 1000)
})

MyPromise.race([pro, 2, 3, 4]).then(data => {
  console.log('data', data)
}).catch(err => {
  console.log('err: ', err)
})

setTimeout(() => {
  console.log(pro)
}, 1000)