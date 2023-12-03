require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2015/day/3/input",
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
  const s = arr[0]
  let i = 0
  let j = 0
  const visited = new Set([c(0, 0)])
  for (const d of s) {
    if (d === ">") j++
    else if (d === "v") i++
    else if (d === "<") j--
    else if (d === "^") i--
    visited.add(c(i, j))
  }
  return visited.size
}

const c = (i, j) => `${i}_${j}`

doTheThing(() => Promise.resolve(`>`.split("\n").map(r => r.trim()))).then(
  actual => console.assert(actual === 2, "expected 2 and got " + actual)
)

doTheThing(() => Promise.resolve(`^>v<`.split("\n").map(r => r.trim()))).then(
  actual => console.assert(actual === 4, "expected 4 and got " + actual)
)

doTheThing(() =>
  Promise.resolve(`^v^v^v^v^v`.split("\n").map(r => r.trim()))
).then(actual => console.assert(actual === 2, "expected 2 and got " + actual))

doTheThing(getInput).then(console.log)
