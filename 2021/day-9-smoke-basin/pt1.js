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

const isLeftHigher = (basin, i, j) => {
  const current = basin[i][j]
  if (j === 0) return true
  if (current < basin[i][j - 1]) return true
  return false
}
const isUpHigher = (basin, i, j) => {
  const current = basin[i][j]
  if (i === 0) return true
  if (current < basin[i - 1][j]) return true
  return false
}
const isRightHigher = (basin, i, j) => {
  const current = basin[i][j]
  if (j + 1 === basin[i].length) return true
  if (current < basin[i][j + 1]) return true
  return false
}
const isDownHigher = (basin, i, j) => {
  const current = basin[i][j]
  if (i + 1 === basin.length) return true
  if (current < basin[i + 1][j]) return true
  return false
}

const doTheThing = async getArr => {
  const arr = await getArr()
  const basin = buildBasin(arr)

  let sum = 0
  for (let i = 0; i < basin.length; i++) {
    const row = basin[i]
    for (let j = 0; j < row.length; j++) {
      const leftIsHigher = isLeftHigher(basin, i, j)
      const upIsHigher = isUpHigher(basin, i, j)
      const rightIsHigher = isRightHigher(basin, i, j)
      const downIsHigher = isDownHigher(basin, i, j)
      if (leftIsHigher && upIsHigher && rightIsHigher && downIsHigher) {
        sum += 1 + basin[i][j]
      }
    }
  }
  return sum
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
