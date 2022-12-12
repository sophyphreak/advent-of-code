const buildArrayOfStartingPoints = arr => {
  const startingPoints = []
  arr.forEach((a, i) => {
    a.forEach((v, j) => {
      if (v === "a") {
        startingPoints.push([i, j])
      }
    })
  })
  return startingPoints
}

const coord = (r, c) => `${r}_${c}`

const canAccess = (arr, row, col, current) => {
  if (row < 0 || col < 0) return false
  if (row >= arr.length || col >= arr[0].length) return false
  let possibleNext = arr[row][col]
  if (possibleNext === "E") possibleNext = "z"
  if (possibleNext.charCodeAt(0) - current.charCodeAt(0) > 1) return false
  return true
}

const doTheThing = async (getArr, { ending }) => {
  const arr = await getArr()
  const arrOfStartingPoints = buildArrayOfStartingPoints(arr)
  console.assert(
    arr[ending[0]][ending[1]] === "E",
    `expected "E" instead recieved: ${arr[ending[0]][ending[1]]}`
  )
  let minTraveled = Infinity
  arrOfStartingPoints.forEach(starting => {
    const seen = new Set([coord(...starting)])
    const q = [
      { coord: starting, traveled: 0, val: arr[starting[0]][starting[1]] },
    ]
    let i = 0
    while (q.length) {
      i++
      const {
        coord: [row, col],
        traveled,
      } = q.shift()
      const current = arr[row][col]
      if (current === "E") {
        minTraveled = Math.min(traveled, minTraveled)
        return
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
  })
  return minTraveled
}

doTheThing(
  () =>
    Promise.resolve(
      `aabqponm
              abcryxxl
              accszExk
              acctuvwj
              abdefghi`
        .split("\n")
        .map(r => r.trim().split(""))
    ),
  { ending: [2, 5] }
).then(console.log)
