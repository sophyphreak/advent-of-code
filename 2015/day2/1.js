require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2015/day/2/input",
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
  let sum = 0
  for (const box of arr) {
    const [a, b, c] = box
      .split("x")
      .map(s => +s)
      .toSorted((a, b) => a - b)
    sum += a * b + 2 * a * b + 2 * b * c + 2 * a * c
  }
  return sum
}

doTheThing(() => Promise.resolve(`2x3x4`.split("\n").map(r => r.trim()))).then(
  actual => console.assert(actual === 58, "expected 58 and got " + actual)
)

doTheThing(() => Promise.resolve(`1x1x10`.split("\n").map(r => r.trim()))).then(
  actual => console.assert(actual === 43, "expected 43 and got " + actual)
)

doTheThing(() =>
  Promise.resolve(
    `2x3x4
    1x1x10`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 58 + 43, "expected 101 and got " + actual)
)

doTheThing(getInput).then(console.log)
