require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2022/day/1/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const doTheThing = async getArr => {
  const elves = []
  let cur = 0
  const arr = await getArr()
  arr.forEach(bag => {
    if (!bag) {
      elves.push(cur)
      cur = 0
      return
    }
    cur += +bag
  })
  elves.push(cur)
  elves.sort((a, b) => b - a)
  return elves[0] + elves[1] + elves[2]
}

doTheThing(() =>
  Promise.resolve([
    "1000",
    "2000",
    "3000",
    "",
    "4000",
    "",
    "5000",
    "6000",
    "",
    "7000",
    "8000",
    "9000",
    "",
    "10000",
  ])
).then(console.log)

doTheThing(getInput).then(console.log)
