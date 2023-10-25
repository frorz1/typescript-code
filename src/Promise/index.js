class PromiseA {
  status = 'pending'
  value = undefined
  reason = undefined
  onFulfilledCallbacks = []
  onRejectedCallbacks = []
  constructor (exector) {
    try {
      exector(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  resolve (value) {
    if (this.status === 'pending') {
      this.status = 'fulfilled'
      this.value = value
      this.onFulfilledCallbacks.forEach(callback => callback(this.value))
    }
  }
  reject (reason) {
    if (this.status === 'pending') {
      this.status = 'rejected'
      this.reason = reason
      this.onRejectedCallbacks.forEach(callback => callback(this.reason))
    }
  }

  then (onFulfilled, onRejected) {
    return new PromiseA((resolve, reject) => {
      const handleResolve = (value) => {
        try {
          const x = onFulfilled(value)
          if (x === this) {
            reject(new TypeError('Chaining cycle detected for promise'))
          }
          if (x instanceof PromiseA) {
            /**
             * 我们举个例子，假如 x 是fetch。 
              const p1 = new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve(1)
                }, 10000)
              }).then(res => fetch('https://xxxxx?id=' + res) })
              p1.then(res => { console.log(res) })
             */
            // 如何让 x (fetch) 的状态变为fulfilled时，p1的状态也变为fulfilled呢，也就是他们联动起来
            // 那么我们把p1这个promise的resolve事件直接注册到 x.then函数的onFulfilled里就好了
            // 即 x.then.onFulfilled === p1.resolve，和 img.onload = reslove 一样
            // 当x.resolve之后会调用x.then的 onFulfilled回调， 也就是p1.resolve被调用
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        } catch (error) {
          reject(error)
        }
      }

      const handleReject = (reason) => {
        try {
          const x = onRejected(reason)
          if (x instanceof PromiseA) {
            x.then(resolve, reject)
          } else {
            reject(x)
          }
        } catch (error) {
          reject(error)
        }
      }

      if (this.status === 'fulfilled') {
        handleResolve()
      } else if (this.status === 'rejected') {
        handleReject()
      } else {
        this.onFulfilledCallbacks.push(handleResolve)
        this.onRejectedCallbacks.push(handleReject)
      }
    })
  }

  catch (onRejected) {
    return this.then(null, onRejected)
  }

  /**
   * 定义： “当前“ promise无论成功或者失败都会执行的函数，返回一个新的promise。所以只要当前promise的onFulfilled和onRejected中都执行onFinally即可
   * @param {*} onFinally 
   * @returns 
   */
  finally (onFinally) {
    //this表示当前promise，当前promise状态发生改变时，即会从回调栈中取出回调执行，所以我们要做的就是将回调注册进去就好啦。
    return this.then(
      (value) => PromiseA.resolve(onFinally).then(() => value),
      (reason) => PromiseA.reject(onFinally).then(() => { throw reason })
    )
  }

  /**
   * 返回一个状态为fulfilled的promise
   * @param {*} value 
   * @returns 
   */
  static resolve (value) {
    return new PromiseA((resolve) => resolve(value))
  }

  static reject () {
    return new PromiseA((resolve, reject) => reject(reason))
  }

  static all (promises) {
    return new PromiseA((resolve, reject) => {
      let count = 0
      const values = []
      promises.forEach((promise, index) => {
        promise.then((value) => {
          values[index] = value
          count++
          if (count === promises.length) {
            resolve(values)
          }
        })
      }).catch(reason => reject(reason))
    })
  }

  static race (promises) {
    return new PromiseA((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve).catch(reject)
      })
    })
  }
}

new PromiseA((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  },  10000)
}).then(res => console.log(res)).finally
