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
    sum += 2 * a + 2 * b + a * b * c
  }
  return sum
}
// sum += 2 * a + 2 * b + a * b * c

doTheThing(() => Promise.resolve(`2x3x4`.split("\n").map(r => r.trim()))).then(
  actual => console.assert(actual === 34, "expected 34 and got " + actual)
)

doTheThing(() => Promise.resolve(`1x1x10`.split("\n").map(r => r.trim()))).then(
  actual => console.assert(actual === 14, "expected 14 and got " + actual)
)

doTheThing(() =>
  Promise.resolve(
    `2x3x4
    1x1x10`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 34 + 14, "expected 48 and got " + actual)
)

doTheThing(getInput).then(console.log)
