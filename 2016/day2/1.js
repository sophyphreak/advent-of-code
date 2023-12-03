require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2016/day/2/input",
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
  const key = {
    [c(0, 0)]: 1,
    [c(0, 1)]: 2,
    [c(0, 2)]: 3,
    [c(1, 0)]: 4,
    [c(1, 1)]: 5,
    [c(1, 2)]: 6,
    [c(2, 0)]: 7,
    [c(2, 1)]: 8,
    [c(2, 2)]: 9,
  }
  let i = 1
  let j = 1
  let result = ""
  for (const line of arr) {
    for (const char of line) {
      if (char === "U") i = i === 0 ? 0 : i - 1
      else if (char === "R") j = j === 2 ? 2 : j + 1
      else if (char === "D") i = i === 2 ? 2 : i + 1
      else j = j === 0 ? 0 : j - 1
    }
    result += key[c(i, j)]
  }
  return result
}

const c = (i, j) => `${i}_${j}`

doTheThing(() =>
  Promise.resolve(
    `ULL
RRDDD
LURDL
UUUUD`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === "1985", "1. expected 1985 and got " + actual)
)

doTheThing(getInput).then(console.log)
