// leetcode 370题

// 1、给定一个初始数组nums元素都为0, 然后又要求给区间 nums[2..6] 全部加 1，再给 nums[3..9] 全部减 3，再给 nums[0..4] 全部加 2，再给…

// 求最后 nums 数组的值是什么？

class DifferenceArray {
  constructor (nums) {
    // 声明差分数组用来保存每个元素与前一个元素的差值， 如
    // nums = 8, 2, 6, 3, 1
    // diff = 8, -6, 4, -3, -2
    this.diff = [nums[0]]
    for (let i = 1; i < nums.length; i++) {
      this.diff[i] = nums[i] - nums[i - 1]
    }
  }

  operate (from, to, val) {
    // 更新操作从i -> j比如说都 +3， 那么按常规办法操作则遍历一遍，时间复杂度为O(n), 如果调用频率很高，则比较耗时
    // 所以我们从差分数组下手，如果nums中 i => j都 +3， 则在差分数组中，i 位置需要 +3，i + 1 到 J的元素不发生变化，因为都加3等于没加
    // 但是j + 1因为j + 3了，所以需要 -3

    this.diff[from] += val
    // 如果to + 1超过数组长度，则从from到最后的数组都 + val, 所以不需要再处理
    if (to + 1 < this.diff.length) {
      return this.diff[to  + 1] -= val
    }
  }

  getResult () {
    // 通过差分数组获取原始数组
    // diff = 8, -6, 4, -3, -2
    // 由 this.diff[i] = nums[i] - nums[i - 1] 得 nums[i] = diff[i] + nums[i - 1]
    const nums = [this.diff[0]]
    for (let i = 1; i < this.diff.length; i++) {
      nums[i] = this.diff[i] + nums[i - 1]
    }
    return nums
  }
}

const diff = new DifferenceArray([0,0,0,0,0])

diff.operate(1, 3, 2)
console.log(diff.getResult())
diff.operate(2, 4, 3)
console.log(diff.getResult())
diff.operate(0, 2, -2)

console.log(diff.getResult())





// 2、1109题，航班预订







