// 1、将矩阵顺时针旋转90度
  // 1 2 3       7 4 1
  // 4 5 6   =>  8 5 2
  // 7 8 9       9 6 3
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var rotate = function(matrix) {
  // 1、先将矩阵沿左上和右下的对角线进行镜像对称交换
  // 1 2 3       1 4 7
  // 4 5 6   =>  2 5 8 
  // 7 8 9       3 6 9
  const n = matrix.length

  for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
          const temp = matrix[i][j]
          matrix[i][j] = matrix[j][i]
          matrix[j][i] = temp
      }
  }

  // 2、再让镜像交换后的矩阵每一行进行反转即可
  for (let i = 0; i < n; i++) {
      let left = 0, right = n - 1
      while (left <= right) {
          temp = matrix[i][left]
          matrix[i][left] = matrix[i][right]
          matrix[i][right] = temp
          left++
          right--
      }
  }
};


// 1、将矩阵逆时针旋转90度
  // 1 2 3       3 6 9
  // 4 5 6   =>  2 5 8
  // 7 8 9       1 4 7
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var rotate2 = function(matrix) {
  // 1、先将矩阵沿右上和左下的对角线进行镜像对称交换
  // 1 2 3       9 6 3
  // 4 5 6   =>  8 5 2 
  // 7 8 9       7 4 1
  const n = matrix.length

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      const temp = matrix[i][j]
      matrix[i][j] = matrix[n - 1 - j][n - 1 - i]
      matrix[n - 1 - j][n - 1 - i] = temp
    }
  }

  // 2、对每一行进行翻转
  for (let i = 0; i < n; i++) {
    let left = 0, right = n - 1
    while (left <= right) {
        temp = matrix[i][left]
        matrix[i][left] = matrix[i][right]
        matrix[i][right] = temp
        left++
        right--
    }
  }
  return matrix
};

console.log(rotate2([[1,2,3],[4,5,6],[7,8,9]]))