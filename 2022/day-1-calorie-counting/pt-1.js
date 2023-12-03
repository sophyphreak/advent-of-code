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
  let max = 0
  let cur = 0
  const arr = await getArr()
  arr.forEach(bag => {
    if (!bag) {
      cur = 0
      return
    }
    cur += +bag
    if (max < cur) max = cur
  })
  return max
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

// doTheThing(getInput).then(console.log)
