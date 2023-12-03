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
    [c(0, 2)]: "1",
    [c(1, 1)]: "2",
    [c(1, 2)]: "3",
    [c(1, 3)]: "4",
    [c(1, 3)]: "4",
    [c(2, 0)]: "5",
    [c(2, 1)]: "6",
    [c(2, 2)]: "7",
    [c(2, 3)]: "8",
    [c(2, 4)]: "9",
    [c(3, 1)]: "A",
    [c(3, 2)]: "B",
    [c(3, 3)]: "C",
    [c(4, 2)]: "D",
  }
  let i = 2
  let j = 0
  let result = ""
  for (const line of arr) {
    for (const char of line) {
      if (char === "U") i = c(i - 1, j) in key ? i - 1 : i
      else if (char === "R") j = c(i, j + 1) in key ? j + 1 : j
      else if (char === "D") i = c(i + 1, j) in key ? i + 1 : i
      else j = c(i, j - 1) in key ? j - 1 : j
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
  console.assert(actual === "5DB3", "1. expected 5DB3 and got " + actual)
)

doTheThing(getInput).then(console.log)
