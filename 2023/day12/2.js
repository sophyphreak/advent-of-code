require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/11/input",
    {
      headers: {
        Cookie: `session=${process.env.SESSION}`,
      },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const doTheThing = async getArr => {
  let arr = await getArr()
  arr = arr.map(s => s.split(""))
  const blankRows = arr.reduce((acc, cur, i) => cur.includes("#") ? acc : acc.concat([i]), [])
  const blankCols = []
  for (let j = 0; j < arr[0].length; j++) {
    let colHasUni = false
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][j] === "#") {
        colHasUni = true
        break
      }
    }
    if (!colHasUni) {
      blankCols.push(j)
    }
  }
  for (const row of blankRows.reverse()) arr[row] = new Array(arr[0].length).fill("*")
  for (const col of blankCols.reverse()) {
    for (let i = 0; i < arr.length; i++) {
      arr[i][col] = "*"
    }
  }
  const universes = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === "#") universes.push([i, j])
    }
  }
  let sum = 0
  for (let i = 0; i < universes.length; i++) {
    for (let j = i + 1; j < universes.length; j++) {
      sum += Math.abs(universes[i][0] - universes[j][0]) + Math.abs(universes[i][1] - universes[j][1])
      for (let k = universes[i][0]; k < universes[j][0]; k++) if (arr[k][0] === "*") sum = sum - 1 + 1000000
      for (let k = universes[j][0]; k < universes[i][0]; k++) if (arr[k][0] === "*") sum = sum - 1 + 1000000
      for (let k = universes[i][1]; k < universes[j][1]; k++) if (arr[0][k] === "*") sum = sum - 1 + 1000000
      for (let k = universes[j][1]; k < universes[i][1]; k++) if (arr[0][k] === "*") sum = sum - 1 + 1000000
    }
  }
  return sum
}



const c = (i, j) => `${i}_${j}`

doTheThing(() =>
  Promise.resolve(
    `...#......
    .......#..
    #.........
    ..........
    ......#...
    .#........
    .........#
    ..........
    .......#..
    #...#.....`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 8410, "1. expected 8410 and got " + actual)
)

doTheThing(getInput).then(console.log)
