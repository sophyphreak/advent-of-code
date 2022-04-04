const getRowsToAddOnTop = probeCoords =>
  probeCoords.reduce((max, cur) => Math.max(max, -cur[0]), 0)

const printMap = ({ rows, cols, probeCoords }) => {
  const arr = new Array(rows[1] + 1)
    .fill(null)
    .map(_ => new Array(cols[1] + 1).fill("."))
  arr[0][0] = "S"
  for (let i = rows[0]; i <= rows[1]; i++) {
    for (let j = cols[0]; j <= cols[1]; j++) {
      arr[i][j] = "T"
    }
  }

  const rowsToAddOnTop = getRowsToAddOnTop(probeCoords)

  for (let i = 0; i < rowsToAddOnTop; i++) {
    arr.unshift(new Array(cols[1] + 1).fill("."))
  }
  probeCoords = probeCoords.map(a => [a[0] + rowsToAddOnTop, a[1]])
  for (const [i, j] of probeCoords) {
    if (i >= arr.length || j >= arr[0].length) {
      break
    }
    arr[i][j] = "#"
  }
  console.log(arr.map(a => a.join("")).join("\n"))
}

module.exports = printMap
