const lookSouth = (arr, i, j) => {
  if (i === arr.length - 1) {
    return arr[0][j] === "."
  }
  return arr[i + 1][j] === "."
}

const moveSouth = (arr, i, j) => {
  arr[i][j] = "."
  if (i === arr.length - 1) {
    arr[0][j] = "v"
    return arr
  }
  arr[i + 1][j] = "v"
  return arr
}

const moveSouthFacing = arr => {
  let willMoveCountSouth = 0
  let willMoveArr = arr.map(row => new Array(row.length).fill(false))
  for (let i = 0; i < arr.length; i++) {
    row = arr[i]
    for (let j = 0; j < row.length; j++) {
      if (arr[i][j] === "v" && lookSouth(arr, i, j)) {
        willMoveArr[i][j] = true
        willMoveCountSouth++
      }
    }
  }
  for (let i = 0; i < willMoveArr.length; i++) {
    row = willMoveArr[i]
    for (let j = 0; j < row.length; j++) {
      if (willMoveArr[i][j]) {
        arr = moveSouth(arr, i, j)
      }
    }
  }
  return { arr, willMoveCountSouth }
}

module.exports = moveSouthFacing
