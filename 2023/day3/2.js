require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/3/input",
    {
      headers: {
        Cookie: `session=${process.env.SESSION}`,
      },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const c = (i, j) => `${i}_${j}`

const doTheThing = async getArr => {
  const arr = await getArr()
  const symbols = new Set(["*"])
  const gears = {}
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      const char = arr[i][j]
      if (char === "*") {
        gears[c(i, j)] = []
      }
    }
  }
  let total = 0
  const totaled = []
  for (let i = 0; i < arr.length; i++) {
    // line
    let currentNumberString = ""
    let gearLocation = null
    for (let j = 0; j < arr[0].length; j++) {
      // char

      if ("1234567890".includes(arr[i][j])) {
        currentNumberString += arr[i][j]
        if (arr[i - 1]?.[j - 1] === "*") gearLocation = c(i - 1, j - 1)
        if (arr[i - 1]?.[j] === "*") gearLocation = c(i - 1, j)
        if (arr[i - 1]?.[j + 1] === "*") gearLocation = c(i - 1, j + 1)
        if (arr[i + 1]?.[j - 1] === "*") gearLocation = c(i + 1, j - 1)
        if (arr[i + 1]?.[j] === "*") gearLocation = c(i + 1, j)
        if (arr[i + 1]?.[j + 1] === "*") gearLocation = c(i + 1, j + 1)
        if (arr[i]?.[j - 1] === "*") gearLocation = c(i, j - 1)
        if (arr[i]?.[j] === "*") gearLocation = c(i, j)
        if (arr[i]?.[j + 1] === "*") gearLocation = c(i, j + 1)
        if (!"1234567890".includes(arr[i]?.[j + 1])) {
          if (gearLocation) {
            gears[gearLocation].push(+currentNumberString)
            totaled.push(+currentNumberString)
          }
          currentNumberString = ""
          gearLocation = null
        }
      }
    }
  }
  return Object.keys(gears)
    .filter(loc => gears[loc].length === 2)
    .map(loc => gears[loc][0] * gears[loc][1])
    .reduce((sum, cur) => sum + cur, 0)
}

doTheThing(() =>
  Promise.resolve(
    `467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 467835, "1. expected 467835 and got " + actual)
)

doTheThing(getInput).then(console.log)
