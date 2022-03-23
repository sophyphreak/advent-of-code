require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/9/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  const arr = data.split("\n")
  arr.pop() // remove `""` at the end
  return arr
}

const buildBasin = arr => arr.map(str => str.split("").map(n => +n))

const buildSeenMap = basin =>
  new Array(basin.length)
    .fill(null)
    .map(_ => new Array(basin[0].length).fill(false))

const checkLeft = ({ basin, seenMap, i, j, queue }) => {
  if (j === 0) return { queue, seenMap }
  if (seenMap[i][j - 1]) return { queue, seenMap }
  if (9 === basin[i][j - 1]) {
    seenMap[i][j - 1] = true
    return { queue, seenMap }
  }
  queue.push([i, j - 1])
  return { queue, seenMap }
}
const checkUp = ({ basin, seenMap, i, j, queue }) => {
  if (i === 0) return { queue, seenMap }
  if (seenMap[i - 1][j]) return { queue, seenMap }
  if (9 === basin[i - 1][j]) {
    seenMap[i - 1][j] = true
    return { queue, seenMap }
  }
  queue.push([i - 1, j])
  return { queue, seenMap }
}
const checkRight = ({ basin, seenMap, i, j, queue }) => {
  if (j + 1 === basin[i].length) return { queue, seenMap }
  if (seenMap[i][j + 1]) return { queue, seenMap }
  if (9 === basin[i][j + 1]) {
    seenMap[i][j + 1] = true
    return { queue, seenMap }
  }
  queue.push([i, j + 1])
  return { queue, seenMap }
}
const checkDown = ({ basin, seenMap, i, j, queue }) => {
  if (i + 1 === basin.length) return { queue, seenMap }
  if (seenMap[i + 1][j]) return { queue, seenMap }
  if (9 === basin[i + 1][j]) {
    seenMap[i + 1][j] = true
    return { queue, seenMap }
  }
  queue.push([i + 1, j])
  return { queue, seenMap }
}

const getBasinSize = ({ basin, seenMap, i, j }) => {
  let basinSize = 0
  if (basin[i][j] === 9) {
    seenMap[i][j] = true
    return { basinSize, seenMap }
  }
  let queue = [[i, j]]
  while (queue.length) {
    const [i, j] = queue.shift()

    if (seenMap[i][j]) continue

    seenMap[i][j] = true
    basinSize++
    ;({ queue, seenMap } = checkLeft({ basin, seenMap, i, j, queue }))
    ;({ queue, seenMap } = checkUp({ basin, seenMap, i, j, queue }))
    ;({ queue, seenMap } = checkRight({ basin, seenMap, i, j, queue }))
    ;({ queue, seenMap } = checkDown({ basin, seenMap, i, j, queue }))
  }
  return { basinSize, seenMap }
}

const doTheThing = async getArr => {
  const arr = await getArr()
  const basin = buildBasin(arr)
  let seenMap = buildSeenMap(basin)
  const basinSizes = []

  for (let i = 0; i < basin.length; i++) {
    const row = basin[i]
    for (let j = 0; j < row.length; j++) {
      let basinSize = 0
      if (seenMap[i][j]) {
        continue
      }
      ;({ basinSize, seenMap } = getBasinSize({
        basin,
        seenMap,
        i,
        j,
      }))
      if (basinSize > 0) {
        basinSizes.push(basinSize)
      }
    }
  }
  basinSizes.sort((a, b) => b - a)
  return basinSizes[0] * basinSizes[1] * basinSizes[2]
}

doTheThing(() =>
  Promise.resolve([
    "2199943210",
    "3987894921",
    "9856789892",
    "8767896789",
    "9899965678",
  ])
).then(console.log)

doTheThing(getInput).then(console.log)
