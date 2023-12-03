require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2015/day/1/input",
    {
      headers: {
        Cookie: `session=${process.env.SESSION}`,
      },
    }
  )
  return data.split("\n")
}

const doTheThing = async getArr => {
  const arr = await getArr()
  const s = arr.join("")
  let level = 0
  for (const c of s) {
    if (c === "(") level++
    else level--
  }
  return level
}

doTheThing(() => Promise.resolve(`(())`.split("\n").map(r => r.trim()))).then(
  console.log
)

doTheThing(() => Promise.resolve(`(((`.split("\n").map(r => r.trim()))).then(
  console.log
)

doTheThing(() =>
  Promise.resolve(`))(((((`.split("\n").map(r => r.trim()))
).then(console.log)

doTheThing(() => Promise.resolve(`())`.split("\n").map(r => r.trim()))).then(
  console.log
)

doTheThing(() => Promise.resolve(`)))`.split("\n").map(r => r.trim()))).then(
  console.log
)

doTheThing(getInput).then(console.log)
