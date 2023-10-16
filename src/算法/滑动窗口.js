// * 滑动窗口算法框架, 用于解决子串问题*/
// void slidingWindow(string s) {
//     unordered_map<char, int> window;
    
//     int left = 0, right = 0;
//     while (right < s.size()) {
//         // c 是将移入窗口的字符
//         char c = s[right];
//         // 增大窗口
//         right++;
//         // 进行窗口内数据的一系列更新
//         ...

//         /*** debug 输出的位置 ***/
//         printf("window: [%d, %d)\n", left, right);
//         /********************/
        
//         // 判断左侧窗口是否要收缩
//         while (window needs shrink) {
//             // d 是将移出窗口的字符
//             char d = s[left];
//             // 缩小窗口
//             left++;
//             // 进行窗口内数据的一系列更新
//             ...
//         }
//     }
// }

function slideWindow (s) {
  const need = {}, window = {}

  // 构建窗口和need
  // ...

  let left = 0, right = 0
  while (right < s.length) {
    const char = s[right]
    // 增大窗口
    right++

    // 进行一些列窗口内的操作
    // ...

    // debug位置
    // console.log('window: ', window, left, right)

    // 判断窗口左侧是否需要收缩
    while (window needs shrink) {
      const char = s[left]
      // 收缩窗口
      left++

      // 进行窗口内的一系列更新
      // ...
    }
  }

}

// 1、什么时候应该扩大窗口？

// 2、什么时候应该缩小窗口？

// 3、什么时候应该更新答案？