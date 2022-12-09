const lookEast = (arr, i, j) => {
  if (j === arr[0].length - 1) {
    return arr[i][0] === "."
  }
  return arr[i][j + 1] === "."
}

const moveEast = (arr, i, j) => {
  arr[i][j] = "."
  if (j === arr[0].length - 1) {
    arr[i][0] = ">"
    return arr
  }
  arr[i][j + 1] = ">"
  return arr
}

const moveEastFacing = arr => {
  let willMoveCountEast = 0
  let willMoveArr = arr.map(row => new Array(row.length).fill(false))
  for (let i = 0; i < arr.length; i++) {
    row = arr[i]
    for (let j = 0; j < row.length; j++) {
      if (arr[i][j] === ">" && lookEast(arr, i, j)) {
        willMoveArr[i][j] = true
        willMoveCountEast++
      }
    }
  }
  for (let i = 0; i < willMoveArr.length; i++) {
    row = willMoveArr[i]
    for (let j = 0; j < row.length; j++) {
      if (willMoveArr[i][j]) {
        arr = moveEast(arr, i, j)
      }
    }
  }
  return { arr, willMoveCountEast }
}

module.exports = moveEastFacing
