require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2022/day/8/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const doTheThing = async getArr => {
  let arr = await getArr()
  arr = arr.map(r => r.split("").map(n => +n))
  let maxScore = 0
  arr.forEach((row, rowIndex) => {
    row.forEach((height, colIndex) => {
      let downScore = 0
      for (let i = rowIndex + 1; i < arr.length; i++) {
        downScore++
        if (arr[i][colIndex] >= height) {
          break
        }
      }

      let upScore = 0
      for (let i = rowIndex - 1; i >= 0; i--) {
        upScore++
        if (arr[i][colIndex] >= height) {
          break
        }
      }

      let rightScore = 0
      for (let j = colIndex + 1; j < arr[0].length; j++) {
        rightScore++
        if (arr[rowIndex][j] >= height) {
          break
        }
      }

      let leftScore = 0
      for (let j = colIndex - 1; j >= 0; j--) {
        leftScore++
        if (arr[rowIndex][j] >= height) {
          break
        }
      }

      const score = downScore * upScore * rightScore * leftScore
      maxScore = Math.max(maxScore, score)
    })
  })
  return maxScore
}

doTheThing(() =>
  Promise.resolve(
    `30373
    25512
    65332
    33549
    35390`
      .split("\n")
      .map(r => r.trim())
  )
).then(console.log)

doTheThing(getInput).then(console.log)
