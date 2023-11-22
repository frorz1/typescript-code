// 并发请求，主要考察三个点
// 1、最多发送 maxNum 个请求的意思就是， 一开始先发送 maxNum 个请求，然后等待 其中一个 请求结束后，再补上下一个请求即可
// 所以我们可以封装一个函数，用来发送一个请求，等成功后，取下一个请求再发送

// 2、按照请求在原数组中的顺序返回。 
// 因为请求的结束时机是不确定的，这就要求我们用一个下标去记录它在原数组中的下标。有结果后，按下标放到result数组中

// 3、整个请求的结束时机
// 这个不能用现在请求的是第几个的下标来判断越界作为结束条件。比如数组长度是9， 最后发了 7，8，9。 然后index++变为10，那么已经越界。但是789还未结束
// 所以我们需要一个统计有结果的请求的个数。completedCount, 当completedCount === urls.length时，即是结束

const promises = Array(21).fill(0).map((v, i) => {
  return () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`完成第 ${i} 个请求`)
        resolve(i)
      }, 2000)
    })
  }
})

 function conurlRequest (urls, maxNum) {
  return new Promise((resolve, reject) => {
    if (urls.length === 0) {
      resolve([])
      return
    }
    const result = []
    const len = urls.length
    let index = 0
    let completedCount = 0 
    async function request () {
      // 存储这个请求在原数组中的下标
      const i = index
      const url = urls[index]
      index++
      try {
        // const resp = await fetch(url)
        console.log(`执行第 ${i} 个请求`)
        const resp = await url()
        result[i] = resp
      } catch (error) {
        result[i] = error
      } finally {
        completedCount++
        if (completedCount === len) {
          resolve(result)
        }
        if (index < len) {
          request()
        }
      }
    }
    // maxNum可能大于len，所以不能直接用len
    for (let i = 0; i < Math.min(len, maxNum); i++) {
      request()
    }
  })
}

conurlRequest(promises, 3)

