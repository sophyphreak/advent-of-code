const coord = (r, c) => `${r}_${c}`

const canAccess = (arr, row, col, current) => {
  if (row < 0 || col < 0) return false
  if (row >= arr.length || col >= arr[0].length) return false
  let possibleNext = arr[row][col]
  if (current === "S") current = "a"
  if (possibleNext === "E") possibleNext = "z"
  if (possibleNext.charCodeAt(0) - current.charCodeAt(0) > 1) return false
  return true
}

const printPathArr = pathArr => {
  console.log(pathArr.map(a => a.join("")).join("\n"))
}

const doTheThing = async (getArr, { starting, ending }) => {
  const arr = await getArr()
  const pathArr = new Array(arr.length).fill(new Array(arr[0].length).fill("."))
  console.assert(
    arr[starting[0]][starting[1]] === "S",
    `expected "S" instead recieved: ${arr[starting[0]][starting[1]]}`
  )
  console.assert(
    arr[ending[0]][ending[1]] === "E",
    `expected "E" instead recieved: ${arr[ending[0]][ending[1]]}`
  )
  const seen = new Set([coord(...starting)])
  const q = [
    { coord: starting, traveled: 0, val: arr[starting[0]][starting[1]] },
  ]
  while (q.length) {
    const {
      coord: [row, col],
      traveled,
    } = q.shift()
    const current = arr[row][col]
    pathArr[row][col] = "X"
    if (current === "E") {
      return traveled
    }
    if (
      canAccess(arr, row - 1, col, current) &&
      !seen.has(coord(row - 1, col))
    ) {
      q.push({
        coord: [row - 1, col],
        traveled: traveled + 1,
        val: arr[row - 1][col],
      })
      seen.add(coord(row - 1, col))
    }
    if (
      canAccess(arr, row + 1, col, current) &&
      !seen.has(coord(row + 1, col))
    ) {
      q.push({
        coord: [row + 1, col],
        traveled: traveled + 1,
        val: arr[row + 1][col],
      })
      seen.add(coord(row + 1, col))
    }
    if (
      canAccess(arr, row, col - 1, current) &&
      !seen.has(coord(row, col - 1))
    ) {
      q.push({
        coord: [row, col - 1],
        traveled: traveled + 1,
        val: arr[row][col - 1],
      })
      seen.add(coord(row, col - 1))
    }
    if (
      canAccess(arr, row, col + 1, current) &&
      !seen.has(coord(row, col + 1))
    ) {
      q.push({
        coord: [row, col + 1],
        traveled: traveled + 1,
        val: arr[row][col + 1],
      })
      seen.add(coord(row, col + 1))
    }
  }
}

doTheThing(
  () =>
    Promise.resolve(
      `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`
        .split("\n")
        .map(r => r.trim().split(""))
    ),
  { starting: [0, 0], ending: [2, 5] }
).then(console.log)
