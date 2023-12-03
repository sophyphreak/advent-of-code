require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2016/day/3/input",
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
  arr = arr
    .map(line => line.trim())
    .map(line =>
      line
        .split(/[ ]+/)
        .map(s => +s)
        .sort((a, b) => a - b)
    )
  let count = 0
  for (const t of arr) {
    const [a, b, c] = t
    if (a + b > c) count++
  }
  return count
}

const c = (i, j) => `${i}_${j}`

doTheThing(() =>
  Promise.resolve(
    `5 10 25
    5  5  5`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 1, "1. expected 1 and got " + actual)
)

doTheThing(getInput).then(console.log)
