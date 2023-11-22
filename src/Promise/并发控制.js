// 请实现以下类 SuperTask和timeout函数，实现最大并发数控制
/*

const superTask = new SuperTask()
function addTask (time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务 ${name} 完成`)
    })
}

addTask(10000, 1) // 10000ms后 输出 任务 1 完成
addTask(5000, 2) // 5000ms后 输出 任务 2 完成
addTask(3000, 3) // 8000ms后 输出 任务 3 完成
addTask(4000, 4) // 12000ms后 输出 任务 4 完成
addTask(5000, 5) // 15000ms后 输出 任务 5 完成

 */

// 可以看到，题目中任务2并不受任务1的影响，而任务3的执行时机是任务2 + 任务3的时间，所以可以推断出，最大并发数量是2
// 也就是最多两个任务同时执行，一个结束后才能执行下一个。 跟并发请求的逻辑类似

function timeout (delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

class SuperTask {
  constructor (limit = 2) {
    this.limit = limit
    this.queue = []
    this.runningCount = 0
  }

  add (execute) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        execute,
        resolve,
        reject
      })
      this.run()
    })
  }

  async run () {
    while (this.runningCount < this.limit && this.queue.length) {
      this.runningCount++
      const { execute, resolve, reject } = this.queue.shift()
      try {
        await execute()
        resolve()
      } catch (error) {
        reject()
      } finally {
        this.runningCount--
        // this.run()
      }
    }
  }
}

const superTask = new SuperTask()
function addTask (time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务 ${name} 完成`)
    })
}

addTask(10000, 1) // 10000ms后 输出 任务 1 完成
addTask(5000, 2) // 5000ms后 输出 任务 2 完成
addTask(3000, 3) // 8000ms后 输出 任务 3 完成
addTask(4000, 4) // 12000ms后 输出 任务 4 完成
addTask(5000, 5) // 15000ms后 输出 任务 5 完成


