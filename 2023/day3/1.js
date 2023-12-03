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

const doTheThing = async getArr => {
  const arr = await getArr()
  const symbols = new Set()
  for (const line of arr) {
    for (const c of line) {
      if (!"1234567890.".includes(c)) symbols.add(c)
    }
  }
  let sum = 0
  const summed = []
  for (let i = 0; i < arr.length; i++) {
    // line
    let currentNumberString = ""
    let currentNumberHasSymbol = false
    for (let j = 0; j < arr[0].length; j++) {
      // char
      if (
        "1234567890".includes(arr[i][j]) &&
        !currentNumberString &&
        !"1234567890".includes(arr[i]?.[j + 1])
      ) {
        currentNumberString += arr[i][j]
        if (
          symbols.has(arr[i - 1]?.[j - 1]) ||
          symbols.has(arr[i]?.[j - 1]) ||
          symbols.has(arr[i + 1]?.[j - 1]) ||
          symbols.has(arr[i - 1]?.[j]) ||
          symbols.has(arr[i + 1]?.[j]) ||
          symbols.has(arr[i + 1]?.[j + 1]) ||
          symbols.has(arr[i]?.[j + 1]) ||
          symbols.has(arr[i - 1]?.[j + 1]) ||
          symbols.has(arr[i - 1]?.[j]) ||
          symbols.has(arr[i + 1]?.[j])
        ) {
          currentNumberHasSymbol = true
        }
        if (currentNumberHasSymbol) {
          sum += +currentNumberString
          summed.push(+currentNumberString)
        }
        currentNumberString = ""
        currentNumberHasSymbol = false
      } else if ("1234567890".includes(arr[i][j]) && !currentNumberString) {
        currentNumberString += arr[i][j]
        if (
          symbols.has(arr[i - 1]?.[j - 1]) ||
          symbols.has(arr[i]?.[j - 1]) ||
          symbols.has(arr[i + 1]?.[j - 1]) ||
          symbols.has(arr[i - 1]?.[j]) ||
          symbols.has(arr[i + 1]?.[j])
        ) {
          currentNumberHasSymbol = true
        }
      } else if (
        "1234567890".includes(arr[i][j]) &&
        !"1234567890".includes(arr[i]?.[j + 1])
      ) {
        currentNumberString += arr[i][j]
        if (
          symbols.has(arr[i + 1]?.[j + 1]) ||
          symbols.has(arr[i]?.[j + 1]) ||
          symbols.has(arr[i - 1]?.[j + 1]) ||
          symbols.has(arr[i - 1]?.[j]) ||
          symbols.has(arr[i + 1]?.[j])
        ) {
          currentNumberHasSymbol = true
        }
        if (currentNumberHasSymbol) {
          sum += +currentNumberString
          summed.push(+currentNumberString)
        }
        currentNumberString = ""
        currentNumberHasSymbol = false
      } else if ("1234567890".includes(arr[i][j])) {
        currentNumberString += arr[i][j]
        if (symbols.has(arr[i - 1]?.[j]) || symbols.has(arr[i + 1]?.[j])) {
          currentNumberHasSymbol = true
        }
      }
    }
  }
  return sum
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
  console.assert(actual === 4361, "1. expected 4361 and got " + actual)
)

doTheThing(getInput).then(console.log)
